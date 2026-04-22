import { Router } from 'express';
import { prisma } from '../index';
import * as jwtPkg from 'jsonwebtoken';
import { priceEngine } from '../services/PriceEngine';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-jwt-key';

const authenticate = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Unauthorized' });
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwtPkg.verify(token, JWT_SECRET) as any;
    req.userId = payload.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

router.get('/', authenticate, async (req: any, res: any) => {
  try {
    const user = await prisma.user.findUnique({ 
      where: { id: req.userId }, 
      include: { 
        portfolios: {
          include: { holdings: true }
        } 
      } 
    });

    if (!user) return res.status(404).json({ error: 'User not found' });
    
    const holdings = user.portfolios[0].holdings;
    
    // Fetch live prices for all holdings
    const enrichedHoldings = await Promise.all(holdings.map(async (h) => {
      try {
        const quote = priceEngine.getQuote(h.ticker);
        const currentPrice = quote?.regularMarketPrice || Number(h.avgBuyPrice);
        const currentValue = currentPrice * h.quantity;
        const totalInvested = Number(h.avgBuyPrice) * h.quantity;
        const pnl = currentValue - totalInvested;
        const pnlPercent = totalInvested > 0 ? (pnl / totalInvested) * 100 : 0;
        
        return {
          ...h,
          currentPrice,
          currentValue,
          pnl,
          pnlPercent,
          dayChange: quote?.regularMarketChangePercent || 0
        };
      } catch (e) {
        // Fallback if API fails
        return {
          ...h,
          currentPrice: Number(h.avgBuyPrice),
          currentValue: Number(h.avgBuyPrice) * h.quantity,
          pnl: 0,
          pnlPercent: 0,
          dayChange: 0
        };
      }
    }));

    const totalHoldingsValue = enrichedHoldings.reduce((sum, h) => sum + h.currentValue, 0);

    res.json({
      cashBalance: user.virtualCash,
      totalHoldingsValue,
      totalPortfolioValue: user.virtualCash + totalHoldingsValue,
      holdings: enrichedHoldings
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch portfolio' });
  }
});

export default router;
