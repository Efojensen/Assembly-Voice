import React, { useState } from 'react';
import { cn } from '../lib/utils';

const Tracking = () => {
  const [code, setCode] = useState('KMA-2026-00347');

  const steps = [
    { name: 'Submitted', date: '2 Apr 2026, 10:14', status: 'done' },
    { name: 'Verified', date: '2 Apr 2026, 14:30', status: 'done' },
    { name: 'Assigned', date: 'Roads Dept. · 3 Apr 2026', status: 'active' },
    { name: 'In progress', date: '', status: 'pending' },
    { name: 'Resolved', date: '', status: 'pending' },
    { name: 'Closed', date: '', status: 'pending' }
  ];

  return (
    <div className="p-5 space-y-6">
      <div className="flex gap-2">
        <input 
          className="flex-grow border-2 border-border rounded-xl px-4 py-3 text-sm font-mono focus:border-secondary outline-none"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button className="bg-secondary text-white px-6 py-3 rounded-xl font-semibold text-sm">
          Track
        </button>
      </div>

      <div className="bg-white border-2 border-primary/20 rounded-xl p-4 space-y-1">
        <h3 className="text-[10px] font-bold text-primary uppercase tracking-widest">Road damage · Adum Main Road</h3>
        <p className="text-xs text-text leading-relaxed">
          Large pothole near Kejetia Market causing vehicles to swerve. High safety risk.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-[11px] font-bold text-primary uppercase tracking-widest">Status pipeline</h2>
        <div className="space-y-0">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4 group">
              <div className="flex flex-col items-center">
                <div className={cn(
                  "w-5 h-5 rounded-full border-2 flex-shrink-0 z-10",
                  step.status === 'done' ? "bg-primary border-primary" : 
                  step.status === 'active' ? "bg-secondary border-secondary" : 
                  "bg-white border-border"
                )} />
                {i < steps.length - 1 && (
                  <div className={cn(
                    "w-[2px] h-10 -my-1",
                    step.status === 'done' ? "bg-primary" : "bg-border"
                  )} />
                )}
              </div>
              <div className="pb-6">
                <div className={cn(
                  "text-sm font-bold",
                  step.status === 'done' ? "text-primary" : 
                  step.status === 'active' ? "text-secondary" : 
                  "text-text-light"
                )}>
                  {step.name} {step.status === 'active' && '← current'}
                </div>
                {step.date && <div className="text-[10px] text-text-light mt-1">{step.date}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tracking;
