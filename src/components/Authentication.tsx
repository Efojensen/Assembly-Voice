import { useState } from 'react';
import { motion } from 'motion/react';
import { auth, db } from '../firebase';
import { Building2 } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Authenticate = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const userRole = localStorage.getItem('userRole');
  const selectedAssembly = localStorage.getItem('selectedAssembly') || 'kma';

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDoc = await getDoc(doc(db, 'users', user.uid));

      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          displayName: user.displayName,
          role: userRole,
          districtId: selectedAssembly,
          createdAt: new Date().toISOString()
        });
        navigate('/');
      } else {
        const userData = userDoc.data();
        navigate(userData.role === 'officer' ? '/officer' : '/');
      }
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-6">
      <div className="w-full max-w-sm flex flex-col gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-20 h-20 bg-gray-600 mx-auto rounded-3xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/30"
        >
          <Building2 className="text-white" size={40} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-2 mb-10 bg-linear-to-br from-green-700 to-green-200 p-1.5 rounded-2xl"
        >
          <h1 className="text-3xl font-bold text-white tracking-tight">AssemblyVoice</h1>
          <p className="text-white/70 text-sm max-w-60 mx-auto">
            Connecting citizens with local government for a better community.
          </p>
        </motion.div>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-white border-2 border-border rounded-2xl py-4 px-4 text-sm font-medium text-text focus:outline-none focus:ring-2 focus:ring-primary"
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-white border-2 border-border rounded-2xl py-4 px-4 text-sm font-medium text-text focus:outline-none focus:ring-2 focus:ring-primary"
        />

        {/* Email Sign-in Button */}
        <button
          className="w-full bg-primary text-white rounded-2xl py-4 font-semibold hover:bg-primary/90 transition-colors"
        >
          Continue with Email
        </button>

        {/* Divider */}
        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-bg px-2 text-text-light font-bold tracking-widest">Or</span>
          </div>
        </div>

        {/* Google Button */}
        <button
          disabled={loading}
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 bg-white border-2 border-border rounded-2xl py-4 font-semibold text-text hover:bg-bg transition-colors cursor-pointer"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          {loading ? 'Signing in...' : 'Continue with Google'}
        </button>
      </div>
    </div>
  );
}

export default Authenticate;