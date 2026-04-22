import { useAuthStore } from '../store/useAuthStore';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://stock-trainer-v2.vercel.app/api';

export const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
  const { token, logout } = useAuthStore.getState();
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (response.status === 401) {
    logout();
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    throw new Error(data.error || 'API Request Failed');
  }

  return data;
};
