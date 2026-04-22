import { Router } from 'express';
import { priceEngine } from '../services/PriceEngine';

const router = Router();

const POPULAR_TICKERS = ['AAPL', 'MSFT', 'GOOG', 'AMZN', 'NVDA', 'META', 'TSLA', 'NFLX', 'AMD', 'INTC'];

router.get('/', async (req, res) => {
  try {
    const quotes = priceEngine.getQuotes(POPULAR_TICKERS);
    const validQuotes = quotes.map((q: any) => ({
      ticker: q.symbol,
      companyName: q.shortName,
      currentPrice: q.regularMarketPrice,
      change: q.regularMarketChange,
      changePercent: q.regularMarketChangePercent,
      volume: q.regularMarketVolume,
      marketCap: q.marketCap
    }));
    res.json(validQuotes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stocks' });
  }
});

router.get('/:ticker', async (req, res) => {
  try {
    const { ticker } = req.params;
    const quote = priceEngine.getQuote(ticker);
    
    if (!quote) return res.status(404).json({ error: 'Stock not found' });

    const historical = priceEngine.getHistorical(ticker);

    res.json({
      ticker: quote.symbol,
      companyName: quote.shortName,
      currentPrice: quote.regularMarketPrice,
      change: quote.regularMarketChange,
      changePercent: quote.regularMarketChangePercent,
      volume: quote.regularMarketVolume,
      marketCap: quote.marketCap,
      fiftyTwoWeekHigh: quote.fiftyTwoWeekHigh,
      fiftyTwoWeekLow: quote.fiftyTwoWeekLow,
      historical
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stock details' });
  }
});

export default router;
