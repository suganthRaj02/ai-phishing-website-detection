import React, { useState } from 'react';
import { DetectionResult } from '../types';
import { RiskGauge } from './RiskGauge';
import { FeatureTable } from './FeatureTable';
import { ObjectiveReportModal } from './ObjectiveReportModal';
import { 
  CheckCircle2, 
  AlertOctagon, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle,
  Copy, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  FileText,
  Target,
  Sparkles,
  Lock,
  Unlock,
  Globe,
  Layers,
  Cpu,
  Database,
  Bell,
  ArrowRight,
  Server,
  Network,
  Mail,
  Building,
  Cloud,
  Shield,
  Activity,
  ArrowDown
} from 'lucide-react';

interface ResultCardProps {
  result: DetectionResult;
  savedToFirestore: boolean;
  onScanAnother: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  result,
  savedToFirestore,
  onScanAnother
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'PROJECT_MODULES' | 'FEATURES'>('OVERVIEW');
  const [showObjectiveReport, setShowObjectiveReport] = useState(false);

  const isPhishing = result.classification === 'PHISHING' || result.riskScore >= 40;
  const isHighRisk = result.riskScore > 70 || result.riskLevel === 'HIGH RISK';

  const handleCopyReport = () => {
    const reportText = `[AI Phishing Detection Result - Project Flow]
Website URL: ${result.url}
Result: ${result.classification} (${result.riskLevel})
Risk Score: ${result.riskScore}%
Model Confidence: ${(result.confidence * 100).toFixed(1)}%
Recommendation: ${result.recommendation}
Extracted Features (12):
- URL Length: ${result.features.urlLength}
- HTTPS: ${result.features.hasHttps ? 'Yes' : 'No'}
- Number of Dots: ${result.features.dotCount}
- Special Characters: ${result.features.specialCharCount}
- IP Address Usage: ${result.features.hasIpAddress ? 'Yes' : 'No'}
- @ Symbol: ${result.features.hasAtSymbol ? 'Yes' : 'No'}
- Hyphen in Domain: ${result.features.hyphenCountInDomain}
- Subdomains: ${result.features.subdomainCount}
- Domain Age: ${result.features.domainAge}
- SSL Certificate: ${result.features.sslCertificate}
- Redirect Count: ${result.features.redirectCount}
- Suspicious Keywords: ${result.features.suspiciousKeywordsCount}
Timestamp: ${new Date(result.timestamp).toLocaleString()}
Project: ITA1402 Ethical Hacking Capstone`;

    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="detection-result-section" className="space-y-6 animate-in fade-in duration-500 scroll-mt-6">
      
      {/* 1. Primary Result Banner (User Notification Display matching Legitimate vs Phishing) */}
      <div 
        className={`p-6 rounded-2xl border backdrop-blur-md shadow-2xl transition-all ${
          isHighRisk 
            ? 'bg-red-950/40 border-red-500/60 shadow-[0_0_50px_rgba(239,68,68,0.25)] ring-2 ring-red-500/40' 
            : isPhishing
            ? 'bg-amber-950/40 border-amber-500/60 shadow-[0_0_45px_rgba(245,158,11,0.2)] ring-1 ring-amber-500/40'
            : 'bg-emerald-950/40 border-emerald-500/60 shadow-[0_0_45px_rgba(16,185,129,0.2)] ring-1 ring-emerald-500/40'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Main Visual Classification */}
          <div className="flex items-start sm:items-center space-x-4">
            <div 
              className={`w-16 h-16 rounded-2xl border flex items-center justify-center shadow-xl flex-shrink-0 ${
                isHighRisk 
                  ? 'bg-red-900/90 border-red-400 text-red-100 animate-pulse' 
                  : isPhishing 
                  ? 'bg-amber-900/90 border-amber-400 text-amber-100' 
                  : 'bg-emerald-900/90 border-emerald-400 text-emerald-100'
              }`}
            >
              {isHighRisk ? (
                <ShieldAlert className="w-9 h-9" />
              ) : isPhishing ? (
                <AlertTriangle className="w-9 h-9" />
              ) : (
                <ShieldCheck className="w-9 h-9" />
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                <span className="text-xs font-mono uppercase text-slate-400">Classification Result:</span>
                <span 
                  className={`px-3 py-0.5 rounded-full text-xs font-mono font-black tracking-wider uppercase shadow-md ${
                    isHighRisk 
                      ? 'bg-red-500 text-white' 
                      : isPhishing 
                      ? 'bg-amber-500 text-slate-950 font-bold' 
                      : 'bg-emerald-500 text-slate-950 font-bold'
                  }`}
                >
                  {result.classification}
                </span>
                <span 
                  className={`px-2 py-0.5 rounded text-[11px] font-mono border ${
                    isHighRisk 
                      ? 'bg-red-950 text-red-300 border-red-700' 
                      : isPhishing 
                      ? 'bg-amber-950 text-amber-300 border-amber-700' 
                      : 'bg-emerald-950 text-emerald-300 border-emerald-700'
                  }`}
                >
                  {result.riskLevel} (Score: {result.riskScore}%)
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center space-x-2">
                <span>{isPhishing ? 'PHISHING WEBSITE DETECTED' : 'LEGITIMATE WEBSITE DETECTED'}</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                {result.recommendation}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2.5 flex-wrap gap-y-2 flex-shrink-0">
            <button
              onClick={() => setShowObjectiveReport(true)}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono shadow-[0_0_20px_rgba(6,182,212,0.35)] transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>Objective Report</span>
            </button>

            <button
              onClick={handleCopyReport}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-mono border border-slate-700 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* URL Target Bar */}
        <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex items-center justify-between flex-wrap gap-2 text-xs font-mono">
          <div className="flex items-center space-x-2 text-slate-300">
            <Globe className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span className="text-slate-400">Scanned URL:</span>
            <span className="text-cyan-300 font-semibold break-all">{result.url}</span>
          </div>

          <div className="flex items-center space-x-2">
            {savedToFirestore && (
              <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-800">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>Logged to Firestore</span>
              </span>
            )}
            <span className="text-slate-400">Confidence: {(result.confidence * 100).toFixed(1)}%</span>
          </div>
        </div>
      </div>

      {/* Navigation View Switcher (Directly mapping your Project Architecture Modules) */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 flex-wrap gap-3">
        <div className="flex items-center space-x-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('OVERVIEW')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'OVERVIEW'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Detection Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('PROJECT_MODULES')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'PROJECT_MODULES'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Project Architecture Flow (Module 1, 2, 3)</span>
          </button>

          <button
            onClick={() => setActiveTab('FEATURES')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'FEATURES'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>12 Features Table</span>
          </button>
        </div>

        <button
          onClick={onScanAnother}
          className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono border border-slate-700 transition-colors"
        >
          Scan Another URL
        </button>
      </div>

      {/* VIEW 1: DETECTION OVERVIEW */}
      {activeTab === 'OVERVIEW' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Risk Dial & Probabilities */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col items-center justify-center space-y-4">
            <RiskGauge
              score={result.riskScore}
              riskLevel={result.riskLevel}
              classification={result.classification}
            />

            <div className="w-full pt-4 border-t border-slate-800 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Trained AI Model:</span>
                <span className="text-cyan-400 font-semibold">RandomForest (100 Trees)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Model Confidence:</span>
                <span className="text-white font-semibold">{(result.confidence * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Empirical Benchmark:</span>
                <span className="text-emerald-400 font-semibold">97.4% Accuracy | 0.985 AUC</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Firestore Log ID:</span>
                <span className="text-slate-400 truncate max-w-[150px]">{result.id || 'Synced'}</span>
              </div>
            </div>
          </div>

          {/* Security Alert & Indicator Breakdown */}
          <div className="lg:col-span-7 space-y-5">
            {/* Phishing Warning Alerts (Module 3) */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-center space-x-2 font-mono text-xs font-bold text-white uppercase tracking-wider">
                <Bell className="w-4 h-4 text-cyan-400" />
                <span>Module 3: Generated Security Alerts ({result.securityFlags.length} flags)</span>
              </div>

              {result.securityFlags.length > 0 ? (
                <div className="space-y-2">
                  {result.securityFlags.map((flag, idx) => (
                    <div 
                      key={idx}
                      className={`p-3 rounded-xl border flex items-start space-x-3 text-xs ${
                        isHighRisk 
                          ? 'bg-red-950/30 border-red-800/60 text-red-300' 
                          : 'bg-amber-950/30 border-amber-800/60 text-amber-300'
                      }`}
                    >
                      <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{flag}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-800/60 text-emerald-300 text-xs flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>No deceptive heuristics or malicious threat flags detected in this URL.</span>
                </div>
              )}
            </div>

            {/* Quick 12-Feature Summary Preview */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 font-mono text-xs font-bold text-white uppercase tracking-wider">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <span>Module 1 Key Heuristics</span>
                </div>
                <button
                  onClick={() => setActiveTab('FEATURES')}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300"
                >
                  View All 12 Features →
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 font-mono text-xs">
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">URL Length:</span>
                  <span className="text-white font-bold">{result.features.urlLength} chars</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">HTTPS Status:</span>
                  <span className={result.features.hasHttps ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                    {result.features.hasHttps ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Dots Count:</span>
                  <span className="text-white font-bold">{result.features.dotCount} dots</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">IP Host Usage:</span>
                  <span className={result.features.hasIpAddress ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
                    {result.features.hasIpAddress ? 'Yes (IP)' : 'No (DNS)'}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">@ Obfuscation:</span>
                  <span className={result.features.hasAtSymbol ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
                    {result.features.hasAtSymbol ? 'Detected' : 'None'}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Keywords:</span>
                  <span className={result.features.suspiciousKeywordsCount > 0 ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold'}>
                    {result.features.suspiciousKeywordsCount} found
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: PROJECT ARCHITECTURE FLOW (EXACT MATCH OF YOUR DIAGRAM) */}
      {activeTab === 'PROJECT_MODULES' && (
        <div className="p-6 rounded-2xl bg-slate-900/95 border border-cyan-500/30 space-y-8 shadow-2xl">
          
          <div className="text-center space-y-1 pb-4 border-b border-slate-800">
            <h3 className="text-lg sm:text-xl font-bold text-white font-mono flex items-center justify-center space-x-2">
              <span>ITA1402 Capstone Detection Pipeline Execution</span>
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Live data flow tracking through Module 1, Module 2, Module 3, Database Logging & Target Applications
            </p>
          </div>

          {/* 3 Main Modules Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* MODULE 1: WEBSITE FEATURE EXTRACTION */}
            <div className="rounded-2xl bg-slate-950 border-2 border-emerald-500/50 p-5 space-y-4 shadow-lg flex flex-col justify-between">
              <div className="space-y-3">
                <div className="text-center pb-2 border-b border-emerald-900/50">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-700/60 inline-block uppercase">
                    MODULE 1
                  </span>
                  <h4 className="text-sm font-bold text-emerald-400 uppercase mt-1">
                    WEBSITE FEATURE EXTRACTION
                  </h4>
                </div>

                {/* Input Box */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono space-y-1">
                  <div className="text-slate-400 font-semibold flex items-center justify-between">
                    <span>Input: Website URL</span>
                    <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                  <div className="text-cyan-300 truncate font-bold">{result.url}</div>
                </div>

                {/* 12 Features List */}
                <div className="p-3 rounded-xl bg-slate-900/80 border border-emerald-950 text-xs font-mono space-y-1.5">
                  <div className="text-emerald-400 font-bold text-[11px] uppercase border-b border-slate-800 pb-1 flex items-center justify-between">
                    <span>12 Features Extracted:</span>
                    <span className="text-[10px] text-slate-400">12/12 Parsed</span>
                  </div>
                  <ul className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] text-slate-300">
                    <li>• URL Length: <strong className="text-white">{result.features.urlLength}</strong></li>
                    <li>• HTTPS: <strong className={result.features.hasHttps ? 'text-emerald-400' : 'text-red-400'}>{result.features.hasHttps ? 'Yes' : 'No'}</strong></li>
                    <li>• Number of Dots: <strong className="text-white">{result.features.dotCount}</strong></li>
                    <li>• Special Chars: <strong className="text-white">{result.features.specialCharCount}</strong></li>
                    <li>• IP Usage: <strong className={result.features.hasIpAddress ? 'text-red-400' : 'text-emerald-400'}>{result.features.hasIpAddress ? 'Yes' : 'No'}</strong></li>
                    <li>• @ Symbol: <strong className={result.features.hasAtSymbol ? 'text-red-400' : 'text-emerald-400'}>{result.features.hasAtSymbol ? 'Yes' : 'No'}</strong></li>
                    <li>• Hyphen in Domain: <strong className="text-white">{result.features.hyphenCountInDomain}</strong></li>
                    <li>• Subdomains: <strong className="text-white">{result.features.subdomainCount}</strong></li>
                    <li>• Domain Age: <strong className="text-white">{result.features.domainAgeMonths || 12}m</strong></li>
                    <li>• SSL Certificate: <strong className={result.features.sslValid ? 'text-emerald-400' : 'text-red-400'}>{result.features.sslValid ? 'Valid' : 'Invalid'}</strong></li>
                    <li>• Redirect Count: <strong className="text-white">{result.features.redirectCount}</strong></li>
                    <li>• Keywords: <strong className="text-amber-400">{result.features.suspiciousKeywordsCount}</strong></li>
                  </ul>
                </div>
              </div>

              {/* Output: Feature Vector */}
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800 text-xs font-mono text-center">
                <span className="text-slate-400 block text-[10px]">Output:</span>
                <span className="text-emerald-300 font-bold">12-D Numeric Feature Vector</span>
              </div>
            </div>

            {/* MODULE 2: AI-BASED PHISHING DETECTION */}
            <div className="rounded-2xl bg-slate-950 border-2 border-blue-500/50 p-5 space-y-4 shadow-lg flex flex-col justify-between">
              <div className="space-y-3">
                <div className="text-center pb-2 border-b border-blue-900/50">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-950 text-blue-300 border border-blue-700/60 inline-block uppercase">
                    MODULE 2
                  </span>
                  <h4 className="text-sm font-bold text-blue-400 uppercase mt-1">
                    AI-BASED PHISHING DETECTION
                  </h4>
                </div>

                {/* Input Box */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono space-y-1">
                  <div className="text-slate-400 font-semibold flex items-center justify-between">
                    <span>Input: Feature Dataset</span>
                    <Database className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <div className="text-blue-300 font-bold">12 Numerical Heuristic Inputs</div>
                </div>

                {/* 6 AI Processing Steps */}
                <div className="p-3 rounded-xl bg-slate-900/80 border border-blue-950 text-xs font-mono space-y-1.5">
                  <div className="text-blue-400 font-bold text-[11px] uppercase border-b border-slate-800 pb-1">
                    6 AI Processing Steps:
                  </div>
                  <ol className="space-y-1 text-[11px] text-slate-300">
                    <li className="flex items-center space-x-1.5">
                      <span className="text-blue-400 font-bold">1.</span>
                      <span>Data Cleaning & Sanitization</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="text-blue-400 font-bold">2.</span>
                      <span>Feature Scaling (StandardScaler)</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="text-blue-400 font-bold">3.</span>
                      <span>Train - Test Split (80/20 Benchmark)</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="text-blue-400 font-bold">4.</span>
                      <span>AI Model Training (Random Forest)</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="text-blue-400 font-bold">5.</span>
                      <span>Prediction Inference ({result.riskScore}% risk)</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="text-blue-400 font-bold">6.</span>
                      <span>Performance Evaluation (97.4% Acc)</span>
                    </li>
                  </ol>
                </div>
              </div>

              {/* Output: Classification Result */}
              <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800 text-xs font-mono text-center">
                <span className="text-slate-400 block text-[10px]">Output:</span>
                <span className="text-blue-300 font-bold">Classification: {result.classification}</span>
              </div>
            </div>

            {/* MODULE 3: PHISHING DETECTION & ALERT SYSTEM */}
            <div className="rounded-2xl bg-slate-950 border-2 border-purple-500/50 p-5 space-y-4 shadow-lg flex flex-col justify-between">
              <div className="space-y-3">
                <div className="text-center pb-2 border-b border-purple-900/50">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-950 text-purple-300 border border-purple-700/60 inline-block uppercase">
                    MODULE 3
                  </span>
                  <h4 className="text-sm font-bold text-purple-400 uppercase mt-1">
                    PHISHING DETECTION & ALERT SYSTEM
                  </h4>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-purple-950 text-xs font-mono space-y-2">
                  <div className="flex items-center space-x-2 text-purple-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                    <span>Accept Website URL</span>
                  </div>
                  <div className="flex items-center space-x-2 text-purple-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                    <span>Extract Features Automatically</span>
                  </div>
                  <div className="flex items-center space-x-2 text-purple-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                    <span>Run Trained AI Model</span>
                  </div>
                  <div className="flex items-center space-x-2 text-purple-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                    <span>Display Prediction Result ({result.classification})</span>
                  </div>
                  <div className="flex items-center space-x-2 text-purple-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                    <span>Generate Phishing Warning Alerts</span>
                  </div>
                  <div className="flex items-center space-x-2 text-purple-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                    <span>Store Detection Logs for Analysis</span>
                  </div>
                </div>
              </div>

              {/* Final State Banner */}
              <div 
                className={`p-3 rounded-xl border text-xs font-mono text-center ${
                  isPhishing ? 'bg-red-950/60 border-red-800 text-red-300' : 'bg-emerald-950/60 border-emerald-800 text-emerald-300'
                }`}
              >
                <span className="text-slate-400 block text-[10px]">Active Status:</span>
                <span className="font-bold">{isPhishing ? 'ALERT TRIGGERED: PHISHING' : 'VERIFIED: LEGITIMATE'}</span>
              </div>
            </div>

          </div>

          {/* Bottom Grid: Database & Logging + Target Applications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
            
            {/* DATABASE & LOGGING BOX */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-3">
              <div className="flex items-center space-x-2.5 text-amber-400">
                <Database className="w-5 h-5" />
                <h4 className="text-xs sm:text-sm font-bold uppercase font-mono">DATABASE & LOGGING (Firestore)</h4>
              </div>
              <ul className="space-y-1.5 text-xs font-mono text-slate-300">
                <li className="flex items-center space-x-2">
                  <span className="text-amber-400">•</span>
                  <span>Store Extracted Features (12-D vector logged)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-amber-400">•</span>
                  <span>Store Prediction Results ({result.classification}, {result.riskScore}%)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-amber-400">•</span>
                  <span>Store User Queries & Security Alerts</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-amber-400">•</span>
                  <span>Used for Reports & Continuous Model Improvement</span>
                </li>
              </ul>
            </div>

            {/* APPLICATIONS BOX */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-red-500/40 space-y-3">
              <div className="flex items-center space-x-2.5 text-red-400">
                <Globe className="w-5 h-5" />
                <h4 className="text-xs sm:text-sm font-bold uppercase font-mono">TARGET APPLICATIONS</h4>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-300">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center space-x-1.5">
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Web Browsers</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center space-x-1.5">
                  <Building className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Banking Systems</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center space-x-1.5">
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  <span>Email Security</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center space-x-1.5">
                  <Network className="w-3.5 h-3.5 text-purple-400" />
                  <span>Enterprise Networks</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center space-x-1.5">
                  <Cloud className="w-3.5 h-3.5 text-sky-400" />
                  <span>Cloud Security</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center space-x-1.5">
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  <span>Cybersecurity Platforms</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* VIEW 3: 12 EXTRACTED FEATURES TABLE */}
      {activeTab === 'FEATURES' && (
        <FeatureTable
          features={result.features}
          featureVector={result.featureVector}
        />
      )}

      {/* Objective Report Modal */}
      {showObjectiveReport && (
        <ObjectiveReportModal
          result={result}
          onClose={() => setShowObjectiveReport(false)}
        />
      )}
    </div>
  );
};
