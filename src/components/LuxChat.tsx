"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { agentRegistry } from '../config/agentRegistry';

const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: false });
const SyntaxHighlighter = dynamic(() => import('react-syntax-highlighter').then(mod => mod.Prism as any), { ssr: false });

// We default to "lux" so existing <LuxChat /> layouts continue to work natively
export default function AgentChat({ fullMode = false, agentId = "lux" }: { fullMode?: boolean; agentId?: string }) {
  const pathname = usePathname();
  const agent = agentRegistry[agentId] || agentRegistry["lux"];

  const DEFAULT_MESSAGE = { role: "lux" as const, content: agent.greeting };
  const memoryKey = `${agentId}_chat_history`;

  const [messages, setMessages] = useState<{ role: "user" | "lux"; content: string }[]>([DEFAULT_MESSAGE]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  // Hydrate exact agent memory from Local Storage
  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem(memoryKey);
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error(`${agent.name} memory corrupted, resetting.`);
      }
    }
  }, [memoryKey, agent.name]);

  // Save exact agent memory
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem(memoryKey, JSON.stringify(messages));
    }
  }, [messages, isMounted, memoryKey]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen, fullMode]);

  const clearMemory = () => {
    if (confirm(`Reset ${agent.name}'s memory?`)) {
      setMessages([DEFAULT_MESSAGE]);
      localStorage.removeItem(memoryKey);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setMessages(prev => {
      const newHistory = [...prev, { role: "user" as const, content: userMsg }];
      return newHistory;
    });
    
    setInput("");
    setIsLoading(true);

    try {
      const currentHistory = [...messages, { role: "user" as const, content: userMsg }];
      
      // Ping the new Universal Agent Route
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, history: currentHistory, agentId })
      });
      
      const data = await res.json();
      
      if (data.error) {
        setMessages(prev => [...prev, { role: "lux" as const, content: `System Error: ${data.error}` }]);
      } else {
        setMessages(prev => [...prev, { role: "lux" as const, content: data.reply }]);
      }
    } catch (err: any) {
      setMessages(prev => [...prev, { role: "lux" as const, content: "Connection severed. Check network or API key." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isMounted) return null;

  const renderChatBox = () => (
    <div className={fullMode ? "full-chat-widget" : "chat-widget"} style={fullMode ? {
      display: "flex", flexDirection: "column", height: "100%", width: "100%",
      background: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(12px)", 
      border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.5)", overflow: "hidden"
    } : {}}>
      <div style={{
        background: "rgba(0,0,0,0.4)", borderBottom: `1px solid ${agent.themeColor}33`,
        padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "8px", height: "8px", background: agent.themeColor, borderRadius: "50%", boxShadow: `0 0 10px ${agent.themeColor}` }}></div>
          <div>
            <span style={{ fontWeight: 600, color: "var(--text-primary)", letterSpacing: "0.5px", display: "block" }}>{agent.name} Terminal</span>
            <span style={{ fontSize: "10px", color: "var(--text-muted)", letterSpacing: "0.5px", textTransform: "uppercase" }}>{agent.role}</span>
          </div>
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button onClick={clearMemory} title="Clear Memory" style={{ background: "rgba(255,0,0,0.1)", border: "1px solid rgba(255,0,0,0.2)", color: "#ff4444", borderRadius: "4px", padding: "2px 8px", cursor: "pointer", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase" }}>Clear</button>
          {!fullMode && (
            <button onClick={() => setIsOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "16px" }}>✕</button>
          )}
        </div>
      </div>

      <div style={{
        padding: "16px", overflowY: "auto", flex: 1,
        display: "flex", flexDirection: "column", gap: "12px",
        height: fullMode ? "100%" : "400px"
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ 
            alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
            maxWidth: "90%",
            background: msg.role === "user" ? "rgba(255,255,255,0.05)" : `rgba(0,0,0,0.2)`,
            border: msg.role === "user" ? "1px solid rgba(255,255,255,0.1)" : `1px solid ${agent.themeColor}33`,
            padding: "12px 16px",
            borderRadius: "12px",
            color: msg.role === "user" ? "var(--text-primary)" : agent.themeColor,
            fontSize: "13px",
            lineHeight: "1.6",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            whiteSpace: msg.role === "user" ? "pre-wrap" : "normal"
          }}>
            {msg.role === "lux" ? (
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <div style={{ fontSize: "11px", borderRadius: "6px", overflow: "hidden", margin: "8px 0", border: `1px solid ${agent.themeColor}33` }}>
                        <div style={{ background: "rgba(0,0,0,0.5)", padding: "4px 12px", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", fontSize: "10px" }}>{match[1]}</div>
                        <SyntaxHighlighter style={vscDarkPlus as any} language={match[1]} PreTag="div" customStyle={{ margin: 0, padding: "12px", background: "rgba(0,0,0,0.3)" }} {...props}>{String(children).replace(/\n$/, '')}</SyntaxHighlighter>
                      </div>
                    ) : (
                      <code style={{ background: "rgba(255,255,255,0.1)", padding: "2px 6px", borderRadius: "4px", fontSize: "0.9em", color: "#fff" }} className={className} {...props}>{children}</code>
                    )
                  },
                  p: ({node, ...props}) => <p style={{margin: "0 0 8px 0"}} {...props} />,
                  ul: ({node, ...props}) => <ul style={{margin: "0 0 8px 0", paddingLeft: "20px"}} {...props} />,
                  ol: ({node, ...props}) => <ol style={{margin: "0 0 8px 0", paddingLeft: "20px"}} {...props} />,
                  li: ({node, ...props}) => <li style={{marginBottom: "4px"}} {...props} />,
                  strong: ({node, ...props}) => <strong style={{color: agent.themeColor, fontWeight: "bold"}} {...props} />
                }}
              >
                {msg.content}
              </ReactMarkdown>
            ) : (
              msg.content
            )}
          </div>
        ))}
        {isLoading && <div style={{ alignSelf: "flex-start", fontSize: "12px", color: "var(--text-muted)" }}>{agent.name} is parsing...</div>}
        <div ref={endRef} />
      </div>

      <div style={{ padding: "12px", borderTop: `1px solid ${agent.themeColor}33`, background: "rgba(0,0,0,0.2)", display: "flex", gap: "8px" }}>
        <textarea 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Send directive..."
          style={{ flex: 1, background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--text-primary)", padding: "10px 14px", borderRadius: "8px", resize: "none", outline: "none", fontFamily: "inherit", fontSize: "13px", height: "40px", transition: "all 0.2s" }}
          onFocus={(e) => e.target.style.borderColor = agent.themeColor}
          onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
        />
        <button 
          onClick={sendMessage}
          disabled={isLoading || !input.trim()}
          style={{ background: agent.themeColor, color: "#000", border: "none", borderRadius: "8px", padding: "0 16px", cursor: "pointer", fontWeight: 600, opacity: isLoading || !input.trim() ? 0.5 : 1, boxShadow: isLoading || !input.trim() ? "none" : `0 0 12px ${agent.themeColor}88` }}
        >
          SEND
        </button>
      </div>
    </div>
  );

  if (fullMode) {
    return renderChatBox();
  }

  // Prevent duplicate floating widget on the root welcome page
  if (pathname === "/") {
    return null;
  }

  return (
    <>
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          style={{
            position: "fixed", bottom: "24px", right: "28px",
            background: agent.themeColor, color: "#000",
            border: "none", borderRadius: "50%",
            width: "56px", height: "56px",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", boxShadow: `0 0 20px ${agent.themeColor}88`, zIndex: 1000,
            fontWeight: "bold", fontSize: "20px", transition: "transform 0.2s"
          }}
          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          {agent.name.charAt(0)}
        </button>
      )}

      {isOpen && renderChatBox()}
    </>
  );
}
