import React, { useEffect, useState } from 'react';
import { fetchWithAuth } from '../lib/api';
import { Card } from '../components/ui/Card';

export const HistoryPage = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWithAuth('/orders')
      .then(data => setOrders(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8 text-acid-green font-display text-2xl animate-pulse">loading history...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl text-off-white bg-electric-purple inline-block px-4 py-2 brutal-border transform rotate-1 mb-8">
        order history
      </h1>

      <div className="space-y-4">
        {orders.length === 0 ? (
          <Card className="text-center py-12 rotate-1">
            <h2 className="text-2xl text-mid-gray">no orders yet.</h2>
          </Card>
        ) : (
          orders.map((order, i) => (
            <Card key={order.id} className={`flex justify-between items-center ${i % 2 === 0 ? '-rotate-1' : 'rotate-1'}`}>
              <div>
                <span className={`inline-block px-2 py-1 brutal-border text-sm font-bold mr-4 ${order.type === 'BUY' ? 'bg-acid-green text-deep-black' : 'bg-hot-pink text-off-white'}`}>
                  {order.type}
                </span>
                <span className="text-2xl font-bold">{order.ticker}</span>
                <p className="font-body text-sm font-bold mt-1">{new Date(order.createdAt).toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-display font-bold">{order.quantity} @ ${order.priceAtExecution.toFixed(2)}</p>
                <p className="font-bold text-mid-gray">total: ${order.totalValue.toFixed(2)}</p>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
