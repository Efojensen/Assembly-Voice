import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  MessageSquare,
  Calendar,
  ChevronRight,
  Info
} from 'lucide-react';

const Tracking = () => {
  const [code, setCode] = useState('KMA-2026-00347');
  const [isSearching, setIsSearching] = useState(false);

  const steps = [
    { name: 'Submitted', date: '2 Apr 2026, 10:14', status: 'done', icon: CheckCircle2 },
    { name: 'Verified', date: '2 Apr 2026, 14:30', status: 'done', icon: ShieldCheck },
    { name: 'Assigned', date: 'Roads Dept. · 3 Apr 2026', status: 'active', icon: Clock },
    { name: 'In Progress', date: 'Estimated: 5 Apr 2026', status: 'pending', icon: AlertCircle },
    { name: 'Resolved', date: '', status: 'pending', icon: CheckCircle2 },
  ];

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 1000);
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <section className="space-y-2">
        <h1 className="text-3xl font-black text-text tracking-tight">Track <span className="text-secondary">Report</span></h1>
        <p className="text-text-muted font-medium">Enter your tracking ID to see real-time updates.</p>
      </section>

      {/* Search Bar */}
      <section className="flex gap-3">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light" size={20} />
          <input 
            type="text" 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="e.g. KMA-2026-00347"
            className="w-full h-16 pl-12 pr-4 bg-white border-2 border-border rounded-2xl focus:border-secondary outline-none transition-all font-mono font-bold text-text uppercase tracking-widest"
          />
        </div>
        <button 
          onClick={handleSearch}
          className="w-16 h-16 bg-secondary text-white rounded-2xl flex items-center justify-center shadow-xl shadow-secondary/20 hover:scale-105 active:scale-95 transition-all"
        >
          {isSearching ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <ArrowRight size={24} />}
        </button>
      </section>

      {/* Report Summary Card */}
      <section className="bg-white border-2 border-border rounded-[2.5rem] p-6 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-5">
          <Info size={120} />
        </div>
        
        <div className="flex items-start justify-between relative z-10">
          <div className="space-y-1">
            <h3 className="text-[10px] font-black text-secondary uppercase tracking-widest">Report Summary</h3>
            <h2 className="text-xl font-black text-text tracking-tight">Major Pothole</h2>
          </div>
          <div className="bg-primary-pale text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
            Assigned
          </div>
        </div>

        <div className="bg-bg rounded-2xl p-4 space-y-2 relative z-10">
          <div className="flex items-center gap-2 text-[10px] font-black text-text-light uppercase tracking-widest">
            <MessageSquare size={12} className="text-secondary" /> AI Summary
          </div>
          <p className="text-xs font-medium text-text leading-relaxed italic">
            "Large pothole on Adum Main Road near Kejetia Market is causing vehicles to swerve. High safety risk flagged by 6 citizens."
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] font-black text-text-light uppercase tracking-widest">
              <MapPin size={12} className="text-secondary" /> Location
            </div>
            <p className="text-xs font-bold text-text">Adum Main Road, Kumasi</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] font-black text-text-light uppercase tracking-widest">
              <Calendar size={12} className="text-secondary" /> Submitted
            </div>
            <p className="text-xs font-bold text-text">2 Apr 2026</p>
          </div>
        </div>
      </section>

      {/* Status Pipeline */}
      <section className="space-y-6">
        <h3 className="font-black text-text uppercase tracking-widest text-xs px-2">Status Timeline</h3>
        
        <div className="space-y-0 relative">
          {/* Vertical Line */}
          <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-border z-0" />
          
          <div className="space-y-8 relative z-10">
            {steps.map((step, i) => (
              <div key={step.name} className="flex gap-6 items-start group">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-4 border-bg transition-all ${
                  step.status === 'done' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 
                  step.status === 'active' ? 'bg-secondary text-white shadow-lg shadow-secondary/20 scale-110' : 
                  'bg-white text-text-light border-border'
                }`}>
                  <step.icon size={24} />
                </div>
                
                <div className="pt-2 space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className={`font-black uppercase tracking-widest text-xs ${
                      step.status === 'done' ? 'text-primary' : 
                      step.status === 'active' ? 'text-secondary' : 
                      'text-text-light'
                    }`}>
                      {step.name}
                    </h4>
                    {step.status === 'active' && (
                      <span className="bg-secondary/10 text-secondary text-[8px] font-black px-2 py-0.5 rounded-full animate-pulse">
                        CURRENT
                      </span>
                    )}
                  </div>
                  {step.date && (
                    <p className="text-[10px] font-bold text-text-muted">{step.date}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Action Footer */}
      <section className="bg-primary-pale border-2 border-primary/10 rounded-3xl p-6 flex items-center justify-between group cursor-pointer hover:border-primary/30 transition-all">
        <div className="space-y-1">
          <h4 className="text-sm font-black text-primary uppercase tracking-widest">Need more info?</h4>
          <p className="text-xs font-medium text-primary/70">Contact the Assembly directly about this report.</p>
        </div>
        <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
          <ChevronRight size={20} />
        </div>
      </section>
    </div>
  );
};

export default Tracking;
