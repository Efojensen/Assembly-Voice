import React, { useState } from 'react';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft, Camera, MapPin, Check, Info } from 'lucide-react';
import { cn } from '../lib/utils';

// Step Components
const CategoryStep = ({ onNext }: { onNext: (cat: string) => void }) => {
  const categories = [
    { id: 'road', label: 'Road damage', icon: '🛣️' },
    { id: 'drain', label: 'Blocked drain', icon: '🌊' },
    { id: 'light', label: 'Broken streetlight', icon: '💡' },
    { id: 'dumping', label: 'Illegal dumping', icon: '🗑️' },
    { id: 'water', label: 'Water supply', icon: '💧' },
    { id: 'safety', label: 'Safety risk', icon: '⚠️' }
  ];

  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-[11px] font-bold text-primary uppercase tracking-widest">Step 1 — What is the problem?</h2>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelected(cat.id)}
            className={cn(
              "flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all",
              selected === cat.id 
                ? "bg-primary-pale border-primary text-primary" 
                : "bg-white border-border text-text-muted hover:border-primary/30"
            )}
          >
            <span className="text-2xl mb-1">{cat.icon}</span>
            <span className="text-[10px] font-medium leading-tight">{cat.label}</span>
          </button>
        ))}
      </div>

      <button 
        disabled={!selected}
        onClick={() => selected && onNext(selected)}
        className={cn(
          "w-full py-4 rounded-xl font-semibold transition-colors",
          selected ? "bg-secondary text-white" : "bg-border text-text-light cursor-not-allowed"
        )}
      >
        Continue →
      </button>
    </div>
  );
};

const DetailsStep = ({ category, onNext }: { category: string, onNext: (data: any) => void }) => {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-[11px] font-bold text-primary uppercase tracking-widest">Step 2 — Describe the problem</h2>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-primary">What exactly did you see?</label>
          <textarea 
            className="w-full border-2 border-border rounded-xl p-3 text-sm focus:border-secondary outline-none min-h-[100px] resize-none"
            placeholder="e.g. Large pothole on main road near the market, cars swerving to avoid it..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-primary">Add a photo (optional)</label>
          <div className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center gap-2 bg-white cursor-pointer hover:bg-primary-pale/30 transition-colors">
            <Camera className="text-text-light" size={28} />
            <div className="text-xs text-text-light font-medium">Tap to take or upload a photo</div>
            <div className="text-[10px] text-text-light">helps the assembly verify faster</div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-primary">Location</label>
          <div className="flex gap-2">
            <button className="bg-primary text-white text-[11px] font-bold px-3 py-3 rounded-lg flex items-center gap-1 whitespace-nowrap">
              <MapPin size={14} /> Use my location
            </button>
            <div className="flex-grow flex items-center gap-2">
              <span className="text-[10px] text-text-light">or</span>
              <input 
                className="w-full border-2 border-border rounded-lg p-2.5 text-sm focus:border-secondary outline-none"
                placeholder="Type address..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <button 
        disabled={!description}
        onClick={() => onNext({ description, location })}
        className={cn(
          "w-full py-4 rounded-xl font-semibold transition-colors",
          description ? "bg-secondary text-white" : "bg-border text-text-light cursor-not-allowed"
        )}
      >
        Continue →
      </button>
    </div>
  );
};

const ContactStep = ({ onNext }: { onNext: (phone: string) => void }) => {
  const [phone, setPhone] = useState('');

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-[11px] font-bold text-primary uppercase tracking-widest">Step 3 — Get SMS updates (optional)</h2>
        <p className="text-xs text-text-muted leading-relaxed">
          We will send you a text when your report status changes. Your number is never shown publicly.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-primary">Mobile number (optional)</label>
          <input 
            className="w-full border-2 border-border rounded-xl p-3 text-sm focus:border-secondary outline-none"
            placeholder="+233 __ ___ ____"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="bg-bg border border-border rounded-xl p-3 flex gap-3">
          <Info className="text-text-muted shrink-0" size={18} />
          <p className="text-[11px] text-text-muted leading-relaxed">
            You can also report completely anonymously — no phone number needed.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <button 
          onClick={() => onNext(phone)}
          className="w-full py-4 bg-secondary text-white rounded-xl font-semibold hover:bg-secondary/90 transition-colors"
        >
          Review and submit
        </button>
        <button 
          onClick={() => onNext('')}
          className="w-full py-3 bg-transparent text-secondary border-2 border-secondary rounded-xl font-semibold hover:bg-secondary/5 transition-colors"
        >
          Skip — submit anonymously
        </button>
      </div>
    </div>
  );
};

