import React from 'react';
import { 
  User, 
  Globe, 
  Layers, 
  Cpu, 
  ShieldAlert, 
  Database, 
  Bell,
  ArrowRight,
  ArrowDown,
  Building,
  Mail,
  Network,
  Cloud,
  Shield,
  FileCheck2,
  CheckCircle2,
  AlertTriangle,
  Code2
} from 'lucide-react';

export const ArchitecturePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 pb-6 border-b border-slate-800">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
          <span>ITA1402 Ethical Hacking Capstone</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          AI-Based Phishing Website Detection Framework
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mx-auto">
          Complete structural data flow depicting Website Feature Extraction (Module 1), AI-Based Detection (Module 2), Alerting & Reporting (Module 3), Firestore Cloud Persistence, and Target Applications.
        </p>
      </div>

      {/* Main Flow Diagram matching user's exact uploaded image */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/90 border border-slate-800 shadow-2xl space-y-8">
        
        {/* Top Flow: USER -> URL INPUT -> MODULE 1 -> MODULE 2 -> OUTPUT -> MODULE 3 */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
          
          {/* USER & URL INPUT (2 cols) */}
          <div className="xl:col-span-3 flex flex-col justify-between space-y-4">
            {/* User */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700 text-center space-y-2 shadow-md">
              <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-600 mx-auto flex items-center justify-center text-cyan-400">
                <User className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white font-mono uppercase">USER</h4>
              <p className="text-[11px] text-slate-400">Client / Security Analyst initiating scan</p>
            </div>

            <div className="flex justify-center text-slate-500">
              <ArrowDown className="w-5 h-5 animate-bounce xl:hidden" />
            </div>

            {/* URL Input */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-blue-500/40 text-center space-y-2 shadow-md">
              <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-600/60 mx-auto flex items-center justify-center text-blue-400">
                <Globe className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white font-mono uppercase">WEBSITE URL INPUT</h4>
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-cyan-300 break-all">
                https://example.com
              </div>
            </div>
          </div>

          {/* MODULE 1: WEBSITE FEATURE EXTRACTION (3 cols) */}
          <div className="xl:col-span-3 rounded-2xl bg-slate-900/90 border-2 border-emerald-500/60 p-5 space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="text-center pb-2 border-b border-emerald-800/40">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-700/60 inline-block uppercase">
                  MODULE 1
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-emerald-400 uppercase mt-1">
                  WEBSITE FEATURE EXTRACTION
                </h4>
              </div>

              {/* Input */}
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono flex items-center justify-between">
                <span className="text-slate-400 font-semibold">Input: Website URL</span>
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
              </div>

              {/* 12 Features */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-emerald-950 space-y-1 font-mono text-[11px]">
                <span className="text-emerald-400 font-bold block border-b border-slate-800 pb-1">
                  Features Extracted:
                </span>
                <ul className="space-y-0.5 text-slate-300 text-[10.5px]">
                  <li>• URL Length</li>
                  <li>• HTTPS</li>
                  <li>• Number of Dots</li>
                  <li>• Special Characters</li>
                  <li>• IP Address Usage</li>
                  <li>• @ Symbol</li>
                  <li>• Hyphen in Domain</li>
                  <li>• Subdomains</li>
                  <li>• Domain Age</li>
                  <li>• SSL Certificate</li>
                  <li>• Redirect Count</li>
                  <li>• Suspicious Keywords</li>
                </ul>
              </div>
            </div>

            {/* Output: Feature Vector */}
            <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-700 text-center font-mono text-xs">
              <span className="text-slate-400 block text-[10px]">Output:</span>
              <span className="text-emerald-300 font-bold">Feature Vector (12-D)</span>
            </div>
          </div>

          {/* MODULE 2: AI-BASED PHISHING DETECTION (3 cols) */}
          <div className="xl:col-span-3 rounded-2xl bg-slate-900/90 border-2 border-blue-500/60 p-5 space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="text-center pb-2 border-b border-blue-800/40">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-950 text-blue-300 border border-blue-700/60 inline-block uppercase">
                  MODULE 2
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-blue-400 uppercase mt-1">
                  AI-BASED PHISHING DETECTION
                </h4>
              </div>

              {/* Input */}
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono flex items-center justify-between">
                <span className="text-slate-400 font-semibold">Input: Feature Dataset</span>
                <Database className="w-3.5 h-3.5 text-blue-400" />
              </div>

              {/* AI Processing Steps */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-blue-950 space-y-1.5 font-mono text-[11px]">
                <span className="text-blue-400 font-bold block border-b border-slate-800 pb-1">
                  AI Processing Steps:
                </span>
                <ol className="space-y-1 text-slate-300 text-[10.5px]">
                  <li>1. Data Cleaning</li>
                  <li>2. Feature Scaling</li>
                  <li>3. Train - Test Split</li>
                  <li>4. AI Model Training</li>
                  <li>5. Prediction</li>
                  <li>6. Performance Evaluation</li>
                </ol>
              </div>
            </div>

            {/* Output: Classification Result */}
            <div className="p-2.5 rounded-xl bg-blue-950/60 border border-blue-700 text-center font-mono text-xs">
              <span className="text-slate-400 block text-[10px]">Output:</span>
              <span className="text-blue-300 font-bold">Classification Result</span>
              <div className="flex justify-center space-x-2 mt-1">
                <span className="text-emerald-400 font-bold text-[10px]">✓ Legitimate</span>
                <span className="text-slate-500 text-[10px]">|</span>
                <span className="text-red-400 font-bold text-[10px]">⚠ Phishing</span>
              </div>
            </div>
          </div>

          {/* MODULE 3: PHISHING DETECTION & ALERT SYSTEM (3 cols) */}
          <div className="xl:col-span-3 rounded-2xl bg-slate-900/90 border-2 border-purple-500/60 p-5 space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="text-center pb-2 border-b border-purple-800/40">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-950 text-purple-300 border border-purple-700/60 inline-block uppercase">
                  MODULE 3
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-purple-400 uppercase mt-1">
                  PHISHING DETECTION & ALERT SYSTEM
                </h4>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-purple-950 text-xs font-mono space-y-2">
                <div className="flex items-center space-x-2 text-purple-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                  <span>Accept Website URL</span>
                </div>
                <div className="flex items-center space-x-2 text-purple-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                  <span>Extract Features Automatically</span>
                </div>
                <div className="flex items-center space-x-2 text-purple-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                  <span>Run Trained AI Model</span>
                </div>
                <div className="flex items-center space-x-2 text-purple-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                  <span>Display Prediction Result</span>
                </div>
                <div className="flex items-center space-x-2 text-purple-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                  <span>Generate Phishing Warning Alerts</span>
                </div>
                <div className="flex items-center space-x-2 text-purple-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                  <span>Store Detection Logs for Analysis</span>
                </div>
              </div>
            </div>

            {/* Output */}
            <div className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-700 text-center font-mono text-xs">
              <span className="text-slate-400 block text-[10px]">Action:</span>
              <span className="text-purple-300 font-bold">Alert Dispatched & Logged</span>
            </div>
          </div>

        </div>

        {/* Bottom Tier: Applications + Database & Logging + User Notification */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 border-t border-slate-800">
          
          {/* APPLICATIONS (4 cols) */}
          <div className="lg:col-span-4 p-5 rounded-2xl bg-slate-900 border-2 border-red-500/40 space-y-3">
            <div className="flex items-center space-x-2 text-red-400 font-mono font-bold text-xs sm:text-sm uppercase">
              <Globe className="w-4 h-4" />
              <span>APPLICATIONS</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-300">
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 flex items-center space-x-1.5">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>Web Browsers</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 flex items-center space-x-1.5">
                <Building className="w-3.5 h-3.5 text-emerald-400" />
                <span>Banking Systems</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 flex items-center space-x-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>Email Security</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 flex items-center space-x-1.5">
                <Network className="w-3.5 h-3.5 text-purple-400" />
                <span>Enterprise Networks</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 flex items-center space-x-1.5">
                <Cloud className="w-3.5 h-3.5 text-sky-400" />
                <span>Cloud Security</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 flex items-center space-x-1.5">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                <span>Cybersecurity Platforms</span>
              </div>
            </div>
          </div>

          {/* DATABASE & LOGGING (4 cols) */}
          <div className="lg:col-span-4 p-5 rounded-2xl bg-slate-900 border-2 border-amber-500/40 space-y-3">
            <div className="flex items-center space-x-2 text-amber-400 font-mono font-bold text-xs sm:text-sm uppercase">
              <Database className="w-4 h-4" />
              <span>DATABASE & LOGGING (Firestore)</span>
            </div>
            <ul className="space-y-1.5 text-xs font-mono text-slate-300">
              <li className="flex items-center space-x-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>Store Extracted Features</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>Store Prediction Results</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>Store User Queries & Alerts</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>Used for Reports & Model Improvement</span>
              </li>
            </ul>
          </div>

          {/* USER NOTIFICATION (4 cols) */}
          <div className="lg:col-span-4 p-5 rounded-2xl bg-slate-900 border-2 border-cyan-500/40 space-y-3">
            <div className="flex items-center space-x-2 text-cyan-400 font-mono font-bold text-xs sm:text-sm uppercase">
              <Bell className="w-4 h-4" />
              <span>USER NOTIFICATION</span>
            </div>
            <p className="text-xs text-slate-300 font-mono">
              Result Display & Recommendations on Dashboard Screen
            </p>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-around">
              <div className="flex items-center space-x-1.5 text-emerald-400 font-mono text-xs font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Legitimate</span>
              </div>
              <span className="text-slate-600">|</span>
              <div className="flex items-center space-x-1.5 text-red-400 font-mono text-xs font-bold">
                <AlertTriangle className="w-4 h-4" />
                <span>Phishing Alert</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
