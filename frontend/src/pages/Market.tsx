import React, { useEffect, useState } from 'react';
import { fetchWithAuth } from '../lib/api';
import { Card } from '../components/ui/Card';
import { Link } from 'react-router-dom';

export const Market = () => {
  const [stocks, setStocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWithAuth('/stocks')
      .then(data => setStocks(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-4xl text-off-white bg-deep-black inline-block px-4 py-2 brutal-border transform rotate-1 mb-8">
        market explorer
      </h1>

      {loading ? (
        <div className="text-acid-green font-display text-2xl animate-pulse">loading data...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stocks.map((stock, i) => (
            <Link to={`/stock/${stock.ticker}`} key={stock.ticker}>
              <Card className={`hover:bg-acid-green hover:text-deep-black group transition-all duration-300 ${i % 2 === 0 ? '-rotate-1' : 'rotate-1'}`}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl">{stock.ticker}</h2>
                    <p className="font-body text-sm font-bold group-hover:text-deep-black text-mid-gray">{stock.companyName}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-display font-bold">
                      ${stock.currentPrice?.toFixed(2)}
                    </div>
                    <div className={`font-bold ${stock.changePercent >= 0 ? 'text-electric-purple group-hover:text-electric-purple' : 'text-hot-pink group-hover:text-hot-pink'}`}>
                      {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent?.toFixed(2)}%
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
