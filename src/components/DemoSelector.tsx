import React from 'react';
import { Sparkles, ShieldCheck, AlertTriangle, ShieldAlert } from 'lucide-react';

interface DemoSelectorProps {
  onSelectUrl: (url: string) => void;
}

export const DemoSelector: React.FC<DemoSelectorProps> = ({ onSelectUrl }) => {
  const demoCases = [
    {
      id: 'demo-legit',
      label: 'Test 1: Legitimate',
      url: 'https://github.com/security/advisories',
      tag: 'Legitimate (HTTPS & Clean)',
      icon: ShieldCheck,
      color: 'border-emerald-500/40 text-emerald-400 hover:bg-emerald-950/30',
    },
    {
      id: 'demo-phish',
      label: 'Test 2: Phishing',
      url: 'http://paypal-security-update-verify.com/login.php',
      tag: 'Brand Spoofing & HTTP',
      icon: AlertTriangle,
      color: 'border-amber-500/40 text-amber-400 hover:bg-amber-950/30',
    },
    {
      id: 'demo-highrisk',
      label: 'Test 3: High Risk',
      url: 'http://192.168.1.105/banking-auth@secure-login.net/confirm',
      tag: 'IP Host + @ Redirection',
      icon: ShieldAlert,
      color: 'border-red-500/40 text-red-400 hover:bg-red-950/30',
    },
  ];

  return (
    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 my-4">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
            Demo Test Cases (Synthetic Benchmark)
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
          DEMO DATA
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {demoCases.map((c) => {
          const Icon = c.icon;
          return (
            <button
              key={c.id}
              id={c.id}
              onClick={() => onSelectUrl(c.url)}
              className={`flex flex-col text-left p-3 rounded-lg border bg-slate-950/80 transition-all ${c.color}`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-xs text-white">{c.label}</span>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] font-mono text-slate-400 truncate w-full mb-1">
                {c.url}
              </span>
              <span className="text-[10px] text-slate-400">
                {c.tag}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
