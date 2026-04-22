import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-electric-purple bg-opacity-20">
      <Card className="w-full max-w-md rotate-1">
        <div className="flex justify-center">
          <h1 className="text-4xl mb-6 text-center text-off-white bg-electric-purple inline-block px-4 py-2 brutal-border transform rotate-2">register</h1>
        </div>
        
        {error && (
          <div className="bg-hot-pink text-off-white font-bold p-3 mb-4 brutal-border">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <Input 
            label="email address" 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input 
            label="username" 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            start trading
          </Button>
        </form>

        <p className="mt-6 text-center font-body text-sm font-bold">
          already have an account? <Link to="/login" className="text-electric-purple hover:underline">login here</Link>
        </p>
      </Card>
    </div>
  );
};
