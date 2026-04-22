import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchWithAuth } from '../lib/api';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuthStore } from '../store/useAuthStore';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const StockDetail = () => {
  const { ticker } = useParams();
  const navigate = useNavigate();
  const { user, setAuth } = useAuthStore();
  
  const [stock, setStock] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState('1');
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');
  const [inWatchlist, setInWatchlist] = useState(false);

  useEffect(() => {
    fetchWithAuth(`/stocks/${ticker}`)
      .then(data => setStock(data))
      .catch(console.error)
      .finally(() => setLoading(false));

    fetchWithAuth('/watchlist')
      .then(data => setInWatchlist(data.includes(ticker)))
      .catch(console.error);
  }, [ticker]);

  const toggleWatchlist = async () => {
    try {
      if (inWatchlist) {
        await fetchWithAuth(`/watchlist/${ticker}`, { method: 'DELETE' });
        setInWatchlist(false);
      } else {
        await fetchWithAuth(`/watchlist/${ticker}`, { method: 'POST' });
        setInWatchlist(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleTrade = async (type: 'buy' | 'sell') => {
    setActionLoading(true);
    setError('');
    try {
      const res = await fetchWithAuth(`/orders/${type}`, {
        method: 'POST',
        body: JSON.stringify({ ticker, quantity: parseInt(quantity) })
      });
      // Update user cash balance in local store
      setAuth(res.user, useAuthStore.getState().token!);
      alert(`${type.toUpperCase()} successful!`);
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-acid-green font-display text-2xl animate-pulse">loading...</div>;
  if (!stock) return <div className="p-8">stock not found</div>;

  return (
    <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="col-span-1 lg:col-span-2">
        <div className="flex items-end gap-4 mb-8">
          <h1 className="text-6xl text-off-white bg-electric-purple inline-block px-4 py-2 brutal-border transform -rotate-1">
            {stock.ticker}
          </h1>
          <h2 className="text-2xl font-bold">{stock.companyName}</h2>
          <button 
            onClick={toggleWatchlist}
            className={`ml-auto border-4 brutal-border px-4 py-2 font-bold transform rotate-1 transition-colors ${inWatchlist ? 'bg-hot-pink text-off-white' : 'bg-off-white text-deep-black hover:bg-acid-green'}`}
          >
            {inWatchlist ? '★ in watchlist' : '☆ add to watchlist'}
          </button>
        </div>

        <Card className="mb-8 bg-deep-black border-acid-green border-4">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stock.historical}>
                <XAxis dataKey="date" hide />
                <YAxis domain={['auto', 'auto']} hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0a', border: '4px solid #ccff00', borderRadius: '0' }}
                  itemStyle={{ color: '#ccff00', fontFamily: 'Space Grotesk', fontWeight: 'bold' }}
                />
                <Line type="monotone" dataKey="close" stroke="#ccff00" strokeWidth={4} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="-rotate-1">
            <p className="font-bold text-sm text-mid-gray">current price</p>
            <p className="text-2xl font-display font-bold">${stock.currentPrice?.toFixed(2)}</p>
          </Card>
          <Card className="rotate-1">
            <p className="font-bold text-sm text-mid-gray">52w high</p>
            <p className="text-2xl font-display font-bold">${stock.fiftyTwoWeekHigh?.toFixed(2)}</p>
          </Card>
          <Card className="-rotate-1">
            <p className="font-bold text-sm text-mid-gray">52w low</p>
            <p className="text-2xl font-display font-bold">${stock.fiftyTwoWeekLow?.toFixed(2)}</p>
          </Card>
          <Card className="rotate-1">
            <p className="font-bold text-sm text-mid-gray">volume</p>
            <p className="text-2xl font-display font-bold">{(stock.volume / 1000000).toFixed(1)}M</p>
          </Card>
        </div>
      </div>

      <div className="col-span-1">
        <Card className="sticky top-8 bg-acid-green text-deep-black rotate-1 shadow-[8px_8px_0px_#7000ff]">
          <h2 className="text-3xl mb-6">trade {stock.ticker}</h2>
          
          <div className="mb-6 space-y-2">
            <p className="font-bold flex justify-between"><span>available cash:</span> <span>₹{user?.virtualCash?.toLocaleString('en-IN')}</span></p>
            <p className="font-bold flex justify-between"><span>current price:</span> <span>${stock.currentPrice?.toFixed(2)}</span></p>
          </div>

          {error && <div className="bg-hot-pink text-off-white font-bold p-3 mb-4 brutal-border">{error}</div>}

          <div className="space-y-4">
            <Input 
              label="quantity" 
              type="number" 
              min="1" 
              value={quantity} 
              onChange={(e) => setQuantity(e.target.value)} 
            />
            
            <div className="flex gap-4 pt-4">
              <Button 
                className="w-full bg-deep-black text-acid-green hover:bg-electric-purple hover:text-off-white"
                onClick={() => handleTrade('buy')}
                isLoading={actionLoading}
              >
                buy
              </Button>
              <Button 
                variant="destructive" 
                className="w-full"
                onClick={() => handleTrade('sell')}
                isLoading={actionLoading}
              >
                sell
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
