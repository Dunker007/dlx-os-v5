"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";

const AgentChat = dynamic(() => import("../../components/LuxChat"), { ssr: false });

// Pipeline stages with actions
const PIPELINE_STAGES = [
  {
    id: "lyrics",
    label: "Lyrics Locked",
    icon: "📝",
    action: null,
    color: "var(--accent-teal)",
  },
  {
    id: "cover",
    label: "Cover Art Generated",
    icon: "🎨",
    action: null,
    color: "var(--accent-purple)",
  },
  {
    id: "suno",
    label: "Suno Production",
    icon: "🎵",
    action: { label: "Open Suno", href: "https://suno.com" },
    color: "var(--accent-blue)",
  },
  {
    id: "gvids",
    label: "Google Vids Edit",
    icon: "🎬",
    action: { label: "Open GVids", href: "https://labs.google.com/videos" },
    color: "var(--yellow)",
  },
  {
    id: "vidiq",
    label: "VidIQ + SEO",
    icon: "📊",
    action: { label: "Open VidIQ", href: "https://vidiq.com" },
    color: "var(--accent-teal)",
  },
  {
    id: "distro",
    label: "DistroKid Distribution",
    icon: "🚀",
    action: { label: "Open DistroKid", href: "https://distrokid.com" },
    color: "var(--accent-green)",
  },
];

const VERSIONS = ["v1", "v2", "v3", "FINAL", "master"];

type Artist = "newsician" | "qpl";

