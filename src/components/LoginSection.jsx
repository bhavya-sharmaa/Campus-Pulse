import React from 'react';

export default function LoginSection({
  email,
  setEmail,
  password,
  setPassword,
  loginError,
  handleLogin
}) {
  return (
    <div className="login-container">
      <div className="glass-card login-card">
        <div className="login-header">
          <div className="login-logo">⚡</div>
          <h2 className="login-title">CampusPulse</h2>
          <p className="login-subtitle">Interactive guide login for Chitkara University, Punjab</p>
        </div>

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

          <button type="submit" className="btn-submit login-submit-btn">
            Access Dashboard →
          </button>
        </form>

        <div className="demo-credentials-box">
          <strong>🔑 Demo Account Credentials:</strong><br />
          Email: <code>student@chitkara.edu.in</code><br />
          Password: <code>password123</code>
        </div>
      </div>
    </div>
  );
}
