import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { MapPin, AlertTriangle, Clock, CheckCircle2 } from 'lucide-react';

const Dashboard = () => {
  const metrics = [
    { label: 'Total open', val: '247', color: 'text' },
    { label: 'Unverified', val: '34', color: 'orange-800' },
    { label: 'In progress', val: '89', color: 'secondary' },
    { label: 'Resolved this month', val: '124', color: 'primary' }
  ];

  const reports = [
    { id: 'KMA-2026-00347', status: 'Assigned', summary: 'Large pothole on Adum Main Road near Kejetia causing vehicles to swerve.', meta: 'Road damage · Severity 4 · 1 day ago · 6 merged reports' },
    { id: 'KMA-2026-00341', status: 'Unverified', summary: 'Overflowing gutter on Bantama High Street causing flooding at entry.', meta: 'Drain blockage · Severity 4 · 3 hours ago' },
    { id: 'KMA-2026-00339', status: 'Resolved', summary: 'Broken streetlight at Asokwa junction — repaired 2 Apr.', meta: 'Streetlight · Severity 2 · 4 days ago' }
  ];

  return (
    <div className="p-5 space-y-6">
      <div className="grid grid-cols-2 gap-3">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white border border-border rounded-xl p-3">
            <div className={cn("text-2xl font-bold", `text-${m.color}`)}>{m.val}</div>
            <div className="text-[10px] text-text-light">{m.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-secondary-pale border-l-4 border-secondary rounded-r-xl p-4 space-y-1">
        <h3 className="text-[10px] font-bold text-secondary uppercase tracking-widest">AI priority queue</h3>
        <p className="text-xs text-text">3 high-severity reports need attention today</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {['All', 'Unverified', 'Road', 'Severity 4+'].map((f, i) => (
          <span key={f} className={cn(
            "text-[10px] px-3 py-1.5 rounded-full border border-border whitespace-nowrap cursor-pointer",
            i === 0 ? "bg-secondary border-secondary text-white" : "bg-white text-text-muted"
          )}>
            {f}
          </span>
        ))}
      </div>

      <div className="space-y-3">
        {reports.map((r) => (
          <Link 
            key={r.id} 
            to={`/officer/report/${r.id}`}
            className="block bg-white border border-border rounded-xl p-4 space-y-2 hover:border-secondary transition-colors"
          >
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono text-text-light">{r.id}</span>
              <span className={cn(
                "text-[10px] font-bold px-2 py-0.5 rounded-full",
                r.status === 'Assigned' ? "bg-secondary-pale text-secondary" :
                r.status === 'Unverified' ? "bg-orange-50 text-orange-800" :
                "bg-primary-pale text-primary"
              )}>
                {r.status}
              </span>
            </div>
            <p className="text-xs text-text leading-relaxed font-medium">{r.summary}</p>
            <p className="text-[10px] text-text-light">{r.meta}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

const ReportDetail = () => {
  return (
    <div className="p-5 space-y-6">
      <div className="flex gap-2">
        <span className="bg-primary-pale text-primary border border-primary text-[10px] font-bold px-3 py-1 rounded-full">
          Road damage
        </span>
        <span className="bg-orange-50 text-orange-800 border border-orange-200 text-[10px] font-bold px-3 py-1 rounded-full">
          Severity 4 / 5
        </span>
      </div>

      <div className="bg-white border-2 border-primary rounded-xl p-4 space-y-2">
        <h3 className="text-[10px] font-bold text-primary uppercase tracking-widest">AI formal summary</h3>
        <p className="text-xs text-text leading-relaxed">
          A large pothole on Adum Main Road near Kejetia Market is causing vehicles to swerve, presenting an immediate safety risk. 6 citizen reports merged.
        </p>
      </div>

      <button className="text-[11px] text-secondary underline underline-offset-2 font-medium">
        Show original citizen text ↓
      </button>

      <div className="space-y-2">
        <h3 className="text-[11px] font-bold text-primary uppercase tracking-widest">AI reasoning</h3>
        <div className="bg-white border border-border rounded-xl p-3 text-[11px] text-text-muted leading-relaxed">
          Severity 4: high pedestrian traffic zone + 6 merged reports + safety risk flag. Suggested dept: Roads & Highways.
        </div>
      </div>

      <div className="bg-primary-pale h-32 rounded-xl border-2 border-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#2D5A27 1px, transparent 1px)', backgroundSize: '15px 15px' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="w-6 h-6 bg-secondary rounded-full rounded-bl-none rotate-45" />
            <div className="w-2 h-2 bg-white rounded-full absolute top-1.5 left-2" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-[11px] font-bold text-primary uppercase tracking-widest">Take action</h3>
        
        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-primary">Assign department</label>
            <select className="w-full border-2 border-border rounded-xl p-3 text-sm outline-none focus:border-secondary">
              <option>Roads & Highways (recommended)</option>
              <option>Drainage & Sanitation</option>
              <option>Electrical Services</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-primary">Update status</label>
            <select className="w-full border-2 border-border rounded-xl p-3 text-sm outline-none focus:border-secondary">
              <option>Assigned</option>
              <option>In progress</option>
              <option>Resolved</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-primary">Officer note (optional)</label>
            <textarea 
              className="w-full border-2 border-border rounded-xl p-3 text-sm outline-none focus:border-secondary min-h-[80px] resize-none"
              placeholder="e.g. Contractor dispatched, works scheduled for 5 Apr..."
            />
          </div>
        </div>

        <button className="w-full py-4 bg-secondary text-white rounded-xl font-semibold hover:bg-secondary/90 transition-colors">
          Save and notify citizen
        </button>
      </div>
    </div>
  );
};

const OfficerPortal = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/report/:id" element={<ReportDetail />} />
    </Routes>
  );
};

export default OfficerPortal;
