import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      setAuth(data.user, data.token);
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-acid-green bg-opacity-20">
      <Card className="w-full max-w-md -rotate-1">
        <div className="flex justify-center">
          <h1 className="text-4xl mb-6 text-center text-acid-green bg-deep-black inline-block px-4 py-2 brutal-border transform -rotate-2">login</h1>
        </div>
        
        {error && (
          <div className="bg-hot-pink text-off-white font-bold p-3 mb-4 brutal-border">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <Input 
            label="email address" 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input 
            label="password" 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="primary" className="w-full mt-4" isLoading={loading}>
            enter the market
          </Button>
        </form>

        <p className="mt-6 text-center font-body text-sm font-bold">
          don't have an account? <Link to="/register" className="text-electric-purple hover:underline">register here</Link>
        </p>
      </Card>
    </div>
  );
};
