"use client";

import Link from "next/link";
import { missionCategories } from "../../config/missionConfig";

export default function Home() {

  return (
    <>
      <header className="header">
        <div className="logo">
          <svg viewBox="0 0 32 32" fill="none" aria-label="DLX Studios">
            <rect width="32" height="32" rx="8" fill="#00d4aa" fillOpacity="0.15"/>
            <path d="M8 8h5c5 0 8 3.5 8 8s-3 8-8 8H8V8z" fill="none" stroke="#00d4aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 12l4 4-4 4" stroke="#00d4aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
          </svg>
          <div>
            <div className="logo-text">DLX-OS V5</div>
            <div className="logo-sub">Chris Barclay · Couch Terminal</div>
          </div>
        </div>
        <div className="header-right">
          <div className="live-badge" style={{ borderColor: 'rgba(59,130,246,0.2)', backgroundColor: 'var(--accent-blue-dim)', color: 'var(--accent-blue)' }}>
            System Online
          </div>
        </div>
      </header>

      <main className="main" style={{ minHeight: "80vh", display: "flex", flexDirection: "column", gap: "24px" }}>
        
        {/* Quick Stats Banner */}
        <div className="card" style={{ padding: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "linear-gradient(90deg, var(--bg-card), var(--bg-surface))" }}>
          <div>
            <h1 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "8px", letterSpacing: "-0.5px" }}>Mission Control</h1>
            <p style={{ color: "var(--text-muted)", fontSize: "14px", maxWidth: "400px" }}>
              All DLX Studios operational systems, assets, and AI pipelines routed through your local Tailscale mesh.
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>Active Task</div>
            <div style={{ fontSize: "16px", color: "var(--accent-teal)", fontWeight: "600" }}>Monitoring Local Models & Pipelines</div>
          </div>
        </div>

        {/* Masonry / Homepage.dev Vibe Grid */}
        <div className="grid-3col" style={{ gap: "20px" }}>
          {missionCategories.map((cat, idx) => (
            <div key={idx} className="card" style={{ display: "flex", flexDirection: "column" }}>
              <div className="card-header" style={{ padding: "16px", borderBottom: "1px solid var(--border)" }}>
                <div className="card-title" style={{ fontSize: "14px" }}>{cat.title}</div>
                <span className={`card-badge ${cat.color}`}>{cat.badge}</span>
              </div>
              <div className="card-body" style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
                {cat.links.map((link, i) => (
                  <div key={i} style={{ 
                    display: "flex", alignItems: "center", padding: "12px 16px", 
                    borderRadius: "8px", background: "var(--bg-elevated)", border: "1px solid var(--border)",
                    transition: "all 0.2s", cursor: "pointer"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.borderColor = `var(--accent-${cat.color})`}
                  onMouseOut={(e) => e.currentTarget.style.borderColor = "var(--border)"}
                  >
                    <div style={{ flex: 1 }}>
                      {link.external ? (
                        <a href={link.path} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }}>
                          <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-primary)", marginBottom: "4px" }}>{link.name}</div>
                          <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{link.desc}</div>
                        </a>
                      ) : (
                        <Link href={link.path} style={{ textDecoration: "none", display: "block" }}>
                          <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-primary)", marginBottom: "4px" }}>{link.name}</div>
                          <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{link.desc}</div>
                        </Link>
                      )}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      {/* @ts-ignore - Repo property is optional */}
                      {link.repo && (
                        <a href={(link as any).repo} target="_blank" rel="noopener noreferrer" style={{ 
                          fontSize: "10px", padding: "4px 8px", borderRadius: "12px", 
                          background: "var(--bg-surface)", border: "1px solid var(--border)",
                          color: "var(--text-primary)", textDecoration: "none", fontWeight: "600",
                          letterSpacing: "0.5px"
                        }}>
                          REPO
                        </a>
                      )}
                      <div style={{ 
                        fontSize: "10px", textTransform: "uppercase", padding: "4px 8px", 
                        borderRadius: "12px", background: "rgba(255,255,255,0.05)", color: "var(--text-secondary)",
                        letterSpacing: "0.5px", fontWeight: "600"
                      }}>
                        {link.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </main>
    </>
  );
}
