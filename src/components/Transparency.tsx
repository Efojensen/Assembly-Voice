import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  BarChart3,
  Users,
  CheckCircle2,
  Clock,
  TrendingUp,
  AlertTriangle,
  ChevronRight,
  Search,
  Globe,
  ArrowRight,
  MapPin
} from 'lucide-react';

const Transparency = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('Kumasi Metropolitan Assembly (KMA)');

  const metrics = [
    { label: 'Reports Submitted', val: '1,284', icon: BarChart3, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Resolved Issues', val: '842', icon: CheckCircle2, color: 'text-primary', bg: 'bg-primary-pale' },
    { label: 'Active Citizens', val: '3,412', icon: Users, color: 'text-secondary', bg: 'bg-secondary-pale' },
    { label: 'Avg. Response', val: '2.4d', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const topIssues = [
    {
      id: '1',
      title: 'Collapsed Drainage',
      location: 'Suame Roundabout',
      reports: 48,
      severity: 'Critical',
      status: 'Open',
      trend: '+12% this week'
    },
    {
      id: '2',
      title: 'Major Potholes',
      location: 'Nhyiaeso Road',
      reports: 32,
      severity: 'High',
      status: 'In Progress',
      trend: 'Stable'
    },
    {
      id: '3',
      title: 'Streetlight Failure',
      location: 'Asokwa Junction',
      reports: 24,
      severity: 'Medium',
      status: 'Open',
      trend: '-5% this week'
    },
  ];

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <section className="space-y-2">
        <div className="flex items-center gap-2 text-secondary font-black text-[10px] uppercase tracking-widest">
          <Globe size={14} /> Public Dashboard
        </div>
        <h1 className="text-3xl font-black text-text tracking-tight">District <span className="text-primary">Transparency</span></h1>
        <p className="text-text-muted font-medium">Real-time accountability for community progress.</p>
      </section>

      {/* District Selector */}
      <section className="bg-white border-2 border-border rounded-3xl p-2">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light" size={18} />
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full h-14 pl-12 pr-4 bg-transparent outline-none font-bold text-text appearance-none"
          >
            <option>Kumasi Metropolitan Assembly (KMA)</option>
            <option>Accra Metropolitan Assembly (AMA)</option>
            <option>Tamale Metropolitan Assembly (TMA)</option>
          </select>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="grid grid-cols-2 gap-3">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white border border-border rounded-[2rem] p-5 space-y-3"
          >
            <div className={`${m.bg} ${m.color} w-10 h-10 rounded-xl flex items-center justify-center`}>
              <m.icon size={20} />
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-black text-text tracking-tight">{m.val}</div>
              <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{m.label}</div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Performance Chart Placeholder */}
      <section className="bg-primary text-white rounded-[2.5rem] p-8 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <TrendingUp size={120} />
        </div>
        <div className="space-y-2 relative z-10">
          <h3 className="text-xl font-black tracking-tight">Resolution Performance</h3>
          <p className="text-white/70 text-sm font-medium">District efficiency has increased by <span className="text-white font-bold">14%</span> this month.</p>
        </div>
        <div className="flex items-end gap-2 h-32 relative z-10">
          {[40, 65, 45, 90, 75, 85, 100].map((h, i) => (
            <div key={i} className="flex-1 bg-white/20 rounded-t-lg hover:bg-secondary transition-colors" style={{ height: `${h}%` }} />
          ))}
        </div>
      </section>

      {/* Top Issues */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="font-black text-text uppercase tracking-widest text-xs">Priority Issues</h3>
          <button className="text-secondary font-bold text-xs flex items-center gap-1">
            View Map <ArrowRight size={14} />
          </button>
        </div>

        <div className="space-y-3">
          {topIssues.map((issue) => (
            <div key={issue.id} className="bg-white border border-border rounded-3xl p-5 hover:border-primary/30 transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-text">{issue.title}</h4>
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                      issue.severity === 'Critical' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {issue.severity}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-text-muted uppercase tracking-widest">
                    <MapPin size={12} className="text-secondary" />
                    {issue.location}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-text">{issue.reports}</div>
                  <div className="text-[9px] font-bold text-text-light uppercase tracking-widest">Reports</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  <span className="text-[10px] font-black text-secondary uppercase tracking-widest">{issue.status}</span>
                </div>
                <span className="text-[10px] font-bold text-primary italic">{issue.trend}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Info */}
      <section className="text-center px-8 space-y-2">
        <p className="text-[10px] font-bold text-text-light uppercase tracking-widest">Data updated every 15 minutes</p>
        <p className="text-[10px] text-text-muted leading-relaxed">
          This dashboard is powered by <span className="text-secondary font-bold">Assembly Voice AI</span> to ensure unbiased reporting and accountability.
        </p>
      </section>
    </div>
  );
};

export default Transparency;
