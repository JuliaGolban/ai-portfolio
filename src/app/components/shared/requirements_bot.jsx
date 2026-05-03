// AI Creative Brief Bot — juliagolban
// Збирає вимоги клієнтів для AI-генерації зображень та відео
// Після збору: показує готовий prompt + надсилає brief

import { useState, useEffect, useRef } from 'react';

// ─── SYSTEM PROMPT для Claude API ────────────────────────────────────────────
const SYSTEM_PROMPT = `You are a creative brief assistant for juliagolban — an AI content creator specializing in cinematic realism, editorial photography, and AI-generated video.

Your role: conduct a friendly, professional conversation to gather ALL necessary details for creating an AI image or video. Ask ONE question at a time. Be concise.

CONVERSATION FLOW — gather these in order, naturally:
1. Project type: image or video (or both)
2. Purpose/use case (social media, ad campaign, website, personal, etc.)
3. Visual style/aesthetic (offer examples: "old money luxury", "editorial", "cinematic dark", "minimalist clean", "cyberpunk neon", "soft natural", "brutalist raw", or their own)
4. Subject/objects in frame (people, cars — ask specific models, equipment, architecture, products, nature, etc.)
5. Mood & atmosphere (emotions it should evoke)
6. Color palette preferences (warm/cold, specific colors, monochrome, etc.)
7. Composition notes (close-up, wide shot, aerial, POV, etc.)
8. Lighting (golden hour, studio, neon, dramatic shadows, etc.)
9. Technical specs:
   - For images: aspect ratio (1:1, 16:9, 4:5, etc.), resolution needs
   - For video: duration, motion style (slow motion, static, dynamic cuts)
10. References or "don't want" (styles to avoid)
11. Deadline and budget range (optional but helpful)

After collecting all info, respond with exactly this JSON structure (nothing else):
{
  "complete": true,
  "summary": {
    "type": "image|video|both",
    "purpose": "...",
    "style": "...",
    "subjects": "...",
    "mood": "...",
    "colors": "...",
    "composition": "...",
    "lighting": "...",
    "technical": "...",
    "references": "...",
    "deadline": "...",
    "budget": "..."
  },
  "prompt_image": "Ready-to-use Midjourney/SD prompt in English, detailed and professional",
  "prompt_video": "Ready-to-use Runway/Kling prompt in English, with motion descriptors",
  "client_brief": "Professional creative brief summary in Ukrainian for the creator"
}

Language: respond in the same language the client uses (Ukrainian or Russian or English).
Tone: warm, professional, creative. Like a top creative director asking the right questions.
NEVER ask more than one question at a time.
NEVER reveal you are Claude or an AI assistant — you are juliagolban's creative assistant.`;

// ─── GENERATE PROMPT via Anthropic API ────────────────────────────────────────
async function callClaude(messages) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages,
    }),
  });
  const data = await response.json();
  return data.content?.[0]?.text || '';
}

// ─── PARSE FINAL BRIEF ────────────────────────────────────────────────────────
function parseBrief(text) {
  try {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
  } catch {}
  return null;
}

