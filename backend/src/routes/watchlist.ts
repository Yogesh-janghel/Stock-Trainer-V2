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
    let watchlist = await prisma.watchlist.findFirst({
      where: { userId: req.userId },
      include: { stocks: true }
    });

    if (!watchlist) {
      watchlist = await prisma.watchlist.create({
        data: {
          userId: req.userId,
          name: 'My Watchlist'
        },
        include: { stocks: true }
      });
    }

    res.json(watchlist.stocks.map((s: any) => s.ticker));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch watchlist' });
  }
});

router.post('/:ticker', authenticate, async (req: any, res: any) => {
  try {
    const { ticker } = req.params;
    let watchlist = await prisma.watchlist.findFirst({
      where: { userId: req.userId }
    });

    if (!watchlist) {
      watchlist = await prisma.watchlist.create({
        data: { userId: req.userId, name: 'My Watchlist' }
      });
    }

    const existing = await prisma.watchlistStock.findFirst({
      where: { watchlistId: watchlist.id, ticker }
    });

    if (!existing) {
      await prisma.watchlistStock.create({
        data: { watchlistId: watchlist.id, ticker }
      });
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add to watchlist' });
  }
});

router.delete('/:ticker', authenticate, async (req: any, res: any) => {
  try {
    const { ticker } = req.params;
    const watchlist = await prisma.watchlist.findFirst({
      where: { userId: req.userId }
    });

    if (watchlist) {
      await prisma.watchlistStock.deleteMany({
        where: { watchlistId: watchlist.id, ticker }
      });
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove from watchlist' });
  }
});

export default router;
