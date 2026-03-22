"use client";

import LuxChat from "../../components/LuxChat";

export default function AltoDashboard() {
  return (
    <main className="main" style={{ display: "flex", gap: "24px", height: "calc(100vh - 100px)", padding: "24px 28px" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "24px", maxWidth: "300px" }}>
        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "16px", padding: "24px", boxShadow: "0 4px 24px rgba(0,0,0,0.4)" }}>
          <h2 style={{ fontSize: "16px", color: "var(--accent-purple)", display: "flex", alignItems: "center", gap: "8px" }}>
            <span>⚡</span> Crypto Tracker
          </h2>
          <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "12px", lineHeight: "1.6" }}>
            24/7 Volatility Radar. Unbound by traditional market trading hours.
          </p>
        </div>
      </div>

      <div style={{ flex: 2, display: "flex", flexDirection: "column" }}>
        <LuxChat fullMode={true} agentId="alto" />
      </div>
    </main>
  );
}
