"use client";

import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("DLX OS V5 Caught Error:", error);
  }, [error]);

  return (
    <div style={{
      height: "100vh", width: "100vw", display: "flex", flexDirection: "column", 
      alignItems: "center", justifyContent: "center", background: "var(--bg-base)",
      color: "var(--text-primary)", fontFamily: "var(--font-body)", gap: "20px"
    }}>
      <div style={{ fontSize: "48px", color: "var(--red)" }}>⚠</div>
      <h2 style={{ fontSize: "24px", fontWeight: "600", letterSpacing: "-0.5px" }}>System Fault Detected</h2>
      <p style={{ color: "var(--text-muted)", maxWidth: "400px", textAlign: "center" }}>
        A critical error occurred in the DLX-OS rendering pipeline. The error has been logged to the terminal.
      </p>
      
      <div style={{ background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.2)", padding: "16px", borderRadius: "12px", color: "var(--red)", fontSize: "12px", fontFamily: "var(--font-mono)", maxWidth: "600px", overflowX: "auto" }}>
        {error.message || "Unknown Runtime Exception"}
      </div>

      <button
        onClick={() => reset()}
        style={{
          marginTop: "12px", padding: "12px 24px", background: "var(--accent-teal)", 
          color: "#000", border: "none", borderRadius: "8px", fontWeight: "600",
          cursor: "pointer", transition: "all 0.2s", boxShadow: "0 0 15px rgba(0, 212, 170, 0.3)"
        }}
      >
        Reboot Module
      </button>
    </div>
  );
}
