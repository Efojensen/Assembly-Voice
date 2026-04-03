import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, ArrowRight, ShieldCheck, UserCircle2, Apple, Globe, CheckCircle2, AlertCircle } from 'lucide-react';
import { auth, db } from '../firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const Authenticate = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'selection' | 'role' | 'signin'>('selection');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAssembly, setSelectedAssembly] = useState<string>(localStorage.getItem('selectedAssembly') || '');
  const [selectedRole, setSelectedRole] = useState<'assembly_member' | 'officer'>('assembly_member');

  const assemblies = [
    { id: 'kma', name: 'Kumasi Metropolitan', region: 'Ashanti' },
    { id: 'ama', name: 'Accra Metropolitan', region: 'Greater Accra' },
    { id: 'tma', name: 'Tamale Metropolitan', region: 'Northern' }
  ];

  const handleAssemblySelect = (id: string) => {
    setSelectedAssembly(id);
    localStorage.setItem('selectedAssembly', id);
    setStep('role');
  };

  const handleRoleSelect = (role: 'assembly_member' | 'officer') => {
    setSelectedRole(role);
    setStep('signin');
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDoc = await getDoc(doc(db, 'users', user.uid));

      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          displayName: user.displayName,
          role: selectedRole,
          districtId: selectedAssembly,
          createdAt: new Date().toISOString()
        });
      }

      const roleToUse = userDoc.exists() ? userDoc.data().role : selectedRole;
      localStorage.setItem('userRole', roleToUse);
      navigate(roleToUse === 'officer' ? '/officer' : '/');
    } catch (err: any) {
      console.error('Sign in error:', err);
      if (err.code === 'auth/unauthorized-domain') {
        setError('This domain is not authorized. Please use the "Quick Access" buttons below for testing.');
      } else {
        setError(err.message || 'An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleMockSignIn = (role: 'assembly_member' | 'officer') => {
    localStorage.setItem('userRole', role);
    localStorage.setItem('selectedAssembly', selectedAssembly || 'kma');
    navigate(role === 'officer' ? '/officer' : '/');
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-primary/20" />
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />

      <AnimatePresence mode="wait">
        {step === 'selection' ? (
          <motion.div
            key="selection"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-md space-y-8"
          >
            <div className="text-center space-y-4">
              <div className="inline-flex p-4 bg-primary rounded-3xl shadow-xl shadow-primary/20 mb-2">
                <Building2 className="text-white" size={40} />
              </div>
              <div className="space-y-2">
                <h1 className="text-4xl font-black text-text tracking-tight">AssemblyVoice</h1>
                <p className="text-text-muted font-medium">Select your Metropolitan Assembly to begin</p>
              </div>
            </div>

            <div className="grid gap-3">
              {assemblies.map((assembly) => (
                <button
                  key={assembly.id}
                  onClick={() => handleAssemblySelect(assembly.id)}
                  className="group relative w-full bg-white border border-border rounded-2xl p-5 text-left transition-all hover:border-primary/50 hover:shadow-lg active:scale-[0.98]"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-text group-hover:text-primary transition-colors">{assembly.name}</h3>
                      <p className="text-xs text-text-light font-medium uppercase tracking-widest mt-1">{assembly.region} Region</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-primary-pale flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-8 flex items-center justify-center gap-6 opacity-40 grayscale">
              <Globe size={24} />
              <ShieldCheck size={24} />
              <CheckCircle2 size={24} />
            </div>
          </motion.div>
        ) : step === 'role' ? (
          <motion.div
            key="role"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-md space-y-8"
          >
            <div className="text-center space-y-4">
              <button 
                onClick={() => setStep('selection')}
                className="text-primary font-bold text-xs uppercase tracking-widest hover:underline"
              >
                ← Change Assembly
              </button>
              <h2 className="text-3xl font-black text-text tracking-tight">Who are you?</h2>
              <p className="text-text-muted font-medium">Choose your role in <span className="text-primary font-bold">{selectedAssembly.toUpperCase()}</span></p>
            </div>

            <div className="grid gap-4">
              <button 
                onClick={() => handleRoleSelect('assembly_member')}
                className="flex items-center gap-5 bg-white border border-border rounded-3xl p-6 hover:border-primary/50 hover:shadow-xl transition-all group text-left"
              >
                <div className="bg-primary-pale text-primary p-4 rounded-2xl group-hover:scale-110 transition-transform">
                  <UserCircle2 size={32} />
                </div>
                <div>
                  <h3 className="font-bold text-text text-lg">Assembly Member</h3>
                  <p className="text-sm text-text-light">Report issues and track community progress</p>
                </div>
              </button>

              <button 
                onClick={() => handleRoleSelect('officer')}
                className="flex items-center gap-5 bg-white border border-border rounded-3xl p-6 hover:border-secondary/50 hover:shadow-xl transition-all group text-left"
              >
                <div className="bg-secondary-pale text-secondary p-4 rounded-2xl group-hover:scale-110 transition-transform">
                  <ShieldCheck size={32} />
                </div>
                <div>
                  <h3 className="font-bold text-text text-lg">Assembly Officer</h3>
                  <p className="text-sm text-text-light">Review reports and manage district operations</p>
                </div>
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="signin"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md space-y-8"
          >
            <div className="text-center space-y-4">
              <div className="inline-flex p-3 bg-primary/10 text-primary rounded-2xl mb-2">
                <Building2 size={32} />
              </div>
              <h2 className="text-3xl font-black text-text tracking-tight">Secure Access</h2>
              <p className="text-text-muted font-medium">
                Signing in as <span className="text-primary font-bold">{selectedRole === 'officer' ? 'Officer' : 'Member'}</span>
              </p>
            </div>

            <div className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex gap-3 items-start animate-shake">
                  <AlertCircle className="text-red-500 shrink-0" size={20} />
                  <p className="text-xs text-red-700 font-medium leading-relaxed">{error}</p>
                </div>
              )}

              <button 
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full h-14 flex items-center justify-center gap-3 bg-white border border-border rounded-2xl font-bold text-text hover:bg-gray-50 transition-all active:scale-[0.98] shadow-sm"
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                {loading ? 'Connecting...' : 'Continue with Google'}
              </button>

              <button 
                disabled
                className="w-full h-14 flex items-center justify-center gap-3 bg-black text-white rounded-2xl font-bold opacity-50 cursor-not-allowed"
              >
                <Apple size={20} className="fill-current" />
                Continue with Apple
              </button>
            </div>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-black tracking-[0.2em] text-text-light">
                <span className="bg-bg px-4">Developer Access</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => handleMockSignIn('assembly_member')}
                className="p-4 bg-primary/5 border border-primary/10 rounded-2xl flex flex-col items-center gap-2 hover:bg-primary/10 transition-colors group"
              >
                <UserCircle2 className="text-primary group-hover:scale-110 transition-transform" size={24} />
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Member Login</span>
              </button>
              <button
                onClick={() => handleMockSignIn('officer')}
                className="p-4 bg-secondary/5 border border-secondary/10 rounded-2xl flex flex-col items-center gap-2 hover:bg-secondary/10 transition-colors group"
              >
                <ShieldCheck className="text-secondary group-hover:scale-110 transition-transform" size={24} />
                <span className="text-[10px] font-black uppercase tracking-widest text-secondary">Officer Login</span>
              </button>
            </div>

            <p className="text-center text-[10px] text-text-light font-bold uppercase tracking-widest leading-relaxed">
              By continuing, you agree to the <br />
              <span className="text-primary hover:underline cursor-pointer">Digital Governance Framework</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Authenticate;
