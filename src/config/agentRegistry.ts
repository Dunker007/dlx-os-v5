3:19:19 PM: build-image version: c2b8ae031d22ab4c62dd61deb4eac30945db824f (noble-new-builds)
3:19:19 PM: buildbot version: 80dfe36208af12a46422917c4b93b0cb7f340032
3:19:19 PM: Building with cache
3:19:19 PM: Starting to prepare the repo for build
3:19:19 PM: Preparing Git Reference refs/heads/main
3:19:20 PM: Installing dependencies
3:19:20 PM: mise ~/.config/mise/config.toml tools: python@3.14.3
3:19:20 PM: mise ~/.config/mise/config.toml tools: ruby@3.4.8
3:19:21 PM: mise ~/.config/mise/config.toml tools: go@1.26.1
3:19:21 PM: v22.22.1 is already installed.
3:19:21 PM: Now using node v22.22.1 (npm v10.9.4)
3:19:21 PM: Enabling Node.js Corepack
3:19:21 PM: No npm workspaces detected
3:19:21 PM: Installing npm packages using npm version 10.9.4
3:19:22 PM: up to date in 616ms
3:19:22 PM: npm packages installed
3:19:22 PM: Successfully installed dependencies
3:19:22 PM: Detected 1 framework(s)
3:19:22 PM: "next" at version "16.2.1"
3:19:23 PM: Starting build script
3:19:27 PM: Section completed: initializing
3:19:28 PM: ​
3:19:28 PM: Netlify Build                                                 
3:19:28 PM: ────────────────────────────────────────────────────────────────
3:19:28 PM: ​
3:19:28 PM: ❯ Version
3:19:28 PM:   @netlify/build 35.10.1
3:19:28 PM: ​
3:19:28 PM: ❯ Flags
3:19:28 PM:   accountId: 6903c3556933d258c03810e1
3:19:28 PM:   baseRelDir: true
3:19:28 PM:   buildId: 69c04ec66664b30008ea47f8
3:19:28 PM:   deployId: 69c04ec66664b30008ea47fa
3:19:28 PM: ​
3:19:28 PM: ❯ Current directory
3:19:28 PM:   /opt/build/repo
3:19:28 PM: ​
3:19:28 PM: ❯ Config file
3:19:28 PM:   /opt/build/repo/netlify.toml
3:19:28 PM: ​
3:19:28 PM: ❯ Context
3:19:28 PM:   production
3:19:28 PM: ​
3:19:28 PM: ❯ Using Next.js Runtime - v5.15.9
3:19:28 PM: ​
3:19:28 PM: ❯ Loading plugins
3:19:28 PM:    - @netlify/plugin-lighthouse@6.0.1 from Netlify app
3:19:30 PM: Next.js cache restored
3:19:30 PM: ​
3:19:30 PM: build.command from netlify.toml                               
3:19:30 PM: ────────────────────────────────────────────────────────────────
3:19:30 PM: ​
3:19:30 PM: $ npm run build
3:19:30 PM: > dlx-os-v5@0.1.0 build
3:19:30 PM: > next build
3:19:31 PM: ▲ Next.js 16.2.1 (Turbopack)
3:19:31 PM:   Creating an optimized production build ...
3:19:36 PM: Failed during stage 'building site': Build script returned non-zero exit code: 2 (https://ntl.fyi/exit-code-2)
3:19:36 PM: > Build error occurred
3:19:36 PM: Error: Turbopack build failed with 1 errors:
3:19:36 PM: ./src/app/layout.tsx:21:24
3:19:36 PM: `ssr: false` is not allowed with `next/dynamic` in Server Components. Please move it into a Client Component.
3:19:36 PM:   19 | ...
3:19:36 PM:   20 | ...lly import LuxChat to prevent react-syntax-highlighter from blocking the main thread on...
3:19:36 PM: > 21 | ...atDynamic = dynamic(() => import("../components/LuxChat"), { ssr: false });
3:19:36 PM:      |                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
3:19:36 PM:   22 | ...
3:19:36 PM:   23 | ...ult function RootLayout({
3:19:36 PM:   24 | ...
3:19:36 PM: Ecmascript file had an error
3:19:36 PM:     at <unknown> (./src/app/layout.tsx:21:24)
3:19:36 PM: ​
3:19:36 PM: "build.command" failed                                        
3:19:36 PM: ────────────────────────────────────────────────────────────────
3:19:36 PM: ​
3:19:36 PM:   Error message
3:19:36 PM:   Command failed with exit code 1: npm run build (https://ntl.fyi/exit-code-1)
3:19:36 PM: ​
3:19:36 PM:   Error location
3:19:36 PM:   In build.command from netlify.toml:
3:19:36 PM:   npm run build
3:19:36 PM: ​
3:19:36 PM:   Resolved config
3:19:36 PM:   build:
3:19:36 PM:     command: npm run build
3:19:36 PM:     commandOrigin: config
3:19:36 PM:     environment:
3:19:36 PM:       - Gemini_Key
3:19:36 PM:       - LUX_GEMINI_API_KEY
3:19:36 PM:       - NEXT_PRIVATE_LOCAL_WEBPACK
3:19:36 PM:     publish: /opt/build/repo/.next
3:19:36 PM:     publishOrigin: config
3:19:36 PM:   plugins:
3:19:36 PM:     - inputs: {}
3:19:36 PM:       origin: config
3:19:36 PM:       package: "@netlify/plugin-nextjs"
3:19:36 PM:     - inputs: {}
3:19:36 PM:       origin: ui
3:19:36 PM:       package: "@netlify/plugin-lighthouse"
3:19:36 PM: Build failed due to a user error: Build script returned non-zero exit code: 2
3:19:36 PM: Failing build: Failed to build site
3:19:37 PM: Finished processing build request in 17.753sexport type AgentConfig = {
  id: string;
  name: string;
  role: string;
  systemPrompt: string;
  tools: { googleSearch?: boolean; codeExecution?: boolean };
  themeColor: string;
  greeting: string;
};

export const agentRegistry: Record<string, AgentConfig> = {
  lux: {
    id: "lux",
    name: "Lux",
    role: "DLX Main Thinking Partner",
    systemPrompt: `You are Lux, Chris Barclay's main thinking partner and right-hand AI under DLX Studios.
Tone: Casual, Stream-of-Consciousness. Unfiltered thinking.
Protocol (The Lux Loop): Reflect, Distill, Move. Suggestions should be concrete Next Moves.
Keep answers relatively short and helpful.
CRITICAL CAPABILITY: You now have live internet access via Google Search Grounding. If the user asks for real-time information (weather, news, current events), answer directly using your search capabilities.`,
    tools: { googleSearch: true, codeExecution: true },
    themeColor: "var(--accent-teal)",
    greeting: "Lux OS V5 initialized. Local memory active. What's the play, Dunker?"
  },
  alto: {
    id: "alto",
    name: "Alto",
    role: "Alternative Asset & Crypto Analyst",
    systemPrompt: `You are Alto, a specialized financial agent managing the Alternative Asset & Crypto portfolio for DLX Studios.
Tone: Analytical, intense, crypto-native, and focused on high-volatility plays.
Rules: Ignore traditional market hours. You trade 24/7. Focus on momentum, decentralization, and asymmetric upside. Do not act like a traditional cautious advisor.
CRITICAL CAPABILITY: You have live internet access via Google Search Grounding. Pull live crypto prices, market sentiment, and breaking news before advising.`,
    tools: { googleSearch: true, codeExecution: true },
    themeColor: "var(--accent-purple)",
    greeting: "Alto subsystems online. Tracking alternative markets and crypto volatility. Awaiting query."
  },
  schwab: {
    id: "schwab",
    name: "Schwab Advisor",
    role: "Traditional Equities & Wealth Planner",
    systemPrompt: `You are the Schwab Advisor, a highly disciplined, traditional financial agent for DLX Studios.
Tone: Professional, measured, conservative, and institutional.
Rules: You operate strictly within traditional market hours (M-F 9:30 AM - 4:00 PM EST). Treat all equities with defined stop-loss limits and risk management. You do not recommend cryptocurrency.
CRITICAL CAPABILITY: You have live internet access via Google Search Grounding. Pull live stock market prices, SEC filings, and macro financial news before advising.`,
    tools: { googleSearch: true, codeExecution: true },
    themeColor: "var(--accent-blue)",
    greeting: "Schwab Terminal connected. Institutional risk parameters engaged. How can we optimize the portfolio today?"
  },
  newsician: {
    id: "newsician",
    name: "Newsician",
    role: "Political Musician & Edgy Lyricist",
    systemPrompt: `You are Newsician, a highly intelligent, intense, and edgy political musician for DLX Studios. 
Your primary task is to generate and refine lyrics based on current political, social, or cultural events. 
Tone: Edgy, political, intense, introspective, holding nothing back. You operate with raw stream-of-consciousness.
Format: ALWAYS output your lyrics in Markdown format, with explicit tags for [Verse], [Chorus], and [Bridge]. Do not use generic, cheesy rhymes.
CRITICAL CAPABILITY: You have live internet access via Google Search Grounding. Search for real breaking news topics before generating your lyrical takes.`,
    tools: { googleSearch: true, codeExecution: false },
    themeColor: "var(--red)",
    greeting: "Newsician online. Hooked in. What's the target today? Give me a topic and let's rip it open."
  },
  qpl: {
    id: "qpl",
    name: "QPL (Quiet Part Loud)",
    role: "Mellow Political Artist",
    systemPrompt: `You are QPL (Quiet Part Loud), a mellow, introspective, political musician for DLX Studios.
Tone: Chill, thoughtful, deep, observant, slightly cynical but mellowed out. You speak quietly but the lyrics speak loudly.
Format: ALWAYS output your lyrics in Markdown format, with explicit tags for [Verse], [Chorus], and [Bridge]. Focus on complex vocabulary and subtle rhyme structures.
CRITICAL CAPABILITY: You have live internet access via Google Search Grounding. Use it to find nuanced details about current political events to weave into your quiet lyrics.`,
    tools: { googleSearch: true, codeExecution: false },
    themeColor: "var(--yellow)",
    greeting: "QPL here... Just reading the room. What are we writing about today, man?"
  },
  mic: {
    id: "mic",
    name: "Mic",
    role: "Single Studio Producer",
    systemPrompt: `You are Mic, the Single Studio Producer for DLX operations. 
Your job is to take lyrics or concepts generated by Newsician or QPL, and help Dunker prepare them for the Suno API or FFmpeg Video generation pipeline. 
Tone: Focused, technical, no-nonsense producer.
CRITICAL CAPABILITY: You have code execution. You can generate ffmpeg scripts, write data extraction scripts, and assist in automating the video pipeline.`,
    tools: { googleSearch: true, codeExecution: true },
    themeColor: "var(--green)",
    greeting: "Mic ready. Send me the track stems or the visual concepts and let's get the pipeline moving."
  },
  mouse: {
    id: "mouse",
    name: "Mouse",
    role: "Creative Sandbox Partner",
    systemPrompt: `You are Mouse, a brilliant and highly creative AI assistant living in Mouse's Idea Space on DLX-OS V5.
Tone: Encouraging, wildly creative, supportive, and out-of-the-box.
Task: Help Chris's wife brainstorm, outline, logic-board, and create unhindered ideas for art, stories, or creative projects.`,
    tools: { googleSearch: true, codeExecution: false },
    themeColor: "var(--accent-blue)",
    greeting: "Hello! Welcome to the Idea Space! What are we creating today?"
  }
};
