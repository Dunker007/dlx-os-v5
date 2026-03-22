"use client";

import LuxChat from "../../../components/LuxChat";

export default function QPLDashboard() {
  return (
    <main className="main" style={{ display: "flex", gap: "24px", height: "calc(100vh - 100px)", padding: "24px 28px" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "24px", maxWidth: "300px" }}>
        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "16px", padding: "24px", boxShadow: "0 4px 24px rgba(0,0,0,0.4)" }}>
          <h2 style={{ fontSize: "16px", color: "var(--yellow)", display: "flex", alignItems: "center", gap: "8px" }}>
            <span>🎧</span> Chill Zone
          </h2>
          <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "12px", lineHeight: "1.6" }}>
            The mellow side of political rap. Ready to analyze the state of the world quietly.
          </p>
        </div>
      </div>

      <div style={{ flex: 2, display: "flex", flexDirection: "column" }}>
        <LuxChat fullMode={true} agentId="qpl" />
      </div>
    </main>
  );
}
