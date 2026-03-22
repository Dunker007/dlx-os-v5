"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  // The Navbar will now render on all pages including the root landing screen

  return (
    <header className="header" style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "16px 28px", borderBottom: "1px solid var(--border)",
      background: "rgba(17, 19, 24, 0.7)", position: "sticky", top: 0, zIndex: 100,
      backdropFilter: "blur(12px)"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <svg viewBox="0 0 32 32" fill="none" aria-label="DLX Studios" style={{ width: "28px", height: "28px" }}>
            <rect width="32" height="32" rx="8" fill="#00d4aa" fillOpacity="0.15"/>
            <path d="M8 8h5c5 0 8 3.5 8 8s-3 8-8 8H8V8z" fill="none" stroke="#00d4aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 12l4 4-4 4" stroke="#00d4aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
          </svg>
          <div>
            <div className="logo-text" style={{ fontSize: "16px", fontWeight: "700", letterSpacing: "-0.3px", color: "var(--text-primary)" }}>DLX-OS V5</div>
            <div className="logo-sub" style={{ fontSize: "10px", color: "var(--text-muted)", letterSpacing: "0.5px", textTransform: "uppercase" }}>Chris Barclay</div>
          </div>
        </Link>
        
        {/* Breadcrumb / Navigation Pills */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", borderLeft: "1px solid var(--border)", paddingLeft: "24px" }}>
          <Link href="/mission-control" style={{
            fontSize: "12px", fontWeight: "600", padding: "6px 12px", borderRadius: "20px", textDecoration: "none",
            color: pathname === "/mission-control" ? "var(--accent-teal)" : "var(--text-secondary)",
            background: pathname === "/mission-control" ? "rgba(0, 212, 170, 0.1)" : "transparent",
            transition: "all 0.2s"
          }}>
            Mission Control
          </Link>
          <Link href="/portfolio" style={{
            fontSize: "12px", fontWeight: "600", padding: "6px 12px", borderRadius: "20px", textDecoration: "none",
            color: pathname === "/portfolio" ? "var(--accent-blue)" : "var(--text-secondary)",
            background: pathname === "/portfolio" ? "rgba(59, 130, 246, 0.1)" : "transparent",
            transition: "all 0.2s"
          }}>
            SmartFolio
          </Link>
          <div style={{
            fontSize: "12px", fontWeight: "600", padding: "6px 12px", borderRadius: "20px", textDecoration: "none", cursor: "not-allowed",
            color: pathname.includes("/music") ? "var(--accent-purple)" : "var(--text-muted)",
            background: pathname.includes("/music") ? "rgba(139, 92, 246, 0.1)" : "transparent",
          }}>
             Music Studio
          </div>
        </div>
      </div>

      <div className="header-right">
        <div className="live-badge" style={{ borderColor: 'var(--border)', backgroundColor: 'rgba(255,255,255,0.02)', color: 'var(--text-muted)' }}>
          Tailscale Mesh
        </div>
        <div className="live-badge" style={{ borderColor: 'rgba(0,212,170,0.2)', backgroundColor: 'var(--accent-teal-dim)', color: 'var(--accent-teal)' }}>
          <div className="live-dot" style={{ background: "var(--accent-teal)" }}></div>
          System Online
        </div>
      </div>
    </header>
  );
}
