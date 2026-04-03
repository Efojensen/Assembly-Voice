import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, Lock, LogIn, UserCircle2, ShieldCheck } from 'lucide-react';

import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';


const SignIn = () => {
  const navigate = useNavigate();

  const selectedAssembly = localStorage.getItem('selectedAssembly') || 'kma';
  const assemblyName = selectedAssembly.toUpperCase();

  // Mock roles for demo purposes if needed
  const handleMockSignIn = (role: 'assembly_member' | 'officer') => {
    localStorage.setItem('userRole', role);
    if (role === 'officer') {
      navigate('/officer');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col p-6">
      <div className="flex-grow flex flex-col justify-center max-w-xs mx-auto w-full space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-text tracking-tight">Welcome to {assemblyName}</h2>
          <p className="text-text-muted text-sm">Sign in to continue to AssemblyVoice</p>
        </div>

        <div className="space-y-4">


          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            {/* <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-bg px-2 text-text-light font-bold tracking-widest">Or Demo Access</span>
            </div> */}
          </div>

          <div className="grid grid-cols-1 gap-3">
            <button 
              onClick={() => handleMockSignIn('assembly_member')}
              className="flex items-center gap-4 bg-primary-pale border-2 border-primary text-primary rounded-2xl p-4 text-left hover:bg-primary/5 transition-colors"
            >
              <div className="bg-primary text-white p-2 rounded-xl">
                <UserCircle2 size={20} />
              </div>
              <div>
                <div className="text-sm font-bold">Assembly Member</div>
                <div className="text-[10px] opacity-70 uppercase tracking-wider">Citizen Access</div>
              </div>
            </button>

            <button 
              onClick={() => handleMockSignIn('officer')}
              className="flex items-center gap-4 bg-secondary-pale border-2 border-secondary text-secondary rounded-2xl p-4 text-left hover:bg-secondary/5 transition-colors"
            >
              <div className="bg-secondary text-white p-2 rounded-xl">
                <ShieldCheck size={20} />
              </div>
              <div>
                <div className="text-sm font-bold">Assembly Officer</div>
                <div className="text-[10px] opacity-70 uppercase tracking-wider">Staff Portal</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <p className="text-center text-[10px] text-text-light mt-8">
        By signing in, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
};

export default SignIn;