export default function MusicStudio() {
  const [activeArtist, setActiveArtist] = useState<Artist>("newsician");
  const [songName, setSongName] = useState("");
  const [version, setVersion] = useState("v1");
  const [lyrics, setLyrics] = useState("");
  const [checkedStages, setCheckedStages] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const artistPrefix = activeArtist === "newsician" ? "N" : "Q";
  const fileName = songName.trim()
    ? `${artistPrefix}_${songName.trim().replace(/\s+/g, "_")}_${version}.md`
    : `${artistPrefix}_SongName_${version}.md`;

  const toggleStage = (id: string) => {
    setCheckedStages((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const copyToClipboard = useCallback(
    async (text: string, id: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
      } catch {
        /* clipboard blocked */
      }
    },
    []
  );

  const progress = Math.round((checkedStages.size / PIPELINE_STAGES.length) * 100);

  return (
    <main
      style={{
        display: "flex",
        height: "calc(100vh - 73px)",
        gap: "0",
        overflow: "hidden",
        background: "transparent",
      }}
    >
      {/* ─── LEFT: Agent Chat Rail ─── */}
      <div
        style={{
          width: "360px",
          minWidth: "320px",
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(10, 11, 15, 0.6)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Artist Switcher */}
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            flexShrink: 0,
          }}
        >
          {(["newsician", "qpl"] as Artist[]).map((id) => {
            const isActive = activeArtist === id;
            const color = id === "newsician" ? "var(--red)" : "var(--yellow)";
            const label = id === "newsician" ? "Newsician" : "QPL";
            return (
              <button
                key={id}
                onClick={() => setActiveArtist(id)}
                style={{
                  flex: 1,
                  padding: "14px",
                  background: isActive ? `${color}15` : "transparent",
                  border: "none",
                  borderBottom: isActive ? `2px solid ${color}` : "2px solid transparent",
                  color: isActive ? color : "rgba(255,255,255,0.4)",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  transition: "all 0.2s",
                }}
              >
                {id === "newsician" ? "🗞️" : "🎙️"} {label}
              </button>
            );
          })}
        </div>

        {/* Chat Widget */}
        <div style={{ flex: 1, overflow: "hidden", padding: "0" }}>
          <AgentChat fullMode agentId={activeArtist} />
        </div>
      </div>

      {/* ─── CENTER: Lyric Workbench ─── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(10, 11, 15, 0.4)",
        }}
      >
        {/* Workbench Header */}
        <div
          style={{
            padding: "14px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexShrink: 0,
            flexWrap: "wrap",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px" }}>
            Lyric Workbench
          </span>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <input
              value={songName}
              onChange={(e) => setSongName(e.target.value)}
              placeholder="Song name..."
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#fff",
                borderRadius: "6px",
                padding: "6px 12px",
                fontSize: "13px",
                outline: "none",
                width: "180px",
              }}
            />
            <select
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#fff",
                borderRadius: "6px",
                padding: "6px 10px",
                fontSize: "13px",
                outline: "none",
                cursor: "pointer",
              }}
            >
              {VERSIONS.map((v) => (
                <option key={v} value={v} style={{ background: "#0a0b0f" }}>
                  {v}
                </option>
              ))}
            </select>
            <div
              style={{
                padding: "6px 12px",
                background: "rgba(0,212,170,0.1)",
                border: "1px solid rgba(0,212,170,0.2)",
                borderRadius: "6px",
                fontSize: "11px",
                color: "var(--accent-teal)",
                fontFamily: "monospace",
                letterSpacing: "0.5px",
              }}
            >
              {fileName}
            </div>
          </div>

          {/* Copy Lyrics Button */}
          <button
            onClick={() => copyToClipboard(lyrics, "lyrics")}
            disabled={!lyrics.trim()}
            style={{
              padding: "6px 14px",
              background: copiedId === "lyrics" ? "rgba(0,212,170,0.2)" : "rgba(255,255,255,0.05)",
              border: `1px solid ${copiedId === "lyrics" ? "var(--accent-teal)" : "rgba(255,255,255,0.1)"}`,
              color: copiedId === "lyrics" ? "var(--accent-teal)" : "rgba(255,255,255,0.6)",
              borderRadius: "6px",
              fontSize: "11px",
              cursor: lyrics.trim() ? "pointer" : "not-allowed",
              opacity: lyrics.trim() ? 1 : 0.4,
              transition: "all 0.2s",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              flexShrink: 0,
            }}
          >
            {copiedId === "lyrics" ? "✓ Copied!" : "📋 Copy Lyrics"}
          </button>
        </div>

        {/* Lyric Editor */}
        <textarea
          value={lyrics}
          onChange={(e) => setLyrics(e.target.value)}
          placeholder={`Paste ${activeArtist === "newsician" ? "Newsician" : "QPL"}'s output here, then refine...\n\n[Verse]\n...\n\n[Chorus]\n...\n\n[Bridge]\n...`}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            color: "rgba(255,255,255,0.85)",
            padding: "20px 24px",
            fontSize: "14px",
            lineHeight: "1.8",
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            resize: "none",
            outline: "none",
            overflowY: "auto",
          }}
        />

        {/* Word / Line Count Bar */}
        <div
          style={{
            padding: "8px 20px",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            display: "flex",
            gap: "20px",
            flexShrink: 0,
          }}
        >
          {[
            { label: "Lines", val: lyrics ? lyrics.split("\n").filter(Boolean).length : 0 },
            { label: "Words", val: lyrics ? lyrics.trim().split(/\s+/).filter(Boolean).length : 0 },
            { label: "Chars", val: lyrics.length },
          ].map(({ label, val }) => (
            <span key={label} style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>
              {label}: <span style={{ color: "rgba(255,255,255,0.6)" }}>{val}</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── RIGHT: Pipeline Tracker ─── */}
      <div
        style={{
          width: "280px",
          minWidth: "260px",
          display: "flex",
          flexDirection: "column",
          background: "rgba(10, 11, 15, 0.6)",
          backdropFilter: "blur(12px)",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            flexShrink: 0,
          }}
        >
          <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px" }}>
            🎧 Pipeline Tracker
          </div>

          {/* Progress Bar */}
          <div style={{ height: "4px", background: "rgba(255,255,255,0.08)", borderRadius: "2px", overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: progress === 100 ? "var(--accent-green)" : "var(--accent-teal)",
                borderRadius: "2px",
                boxShadow: `0 0 8px ${progress === 100 ? "var(--accent-green)" : "var(--accent-teal)"}`,
                transition: "width 0.4s ease",
              }}
            />
          </div>
          <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", marginTop: "6px", textAlign: "right" }}>
            {checkedStages.size} / {PIPELINE_STAGES.length} stages
          </div>
        </div>

        {/* Stage List */}
        <div style={{ flex: 1, padding: "12px 16px", display: "flex", flexDirection: "column", gap: "8px" }}>
          {PIPELINE_STAGES.map((stage) => {
            const done = checkedStages.has(stage.id);
            return (
              <div
                key={stage.id}
                style={{
                  background: done ? `${stage.color}12` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${done ? stage.color + "40" : "rgba(255,255,255,0.07)"}`,
                  borderRadius: "10px",
                  padding: "12px 14px",
                  transition: "all 0.25s",
                }}
              >
                {/* Stage Row */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
                  onClick={() => toggleStage(stage.id)}
                >
                  {/* Checkbox */}
                  <div
                    style={{
                      width: "18px",
                      height: "18px",
                      borderRadius: "4px",
                      border: `2px solid ${done ? stage.color : "rgba(255,255,255,0.2)"}`,
                      background: done ? stage.color : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: "all 0.2s",
                    }}
                  >
                    {done && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M1.5 5L4 7.5L8.5 2.5" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>

                  <span style={{ fontSize: "12px" }}>{stage.icon}</span>

                  <span
                    style={{
                      fontSize: "12px",
                      color: done ? stage.color : "rgba(255,255,255,0.7)",
                      fontWeight: done ? 600 : 400,
                      textDecoration: done ? "none" : "none",
                      flex: 1,
                      transition: "color 0.2s",
                    }}
                  >
                    {stage.label}
                  </span>
                </div>

                {/* Quick Action Button */}
                {stage.action && (
                  <div style={{ marginTop: "8px", marginLeft: "28px" }}>
                    <a
                      href={stage.action.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-block",
                        fontSize: "10px",
                        padding: "4px 10px",
                        background: `${stage.color}15`,
                        border: `1px solid ${stage.color}30`,
                        borderRadius: "4px",
                        color: stage.color,
                        textDecoration: "none",
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                        transition: "all 0.2s",
                      }}
                    >
                      {stage.action.label} →
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Reset Pipeline */}
        <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.07)", flexShrink: 0 }}>
          <button
            onClick={() => {
              if (confirm("Reset pipeline checklist for a new track?")) {
                setCheckedStages(new Set());
                setSongName("");
                setVersion("v1");
                setLyrics("");
              }
            }}
            style={{
              width: "100%",
              padding: "8px",
              background: "rgba(255,60,60,0.07)",
              border: "1px solid rgba(255,60,60,0.15)",
              color: "rgba(255,100,100,0.7)",
              borderRadius: "8px",
              fontSize: "11px",
              cursor: "pointer",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "rgba(255,60,60,0.15)";
              e.currentTarget.style.color = "#ff6464";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "rgba(255,60,60,0.07)";
              e.currentTarget.style.color = "rgba(255,100,100,0.7)";
            }}
          >
            ↺ New Track / Reset Pipeline
          </button>
        </div>
      </div>
    </main>
  );
}
