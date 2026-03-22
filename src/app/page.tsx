"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

// Dynamically import LuxChat to prevent react-syntax-highlighter from breaking the build
const LuxChat = dynamic(() => import("../components/LuxChat"), { ssr: false });

export default function Desktop() {
  return (
    <div style={{
      minHeight: "calc(100vh - 73px)", width: "100%", padding: "40px",
      display: "flex", gap: "32px", justifyContent: "center", alignItems: "flex-start",
      position: "relative", overflowY: "auto", overflowX: "hidden"
    }}>
      {/* Purple & Teal Flood Light Atmosphere */}
      <div style={{
        position: "absolute", top: "-20%", left: "-10%",
        width: "70vw", height: "70vw",
        background: "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 60%)",
        filter: "blur(60px)", zIndex: -1, pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", bottom: "-20%", right: "-10%",
        width: "70vw", height: "70vw",
        background: "radial-gradient(circle, rgba(0, 212, 170, 0.1) 0%, transparent 60%)",
        filter: "blur(60px)", zIndex: -1, pointerEvents: "none"
      }} />

      {/* LEFT COLUMN: GDrive & Mission Control */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "320px", zIndex: 10 }}>
        
        {/* Drive Widget */}
        <div style={{
          background: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(16px)", 
          border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", padding: "24px",
          color: "#fff", boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
        }}>
          <h2 style={{ fontSize: "16px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" fillOpacity="0.8">
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.36 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
            </svg>
            GDrive Operations
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {["_Dropbox/", "Artists/Newsician/", "Artists/QPL/", "Video/Cuts/"].map((folder, i) => (
              <div key={folder} style={{
                padding: "10px 14px", background: "rgba(255,255,255,0.05)", borderRadius: "10px",
                fontSize: "13px", cursor: "pointer", transition: "all 0.2s",
                display: "flex", alignItems: "center", gap: "10px"
              }} 
              onMouseOver={e => { e.currentTarget.style.background = "rgba(0,212,170,0.15)"; e.currentTarget.style.color = "var(--accent-teal)" }} 
              onMouseOut={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#fff" }}>
                <span style={{ opacity: 0.5 }}>📁</span> {folder}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Navigate */}
        <Link href="/mission-control" style={{
           background: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(16px)", 
           border: "1px solid rgba(0,212,170,0.3)", borderRadius: "20px", padding: "16px 24px",
           color: "var(--accent-teal)", textDecoration: "none", display: "flex", justifyContent: "space-between", alignItems: "center",
           boxShadow: "0 8px 32px rgba(0,0,0,0.3)", transition: "all 0.2s"
        }}>
           <span style={{ fontSize: "14px", fontWeight: "600" }}>Mission Control Grid</span>
           <span>→</span>
        </Link>
      </div>

      {/* CENTER: Lux Agent Window */}
      <div style={{ flex: 1, minWidth: "400px", maxWidth: "450px", height: "calc(100vh - 153px)", zIndex: 10, display: "flex", flexDirection: "column" }}>
        <LuxChat fullMode={true} />
      </div>

      {/* RIGHT COLUMN: Finance & Music Status */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "320px", zIndex: 10 }}>
        
        <div style={{
          background: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(16px)", 
          border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", padding: "24px",
          color: "#fff", boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "16px", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
               <span>📈</span> SmartFolio
            </h2>
            <Link href="/portfolio" style={{ fontSize: "12px", color: "var(--accent-teal)", textDecoration: "none" }}>Open →</Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "16px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
              <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }}>BTC/USD</span>
              <span style={{ color: "var(--accent-green)", fontSize: "14px", fontWeight: "600" }}>$64,230.12 ▲</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }}>Schwab Bridge</span>
              <span style={{ color: "var(--accent-teal)", fontSize: "14px", fontWeight: "600" }}>Connected</span>
            </div>
          </div>
        </div>

        {/* Music Pipeline Widget */}
        <div style={{
          background: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(16px)", 
          border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", padding: "24px",
          color: "#fff", boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
        }}>
          <h2 style={{ fontSize: "16px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
            <span>🎧</span> Studio Pipeline
          </h2>
           <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ fontSize: "13px", color: "var(--accent-purple)" }}>N_SongName_v1.md</div>
            <div style={{ height: "4px", background: "rgba(255,255,255,0.1)", borderRadius: "2px" }}>
              <div style={{ height: "100%", width: "40%", background: "var(--accent-purple)", borderRadius: "2px", boxShadow: "0 0 8px var(--accent-purple)" }}></div>
            </div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", textAlign: "right" }}>Lyrics Locked</div>
            
            <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
               <button style={{ flex: 1, padding: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", borderRadius: "8px", fontSize: "12px", cursor: "pointer", transition: "all 0.2s" }} onMouseOver={e => e.currentTarget.style.borderColor = "var(--accent-teal)"} onMouseOut={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}>Suno Prep</button>
               <button style={{ flex: 1, padding: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", borderRadius: "8px", fontSize: "12px", cursor: "pointer", transition: "all 0.2s" }} onMouseOver={e => e.currentTarget.style.borderColor = "var(--accent-teal)"} onMouseOut={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}>Video Bridge</button>
            </div>
          </div>
        </div>

      </div>
      
    </div>
  );
}
