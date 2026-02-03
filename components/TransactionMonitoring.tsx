
import React, { useState } from 'react';
import { MoreVertical, Filter, Download, ExternalLink, ChevronDown, ChevronUp, AlertTriangle, ShieldCheck, User, Server } from 'lucide-react';
import { MOCK_TRANSACTIONS } from '../constants';
import { TransactionStatus, RiskLevel } from '../types';

const TransactionMonitoring: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getStatusColor = (status: TransactionStatus) => {
    switch (status) {
      case TransactionStatus.APPROVED: return 'bg-green-100 text-green-700 border-green-200';
      case TransactionStatus.PENDING: return 'bg-amber-100 text-amber-700 border-amber-200';
      case TransactionStatus.BLOCKED: return 'bg-red-100 text-red-700 border-red-200';
      case TransactionStatus.ESCALATED: return 'bg-purple-100 text-purple-700 border-purple-200';
    }
  };

  const getRiskColor = (score: number) => {
    if (score < 30) return 'text-green-600';
    if (score < 70) return 'text-amber-600';
    return 'text-red-600';
  };

  const getRiskBadgeColor = (level: RiskLevel) => {
    switch (level) {
      case RiskLevel.CRITICAL: return 'bg-purple-100 text-purple-700 border-purple-200';
      case RiskLevel.HIGH: return 'bg-red-100 text-red-700 border-red-200';
      case RiskLevel.MEDIUM: return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Real-time Transaction Feed</h1>
          <p className="text-slate-500">Analyzing 2,400+ transactions per second globally.</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-slate-200 rounded-lg bg-white text-slate-700 hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Export CSV</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-[#003087] text-white rounded-lg hover:bg-blue-800 transition-colors">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Advanced Filters</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Origin / Destination</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Risk Score</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_TRANSACTIONS.map((txn) => (
                <React.Fragment key={txn.id}>
                  <tr 
                    className={`hover:bg-slate-50 cursor-pointer transition-colors ${expandedId === txn.id ? 'bg-blue-50/30' : ''}`}
                    onClick={() => setExpandedId(expandedId === txn.id ? null : txn.id)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {expandedId === txn.id ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                        <span className="text-sm font-semibold text-blue-900 mono">{txn.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {new Date(txn.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-slate-900 mono">${txn.amount.toLocaleString()} {txn.currency}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-bold text-slate-600">{txn.sender.country}</span>
                        <span className="text-slate-400">→</span>
                        <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-bold text-slate-600">{txn.receiver.country}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${txn.riskScore > 70 ? 'bg-red-500' : txn.riskScore > 30 ? 'bg-amber-500' : 'bg-green-500'}`} 
                            style={{ width: `${txn.riskScore}%` }}
                          />
                        </div>
                        <span className={`text-sm font-bold ${getRiskColor(txn.riskScore)}`}>{txn.riskScore}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${getStatusColor(txn.status)}`}>
                        {txn.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-1 hover:bg-slate-200 rounded transition-colors text-slate-500">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                  {expandedId === txn.id && (
                    <tr className="bg-blue-50/30">
                      <td colSpan={7} className="px-12 py-6 border-l-4 border-blue-500">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                          <div>
                            <div className="flex items-center space-x-2 mb-3">
                              <User className="w-4 h-4 text-slate-400" />
                              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Transaction Details</h4>
                            </div>
                            <div className="space-y-2 bg-white/50 p-3 rounded-lg border border-slate-200/50">
                              <p className="text-xs text-slate-600 flex justify-between">Gateway: <span className="flex items-center space-x-1 font-semibold text-slate-900"><Server className="w-3 h-3 text-blue-500" /> <span>{txn.gateway}</span></span></p>
                              <p className="text-xs text-slate-600 flex justify-between">Sender: <span className="font-semibold text-slate-900 mono">{txn.sender.id}</span></p>
                              <p className="text-xs text-slate-600 flex justify-between items-center">
                                Risk Level: 
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getRiskBadgeColor(txn.sender.riskRating)}`}>
                                  {txn.sender.riskRating}
                                </span>
                              </p>
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center space-x-2 mb-3">
                              <ShieldCheck className="w-4 h-4 text-slate-400" />
                              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Receiver Details</h4>
                            </div>
                            <div className="space-y-2 bg-white/50 p-3 rounded-lg border border-slate-200/50">
                              <p className="text-xs text-slate-600 flex justify-between">ID: <span className="font-semibold text-slate-900 mono">{txn.receiver.id}</span></p>
                              <p className="text-xs text-slate-600 flex justify-between">Country: <span className="font-semibold text-slate-900">{txn.receiver.country}</span></p>
                              <p className="text-xs text-slate-600 flex justify-between items-center">
                                Risk Level: 
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getRiskBadgeColor(txn.receiver.riskRating)}`}>
                                  {txn.receiver.riskRating}
                                </span>
                              </p>
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center space-x-2 mb-3">
                              <AlertTriangle className="w-4 h-4 text-slate-400" />
                              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Triggered Rules</h4>
                            </div>
                            {txn.triggeredRules.length > 0 ? (
                              <div className="space-y-2">
                                {txn.triggeredRules.map(rule => (
                                  <div key={rule} className="flex items-center space-x-2 p-2 bg-red-50 border border-red-100 rounded">
                                    <AlertTriangle className="w-3 h-3 text-red-500" />
                                    <span className="text-xs font-semibold text-red-700">{rule}</span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="p-3 bg-green-50 border border-green-100 rounded text-center">
                                <p className="text-xs text-green-700 font-medium">Clear of automated flags</p>
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col justify-between">
                            <div>
                              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Compliance Disposition</h4>
                              <div className="grid grid-cols-2 gap-2">
                                <button className="px-3 py-2 bg-green-600 text-white text-[10px] font-bold rounded hover:bg-green-700 transition-colors uppercase tracking-wider">Approve</button>
                                <button className="px-3 py-2 bg-red-600 text-white text-[10px] font-bold rounded hover:bg-red-700 transition-colors uppercase tracking-wider">Block</button>
                                <button className="col-span-2 px-3 py-2 bg-slate-800 text-white text-[10px] font-bold rounded hover:bg-slate-900 transition-colors uppercase tracking-wider">Escalate</button>
                              </div>
                            </div>
                            <button className="flex items-center justify-center space-x-1 mt-4 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors group">
                              <span>Open Case Details</span>
                              <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
          <span className="text-sm text-slate-500">Showing <span className="font-medium text-slate-900">20</span> of <span className="font-medium text-slate-900">12,847</span> results</span>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-slate-300 rounded text-sm bg-white text-slate-500 disabled:opacity-50">Previous</button>
            <button className="px-3 py-1 border border-slate-300 rounded text-sm bg-white text-slate-900 hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionMonitoring;
