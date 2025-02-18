'use client'; // Add this directive at the top

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isClient, setIsClient] = useState(false); // Track if we're on the client side
  const router = useRouter();

  useEffect(() => {
    // This ensures that we are only using localStorage on the client side
    setIsClient(true);
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = { email, password };

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);

        // Store user data, including role, in localStorage only on the client side
        if (isClient) {
          localStorage.setItem('user', JSON.stringify(result.user));
        }

        // Redirect to Profile page (or Dashboard if admin)
        if (result.user.role === 'admin') {
          router.push('/');
        } else {
          router.push('/');
        }
      } else {
        toast.error(result.message);
      }
    } catch (error: any) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <section>
      <div className="login-container">
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="password-field">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="eye-icon"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>
          <button type="submit">Log In</button>
        </form>
        <p>
          <a href="/forgot-password">Forgot Password?</a>
        </p>
        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </section>
  );
};

export default Login;
