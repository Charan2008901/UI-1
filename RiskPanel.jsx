// RiskPanel.jsx — Task 2
// Displays risk information received from the backend/FastAPI.
// IMPORTANT: The frontend does NOT calculate risk_score or determine risk_level (handled by Task 4).
// Uses exact fields: building_id, risk_score, risk_level

function getBadgeClass(risk_level) {
  switch (risk_level) {
    case "Critical": return "badge-critical";
    case "High": return "badge-high";
    case "Medium": return "badge-medium";
    case "Low": return "badge-low";
    default: return "badge-default";
  }
}

export default function RiskPanel({ riskData, loading, error }) {
  if (loading) {
    return (
      <div className="panel risk-panel">
        <h3 className="panel-title">⚠️ Risk Assessment</h3>
        <div className="panel-loading">Loading risk data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="panel risk-panel">
        <h3 className="panel-title">⚠️ Risk Assessment</h3>
        <div className="panel-error">⚠️ {error}</div>
      </div>
    );
  }

  if (!riskData || riskData.length === 0) {
    return (
      <div className="panel risk-panel">
        <h3 className="panel-title">⚠️ Risk Assessment</h3>
        <div className="panel-empty">No risk data available.</div>
      </div>
    );
  }

  return (
    <div className="panel risk-panel">
      <h3 className="panel-title">⚠️ Risk Assessment</h3>
      <div className="risk-cards-container">
        {riskData.map((item) => (
          <div key={item.building_id} className="risk-card">
            <div className="risk-card-top">
              <span className="building-label">Building ID: <strong>{item.building_id}</strong></span>
              <span className={`risk-badge ${getBadgeClass(item.risk_level)}`}>
                {item.risk_level}
              </span>
            </div>
            <div className="risk-score-display">
              <span className="risk-score-text">Risk Score:</span>
              <span className="risk-score-number">{item.risk_score} / 100</span>
            </div>
            <div className="risk-progress-bar">
              <div
                className={`risk-progress-fill ${getBadgeClass(item.risk_level)}`}
                style={{ width: `${Math.min(item.risk_score, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
