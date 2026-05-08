import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Hotel, User, Lock } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/login',
        { username, password }
      );

      const { token, role, customerId, staffId, name } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      if (name) {
        localStorage.setItem('userName', name);
        window.dispatchEvent(new Event('storage-update'));
      }

      if (customerId) localStorage.setItem('customerId', customerId);
      if (staffId) localStorage.setItem('staffId', staffId);

      const redirect = localStorage.getItem('redirectAfterLogin');

      if (redirect) {
        localStorage.removeItem('redirectAfterLogin');
        navigate(redirect);
        return;
      }

      if (role === 'ADMIN') navigate('/admin');
      else if (role === 'STAFF') navigate('/staff');
      else navigate('/customer');

    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data ||
        'Invalid credentials. Please try again.'
      );
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{
        background:
          'linear-gradient(135deg, #020617 0%, #081028 40%, #111c3d 100%)'
      }}
    >

      {/* LOGIN CARD */}
      <div
        className="w-full max-w-lg"
        style={{
          background: 'rgba(15, 23, 42, 0.92)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '24px',
          padding: '52px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
          backdropFilter: 'blur(18px)'
        }}
      >

        {/* ICON */}
        <div className="flex justify-center mb-5">
          <div
            style={{
              background: 'rgba(99,102,241,0.15)',
              padding: '16px',
              borderRadius: '18px'
            }}
          >
            <Hotel size={42} color="#6366f1" />
          </div>
        </div>

        {/* TITLE */}
        <h1
          style={{
            textAlign: 'center',
            fontSize: '2.2rem',
            fontWeight: '700',
            color: 'white',
            marginBottom: '10px'
          }}
        >
          Welcome Back
        </h1>

        <p
          style={{
            textAlign: 'center',
            color: '#94a3b8',
            marginBottom: '34px',
            fontSize: '15px'
          }}
        >
          Sign in to continue your luxury experience.
        </p>

        {/* ERROR */}
        {error && (
          <div
            style={{
              background: 'rgba(239,68,68,0.12)',
              border: '1px solid rgba(239,68,68,0.3)',
              color: '#ef4444',
              padding: '12px',
              borderRadius: '10px',
              marginBottom: '18px',
              fontSize: '14px'
            }}
          >
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleLogin} className="flex flex-col gap-5">

          {/* USERNAME */}
          <div>
            <label
              style={{
                color: '#e2e8f0',
                marginBottom: '8px',
                display: 'block',
                fontWeight: '500'
              }}
            >
              Username
            </label>

            <div style={{ position: 'relative' }}>
              <User
                size={18}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#94a3b8'
                }}
              />

              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{
                  width: '100%',
                  background: '#0f172a',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '12px',
                  padding: '14px 14px 14px 44px',
                  color: 'white',
                  outline: 'none',
                  fontSize: '15px'
                }}
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label
              style={{
                color: '#e2e8f0',
                marginBottom: '8px',
                display: 'block',
                fontWeight: '500'
              }}
            >
              Password
            </label>

            <div style={{ position: 'relative' }}>
              <Lock
                size={18}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#94a3b8'
                }}
              />

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  background: '#0f172a',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '12px',
                  padding: '14px 14px 14px 44px',
                  color: 'white',
                  outline: 'none',
                  fontSize: '15px'
                }}
              />
            </div>
          </div>

          {/* BUTTON */}
          <button
          onMouseEnter={(e) =>
  (e.target.style.transform = 'translateY(-2px)')
}
onMouseLeave={(e) =>
  (e.target.style.transform = 'translateY(0px)')
}
            type="submit"
            style={{
  width: '100%',
  marginTop: '10px',
  background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
  border: 'none',
  padding: '14px',
  borderRadius: '12px',
  color: 'white',
  fontWeight: '600',
  fontSize: '15px',
  cursor: 'pointer',
  transition: '0.3s ease',
  boxShadow: '0 10px 25px rgba(124,58,237,0.35)'
}}
          >
            Sign In
            
          </button>
        </form>

        {/* FOOTER */}
        <div
          style={{
            textAlign: 'center',
            marginTop: '24px',
            color: '#94a3b8',
            fontSize: '14px'
          }}
        >
          <p style={{ marginBottom: '10px' }}>
            Don&apos;t have an account?{' '}
            <Link
              to="/register"
              style={{
                color: '#818cf8',
                fontWeight: '600',
                textDecoration: 'none'
              }}
            >
              Register here
            </Link>
          </p>

          <Link
            to="/home"
            style={{
              color: '#818cf8',
              textDecoration: 'none'
            }}
          >
            ← Back to Website
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;