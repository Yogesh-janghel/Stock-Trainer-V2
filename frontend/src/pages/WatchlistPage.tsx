import React, { useEffect, useState } from 'react';
import { fetchWithAuth } from '../lib/api';
import { Card } from '../components/ui/Card';
import { Link } from 'react-router-dom';

export const WatchlistPage = () => {
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWithAuth('/watchlist')
      .then(data => setWatchlist(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const removeFromWatchlist = async (ticker: string) => {
    try {
      await fetchWithAuth(`/watchlist/${ticker}`, { method: 'DELETE' });
      setWatchlist(watchlist.filter(t => t !== ticker));
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <div className="p-8 text-acid-green font-display text-2xl animate-pulse">loading watchlist...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl text-off-white bg-deep-black inline-block px-4 py-2 brutal-border transform -rotate-1 mb-8">
        my watchlist
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {watchlist.length === 0 ? (
          <Card className="text-center py-12 md:col-span-2 rotate-1">
            <h2 className="text-2xl text-mid-gray">watchlist is empty.</h2>
            <Link to="/market" className="text-electric-purple font-bold hover:underline mt-4 inline-block">add some stocks</Link>
          </Card>
        ) : (
          watchlist.map((ticker, i) => (
            <Card key={ticker} className={`flex justify-between items-center group transition-all ${i % 2 === 0 ? '-rotate-1' : 'rotate-1'}`}>
              <Link to={`/stock/${ticker}`} className="text-3xl font-display font-bold hover:text-electric-purple hover:underline">
                {ticker}
              </Link>
              <button 
                onClick={() => removeFromWatchlist(ticker)}
                className="text-hot-pink font-bold border-2 border-hot-pink px-2 hover:bg-hot-pink hover:text-off-white transition-colors"
              >
                remove
              </button>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
