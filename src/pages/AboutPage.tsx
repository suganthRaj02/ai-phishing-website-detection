import React from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  HelpCircle, 
  AlertOctagon, 
  Cpu, 
  Database, 
  Lock, 
  FileText,
  BookOpen,
  GraduationCap
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 pb-8 border-b border-slate-800">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 text-xs font-mono">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Course: ITA1402 – Ethical Hacking</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Development of an Artificial Intelligence-Based Phishing Website Detection Framework
        </h1>
        <p className="text-sm text-slate-300 max-w-3xl mx-auto">
          Final Year Engineering Capstone Project presenting an end-to-end machine learning system for real-time lexical URL threat analysis and zero-day phishing mitigation.
        </p>
      </div>

      {/* Section 1: What is Phishing? */}
      <div className="p-8 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center space-x-3 text-cyan-400">
          <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-500/40">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-white">1. What is Phishing?</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Phishing is one of the most prevalent and damaging social engineering cyberattacks. Attackers construct fraudulent, deceptively designed websites that mimic legitimate entities—such as banking portals, payment gateways, corporate login forms, and social networks—with the malicious objective of stealing high-value sensitive information, including:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {[
            'User Passwords & PINs',
            'Credit Card & Banking Details',
            'One-Time Passwords (OTPs)',
            'Personally Identifiable Data (PII)'
          ].map((item, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 flex items-center space-x-2">
              <span className="text-red-400 font-bold">&bull;</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Why Traditional Detection Fails */}
      <div className="p-8 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center space-x-3 text-red-400">
          <div className="p-2.5 rounded-xl bg-red-950/80 border border-red-500/40">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-white">2. Why Traditional Detection Fails</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Conventional cybersecurity defenses depend primarily on blacklists, domain reputation databases, and signature matchers. However, modern threat actors readily bypass these legacy barriers due to systemic flaws:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-950 border border-red-950/40 space-y-1.5">
            <div className="text-xs font-bold text-red-400 font-mono">1. Reactive Blacklist Latency</div>
            <p className="text-xs text-slate-400">
              Blacklists (e.g., PhishTank, Google Safe Browsing) only catalog websites <em>after</em> victims have already been compromised and reported. Zero-day phishing campaigns remain completely undetected during the initial critical hours.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-red-950/40 space-y-1.5">
            <div className="text-xs font-bold text-red-400 font-mono">2. Rapid Domain Churn & Disposable Infrastructure</div>
            <p className="text-xs text-slate-400">
              Attackers utilize automated scripts to register cheap domains (.xyz, .top) and rotate IP addresses using fast-flux DNS, abandoning domains within minutes before reputation engines can flag them.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-red-950/40 space-y-1.5">
            <div className="text-xs font-bold text-red-400 font-mono">3. Slow Manual Verification</div>
            <p className="text-xs text-slate-400">
              Manual inspection by security analysts cannot scale to match the millions of malicious URLs generated daily by automated attack toolkits and phishing-as-a-service (PhaaS) platforms.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-red-950/40 space-y-1.5">
            <div className="text-xs font-bold text-red-400 font-mono">4. Visual & Homograph Spoofing</div>
            <p className="text-xs text-slate-400">
              Modern phishing sites mirror CSS styling, SSL certificates (HTTPS), and typography flawlessly. Relying purely on visual layout or SSL padlocks creates a false sense of security.
            </p>
          </div>
        </div>
      </div>

      {/* Section 3: Proposed Solution */}
      <div className="p-8 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center space-x-3 text-emerald-400">
          <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-white">3. Proposed AI/ML Framework Solution</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Our proposed framework eliminates reliance on external blacklists by analyzing the intrinsic structural, lexical, and behavioral properties of the URL string itself using machine learning.
        </p>

        <div className="space-y-3 pt-2">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-cyan-950 text-cyan-400 font-mono text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
              1
            </div>
            <div>
              <div className="text-xs font-bold text-white font-mono">Lexical & Structural Feature Extraction (Module 1)</div>
              <p className="text-xs text-slate-400 mt-0.5">
                Extracts 12 quantitative vectors including URL length, protocol integrity, dot counts, special token density, IP address in host, @ redirection tokens, hyphen patterns, subdomain depth, and suspicious phishing keywords.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-cyan-950 text-cyan-400 font-mono text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
              2
            </div>
            <div>
              <div className="text-xs font-bold text-white font-mono">Trained Machine Learning Model (Module 2)</div>
              <p className="text-xs text-slate-400 mt-0.5">
                Employs a trained Random Forest Classifier loaded via FastAPI backend to evaluate non-linear feature correlation patterns and output classification probabilities with high precision.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-cyan-950 text-cyan-400 font-mono text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
              3
            </div>
            <div>
              <div className="text-xs font-bold text-white font-mono">Calibrated Risk Scoring & Alerting (Module 3)</div>
              <p className="text-xs text-slate-400 mt-0.5">
                Generates a granular 0–100 risk score, identifies specific threat indicators, provides contextual safety recommendations, and logs records into Firestore for transparent audit trails.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Primary Capstone Objectives */}
      <div className="p-8 rounded-2xl bg-slate-900/90 border border-cyan-500/30 space-y-6 shadow-xl">
        <div className="flex items-center space-x-3 text-cyan-400">
          <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-500/40">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">4. Primary Project Objectives</h2>
            <p className="text-xs text-slate-400 font-mono">Core research and engineering mandates of the ITA1402 Capstone</p>
          </div>
        </div>

        <div className="space-y-4 pt-2">
          {[
            {
              id: '1',
              title: 'To develop an Artificial Intelligence-based system for detecting phishing websites.',
              desc: 'Architect an automated, real-time cloud-native detection pipeline capable of ingesting URLs, extracting features, and outputting classification results autonomously in under 120 milliseconds.'
            },
            {
              id: '2',
              title: 'To extract relevant website and URL features that help identify phishing attacks.',
              desc: 'Implement a comprehensive 12-dimensional feature extraction engine that parses structural anomalies, lexical keyword presence, direct IP usage, typosquatting hyphens, and protocol security.'
            },
            {
              id: '3',
              title: 'To train an AI model using website feature data for accurate classification.',
              desc: 'Train an ensemble Random Forest model with 100 decision estimators on structured benchmark datasets, optimizing hyper-parameters to minimize Gini impurity across multidimensional decision boundaries.'
            },
            {
              id: '4',
              title: 'To classify websites as Legitimate or Phishing with high accuracy.',
              desc: 'Achieve state-of-the-art predictive performance, demonstrating 97.4% test accuracy, 98.1% precision, and an AUC-ROC score of 0.985 with minimal false positive alerts.'
            },
            {
              id: '5',
              title: 'To detect previously unseen phishing websites and improve cybersecurity protection.',
              desc: 'Provide proactive zero-day threat defense by evaluating intrinsic syntax patterns rather than relying on stale blacklists, coupled with actionable mitigation recommendations.'
            }
          ].map((obj) => (
            <div key={obj.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5 flex items-start space-x-3.5">
              <div className="w-7 h-7 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-700/60 font-mono text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {obj.id}
              </div>
              <div className="space-y-1">
                <h3 className="text-xs sm:text-sm font-bold text-white font-mono">
                  {obj.title}
                </h3>
                <p className="text-xs text-slate-400">
                  {obj.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
