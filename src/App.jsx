import { useState, useEffect } from 'react';
import Sidebar from './components/SideBar';
import MapSection from './components/mapsection';
import GuideMapSection from './components/GuideMapSection';
import ScheduleSection from './components/ScheduleSection';
import LoginSection from './components/LoginSection';
import DashboardSection from './components/DashboardSection';
import ContactsSection from './components/ContactsSection';

export default function App() {
  // Login State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Main UI States
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDark, setIsDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [time, setTime] = useState('');

  // Update clock every second
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      setTime(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Theme Syncing
  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }, [isDark]);

  // Handle login form submission
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setLoginError('Please enter both Email and Password.');
      return;
    }

    if (email === 'student@chitkara.edu.in' && password === 'password123') {
      setIsLoggedIn(true);
      setLoginError('');
    } else if (email.includes('@') && password.length >= 6) {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Use: student@chitkara.edu.in / password123');
    }
  };

  const handleCopyPhone = (phone, name) => {
    navigator.clipboard.writeText(phone);
    alert(`Copied phone number for ${name} to clipboard!`);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    setActiveTab('dashboard');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardSection setActiveTab={setActiveTab} />;
      case 'directory':
        return <MapSection searchQuery={searchQuery} />;
      case 'guidemap':
        return <GuideMapSection setActiveTab={setActiveTab} />;
      case 'schedule':
        return <ScheduleSection />;
      case 'contacts':
        return <ContactsSection handleCopyPhone={handleCopyPhone} />;
      default:
        return <div>Tab not found</div>;
    }
  };

  if (!isLoggedIn) {
    return <LoginSection email={email} setEmail={setEmail} password={password}
      setPassword={setPassword} loginError={loginError} handleLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <button className="mobile-menu-toggle mobile-menu-toggle-btn"
        onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? '✕' : '☰'}
      </button>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab}
        mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="main-wrapper">
        <header className="top-bar">
          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-hamburger-btn mobile-hamburger-trigger">☰</button>
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input type="text" className="search-input"
              placeholder="Search map details, classrooms, blocks..."
              value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
            {searchQuery && <button onClick={() => setSearchQuery('')}
              className="clear-search-btn">✕</button>}
          </div>
          <div className="top-bar-right">
            <div className="pulse-time"><span>{time}</span></div>
            <button className="theme-toggle-btn" onClick={() => setIsDark(!isDark)}
              title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}>
              {isDark ? '☀️' : '🌙'}
            </button>
            <button className="theme-toggle-btn logout-btn" onClick={handleLogout}
              title="Logout from Account">🚪</button>
          </div>
        </header>
        <main className="content-body">{renderContent()}</main>
      </div>
      <div className="bg-glow-blob blob-1" />
      <div className="bg-glow-blob blob-2" />
      <div className="bg-glow-blob blob-3" />
    </div>
  );
}