const ReviewStep = ({ data, onConfirm }: { data: any, onConfirm: () => void }) => {
  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <span className="bg-primary-pale text-primary border border-primary text-[10px] font-bold px-3 py-1 rounded-full">
          {data.category}
        </span>
        <span className="bg-orange-50 text-orange-800 border border-orange-200 text-[10px] font-bold px-3 py-1 rounded-full">
          Urgency 4 / 5
        </span>
      </div>

      <div className="bg-white border-2 border-primary rounded-xl p-4 space-y-2">
        <h3 className="text-[10px] font-bold text-primary uppercase tracking-widest">Claude AI understood your report as:</h3>
        <p className="text-xs text-text leading-relaxed">
          A large pothole on Adum Main Road near Kejetia Market is causing vehicles to swerve. Immediate safety risk to road users. GPS coordinates confirmed.
        </p>
      </div>

      <button className="text-[11px] text-secondary underline underline-offset-2 font-medium">
        Show original text ↓
      </button>

      <div className="bg-primary-pale h-32 rounded-xl border-2 border-primary relative overflow-hidden">
        {/* Map Placeholder */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#2D5A27 1px, transparent 1px)', backgroundSize: '15px 15px' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="w-6 h-6 bg-secondary rounded-full rounded-bl-none rotate-45" />
            <div className="w-2 h-2 bg-white rounded-full absolute top-1.5 left-2" />
          </div>
        </div>
      </div>

      <button 
        onClick={onConfirm}
        className="w-full py-4 bg-secondary text-white rounded-xl font-semibold hover:bg-secondary/90 transition-colors"
      >
        Confirm and submit
      </button>
    </div>
  );
};

const SuccessStep = ({ trackingCode }: { trackingCode: string }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 text-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-16 h-16 rounded-full bg-primary-pale border-2 border-primary flex items-center justify-center text-primary">
          <Check size={32} />
        </div>
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-text">Report submitted!</h2>
          <p className="text-xs text-text-muted">Kumasi Metropolitan Assembly has received your report.</p>
        </div>
      </div>

      <div className="bg-primary rounded-2xl p-5 text-white space-y-2">
        <div className="text-[11px] text-white/70">Your tracking code</div>
        <div className="text-2xl font-mono font-bold tracking-widest">{trackingCode}</div>
        <button className="text-[11px] text-white/70 underline">Tap to copy</button>
      </div>

      <div className="bg-white border-2 border-border rounded-xl p-4 flex items-center justify-between">
        <span className="text-xs text-text-muted text-left flex-grow mr-4">Send me SMS updates when status changes</span>
        <div className="w-10 h-5 bg-secondary rounded-full relative cursor-pointer">
          <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5" />
        </div>
      </div>

      <div className="text-left space-y-3">
        <h3 className="text-xs font-bold text-primary">What happens next</h3>
        <ol className="text-[11px] text-text-muted space-y-2 list-decimal list-inside">
          <li>Assembly verifies the issue exists</li>
          <li>Assigned to the right department</li>
          <li>Work begins — you'll be notified</li>
        </ol>
      </div>

      <div className="space-y-3">
        <button 
          onClick={() => navigate('/tracking')}
          className="w-full py-4 bg-secondary text-white rounded-xl font-semibold hover:bg-secondary/90 transition-colors"
        >
          Track my report →
        </button>
        <button 
          onClick={() => navigate('/')}
          className="w-full py-3 bg-transparent text-primary border-2 border-primary rounded-xl font-semibold hover:bg-primary/5 transition-colors"
        >
          Report another problem
        </button>
      </div>
    </div>
  );
};

const ReportForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    location: '',
    phone: '',
    trackingCode: 'KMA-2026-00347'
  });

  const handleNext = (data: any) => {
    setFormData(prev => ({ ...prev, ...data }));
    setStep(prev => prev + 1);
  };

  return (
    <div className="p-5 space-y-6">
      {step < 5 && (
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <div 
              key={s} 
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                s === step ? "w-6 bg-secondary" : s < step ? "w-2 bg-primary" : "w-2 bg-border"
              )}
            />
          ))}
        </div>
      )}

      {step === 1 && <CategoryStep onNext={(cat) => handleNext({ category: cat })} />}
      {step === 2 && <DetailsStep category={formData.category} onNext={handleNext} />}
      {step === 3 && <ContactStep onNext={(phone) => handleNext({ phone })} />}
      {step === 4 && <ReviewStep data={formData} onConfirm={() => setStep(5)} />}
      {step === 5 && <SuccessStep trackingCode={formData.trackingCode} />}
    </div>
  );
};

export default ReportForm;
