import React, { useEffect, useState } from 'react';
import { 
  CheckCircle2, 
  Loader2, 
  Layers, 
  Cpu, 
  ShieldAlert, 
  Database, 
  Bell,
  Sparkles,
  Zap
} from 'lucide-react';

interface AnalysisAnimationProps {
  url?: string;
  onComplete?: () => void;
}

export const AnalysisAnimation: React.FC<AnalysisAnimationProps> = ({ url = '', onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      module: 'MODULE 1',
      title: 'Website Feature Extraction',
      detail: 'Extracting 12 URL features (Length, HTTPS, Dots, Specials, IP, @, Hyphen, Subdomains, Age, SSL, Redirects, Keywords)',
      icon: Layers,
      color: 'text-emerald-400',
    },
    {
      module: 'MODULE 2',
      title: 'AI-Based Phishing Detection',
      detail: 'Executing 6 AI Processing Steps: Cleaning → Scaling → Train-Test Split → Random Forest Model → Prediction → Evaluation',
      icon: Cpu,
      color: 'text-blue-400',
    },
    {
      module: 'MODULE 3',
      title: 'Phishing Detection & Alert System',
      detail: 'Calculating multi-factor risk score, confidence boundary, and evaluating security threshold alerts',
      icon: ShieldAlert,
      color: 'text-amber-400',
    },
    {
      module: 'DATABASE & LOGGING',
      title: 'Firestore Database & Audit Logging',
      detail: 'Syncing feature vectors, prediction results, and user query metadata to Cloud Firestore',
      icon: Database,
      color: 'text-purple-400',
    },
    {
      module: 'USER NOTIFICATION',
      title: 'Result Display & Recommendations',
      detail: 'Formatting final Legitimate vs Phishing verdict, threat indicators, and defensive actions',
      icon: Bell,
      color: 'text-cyan-400',
    }
  ];

  // Ultra-fast pipeline progression (~90ms per step = <0.5s total)
  useEffect(() => {
    const stepDuration = 90;
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          if (onComplete) {
            setTimeout(onComplete, 80);
          }
          return prev;
        }
      });
    }, stepDuration);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/95 border border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.15)] space-y-5 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-3.5 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/50 flex items-center justify-center text-cyan-400">
            <Zap className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center space-x-2">
              <span>Executing High-Speed AI Pipeline</span>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            </h3>
            {url && (
              <p className="text-xs text-slate-400 font-mono break-all">
                Target: <span className="text-cyan-300">{url}</span>
              </p>
            )}
          </div>
        </div>

        <div className="text-right font-mono text-xs text-slate-400 flex items-center space-x-2">
          <span className="text-cyan-400 font-bold">Step {currentStep + 1}</span> of {steps.length}
          {onComplete && (
            <button
              onClick={onComplete}
              className="ml-2 px-2.5 py-1 text-[11px] font-mono bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded font-bold transition-colors"
            >
              Skip →
            </button>
          )}
        </div>
      </div>

      {/* Pipeline Steps List */}
      <div className="space-y-2.5">
        {steps.map((step, idx) => {
          const isDone = idx < currentStep;
          const isCurrent = idx === currentStep;
          const StepIcon = step.icon;

          return (
            <div
              key={idx}
              className={`p-3 rounded-xl border transition-all duration-150 flex items-center space-x-3 ${
                isCurrent
                  ? 'bg-slate-900 border-cyan-500/70 shadow-[0_0_20px_rgba(6,182,212,0.2)] scale-[1.01]'
                  : isDone
                  ? 'bg-slate-950/70 border-slate-800 opacity-95'
                  : 'bg-slate-950/30 border-slate-900 opacity-40'
              }`}
            >
              <div className="flex-shrink-0">
                {isDone ? (
                  <div className="w-6 h-6 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-700/60 flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                ) : isCurrent ? (
                  <div className="w-6 h-6 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-600 flex items-center justify-center animate-spin">
                    <Loader2 className="w-3.5 h-3.5" />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-lg bg-slate-900 text-slate-600 border border-slate-800 flex items-center justify-center font-mono text-xs">
                    {idx + 1}
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono font-bold uppercase px-1.5 py-0.2 rounded bg-slate-900 text-slate-400 border border-slate-800">
                    {step.module}
                  </span>
                  <h4 className={`text-xs sm:text-sm font-bold font-mono ${isCurrent ? 'text-white' : isDone ? 'text-slate-200' : 'text-slate-500'}`}>
                    {step.title}
                  </h4>
                </div>
                <p className={`text-[11px] sm:text-xs mt-0.5 ${isCurrent ? 'text-slate-300 font-medium' : isDone ? 'text-slate-400' : 'text-slate-600'}`}>
                  {step.detail}
                </p>
              </div>

              {isCurrent && (
                <div className="flex items-center text-cyan-400 text-xs font-mono animate-pulse flex-shrink-0">
                  <span>Fast Inferencing...</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
