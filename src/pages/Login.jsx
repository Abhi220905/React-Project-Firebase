import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase';
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut,
  onAuthStateChanged 
} from 'firebase/auth';

function Login() {
  const navigate = useNavigate();
  
  const signup = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('User signed in:', result.user);
        alert("Signed in successfully!");
        navigate('/'); 
      })
      .catch(err => {
        console.error('Sign in error:', err);
        alert("Sign in failed. Please try again.");
      });
  }

  useEffect(() => {
   
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {

        console.log('User is logged in:', user);
      }
    });

    return () => unsubscribe(); 
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h2 className="card-title mb-4">Welcome</h2>
              <p className="card-text mb-4">
                Sign in to access your account
              </p>
              

              {auth.currentUser ? (
                <div>
                  <p className="mb-3">
                    Welcome, {auth.currentUser.displayName || auth.currentUser.email}!
                  </p>
                  <button 
                    onClick={logout} 
                    className="btn btn-outline-danger btn-lg w-100"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div>
                  <button 
                    onClick={signup} 
                    className="btn btn-primary btn-lg w-100 mb-3"
                  >
                    <i className="fab fa-google me-2"></i>
                    Sign In With Google
                  </button>
                  <p className="text-muted small">
                    By continuing, you agree to our Terms of Service
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;