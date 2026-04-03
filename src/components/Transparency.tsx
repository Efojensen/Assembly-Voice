import React from 'react';
import { cn } from '../lib/utils';

const Transparency = () => {
  const metrics = [
    { label: 'Reports submitted', val: '489', color: 'text' },
    { label: 'Resolved', val: '312', color: 'primary' },
    { label: 'Avg resolution time', val: '4.2 days', color: 'text' },
    { label: 'Performance score', val: '74%', color: 'secondary' }
  ];

  return (
    <div className="p-5 space-y-6">
      <div className="space-y-1">
        <h2 className="text-[11px] font-bold text-primary uppercase tracking-widest">Public accountability dashboard</h2>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold text-primary">Select your district</label>
        <select className="w-full border-2 border-border rounded-xl p-3 text-sm outline-none focus:border-secondary">
          <option>Kumasi Metropolitan Assembly (KMA)</option>
          <option>Accra Metropolitan Assembly</option>
          <option>Tamale Metropolitan Assembly</option>
        </select>
        <p className="text-[10px] text-text-light">April 2026 · publicly visible · no login required</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white border border-border rounded-xl p-3">
            <div className={cn("text-2xl font-bold", m.color === 'primary' ? 'text-primary' : m.color === 'secondary' ? 'text-secondary' : 'text-text')}>
              {m.val}
            </div>
            <div className="text-[10px] text-text-light">{m.label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-[11px] font-bold text-primary uppercase tracking-widest">Top unresolved issues</h2>
        
        <div className="space-y-3">
          {[
            { rank: '#1 most reported', time: 'Open · 18 days', summary: 'Collapsed drainage channel, Suame roundabout — flooding risk.', meta: 'Drain · Severity 5 · 34 reports' },
            { rank: '#2 most reported', time: 'Open · 12 days', summary: 'Potholes along Nhyiaeso Road — multiple reports of vehicle damage.', meta: 'Road · Severity 4 · 22 reports' }
          ].map((item, i) => (
            <div key={i} className="bg-white border border-border rounded-xl p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-secondary uppercase">{item.rank}</span>
                <span className="text-[10px] font-bold bg-orange-50 text-orange-800 px-2 py-0.5 rounded-full">{item.time}</span>
              </div>
              <p className="text-xs text-text leading-relaxed font-medium">{item.summary}</p>
              <p className="text-[10px] text-text-light">{item.meta}</p>
            </div>
          ))}
        </div>
      </div>

      <button className="w-full py-4 bg-secondary text-white rounded-xl font-semibold hover:bg-secondary/90 transition-colors">
        View live problem map →
      </button>
    </div>
  );
};

export default Transparency;
