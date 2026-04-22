const INITIAL_PRICES: Record<string, number> = {
  AAPL: 180.50,
  MSFT: 410.20,
  GOOG: 145.30,
  AMZN: 175.00,
  NVDA: 880.10,
  META: 490.50,
  TSLA: 170.80,
  NFLX: 620.40,
  AMD: 155.20,
  INTC: 40.50
};

const COMPANY_NAMES: Record<string, string> = {
  AAPL: 'Apple Inc.',
  MSFT: 'Microsoft Corp.',
  GOOG: 'Alphabet Inc.',
  AMZN: 'Amazon.com Inc.',
  NVDA: 'NVIDIA Corp.',
  META: 'Meta Platforms Inc.',
  TSLA: 'Tesla Inc.',
  NFLX: 'Netflix Inc.',
  AMD: 'Advanced Micro Devices',
  INTC: 'Intel Corp.'
};

class PriceEngine {
  private currentPrices: Record<string, number> = { ...INITIAL_PRICES };
  private history: Record<string, any[]> = {};

  constructor() {
    // Generate some fake 30-day history
    const now = Date.now();
    for (const ticker of Object.keys(INITIAL_PRICES)) {
      this.history[ticker] = [];
      let p = INITIAL_PRICES[ticker] * 0.9;
      for (let i = 30; i >= 0; i--) {
        this.history[ticker].push({
          date: new Date(now - i * 24 * 60 * 60 * 1000).toISOString(),
          close: p
        });
        p = p * (1 + (Math.random() * 0.04 - 0.02)); // +/- 2% daily move
      }
      this.currentPrices[ticker] = parseFloat(p.toFixed(2));
    }

    // Tick prices every 5 seconds
    setInterval(() => {
      for (const ticker of Object.keys(this.currentPrices)) {
        const change = 1 + (Math.random() * 0.004 - 0.002); // +/- 0.2% per tick
        this.currentPrices[ticker] = parseFloat((this.currentPrices[ticker] * change).toFixed(2));
      }
    }, 5000);
  }

  getQuote(ticker: string) {
    if (!this.currentPrices[ticker]) return null;
    const currentPrice = this.currentPrices[ticker];
    const openPrice = this.history[ticker][this.history[ticker].length - 1].close;
    const change = currentPrice - openPrice;
    
    return {
      symbol: ticker,
      shortName: COMPANY_NAMES[ticker],
      regularMarketPrice: currentPrice,
      regularMarketChange: parseFloat(change.toFixed(2)),
      regularMarketChangePercent: parseFloat(((change / openPrice) * 100).toFixed(2)),
      regularMarketVolume: Math.floor(Math.random() * 10000000) + 1000000,
      marketCap: currentPrice * 1000000000,
      fiftyTwoWeekHigh: currentPrice * 1.5,
      fiftyTwoWeekLow: currentPrice * 0.6,
    };
  }

  getQuotes(tickers: string[]) {
    return tickers.map(t => this.getQuote(t)).filter(Boolean);
  }

  getHistorical(ticker: string) {
    return this.history[ticker] || [];
  }
}

export const priceEngine = new PriceEngine();
