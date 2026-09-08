// App.jsx — Task 2
// Main application container with view switching (Citizen / Responder)
// Uses HashRouter for seamless GitHub Pages compatibility without 404s.

import { useState } from "react";
import CitizenView from "./CitizenView";
import ResponderView from "./ResponderView";
import "./App.css";

export default function App() {
  const [activeTab, setActiveTab] = useState("citizen");

  return (
    <div className="raksha-app">
      {/* Header */}
      <header className="raksha-header">
        <div className="header-brand">
          <span className="brand-icon">🛡️</span>
          <div>
            <h1 className="brand-title">RAKSHA</h1>
            <p className="brand-tagline">Disaster Response & Evacuation System</p>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <nav className="header-tabs">
          <button
            type="button"
            className={`tab-btn ${activeTab === "citizen" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("citizen")}
          >
            🏠 Citizen View
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === "responder" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("responder")}
          >
            🚒 Responder View
          </button>
        </nav>
      </header>

      {/* Main View Area */}
      <main className="raksha-main">
        {activeTab === "citizen" ? <CitizenView /> : <ResponderView />}
      </main>
    </div>
  );
}
