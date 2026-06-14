import { useState, useRef, useEffect } from "react";

// ─────────────────────────────────────────────
//  No API key needed here!
//  The key is safely stored in Netlify's
//  Environment Variables on the server side.
// ─────────────────────────────────────────────

const BRAND_PURPLE = "#6d28a0";
const BRAND_LIGHT  = "#f3e8ff";
const BRAND_DARK   = "#4a1870";

// ── Styles injected once ──────────────────────
const GLOBAL_CSS = `
  @keyframes hwBounce {
    0%,80%,100% { transform:translateY(0); opacity:.4; }
    40%          { transform:translateY(-6px); opacity:1; }
  }
  @keyframes hwFadeIn {
    from { opacity:0; transform:translateY(14px) scale(.97); }
    to   { opacity:1; transform:translateY(0)   scale(1);   }
  }
  @keyframes hwPop {
    0%   { transform:scale(.5); opacity:0; }
    70%  { transform:scale(1.1); }
    100% { transform:scale(1);  opacity:1; }
  }
  @keyframes hwPulse {
    0%   { transform:scale(1);   opacity:.6; }
    100% { transform:scale(1.65); opacity:0; }
  }
  .hw-bubble-btn:hover { transform:scale(1.08) !important; }
  .hw-quick:hover      { background:#f3e8ff !important; }
  .hw-send:hover:not(:disabled) { opacity:.88; }
  .hw-textarea:focus   { border-color:#6d28a0 !important; outline:none; }
  .hw-msg-wrap         { animation:hwFadeIn .25s ease; }
`;

function TypingDots() {
  return (
    <div style={{ display:"flex", gap:4, padding:"10px 14px", alignItems:"center" }}>
      {[0,1,2].map(i => (
        <span key={i} style={{
          width:8, height:8, borderRadius:"50%",
          background: "#6d28a0", opacity:.5,
          animation:`hwBounce 1.2s ease-in-out ${i*.2}s infinite`,
          display:"inline-block"
        }}/>
      ))}
    </div>
  );
}

function Avatar() {
  return (
    <div style={{
      width:30, height:30, borderRadius:"50%", flexShrink:0,
      background:`linear-gradient(135deg,#6d28a0,#4a1870)`,
      display:"flex", alignItems:"center", justifyContent:"center",
      fontSize:14, marginRight:8, marginTop:2,
    }}>🌺</div>
  );
}

