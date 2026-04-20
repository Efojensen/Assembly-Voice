import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle2, ShieldCheck } from 'lucide-react';


const SignIn = () => {
  const navigate = useNavigate();

  const selectedAssembly = localStorage.getItem('selectedAssembly') || 'kma';
  const assemblyName = selectedAssembly.toUpperCase();

  // Mock roles for demo purposes if needed
  const handleMockSignIn = (role: 'assembly_member' | 'officer') => {
    localStorage.setItem('userRole', role);
    navigate('/authenticate')
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col p-6">
      <div className="grow flex flex-col justify-center max-w-md mx-auto w-full space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-text tracking-tight">Welcome to {assemblyName}</h2>
          <p className="text-text-muted text-sm">Sign in to continue to AssemblyVoice</p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            <button
              onClick={() => handleMockSignIn('assembly_member')}
              className="flex items-center gap-4 bg-primary-pale border-2 border-primary text-primary rounded-2xl p-4 text-left hover:bg-primary/5 transition-colors"
            >
              <div className="bg-primary text-white p-2 rounded-xl">
                <UserCircle2 size={20} />
              </div>
              <div>
                <p className="text-sm font-bold">Assembly Member</p>
                <p className="text-[10px] opacity-70 uppercase tracking-wider">Citizen Access</p>
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
                <p className="text-sm font-bold">Assembly Officer</p>
                <p className="text-[10px] opacity-70 uppercase tracking-wider">Staff Portal</p>
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
