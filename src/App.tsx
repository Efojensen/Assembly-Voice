import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu } from 'lucide-react';

// Components
import Home from './components/Home';
import ReportForm from './components/ReportForm';
import Tracking from './components/Tracking';
import OfficerPortal from './components/OfficerPortal';
import Transparency from './components/Transparency';

// Layout Component
const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isOfficerPath = location.pathname.startsWith('/officer');
  
  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <header className="bg-primary px-4 py-3 flex items-center justify-between sticky top-0 z-50 shadow-md">
        <Link to="/" className="text-white font-medium tracking-wide flex items-center gap-2">
          <span className="text-xl">AssemblyVoice</span>
        </Link>
        <div className="flex items-center gap-3">
          {!isOfficerPath ? (
            <Link 
              to="/tracking" 
              className="text-white/80 text-xs border border-white/30 rounded-full px-3 py-1 hover:bg-white/10 transition-colors"
            >
              Track a report
            </Link>
          ) : (
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs text-white font-bold">
              AO
            </div>
          )}
          <button className="text-white/80 p-1">
            <Menu size={20} />
          </button>
        </div>
      </header>
      
      <main className="flex-grow max-w-md mx-auto w-full bg-bg">
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
        <div className="flex justify-center gap-4 text-[10px] text-text-light font-medium uppercase tracking-widest">
          <Link to="/transparency" className="hover:text-primary">Transparency</Link>
          <Link to="/officer" className="hover:text-primary">Officer Portal</Link>
          <Link to="/" className="hover:text-primary">Citizen Home</Link>
        </div>
        <p className="text-[9px] text-text-light mt-2">© 2026 AssemblyVoice · Local Government Accountability</p>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report/*" element={<ReportForm />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/officer/*" element={<OfficerPortal />} />
          <Route path="/transparency" element={<Transparency />} />
        </Routes>
      </Layout>
    </Router>
  );
}
