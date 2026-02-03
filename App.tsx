
import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
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
  X,
  ArrowRight,
  FileText,
  CreditCard,
  UserCheck
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import TransactionMonitoring from './components/TransactionMonitoring';
import SanctionsScreening from './components/SanctionsScreening';
import CaseManagement from './components/CaseManagement';
import CaseDetails from './components/CaseDetails';
import RuleConfiguration from './components/RuleConfiguration';
import { MOCK_TRANSACTIONS, MOCK_CASES, MOCK_SANCTIONS } from './constants';

const Sidebar = ({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Monitoring', icon: Activity, path: '/monitoring' },
    { name: 'Sanctions', icon: ShieldAlert, path: '/sanctions' },
    { name: 'Cases', icon: Briefcase, path: '/cases' },
    { name: 'Rules', icon: Settings, path: '/rules' }
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
          const isActive = location.pathname.startsWith(item.path === '/' ? '____NONE____' : item.path) || (item.path === '/' && location.pathname === '/');
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
            <p className="text-sm font-medium text-white">John Doe</p>
            <p className="text-xs text-blue-300">Compliance Officer</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{
    transactions: any[],
    cases: any[],
    sanctions: any[]
  }>({ transactions: [], cases: [], sanctions: [] });
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (val: string) => {
    setQuery(val);
    if (val.length < 2) {
      setResults({ transactions: [], cases: [], sanctions: [] });
      setShowResults(false);
      return;
    }

    const filteredTransactions = MOCK_TRANSACTIONS.filter(t => 
      t.id.toLowerCase().includes(val.toLowerCase()) || 
      t.sender.id.toLowerCase().includes(val.toLowerCase())
    ).slice(0, 3);

    const filteredCases = MOCK_CASES.filter(c => 
      c.id.toLowerCase().includes(val.toLowerCase()) || 
      c.alertType.toLowerCase().includes(val.toLowerCase()) ||
      c.customerId.toLowerCase().includes(val.toLowerCase())
    ).slice(0, 3);

    const filteredSanctions = MOCK_SANCTIONS.filter(s => 
      s.searchedName.toLowerCase().includes(val.toLowerCase()) ||
      s.matchedEntity.toLowerCase().includes(val.toLowerCase())
    ).slice(0, 3);

    setResults({
      transactions: filteredTransactions,
      cases: filteredCases,
      sanctions: filteredSanctions
    });
    setShowResults(true);
  };

  const navigateTo = (path: string) => {
    navigate(path);
    setShowResults(false);
    setQuery('');
  };

  const hasAnyResults = results.transactions.length > 0 || results.cases.length > 0 || results.sanctions.length > 0;

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center space-x-4 flex-1">
        <button className="lg:hidden text-slate-600" onClick={toggleSidebar}>
          <Menu className="w-6 h-6" />
        </button>
        <div className="relative hidden md:flex items-center w-full max-w-xl" ref={searchRef}>
          <div className="flex items-center bg-slate-100 px-3 py-1.5 rounded-md border border-slate-200 w-full focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
            <Search className="w-4 h-4 text-slate-400 mr-2" />
            <input 
              type="text" 
              value={query}
              onFocus={() => query.length >= 2 && setShowResults(true)}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search transactions, cases, or entities..." 
              className="bg-transparent border-none outline-none text-sm w-full"
            />
            {query && (
              <button onClick={() => {setQuery(''); setShowResults(false);}} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {showResults && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
              {!hasAnyResults ? (
                <div className="p-8 text-center text-slate-500">
                  <Search className="w-10 h-10 mx-auto mb-2 opacity-20" />
                  <p className="text-sm">No results found for "{query}"</p>
                </div>
              ) : (
                <div className="max-h-[70vh] overflow-y-auto">
                  {results.cases.length > 0 && (
                    <div className="p-2">
                      <h4 className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center">
                        <FileText className="w-3 h-3 mr-2" /> Active Cases
                      </h4>
                      {results.cases.map(c => (
                        <button 
                          key={c.id} 
                          onClick={() => navigateTo(`/cases/${c.id}`)}
                          className="w-full text-left px-3 py-2.5 hover:bg-slate-50 rounded-lg flex items-center justify-between group transition-colors"
                        >
                          <div>
                            <p className="text-xs font-bold text-slate-900">{c.id} - {c.alertType}</p>
                            <p className="text-[10px] text-slate-500">Analyst: {c.assignedAnalyst} • {c.status}</p>
                          </div>
                          <ArrowRight className="w-3 h-3 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                        </button>
                      ))}
                    </div>
                  )}

                  {results.transactions.length > 0 && (
                    <div className="p-2 border-t border-slate-100">
                      <h4 className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center">
                        <CreditCard className="w-3 h-3 mr-2" /> Recent Transactions
                      </h4>
                      {results.transactions.map(t => (
                        <button 
                          key={t.id} 
                          onClick={() => navigateTo('/monitoring')}
                          className="w-full text-left px-3 py-2.5 hover:bg-slate-50 rounded-lg flex items-center justify-between group transition-colors"
                        >
                          <div>
                            <p className="text-xs font-bold text-slate-900">{t.id}</p>
                            <p className="text-[10px] text-slate-500">${t.amount.toLocaleString()} {t.currency} • {t.status}</p>
                          </div>
                          <ArrowRight className="w-3 h-3 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                        </button>
                      ))}
                    </div>
                  )}

                  {results.sanctions.length > 0 && (
                    <div className="p-2 border-t border-slate-100">
                      <h4 className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center">
                        <UserCheck className="w-3 h-3 mr-2" /> Watchlist Entities
                      </h4>
                      {results.sanctions.map(s => (
                        <button 
                          key={s.id} 
                          onClick={() => navigateTo('/sanctions')}
                          className="w-full text-left px-3 py-2.5 hover:bg-slate-50 rounded-lg flex items-center justify-between group transition-colors"
                        >
                          <div>
                            <p className="text-xs font-bold text-slate-900">{s.matchedEntity}</p>
                            <p className="text-[10px] text-slate-500">Source: {s.listSource} • {Math.round(s.matchScore * 100)}% Match</p>
                          </div>
                          <ArrowRight className="w-3 h-3 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                        </button>
                      ))}
                    </div>
                  )}
                  
                  <div className="p-2 bg-slate-50 border-t border-slate-100">
                    <button 
                      onClick={() => navigateTo('/')}
                      className="w-full text-center py-2 text-[10px] font-bold text-blue-600 hover:text-blue-800 uppercase tracking-widest"
                    >
                      Search Advanced Records
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
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
              <Route path="/cases/:id" element={<CaseDetails />} />
              <Route path="/rules" element={<RuleConfiguration />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
