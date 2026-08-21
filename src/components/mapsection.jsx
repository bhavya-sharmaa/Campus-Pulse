import { useState } from 'react';
import { CAMPUS_SPOTS } from './campusSpots';

export default function MapSection({ searchQuery }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedSpot, setSelectedSpot] = useState(CAMPUS_SPOTS[0]);

  const categories = [
    { id: 'all', label: 'All Locations' },
    { id: 'academic', label: 'Academic / Labs' },
    { id: 'social', label: 'Student Hangouts' },
    { id: 'admin', label: 'Campus Services' }
  ];

  const filteredSpots = CAMPUS_SPOTS.filter((spot) => {
    const matchesCategory = activeCategory === 'all' || spot.category === activeCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      spot.name.toLowerCase().includes(query) ||
      spot.block.toLowerCase().includes(query) ||
      spot.location.toLowerCase().includes(query) ||
      spot.facilities.some((facility) => facility.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="map-section-wrapper">
      <div className="section-header">
        <h2 className="section-title">Campus Directory &amp; Details</h2>
        <p className="section-subtitle">Chitkara University, Punjab Directory References</p>
      </div>

      <div className="category-tabs">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="directory-layout">
        <div>
          {filteredSpots.length > 0 ? (
            <div className="card-grid">
              {filteredSpots.map((spot) => (
                <div
                  key={spot.id}
                  className={`glass-card spot-card ${selectedSpot.id === spot.id ? 'selected-card active-spot-card' : ''}`}
                  onClick={() => setSelectedSpot(spot)}
                >
                  <div className="spot-image-placeholder">
                    <span className="spot-emoji-icon">{spot.emoji}</span>
                    <div className="spot-rank-badge" title={`Location Rank #${spot.rank}`}>
                      #{spot.rank}
                    </div>
                  </div>
                  <span className={`spot-category-tag tag-${spot.category}`}>{spot.block}</span>
                  <h3 className="spot-name">{spot.name}</h3>
                  <p className="spot-desc-short">{spot.description.substring(0, 85)}...</p>
                  <div className="spot-footer">
                    <span>📍 {spot.location.split(',')[0]}</span>
                    <button className="spot-info-btn">View details →</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card empty-detail-state">
              <span className="empty-icon">🔍</span>
              <h3>No Campus Spots Matched</h3>
              <p>Check the spelling or switch categories to locate other halls.</p>
            </div>
          )}
        </div>

        <div className="glass-card detail-panel">
          {selectedSpot ? (
            <div>
              <div className="detail-img">
                <span className="detail-emoji-icon">{selectedSpot.emoji}</span>
                <div className="detail-rank-badge">#{selectedSpot.rank}</div>
              </div>
              <span className={`spot-category-tag tag-${selectedSpot.category}`}>{selectedSpot.block}</span>
              <h2 className="detail-title">{selectedSpot.name}</h2>
              <p className="spot-desc-short detail-desc-long">{selectedSpot.description}</p>

              <div className="detail-field">
                <div className="detail-label">📍 Exact Location</div>
                <div className="detail-value">{selectedSpot.location}</div>
              </div>
              <div className="detail-field">
                <div className="detail-label">🗺️ Guide Map reference</div>
                <div className="detail-value detail-map-circle-val">
                  Circle #{selectedSpot.mappingNo} on Guide Map
                </div>
              </div>
              <div className="detail-field">
                <div className="detail-label">💡 Key Facilities</div>
                <div className="detail-value detail-facilities-wrapper">
                  <ul className="facilities-list">
                    {selectedSpot.facilities.map((facility, index) => (
                      <li key={index} className="facility-item-pill">✓ {facility}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-detail-state">
              <span className="empty-icon">🗺️</span>
              <h3>Select a Hall</h3>
              <p>Click on any block card in the directory to see description, block details, and services.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}