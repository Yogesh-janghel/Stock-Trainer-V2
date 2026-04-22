import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export const Navbar = () => {
  const { token, logout } = useAuthStore();
  const location = useLocation();

  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="pointer-events-auto flex items-center justify-between px-2 py-2 bg-white/90 backdrop-blur-md border-2 border-black rounded-full shadow-[6px_6px_0px_#000] w-full max-w-4xl transition-all">
        <div className="flex gap-6 items-center">
          <Link to={token ? "/dashboard" : "/"} className="flex items-center justify-center w-12 h-12 bg-acid-green border-2 border-black rounded-full font-display font-black text-2xl ml-1 shadow-[2px_2px_0px_#000] hover:translate-y-0.5 hover:shadow-[0px_0px_0px_#000] transition-all">
            s
          </Link>

          {token ? (
            <div className="hidden md:flex gap-6 ml-2">
              <Link to="/dashboard" className={`font-bold text-sm tracking-wide hover:underline ${location.pathname === '/dashboard' ? 'text-electric-purple' : 'text-black'}`}>dashboard</Link>
              <Link to="/market" className={`font-bold text-sm tracking-wide hover:underline ${location.pathname === '/market' ? 'text-electric-purple' : 'text-black'}`}>market</Link>
              <Link to="/portfolio" className={`font-bold text-sm tracking-wide hover:underline ${location.pathname === '/portfolio' ? 'text-electric-purple' : 'text-black'}`}>portfolio</Link>
              <Link to="/leaderboard" className={`font-bold text-sm tracking-wide hover:underline ${location.pathname === '/leaderboard' ? 'text-electric-purple' : 'text-black'}`}>leaderboard</Link>
              <Link to="/achievements" className={`font-bold text-sm tracking-wide hover:underline ${location.pathname === '/achievements' ? 'text-electric-purple' : 'text-black'}`}>achievements</Link>
              <Link to="/history" className={`font-bold text-sm tracking-wide hover:underline ${location.pathname === '/history' ? 'text-electric-purple' : 'text-black'}`}>history</Link>
            </div>
          ) : (
            <div className="hidden md:flex gap-6 ml-2">
              <a href="#features" className="font-bold text-sm tracking-wide hover:underline text-black">features</a>
              <a href="#faq" className="font-bold text-sm tracking-wide hover:underline text-black">faq</a>
            </div>
          )}
        </div>

        <div className="flex gap-4 pr-1">
          {token ? (
            <button onClick={logout} className="px-6 py-2.5 bg-black text-white font-bold text-sm rounded-full hover:bg-electric-purple transition-colors shadow-[2px_2px_0px_#ccff00] hover:shadow-none hover:translate-y-0.5">
              logout
            </button>
          ) : (
            <>
              <Link to="/login" className="px-6 py-2.5 bg-off-white border-2 border-black text-black font-bold text-sm rounded-full hover:bg-acid-green transition-colors hidden sm:block">
                login
              </Link>
              <Link to="/register" className="px-6 py-2.5 bg-black text-white font-bold text-sm rounded-full hover:bg-electric-purple transition-colors shadow-[2px_2px_0px_#ccff00] hover:shadow-none hover:translate-y-0.5">
                register
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};
