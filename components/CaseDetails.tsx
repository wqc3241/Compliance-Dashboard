
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  History, 
  AlertTriangle, 
  ShieldCheck, 
  FileText, 
  Mail, 
  Lock, 
  CheckCircle2,
  Clock,
  MoreVertical,
  Activity
} from 'lucide-react';
import { MOCK_CASES, MOCK_TRANSACTIONS } from '../constants';
import { RiskLevel } from '../types';

const CaseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const caseItem = MOCK_CASES.find(c => c.id === id);

  if (!caseItem) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-500">
        <AlertTriangle className="w-12 h-12 mb-4 opacity-20" />
        <p>Case not found</p>
        <Link to="/cases" className="mt-4 text-blue-600 hover:underline">Return to queue</Link>
      </div>
    );
  }

  const getRiskBadgeColor = (level: RiskLevel) => {
    switch (level) {
      case RiskLevel.CRITICAL: return 'bg-purple-100 text-purple-700 border-purple-200';
      case RiskLevel.HIGH: return 'bg-red-100 text-red-700 border-red-200';
      case RiskLevel.MEDIUM: return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  const timelineItems = [
    { time: '2h ago', event: 'Analyst assigned', user: 'System', icon: User },
    { time: '3h ago', event: 'Rule RULE-001 Triggered', user: 'Gateway Engine', icon: AlertTriangle },
    { time: '3h ago', event: 'Alert Generated', user: 'System', icon: Activity },
    { time: '4h ago', event: 'Transaction Received', user: 'CUST-009', icon: Clock }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/cases" className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all text-slate-500">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-slate-900">{caseItem.id}</h1>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getRiskBadgeColor(caseItem.riskLevel)}`}>
                {caseItem.riskLevel} RISK
              </span>
            </div>
            <p className="text-sm text-slate-500">Investigation started on {new Date().toLocaleDateString()}</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-slate-200 rounded-lg bg-white text-slate-700 hover:bg-slate-50">
            <Mail className="w-4 h-4" />
            <span className="text-sm font-medium">Request More Info</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-black transition-colors">
            <FileText className="w-4 h-4" />
            <span className="text-sm font-medium">File SAR Report</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-sm font-medium">Approve & Close</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h2 className="text-sm font-bold text-slate-600 uppercase tracking-wider flex items-center">
                <ShieldCheck className="w-4 h-4 mr-2 text-blue-500" /> Investigation Context
              </h2>
              <button className="text-blue-600 text-xs font-bold hover:underline">View Policy Guide</button>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-2">{caseItem.alertType} Analysis</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {caseItem.description || "System detected abnormal behavior relative to the historical baseline of this account. This includes velocity spikes and cross-border settlement patterns that align with known money laundering typologies."}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Customer Age</span>
                  <span className="text-sm font-bold text-slate-900">{caseItem.customerAge || '1.8 years'}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">KYC Status</span>
                  <span className="text-sm font-bold text-green-600 flex items-center"><CheckCircle2 className="w-3 h-3 mr-1" /> VERIFIED</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Avg Ticket</span>
                  <span className="text-sm font-bold text-slate-900">$240.00</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Primary Gateway</span>
                  <span className="text-sm font-bold text-blue-600">Core-API</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-sm font-bold text-slate-600 uppercase tracking-wider flex items-center">
                <Activity className="w-4 h-4 mr-2 text-purple-500" /> Recent Activity (30 Days)
              </h2>
              <span className="text-[10px] font-bold text-slate-400">Showing 5 latest</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50">
                  <tr>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase">TXN ID</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase">Amount</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase">Score</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_TRANSACTIONS.slice(0, 5).map(txn => (
                    <tr key={txn.id} className="hover:bg-slate-50">
                      <td className="px-6 py-3 text-xs font-semibold text-blue-900 mono">{txn.id}</td>
                      <td className="px-6 py-3 text-xs font-bold text-slate-900">${txn.amount.toLocaleString()}</td>
                      <td className="px-6 py-3 text-xs font-bold text-red-500">{txn.riskScore}</td>
                      <td className="px-6 py-3 text-[10px] font-bold uppercase text-slate-500">{txn.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-3 border-t border-slate-100 text-center">
              <button className="text-xs font-bold text-blue-600 hover:underline uppercase tracking-wider">Expand Full History</button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-sm font-bold text-slate-600 uppercase tracking-wider flex items-center mb-6">
              <History className="w-4 h-4 mr-2 text-slate-400" /> Investigation Audit
            </h2>
            <div className="space-y-6 relative">
              <div className="absolute left-2.5 top-2 bottom-2 w-px bg-slate-100"></div>
              {timelineItems.map((item, i) => (
                <div key={i} className="flex space-x-4 relative z-10">
                  <div className="w-5 h-5 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center">
                    <item.icon className="w-3 h-3 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{item.event}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{item.time} by {item.user}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-slate-100">
              <textarea 
                className="w-full h-24 p-3 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="Add investigation notes..."
              ></textarea>
              <button className="w-full mt-2 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors">
                Add Note
              </button>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-xl p-6 shadow-xl">
            <div className="flex items-center space-x-2 mb-4">
              <Lock className="w-4 h-4 text-blue-400" />
              <h2 className="text-sm font-bold uppercase tracking-wider">Internal Controls</h2>
            </div>
            <div className="space-y-4">
              <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Risk Override</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">Manual Score Adj.</span>
                  <button className="text-blue-400 text-[10px] font-bold hover:underline">Configure</button>
                </div>
              </div>
              <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Analyst Confidence</p>
                <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-blue-500 h-full w-[85%] rounded-full"></div>
                </div>
                <p className="text-[10px] text-right mt-1 text-slate-400 font-bold">85%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDetails;
