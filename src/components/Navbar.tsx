import React from 'react';
import { Shield, ShieldAlert, Activity, History, Info, Users, LogIn, LogOut, Terminal, Network, BarChart3 } from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  user: UserProfile | null;
  onLoginClick: () => void;
  onLogoutClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  user,
  onLoginClick,
  onLogoutClick
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-cyan-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div 
            id="nav-brand-logo"
            onClick={() => setCurrentTab('landing')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-base tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  PhishGuard<span className="text-cyan-400 font-mono">.AI</span>
                </span>
                <span className="text-[10px] font-mono uppercase bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 px-1.5 py-0.5 rounded">
                  ITA1402
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Ethical Hacking Capstone</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <button
              id="nav-btn-landing"
              onClick={() => setCurrentTab('landing')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                currentTab === 'landing' 
                  ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              Home
            </button>

            <button
              id="nav-btn-dashboard"
              onClick={() => setCurrentTab(user ? 'dashboard' : 'login')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center space-x-1.5 transition-all ${
                currentTab === 'dashboard' 
                  ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span>Dashboard</span>
            </button>

            <button
              id="nav-btn-history"
              onClick={() => setCurrentTab(user ? 'history' : 'login')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center space-x-1.5 transition-all ${
                currentTab === 'history' 
                  ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <History className="w-3.5 h-3.5 text-cyan-400" />
              <span>Detection History</span>
            </button>

            <button
              id="nav-btn-architecture"
              onClick={() => setCurrentTab('architecture')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center space-x-1.5 transition-all ${
                currentTab === 'architecture' 
                  ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <Network className="w-3.5 h-3.5 text-cyan-400" />
              <span>Architecture</span>
            </button>

            <button
              id="nav-btn-results"
              onClick={() => setCurrentTab('results')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center space-x-1.5 transition-all ${
                currentTab === 'results' 
                  ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Result Analysis</span>
            </button>

            <button
              id="nav-btn-about"
              onClick={() => setCurrentTab('about')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center space-x-1.5 transition-all ${
                currentTab === 'about' 
                  ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <Info className="w-3.5 h-3.5 text-cyan-400" />
              <span>About Project</span>
            </button>

            <button
              id="nav-btn-team"
              onClick={() => setCurrentTab('team')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center space-x-1.5 transition-all ${
                currentTab === 'team' 
                  ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              <span>Project Team</span>
            </button>
          </nav>

          {/* User Auth Section */}
          <div className="flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 pl-2 pr-3 py-1 rounded-full bg-slate-900/80 border border-slate-800">
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={user.name} 
                      className="w-6 h-6 rounded-full object-cover border border-cyan-500/50"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-cyan-900/80 border border-cyan-500/40 text-cyan-300 text-[10px] font-bold flex items-center justify-center">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-xs font-medium text-slate-200 hidden lg:inline max-w-[120px] truncate">
                    {user.name}
                  </span>
                </div>

                <button
                  id="nav-btn-logout"
                  onClick={onLogoutClick}
                  title="Sign Out"
                  className="p-2 rounded-lg bg-slate-900 hover:bg-red-950/50 text-slate-400 hover:text-red-400 border border-slate-800 hover:border-red-900/50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                id="nav-btn-login"
                onClick={onLoginClick}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 text-xs font-semibold shadow-[0_0_15px_rgba(6,182,212,0.25)] transition-all"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In with Google</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
