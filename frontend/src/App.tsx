import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Market } from './pages/Market';
import { StockDetail } from './pages/StockDetail';
import { PortfolioPage } from './pages/PortfolioPage';
import { HistoryPage } from './pages/HistoryPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { AchievementsPage } from './pages/AchievementsPage';
import { WatchlistPage } from './pages/WatchlistPage';
import { LandingPage } from './pages/LandingPage';
import { Navbar } from './components/Navbar';
import { useAuthStore } from './store/useAuthStore';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuthStore();
  return token ? <div className="pt-24">{children}</div> : <Navigate to="/login" />;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuthStore();
  return token ? <Navigate to="/dashboard" /> : children;
};

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <PublicRoute>
            <LandingPage />
          </PublicRoute>
        } />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/market" element={
          <PrivateRoute>
            <Market />
          </PrivateRoute>
        } />
        <Route path="/stock/:ticker" element={
          <PrivateRoute>
            <StockDetail />
          </PrivateRoute>
        } />
        <Route path="/portfolio" element={
          <PrivateRoute>
            <PortfolioPage />
          </PrivateRoute>
        } />
        <Route path="/history" element={
          <PrivateRoute>
            <HistoryPage />
          </PrivateRoute>
        } />
        <Route path="/leaderboard" element={
          <PrivateRoute>
            <LeaderboardPage />
          </PrivateRoute>
        } />
        <Route path="/achievements" element={
          <PrivateRoute>
            <AchievementsPage />
          </PrivateRoute>
        } />
        <Route path="/watchlist" element={
          <PrivateRoute>
            <WatchlistPage />
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
