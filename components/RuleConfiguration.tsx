
import React, { useState } from 'react';
import { Settings2, Plus, PlayCircle, BarChart3, Globe, ToggleLeft, ToggleRight, Trash2, Edit2, Zap } from 'lucide-react';
import { MOCK_RULES } from '../constants';

const RuleConfiguration: React.FC = () => {
  const [rules, setRules] = useState(MOCK_RULES);

  const toggleRule = (id: string) => {
    setRules(rules.map(r => r.id === id ? { ...r, status: r.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' } : r));
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Global Rules Engine</h1>
          <p className="text-slate-500">Configure jurisdictional logic and ML-driven risk thresholds.</p>
        </div>
        <button className="flex items-center space-x-2 px-6 py-3 bg-[#003087] text-white rounded-lg hover:bg-blue-800 transition-all shadow-md">
          <Zap className="w-4 h-4 text-yellow-300" />
          <span className="text-sm font-bold">New Smart Rule</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-6">
          {rules.map((rule) => (
            <div key={rule.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden group">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${rule.status === 'ACTIVE' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                      <Settings2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 flex items-center">
                        {rule.name}
                        {rule.status === 'ACTIVE' && <span className="ml-2 w-2 h-2 bg-green-500 rounded-full"></span>}
                      </h3>
                      <p className="text-sm text-slate-500">{rule.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => toggleRule(rule.id)}
                      className="transition-colors"
                    >
                      {rule.status === 'ACTIVE' ? <ToggleRight className="w-10 h-10 text-blue-600" /> : <ToggleLeft className="w-10 h-10 text-slate-300" />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Alert Hit Rate</span>
                    <div className="flex items-end space-x-2">
                      <span className="text-xl font-bold text-slate-900">{(rule.hitRate * 100).toFixed(1)}%</span>
                      <span className="text-[10px] text-green-500 font-bold mb-1">+0.2%</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">False Positive</span>
                    <div className="flex items-end space-x-2">
                      <span className="text-xl font-bold text-slate-900">{(rule.falsePositiveRate * 100).toFixed(0)}%</span>
                      <span className="text-[10px] text-red-400 font-bold mb-1">-1.5%</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Jurisdictions</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {rule.jurisdictions.map(j => (
                        <span key={j} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-[10px] font-bold">{j}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Last 30 Days</span>
                    <span className="text-xl font-bold text-slate-900">{rule.lastAlertCount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <div className="flex space-x-6">
                    <button className="flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors">
                      <BarChart3 className="w-4 h-4" />
                      <span>Analytics Dashboard</span>
                    </button>
                    <button className="flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors">
                      <PlayCircle className="w-4 h-4" />
                      <span>Backtest Rule</span>
                    </button>
                  </div>
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-all">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center space-x-2">
              <Globe className="w-5 h-5 text-blue-500" />
              <span>Global Config</span>
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">Decision Latency P99</span>
                <span className="font-bold text-green-600">84ms</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">Circuit Breaker Status</span>
                <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-[10px] font-bold uppercase">Healthy</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">Rule Deployment v.4.2</span>
                <span className="text-slate-400">Deployed 4h ago</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-bold">Optimization Insight</h3>
            <p className="text-slate-400 text-sm mt-3">Rule <span className="text-white font-mono">RULE-004</span> is currently disabled but simulations show it could catch <span className="text-yellow-400 font-bold">14.2%</span> more layering attempts with a <span className="text-blue-400 font-bold">28%</span> false positive rate.</p>
            <button className="w-full mt-6 py-2 bg-blue-600 hover:bg-blue-700 text-sm font-bold rounded transition-colors">
              Run Shadow Mode
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RuleConfiguration;
