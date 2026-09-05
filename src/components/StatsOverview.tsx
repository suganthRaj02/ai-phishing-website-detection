import React from 'react';
import { DashboardStats } from '../types';
import { Shield, ShieldAlert, ShieldCheck, AlertTriangle, Activity } from 'lucide-react';

interface StatsOverviewProps {
  stats: DashboardStats;
  loading?: boolean;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ stats, loading = false }) => {
  const cards = [
    {
      id: 'stat-total-scans',
      title: 'Total Scans',
      value: stats.totalScans,
      subtitle: 'Processed URLs',
      icon: Activity,
      borderColor: 'border-cyan-500/30',
      bgColor: 'bg-cyan-950/20',
      textColor: 'text-cyan-400',
      glow: 'shadow-[0_0_20px_rgba(6,182,212,0.1)]',
    },
    {
      id: 'stat-legitimate',
      title: 'Legitimate',
      value: stats.legitimateCount,
      subtitle: `${stats.totalScans > 0 ? Math.round((stats.legitimateCount / stats.totalScans) * 100) : 0}% of scans`,
      icon: ShieldCheck,
      borderColor: 'border-emerald-500/30',
      bgColor: 'bg-emerald-950/20',
      textColor: 'text-emerald-400',
      glow: 'shadow-[0_0_20px_rgba(16,185,129,0.1)]',
    },
    {
      id: 'stat-phishing',
      title: 'Phishing',
      value: stats.phishingCount,
      subtitle: `${stats.totalScans > 0 ? Math.round((stats.phishingCount / stats.totalScans) * 100) : 0}% of scans`,
      icon: ShieldAlert,
      borderColor: 'border-red-500/30',
      bgColor: 'bg-red-950/20',
      textColor: 'text-red-400',
      glow: 'shadow-[0_0_20px_rgba(239,68,68,0.1)]',
    },
    {
      id: 'stat-high-risk',
      title: 'High Risk',
      value: stats.highRiskCount,
      subtitle: 'Score > 70%',
      icon: AlertTriangle,
      borderColor: 'border-amber-500/30',
      bgColor: 'bg-amber-950/20',
      textColor: 'text-amber-400',
      glow: 'shadow-[0_0_20px_rgba(245,158,11,0.1)]',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            id={card.id}
            className={`p-4 rounded-xl border bg-slate-900/80 backdrop-blur-sm transition-all hover:translate-y-[-2px] ${card.borderColor} ${card.glow}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
                {card.title}
              </span>
              <div className={`p-2 rounded-lg ${card.bgColor} ${card.textColor}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-3">
              <div className="text-2xl font-bold font-mono text-white tracking-tight">
                {loading ? (
                  <span className="inline-block w-8 h-6 bg-slate-800 animate-pulse rounded" />
                ) : (
                  card.value
                )}
              </div>
              <p className="text-[11px] text-slate-400 mt-1 font-mono">{card.subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
