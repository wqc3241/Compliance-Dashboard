
import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, BarChart, Bar 
} from 'recharts';
// Added Activity to the imports
import { ArrowUpRight, ArrowDownRight, Users, AlertTriangle, ShieldCheck, Clock, Activity } from 'lucide-react';
import { COLORS } from '../constants';

const lineData = [
  { name: 'Mon', alerts: 1240 },
  { name: 'Tue', alerts: 1420 },
  { name: 'Wed', alerts: 1100 },
  { name: 'Thu', alerts: 1580 },
  { name: 'Fri', alerts: 1890 },
  { name: 'Sat', alerts: 940 },
  { name: 'Sun', alerts: 820 },
];

const riskData = [
  { name: 'High', value: 15, color: COLORS.risk.high },
  { name: 'Medium', value: 35, color: COLORS.risk.medium },
  { name: 'Low', value: 50, color: COLORS.risk.low },
];

const regionData = [
  { name: 'North America', volume: 4500, risk: 12 },
  { name: 'Europe', volume: 3800, risk: 8 },
  { name: 'Asia Pacific', volume: 5200, risk: 24 },
  { name: 'Latin America', volume: 2100, risk: 38 },
  { name: 'Middle East', volume: 1500, risk: 42 },
];

const StatCard = ({ title, value, change, icon: Icon, trend }: any) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{title}</p>
        <h3 className="text-3xl font-bold text-slate-900 mt-2">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${trend === 'up' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
    <div className="mt-4 flex items-center space-x-2">
      {trend === 'up' ? (
        <span className="flex items-center text-xs font-bold text-red-500">
          <ArrowUpRight className="w-3 h-3 mr-1" /> {change}
        </span>
      ) : (
        <span className="flex items-center text-xs font-bold text-green-500">
          <ArrowDownRight className="w-3 h-3 mr-1" /> {change}
        </span>
      )}
      <span className="text-xs text-slate-400">vs last 24h</span>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Executive Compliance Overview</h1>
          <p className="text-slate-500">Real-time risk assessment and operational metrics.</p>
        </div>
        <div className="flex items-center space-x-2 bg-white px-3 py-1.5 border border-slate-200 rounded-lg">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-sm font-medium text-slate-600">Live Updates Enabled</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Transactions" value="2.4M" change="12%" icon={Activity} trend="up" />
        <StatCard title="Alerts Generated" value="12,847" change="8.4%" icon={AlertTriangle} trend="up" />
        <StatCard title="False Positive Rate" value="47.2%" change="2.1%" icon={ShieldCheck} trend="down" />
        <StatCard title="Avg Resolution" value="8.2m" change="5.5%" icon={Clock} trend="down" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold text-slate-900">Alert Volume Trend</h2>
            <select className="bg-slate-50 border border-slate-200 text-xs font-medium rounded p-1">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={lineData}>
                <defs>
                  <linearGradient id="colorAlerts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.accent} stopOpacity={0.1}/>
                    <stop offset="95%" stopColor={COLORS.accent} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  cursor={{ stroke: '#cbd5e1' }}
                />
                <Area type="monotone" dataKey="alerts" stroke={COLORS.accent} strokeWidth={3} fillOpacity={1} fill="url(#colorAlerts)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-8">Risk Distribution</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" align="center" iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">High Risk Threshold</span>
              <span className="font-bold text-red-600">&gt; 85%</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Active Investigations</span>
              <span className="font-bold text-slate-900">1,245</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-6">Regional Risk Intensity</h2>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={regionData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={true} stroke="#e2e8f0" />
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={120} tick={{fill: '#475569', fontSize: 12}} />
              <Tooltip cursor={{fill: '#f8fafc'}} />
              <Bar dataKey="risk" name="Risk Index" fill={COLORS.accent} radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
