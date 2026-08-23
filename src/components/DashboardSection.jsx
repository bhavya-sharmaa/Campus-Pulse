import { useState, useMemo } from 'react';
import { DEPARTMENTS, CATEGORIES, POPULAR_TAGS, CATEGORY_META } from './departmentsData';

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

      {/* ── University Directory Section ── */}
      <UniversityDirectory />
    </div>
  );
}


/* ─────────────── University Directory ─────────────── */
function UniversityDirectory() {
  const [search, setSearch]       = useState('');
  const [category, setCategory]   = useState('all');
  const [activeTag, setActiveTag] = useState(null);

  const filtered = useMemo(() => {
    return DEPARTMENTS.filter(d => {
      const matchCat  = category === 'all' || d.category === category;
      const matchTag  = !activeTag  || d.tags.includes(activeTag);
      const q         = search.toLowerCase();
      const matchSearch = !q
        || d.name.toLowerCase().includes(q)
        || d.building.toLowerCase().includes(q)
        || d.dean.toLowerCase().includes(q)
        || d.description.toLowerCase().includes(q);
      return matchCat && matchTag && matchSearch;
    });
  }, [search, category, activeTag]);

  const handleTagClick = (tag) => {
    setActiveTag(prev => prev === tag ? null : tag);
    setCategory('all');
  };

  return (
    <section className="ud-section">
      {/* Header */}
      <div className="ud-header">
        <p className="ud-eyebrow">UNIVERSITY DIRECTORY</p>
        <h2 className="ud-title">Campus Departments &amp; Facilities</h2>
        <p className="ud-subtitle">
          Instant contact details, dean offices, administrative wings, and 1-tap route guidance.
        </p>
      </div>

      {/* Search + Filter Row */}
      <div className="ud-controls">
        <div className="ud-search-box">
          <span className="ud-search-icon">🔍</span>
          <input
            className="ud-search-input"
            type="text"
            placeholder="Search by department name, building, dean, or keywords..."
            value={search}
            onChange={e => { setSearch(e.target.value); setActiveTag(null); }}
          />
          {search && (
            <button className="ud-clear-btn" onClick={() => setSearch('')}>✕</button>
          )}
        </div>
        <div className="ud-select-wrapper">
          <select
            className="ud-category-select"
            value={category}
            onChange={e => { setCategory(e.target.value); setActiveTag(null); }}
          >
            {CATEGORIES.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
          <span className="ud-select-arrow">▾</span>
        </div>
      </div>

      {/* Popular Tag Chips */}
      <div className="ud-tags-row">
        <span className="ud-tags-label">⚡ Popular:</span>
        {POPULAR_TAGS.map(tag => (
          <button
            key={tag}
            className={`ud-tag-chip${activeTag === tag ? ' ud-tag-chip--active' : ''}`}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      {filtered.length === 0 ? (
        <div className="ud-empty">
          <span>🔎</span>
          <p>No departments match your search. Try a different keyword or category.</p>
        </div>
      ) : (
        <div className="ud-cards-grid">
          {filtered.map(dept => (
            <DeptCard key={dept.id} dept={dept} />
          ))}
        </div>
      )}
    </section>
  );
}

function DeptCard({ dept }) {
  const meta = CATEGORY_META[dept.category] || CATEGORY_META.academic;
  return (
    <div className="ud-dept-card glass-card">
      {/* Category Badge */}
      <div className="ud-card-header">
        <span
          className="ud-category-badge"
          style={{ background: meta.bg, color: meta.color }}
        >
          {meta.label}
        </span>
        <button className="ud-info-btn" title="More info">ℹ️</button>
      </div>

      {/* Dept Name */}
      <h3 className="ud-dept-name">{dept.name}</h3>

      {/* Location */}
      <p className="ud-dept-location">
        <span className="ud-loc-icon">📍</span>
        <strong>{dept.building}</strong>
        {dept.floors && <span className="ud-loc-floor"> • {dept.floors}</span>}
      </p>

      {/* Description */}
      <p className="ud-dept-desc">{dept.description}</p>

      {/* Footer: Dean + Route */}
      <div className="ud-card-footer">
        <span className="ud-dean-name">{dept.dean}</span>
        <button className="ud-route-btn">
          <span>✈</span> Route
        </button>
      </div>
    </div>
  );
}
