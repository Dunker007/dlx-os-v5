import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      height: "100vh", width: "100vw", display: "flex", flexDirection: "column", 
      alignItems: "center", justifyContent: "center", background: "var(--bg-base)",
      color: "var(--text-primary)", fontFamily: "var(--font-body)", gap: "20px"
    }}>
      <div style={{ fontSize: "64px", fontWeight: "700", opacity: 0.1, position: "absolute", zIndex: 0, userSelect: "none" }}>404</div>
      <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "600", color: "var(--accent-teal)", marginBottom: "8px" }}>Module Not Found</h2>
        <p style={{ color: "var(--text-muted)", maxWidth: "400px", margin: "0 auto", marginBottom: "24px", lineHeight: "1.6" }}>
          The requested path is dead. This sub-system hasn't been built yet or has been removed from DLX-OS V5.
        </p>
        <Link 
          href="/mission-control" 
          style={{
            display: "inline-block", padding: "12px 24px", background: "rgba(0, 212, 170, 0.1)", 
            color: "var(--accent-teal)", border: "1px solid rgba(0, 212, 170, 0.3)", borderRadius: "8px", 
            fontWeight: "600", textDecoration: "none", transition: "all 0.2s"
          }}
        >
          Return to Mission Control
        </Link>
      </div>
    </div>
  );
}
