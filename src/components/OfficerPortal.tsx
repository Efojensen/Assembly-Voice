import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Search,
  MoreVertical,
  MapPin,
  Calendar,
  User,
  ArrowRight,
  Filter,
  ArrowLeft,
  ShieldAlert,
  ChevronRight,
  Users,
  ShieldCheck
} from 'lucide-react';

const Dashboard = () => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'resolved'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const reports = [
    { id: 'AV-90210', title: 'Major Pothole', category: 'Roads', location: 'Adum Main St', status: 'pending', date: '2026-04-03', reporter: 'John D.' },
    { id: 'AV-90211', title: 'Broken Pipe', category: 'Water', location: 'Bantama Market', status: 'in-progress', date: '2026-04-02', reporter: 'Sarah K.' },
    { id: 'AV-90212', title: 'Streetlight Out', category: 'Lighting', location: 'Asokwa Mall', status: 'resolved', date: '2026-04-01', reporter: 'Mike A.' },
    { id: 'AV-90213', title: 'Illegal Dumping', category: 'Waste', location: 'Kejetia', status: 'pending', date: '2026-04-03', reporter: 'Ama R.' },
  ];

  const filteredReports = reports.filter(r => {
    const matchesFilter = filter === 'all' || r.status === filter;
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = [
    { label: 'Pending', count: 2, icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Active', count: 1, icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Resolved', count: 1, icon: CheckCircle2, color: 'text-primary', bg: 'bg-primary-pale' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="space-y-2">
        <h1 className="text-3xl font-black text-text tracking-tight">Officer <span className="text-secondary">Portal</span></h1>
        <p className="text-text-muted font-medium">Managing district operations for <span className="font-bold text-text">KMA</span>.</p>
      </section>

      {/* Stats Overview */}
      <section className="grid grid-cols-3 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className={`${stat.bg} p-4 rounded-3xl border border-black/5 flex flex-col items-center text-center gap-1`}>
            <stat.icon size={20} className={stat.color} />
            <span className="text-xl font-black text-text">{stat.count}</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">{stat.label}</span>
          </div>
        ))}
      </section>

      {/* Search and Filter */}
      <section className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light" size={20} />
          <input 
            type="text" 
            placeholder="Search by ID or Title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-14 pl-12 pr-4 bg-white border-2 border-border rounded-2xl focus:border-secondary outline-none transition-all font-medium"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {(['all', 'pending', 'in-progress', 'resolved'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                filter === f ? 'bg-secondary text-white shadow-lg shadow-secondary/20' : 'bg-white border border-border text-text-muted hover:border-secondary/30'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* Reports List */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="font-black text-text uppercase tracking-widest text-xs">Recent Reports</h3>
          <button className="text-secondary font-bold text-xs flex items-center gap-1">
            <Filter size={14} /> Advanced Filter
          </button>
        </div>

        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredReports.map((report) => (
              <motion.div
                key={report.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border border-border rounded-3xl p-5 hover:border-secondary/30 transition-all group"
              >
                <Link to={`/officer/report/${report.id}`} className="block space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        report.status === 'resolved' ? 'bg-primary-pale text-primary' : 
                        report.status === 'in-progress' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {report.status === 'resolved' ? <CheckCircle2 size={20} /> : <Clock size={20} />}
                      </div>
                      <div>
                        <h4 className="font-bold text-text text-sm group-hover:text-secondary transition-colors">{report.title}</h4>
                        <p className="text-[10px] font-black text-text-light uppercase tracking-widest">{report.id}</p>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-text-light group-hover:text-secondary transition-all group-hover:translate-x-1" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-text-muted uppercase tracking-widest">
                      <MapPin size={12} className="text-secondary" />
                      {report.location}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-text-muted uppercase tracking-widest">
                      <Calendar size={12} className="text-secondary" />
                      {report.date}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                      report.status === 'resolved' ? 'bg-primary-pale text-primary' : 
                      report.status === 'in-progress' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {report.status}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                        <User size={12} className="text-text-light" />
                      </div>
                      <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{report.reporter}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredReports.length === 0 && (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-text-light">
                <Search size={32} />
              </div>
              <p className="text-sm font-bold text-text-muted">No reports found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const ReportDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const reportId = location.pathname.split('/').pop();

  return (
    <div className="space-y-8">
      <button 
        onClick={() => navigate('/officer')}
        className="flex items-center gap-2 text-xs font-black text-text-muted hover:text-secondary transition-colors uppercase tracking-widest"
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-text tracking-tight">Report Details</h1>
            <p className="text-[10px] font-black text-text-light uppercase tracking-widest">{reportId}</p>
          </div>
          <div className="bg-amber-50 text-amber-600 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-amber-100">
            Pending Review
          </div>
        </div>

        <div className="bg-white border-2 border-border rounded-[2.5rem] p-6 space-y-6">
          <div className="flex items-center gap-2">
            <span className="bg-primary-pale text-primary border border-primary text-[10px] font-black px-3 py-1 rounded-full">
              Road Infrastructure
            </span>
            <span className="bg-blue-50 text-blue-600 border border-blue-100 text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-1">
              <Users size={10} /> 6 Merged Reports
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="text-[10px] font-black text-secondary uppercase tracking-widest">AI Formal Summary</h3>
            <p className="text-sm font-medium text-text leading-relaxed">
              A large pothole on Adum Main Road near Kejetia Market is causing vehicles to swerve, presenting an immediate safety risk. Multiple citizens have reported this in the last 24 hours.
            </p>
          </div>

          <div className="bg-bg rounded-2xl p-4 space-y-2 border border-border/50">
            <h3 className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1">
              <ShieldCheck size={12} /> AI Reasoning
            </h3>
            <p className="text-xs font-medium text-text-muted leading-relaxed italic">
              "Severity 4/5 assigned due to high traffic volume at Kejetia and proximity to public transport hub. 6 unique reports confirm persistence. Recommended action: Immediate patch within 48 hours."
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
            <div className="space-y-1">
              <h3 className="text-[10px] font-black text-text-light uppercase tracking-widest">Category</h3>
              <p className="text-sm font-bold text-text">Road Infrastructure</p>
            </div>
            <div className="space-y-1">
              <h3 className="text-[10px] font-black text-text-light uppercase tracking-widest">Location</h3>
              <p className="text-sm font-bold text-text">Adum, Kumasi</p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="font-black text-text uppercase tracking-widest text-xs px-2">Take Action</h3>
        <div className="bg-white border-2 border-border rounded-[2.5rem] p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-text-light uppercase tracking-widest px-1">Update Status</label>
            <select className="w-full h-14 px-4 bg-bg border-2 border-border rounded-2xl focus:border-secondary outline-none font-bold text-text">
              <option>Pending</option>
              <option>In Progress</option>
              <option>Resolved</option>
              <option>Rejected</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-text-light uppercase tracking-widest px-1">Officer Note</label>
            <textarea 
              placeholder="Add a note about the progress..."
              className="w-full h-32 p-4 bg-bg border-2 border-border rounded-2xl focus:border-secondary outline-none font-medium text-text resize-none"
            />
          </div>

          <button className="w-full h-16 bg-secondary text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-secondary/20 hover:scale-[1.02] active:scale-95 transition-all">
            Update Report
          </button>
        </div>
      </section>
    </div>
  );
};

const OfficerPortal = () => {
  const userRole = localStorage.getItem('userRole');
  
  if (userRole !== 'officer') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center space-y-6">
        <div className="w-20 h-20 bg-red-50 text-red-600 rounded-3xl flex items-center justify-center shadow-xl shadow-red-100">
          <ShieldAlert size={40} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-text tracking-tight">Access Denied</h2>
          <p className="text-sm font-medium text-text-muted max-w-xs">
            This area is restricted to Assembly Officers. Please return to the citizen portal.
          </p>
        </div>
        <Link to="/" className="h-14 px-8 bg-primary text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center shadow-lg shadow-primary/20">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/report/:id" element={<ReportDetail />} />
      </Routes>
    </div>
  );
};

export default OfficerPortal;

