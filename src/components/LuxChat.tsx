"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const DEFAULT_MESSAGE = { role: "lux" as const, content: "Lux OS V5 initialized. Local memory active. What's the play, Dunker?" };

export default function LuxChat({ fullMode = false }: { fullMode?: boolean }) {
  const pathname = usePathname();
  const [messages, setMessages] = useState<{ role: "user" | "lux"; content: string }[]>([DEFAULT_MESSAGE]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  // Phase Beta: Hydrate from Local Storage
  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("lux_chat_history");
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error("Memory corrupted, resetting Lux.");
      }
    }
  }, []);

  // Phase Beta: Save to Local Storage
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("lux_chat_history", JSON.stringify(messages));
    }
  }, [messages, isMounted]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen, fullMode]);

  const clearMemory = () => {
    if (confirm("Reset Lux Terminal memory?")) {
      setMessages([DEFAULT_MESSAGE]);
      localStorage.removeItem("lux_chat_history");
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    // Add user message to state
    setMessages(prev => {
      const newHistory = [...prev, { role: "user" as const, content: userMsg }];
      return newHistory;
    });
    
    setInput("");
    setIsLoading(true);

    try {
      // Must pass the updated array, since state is async
      const currentHistory = [...messages, { role: "user" as const, content: userMsg }];
      const res = await fetch("/api/lux", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, history: currentHistory })
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

  if (!isMounted) return null; // Prevent hydration mismatch during SSR

  const renderChatBox = () => (
    <div className={fullMode ? "full-chat-widget" : "chat-widget"} style={fullMode ? {
      display: "flex", flexDirection: "column", height: "100%", width: "100%",
      background: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(12px)", 
      border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.5)", overflow: "hidden"
    } : {}}>
      <div style={{
        background: "rgba(0,0,0,0.2)", borderBottom: "1px solid rgba(255,255,255,0.05)",
        padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "8px", height: "8px", background: "var(--accent-teal)", borderRadius: "50%", boxShadow: "0 0 10px var(--accent-teal)" }}></div>
          <span style={{ fontWeight: 600, color: "var(--text-primary)", letterSpacing: "0.5px" }}>Lux Terminal</span>
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button 
            onClick={clearMemory}
            title="Clear Memory"
            style={{ background: "rgba(255,0,0,0.1)", border: "1px solid rgba(255,0,0,0.2)", color: "#ff4444", borderRadius: "4px", padding: "2px 8px", cursor: "pointer", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase" }}
          >
            Clear
          </button>
          {!fullMode && (
            <button 
              onClick={() => setIsOpen(false)}
              style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "16px" }}
            >
              ✕
            </button>
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
            background: msg.role === "user" ? "rgba(255,255,255,0.05)" : "rgba(0,212,170,0.05)",
            border: msg.role === "user" ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,212,170,0.15)",
            padding: "12px 16px",
            borderRadius: "12px",
            color: msg.role === "user" ? "var(--text-primary)" : "var(--accent-teal)",
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
                      <div style={{ fontSize: "11px", borderRadius: "6px", overflow: "hidden", margin: "8px 0", border: "1px solid rgba(255,255,255,0.1)" }}>
                        <div style={{ background: "rgba(0,0,0,0.5)", padding: "4px 12px", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", fontSize: "10px" }}>{match[1]}</div>
                        <SyntaxHighlighter
                          style={vscDarkPlus as any}
                          language={match[1]}
                          PreTag="div"
                          customStyle={{ margin: 0, padding: "12px", background: "rgba(0,0,0,0.3)" }}
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      </div>
                    ) : (
                      <code style={{ background: "rgba(255,255,255,0.1)", padding: "2px 6px", borderRadius: "4px", fontSize: "0.9em", color: "#fff" }} className={className} {...props}>
                        {children}
                      </code>
                    )
                  },
                  p: ({node, ...props}) => <p style={{margin: "0 0 8px 0"}} {...props} />,
                  ul: ({node, ...props}) => <ul style={{margin: "0 0 8px 0", paddingLeft: "20px"}} {...props} />,
                  ol: ({node, ...props}) => <ol style={{margin: "0 0 8px 0", paddingLeft: "20px"}} {...props} />,
                  li: ({node, ...props}) => <li style={{marginBottom: "4px"}} {...props} />,
                  strong: ({node, ...props}) => <strong style={{color: "var(--accent-teal)", fontWeight: "bold"}} {...props} />
                }}
              >
                {msg.content}
              </ReactMarkdown>
            ) : (
              msg.content
            )}
          </div>
        ))}
        {isLoading && (
          <div style={{ alignSelf: "flex-start", fontSize: "12px", color: "var(--text-muted)" }}>
            Lux is parsing...
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div style={{ padding: "12px", borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.2)", display: "flex", gap: "8px" }}>
        <textarea 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Send directive..."
          style={{
            flex: 1, background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)",
            color: "var(--text-primary)", padding: "10px 14px", borderRadius: "8px",
            resize: "none", outline: "none", fontFamily: "inherit", fontSize: "13px",
            height: "40px", transition: "all 0.2s"
          }}
          onFocus={(e) => e.target.style.borderColor = 'rgba(0,212,170,0.5)'}
          onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
        />
        <button 
          onClick={sendMessage}
          disabled={isLoading || !input.trim()}
          style={{
            background: "var(--accent-teal)", color: "#000", border: "none",
            borderRadius: "8px", padding: "0 16px", cursor: "pointer",
            fontWeight: 600, opacity: isLoading || !input.trim() ? 0.5 : 1,
            boxShadow: isLoading || !input.trim() ? "none" : "0 0 12px rgba(0,212,170,0.4)"
          }}
        >
          SEND
        </button>
      </div>
    </div>
  );

  if (fullMode) {
    return renderChatBox();
  }

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
            background: "var(--accent-teal)", color: "#000",
            border: "none", borderRadius: "50%",
            width: "56px", height: "56px",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", boxShadow: "0 0 20px rgba(0,212,170,0.4)", zIndex: 1000,
            fontWeight: "bold", fontSize: "20px", transition: "transform 0.2s"
          }}
          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          L
        </button>
      )}

      {isOpen && renderChatBox()}
    </>
  );
}
