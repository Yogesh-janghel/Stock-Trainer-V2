import React, { useEffect, useState } from 'react';
import { fetchWithAuth } from '../lib/api';
import { Card } from './ui/Card';
import { Link } from 'react-router-dom';

export const NewsFeed = () => {
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    fetchWithAuth('/news')
      .then(data => setNews(data))
      .catch(console.error);
  }, []);

  return (
    <Card className="bg-acid-green text-deep-black transform rotate-1 border-4 border-deep-black h-full">
      <h2 className="text-2xl font-display font-bold mb-4 flex items-center gap-2">
        <span>📰</span> latest news
      </h2>
      <div className="space-y-4">
        {news.length === 0 ? (
          <p className="font-bold">loading...</p>
        ) : (
          news.map(item => (
            <div key={item.id} className="border-b-4 border-deep-black pb-3 last:border-0 last:pb-0">
              <div className="flex justify-between items-center mb-2">
                <Link to={`/stock/${item.ticker}`} className="font-bold text-acid-green hover:underline bg-deep-black px-2 py-0.5 text-sm inline-block transform -rotate-2 brutal-border">
                  {item.ticker}
                </Link>
                <span className="text-sm font-bold opacity-75">{item.timeAgo}</span>
              </div>
              <p className="font-bold text-lg leading-tight">{item.headline}</p>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};
