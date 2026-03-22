"use client";

import LuxChat from "../../components/LuxChat";

export default function LuxDashboard() {
  return (
    <main className="main" style={{ display: "flex", gap: "24px", height: "calc(100vh - 100px)", padding: "24px 28px" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "24px", maxWidth: "300px" }}>
        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "16px", padding: "24px", boxShadow: "0 4px 24px rgba(0,0,0,0.4)" }}>
          <h2 style={{ fontSize: "16px", color: "var(--accent-teal)", display: "flex", alignItems: "center", gap: "8px" }}>
            <span>🧠</span> Command Center
          </h2>
          <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "12px", lineHeight: "1.6" }}>
            DLX Studios main thinking partner. Reflect, distill, and move.
          </p>
          
          <div style={{ marginTop: "24px", padding: "12px", background: "rgba(0,0,0,0.2)", borderRadius: "8px", border: "1px solid var(--border)" }}>
            <div style={{ fontSize: "11px", color: "var(--accent-teal)", fontWeight: "bold", marginBottom: "8px", textTransform: "uppercase" }}>Active Modules</div>
            <ul style={{ fontSize: "11px", color: "var(--text-secondary)", listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "6px" }}><span style={{ color: "var(--accent-teal)" }}>●</span> Web Search Grounding</li>
              <li style={{ display: "flex", alignItems: "center", gap: "6px" }}><span style={{ color: "var(--accent-teal)" }}>●</span> Python Engine</li>
              <li style={{ display: "flex", alignItems: "center", gap: "6px" }}><span style={{ color: "var(--accent-teal)" }}>●</span> Local Memory Stream</li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{ flex: 2, display: "flex", flexDirection: "column" }}>
        <LuxChat fullMode={true} agentId="lux" />
      </div>
    </main>
  );
}
