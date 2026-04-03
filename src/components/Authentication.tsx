import { useState } from 'react';
import { auth, db } from '../firebase';
import { useNavigate } from "react-router-dom";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Authenticate = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const selectedAssembly = localStorage.getItem('selectedAssembly') || 'kma';


    const handleGoogleSignIn = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user exists in Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));

      if (!userDoc.exists()) {
        // Default to Assembly Member (Citizen)
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          displayName: user.displayName,
          role: 'assembly_member',
          districtId: selectedAssembly,
          createdAt: new Date().toISOString()
        });
        navigate('/');
      } else {
        const userData = userDoc.data();
        if (userData.role === 'officer') {
          navigate('/officer');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-border rounded-2xl py-4 font-semibold text-text hover:bg-bg transition-colors"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            {loading ? 'Signing in...' : 'Continue with Google'}
          </button>
  );
}

export default Authenticate;