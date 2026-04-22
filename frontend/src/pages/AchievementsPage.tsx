import React, { useEffect, useState } from 'react';
import { fetchWithAuth } from '../lib/api';
import { Card } from '../components/ui/Card';

export const AchievementsPage = () => {
  const [achievements, setAchievements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWithAuth('/achievements')
      .then(data => setAchievements(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8 text-acid-green font-display text-2xl animate-pulse">loading achievements...</div>;

  return (
    <div className="p-8">
      <h1 className="text-4xl text-off-white bg-hot-pink inline-block px-4 py-2 brutal-border transform rotate-2 mb-8">
        my achievements
      </h1>

      {achievements.length === 0 ? (
        <Card className="text-center py-12 max-w-2xl mx-auto -rotate-1">
          <h2 className="text-2xl text-mid-gray">no achievements yet. start trading!</h2>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((ach) => (
            <Card key={ach.id} className="text-center hover:bg-acid-green hover:text-deep-black transition-all">
              <div className="text-6xl mb-4">{ach.icon}</div>
              <h2 className="text-2xl font-bold mb-2">{ach.title}</h2>
              <p className="font-bold text-sm">{ach.description}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
