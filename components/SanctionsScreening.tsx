
import React, { useState } from 'react';
import { Search, History, ShieldAlert, CheckCircle, Flag, Info } from 'lucide-react';
import { MOCK_SANCTIONS } from '../constants';

const SanctionsScreening: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 800);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-in fade-in duration-500">
      <div className="lg:col-span-3 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Sanctions Screening Engine</h1>
          <p className="text-slate-500">Global fuzzy-matching across OFAC, EU, UN, and HM Treasury watchlists.</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <form onSubmit={handleSearch} className="flex space-x-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Entity Name, Alias, or Address..."
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
            <button className="px-8 py-3 bg-[#003087] text-white font-bold rounded-lg hover:bg-blue-800 transition-all flex items-center space-x-2">
              {isSearching ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : <span>Run Screening</span>}
            </button>
          </form>
          <div className="mt-4 flex items-center space-x-6 text-xs font-medium text-slate-500">
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-3 h-3 text-green-500" />
              <span>OFAC SDN v2.1 (Updated Today)</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-3 h-3 text-green-500" />
              <span>EU Consolidated (Updated Today)</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-3 h-3 text-green-500" />
              <span>UN Security Council (Updated Today)</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Screening Results</h2>
            <span className="text-xs text-slate-400">Scan duration: 42ms</span>
          </div>

          {MOCK_SANCTIONS.map((match) => (
            <div key={match.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex">
              <div className={`w-2 ${match.matchScore > 0.9 ? 'bg-red-500' : 'bg-amber-500'}`}></div>
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-bold text-slate-900">{match.matchedEntity}</h3>
                      <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-bold text-slate-600 uppercase tracking-tight">{match.listSource}</span>
                    </div>
                    <p className="text-sm text-slate-500">Match for query: <span className="font-semibold text-slate-700 italic">"{match.searchedName}"</span></p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-slate-900">{Math.round(match.matchScore * 100)}%</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Match Score</div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 py-4 border-y border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Match Type</span>
                    <p className="text-sm font-semibold text-slate-700 mt-1">{match.matchType}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Program</span>
                    <p className="text-sm font-semibold text-slate-700 mt-1">{match.program}</p>
                  </div>
                  <div className="md:col-span-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Listing Reason</span>
                    <p className="text-sm text-slate-600 mt-1 line-clamp-2">{match.reason}</p>
                  </div>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <div className="flex items-center space-x-2 text-xs text-slate-400">
                    <Info className="w-4 h-4" />
                    <span>Last audited by System: 2h ago</span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center space-x-1">
                      <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                      <span>False Positive</span>
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700 transition-colors flex items-center space-x-1">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>True Match / Block</span>
                    </button>
                    <button className="px-4 py-2 bg-slate-800 text-white rounded-lg text-xs font-bold hover:bg-slate-900 transition-colors flex items-center space-x-1">
                      <Flag className="w-3.5 h-3.5" />
                      <span>Escalate</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-2 mb-6">
            <History className="w-5 h-5 text-slate-400" />
            <h2 className="font-bold text-slate-900">Recent Searches</h2>
          </div>
          <div className="space-y-4">
            {['Al-Zarqawi', 'Crescent Trading', 'Hassan Ali', 'Moscow Bank', 'Silk Road Entities'].map((term) => (
              <div key={term} className="flex items-center justify-between group cursor-pointer">
                <span className="text-sm text-slate-600 group-hover:text-blue-600 transition-colors">{term}</span>
                <span className="text-[10px] text-slate-400">12m ago</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded transition-colors">
            View All Audit Logs
          </button>
        </div>

        <div className="bg-blue-900 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <ShieldAlert className="w-24 h-24" />
          </div>
          <h3 className="text-lg font-bold relative z-10">Policy Update</h3>
          <p className="text-blue-200 text-sm mt-2 relative z-10">New OFAC sectoral sanctions targeting energy logistics in Region X have been integrated into the engine.</p>
          <button className="mt-4 px-4 py-2 bg-blue-700 hover:bg-blue-600 text-xs font-bold rounded transition-colors relative z-10">
            Review Policy Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SanctionsScreening;