function ChatMessage({ msg }) {
  const isUser = msg.role === "user";
  return (
    <div className="hw-msg-wrap" style={{
      display:"flex", justifyContent: isUser ? "flex-end" : "flex-start",
      marginBottom:10,
    }}>
      {!isUser && <Avatar />}
      <div style={{
        maxWidth:"75%",
        padding:"10px 14px",
        borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
        background: isUser
          ? `linear-gradient(135deg,#6d28a0,#4a1870)`
          : "#fff",
        color: isUser ? "#fff" : "#1a1a2e",
        fontSize:14, lineHeight:1.55,
        boxShadow: isUser
          ? "0 2px 8px rgba(109,40,160,.3)"
          : "0 2px 8px rgba(0,0,0,.08)",
        border: isUser ? "none" : "1px solid #ede9f5",
        whiteSpace:"pre-wrap", wordBreak:"break-word",
      }}>
        {msg.content}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────
export default function AgentHubaall() {
  const [open,     setOpen]     = useState(false);
  const [messages, setMessages] = useState([{
    role:"assistant",
    content:"Warm greetings! I'm Agent Hubaall 🌺, your guide to Hubaall Women's Business Group (Inc.) in Fulumu Village, Madang Province, Papua New Guinea.\n\nHow can I help you today?"
  }]);
  const [input,   setInput]   = useState("");
  const [loading, setLoading] = useState(false);
  const [badge,   setBadge]   = useState(true);
  const [error,   setError]   = useState("");
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  useEffect(() => {
    if (open) { setBadge(false); setTimeout(() => inputRef.current?.focus(), 120); }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior:"smooth" });
  }, [messages, loading]);

  // Convert message history to Gemini's "contents" format
  function buildContents(history) {
    return history.map(m => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }]
    }));
  }

  // Call our secure Netlify Function (API key stays on the server)
  async function callGemini(history) {
    const res = await fetch("/.netlify/functions/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: buildContents(history) })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error || `Server error: ${res.status}`);
    }

    const data = await res.json();
    return data.reply;
  }

  async function sendMessage(text) {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;
    setError("");
    const newHistory = [...messages, { role:"user", content:msg }];
    setMessages(newHistory);
    setInput("");
    setLoading(true);
    try {
      const reply = await callGemini(newHistory);
      setMessages(prev => [...prev, { role:"assistant", content:reply }]);
    } catch (e) {
      setError(e.message || "Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  }

  const QUICK = ["About the group", "How to join", "Our sectors", "Contact us"];

  return (
    <>
      <style>{GLOBAL_CSS}</style>

      {/* ── Chat window ── */}
      {open && (
        <div style={{
          position:"fixed", bottom:90, right:24, zIndex:9999,
          width:360, maxWidth:"calc(100vw - 48px)",
          height:530, maxHeight:"calc(100vh - 120px)",
          background:"#f8f4fe", borderRadius:20,
          boxShadow:"0 20px 60px rgba(109,40,160,.25),0 4px 16px rgba(0,0,0,.12)",
          border:"1px solid rgba(109,40,160,.15)",
          display:"flex", flexDirection:"column", overflow:"hidden",
          animation:"hwFadeIn .28s ease",
        }}>

          {/* Header */}
          <div style={{
            background:`linear-gradient(135deg,#6d28a0,#4a1870)`,
            padding:"15px 18px", display:"flex", alignItems:"center", gap:12, flexShrink:0,
          }}>
            <div style={{
              width:42, height:42, borderRadius:"50%",
              background:"rgba(255,255,255,.15)", border:"2px solid rgba(255,255,255,.3)",
              display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0,
            }}>🌺</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ color:"#fff", fontWeight:700, fontSize:15 }}>Agent Hubaall</div>
              <div style={{ color:"rgba(255,255,255,.75)", fontSize:12, display:"flex", alignItems:"center", gap:5 }}>
                <span style={{ width:7, height:7, borderRadius:"50%", background:"#4ade80", display:"inline-block" }}/>
                Hubaall Women's Business Group
              </div>
            </div>
            <div style={{ color:"rgba(255,255,255,.6)", fontSize:11, textAlign:"right", lineHeight:1.3 }}>
              Powered by<br/>
              <span style={{ color:"#fff", fontWeight:600 }}>Gemini Free</span>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" style={{
              background:"rgba(255,255,255,.15)", border:"none", borderRadius:"50%",
              width:30, height:30, cursor:"pointer", color:"#fff", fontSize:16,
              display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
            }}>✕</button>
          </div>

          {/* Messages */}
          <div style={{ flex:1, overflowY:"auto", padding:"14px 14px 6px", display:"flex", flexDirection:"column" }}>
            {messages.map((m,i) => <ChatMessage key={i} msg={m} />)}

            {loading && (
              <div style={{ display:"flex", alignItems:"center", marginBottom:10 }}>
                <Avatar />
                <div style={{
                  background:"#fff", borderRadius:"18px 18px 18px 4px",
                  border:"1px solid #ede9f5", boxShadow:"0 2px 8px rgba(0,0,0,.08)"
                }}>
                  <TypingDots />
                </div>
              </div>
            )}

            {error && (
              <div style={{
                background:"#fff0f0", border:"1px solid #fca5a5", borderRadius:10,
                padding:"8px 12px", fontSize:13, color:"#b91c1c", marginBottom:8,
              }}>
                ⚠️ {error}
              </div>
            )}
            <div ref={bottomRef}/>
          </div>

          {/* Quick replies — only on first message */}
          {messages.length === 1 && !loading && (
            <div style={{ padding:"0 14px 8px", display:"flex", gap:6, flexWrap:"wrap" }}>
              {QUICK.map(q => (
                <button key={q} className="hw-quick" onClick={() => sendMessage(q)} style={{
                  background:"#fff", border:`1.5px solid #6d28a0`,
                  borderRadius:20, padding:"5px 12px", fontSize:12,
                  color:"#6d28a0", cursor:"pointer", fontWeight:500, transition:"background .15s",
                }}>{q}</button>
              ))}
            </div>
          )}

          {/* Input bar */}
          <div style={{
            padding:"10px 14px 14px", background:"#fff",
            borderTop:"1px solid #ede9f5", display:"flex", gap:8, alignItems:"flex-end", flexShrink:0,
          }}>
            <textarea
              ref={inputRef}
              className="hw-textarea"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask Agent Hubaall anything…"
              rows={1}
              style={{
                flex:1, border:"1.5px solid #e0d5f0", borderRadius:12,
                padding:"9px 12px", fontSize:14, resize:"none",
                fontFamily:"inherit", color:"#1a1a2e", background:"#faf8fe",
                lineHeight:1.4, maxHeight:80, overflowY:"auto", transition:"border-color .2s",
              }}
            />
            <button
              className="hw-send"
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              aria-label="Send"
              style={{
                width:38, height:38, borderRadius:"50%", border:"none",
                cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                background: input.trim() && !loading
                  ? `linear-gradient(135deg,#6d28a0,#4a1870)`
                  : "#e0d5f0",
                display:"flex", alignItems:"center", justifyContent:"center",
                flexShrink:0, transition:"all .2s",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                  stroke={input.trim() && !loading ? "#fff" : "#a78bca"}
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* ── Floating button ── */}
      <div style={{ position:"fixed", bottom:24, right:24, zIndex:10000 }}>

        {/* Pulse ring */}
        {!open && (
          <div style={{
            position:"absolute", inset:0, borderRadius:"50%",
            border:`3px solid #6d28a0`,
            animation:"hwPulse 2s ease-out infinite", pointerEvents:"none",
          }}/>
        )}

        {/* Badge */}
        {badge && !open && (
          <div style={{
            position:"absolute", top:-4, right:-4,
            width:18, height:18, borderRadius:"50%",
            background:"#ef4444", border:"2px solid #fff",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:10, color:"#fff", fontWeight:700, zIndex:1,
            animation:"hwPop .4s ease",
          }}>1</div>
        )}

        <button
          className="hw-bubble-btn"
          onClick={() => setOpen(o => !o)}
          aria-label={open ? "Close Agent Hubaall" : "Chat with Agent Hubaall"}
          style={{
            width:58, height:58, borderRadius:"50%", border:"none", cursor:"pointer",
            background:`linear-gradient(135deg,#6d28a0,#4a1870)`,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:26, boxShadow:"0 4px 20px rgba(109,40,160,.45)",
            transition:"transform .25s ease",
          }}
        >
          {open
            ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            : <span style={{ lineHeight:1 }}>🌺</span>
          }
        </button>
      </div>
    </>
  );
}
