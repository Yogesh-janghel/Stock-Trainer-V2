import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Card } from '../components/ui/Card';
import { NewsFeed } from '../components/NewsFeed';
import { fetchWithAuth } from '../lib/api';

export const Dashboard = () => {
  const { user } = useAuthStore();
  const [portfolio, setPortfolio] = useState<any>(null);
  const [marketSummary, setMarketSummary] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [portfolioData, marketData] = await Promise.all([
          fetchWithAuth('/portfolio'),
          fetchWithAuth('/stocks')
        ]);
        setPortfolio(portfolioData);
        // Grab just the first 4 stocks for the "pulse"
        if (Array.isArray(marketData)) {
          setMarketSummary(marketData.slice(0, 4));
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 min-h-screen">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-off-white bg-deep-black inline-block px-6 py-3 border-4 border-deep-black transform -rotate-2 shadow-[8px_8px_0px_#ccff00]">
          welcome back, {user?.username}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Net Worth & Bento Box */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Hero Metric: Net Worth */}
          <Card className="bg-acid-green border-4 border-deep-black shadow-[12px_12px_0px_#000] p-8 md:p-12 transform rotate-1">
            <h2 className="text-3xl font-black mb-4 uppercase">Total Net Worth</h2>
            {loading ? (
              <div className="h-16 bg-deep-black/10 animate-pulse w-3/4 rounded"></div>
            ) : (
              <>
                <div className="text-6xl md:text-8xl font-display font-black tracking-tighter truncate">
                  ${portfolio?.totalPortfolioValue?.toFixed(2) || '0.00'}
                </div>
                <div className="mt-6 flex flex-wrap gap-4 text-xl font-bold bg-white inline-flex p-3 border-4 border-deep-black">
                  <span>Cash: <span className="text-hot-pink">₹{portfolio?.cashBalance?.toLocaleString('en-IN') || '0'}</span></span>
                </div>
              </>
            )}
          </Card>

          {/* Quick Actions Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Link to="/market" className="group block bg-hot-pink p-6 border-4 border-deep-black rounded-3xl shadow-[8px_8px_0px_#000] hover:shadow-none hover:translate-y-2 hover:translate-x-2 transition-all transform -rotate-2">
              <div className="text-5xl mb-4 transform group-hover:scale-125 transition-transform duration-300 ease-bouncy">📈</div>
              <h3 className="text-2xl font-black text-white">trade stocks</h3>
              <p className="text-deep-black font-bold mt-2">discover and buy new assets.</p>
            </Link>

            <Link to="/portfolio" className="group block bg-electric-purple p-6 border-4 border-deep-black rounded-3xl shadow-[8px_8px_0px_#000] hover:shadow-none hover:translate-y-2 hover:translate-x-2 transition-all transform rotate-1">
              <div className="text-5xl mb-4 transform group-hover:scale-125 transition-transform duration-300 ease-bouncy">💼</div>
              <h3 className="text-2xl font-black text-white">your portfolio</h3>
              <p className="text-off-white font-bold mt-2">track your gains and losses.</p>
            </Link>

            <Link to="/leaderboard" className="group block bg-white p-6 border-4 border-deep-black rounded-3xl shadow-[8px_8px_0px_#ccff00] hover:shadow-none hover:translate-y-2 hover:translate-x-2 transition-all transform rotate-2">
              <div className="text-5xl mb-4 transform group-hover:scale-125 transition-transform duration-300 ease-bouncy">🏆</div>
              <h3 className="text-2xl font-black text-deep-black">leaderboard</h3>
              <p className="text-deep-black font-bold mt-2">see where you rank globally.</p>
            </Link>

            <Link to="/achievements" className="group block bg-deep-black p-6 border-4 border-deep-black rounded-3xl shadow-[8px_8px_0px_#7000ff] hover:shadow-none hover:translate-y-2 hover:translate-x-2 transition-all transform -rotate-1">
              <div className="text-5xl mb-4 transform group-hover:scale-125 transition-transform duration-300 ease-bouncy">🏅</div>
              <h3 className="text-2xl font-black text-acid-green">achievements</h3>
              <p className="text-off-white font-bold mt-2">view your unlocked badges.</p>
            </Link>
          </div>
        </div>

        {/* Right Column: Market Pulse & News */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Market Pulse Mini Widget */}
          <Card className="bg-white border-4 border-deep-black shadow-[8px_8px_0px_#000] transform rotate-1">
            <h3 className="text-2xl font-black mb-6 bg-acid-green inline-block px-2 border-2 border-deep-black">Market Pulse</h3>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => <div key={i} className="h-12 bg-gray-200 animate-pulse rounded"></div>)}
              </div>
            ) : (
              <div className="space-y-4 font-bold">
                {marketSummary.map((stock) => (
                  <Link key={stock.ticker} to={`/stock/${stock.ticker}`} className="flex justify-between items-center p-3 border-2 border-deep-black hover:bg-hot-pink hover:text-white transition-colors group">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 flex items-center justify-center bg-deep-black text-white rounded-full text-sm font-black group-hover:bg-white group-hover:text-hot-pink transition-colors">
                        {stock.ticker}
                      </span>
                      <span>{stock.name}</span>
                    </div>
                    <span>${stock.currentPrice.toFixed(2)}</span>
                  </Link>
                ))}
              </div>
            )}
            <div className="mt-6 pt-4 border-t-4 border-deep-black text-center">
              <Link to="/market" className="text-electric-purple font-black hover:underline uppercase text-sm tracking-widest">
                view all markets →
              </Link>
            </div>
          </Card>

          {/* News Feed */}
          <div className="transform -rotate-1">
            <NewsFeed />
          </div>

        </div>
      </div>
    </div>
  );
};
