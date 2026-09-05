import React, { useState } from 'react';
import { URLFeatures } from '../types';
import { Database, Code2, Check, X, AlertTriangle, ShieldCheck, Layers, FileSpreadsheet } from 'lucide-react';

interface FeatureTableProps {
  features: URLFeatures;
  featureVector: number[];
}

export const FeatureTable: React.FC<FeatureTableProps> = ({ features, featureVector }) => {
  const [showRawVector, setShowRawVector] = useState(false);

  // 12 Exact Features from Project Architecture (Module 1: Website Feature Extraction)
  const featureRows = [
    {
      id: 1,
      name: '1. URL Length',
      value: `${features.urlLength} chars`,
      isSuspicious: features.urlLength > 75,
      note: features.urlLength > 75 ? 'Abnormally high length (>75 chars)' : 'Standard character length (<=75)',
    },
    {
      id: 2,
      name: '2. HTTPS Protocol',
      value: features.hasHttps ? 'HTTPS (Encrypted)' : 'Insecure HTTP',
      isSuspicious: !features.hasHttps,
      note: features.hasHttps ? 'Encrypted TLS communication' : 'Lacks SSL/TLS encryption protocol',
    },
    {
      id: 3,
      name: '3. Number of Dots',
      value: `${features.dotCount} dot(s)`,
      isSuspicious: features.dotCount > 3,
      note: features.dotCount > 3 ? 'Excessive dot delimiters in host/path' : 'Standard dot delimiter count (<=3)',
    },
    {
      id: 4,
      name: '4. Special Characters',
      value: `${features.specialCharCount} char(s)`,
      isSuspicious: features.specialCharCount > 4,
      note: 'Monitors [- @ ? = % _ & # /] symbols in URL string',
    },
    {
      id: 5,
      name: '5. IP Address Usage',
      value: features.hasIpAddress ? 'Yes (Raw IP Host)' : 'No (Standard Domain)',
      isSuspicious: features.hasIpAddress,
      note: features.hasIpAddress ? 'Host is direct IP (bypass DNS authority)' : 'Uses valid DNS domain registry',
    },
    {
      id: 6,
      name: '6. @ Symbol Obfuscation',
      value: features.hasAtSymbol ? 'Present (@ Symbol)' : 'Absent',
      isSuspicious: features.hasAtSymbol,
      note: features.hasAtSymbol ? 'Browser ignores preceding text before @' : 'No @ redirection symbol',
    },
    {
      id: 7,
      name: '7. Hyphen in Domain',
      value: `${features.hyphenCountInDomain} hyphen(s)`,
      isSuspicious: features.hyphenCountInDomain > 0,
      note: features.hyphenCountInDomain > 0 ? 'Indicates brand spoofing / typosquatting' : 'Clean domain string without hyphens',
    },
    {
      id: 8,
      name: '8. Subdomains Count',
      value: `${features.subdomainCount} subdomain(s)`,
      isSuspicious: features.subdomainCount >= 2,
      note: features.subdomainCount >= 2 ? 'Deep multi-tier subdomain hierarchy' : 'Standard single host structure',
    },
    {
      id: 9,
      name: '9. Domain Age',
      value: features.domainAge,
      isSuspicious: (features.domainAgeMonths !== undefined && features.domainAgeMonths < 6) || features.hasIpAddress,
      note: features.domainAgeMonths !== undefined && features.domainAgeMonths < 6 ? 'Recently registered / low authority' : 'Mature registration history',
    },
    {
      id: 10,
      name: '10. SSL Certificate',
      value: features.sslCertificate,
      isSuspicious: !features.sslValid,
      note: features.sslValid ? 'Valid SSL certificate with trusted Root CA' : 'Missing or mismatched SSL certificate',
    },
    {
      id: 11,
      name: '11. Redirect Count',
      value: `${features.redirectCount} hop(s)`,
      isSuspicious: features.redirectCount > 0,
      note: features.redirectCount > 0 ? 'Shortener / open redirect chain detected' : 'Direct direct destination (0 redirects)',
    },
    {
      id: 12,
      name: '12. Suspicious Keywords',
      value: `${features.suspiciousKeywordsCount} keyword(s)`,
      isSuspicious: features.suspiciousKeywordsCount > 0,
      note: features.suspiciousKeywordsList?.length ? `[${features.suspiciousKeywordsList.join(', ')}]` : 'No phishing trigger keywords found',
    },
  ];

  return (
    <div className="bg-slate-900/95 border border-cyan-500/30 rounded-2xl overflow-hidden shadow-2xl mt-6">
      {/* Header Banner - MODULE 1 Branding */}
      <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-emerald-950/90 text-emerald-400 border border-emerald-600/40">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-950 text-emerald-300 border border-emerald-700/60">
                Module 1
              </span>
              <h4 className="text-sm sm:text-base font-bold text-white">
                Website Feature Extraction Engine
              </h4>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Extracted 12 structural, lexical & host features -&gt; Output: 12-D Feature Vector
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowRawVector(!showRawVector)}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-mono rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition-colors"
          >
            {showRawVector ? <FileSpreadsheet className="w-3.5 h-3.5" /> : <Code2 className="w-3.5 h-3.5" />}
            <span>{showRawVector ? 'Show Feature Table' : 'Show Feature Vector (Array)'}</span>
          </button>
        </div>
      </div>

      {/* Raw vector view */}
      {showRawVector ? (
        <div className="p-6 bg-slate-950 font-mono text-xs text-slate-300 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2 text-cyan-400 font-semibold border-b border-slate-800 pb-3">
            <span>NumPy Feature Vector Array (12 Quantitative Inputs for Module 2)</span>
            <span className="text-[11px] text-slate-400">Dim: (1, 12)</span>
          </div>

          <pre className="p-4 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-300 overflow-x-auto text-xs font-mono leading-relaxed">
            {JSON.stringify(featureVector, null, 2)}
          </pre>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 text-xs space-y-1">
            <span className="text-white font-semibold block">Vector Index Mapping:</span>
            <p className="text-[11px] leading-relaxed">
              [0: url_length, 1: https_flag, 2: dot_count, 3: special_chars, 4: ip_usage, 5: at_symbol, 6: hyphen_domain, 7: subdomains, 8: domain_age_months, 9: ssl_valid, 10: redirect_count, 11: suspicious_keywords]
            </p>
          </div>
        </div>
      ) : (
        /* 12 Features Table View */
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4 font-bold text-slate-300"># Feature Name</th>
                <th className="py-3.5 px-4 font-bold text-slate-300">Extracted Value</th>
                <th className="py-3.5 px-4 font-bold text-slate-300">Threat Assessment</th>
                <th className="py-3.5 px-4 font-bold text-slate-300">Heuristic Security Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {featureRows.map((row) => (
                <tr 
                  key={row.id} 
                  className={`hover:bg-slate-800/40 transition-colors ${
                    row.isSuspicious ? 'bg-red-950/15' : 'hover:bg-slate-800/20'
                  }`}
                >
                  <td className="py-3 px-4 font-semibold text-slate-200">{row.name}</td>
                  <td className="py-3 px-4 text-cyan-300 font-bold">{row.value}</td>
                  <td className="py-3 px-4">
                    {row.isSuspicious ? (
                      <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded text-[11px] font-bold bg-red-950 text-red-400 border border-red-800">
                        <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                        <span>Suspicious</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                        <ShieldCheck className="w-3 h-3 flex-shrink-0" />
                        <span>Normal</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-slate-300 font-sans text-xs">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
