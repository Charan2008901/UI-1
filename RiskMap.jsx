// RiskMap.jsx — Task 2
// Clean UI container/placeholder for GIS & Map functionality.
// Leaflet/GeoJSON/GIS map implementation will be integrated by Task 3.
// Coordinates use exact fields: latitude, longitude

export default function RiskMap({
  riskData = [],
  safeZones = [],
  userLocation = null,
  helpRequests = [],
  routeData = null
}) {
  return (
    <div className="riskmap-container">
      <div className="riskmap-header">
        <span className="riskmap-title">📍 Geographic Disaster & Evacuation Map</span>
        <span className="riskmap-badge-task3">Task 3 GIS Container</span>
      </div>
      <div className="riskmap-canvas">
        <div className="map-placeholder-content">
          <div className="map-icon">🗺️</div>
          <h4 className="map-placeholder-heading">Interactive Map View</h4>
          <p className="map-placeholder-description">
            Leaflet / GeoJSON risk overlay & routing will be integrated here by <strong>Task 3</strong>.
          </p>

          <div className="map-data-summary">
            <div className="summary-chip">
              <span className="chip-count">{riskData.length}</span>
              <span className="chip-name">Risk Areas</span>
            </div>
            <div className="summary-chip">
              <span className="chip-count">{safeZones.length}</span>
              <span className="chip-name">Safe Zones</span>
            </div>
            {helpRequests.length > 0 && (
              <div className="summary-chip">
                <span className="chip-count">{helpRequests.length}</span>
                <span className="chip-name">Help Requests</span>
              </div>
            )}
            {routeData && (
              <div className="summary-chip">
                <span className="chip-count">{routeData.distance_km} km</span>
                <span className="chip-name">Active Route</span>
              </div>
            )}
          </div>

          {userLocation && (
            <div className="map-location-tag">
              📍 Current Location: {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
