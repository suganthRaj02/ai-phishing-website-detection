import React from 'react';
import { 
  Shield, 
  ShieldCheck, 
  ShieldAlert, 
  Cpu, 
  Activity, 
  Search, 
  Database, 
  Lock, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Layers, 
  FileCode,
  GraduationCap,
  BarChart3,
  TrendingUp
} from 'lucide-react';
import resultAnalysisImg from '../assets/images/result_analysis_graph_1788233786000.jpg';

import { UserProfile } from '../types';

interface LandingPageProps {
  user: UserProfile | null;
  onAnalyzeClick: () => void;
  onAboutClick: () => void;
  onTeamClick: () => void;
  onResultsClick?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  user,
  onAnalyzeClick,
  onAboutClick,
  onTeamClick,
  onResultsClick
}) => {
  return (
    <div className="space-y-24 py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Background Cybersecurity Mesh / Grid Effect */}
        <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center opacity-25">
          <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-cyan-600/30 via-blue-700/20 to-purple-800/10 blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Capstone Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-xs font-mono shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>ITA1402 Ethical Hacking Capstone Project</span>
          </div>

          {/* Main Hero Headings */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">Phishing Website Detection</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
              Detect suspicious websites before they put your sensitive information at risk. Engineered with deep URL feature extraction, trained Random Forest machine learning models, and real-time risk scoring.
            </p>
          </div>

          {/* Authentication Requirement Gate Notice */}
          {!user && (
            <div className="max-w-lg mx-auto p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 text-left flex items-center space-x-3.5 shadow-lg backdrop-blur-sm">
              <div className="p-2.5 rounded-lg bg-cyan-900/60 border border-cyan-400/40 text-cyan-300 flex-shrink-0">
                <Lock className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-white font-mono flex items-center space-x-1.5">
                  <span>Google Authentication Required</span>
                  <span className="text-[10px] text-cyan-300 bg-cyan-950 px-1.5 py-0.2 rounded border border-cyan-700">Required</span>
                </div>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  Sign in with your Google account to access the AI analyzer, execute real-time URL feature scans, and persist detection audits in Firestore.
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              id="hero-btn-analyze"
              onClick={onAnalyzeClick}
              className={`w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(6,182,212,0.35)] flex items-center justify-center space-x-2 transition-all group ${
                user
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950'
                  : 'bg-white hover:bg-slate-100 text-slate-900 border border-white'
              }`}
            >
              {!user && (
                <svg className="w-4 h-4 mr-1 flex-shrink-0" viewBox="0 0 24 24">
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
              )}
              <span>{user ? 'Launch AI Analyzer Dashboard' : 'Sign in with Google to Analyze'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="hero-btn-about"
              onClick={onAboutClick}
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700 hover:border-slate-600 flex items-center justify-center space-x-2 transition-all"
            >
              <span>About Project</span>
            </button>

            {onResultsClick && (
              <button
                id="hero-btn-results"
                onClick={onResultsClick}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-cyan-950/70 hover:bg-cyan-900/80 text-cyan-300 font-semibold text-sm border border-cyan-700/60 flex items-center justify-center space-x-2 transition-all"
              >
                <BarChart3 className="w-4 h-4 text-cyan-400" />
                <span>Result Analysis Graph</span>
              </button>
            )}
          </div>

          {/* Live Feature Highlights Bar */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <div className="text-cyan-400 text-xs font-mono mb-1 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                <span>Feature Extraction</span>
              </div>
              <div className="text-white font-bold text-sm">12 Dimensional</div>
              <div className="text-[11px] text-slate-400">Lexical & structural</div>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <div className="text-cyan-400 text-xs font-mono mb-1 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                <span>ML Model</span>
              </div>
              <div className="text-white font-bold text-sm">Random Forest</div>
              <div className="text-[11px] text-slate-400">scikit-learn trained</div>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <div className="text-cyan-400 text-xs font-mono mb-1 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5" />
                <span>Risk Scoring</span>
              </div>
              <div className="text-white font-bold text-sm">0 – 100 Meter</div>
              <div className="text-[11px] text-slate-400">Low, Med & High risk</div>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <div className="text-cyan-400 text-xs font-mono mb-1 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5" />
                <span>Cloud Storage</span>
              </div>
              <div className="text-white font-bold text-sm">Firestore Sync</div>
              <div className="text-[11px] text-slate-400">Detection audit trail</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
            System Workflow
          </h2>
          <h3 className="text-3xl font-bold text-white">
            How PhishGuard AI Works
          </h3>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">
            From raw input string to machine learning threat classification in under 100 milliseconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {[
            {
              step: '01',
              title: 'Enter Website URL',
              desc: 'User inputs full or truncated target domain for real-time security scanning.',
              icon: Search
            },
            {
              step: '02',
              title: 'Extract Features',
              desc: 'Parser decomposes URL into 12 structural attributes (lengths, dots, symbols, TLDs).',
              icon: Layers
            },
            {
              step: '03',
              title: 'Analyze with AI/ML',
              desc: 'Feature vector is evaluated by the trained Random Forest classifier.',
              icon: Cpu
            },
            {
              step: '04',
              title: 'Generate Risk Score',
              desc: 'Model outputs calibrated risk score (0-100%) and categorizes threat severity.',
              icon: Activity
            },
            {
              step: '05',
              title: 'Security Alert',
              desc: 'Displays actionable guidance and synchronizes report to Firebase Firestore.',
              icon: ShieldAlert
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/80 px-2 py-1 rounded border border-cyan-800/60">
                      STEP {item.step}
                    </span>
                    <div className="p-2 rounded-lg bg-slate-800 text-slate-300 group-hover:text-cyan-400 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1.5">{item.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Project Modules Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
            Core Architecture
          </h2>
          <h3 className="text-3xl font-bold text-white">
            Project Modules
          </h3>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">
            Architected in three cohesive engineering modules as specified for the Ethical Hacking capstone requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Module 1 */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-all flex flex-col justify-between shadow-lg">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <FileCode className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block">
                Module 1
              </span>
              <h4 className="text-lg font-bold text-white">Website Feature Extraction</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Extracts 12 critical lexical and structural indicators: URL length, HTTPS verification, dot counts, special characters, IP-as-host, @ symbol redirection, hyphen patterns, subdomains, and suspicious phishing keywords.
              </p>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 font-mono text-[11px] text-cyan-300">
                &bull; URL Length & HTTPS<br />
                &bull; IP Address & @ Symbol<br />
                &bull; Subdomain & Keyword Vector
              </div>
            </div>
          </div>

          {/* Module 2 */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-all flex flex-col justify-between shadow-lg">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-500/40 flex items-center justify-center text-blue-400">
                <Cpu className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono text-blue-400 uppercase tracking-wider block">
                Module 2
              </span>
              <h4 className="text-lg font-bold text-white">AI-Based Phishing Detection</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Loads pre-trained <code className="text-white">phishing_model.pkl</code> via FastAPI endpoint <code className="text-white">POST /api/predict</code>. Executes model inference on the extracted vector to classify sites as LEGITIMATE or PHISHING.
              </p>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 font-mono text-[11px] text-blue-300">
                &bull; Scikit-Learn Model<br />
                &bull; Probability Calibration<br />
                &bull; POST /api/predict API
              </div>
            </div>
          </div>

          {/* Module 3 */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-all flex flex-col justify-between shadow-lg">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center text-purple-400">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono text-purple-400 uppercase tracking-wider block">
                Module 3
              </span>
              <h4 className="text-lg font-bold text-white">Detection & Alert System</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Computes 0-100 risk score, flags critical phishing threats (OTPs, passwords, banking risks), issues safety recommendations, and logs records into Firestore for user audit trails.
              </p>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 font-mono text-[11px] text-purple-300">
                &bull; 0–30 Low | 31–70 Med | 71–100 High<br />
                &bull; Firestore Audit Log<br />
                &bull; Google Auth History
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Machine Learning Result Analysis Showcase */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-cyan-500/30 space-y-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 text-xs font-mono">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Empirical Model Benchmarks</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Machine Learning Result Analysis Graph
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                Comparative classification analysis demonstrating 97.4% accuracy, ROC-AUC curve = 0.985, and low false positive rates across diverse URL attack vectors.
              </p>
            </div>

            {onResultsClick && (
              <button
                onClick={onResultsClick}
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono shadow-[0_0_20px_rgba(6,182,212,0.35)] transition-all flex-shrink-0"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Open Full Metrics View</span>
              </button>
            )}
          </div>

          {/* Embedded Image Graphic */}
          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950/80 shadow-2xl">
            <img
              src={resultAnalysisImg}
              alt="AI Phishing Detection Machine Learning Result Analysis Graph"
              className="w-full h-auto object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Capstone Team Highlight */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-2xl bg-slate-900/90 border border-cyan-500/30 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 text-xs font-mono">
            <GraduationCap className="w-4 h-4" />
            <span>Capstone Research Team</span>
          </div>

          <h3 className="text-2xl font-bold text-white">
            Department of Information Technology & Ethical Hacking
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-white font-bold text-sm">Manu Neethi S</div>
              <div className="text-cyan-400 font-mono text-xs">192521063</div>
              <div className="text-[11px] text-slate-400 mt-1">Lead Developer & ML Engineer</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-white font-bold text-sm">Sugantharaj A</div>
              <div className="text-cyan-400 font-mono text-xs">192421416</div>
              <div className="text-[11px] text-slate-400 mt-1">Frontend & Firebase Integration</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-white font-bold text-sm">Dinesh Karthik R.</div>
              <div className="text-cyan-400 font-mono text-xs">192524121</div>
              <div className="text-[11px] text-slate-400 mt-1">Feature Extraction & Testing</div>
            </div>
          </div>

          <div className="pt-2 text-xs text-slate-400 font-mono">
            Project Guide: <span className="text-white font-semibold">Dr. Smitha</span> &bull; Course: <span className="text-cyan-300">ITA1402 – Ethical Hacking</span>
          </div>
        </div>
      </section>
    </div>
  );
};
