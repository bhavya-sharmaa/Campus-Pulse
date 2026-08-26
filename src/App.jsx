import { useState, useEffect } from 'react';
import Sidebar from './components/SideBar';
import MapSection from './components/mapsection';
import GuideMapSection from './components/GuideMapSection';
import ScheduleSection from './components/ScheduleSection';
import LoginSection from './components/LoginSection';
import DashboardSection from './components/DashboardSection';
import ContactsSection from './components/ContactsSection';

export default function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem('isLoggedIn') === 'true' || localStorage.getItem('isLoggedIn') === 'true';
  });
  
  const [currentUser, setCurrentUser] = useState(() => {
    const sessionUser = sessionStorage.getItem('currentUser');
    const localUser = localStorage.getItem('currentUser');
    return sessionUser ? JSON.parse(sessionUser) : (localUser ? JSON.parse(localUser) : null);
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDark, setIsDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [time, setTime] = useState('');

  
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      setTime(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

 
  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }, [isDark]);

  
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setLoginError('Please enter both Email and Password.');
      return;
    }

    const demoUser = {
      fullName: 'Demo Student',
      rollNumber: '2210991234',
      department: 'cse',
      year: '3',
      email: 'student@chitkara.edu.in'
    };

    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const matchedUser = (email === 'student@chitkara.edu.in' && password === 'password12345')
      ? demoUser
      : existingUsers.find(u => u.email === email && u.password === password);

    if (matchedUser) {
      setIsLoggedIn(true);
      setCurrentUser(matchedUser);
      setLoginError('');

      if (rememberMe) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(matchedUser));
      } else {
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('currentUser', JSON.stringify(matchedUser));
      }
    } else if (email.includes('@') && password.length >= 6) {
     
      const fallbackUser = {
        fullName: email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        rollNumber: '221099' + Math.floor(1000 + Math.random() * 9000),
        department: 'cse',
        year: '1',
        email: email
      };
      setIsLoggedIn(true);
      setCurrentUser(fallbackUser);
      setLoginError('');

      if (rememberMe) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(fallbackUser));
      } else {
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('currentUser', JSON.stringify(fallbackUser));
      }
    } else {
      setLoginError('Invalid credentials. Register a new account or use the demo credentials.');
    }
  };

  const handleCopyPhone = (phone, name) => {
    navigator.clipboard.writeText(phone);
    alert(`Copied phone number for ${name} to clipboard!`);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setEmail('');
    setPassword('');
    setActiveTab('dashboard');
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
  };


  const handleRouteFromDashboard = (buildingName) => {
    const cleanName = buildingName.split('(')[0].trim();
    setSearchQuery(cleanName);
    setActiveTab('directory');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardSection setActiveTab={setActiveTab} currentUser={currentUser} onRoute={handleRouteFromDashboard} />;
      case 'directory':
        return <MapSection searchQuery={searchQuery} />;
      case 'guidemap':
        return <GuideMapSection setActiveTab={setActiveTab} setSearchQuery={setSearchQuery} />;
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
      setPassword={setPassword} loginError={loginError} handleLogin={handleLogin}
      rememberMe={rememberMe} setRememberMe={setRememberMe} />;
  }

  return (
    <div className="app-container">
      <button className="mobile-menu-toggle mobile-menu-toggle-btn"
        onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? '✕' : '☰'}
      </button>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab}
        mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} currentUser={currentUser} />
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
              title="Logout from Account" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.2s var(--transition-smooth)' }}>
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </button>
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


