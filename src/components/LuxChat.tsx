"use client";

import { useState, useRef, useEffect } from "react";

import ReactMarkdown from 'react-markdown';

export default function LuxChat({ fullMode = false }: { fullMode?: boolean }) {
  const [messages, setMessages] = useState<{ role: "user" | "lux"; content: string }[]>([
    { role: "lux", content: "Lux OS V5 initialized. Dashboard is locked and loaded. What's the play, Dunker?" }
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen, fullMode]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/lux", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, history: messages })
      });
      
      const data = await res.json();
      
      if (data.error) {
        setMessages(prev => [...prev, { role: "lux", content: `System Error: ${data.error}` }]);
      } else {
        setMessages(prev => [...prev, { role: "lux", content: data.reply }]);
      }
    } catch (err: any) {
      setMessages(prev => [...prev, { role: "lux", content: "Connection severed. Check network or API key." }]);
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
        {!fullMode && (
          <button 
            onClick={() => setIsOpen(false)}
            style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "16px" }}
          >
            ✕
          </button>
        )}
        {fullMode && (
          <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "1px" }}>Local Node Active</div>
        )}
      </div>

      <div style={{
        padding: "16px", overflowY: "auto", flex: 1,
        display: "flex", flexDirection: "column", gap: "12px",
        minHeight: fullMode ? "auto" : "300px", maxHeight: fullMode ? "auto" : "400px"
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ 
            alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
            maxWidth: "85%",
            background: msg.role === "user" ? "rgba(255,255,255,0.05)" : "rgba(0,212,170,0.1)",
            border: msg.role === "user" ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,212,170,0.2)",
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
