import React, { useState } from 'react';
import { INITIAL_TIMETABLE } from './initialTimetable';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export default function ScheduleSection() {
  const [timetable, setTimetable] = useState(INITIAL_TIMETABLE);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [viewMode, setViewMode] = useState('daily'); // 'daily' or 'grid' (Matrix timetable)
  
  // Note state helpers
  const [editingClassId, setEditingClassId] = useState(null);
  const [noteText, setNoteText] = useState('');

  // Toggle class completion checkbox
  const handleToggleClass = (day, classId) => {
    setTimetable({
      ...timetable,
      [day]: timetable[day].map((cls) =>
        cls.id === classId ? { ...cls, completed: !cls.completed } : cls
      )
    });
  };

  // Open note editor
  const handleStartEditNote = (cls) => {
    setEditingClassId(cls.id);
    setNoteText(cls.note || '');
  };

  // Save class note
  const handleSaveNote = (day, classId) => {
    setTimetable({
      ...timetable,
      [day]: timetable[day].map((cls) =>
        cls.id === classId ? { ...cls, note: noteText } : cls
      )
    });
    setEditingClassId(null);
    setNoteText('');
  };

  const getDayProgress = (day) => {
    const dayClasses = timetable[day] || [];
    if (dayClasses.length === 0) return 100;
    const completed = dayClasses.filter((c) => c.completed).length;
    return Math.round((completed / dayClasses.length) * 100);
  };

  const activeClasses = timetable[selectedDay] || [];

  return (
    <div className="schedule-section-wrapper">
      {/* Header with Switcher */}
      <div className="schedule-header-controls">
        <div className="section-header schedule-section-header">
          <h2 className="section-title">Class Scheduler</h2>
          <p className="section-subtitle">Timetable details for group <strong>AIML-3-G9</strong></p>
        </div>

        {/* View Toggle */}
        <div className="view-switcher-container">
          <button
            onClick={() => setViewMode('daily')}
            className={`view-switcher-btn ${viewMode === 'daily' ? 'active' : ''}`}
          >
            📋 Daily Timeline
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`view-switcher-btn ${viewMode === 'grid' ? 'active' : ''}`}
          >
            🗓️ Matrix Table
          </button>
        </div>
      </div>

      {viewMode === 'daily' ? (
        <div className="schedule-container">
          {/* Left Panel: Class Timeline */}
          <div>
            {/* Day Selectors */}
            <div className="category-tabs schedule-tabs">
              {DAYS.map((day) => (
                <button
                  key={day}
                  className={`category-tab ${selectedDay === day ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedDay(day);
                    setEditingClassId(null);
                  }}
                >
                  {day}
                </button>
              ))}
            </div>

            <div className="schedule-header-row">
              <h3 className="schedule-day-title">{selectedDay}'s Timeline</h3>
              <span className="progress-pill-badge">
                Day Progress: {getDayProgress(selectedDay)}% Done
              </span>
            </div>

            <div className="class-list schedule-class-list">
              {activeClasses.length > 0 ? (
                activeClasses.map((cls) => (
                  <div
                    key={cls.id}
                    className={`class-item ${cls.completed ? 'completed' : ''}`}
                  >
                    <div className="class-item-header">
                      {/* Checkbox */}
                      <div
                        className={`class-checkbox ${cls.completed ? 'checked' : ''}`}
                        onClick={() => handleToggleClass(selectedDay, cls.id)}
                        title="Mark period as complete"
                      >
                        {cls.completed && '✓'}
                      </div>
                      
                      {/* Class Details */}
                      <div className="class-info">
                        <h4 className="class-name">{cls.subject}</h4>
                        <div className="class-meta">
                          <span>🕒 Period {cls.period} ({cls.time})</span>
                          <span>📍 Room {cls.room}</span>
                          <span>👤 Prof. {cls.teacher}</span>
                        </div>
                      </div>

                      {/* Note Button */}
                      <button
                        onClick={() => handleStartEditNote(cls)}
                        className={`class-note-toggle-btn ${cls.note ? 'has-note' : ''}`}
                      >
                        📝 {cls.note ? 'Edit Note' : 'Add Note'}
                      </button>
                    </div>

                    {/* Persisted Class Note Display */}
                    {cls.note && !editingClassId && (
                      <div className="class-note-display">
                        💡 Note: {cls.note}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="glass-card empty-detail-state">
                  <span className="empty-icon">🏖️</span>
                  <h3>No Classes Scheduled</h3>
                  <p>Enjoy your free day!</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel: Class Note Editor */}
          <div className="glass-card note-editor-panel">
            <h3 className="note-editor-title">
              ✍️ Task & Notes Scheduler
            </h3>

            {editingClassId ? (
              <div>
                {/* Retrieve editing class details */}
                {(() => {
                  const targetClass = activeClasses.find(c => c.id === editingClassId);
                  if (!targetClass) return null;
                  return (
                    <div className="note-editor-form">
                      <div>
                        <div className="note-target-label">Class Notes Target</div>
                        <div className="note-target-subject">{targetClass.subject}</div>
                        <div className="note-target-meta">Room {targetClass.room} • {targetClass.time}</div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Write Note / Task (e.g. Assignment deadline, Quiz prep):</label>
                        <textarea
                          rows={4}
                          className="form-input note-textarea"
                          placeholder="e.g. Submit project reports by Thursday evening class."
                          value={noteText}
                          onChange={(e) => setNoteText(e.target.value)}
                        />
                      </div>

                      <div className="note-editor-actions">
                        <button
                          onClick={() => handleSaveNote(selectedDay, editingClassId)}
                          className="btn-submit note-save-btn"
                        >
                          Save Note
                        </button>
                        <button
                          onClick={() => {
                            setEditingClassId(null);
                            setNoteText('');
                          }}
                          className="contact-action-btn note-cancel-btn"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            ) : (
              <div className="note-editor-empty-state">
                <span className="note-empty-icon">📌</span>
                <h4 className="note-empty-title">Select a Class</h4>
                <p className="note-empty-desc">Click "Add Note" on any class in the timeline list to create custom agendas or assign project tasks to that specific session.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Matrix Grid View: Matches the layout image exactly */
        <div className="glass-card matrix-card-wrapper">
          <h3 className="matrix-card-title">
            📅 Class Matrix Layout (AIML-3-G9)
          </h3>
          <p className="matrix-card-subtitle">
            A standard academic grid mapping days and class sessions. All classes are conducted in classroom <strong>MB-502</strong>.
          </p>

          <table className="matrix-table">
            <thead>
              <tr className="matrix-header-row">
                <th className="matrix-day-col">Day</th>
                <th>Period 1<br/><span className="matrix-time-sub">09:10 - 10:30</span></th>
                <th>Period 2<br/><span className="matrix-time-sub">10:30 - 11:50</span></th>
                <th>Period 3<br/><span className="matrix-time-sub">12:20 - 01:40</span></th>
                <th>Period 4<br/><span className="matrix-time-sub">01:40 - 03:00</span></th>
                <th className="matrix-break-hdr">Break<br/><span className="matrix-time-sub">03:00-3:30</span></th>
                <th>Period 5<br/><span className="matrix-time-sub">03:30 - 04:50</span></th>
                <th>Period 6<br/><span className="matrix-time-sub">04:50 - 06:10</span></th>
              </tr>
            </thead>
            <tbody>
              {/* Mon */}
              <tr>
                <td className="matrix-day-header">Mon</td>
                <td colSpan={2} className="subject-cell oops-cell">
                  <div className="subject-name">OOPS</div>
                  <div className="subject-teacher">Mr. Sumit • MB-502</div>
                </td>
                <td colSpan={2} className="subject-cell dbms-cell">
                  <div className="subject-name">DBMS</div>
                  <div className="subject-teacher">Mr. Harsh • MB-502</div>
                </td>
                <td rowSpan={5} className="matrix-break-col">B<br/>R<br/>E<br/>A<br/>K</td>
                <td colSpan={2} className="subject-cell stats-cell">
                  <div className="subject-name">STATS</div>
                  <div className="subject-teacher">Mr. Harsh • MB-502</div>
                </td>
              </tr>
              {/* Tue */}
              <tr>
                <td className="matrix-day-header">Tue</td>
                <td className="subject-cell fee-cell">
                  <div className="subject-name">FEE</div>
                  <div className="subject-teacher">Ms. Yogendra • MB-502</div>
                </td>
                <td className="subject-empty">-</td>
                <td className="subject-empty">-</td>
                <td className="subject-empty">-</td>
                <td colSpan={2} className="subject-cell oops-cell">
                  <div className="subject-name">OOPS</div>
                  <div className="subject-teacher">Mr. Sumit • MB-502</div>
                </td>
              </tr>
              {/* Wed */}
              <tr>
                <td className="matrix-day-header">Wed</td>
                <td colSpan={2} className="subject-cell oops-cell">
                  <div className="subject-name">OOPS</div>
                  <div className="subject-teacher">Mr. Sumit • MB-502</div>
                </td>
                <td colSpan={2} className="subject-cell stats-cell">
                  <div className="subject-name">STATS</div>
                  <div className="subject-teacher">Mr. Parve • MB-502</div>
                </td>
                <td colSpan={2} className="subject-cell fee-cell">
                  <div className="subject-name">FEE</div>
                  <div className="subject-teacher">Mr. Rishabh • MB-502</div>
                </td>
              </tr>
              {/* Thu */}
              <tr>
                <td className="matrix-day-header">Thu</td>
                <td className="subject-cell fee-cell">
                  <div className="subject-name">FEE</div>
                  <div className="subject-teacher">Ms. Yogendra • MB-502</div>
                </td>
                <td className="subject-empty">-</td>
                <td className="subject-empty">-</td>
                <td className="subject-empty">-</td>
                <td colSpan={2} className="subject-cell oops-cell">
                  <div className="subject-name">OOPS</div>
                  <div className="subject-teacher">Mr. Sumit • MB-502</div>
                </td>
              </tr>
              {/* Fri */}
              <tr>
                <td className="matrix-day-header">Fri</td>
                <td colSpan={2} className="subject-cell dbms-cell">
                  <div className="subject-name">DBMS</div>
                  <div className="subject-teacher">Mr. Sumit • MB-502</div>
                </td>
                <td className="subject-empty">-</td>
                <td className="subject-empty">-</td>
                <td colSpan={2} className="subject-cell oops-cell">
                  <div className="subject-name">OOPS</div>
                  <div className="subject-teacher">Mr. Sumit • MB-502</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
