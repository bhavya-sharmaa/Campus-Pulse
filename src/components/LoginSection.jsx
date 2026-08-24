import { useState } from 'react';

export default function LoginSection({
  email,
  setEmail,
  password,
  setPassword,
  loginError,
  handleLogin,
  rememberMe,
  setRememberMe
}) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [department, setDepartment] = useState('cse');
  const [year, setYear] = useState('1');
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !rollNumber || !email || !password) {
      alert('Please fill out all required fields.');
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    if (existingUsers.some(u => u.email === email)) {
      alert('This email is already registered!');
      return;
    }

    const newUser = { fullName, rollNumber, department, year, email, password };
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));
    
    // Simulate successful registration
    setSignUpSuccess(true);
    setTimeout(() => {
      setSignUpSuccess(false);
      setIsSignUp(false);
    }, 2000);
  };


  return (
    <div className="login-container">
      <div className="login-background-overlay-text">
        <h1 className="login-bg-title">CHITKARA UNIVERSITY</h1>
        <p className="login-bg-subtitle">CAMPUS INTEGRATED DIRECTORY & TIMETABLE PORTAL</p>
      </div>

      <div className="glass-card login-card">
        <div className="login-header">
          <div className="login-badge">
            <span className="badge-spark">✨</span> Campus Guide & Directory
          </div>
          <h2 className="login-title">{isSignUp ? 'Create Account' : 'Welcome back'}</h2>
          <p className="login-subtitle">
            {isSignUp ? 'Join our community network to access academic schedules and map directions.' : 'Sign in to access class timetables, academic blocks, and curfew timings.'}
          </p>
        </div>

        <div className="login-tabs">
          <button
            type="button"
            className={`login-tab-btn ${!isSignUp ? 'active' : ''}`}
            onClick={() => setIsSignUp(false)}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            Sign In
          </button>
          <button
            type="button"
            className={`login-tab-btn ${isSignUp ? 'active' : ''}`}
            onClick={() => setIsSignUp(true)}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <line x1="20" y1="8" x2="20" y2="14"></line>
              <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
            Sign Up
          </button>
        </div>

        {isSignUp ? (
          signUpSuccess ? (
            <div className="login-error-alert" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.3)', color: '#10b981', textAlign: 'center', margin: '1rem 0' }}>
              ✓ Account created successfully! Redirecting to login...
            </div>
          ) : (
            <form onSubmit={handleSignUpSubmit} className="login-form">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Roll Number</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="221099XXXX"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Department</label>
                  <select
                    className="form-input"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    style={{ background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', outline: 'none' }}
                  >
                    <option value="cse">CSE</option>
                    <option value="aiml">AIML</option>
                    <option value="bca">BCA</option>
                    <option value="eletic">Electric</option>
                    <option value="mba">MBA</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Year</label>
                  <select
                    className="form-input"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    style={{ background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', outline: 'none' }}
                  >
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">University Email</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="student@chitkara.edu.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Account Password</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn-submit login-submit-btn">
                Register Account →
              </button>
            </form>
          )
        ) : (
          <form onSubmit={handleLogin} className="login-form">
            {loginError && (
              <div className="login-error-alert">
                ⚠ {loginError}
              </div>
            )}
            
            <div className="form-group">
              <label className="form-label">University Email</label>
              <input
                type="email"
                className="form-input"
                placeholder="student@chitkara.edu.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Account Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="login-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Keep me signed in
              </label>
              <a href="#" className="forgot-password" onClick={(e) => { e.preventDefault(); alert('Password recovery coming soon!'); }}>
                Forgot password?
              </a>
            </div>

            <button type="submit" className="btn-submit login-submit-btn">
              Access Dashboard →
            </button>
          </form>
        )}

        <div className="demo-credentials-box">
          {isSignUp ? (
            <div className="demo-note">
              <strong>💡 Quick Sign Up Note:</strong>
              <p>Use your university email address. You will be able to log in instantly after registration.</p>
            </div>
          ) : (
            <>
              <div className="demo-credentials-header">
                <strong>🔑 Demo Account Credentials</strong>
                <button
                  type="button"
                  className="quick-autofill-btn"
                  onClick={() => {
                    setEmail('student@chitkara.edu.in');
                    setPassword('password123');
                  }}
                  title="Autofill Demo Account"
                >
                  ⚡ Autofill
                </button>
              </div>
              <div className="demo-credentials-content">
                <span>Email: <code>student@chitkara.edu.in</code></span>
                <span>Password: <code>password123</code></span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
