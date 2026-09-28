import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles, LogIn, Shield, ExternalLink, User } from 'lucide-react';
import { isAuthenticated, getUser } from '../services/auth';

export default function Navbar({ festInfo }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(isAuthenticated());
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update auth state on route changes
  useEffect(() => {
    setIsAdmin(isAuthenticated());
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'EVENTS', path: '/events' },
    { name: 'SCHEDULE', path: '/schedule' },
    // { name: 'MAP', path: '/map' },
    { name: 'GALLERY', path: '/gallery' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONTACT', path: '/contact' },
  ];

  const festName = festInfo?.festName || 'COLORIDO 2K26';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#090b14]/95 backdrop-blur-md border-b border-purple-900/40 shadow-xl shadow-purple-950/30 py-2.5' 
        : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & College Identity */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-600 to-amber-500 p-0.5 shadow-lg shadow-purple-600/30 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
              <div className="w-full h-full bg-[#0b0e1e] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl sm:text-2xl font-black tracking-wider bg-gradient-to-r from-white via-purple-200 to-pink-400 bg-clip-text text-transparent">
                  {festName}
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-bold tracking-widest bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full">
                  RVR & JC
                </span>
              </div>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium hidden md:block">
                R.V.R. & J.C. College of Engineering
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 text-xs lg:text-sm font-semibold tracking-wider transition-all duration-200 rounded-lg relative ${
                    isActive
                      ? 'text-white bg-purple-600/25 border border-purple-500/40 shadow-sm shadow-purple-500/20'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs (Register Now + PROMINENT LOGIN SYMBOL & BUTTON) */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/events"
              className="relative inline-flex items-center justify-center px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 rounded-xl shadow-md shadow-pink-600/25 hover:shadow-pink-600/50 hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-amber-300" />
              Register Now
            </Link>

            {/* DEDICATED PROMINENT LOGIN SYMBOL IN SITE */}
            <Link
              to={isAdmin ? "/admin/dashboard" : "/admin/login"}
              className={`inline-flex items-center space-x-2 px-3.5 py-2 text-xs font-bold rounded-xl border transition-all duration-200 shadow-md ${
                isAdmin
                  ? 'bg-purple-950/80 hover:bg-purple-900 border-emerald-500/50 text-emerald-300 shadow-emerald-950/30'
                  : 'bg-[#12162a] hover:bg-purple-950/60 border-purple-600/40 hover:border-pink-500/60 text-purple-200 hover:text-white shadow-purple-950/30'
              }`}
              title={isAdmin ? "Open Admin Dashboard" : "Admin Login"}
            >
              {isAdmin ? (
                <>
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Dashboard</span>
                </>
              ) : (
                <>
                  <LogIn className="w-3.5 h-3.5 text-pink-400" />
                  <span>Admin Login</span>
                </>
              )}
            </Link>
          </div>

          {/* Mobile Navigation Header Items */}
          <div className="flex md:hidden items-center space-x-2">
            
            {/* Prominent Mobile Login Symbol */}
            <Link
              to={isAdmin ? "/admin/dashboard" : "/admin/login"}
              className="p-2 text-xs font-bold bg-[#14182e] border border-purple-500/40 rounded-lg text-purple-200 flex items-center space-x-1"
              title="Admin Login"
            >
              <LogIn className="w-4 h-4 text-pink-400" />
              <span className="text-[10px]">{isAdmin ? "Admin" : "Login"}</span>
            </Link>

            <Link
              to="/events"
              className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-sm"
            >
              Register
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-300 hover:text-white bg-white/5 rounded-lg border border-white/10"
              aria-label="Toggle Navigation"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#090b14]/98 backdrop-blur-2xl border-b border-purple-900/40 px-4 pt-3 pb-6 space-y-2 animate-in fade-in duration-200">
          <div className="pb-2 border-b border-white/10 flex items-center justify-between">
            <p className="text-xs text-purple-300 font-semibold uppercase tracking-wider">
              {festInfo?.tagline || 'RVR & JC College of Engineering'}
            </p>
          </div>

          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`block px-4 py-2.5 rounded-lg text-sm font-semibold tracking-wider transition-colors ${
                  isActive
                    ? 'bg-purple-600/30 text-white border border-purple-500/40'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          {/* Prominent Admin Login Link in Drawer */}
          <div className="pt-3 border-t border-white/10">
            <Link
              to={isAdmin ? "/admin/dashboard" : "/admin/login"}
              className="flex items-center justify-between p-3 rounded-xl bg-purple-950/60 border border-purple-500/50 text-sm font-bold text-white hover:bg-purple-900/50"
            >
              <div className="flex items-center space-x-2.5">
                <LogIn className="w-4 h-4 text-pink-400" />
                <span>{isAdmin ? "Go to Admin Dashboard" : "Administrator Login"}</span>
              </div>
              <span className="text-[10px] font-mono text-purple-300 uppercase">
                {isAdmin ? "Authorized" : "Sign In"}
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
