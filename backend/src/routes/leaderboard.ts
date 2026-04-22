import { Router } from 'express';
import { prisma } from '../index';
import { priceEngine } from '../services/PriceEngine';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        portfolios: {
          include: { holdings: true }
        }
      }
    });

    const leaderboard = users.map(u => {
      let holdingsValue = 0;
      if (u.portfolios.length > 0) {
        const holdings = u.portfolios[0].holdings;
        holdingsValue = holdings.reduce((sum, h) => {
          const quote = priceEngine.getQuote(h.ticker);
          const currentPrice = quote?.regularMarketPrice || Number(h.avgBuyPrice);
          return sum + (currentPrice * h.quantity);
        }, 0);
      }
      
      const totalNetWorth = u.virtualCash + holdingsValue;
      return {
        username: u.username,
        avatarUrl: u.avatarUrl,
        netWorth: totalNetWorth
      };
    });

    // Sort descending
    leaderboard.sort((a, b) => b.netWorth - a.netWorth);

    // Return top 50
    res.json(leaderboard.slice(0, 50));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

export default router;
