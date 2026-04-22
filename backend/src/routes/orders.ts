import { Router } from 'express';
import { prisma } from '../index';
import { z } from 'zod';
import * as jwtPkg from 'jsonwebtoken';
import { priceEngine } from '../services/PriceEngine';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-jwt-key';

// Middleware to authenticate user
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

const orderSchema = z.object({
  ticker: z.string(),
  quantity: z.number().positive().int()
});

router.post('/buy', authenticate, async (req: any, res: any) => {
  try {
    const { ticker, quantity } = orderSchema.parse(req.body);
    const quote = priceEngine.getQuote(ticker);
    if (!quote || !quote.regularMarketPrice) {
      return res.status(400).json({ error: 'Invalid ticker' });
    }
    
    const price = quote.regularMarketPrice;
    const totalValue = price * quantity;
    const brokerage = totalValue * 0.001; // 0.1% simulated brokerage
    const totalCost = totalValue + brokerage;

    const user = await prisma.user.findUnique({ where: { id: req.userId }, include: { portfolios: true } });
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (user.virtualCash < totalCost) return res.status(400).json({ error: 'Insufficient funds' });

    const portfolioId = user.portfolios[0].id;

    // Transaction
    const result = await prisma.$transaction(async (tx) => {
      // Deduct cash
      const updatedUser = await tx.user.update({
        where: { id: req.userId },
        data: { virtualCash: { decrement: totalCost } }
      });

      // Update or create holding
      const existingHolding = await tx.portfolioHolding.findUnique({
        where: { portfolioId_ticker: { portfolioId, ticker } }
      });

      let holding;
      if (existingHolding) {
        const newTotalQty = existingHolding.quantity + quantity;
        const newTotalCost = (Number(existingHolding.avgBuyPrice) * existingHolding.quantity) + totalValue;
        holding = await tx.portfolioHolding.update({
          where: { id: existingHolding.id },
          data: {
            quantity: newTotalQty,
            avgBuyPrice: newTotalCost / newTotalQty
          }
        });
      } else {
        holding = await tx.portfolioHolding.create({
          data: {
            portfolioId,
            ticker,
            companyName: quote.shortName || ticker,
            quantity,
            avgBuyPrice: price
          }
        });
      }

      // Create order
      const order = await tx.order.create({
        data: {
          userId: req.userId,
          ticker,
          companyName: quote.shortName || ticker,
          type: 'BUY',
          quantity,
          priceAtExecution: price,
          totalValue: totalCost,
          status: 'COMPLETED'
        }
      });

      return { user: updatedUser, order, holding };
    });

    res.json(result);
  } catch (error) {
    res.status(400).json({ error: 'Order failed', details: error });
  }
});

router.post('/sell', authenticate, async (req: any, res: any) => {
  try {
    const { ticker, quantity } = orderSchema.parse(req.body);
    const quote = priceEngine.getQuote(ticker);
    if (!quote || !quote.regularMarketPrice) {
      return res.status(400).json({ error: 'Invalid ticker' });
    }
    
    const price = quote.regularMarketPrice;
    const totalValue = price * quantity;
    const brokerage = totalValue * 0.001; // 0.1% simulated brokerage
    const netProceeds = totalValue - brokerage;

    const user = await prisma.user.findUnique({ where: { id: req.userId }, include: { portfolios: true } });
    if (!user) return res.status(404).json({ error: 'User not found' });
    const portfolioId = user.portfolios[0].id;

    const holding = await prisma.portfolioHolding.findUnique({
      where: { portfolioId_ticker: { portfolioId, ticker } }
    });

    if (!holding || holding.quantity < quantity) {
      return res.status(400).json({ error: 'Insufficient shares' });
    }

    // Transaction
    const result = await prisma.$transaction(async (tx) => {
      // Add cash
      const updatedUser = await tx.user.update({
        where: { id: req.userId },
        data: { virtualCash: { increment: netProceeds } }
      });

      // Update or delete holding
      if (holding.quantity === quantity) {
        await tx.portfolioHolding.delete({ where: { id: holding.id } });
      } else {
        await tx.portfolioHolding.update({
          where: { id: holding.id },
          data: { quantity: { decrement: quantity } }
        });
      }

      // Create order
      const order = await tx.order.create({
        data: {
          userId: req.userId,
          ticker,
          companyName: quote.shortName || ticker,
          type: 'SELL',
          quantity,
          priceAtExecution: price,
          totalValue: netProceeds,
          status: 'COMPLETED'
        }
      });

      return { user: updatedUser, order };
    });

    res.json(result);
  } catch (error) {
    res.status(400).json({ error: 'Order failed', details: error });
  }
});

router.get('/', authenticate, async (req: any, res: any) => {
  const orders = await prisma.order.findMany({
    where: { userId: req.userId },
    orderBy: { createdAt: 'desc' }
  });
  res.json(orders);
});

export default router;
