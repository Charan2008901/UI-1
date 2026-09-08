// ResponderView.jsx — Task 2
// Lightweight Responder Dashboard for RAKSHA Disaster Response System.
// Displays assistance requests, citizen locations, risk summary, and safe zones.

import { useState, useEffect } from "react";
import RiskPanel from "./RiskPanel";
import SafeZonePanel from "./SafeZonePanel";
import RiskMap from "./RiskMap";
import { getRiskData, getSafeZones, getRequests } from "./api";

function getStatusBadge(status) {
  switch (status) {
    case "Pending": return "status-pending";
    case "In Progress": return "status-progress";
    case "Resolved": return "status-resolved";
    default: return "status-default";
  }
}

export default function ResponderView() {
  const [riskData, setRiskData] = useState([]);
  const [safeZones, setSafeZones] = useState([]);
  const [helpRequests, setHelpRequests] = useState([]);

  const [loading, setLoading] = useState({
    risk: true,
    safeZones: true,
    requests: true
  });

  const [errors, setErrors] = useState({
    risk: null,
    safeZones: null,
    requests: null
  });

  useEffect(() => {
    async function loadData() {
      // 1. Fetch risk data
      try {
        const data = await getRiskData();
        setRiskData(data);
      } catch (err) {
        setErrors((prev) => ({ ...prev, risk: "Unable to load risk data" }));
      } finally {
        setLoading((prev) => ({ ...prev, risk: false }));
      }

      // 2. Fetch safe zones
      try {
        const data = await getSafeZones();
        setSafeZones(data);
      } catch (err) {
        setErrors((prev) => ({ ...prev, safeZones: "Unable to load safe zones" }));
      } finally {
        setLoading((prev) => ({ ...prev, safeZones: false }));
      }

      // 3. Fetch assistance requests
      try {
        const data = await getRequests();
        setHelpRequests(data);
      } catch (err) {
        setErrors((prev) => ({ ...prev, requests: "Unable to load assistance requests" }));
      } finally {
        setLoading((prev) => ({ ...prev, requests: false }));
      }
    }

    loadData();
  }, []);

  return (
    <div className="view-container responder-view-layout">
      <div className="view-header-bar">
        <div className="responder-status-banner">
          <span className="responder-badge-active">🚒 DISASTER RESPONSE COMMAND</span>
          <span className="responder-request-count">
            Pending Requests: {helpRequests.filter(r => r.status === "Pending").length}
          </span>
        </div>
      </div>

      <div className="view-grid">
        <div className="panels-column">
          {/* Assistance Requests Section */}
          <div className="panel requests-panel">
            <h3 className="panel-title">🚨 Active Assistance Requests</h3>
            {loading.requests ? (
              <div className="panel-loading">Loading assistance requests...</div>
            ) : errors.requests ? (
              <div className="panel-error">⚠️ {errors.requests}</div>
            ) : helpRequests.length === 0 ? (
              <div className="panel-empty">No active assistance requests.</div>
            ) : (
              <div className="requests-list">
                {helpRequests.map((req) => (
                  <div key={req.request_id} className="request-card">
                    <div className="request-card-header">
                      <span className="request-id-text">{req.request_id} (Bldg: {req.building_id})</span>
                      <span className={`request-status-pill ${getStatusBadge(req.status)}`}>
                        {req.status}
                      </span>
                    </div>
                    <p className="request-message-text">{req.message}</p>
                    <div className="request-footer">
                      <span className="request-coords">
                        📍 {req.latitude.toFixed(4)}, {req.longitude.toFixed(4)}
                      </span>
                      <span className="request-risk-tag">Risk: {req.risk_level}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Risk Overview */}
          <RiskPanel
            riskData={riskData}
            loading={loading.risk}
            error={errors.risk}
          />

          {/* Safe Zones Overview */}
          <SafeZonePanel
            safeZones={safeZones}
            loading={loading.safeZones}
            error={errors.safeZones}
          />
        </div>

        {/* Map Placeholder for Task 3 */}
        <div className="map-column">
          <RiskMap
            riskData={riskData}
            safeZones={safeZones}
            helpRequests={helpRequests}
          />
        </div>
      </div>
    </div>
  );
}
