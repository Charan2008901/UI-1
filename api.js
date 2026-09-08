// RAKSHA — Centralized FastAPI Service (Task 2)
// Handles frontend -> FastAPI backend integration.
// Uses exact agreed field names:
// building_id, risk_score, risk_level, latitude, longitude, shelter_id, distance_km, duration_min

import {
  mockRiskData,
  mockSafeZones,
  mockRouteData,
  mockHelpRequests
} from "./mockData";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

async function fetchFromApi(endpoint, fallbackData) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.warn(`[RAKSHA] API request to ${endpoint} failed, falling back to mock data:`, err.message);
    return fallbackData;
  }
}

// Fetch risk assessment data (from Task 1 / Task 4)
export async function getRiskData() {
  return fetchFromApi("/api/risk", mockRiskData);
}

// Fetch safe zones / shelter information
export async function getSafeZones() {
  return fetchFromApi("/api/safezones", mockSafeZones);
}

// Fetch evacuation route information (from Task 1 / Task 5)
export async function getRoute(latitude, longitude) {
  const query = (latitude !== undefined && longitude !== undefined)
    ? `?latitude=${latitude}&longitude=${longitude}`
    : "";
  return fetchFromApi(`/api/route${query}`, mockRouteData);
}

// Fetch assistance requests (from Task 1 / Task 6)
export async function getRequests() {
  return fetchFromApi("/api/requests", mockHelpRequests);
}
