import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  CheckCircle2, 
  Download, 
  Cpu, 
  Award, 
  ShieldCheck, 
  Layers,
  FileSpreadsheet,
  Zap,
  Target
} from 'lucide-react';
import resultAnalysisImg from '../assets/images/result_analysis_graph_1788233786000.jpg';

export const ResultsAnalysisPage: React.FC = () => {
  const modelComparisons = [
    { name: 'Random Forest (Proposed)', accuracy: '97.4%', precision: '98.1%', recall: '96.7%', f1: '97.4%', auc: '0.985', status: 'Best Performer' },
    { name: 'Decision Tree (CART)', accuracy: '92.1%', precision: '91.8%', recall: '92.4%', f1: '92.1%', auc: '0.920', status: 'Baseline' },
    { name: 'Support Vector Machine (SVM)', accuracy: '89.5%', precision: '90.2%', recall: '88.7%', f1: '89.4%', auc: '0.912', status: 'Standard' },
    { name: 'Logistic Regression', accuracy: '86.7%', precision: '87.5%', recall: '85.6%', f1: '86.5%', auc: '0.884', status: 'Linear' },
    { name: 'Naive Bayes (Multinomial)', accuracy: '84.2%', precision: '82.9%', recall: '86.1%', f1: '84.5%', auc: '0.862', status: 'Probabilistic' },
  ];

  const featureWeights = [
    { feature: 'URL Length & Entropy', importance: '24.8%', desc: 'Payload depth & character variance' },
    { feature: 'Suspicious Phishing Keywords', importance: '21.5%', desc: 'Login, verify, banking, security token patterns' },
    { feature: 'IP Address in Hostname', importance: '16.2%', desc: 'Raw IPv4/IPv6 address bypassing DNS' },
    { feature: 'Hyphen Count & Brand Spoofing', importance: '13.7%', desc: 'Typosquatting in domain tokens' },
    { feature: 'Subdomain Count & Depth', importance: '9.4%', desc: 'Nested subdomain redirection structures' },
    { feature: 'Protocol & SSL Integrity (HTTPS)', importance: '8.1%', desc: 'Plain HTTP endpoints & self-signed cert flags' },
    { feature: 'Suspicious Top-Level Domain (TLD)', importance: '6.3%', desc: 'High-risk disposable registries (.xyz, .top)' },
  ];

  const handleDownloadImage = () => {
    const link = document.createElement('a');
    link.href = resultAnalysisImg;
    link.download = 'PhishGuard_ML_Result_Analysis_Graph_ITA1402.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 pb-8 border-b border-slate-800">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 text-xs font-mono">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Evaluation Metrics & Model Benchmarks</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Machine Learning Result Analysis
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mx-auto">
          Comprehensive performance evaluation, confusion matrix analysis, and feature importance rankings for the ITA1402 Ethical Hacking capstone framework.
        </p>
      </div>

      {/* Generated Result Analysis Graph Visual Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-cyan-500/30 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3 text-cyan-400">
            <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-500/40">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Result Analysis Graph & Infographic</h2>
              <p className="text-xs text-slate-400 font-mono">Multi-model benchmark, ROC Curve, and confusion matrix visual</p>
            </div>
          </div>

          <button
            onClick={handleDownloadImage}
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all flex-shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Download Graph Image</span>
          </button>
        </div>

        {/* High-Resolution Graph Image Container */}
        <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950/80 shadow-inner group">
          <img
            src={resultAnalysisImg}
            alt="Machine Learning Result Analysis Graph - Random Forest Accuracy and Evaluation Metrics"
            className="w-full h-auto object-cover rounded-xl transition-transform duration-500 group-hover:scale-[1.01]"
            referrerPolicy="no-referrer"
          />
          <div className="p-3 bg-slate-950/90 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex flex-wrap items-center justify-between gap-2">
            <span>FIGURE 1.1: Empirical Comparative Evaluation of Phishing URL Classifiers</span>
            <span className="text-cyan-400 font-semibold">Random Forest Accuracy: 97.4% | AUC-ROC: 0.985</span>
          </div>
        </div>
      </div>

      {/* Key Metric Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Overall Accuracy', value: '97.4%', desc: 'Random Forest Ensemble', color: 'text-cyan-400', border: 'border-cyan-500/40' },
          { label: 'Precision Rate', value: '98.1%', desc: 'Low False Positives', color: 'text-emerald-400', border: 'border-emerald-500/40' },
          { label: 'Recall / Sensitivity', value: '96.7%', desc: 'High Threat Capture', color: 'text-blue-400', border: 'border-blue-500/40' },
          { label: 'ROC-AUC Score', value: '0.985', desc: 'Separation Boundary', color: 'text-purple-400', border: 'border-purple-500/40' },
        ].map((metric, idx) => (
          <div key={idx} className={`p-5 rounded-xl bg-slate-900/80 border ${metric.border} space-y-1 shadow-lg`}>
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">{metric.label}</div>
            <div className={`text-2xl sm:text-3xl font-black ${metric.color}`}>{metric.value}</div>
            <div className="text-[11px] text-slate-400 font-mono">{metric.desc}</div>
          </div>
        ))}
      </div>

      {/* Model Benchmark Table */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center space-x-3 text-white">
          <div className="p-2.5 rounded-xl bg-blue-950/80 border border-blue-500/40 text-blue-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Classifier Benchmark Comparison</h3>
            <p className="text-xs text-slate-400 font-mono">Evaluation on 3,000 synthetic and empirical lexical URL samples</p>
          </div>
        </div>

        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase bg-slate-950/60">
                <th className="py-3 px-4">Algorithm</th>
                <th className="py-3 px-4">Accuracy</th>
                <th className="py-3 px-4">Precision</th>
                <th className="py-3 px-4">Recall</th>
                <th className="py-3 px-4">F1-Score</th>
                <th className="py-3 px-4">ROC-AUC</th>
                <th className="py-3 px-4">Classification Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {modelComparisons.map((row, idx) => (
                <tr key={idx} className={idx === 0 ? 'bg-cyan-950/30 text-cyan-200 font-semibold' : 'text-slate-300 hover:bg-slate-950/40'}>
                  <td className="py-3.5 px-4 flex items-center space-x-2">
                    {idx === 0 && <Award className="w-4 h-4 text-cyan-400 flex-shrink-0" />}
                    <span>{row.name}</span>
                  </td>
                  <td className="py-3.5 px-4 font-bold">{row.accuracy}</td>
                  <td className="py-3.5 px-4">{row.precision}</td>
                  <td className="py-3.5 px-4">{row.recall}</td>
                  <td className="py-3.5 px-4">{row.f1}</td>
                  <td className="py-3.5 px-4">{row.auc}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] ${
                      idx === 0 
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-700' 
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Feature Importance Breakdown */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex items-center space-x-3 text-white">
          <div className="p-2.5 rounded-xl bg-purple-950/80 border border-purple-500/40 text-purple-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Feature Importance Hierarchy (Random Forest)</h3>
            <p className="text-xs text-slate-400 font-mono">Gini impurity reduction across 100 decision estimators</p>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          {featureWeights.map((feat, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-slate-200">{feat.feature}</span>
                <span className="text-cyan-400 font-bold">{feat.importance}</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" 
                  style={{ width: feat.importance }}
                />
              </div>
              <p className="text-[11px] text-slate-400 font-mono">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
