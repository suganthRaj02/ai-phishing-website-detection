import React from 'react';
import { RiskLevelType } from '../types';

interface RiskGaugeProps {
  score: number; // 0 - 100
  riskLevel: RiskLevelType;
  classification: 'LEGITIMATE' | 'PHISHING';
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({ score, riskLevel, classification }) => {
  const isHighRisk = score > 70 || riskLevel === 'HIGH RISK';
  const isPhishing = !isHighRisk && (classification === 'PHISHING' || score > 30);
  
  // Color determination
  let strokeColor = '#10b981'; // green (Low)
  let badgeColor = 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40';
  let tierLabel = 'LEGITIMATE';
  
  if (isHighRisk) {
    strokeColor = '#ef4444'; // red (High)
    badgeColor = 'bg-red-950/80 text-red-300 border-red-500/40';
    tierLabel = 'HIGH RISK';
  } else if (isPhishing) {
    strokeColor = '#f59e0b'; // amber (Medium)
    badgeColor = 'bg-amber-950/80 text-amber-300 border-amber-500/40';
    tierLabel = 'PHISHING';
  }

  // SVG Gauge calculations
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative flex items-center justify-center">
        <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 160 160">
          {/* Background circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="#1e293b"
            strokeWidth="12"
            fill="transparent"
          />
          {/* Animated score circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke={strokeColor}
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center label */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-black font-mono tracking-tight text-white">
            {score}%
          </span>
          <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">
            Risk Score
          </span>
        </div>
      </div>

      {/* Risk Level Badge */}
      <div className="mt-3 text-center space-y-1">
        <span className={`inline-block px-3 py-0.5 rounded-full text-xs font-mono font-bold tracking-wider border ${badgeColor}`}>
          {tierLabel} ({riskLevel})
        </span>
        <div className="text-[11px] text-slate-400 font-mono">
          <span className="text-emerald-400">0–30% Legit</span> | <span className="text-amber-400">31–70% Phish</span> | <span className="text-red-400">71–100% High Risk</span>
        </div>
      </div>
    </div>
  );
};
