"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ConstructionStub() {
  const pathname = usePathname();
  const moduleName = pathname.replace('/', '').toUpperCase();

  return (
    <main style={{ 
      height: "calc(100vh - 80px)", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      flexDirection: "column",
      gap: "24px"
    }}>
      <div style={{
        background: "rgba(0,0,0,0.4)",
        border: "1px dashed var(--accent-teal)",
        borderRadius: "16px",
        padding: "48px",
        textAlign: "center",
        maxWidth: "400px"
      }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>🚧</div>
        <h1 style={{ fontSize: "24px", color: "var(--text-primary)", marginBottom: "8px", letterSpacing: "1px" }}>
          MODULE {moduleName} OFFLINE
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: "1.6", marginBottom: "32px" }}>
          This sector of DLX OS V5 is currently under active construction. The underlying infrastructure has not yet been merged to the master branch.
        </p>
        <Link 
          href="/mission-control"
          style={{
            background: "rgba(0, 240, 255, 0.1)",
            border: "1px solid rgba(0, 240, 255, 0.2)",
            color: "var(--accent-teal)",
            textDecoration: "none",
            padding: "12px 24px",
            borderRadius: "8px",
            fontSize: "13px",
            textTransform: "uppercase",
            letterSpacing: "1px",
            transition: "all 0.2s"
          }}
        >
          Return to Mission Control
        </Link>
      </div>
    </main>
  );
}
