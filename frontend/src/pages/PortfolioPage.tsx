import React, { useEffect, useState } from 'react';
import { fetchWithAuth } from '../lib/api';
import { Card } from '../components/ui/Card';
import { Link } from 'react-router-dom';

export const PortfolioPage = () => {
  const [portfolio, setPortfolio] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWithAuth('/portfolio')
      .then(data => setPortfolio(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8 text-acid-green font-display text-2xl animate-pulse">loading portfolio...</div>;
  if (!portfolio) return <div className="p-8">portfolio not found</div>;

  return (
    <div className="p-8">
      <h1 className="text-4xl text-deep-black bg-acid-green inline-block px-4 py-2 brutal-border transform -rotate-1 mb-8">
        your holdings
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {portfolio.holdings.map((h: any) => (
              <Card key={h.ticker} className="flex justify-between items-center group hover:bg-electric-purple hover:text-off-white transition-all">
                <div>
                  <Link to={`/stock/${h.ticker}`} className="text-2xl font-bold group-hover:underline">{h.ticker}</Link>
                  <p className="font-body text-sm font-bold">{h.quantity} shares @ ${h.avgBuyPrice.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-display font-bold">${h.currentValue.toFixed(2)}</p>
                  <p className={`font-bold ${h.pnl >= 0 ? 'text-acid-green group-hover:text-acid-green' : 'text-hot-pink group-hover:text-hot-pink'}`}>
                    {h.pnl >= 0 ? '+' : ''}${h.pnl.toFixed(2)} ({h.pnlPercent.toFixed(2)}%)
                  </p>
                </div>
              </Card>
            ))}
            {portfolio.holdings.length === 0 && (
              <Card className="rotate-1 bg-off-white text-deep-black text-center py-12">
                <h2 className="text-3xl mb-4">no stocks yet.</h2>
                <Link to="/market" className="brutal-btn-primary inline-block">explore market →</Link>
              </Card>
            )}
          </div>
        </div>
        
        <div>
          <Card className="bg-deep-black text-off-white sticky top-8">
            <h2 className="text-2xl mb-6">summary</h2>
            <div className="space-y-4 font-bold">
              <div className="flex justify-between border-b-4 border-mid-gray pb-2">
                <span>cash:</span> <span>₹{portfolio.cashBalance.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between border-b-4 border-mid-gray pb-2">
                <span>holdings value:</span> <span>${portfolio.totalHoldingsValue.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-deep-black text-xl pt-2">
                <span className="bg-acid-green px-2">total worth:</span> <span className="bg-acid-green px-2">${portfolio.totalPortfolioValue.toFixed(2)}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
