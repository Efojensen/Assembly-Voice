import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Building2, ArrowRight } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();
  const assemblies = [
    { id: 'kma', name: 'Kumasi Metropolitan Assembly (KMA)' },
    { id: 'ama', name: 'Accra Metropolitan Assembly (AMA)' },
    { id: 'tma', name: 'Tamale Metropolitan Assembly (TMA)' }
  ];

  const handleSelect = (id: string) => {
    localStorage.setItem('selectedAssembly', id);
    navigate('/signin');
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-6 text-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/30"
      >
        <Building2 className="text-white" size={40} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-2 mb-10"
      >
        <h1 className="text-3xl font-bold text-white tracking-tight">AssemblyVoice</h1>
        <p className="text-white/70 text-sm max-w-[240px] mx-auto">
          Connecting citizens with local government for a better community.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-xs space-y-4"
      >
        <p className="text-white/60 text-[11px] font-bold uppercase tracking-widest">Select your assembly</p>
        <div className="space-y-3">
          {assemblies.map((assembly) => (
            <button
              key={assembly.id}
              onClick={() => handleSelect(assembly.id)}
              className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-2xl py-4 px-6 text-left flex items-center justify-between group transition-all backdrop-blur-sm"
            >
              <span className="text-sm font-medium">{assembly.name}</span>
              <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-white/40 text-[10px] uppercase tracking-tighter"
      >
        Empowering Local Governance
      </motion.p>
    </div>
  );
};

export default Welcome;