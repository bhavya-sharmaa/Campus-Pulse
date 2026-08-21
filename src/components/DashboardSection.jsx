
export default function DashboardSection({ setActiveTab }) {
  return (
    <div className="dashboard-wrapper">
      <div className="section-header">
        <h2 className="section-title">Welcome to CampusPulse</h2>
        <p className="section-subtitle">Your central hub for class timetables, campus gates, and academic blocks.</p>
      </div>

      {/* Quick Hero */}
      <div className="glass-card dashboard-hero-card">
        <h3 className="dashboard-hero-title">
          Hey there, Student! 👋
        </h3>
        <p className="dashboard-hero-desc">
          CampusPulse helps you manage your weekly study sessions and navigate the campus. Track your AIML-3-G9 classes, customize schedules, view operational details of libraries and dispensaries, or check hostel gate curfew timings.
        </p>
        <div className="dashboard-hero-actions">
          <button
            className="btn-submit btn-submit-hero"
            onClick={() => setActiveTab('directory')}
          >
            Explore Locations 🗂️
          </button>
          <button
            className="contact-action-btn btn-secondary-hero"
            onClick={() => setActiveTab('schedule')}
          >
            View Timetable 📝
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="dashboard-grid">
        <div className="glass-card stat-card" onClick={() => setActiveTab('schedule')}>
          <div className="stat-icon">🎓</div>
          <div className="stat-info">
            <h3>AIML-3-G9</h3>
            <p>Active Class Group</p>
          </div>
        </div>

        <div className="glass-card stat-card" onClick={() => setActiveTab('directory')}>
          <div className="stat-icon stat-icon-secondary">🗂️</div>
          <div className="stat-info">
            <h3>8 Locations</h3>
            <p>Key Campus Spots Mapped</p>
          </div>
        </div>

        <div className="glass-card stat-card" onClick={() => setActiveTab('contacts')}>
          <div className="stat-icon stat-icon-accent">📞</div>
          <div className="stat-info">
            <h3>5 Contacts</h3>
            <p>Emergency Lines Active</p>
          </div>
        </div>
      </div>

      {/* Shortcuts layout */}
      <div className="dashboard-shortcuts-grid">
        <div className="glass-card">
          <h3 className="dashboard-shortcut-title">📌 Campus Notice</h3>
          <ul className="dashboard-shortcut-list">
            <li>Final semester examination schedules are out. Check admin boards.</li>
            <li>Library access timings extended till midnight for study week.</li>
            <li>Curfew lock timings are strictly monitored at Boys and Girls Hostel gates.</li>
          </ul>
        </div>

        <div className="glass-card">
          <h3 className="dashboard-shortcut-title">💡 Quick Tips</h3>
          <ul className="dashboard-shortcut-list">
            <li>Toggle the theme button at the top-right for late-night study sessions.</li>
            <li>Mark classes as complete on your schedule to keep track of attendance.</li>
            <li>Use the search bar on the Map directory page to filter key locations immediately.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
