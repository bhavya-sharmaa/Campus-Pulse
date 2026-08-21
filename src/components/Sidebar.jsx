import React from 'react';

export default function Sidebar({ activeTab, setActiveTab, mobileOpen, setMobileOpen }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'directory', label: 'Campus Directory', icon: '🗂️' },
    { id: 'guidemap', label: 'Visual Guide Map', icon: '🗺️' },
    { id: 'schedule', label: 'Schedule Planner', icon: '📝' },
    { id: 'contacts', label: 'Emergency Contacts', icon: '📞' }
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileOpen(false); 
  };

  return (
    <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="logo-section">
        <div className="logo-pulse">⚡</div>
        <h1 className="logo-text">CampusPulse</h1>
      </div>

      <ul className="nav-links">
        {menuItems.map((item) => (
          <li key={item.id} className="nav-item">
            <button
              className={`nav-btn ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="sidebar-footer">
        <p>© 2026 CampusPulse</p>
        <p>Front End Project • 2nd Year</p>
      </div>
    </aside>
  );
}
