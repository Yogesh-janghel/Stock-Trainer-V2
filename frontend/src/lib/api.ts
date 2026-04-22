import { useAuthStore } from '../store/useAuthStore';

const BASE_URL = 'http://localhost:4000/api';

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
