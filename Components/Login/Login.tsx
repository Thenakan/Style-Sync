import { useState } from 'react';
import Link from 'next/link';
import './Login.css';   

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <section>
      <div className="login-container">
        <h1>Log In</h1>
        <form>
          <input type="text" placeholder="UserName" required />
          <input type="email" placeholder="Email" required />
          <div className="password-field">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              required
            />
            <span
              className="eye-icon"
              onClick={togglePasswordVisibility}
              style={{ cursor: 'pointer' }}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>
          <button type="submit">Log In</button>
        </form>
        <p>
          <Link href="/forgot-password">Forgot Password?</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
