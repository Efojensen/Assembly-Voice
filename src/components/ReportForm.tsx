import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Camera,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
  Lightbulb,
  Droplets,
  Trash2,
  Map
} from 'lucide-react';

const categories = [
  { id: 'waste', name: 'Waste Management', icon: Trash2, color: 'text-amber-600', bg: 'bg-amber-50' },
  { id: 'water', name: 'Water & Sanitation', icon: Droplets, color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 'roads', name: 'Roads & Potholes', icon: Map, color: 'text-gray-600', bg: 'bg-gray-50' },
  { id: 'lighting', name: 'Street Lighting', icon: Lightbulb, color: 'text-yellow-600', bg: 'bg-yellow-50' },
  { id: 'other', name: 'Other Issues', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
];

const ReportForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    location: '',
    image: null as string | null,
  });

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = () => {
    // Mock submission
    setStep(5);
    setTimeout(() => navigate('/tracking'), 3000);
  };

  return (
    <div className="min-h-[80vh] flex flex-col">
      {/* Progress Bar */}
      {step < 5 && (
        <div className="flex gap-2 mb-8 px-2">
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i} 
              className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                i <= step ? 'bg-primary' : 'bg-border'
              }`} 
            />
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-text tracking-tight">What's the issue?</h2>
              <p className="text-text-muted font-medium">Select a category that best describes the problem.</p>
            </div>
            <div className="grid gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setFormData({ ...formData, category: cat.id });
                    handleNext();
                  }}
                  className={`flex items-center gap-4 p-5 rounded-3xl border-2 transition-all text-left group ${
                    formData.category === cat.id ? 'border-primary bg-primary-pale' : 'border-border bg-white hover:border-primary/30'
                  }`}
                >
                  <div className={`${cat.bg} ${cat.color} p-3 rounded-2xl group-hover:scale-110 transition-transform`}>
                    <cat.icon size={24} />
                  </div>
                  <span className="font-bold text-text">{cat.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        ) : step === 2 ? (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-text tracking-tight">Tell us more</h2>
              <p className="text-text-muted font-medium">Provide a brief description of the problem.</p>
            </div>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="e.g. The streetlight has been flickering for 3 days..."
              className="w-full h-48 p-6 bg-white border-2 border-border rounded-[2rem] focus:border-primary outline-none transition-all font-medium text-text resize-none"
            />
            <div className="flex gap-3 pt-4">
              <button onClick={handleBack} className="flex-1 h-16 rounded-2xl border-2 border-border font-bold text-text-muted flex items-center justify-center gap-2">
                <ArrowLeft size={20} /> Back
              </button>
              <button 
                onClick={handleNext}
                disabled={!formData.description}
                className="flex-[2] h-16 rounded-2xl bg-primary text-white font-bold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                Next Step <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        ) : step === 3 ? (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-text tracking-tight">Where is it?</h2>
              <p className="text-text-muted font-medium">Help us locate the issue precisely.</p>
            </div>
            <div className="space-y-4">
              <button className="w-full p-6 bg-primary-pale border-2 border-primary/20 rounded-3xl flex items-center gap-4 text-primary font-bold group">
                <div className="bg-primary text-white p-2 rounded-xl group-active:scale-90 transition-transform">
                  <MapPin size={24} />
                </div>
                Use Current Location
              </button>
              <div className="relative">
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Or enter address manually..."
                  className="w-full p-6 bg-white border-2 border-border rounded-3xl focus:border-primary outline-none transition-all font-medium text-text"
                />
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <button onClick={handleBack} className="flex-1 h-16 rounded-2xl border-2 border-border font-bold text-text-muted flex items-center justify-center gap-2">
                <ArrowLeft size={20} /> Back
              </button>
              <button 
                onClick={handleNext}
                disabled={!formData.location}
                className="flex-[2] h-16 rounded-2xl bg-primary text-white font-bold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                Almost Done <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        ) : step === 4 ? (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-text tracking-tight">Add a photo</h2>
              <p className="text-text-muted font-medium">A photo helps our team understand the scale.</p>
            </div>
            <div className="aspect-square w-full bg-white border-4 border-dashed border-border rounded-[3rem] flex flex-col items-center justify-center gap-4 group hover:border-primary/30 transition-colors cursor-pointer overflow-hidden relative">
              {formData.image ? (
                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <>
                  <div className="w-20 h-20 bg-primary-pale text-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Camera size={40} />
                  </div>
                  <p className="text-sm font-bold text-text-muted">Tap to take photo</p>
                </>
              )}
            </div>
            <div className="flex gap-3 pt-4">
              <button onClick={handleBack} className="flex-1 h-16 rounded-2xl border-2 border-border font-bold text-text-muted flex items-center justify-center gap-2">
                <ArrowLeft size={20} /> Back
              </button>
              <button 
                onClick={handleSubmit}
                className="flex-[2] h-16 rounded-2xl bg-secondary text-white font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-secondary/20"
              >
                Submit Report <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-grow flex flex-col items-center justify-center text-center space-y-6"
          >
            <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center text-white shadow-2xl shadow-primary/30 animate-bounce">
              <CheckCircle2 size={64} />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-text tracking-tight">Report Submitted!</h2>
              <p className="text-text-muted font-medium max-w-xs">
                Thank you for your contribution. Your tracking ID is <span className="text-primary font-bold">#AV-90210</span>
              </p>
            </div>
            <p className="text-xs text-text-light animate-pulse">Redirecting to tracking page...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReportForm;
