import './Signup.css';

const Signup: React.FC = () => {
  return (
    <main>
      <div className="signup-container">
        <h1>Sign Up</h1>
        <form>
          <input type="text" placeholder="First Name" required />
          <input type="text" placeholder="Last Name" required />
          <input type="email" placeholder="Email" required />
          <div className="password-field">
            <input type="password" placeholder="Password" required />
            <span className="eye-icon">👁️</span>
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <a href="#">Log In</a>
        </p>
      </div>
    </main>
  );
}

export default Signup;
