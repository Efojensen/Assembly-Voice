import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  PlusCircle,
  Search,
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowRight,
  MapPin,
  Calendar
} from 'lucide-react';

const Home = () => {
  const selectedAssembly = localStorage.getItem('selectedAssembly') || 'KMA';

  const stats = [
    { label: 'Active', value: '12', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Resolved', value: '148', icon: CheckCircle2, color: 'text-primary', bg: 'bg-primary-pale' },
    { label: 'Pending', value: '5', icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const recentReports = [
    { id: '1', title: 'Broken Streetlight', location: 'Adum, Kumasi', status: 'In Progress', date: '2h ago' },
    { id: '2', title: 'Waste Collection', location: 'Bantama', status: 'Resolved', date: '5h ago' },
    { id: '3', title: 'Pothole Repair', location: 'Asokwa', status: 'Pending', date: '1d ago' },
  ];

  return (
    <div className="space-y-8 pb-20">
      {/* Welcome Section */}
      <section className="space-y-2">
        <h1 className="text-3xl font-black text-text tracking-tight">
          Hello, <span className="text-primary">Citizen</span>
        </h1>
        <p className="text-text-muted font-medium">
          Welcome to the <span className="font-bold text-text">{selectedAssembly.toUpperCase()}</span> Digital Portal.
        </p>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-3 gap-3">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`${stat.bg} p-4 rounded-3xl border border-black/5 flex flex-col items-center text-center gap-1`}
          >
            <stat.icon size={20} className={stat.color} />
            <span className="text-xl font-black text-text">{stat.value}</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">{stat.label}</span>
          </motion.div>
        ))}
      </section>

      {/* Main Action */}
      <section>
        <Link 
          to="/report"
          className="group relative block w-full bg-primary p-6 rounded-[2rem] shadow-xl shadow-primary/20 overflow-hidden active:scale-[0.98] transition-all"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
            <PlusCircle size={120} className="text-white" />
          </div>
          <div className="relative z-10 space-y-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white">
              <PlusCircle size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">Report an Issue</h2>
              <p className="text-white/80 text-sm font-medium">Help us improve your community today.</p>
            </div>
            <div className="inline-flex items-center gap-2 bg-white text-primary px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest">
              Start Report <ArrowRight size={14} />
            </div>
          </div>
        </Link>
      </section>

      {/* Recent Activity */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="font-black text-text uppercase tracking-widest text-xs">Recent Community Reports</h3>
          <Link to="/transparency" className="text-primary font-bold text-xs hover:underline">View All</Link>
        </div>
        <div className="space-y-3">
          {recentReports.map((report) => (
            <div 
              key={report.id}
              className="bg-white border border-border p-4 rounded-2xl flex items-center justify-between group hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  report.status === 'Resolved' ? 'bg-primary-pale text-primary' : 
                  report.status === 'In Progress' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                }`}>
                  {report.status === 'Resolved' ? <CheckCircle2 size={20} /> : <Clock size={20} />}
                </div>
                <div>
                  <h4 className="font-bold text-text text-sm">{report.title}</h4>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="flex items-center gap-1 text-[10px] text-text-light font-medium">
                      <MapPin size={10} /> {report.location}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-text-light font-medium">
                      <Calendar size={10} /> {report.date}
                    </span>
                  </div>
                </div>
              </div>
              <div className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${
                report.status === 'Resolved' ? 'text-primary' : 
                report.status === 'In Progress' ? 'text-blue-600' : 'text-amber-600'
              }`}>
                {report.status}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Info Card */}
      <section className="bg-secondary-pale/50 border border-secondary/10 p-6 rounded-3xl flex items-start gap-4">
        <TrendingUp className="text-secondary shrink-0" size={24} />
        <div className="space-y-1">
          <h4 className="font-bold text-secondary text-sm">Transparency First</h4>
          <p className="text-xs text-text-muted leading-relaxed">
            Your reports are directly linked to the district's performance metrics. Track real-time progress in the statistics panel.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;