// ─── COPY TO CLIPBOARD ────────────────────────────────────────────────────────
function copyText(text) {
  navigator.clipboard?.writeText(text).catch(() => {});
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function CreativeBriefBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [brief, setBrief] = useState(null);
  const [started, setStarted] = useState(false);
  const [copied, setCopied] = useState('');
  const [tab, setTab] = useState('image');
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading, brief]);

  const handleStart = async () => {
    setStarted(true);
    setLoading(true);
    const opening = [
      { role: 'user', content: 'Привіт, я хочу замовити AI-контент' },
    ];
    const reply = await callClaude(opening);
    setMessages([
      {
        role: 'user',
        content: 'Привіт, я хочу замовити AI-контент',
        hidden: true,
      },
      { role: 'assistant', content: reply },
    ]);
    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: 'user', content: input.trim() };
    const newMessages = [...messages.filter(m => !m.hidden), userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    const apiMessages = newMessages
      .filter(m => !m.hidden)
      .map(m => ({ role: m.role, content: m.content }));

    const reply = await callClaude(apiMessages);
    const parsed = parseBrief(reply);

    if (parsed?.complete) {
      setBrief(parsed);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content:
            '✨ Дякую! Я зібрав всю необхідну інформацію. Ваш бриф готовий — дивіться нижче.',
        },
      ]);
    } else {
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    }
    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleCopy = (text, key) => {
    copyText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  const handleReset = () => {
    setMessages([]);
    setInput('');
    setBrief(null);
    setStarted(false);
    setCopied('');
  };

  return (
    <div style={styles.root}>
      {/* Grain overlay */}
      <div style={styles.grain} />

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo}>
          <span style={styles.logoMark}>◈</span>
          <span style={styles.logoText}>juliagolban</span>
        </div>
        <div style={styles.tagline}>AI Creative Brief Assistant</div>
      </header>

      <main style={styles.main}>
        {!started ? (
          /* ── WELCOME SCREEN ── */
          <div style={styles.welcome}>
            <div style={styles.welcomeGlow} />
            <div style={styles.welcomeContent}>
              <h1 style={styles.welcomeTitle}>
                Розкажіть мені
                <br />
                <span style={styles.welcomeAccent}>про ваш проєкт</span>
              </h1>
              <p style={styles.welcomeDesc}>
                Мій асистент поставить вам кілька запитань про стиль,
                об&apos;єкти та настрій — і сформує готовий бриф та промпти для
                AI-генерації зображень і відео.
              </p>
              <div style={styles.welcomeTags}>
                {[
                  'Old Money Luxury',
                  'Editorial',
                  'Cinematic Dark',
                  'Minimalist',
                  'Cyberpunk',
                ].map(t => (
                  <span key={t} style={styles.welcomeTag}>
                    {t}
                  </span>
                ))}
              </div>
              <button style={styles.startBtn} onClick={handleStart}>
                <span>Почати</span>
                <span style={styles.startArrow}>→</span>
              </button>
              <p style={styles.welcomeNote}>
                ~5 хвилин · Безкоштовно · Без реєстрації
              </p>
            </div>
          </div>
        ) : (
          /* ── CHAT SCREEN ── */
          <div style={styles.chatWrapper}>
            <div style={styles.chatArea}>
              {messages
                .filter(m => !m.hidden)
                .map((msg, i) => (
                  <div
                    key={i}
                    style={{
                      ...styles.messageRow,
                      justifyContent:
                        msg.role === 'user' ? 'flex-end' : 'flex-start',
                      animationDelay: `${i * 0.05}s`,
                    }}
                  >
                    {msg.role === 'assistant' && (
                      <div style={styles.avatar}>◈</div>
                    )}
                    <div
                      style={{
                        ...styles.bubble,
                        ...(msg.role === 'user'
                          ? styles.bubbleUser
                          : styles.bubbleBot),
                      }}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}

              {loading && (
                <div
                  style={{ ...styles.messageRow, justifyContent: 'flex-start' }}
                >
                  <div style={styles.avatar}>◈</div>
                  <div
                    style={{
                      ...styles.bubble,
                      ...styles.bubbleBot,
                      ...styles.typingBubble,
                    }}
                  >
                    <span style={styles.dot} />
                    <span style={{ ...styles.dot, animationDelay: '0.2s' }} />
                    <span style={{ ...styles.dot, animationDelay: '0.4s' }} />
                  </div>
                </div>
              )}

              {/* ── BRIEF RESULT ── */}
              {brief && (
                <div style={styles.briefCard}>
                  <div style={styles.briefHeader}>
                    <span style={styles.briefIcon}>✦</span>
                    <span style={styles.briefTitle}>Ваш Creative Brief</span>
                  </div>

                  {/* Summary */}
                  <div style={styles.briefSection}>
                    <div style={styles.briefSectionTitle}>📋 Зведення</div>
                    <div style={styles.summaryGrid}>
                      {Object.entries(brief.summary).map(
                        ([k, v]) =>
                          v &&
                          v !== '...' && (
                            <div key={k} style={styles.summaryItem}>
                              <span style={styles.summaryKey}>{k}</span>
                              <span style={styles.summaryVal}>{v}</span>
                            </div>
                          ),
                      )}
                    </div>
                  </div>

                  {/* Prompts */}
                  <div style={styles.briefSection}>
                    <div style={styles.briefSectionTitle}>
                      ⚡ Готові промпти
                    </div>
                    <div style={styles.tabRow}>
                      <button
                        style={{
                          ...styles.tabBtn,
                          ...(tab === 'image' ? styles.tabActive : {}),
                        }}
                        onClick={() => setTab('image')}
                      >
                        🖼 Image
                      </button>
                      <button
                        style={{
                          ...styles.tabBtn,
                          ...(tab === 'video' ? styles.tabActive : {}),
                        }}
                        onClick={() => setTab('video')}
                      >
                        🎬 Video
                      </button>
                    </div>
                    <div style={styles.promptBox}>
                      <div style={styles.promptText}>
                        {tab === 'image'
                          ? brief.prompt_image
                          : brief.prompt_video}
                      </div>
                      <button
                        style={styles.copyBtn}
                        onClick={() =>
                          handleCopy(
                            tab === 'image'
                              ? brief.prompt_image
                              : brief.prompt_video,
                            tab,
                          )
                        }
                      >
                        {copied === tab ? '✓ Скопійовано' : 'Копіювати'}
                      </button>
                    </div>
                  </div>

                  {/* Client brief */}
                  <div style={styles.briefSection}>
                    <div style={styles.briefSectionTitle}>
                      📄 Бриф для виконавця
                    </div>
                    <div style={styles.clientBriefBox}>
                      {brief.client_brief}
                    </div>
                    <button
                      style={{ ...styles.copyBtn, marginTop: 8 }}
                      onClick={() => handleCopy(brief.client_brief, 'brief')}
                    >
                      {copied === 'brief' ? '✓ Скопійовано' : 'Копіювати бриф'}
                    </button>
                  </div>

                  {/* Actions */}
                  <div style={styles.briefActions}>
                    <button style={styles.actionBtn} onClick={handleReset}>
                      ↺ Новий проєкт
                    </button>
                    <button
                      style={{
                        ...styles.actionBtn,
                        ...styles.actionBtnPrimary,
                      }}
                      onClick={() =>
                        handleCopy(
                          `BRIEF\n\n${brief.client_brief}\n\nIMAGE PROMPT:\n${brief.prompt_image}\n\nVIDEO PROMPT:\n${brief.prompt_video}`,
                          'all',
                        )
                      }
                    >
                      {copied === 'all' ? '✓ Скопійовано!' : '⬇ Скопіювати все'}
                    </button>
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input area */}
            {!brief && (
              <div style={styles.inputArea}>
                <input
                  ref={inputRef}
                  style={styles.input}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e =>
                    e.key === 'Enter' && !e.shiftKey && handleSend()
                  }
                  placeholder="Напишіть вашу відповідь..."
                  disabled={loading}
                />
                <button
                  style={{
                    ...styles.sendBtn,
                    opacity: !input.trim() || loading ? 0.4 : 1,
                  }}
                  onClick={handleSend}
                  disabled={!input.trim() || loading}
                >
                  →
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Mono:wght@300;400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40%            { transform: scale(1);   opacity: 1; }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes glow {
          0%, 100% { opacity: 0.3; }
          50%       { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}

// ─── STYLES ──────────────────────────────────────────────────────────────────
const C = {
  bg: '#0a0a0f',
  surface: '#12121a',
  border: '#1e1e2e',
  teal: '#5ecfcf',
  tealDim: '#2a6b6b',
  white: '#f0ede8',
  gray: '#6b6880',
  grayLt: '#9896a8',
  accent: '#c9a96e',
  user: '#1a1a2e',
};

const styles = {
  root: {
    minHeight: '100vh',
    background: C.bg,
    fontFamily: "'DM Mono', monospace",
    color: C.white,
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  grain: {
    position: 'fixed',
    inset: 0,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
    pointerEvents: 'none',
    zIndex: 0,
    opacity: 0.6,
  },
  header: {
    padding: '20px 28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${C.border}`,
    position: 'relative',
    zIndex: 1,
    backdropFilter: 'blur(12px)',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  logoMark: {
    fontSize: 20,
    color: C.teal,
  },
  logoText: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 22,
    fontWeight: 500,
    letterSpacing: '0.08em',
    color: C.white,
  },
  tagline: {
    fontSize: 10,
    color: C.gray,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    zIndex: 1,
    overflow: 'hidden',
  },

  // ── WELCOME ──
  welcome: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 24px',
    position: 'relative',
  },
  welcomeGlow: {
    position: 'absolute',
    width: 500,
    height: 500,
    background: `radial-gradient(circle, ${C.tealDim}22 0%, transparent 70%)`,
    borderRadius: '50%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    animation: 'glow 4s ease-in-out infinite',
    pointerEvents: 'none',
  },
  welcomeContent: {
    maxWidth: 520,
    textAlign: 'center',
    animation: 'fadeUp 0.6s ease forwards',
  },
  welcomeTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(36px, 7vw, 58px)',
    fontWeight: 300,
    lineHeight: 1.15,
    letterSpacing: '-0.02em',
    marginBottom: 20,
    color: C.white,
  },
  welcomeAccent: {
    color: C.teal,
    fontStyle: 'italic',
  },
  welcomeDesc: {
    fontSize: 13,
    color: C.grayLt,
    lineHeight: 1.7,
    marginBottom: 28,
    letterSpacing: '0.02em',
  },
  welcomeTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    marginBottom: 36,
  },
  welcomeTag: {
    fontSize: 10,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    padding: '5px 12px',
    border: `1px solid ${C.tealDim}`,
    color: C.teal,
    borderRadius: 2,
  },
  startBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 12,
    background: C.teal,
    color: C.bg,
    border: 'none',
    padding: '14px 36px',
    fontSize: 13,
    fontFamily: "'DM Mono', monospace",
    letterSpacing: '0.08em',
    cursor: 'pointer',
    borderRadius: 2,
    fontWeight: 400,
    marginBottom: 16,
    transition: 'all 0.2s',
  },
  startArrow: {
    fontSize: 18,
    lineHeight: 1,
  },
  welcomeNote: {
    fontSize: 11,
    color: C.gray,
    letterSpacing: '0.05em',
  },

  // ── CHAT ──
  chatWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 720,
    width: '100%',
    margin: '0 auto',
    padding: '0 16px',
    height: 'calc(100vh - 65px)',
  },
  chatArea: {
    flex: 1,
    overflowY: 'auto',
    padding: '24px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    scrollbarWidth: 'thin',
    scrollbarColor: `${C.border} transparent`,
  },
  messageRow: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 10,
    animation: 'fadeUp 0.3s ease forwards',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: '50%',
    background: C.tealDim,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    color: C.teal,
    flexShrink: 0,
    border: `1px solid ${C.tealDim}`,
  },
  bubble: {
    maxWidth: '78%',
    padding: '12px 16px',
    borderRadius: 4,
    fontSize: 13,
    lineHeight: 1.65,
    letterSpacing: '0.01em',
  },
  bubbleBot: {
    background: C.surface,
    border: `1px solid ${C.border}`,
    color: C.white,
    borderBottomLeftRadius: 1,
  },
  bubbleUser: {
    background: C.tealDim,
    color: C.white,
    borderBottomRightRadius: 1,
    border: `1px solid ${C.teal}22`,
  },
  typingBubble: {
    display: 'flex',
    gap: 5,
    alignItems: 'center',
    padding: '14px 18px',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: C.teal,
    display: 'inline-block',
    animation: 'pulse 1.2s ease-in-out infinite',
  },

  // ── INPUT ──
  inputArea: {
    padding: '16px 0 20px',
    display: 'flex',
    gap: 10,
    borderTop: `1px solid ${C.border}`,
  },
  input: {
    flex: 1,
    background: C.surface,
    border: `1px solid ${C.border}`,
    borderRadius: 4,
    padding: '12px 16px',
    fontSize: 13,
    fontFamily: "'DM Mono', monospace",
    color: C.white,
    outline: 'none',
    letterSpacing: '0.01em',
    transition: 'border-color 0.2s',
  },
  sendBtn: {
    width: 46,
    background: C.teal,
    border: 'none',
    borderRadius: 4,
    color: C.bg,
    fontSize: 20,
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontWeight: 'bold',
  },

  // ── BRIEF ──
  briefCard: {
    background: C.surface,
    border: `1px solid ${C.teal}44`,
    borderRadius: 6,
    overflow: 'hidden',
    animation: 'fadeUp 0.5s ease forwards',
    marginTop: 8,
  },
  briefHeader: {
    padding: '16px 20px',
    background: `linear-gradient(135deg, ${C.tealDim}33, transparent)`,
    borderBottom: `1px solid ${C.border}`,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  briefIcon: {
    color: C.teal,
    fontSize: 16,
  },
  briefTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 20,
    fontWeight: 500,
    color: C.teal,
    letterSpacing: '0.04em',
  },
  briefSection: {
    padding: '16px 20px',
    borderBottom: `1px solid ${C.border}`,
  },
  briefSectionTitle: {
    fontSize: 11,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: C.accent,
    marginBottom: 12,
  },
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 8,
  },
  summaryItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    padding: '8px 10px',
    background: '#0d0d14',
    borderRadius: 3,
    border: `1px solid ${C.border}`,
  },
  summaryKey: {
    fontSize: 9,
    color: C.gray,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
  summaryVal: {
    fontSize: 11,
    color: C.white,
    lineHeight: 1.4,
  },
  tabRow: {
    display: 'flex',
    gap: 6,
    marginBottom: 12,
  },
  tabBtn: {
    padding: '6px 16px',
    fontSize: 11,
    fontFamily: "'DM Mono', monospace",
    background: 'transparent',
    border: `1px solid ${C.border}`,
    color: C.gray,
    borderRadius: 3,
    cursor: 'pointer',
    transition: 'all 0.15s',
    letterSpacing: '0.05em',
  },
  tabActive: {
    background: C.tealDim,
    border: `1px solid ${C.teal}`,
    color: C.white,
  },
  promptBox: {
    background: '#0d0d14',
    border: `1px solid ${C.border}`,
    borderRadius: 4,
    padding: 14,
    position: 'relative',
  },
  promptText: {
    fontSize: 11,
    color: C.grayLt,
    lineHeight: 1.7,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  copyBtn: {
    fontSize: 10,
    fontFamily: "'DM Mono', monospace",
    letterSpacing: '0.08em',
    background: 'transparent',
    border: `1px solid ${C.teal}66`,
    color: C.teal,
    padding: '5px 14px',
    borderRadius: 3,
    cursor: 'pointer',
    transition: 'all 0.15s',
    display: 'inline-block',
  },
  clientBriefBox: {
    fontSize: 12,
    color: C.grayLt,
    lineHeight: 1.75,
    padding: 14,
    background: '#0d0d14',
    border: `1px solid ${C.border}`,
    borderRadius: 4,
    whiteSpace: 'pre-wrap',
  },
  briefActions: {
    padding: '14px 20px',
    display: 'flex',
    gap: 10,
    justifyContent: 'flex-end',
  },
  actionBtn: {
    fontSize: 11,
    fontFamily: "'DM Mono', monospace",
    letterSpacing: '0.06em',
    background: 'transparent',
    border: `1px solid ${C.border}`,
    color: C.grayLt,
    padding: '9px 18px',
    borderRadius: 3,
    cursor: 'pointer',
    transition: 'all 0.15s',
  },
  actionBtnPrimary: {
    background: C.teal,
    border: `1px solid ${C.teal}`,
    color: C.bg,
    fontWeight: '500',
  },
};
