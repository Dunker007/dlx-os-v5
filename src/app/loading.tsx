export default function Loading() {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      height: "100vh", width: "100vw", background: "var(--bg-base)", color: "var(--accent-teal)"
    }}>
      {/* Cool pulse effect */}
      <div style={{ position: "relative", width: "80px", height: "80px" }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          border: "4px solid rgba(0,212,170,0.1)", borderRadius: "50%",
        }}></div>
        <div className="loader-ring" style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          border: "4px solid transparent", borderTopColor: "var(--accent-teal)", 
          borderRadius: "50%", animation: "spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite"
        }}></div>
      </div>
      <div style={{ marginTop: "24px", fontSize: "14px", fontWeight: "600", letterSpacing: "1px", color: "var(--text-muted)", textTransform: "uppercase" }}>
        Mounting OS Modules...
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
