import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, LogOut, User, Building2 } from 'lucide-react';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

// Components
import Home from './components/Home';
import ReportForm from './components/ReportForm';
import Tracking from './components/Tracking';
import OfficerPortal from './components/OfficerPortal';
import Transparency from './components/Transparency';
import Welcome from './components/Welcome';
import SignIn from './components/SignIn';
import Authenticate from './components/Authentication';

// Layout Component
const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isOfficerPath = location.pathname.startsWith('/officer');
  const isAuthPath = location.pathname === '/welcome' || location.pathname === '/signin' || location.pathname === '/authenticate' ;
  const [user, setUser] = useState<any>(null);
  const selectedAssembly = localStorage.getItem('selectedAssembly') || 'KMA';
  const userRole = localStorage.getItem('userRole') || 'citizen';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    localStorage.removeItem('userRole');
    localStorage.removeItem('selectedAssembly');
    window.location.href = '/welcome';
  };

  if (isAuthPath) return <>{children}</>;

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <header className="bg-primary px-4 py-3 flex items-center justify-between sticky top-0 z-50 shadow-md">
        <Link to="/" className="text-white font-medium tracking-wide flex items-center gap-2">
          <Building2 size={20} />
          <span className="text-xl">AssemblyVoice</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 mr-2">
            <span className="text-[10px] text-white/60 font-bold uppercase tracking-tighter">District:</span>
            <span className="text-xs text-white font-bold">{selectedAssembly.toUpperCase()}</span>
          </div>

          {!isOfficerPath ? (
            <Link
              to="/tracking"
              className="bg-white text-primary text-[10px] font-bold uppercase tracking-wider rounded-lg px-3 py-2 hover:bg-white/90 transition-colors"
            >
              Track Report
            </Link>
          ) : (
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs text-white font-bold border border-white/30">
              AO
            </div>
          )}

          <div className="relative group">
            <button className="text-white/80 p-1 hover:text-white transition-colors">
              <Menu size={20} />
            </button>
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
              <div className="p-3 border-b border-border bg-primary-pale/30">
                <p className="text-xs font-bold text-text truncate">{user?.email || 'Guest User'}</p>
                <p className="text-[10px] text-text-muted uppercase tracking-wider">{localStorage.getItem('userRole') || 'Citizen'}</p>
              </div>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-2 p-3 text-xs text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="grow max-w-md mx-auto w-full bg-bg shadow-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bg-white border-t border-border p-4 text-center">
        <div className="flex justify-center gap-2 mb-4">
          {userRole === 'officer' ? (
            <Link to="/officer" className="flex-1 bg-secondary text-white text-[10px] font-bold uppercase tracking-widest py-3 rounded-xl">Officer Dashboard</Link>
          ) : (
            <Link to="/report" className="flex-1 bg-secondary text-white text-[10px] font-bold uppercase tracking-widest py-3 rounded-xl">Report Issue</Link>
          )}
          <Link to="/transparency" className="flex-1 bg-primary-pale text-primary text-[10px] font-bold uppercase tracking-widest py-3 rounded-xl">Statistics</Link>
        </div>
        <div className="flex justify-center gap-4 text-[10px] text-text-light font-medium uppercase tracking-widest">
          {userRole === 'officer' ? (
            <Link to="/" className="hover:text-primary">Citizen View</Link>
          ) : (
            <Link to="/officer" className="hover:text-primary">Officer Portal</Link>
          )}
          <Link to="/tracking" className="hover:text-primary">Track Report</Link>
        </div>
        <p className="text-[9px] text-text-light mt-2">© 2026 AssemblyVoice · {selectedAssembly.toUpperCase()} District</p>
      </footer>
    </div>
  );
};

export default function App() {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const storedRole = localStorage.getItem('userRole');
      setRole(storedRole);
      setIsAuth(!!user || !!storedRole);
    });
    return () => unsubscribe();
  }, []);

  if (isAuth === null) return <div className="min-h-screen bg-primary flex items-center justify-center text-white font-bold">Loading...</div>;

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/authenticate" element={<Authenticate />} />

          <Route path="/" element={isAuth ? (role === 'officer' ? <Navigate to="/officer" /> : <Home />) : <Navigate to="/welcome" />} />
          <Route path="/report/*" element={isAuth ? <ReportForm /> : <Navigate to="/welcome" />} />
          <Route path="/tracking" element={isAuth ? <Tracking /> : <Navigate to="/welcome" />} />
          <Route path="/officer/*" element={isAuth ? <OfficerPortal /> : <Navigate to="/welcome" />} />
          <Route path="/transparency" element={isAuth ? <Transparency /> : <Navigate to="/welcome" />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
}
