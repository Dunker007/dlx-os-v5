"use client";

import LuxChat from "../../../components/LuxChat";

export default function MicDashboard() {
  return (
    <main className="main" style={{ display: "flex", gap: "24px", height: "calc(100vh - 100px)", padding: "24px 28px" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "24px", maxWidth: "300px" }}>
        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "16px", padding: "24px", boxShadow: "0 4px 24px rgba(0,0,0,0.4)" }}>
          <h2 style={{ fontSize: "16px", color: "var(--green)", display: "flex", alignItems: "center", gap: "8px" }}>
            <span>🎬</span> Production Pipeline
          </h2>
          <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "12px", lineHeight: "1.6" }}>
            Awaiting stems and visuals. Ask Mic about FFmpeg commands or Suno API routing.
          </p>
        </div>
      </div>

      <div style={{ flex: 2, display: "flex", flexDirection: "column" }}>
        <LuxChat fullMode={true} agentId="mic" />
      </div>
    </main>
  );
}
