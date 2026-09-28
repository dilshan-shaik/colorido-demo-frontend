import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, User, AlertCircle, Sparkles, ArrowLeft } from 'lucide-react';
import { loginAdmin } from '../services/api';
import { setToken, setUser } from '../services/auth';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const data = await loginAdmin(username, password);
      if (data.token) {
        setToken(data.token);
        setUser({
          username: data.username,
          fullName: data.fullName,
          role: data.role
        });
        navigate('/admin/dashboard');
      } else {
        setError('Login failed: Invalid server response.');
      }
    } catch (err) {
      setError(err.message || 'Invalid administrator credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#070913] relative overflow-hidden">
      
      {/* Background ambient auras */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-pink-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center text-xs font-semibold text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to Public Fest Site
        </Link>

        {/* Login Card */}
        <div className="p-8 rounded-3xl bg-[#0c1022] border border-purple-900/50 shadow-2xl space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 p-0.5 mx-auto flex items-center justify-center shadow-lg shadow-purple-600/30">
              <div className="w-full h-full bg-[#0d1020] rounded-[14px] flex items-center justify-center">
                <Shield className="w-6 h-6 text-pink-400" />
              </div>
            </div>
            <h2 className="text-2xl font-black text-white tracking-wide">
              Admin Portal
            </h2>
            <p className="text-xs text-gray-400">
              COLORIDO 2K26 Festival Management Console
            </p>
          </div>

          {error && (
            <div className="p-3.5 bg-red-950/40 border border-red-500/40 rounded-xl flex items-center space-x-2 text-xs text-red-300">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                Admin Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. admin"
                  className="w-full bg-[#13172b] text-white text-sm pl-10 pr-4 py-2.5 rounded-xl border border-purple-900/40 focus:outline-none focus:border-pink-500 transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#13172b] text-white text-sm pl-10 pr-4 py-2.5 rounded-xl border border-purple-900/40 focus:outline-none focus:border-pink-500 transition-colors"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-pink-600/30 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 mt-2"
            >
              {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
            </button>

          </form>

          {/* Seed hint box */}
          <div className="p-3 bg-purple-950/30 border border-purple-800/30 rounded-xl text-center space-y-1">
            <p className="text-[11px] text-purple-300 font-medium">Competition Demonstration Credentials:</p>
            <p className="text-xs text-white font-mono"></p>
          </div>

        </div>

        <p className="text-[11px] text-gray-500 text-center">
          R.V.R. & J.C. College of Engineering • COLORIDO Fest Operations
        </p>

      </div>
    </div>
  );
}
