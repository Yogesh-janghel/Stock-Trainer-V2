import { Router } from 'express';
import { prisma } from '../index';
import * as jwtPkg from 'jsonwebtoken';

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
        orders: true,
        portfolios: { include: { holdings: true } }
      }
    });

    if (!user) return res.status(404).json({ error: 'User not found' });

    const achievements = [];
    
    if (user.orders.length > 0) {
      achievements.push({ id: 'first_trade', title: 'First Trade', description: 'You executed your first trade!', icon: '📈' });
    }
    if (user.orders.length >= 10) {
      achievements.push({ id: 'day_trader', title: 'Day Trader', description: 'Executed 10+ trades.', icon: '⚡' });
    }
    if (user.virtualCash > 1000000) {
      achievements.push({ id: 'millionaire', title: 'Millionaire', description: 'Reached ₹1,000,000 cash balance!', icon: '💰' });
    }
    if (user.portfolios[0].holdings.length >= 5) {
      achievements.push({ id: 'diversified', title: 'Diversified', description: 'Hold 5 different stocks.', icon: '🧺' });
    }

    res.json(achievements);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch achievements' });
  }
});

export default router;
