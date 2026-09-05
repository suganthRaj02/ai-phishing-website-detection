import React, { useState, useEffect } from 'react';
import { 
  History, 
  Search, 
  Trash2, 
  Download, 
  RefreshCw, 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  Filter,
  ArrowUpDown,
  FileText
} from 'lucide-react';
import { UserProfile, DetectionResult } from '../types';
import { getUserDetections, deleteDetectionRecord, clearUserHistory } from '../firebase/firestore';
import { ObjectiveReportModal } from '../components/ObjectiveReportModal';

interface HistoryPageProps {
  user: UserProfile;
  onSelectDetection: (detection: DetectionResult) => void;
  onNavigateToDashboard: () => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({
  user,
  onSelectDetection,
  onNavigateToDashboard
}) => {
  const [history, setHistory] = useState<DetectionResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState<'ALL' | 'LEGITIMATE' | 'PHISHING' | 'HIGH_RISK'>('ALL');
  const [sortBy, setSortBy] = useState<'DATE_DESC' | 'DATE_ASC' | 'SCORE_DESC' | 'SCORE_ASC'>('DATE_DESC');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [reportingItem, setReportingItem] = useState<DetectionResult | null>(null);

  useEffect(() => {
    fetchHistory();
  }, [user.uid]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const records = await getUserDetections(user.uid);
      setHistory(records);
    } catch (err) {
      console.error('Error fetching history:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this scan record?')) return;
    
    setDeletingId(id);
    try {
      await deleteDetectionRecord(user.uid, id);
      setHistory(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error('Failed to delete detection:', err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleClearAll = async () => {
    if (!confirm('Clear all detection history for your account? This action cannot be undone.')) return;
    try {
      await clearUserHistory(user.uid);
      setHistory([]);
    } catch (err) {
      console.error('Failed to clear history:', err);
    }
  };

  const handleExportCSV = () => {
    if (history.length === 0) return;
    const headers = ['URL', 'Classification', 'Risk Score', 'Risk Level', 'Confidence', 'Timestamp', 'Recommendation'];
    const rows = history.map(h => [
      `"${h.url}"`,
      h.classification,
      h.riskScore,
      `"${h.riskLevel}"`,
      h.confidence,
      `"${h.timestamp}"`,
      `"${h.recommendation.replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `phishing_detection_history_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter & Sort
  const filteredHistory = history
    .filter(item => {
      const matchesSearch = item.url.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.features?.domain?.toLowerCase().includes(searchTerm.toLowerCase());
      if (!matchesSearch) return false;

      if (filterClass === 'LEGITIMATE') return item.classification === 'LEGITIMATE';
      if (filterClass === 'PHISHING') return item.classification === 'PHISHING';
      if (filterClass === 'HIGH_RISK') return item.riskScore > 70;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'DATE_DESC') return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      if (sortBy === 'DATE_ASC') return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      if (sortBy === 'SCORE_DESC') return b.riskScore - a.riskScore;
      if (sortBy === 'SCORE_ASC') return a.riskScore - b.riskScore;
      return 0;
    });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <History className="w-6 h-6 text-cyan-400" />
            <h1 className="text-2xl font-black text-white tracking-tight">Detection History</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Persisted audit records for <span className="text-slate-200">{user.email}</span> stored in Firebase Firestore.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={fetchHistory}
            disabled={loading}
            title="Refresh from Firestore"
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 border border-slate-800 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          {history.length > 0 && (
            <>
              <button
                onClick={handleExportCSV}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-300 text-xs font-mono border border-slate-800 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>

              <button
                onClick={handleClearAll}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 text-xs font-mono border border-red-800/40 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        {/* Search */}
        <div className="sm:col-span-6 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by URL or domain name..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
        </div>

        {/* Filter Dropdown */}
        <div className="sm:col-span-3">
          <select
            value={filterClass}
            onChange={(e: any) => setFilterClass(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:ring-1 focus:ring-cyan-500"
          >
            <option value="ALL">All Classifications</option>
            <option value="LEGITIMATE">✓ Legitimate Only</option>
            <option value="PHISHING">⚠ Phishing Only</option>
            <option value="HIGH_RISK">High Risk (&gt;70%)</option>
          </select>
        </div>

        {/* Sort Dropdown */}
        <div className="sm:col-span-3">
          <select
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:ring-1 focus:ring-cyan-500"
          >
            <option value="DATE_DESC">Newest Scans First</option>
            <option value="DATE_ASC">Oldest Scans First</option>
            <option value="SCORE_DESC">Highest Risk Score</option>
            <option value="SCORE_ASC">Lowest Risk Score</option>
          </select>
        </div>
      </div>

      {/* History Records List */}
      {loading ? (
        <div className="p-12 text-center text-slate-500 font-mono text-xs">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-3 text-cyan-400" />
          <span>Synchronizing history records from Firestore database...</span>
        </div>
      ) : filteredHistory.length === 0 ? (
        <div className="p-12 rounded-2xl bg-slate-900/40 border border-slate-800 text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 mx-auto">
            <History className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">No Detection Records Found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              {searchTerm ? 'No results matched your search query.' : 'You have not scanned any website URLs yet.'}
            </p>
          </div>
          <button
            onClick={onNavigateToDashboard}
            className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs transition-colors"
          >
            Scan a Website Now
          </button>
        </div>
      ) : (
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Website URL</th>
                  <th className="py-3 px-4">Classification</th>
                  <th className="py-3 px-4">Risk Score</th>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {filteredHistory.map((item) => {
                  const isPhish = item.classification === 'PHISHING' || item.riskScore >= 45;
                  return (
                    <tr
                      key={item.id || item.timestamp}
                      onClick={() => onSelectDetection(item)}
                      className="hover:bg-slate-800/40 transition-colors cursor-pointer group"
                    >
                      <td className="py-3 px-4 max-w-xs truncate font-medium text-slate-200">
                        <div className="flex items-center space-x-2">
                          <span className="truncate">{item.url}</span>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        {isPhish ? (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded text-[11px] font-bold bg-red-950/80 text-red-400 border border-red-800/60">
                            <ShieldAlert className="w-3 h-3" />
                            <span>⚠ PHISHING</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
                            <ShieldCheck className="w-3 h-3" />
                            <span>✓ LEGITIMATE</span>
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <span className={`font-bold ${
                            item.riskScore > 70 ? 'text-red-400' : item.riskScore > 30 ? 'text-amber-400' : 'text-emerald-400'
                          }`}>
                            {item.riskScore}%
                          </span>
                          <span className="text-[10px] text-slate-500 uppercase">
                            ({item.riskLevel})
                          </span>
                        </div>
                      </td>

                      <td className="py-3 px-4 text-slate-400 text-[11px]">
                        {new Date(item.timestamp).toLocaleString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setReportingItem(item);
                            }}
                            title="Generate Objective Report"
                            className="px-2.5 py-1 rounded bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 text-[11px] font-mono border border-cyan-700/60 flex items-center space-x-1 transition-colors"
                          >
                            <FileText className="w-3 h-3" />
                            <span>Report</span>
                          </button>
                          <button
                            onClick={(e) => handleDelete(item.id || '', e)}
                            disabled={deletingId === item.id}
                            title="Delete record"
                            className="p-1.5 rounded bg-slate-800 hover:bg-red-950 text-slate-400 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Objective Report Modal */}
      {reportingItem && (
        <ObjectiveReportModal
          result={reportingItem}
          onClose={() => setReportingItem(null)}
        />
      )}
    </div>
  );
};
