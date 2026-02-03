
import React from 'react';
import { MoreHorizontal, Plus, Clock, User as UserIcon, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MOCK_CASES, COLORS } from '../constants';
import { RiskLevel } from '../types';

const CaseCard = ({ caseItem }: any) => {
  const navigate = useNavigate();

  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case RiskLevel.CRITICAL: return 'bg-purple-100 text-purple-700 border-purple-200';
      case RiskLevel.HIGH: return 'bg-red-100 text-red-700 border-red-200';
      case RiskLevel.MEDIUM: return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  return (
    <div 
      onClick={() => navigate(`/cases/${caseItem.id}`)}
      className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-[0.98] mb-3 group"
    >
      <div className="flex justify-between items-start mb-3">
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getRiskColor(caseItem.riskLevel)}`}>
          {caseItem.riskLevel}
        </span>
        <button className="p-1 opacity-0 group-hover:opacity-100 hover:bg-slate-100 rounded transition-all">
          <MoreHorizontal className="w-4 h-4 text-slate-400" />
        </button>
      </div>
      <h4 className="text-sm font-bold text-slate-900 mb-1">{caseItem.alertType}</h4>
      <p className="text-xs text-slate-500 mb-4">Customer: <span className="text-blue-600 font-medium">{caseItem.customerId}</span></p>
      
      <div className="flex items-center justify-between">
        <div className="flex -space-x-1">
          <div className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-500">
            {caseItem.assignedAnalyst[0]}
          </div>
        </div>
        <div className="flex items-center space-x-1 text-slate-400">
          <Clock className="w-3 h-3" />
          <span className="text-[10px] font-medium">{caseItem.timeInQueue}</span>
        </div>
      </div>
    </div>
  );
};

const CaseManagement: React.FC = () => {
  const columns = [
    { title: 'New Alerts', status: 'NEW', count: 5 },
    { title: 'In Review', status: 'IN_REVIEW', count: 3 },
    { title: 'Pending Info', status: 'PENDING_INFO', count: 8 },
    { title: 'Resolved', status: 'READY_TO_CLOSE', count: 12 },
  ];

  return (
    <div className="h-full flex flex-col space-y-6 animate-in zoom-in-95 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Case Investigation Workflow</h1>
          <p className="text-slate-500">Managing compliance review cycles for 1.2M monthly alerts.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center -space-x-2 mr-4">
            {[1, 2, 3, 4].map(i => (
              <img key={i} src={`https://picsum.photos/32/32?random=${i}`} className="w-8 h-8 rounded-full border-2 border-white" alt="analyst" />
            ))}
            <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-500">
              +8
            </div>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-[#003087] text-white rounded-lg hover:bg-blue-800 transition-colors">
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">Create Manual Case</span>
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-0 overflow-hidden">
        {columns.map((col) => (
          <div key={col.status} className="flex flex-col min-h-0 bg-slate-100/50 rounded-xl border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-4 px-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-slate-700">{col.title}</h3>
                <span className="px-2 py-0.5 bg-slate-200 rounded text-xs font-bold text-slate-500">{col.count}</span>
              </div>
              <button className="p-1 hover:bg-slate-200 rounded text-slate-400">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-1">
              {MOCK_CASES.filter(c => c.status === (col.status as any)).map(c => (
                <CaseCard key={c.id} caseItem={c} />
              ))}
              
              {col.count > MOCK_CASES.filter(c => c.status === (col.status as any)).length && (
                <div className="py-8 border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center text-slate-300">
                  <AlertTriangle className="w-6 h-6 mb-2 opacity-50" />
                  <span className="text-xs font-medium">More alerts pending...</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseManagement;
