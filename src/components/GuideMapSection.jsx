import { CAMPUS_SPOTS } from './campusSpots';

export default function GuideMapSection({ setActiveTab }) {
  return (
    <div className="guidemap-wrapper">
      <div className="section-header">
        <h2 className="section-title">Visual Campus Guide Map</h2>
        <p className="section-subtitle">Chitkara University, Punjab Guide Layout Index</p>
      </div>

      <div className="glass-card guidemap-card">
        <p className="guidemap-description">
          Refer to the visual map numbering below to find your way around academic buildings, residential hostels, and student plazas. Click <strong>"View Details"</strong> next to any block in the index to locate facilities, blocks, and details.
        </p>

        {/* Zoomed-in Chitkara Map Image Frame */}
        <div className="guidemap-image-frame">
          <img
            src="/chitkara_map.jpg"
            alt="Chitkara University Punjab Map Guide"
            className="guidemap-image"
          />
        </div>

        {/* Map Mapping Number Index Table */}
        <div className="guidemap-table-wrapper">
          <h3 className="guidemap-table-title">
            🗺️ Map Index Reference
          </h3>
          
          <table className="guidemap-table">
            <thead>
              <tr>
                <th className="guidemap-rank-header">Rank</th>
                <th className="guidemap-circle-header">Map Circle No.</th>
                <th>Location / Facility Name</th>
                <th>Campus Block Location</th>
                <th className="guidemap-lookup-header">Directory Lookup</th>
              </tr>
            </thead>
            <tbody>
              {CAMPUS_SPOTS.map((spot, idx) => (
                <tr key={idx}>
                  <td className="guidemap-rank-cell">
                    #{spot.rank}
                  </td>
                  <td className="guidemap-circle-cell">
                    Circle #{spot.mappingNo}
                  </td>
                  <td className="guidemap-name-cell">
                    {spot.emoji} {spot.name}
                  </td>
                  <td>
                    {spot.block}
                  </td>
                  <td>
                    <button
                      onClick={() => setActiveTab('directory')}
                      className="spot-info-btn guidemap-lookup-btn"
                    >
                      View Details →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
