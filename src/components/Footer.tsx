import React from 'react';
import { Shield, Award, BookOpen, GraduationCap, Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-cyan-950/60 mt-auto py-10 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Project Identity */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-cyan-400" />
              <span className="font-bold text-sm text-white tracking-wide">
                AI Phishing Detection Framework
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Final Year Engineering Capstone Project designed to detect deceptive phishing URLs using multi-dimensional feature extraction, machine learning classification, and real-time cloud analytics.
            </p>
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 font-mono text-[11px]">
              <BookOpen className="w-3.5 h-3.5" />
              <span>ITA1402 – Ethical Hacking</span>
            </div>
          </div>

          {/* Project Team */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-slate-200 font-semibold">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              <span>Project Team</span>
            </div>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-center justify-between py-1 border-b border-slate-900">
                <span className="font-medium text-white">1. Manu Neethi S</span>
                <span className="font-mono text-cyan-400 text-[11px] bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  192521063
                </span>
              </li>
              <li className="flex items-center justify-between py-1 border-b border-slate-900">
                <span className="font-medium text-white">2. Sugantharaj A</span>
                <span className="font-mono text-cyan-400 text-[11px] bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  192421416
                </span>
              </li>
              <li className="flex items-center justify-between py-1 border-b border-slate-900">
                <span className="font-medium text-white">3. Dinesh Karthik R.</span>
                <span className="font-mono text-cyan-400 text-[11px] bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  192524121
                </span>
              </li>
            </ul>
          </div>

          {/* Project Guide & Academic Context */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-slate-200 font-semibold">
              <Award className="w-4 h-4 text-cyan-400" />
              <span>Project Mentorship & Guidance</span>
            </div>
            <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800/80 space-y-1.5">
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-mono">Project Guide</div>
              <div className="text-white font-bold text-sm flex items-center space-x-2">
                <span>Dr. Smitha</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Faculty Advisor & Domain Expert, Ethical Hacking & Cybersecurity Research Group.
              </p>
            </div>
            <div className="flex items-center space-x-2 text-[11px] text-slate-400">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>Powered by Scikit-Learn Random Forest & Firebase Firestore</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
          <div>
            Development of an Artificial Intelligence-Based Phishing Website Detection Framework &copy; {new Date().getFullYear()}
          </div>
          <div className="flex items-center space-x-4 font-mono">
            <span>FastAPI Backend</span>
            <span>•</span>
            <span>React + TypeScript</span>
            <span>•</span>
            <span>Firebase Auth</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
