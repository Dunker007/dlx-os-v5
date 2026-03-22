"use client";

import LuxChat from "../../../components/LuxChat";

export default function NewsicianDashboard() {
  return (
    <main className="main" style={{ display: "flex", gap: "24px", height: "calc(100vh - 100px)", padding: "24px 28px" }}>
      {/* Left Column: Asset Pipeline details (placeholder for now) */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "24px", maxWidth: "300px" }}>
        
        <div style={{
          background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "16px", padding: "24px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.4)"
        }}>
          <h2 style={{ fontSize: "16px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px", color: "var(--text-primary)" }}>
            <span style={{ color: "var(--red)" }}>🎸</span> Active Track
          </h2>
           <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ fontSize: "13px", color: "var(--red)" }}>N_SongName_v1.md</div>
            <div style={{ height: "4px", background: "rgba(255,255,255,0.1)", borderRadius: "2px" }}>
              <div style={{ height: "100%", width: "20%", background: "var(--red)", borderRadius: "2px", boxShadow: "0 0 8px var(--red)" }}></div>
            </div>
            <div style={{ fontSize: "11px", color: "var(--text-muted)", textAlign: "right" }}>Drafting Lyrics</div>
            
            <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
               <button style={{ flex: 1, padding: "8px", background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.2)", color: "var(--red)", borderRadius: "8px", fontSize: "12px", cursor: "pointer", transition: "all 0.2s" }} onMouseOver={e => e.currentTarget.style.background = "rgba(239, 68, 68, 0.2)"} onMouseOut={e => e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)"}>Save to GDrive</button>
            </div>
          </div>
        </div>

        <div style={{
          background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "16px", padding: "24px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.4)"
        }}>
          <h2 style={{ fontSize: "14px", marginBottom: "12px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>
            Style Rules
          </h2>
          <ul style={{ fontSize: "12px", color: "var(--text-secondary)", paddingLeft: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <li>No generic rhymes</li>
            <li>Incorporate live political news</li>
            <li>Maintain raw stream-of-consciousness format</li>
          </ul>
        </div>

      </div>

      {/* Right Column: The actual Agent Chat Engine */}
      <div style={{ flex: 2, display: "flex", flexDirection: "column" }}>
        <LuxChat fullMode={true} agentId="newsician" />
      </div>
    </main>
  );
}
