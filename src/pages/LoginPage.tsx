import React, { useState } from 'react';
import { Shield, Lock, ArrowRight, AlertCircle, CheckCircle2, Sparkles, UserCheck } from 'lucide-react';
import { signInWithGoogle } from '../firebase/auth';
import { UserProfile } from '../types';

interface LoginPageProps {
  onLoginSuccess: (user: UserProfile) => void;
  onDemoLogin: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onDemoLogin }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const user = await signInWithGoogle();
      if (user) {
        onLoginSuccess({
          uid: user.uid,
          name: user.displayName || 'Capstone Researcher',
          email: user.email || 'researcher@college.edu',
          photoURL: user.photoURL || undefined,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        });
      }
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      setError(
        err.message?.includes('popup') || err.message?.includes('blocked')
          ? 'Google Sign-In popup was blocked or closed. You can also use Quick Demo Access below.'
          : 'Authentication error: ' + (err.message || 'Unable to connect to Google Auth.')
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-slate-900/90 border border-cyan-950/80 p-8 rounded-2xl shadow-2xl backdrop-blur-md relative overflow-hidden">
        {/* Decorative ambient light */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-blue-600/30 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
            <Shield className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-black text-white tracking-tight">
              AI Phishing Website Detector
            </h2>
            <p className="text-xs text-cyan-400 font-mono">
              ITA1402 – Ethical Hacking Capstone
            </p>
          </div>

          <p className="text-xs text-slate-300">
            Protect yourself from suspicious websites. Authenticate with Google to manage scans and synchronize detection history with Firestore.
          </p>
        </div>

        {/* Error notification */}
        {error && (
          <div className="p-3.5 rounded-lg bg-red-950/60 border border-red-800 text-xs text-red-300 flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Primary Google Login Button */}
        <div className="space-y-4">
          <button
            id="login-btn-google"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-xs flex items-center justify-center space-x-3 shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
          >
            {/* Official Google 'G' icon */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{loading ? 'Authenticating...' : 'Continue with Google'}</span>
          </button>

          {/* Quick Demo Access Button */}
          <div className="pt-3 border-t border-slate-800 text-center">
            <button
              id="login-btn-demo"
              onClick={onDemoLogin}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-cyan-300 font-mono text-xs border border-slate-700 flex items-center justify-center space-x-2 transition-colors"
            >
              <UserCheck className="w-4 h-4 text-cyan-400" />
              <span>Continue as Capstone Evaluator (Demo Session)</span>
            </button>
            <p className="text-[11px] text-slate-400 mt-2">
              For evaluation when Google popups are restricted in container preview.
            </p>
          </div>
        </div>

        {/* Security badges */}
        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-center space-x-4 text-[11px] text-slate-400 font-mono">
          <span className="flex items-center space-x-1">
            <Lock className="w-3 h-3 text-cyan-400" />
            <span>Firebase Auth</span>
          </span>
          <span>&bull;</span>
          <span className="flex items-center space-x-1">
            <Shield className="w-3 h-3 text-cyan-400" />
            <span>Firestore Rules</span>
          </span>
        </div>
      </div>
    </div>
  );
};
