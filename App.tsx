
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Activity, 
  ShieldAlert, 
  Briefcase, 
  Settings, 
  Bell, 
  User, 
  Search,
  Menu,
  X
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import TransactionMonitoring from './components/TransactionMonitoring';
import SanctionsScreening from './components/SanctionsScreening';
import CaseManagement from './components/CaseManagement';
import RuleConfiguration from './components/RuleConfiguration';

const Sidebar = ({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Monitoring', icon: Activity, path: '/monitoring' },
    { name: 'Sanctions', icon: ShieldAlert, path: '/sanctions' },
    { name: 'Cases', icon: Briefcase, path: '/cases' },
    { name: 'Rules', icon: Settings, path: '/rules' },
  ];

  return (
    <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1a365d] text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}>
      <div className="flex items-center justify-between h-16 px-6 bg-[#003087]">
        <div className="flex items-center space-x-2">
          <ShieldAlert className="w-8 h-8 text-blue-300" />
          <span className="text-xl font-bold tracking-tight">ComplianceIQ</span>
        </div>
        <button className="lg:hidden" onClick={toggle}>
          <X className="w-6 h-6" />
        </button>
      </div>

      <nav className="mt-8 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-white/10 text-white font-semibold' 
                  : 'text-blue-100 hover:bg-white/5'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-300' : 'text-blue-400'}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-white/10">
        <div className="flex items-center space-x-3 px-4 py-2 bg-white/5 rounded-lg">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold">
            JD
          </div>
          <div>
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-blue-300">Compliance Officer</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center space-x-4">
        <button className="lg:hidden text-slate-600" onClick={toggleSidebar}>
          <Menu className="w-6 h-6" />
        </button>
        <div className="hidden md:flex items-center bg-slate-100 px-3 py-1.5 rounded-md border border-slate-200 w-96">
          <Search className="w-4 h-4 text-slate-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search transactions, cases, or entities..." 
            className="bg-transparent border-none outline-none text-sm w-full"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="h-8 w-px bg-slate-200 mx-2"></div>
        <div className="flex items-center space-x-2 cursor-pointer hover:bg-slate-50 p-1.5 rounded-lg transition-colors">
          <User className="w-5 h-5 text-slate-600" />
          <span className="text-sm font-medium text-slate-700">Account</span>
        </div>
      </div>
    </header>
  );
};

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex h-screen overflow-hidden">
        <Sidebar isOpen={sidebarOpen} toggle={() => setSidebarOpen(false)} />
        
        <div className="flex-1 flex flex-col min-w-0">
          <Header toggleSidebar={() => setSidebarOpen(true)} />
          
          <main className="flex-1 overflow-y-auto p-6 lg:p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/monitoring" element={<TransactionMonitoring />} />
              <Route path="/sanctions" element={<SanctionsScreening />} />
              <Route path="/cases" element={<CaseManagement />} />
              <Route path="/rules" element={<RuleConfiguration />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
