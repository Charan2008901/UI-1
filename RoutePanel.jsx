// RoutePanel.jsx — Task 2
// Displays evacuation-route information received from the backend/FastAPI.
// IMPORTANT: Route calculation & OSRM routing are handled by Task 5.
// Uses exact fields: shelter_id, distance_km, duration_min

export default function RoutePanel({ routeData, loading, error }) {
  if (loading) {
    return (
      <div className="panel route-panel">
        <h3 className="panel-title">🗺️ Recommended Evacuation Route</h3>
        <div className="panel-loading">Calculating evacuation route...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="panel route-panel">
        <h3 className="panel-title">🗺️ Recommended Evacuation Route</h3>
        <div className="panel-error">⚠️ {error}</div>
      </div>
    );
  }

  if (!routeData) {
    return (
      <div className="panel route-panel">
        <h3 className="panel-title">🗺️ Recommended Evacuation Route</h3>
        <div className="panel-empty">No route data available.</div>
      </div>
    );
  }

  return (
    <div className="panel route-panel">
      <h3 className="panel-title">🗺️ Recommended Evacuation Route</h3>
      <div className="route-card">
        <div className="route-header">
          <span className="route-dest-label">Destination Safe Zone:</span>
          <span className="route-dest-id">{routeData.shelter_id}</span>
        </div>
        <div className="route-metrics-grid">
          <div className="route-metric-item">
            <span className="metric-label">Total Distance</span>
            <span className="metric-val">{routeData.distance_km} km</span>
          </div>
          <div className="route-metric-item">
            <span className="metric-label">Estimated Duration</span>
            <span className="metric-val">{routeData.duration_min} min</span>
          </div>
        </div>
        <div className="route-advisory">
          ℹ️ <strong>Evacuation Advisory:</strong> Follow designated high-ground routes. Avoid waterlogged paths and follow emergency responder instructions.
        </div>
      </div>
    </div>
  );
}
