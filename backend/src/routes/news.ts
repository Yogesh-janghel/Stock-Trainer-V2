import { Router } from 'express';

const router = Router();

const NEWS_TEMPLATES = [
  "BREAKING: {ticker} announces revolutionary new product, shares surge.",
  "{ticker} earnings report exceeds expectations, analysts upgrade target.",
  "Rumors: {ticker} considering major acquisition in the tech sector.",
  "Market volatile as {ticker} faces supply chain constraints.",
  "CEO of {ticker} steps down unexpectedly, board searches for replacement.",
  "Investors rally behind {ticker} after strong Q3 guidance.",
  "New government regulations could impact {ticker}'s bottom line.",
  "Why {ticker} is the top stock pick for next month."
];

const TICKERS = ['AAPL', 'MSFT', 'GOOG', 'AMZN', 'NVDA', 'META', 'TSLA', 'NFLX'];

const generateNews = () => {
  const news = [];
  for (let i = 0; i < 5; i++) {
    const ticker = TICKERS[Math.floor(Math.random() * TICKERS.length)];
    const template = NEWS_TEMPLATES[Math.floor(Math.random() * NEWS_TEMPLATES.length)];
    const timeAgo = Math.floor(Math.random() * 60) + 1; // 1 to 60 minutes ago
    
    news.push({
      id: `news-${Date.now()}-${i}`,
      ticker,
      headline: template.replace('{ticker}', ticker),
      timeAgo: `${timeAgo}m ago`
    });
  }
  return news;
};

// Cache news for 5 minutes so it doesn't change on every reload
let cachedNews: any[] = [];
let lastGenerated = 0;

router.get('/', (req, res) => {
  const now = Date.now();
  if (now - lastGenerated > 5 * 60 * 1000 || cachedNews.length === 0) {
    cachedNews = generateNews();
    lastGenerated = now;
  }
  
  res.json(cachedNews);
});

export default router;
