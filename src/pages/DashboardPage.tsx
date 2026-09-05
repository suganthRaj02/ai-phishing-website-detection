import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Search, 
  Sparkles, 
  AlertCircle, 
  Activity, 
  History, 
  ArrowRight, 
  RefreshCw,
  Terminal
} from 'lucide-react';
import { UserProfile, DetectionResult, DashboardStats } from '../types';
import { analyzeWebsiteUrl } from '../services/api';
import { saveDetectionRecord, getUserDetections, calculateDashboardStats } from '../firebase/firestore';
import { StatsOverview } from '../components/StatsOverview';
import { AnalysisAnimation } from '../components/AnalysisAnimation';
import { ResultCard } from '../components/ResultCard';
import { DemoSelector } from '../components/DemoSelector';

interface DashboardPageProps {
  user: UserProfile;
  onNavigateToHistory: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ user, onNavigateToHistory }) => {
  const [inputUrl, setInputUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [pendingResult, setPendingResult] = useState<DetectionResult | null>(null);
  const [activeResult, setActiveResult] = useState<DetectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [savedToFirestore, setSavedToFirestore] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    totalScans: 0,
    legitimateCount: 0,
    phishingCount: 0,
    highRiskCount: 0,
    averageRiskScore: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);

  // Load user stats from Firestore on mount
  useEffect(() => {
    loadUserStats();
  }, [user.uid]);

  const loadUserStats = async () => {
    setLoadingStats(true);
    try {
      const records = await getUserDetections(user.uid);
      const computed = calculateDashboardStats(records);
      setStats(computed);
    } catch (err) {
      console.warn('Error loading stats from Firestore:', err);
    } finally {
      setLoadingStats(false);
    }
  };

  const handleAnalyze = async (urlToScan?: string) => {
    const targetUrl = (urlToScan || inputUrl).trim();
    if (!targetUrl) {
      setError('Please enter a website URL (e.g., https://example.com)');
      return;
    }

    setError(null);
    setIsAnalyzing(true);
    setActiveResult(null);
    setSavedToFirestore(false);

    try {
      // 1. Run real prediction through API
      const result = await analyzeWebsiteUrl(targetUrl);
      setPendingResult(result);
    } catch (err: any) {
      setError(err.message || 'Failed to analyze website. Please check URL format.');
      setIsAnalyzing(false);
    }
  };

  const handleAnimationComplete = async () => {
    if (pendingResult) {
      setActiveResult(pendingResult);
      setIsAnalyzing(false);

      // Auto scroll to result section for instant visibility
      setTimeout(() => {
        const resultElem = document.getElementById('detection-result-section');
        if (resultElem) {
          resultElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);

      // 2. Save result to Firebase Firestore
      try {
        await saveDetectionRecord(user.uid, pendingResult);
        setSavedToFirestore(true);
        // Refresh live stats
        loadUserStats();
      } catch (saveErr) {
        console.warn('Firestore persistence issue:', saveErr);
      }
    }
  };

  const handleSelectDemoUrl = (url: string) => {
    setInputUrl(url);
    handleAnalyze(url);
  };

  const handleResetScan = () => {
    setInputUrl('');
    setActiveResult(null);
    setPendingResult(null);
    setError(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Dashboard Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Phishing Detector
            </h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800">
              v1.0 ML Engine
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Logged in as <span className="text-cyan-300 font-medium">{user.name}</span> ({user.email})
          </p>
        </div>

        <button
          onClick={onNavigateToHistory}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-mono border border-slate-700 hover:border-cyan-500/50 transition-all self-start md:self-auto"
        >
          <History className="w-4 h-4 text-cyan-400" />
          <span>View Detection History</span>
        </button>
      </div>

      {/* Live Firestore Stats Cards */}
      <StatsOverview stats={stats} loading={loadingStats} />

      {/* Main Analysis Input Box */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-cyan-950/80 shadow-2xl backdrop-blur-md relative">
        <div className="space-y-2 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Detect Phishing Websites with AI</span>
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Analyze website characteristics and identify potential phishing threats using machine learning.
          </p>
        </div>

        {/* URL Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAnalyze();
          }}
          className="space-y-4"
        >
          <div className="relative flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Search className="w-4 h-4" />
              </div>
              <input
                id="url-input-field"
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="Enter website URL (e.g. https://secure-bank-login.xyz)..."
                disabled={isAnalyzing}
                className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all disabled:opacity-60"
              />
            </div>

            <button
              id="btn-analyze-website"
              type="submit"
              disabled={isAnalyzing || !inputUrl.trim()}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Shield className="w-4 h-4" />
              <span>{isAnalyzing ? 'Analyzing...' : 'ANALYZE WEBSITE'}</span>
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-950/60 border border-red-800 text-xs text-red-300 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </form>

        {/* Preset Synthetic Demo Cases */}
        <DemoSelector onSelectUrl={handleSelectDemoUrl} />
      </div>

      {/* Real-time Analysis Steps Animation */}
      {isAnalyzing && (
        <AnalysisAnimation url={inputUrl} onComplete={handleAnimationComplete} />
      )}

      {/* Completed Result Card */}
      {activeResult && !isAnalyzing && (
        <ResultCard
          result={activeResult}
          savedToFirestore={savedToFirestore}
          onScanAnother={handleResetScan}
        />
      )}
    </div>
  );
};
