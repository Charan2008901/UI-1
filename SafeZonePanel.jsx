// SafeZonePanel.jsx — Task 2
// Displays safe-zone / shelter information received from the backend/FastAPI.
// Uses exact fields: shelter_id, latitude, longitude, distance_km, duration_min

export default function SafeZonePanel({ safeZones, loading, error }) {
  if (loading) {
    return (
      <div className="panel safezone-panel">
        <h3 className="panel-title">🏕️ Recommended Safe Zones</h3>
        <div className="panel-loading">Loading safe zones...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="panel safezone-panel">
        <h3 className="panel-title">🏕️ Recommended Safe Zones</h3>
        <div className="panel-error">⚠️ {error}</div>
      </div>
    );
  }

  if (!safeZones || safeZones.length === 0) {
    return (
      <div className="panel safezone-panel">
        <h3 className="panel-title">🏕️ Recommended Safe Zones</h3>
        <div className="panel-empty">No safe zones available.</div>
      </div>
    );
  }

  return (
    <div className="panel safezone-panel">
      <h3 className="panel-title">🏕️ Recommended Safe Zones</h3>
      <div className="safezone-list">
        {safeZones.map((zone) => (
          <div key={zone.shelter_id} className="safezone-card">
            <div className="safezone-card-top">
              <span className="shelter-badge">Shelter: <strong>{zone.shelter_id}</strong></span>
              <span className="safezone-status-open">Active Safe Zone</span>
            </div>
            <div className="safezone-metrics">
              <div className="metric-box">
                <span className="metric-title">Distance</span>
                <span className="metric-value">{zone.distance_km} km</span>
              </div>
              <div className="metric-box">
                <span className="metric-title">Estimated Time</span>
                <span className="metric-value">{zone.duration_min} min</span>
              </div>
            </div>
            <div className="safezone-coords">
              📍 Location: {zone.latitude.toFixed(4)}, {zone.longitude.toFixed(4)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
