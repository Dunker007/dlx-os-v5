export const missionCategories = [
  {
    title: "DLX Operations",
    badge: "Pipeline",
    color: "teal",
    links: [
      { name: "Nexus Dashboard", desc: "Main operation loop", path: "/nexus", status: "online" },
      { name: "Music & Video Studio", desc: "Suno, FFmpeg & Video Pipeline", path: "/music", status: "online" },
      { name: "Bookmarks", desc: "Internal Saved References", path: "/bookmarks", status: "resource" },
    ]
  },
  {
    title: "Financial OS",
    badge: "Wealth",
    color: "blue",
    links: [
      { name: "SmartFolio", desc: "Schwab + Crypto Dash", path: "/portfolio", status: "online" },
      { name: "Alto Crypto/Alts", desc: "Alternative assets", path: "/alto", status: "standby" },
      { name: "Financial News", desc: "Market & News Radar", path: "/news", status: "online" },
    ]
  },
  {
    title: "The Roster",
    badge: "Agents",
    color: "purple",
    links: [
      { name: "Lux", desc: "Main Thinking Partner", path: "/lux", status: "agent" },
      { name: "Newsician", desc: "Edgy/Political Artist", path: "/artists/newsician", status: "agent" },
      { name: "QPL", desc: "Mellow/Political Artist", path: "/artists/qpl", status: "agent" },
      { name: "Mic", desc: "Single Studio Producer", path: "/artists/mic", status: "agent" },
      { name: "Mouse's Space", desc: "Creative sandbox", path: "/mouse", status: "creative" },
      { name: "Schwab Advisor", desc: "Financial planning", path: "/schwab", status: "agent" },
      { name: "Alto", desc: "Crypto / Alts planning", path: "/alto", status: "agent" },
    ]
  },
  {
    title: "Domain Fleet",
    badge: "Registry",
    color: "green",
    links: [
      { name: "dlxstudios.ai", desc: "Core AI hub", path: "https://dlxstudios.ai", external: true, status: "live", repo: "https://github.com/Dunker007/dlx-os-v5" },
      { name: "dlxstudios.online", desc: "Legacy OS / Forwarder", path: "https://dlxstudios.online", external: true, status: "live" },
      { name: "dunkerlux.live", desc: "Wife's / Project Space", path: "https://dunkerlux.live", external: true, status: "live" },
      { name: "mnfraudwatch.org", desc: "MN Fraud Watch", path: "https://mnfraudwatch.org", external: true, status: "live", repo: "https://github.com/Dunker007/MN-State-Fraud-Case" },
      { name: "paidleavewatch.org", desc: "Paid Leave Watch", path: "https://paidleavewatch.org", external: true, status: "live", repo: "https://github.com/Dunker007/MN-State-Fraud-Case" },
      { name: "powerplaypress.org", desc: "Power Play Press", path: "https://powerplaypress.org", external: true, status: "live", repo: "https://github.com/Dunker007/MN-State-Fraud-Case" },
      { name: "projectcrosscheck.org", desc: "Project Crosscheck", path: "https://projectcrosscheck.org", external: true, status: "live", repo: "https://github.com/Dunker007/MN-State-Fraud-Case" },
    ]
  },
  {
    title: "Hardware / Engine",
    badge: "Local",
    color: "yellow",
    links: [
      { name: "LuxRig Host", desc: "100.74.x.x Mesh", path: "#", status: "active" },
      { name: "Ollama LLMs", desc: "qwen3:8b @ :11434", path: "http://localhost:11434", external: true, status: "active" },
      { name: "LM Studio", desc: "qwen/claude @ 100.74.x.x:1234", path: "http://100.74.130.117:1234", external: true, status: "active" },
      { name: "Tailscale", desc: "VPN / Network Admin", path: "#", status: "secured" },
    ]
  }
];
