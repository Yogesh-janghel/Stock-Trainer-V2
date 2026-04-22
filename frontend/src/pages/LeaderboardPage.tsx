import React, { useEffect, useState } from 'react';
import { fetchWithAuth } from '../lib/api';
import { Card } from '../components/ui/Card';

export const LeaderboardPage = () => {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWithAuth('/leaderboard')
      .then(data => setLeaders(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8 text-acid-green font-display text-2xl animate-pulse">loading leaderboard...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl text-deep-black bg-acid-green inline-block px-4 py-2 brutal-border transform -rotate-1 mb-8">
        global leaderboard
      </h1>

      <div className="space-y-4">
        {leaders.map((user, i) => (
          <Card key={i} className={`flex justify-between items-center ${i === 0 ? 'bg-electric-purple text-off-white scale-105 z-10' : ''}`}>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-display font-bold w-8">{i + 1}</span>
              <span className="text-2xl font-bold">{user.username}</span>
            </div>
            <div className="text-xl font-display font-bold">
              ${user.netWorth.toFixed(2)}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
