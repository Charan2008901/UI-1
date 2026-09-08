// CitizenView.jsx — Task 2
// Citizen / Evacuation View for RAKSHA Disaster Response System.
// Displays citizen risk information, recommended safe zone, evacuation route, and map.

import { useState, useEffect } from "react";
import RiskPanel from "./RiskPanel";
import SafeZonePanel from "./SafeZonePanel";
import RoutePanel from "./RoutePanel";
import RiskMap from "./RiskMap";
import { getRiskData, getSafeZones, getRoute } from "./api";
import { mockCitizenLocation } from "./mockData";

export default function CitizenView() {
  const [riskData, setRiskData] = useState([]);
  const [safeZones, setSafeZones] = useState([]);
  const [routeData, setRouteData] = useState(null);

  const [loading, setLoading] = useState({
    risk: true,
    safeZones: true,
    route: true
  });

  const [errors, setErrors] = useState({
    risk: null,
    safeZones: null,
    route: null
  });

  useEffect(() => {
    async function loadData() {
      // 1. Fetch risk information from FastAPI
      try {
        const data = await getRiskData();
        setRiskData(data);
      } catch (err) {
        setErrors((prev) => ({ ...prev, risk: "Unable to load risk information" }));
      } finally {
        setLoading((prev) => ({ ...prev, risk: false }));
      }

      // 2. Fetch safe zone information from FastAPI
      try {
        const data = await getSafeZones();
        setSafeZones(data);
      } catch (err) {
        setErrors((prev) => ({ ...prev, safeZones: "Unable to load safe zones" }));
      } finally {
        setLoading((prev) => ({ ...prev, safeZones: false }));
      }

      // 3. Fetch recommended evacuation route from FastAPI
      try {
        const data = await getRoute(
          mockCitizenLocation.latitude,
          mockCitizenLocation.longitude
        );
        setRouteData(data);
      } catch (err) {
        setErrors((prev) => ({ ...prev, route: "Unable to load evacuation route" }));
      } finally {
        setLoading((prev) => ({ ...prev, route: false }));
      }
    }

    loadData();
  }, []);

  return (
    <div className="view-container citizen-view-layout">
      <div className="view-header-bar">
        <div className="citizen-status-banner">
          <span className="emergency-indicator">🔴 EMERGENCY EVACUATION ACTIVE</span>
          <span className="citizen-loc-badge">
            📍 Your Location: {mockCitizenLocation.latitude.toFixed(4)}, {mockCitizenLocation.longitude.toFixed(4)}
          </span>
        </div>
      </div>

      <div className="view-grid">
        <div className="panels-column">
          <RiskPanel
            riskData={riskData}
            loading={loading.risk}
            error={errors.risk}
          />
          <SafeZonePanel
            safeZones={safeZones}
            loading={loading.safeZones}
            error={errors.safeZones}
          />
          <RoutePanel
            routeData={routeData}
            loading={loading.route}
            error={errors.route}
          />
        </div>

        <div className="map-column">
          <RiskMap
            riskData={riskData}
            safeZones={safeZones}
            routeData={routeData}
            userLocation={mockCitizenLocation}
          />
        </div>
      </div>
    </div>
  );
}
