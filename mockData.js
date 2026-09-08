// Mock data for RAKSHA Disaster Response System (Task 2 - Frontend)
// Uses EXACT agreed field names:
// building_id, risk_score, risk_level, latitude, longitude, shelter_id, distance_km, duration_min

export const mockRiskData = [
  {
    building_id: "B001",
    risk_score: 82,
    risk_level: "High",
    latitude: 17.3850,
    longitude: 78.4867
  },
  {
    building_id: "B002",
    risk_score: 45,
    risk_level: "Medium",
    latitude: 17.3950,
    longitude: 78.4747
  },
  {
    building_id: "B003",
    risk_score: 23,
    risk_level: "Low",
    latitude: 17.4100,
    longitude: 78.4900
  },
  {
    building_id: "B004",
    risk_score: 91,
    risk_level: "Critical",
    latitude: 17.3750,
    longitude: 78.5000
  },
  {
    building_id: "B005",
    risk_score: 67,
    risk_level: "High",
    latitude: 17.4200,
    longitude: 78.4500
  }
];

export const mockSafeZones = [
  {
    shelter_id: "S001",
    latitude: 17.3850,
    longitude: 78.4867,
    distance_km: 1.8,
    duration_min: 7
  },
  {
    shelter_id: "S002",
    latitude: 17.4050,
    longitude: 78.4700,
    distance_km: 3.2,
    duration_min: 12
  },
  {
    shelter_id: "S003",
    latitude: 17.4150,
    longitude: 78.4950,
    distance_km: 2.5,
    duration_min: 9
  }
];

export const mockRouteData = {
  shelter_id: "S001",
  distance_km: 1.8,
  duration_min: 7
};

export const mockHelpRequests = [
  {
    request_id: "REQ-01",
    building_id: "B001",
    latitude: 17.3840,
    longitude: 78.4870,
    risk_level: "High",
    status: "Pending",
    message: "Flood water entering ground floor, need evacuation support"
  },
  {
    request_id: "REQ-02",
    building_id: "B004",
    latitude: 17.3750,
    longitude: 78.5000,
    risk_level: "Critical",
    status: "In Progress",
    message: "Senior citizens requiring medical emergency evacuation"
  },
  {
    request_id: "REQ-03",
    building_id: "B002",
    latitude: 17.3950,
    longitude: 78.4747,
    risk_level: "Medium",
    status: "Resolved",
    message: "Family evacuated to safe zone S001"
  }
];

export const mockCitizenLocation = {
  latitude: 17.3855,
  longitude: 78.4870
};
