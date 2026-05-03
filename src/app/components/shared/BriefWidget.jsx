'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';

const STYLE_PILLS = [
  'Dark editorial',
  'Floral / Romantic',
  'Skin close-up',
  'Brutalist / Architectural',
  'Golden hour / Cinematic',
  'Surreal / Conceptual',
  'Minimalist / Clean',
  'Luxury / Opulent',
  'Wellness / Spa',
  'Food / Lifestyle',
];

const G = {
  bg: 'rgba(9, 8, 7, 0.97)',
  border: 'rgba(255,255,255,0.06)',
  borderGold: 'rgba(180,148,90,0.3)',
  gold: '#b4945a',
  goldDim: 'rgba(180,148,90,0.07)',
  goldText: '#c9a870',
  text: 'rgba(232,226,215,0.88)',
  muted: 'rgba(175,165,148,0.42)',
  soft: 'rgba(200,190,172,0.58)',
  userBg: 'rgba(180,148,90,0.06)',
  botBg: 'rgba(255,255,255,0.018)',
  fabBg: 'rgba(10,9,8,0.78)',
};

// ─── API ──────────────────────────────────────────────────────────────────────
async function callClaude(messages) {
  const res = await fetch('/api/brief-chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });
  if (!res.ok) throw new Error('API error ' + res.status);
  return (await res.json()).reply;
}

// ─── JSON parser — шукає {} в будь-якому місці відповіді ─────────────────────
function tryParseJSON(text) {
  try {
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start === -1 || end === -1) return null;
    const parsed = JSON.parse(text.slice(start, end + 1));
    if (parsed.complete === true) return parsed;
  } catch (_) {}
  return null;
}

// ─── File → base64 ────────────────────────────────────────────────────────────
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ─── TypingDots ───────────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div
      style={{
        display: 'flex',
        alignSelf: 'flex-start',
        padding: '9px 13px',
        background: G.botBg,
        border: `1px solid ${G.border}`,
        borderRadius: 8,
        borderBottomLeftRadius: 2,
        gap: 4,
        alignItems: 'center',
      }}
    >
      {[0, 1, 2].map(i => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: G.muted,
            animation: 'jnbPulse 1.4s ease-in-out infinite',
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
}

// ─── FilePreview — прев'ю прикріпленого файлу ────────────────────────────────
function FilePreview({ file, onRemove }) {
  const isImage = file.type.startsWith('image/');

  // useMemo — створює URL під час рендеру (не в effect), useEffect — прибирає
  const previewUrl = useMemo(
    () => (isImage ? URL.createObjectURL(file) : null),
    [file, isImage],
  );
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 10px',
        background: 'rgba(180,148,90,0.06)',
        border: `1px solid ${G.borderGold}`,
        borderRadius: 6,
        maxWidth: '100%',
      }}
    >
      {isImage && previewUrl ? (
        <img
          src={previewUrl}
          alt=""
          style={{ width: 32, height: 32, objectFit: 'cover', borderRadius: 3 }}
        />
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={G.gold}
          strokeWidth="1.5"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14,2 14,8 20,8" />
        </svg>
      )}
      <span
        style={{
          fontSize: 11,
          color: G.soft,
          flex: 1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {file.name}
      </span>
      <button
        onClick={onRemove}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: G.muted,
          padding: '0 2px',
          fontSize: 14,
          lineHeight: 1,
        }}
      >
        ×
      </button>
    </div>
  );
}

// ─── BriefCard ────────────────────────────────────────────────────────────────
function BriefCard({ brief, onReset }) {
  const [tab, setTab] = useState('summary');
  const [copied, setCopied] = useState(false);
  const content =
    tab === 'summary'
      ? [brief.summary, brief.visual_description].filter(Boolean).join('\n\n')
      : brief.client_brief;
  const copy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const tabStyle = id => ({
    flex: 1,
    padding: '10px 4px',
    background: 'none',
    border: 'none',
    borderBottom: tab === id ? `1px solid ${G.gold}` : '1px solid transparent',
    color: tab === id ? G.goldText : G.muted,
    fontSize: 11,
    fontFamily: 'inherit',
    cursor: 'pointer',
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    transition: 'color 0.2s, border-color 0.2s',
  });
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '14px 20px',
          borderBottom: `1px solid ${G.border}`,
          flexShrink: 0,
        }}
      >
        <p
          style={{
            color: G.goldText,
            fontSize: 12,
            margin: 0,
            letterSpacing: '0.04em',
            lineHeight: 1.6,
          }}
        >
          Бриф зібрано. Юлія зв&apos;яжеться з вами найближчим часом.
        </p>
      </div>
      <div
        style={{
          display: 'flex',
          borderBottom: `1px solid ${G.border}`,
          flexShrink: 0,
        }}
      >
        <button
          onClick={() => {
            setTab('summary');
            setCopied(false);
          }}
          style={tabStyle('summary')}
        >
          Огляд
        </button>
        <button
          onClick={() => {
            setTab('brief');
            setCopied(false);
          }}
          style={tabStyle('brief')}
        >
          Бриф
        </button>
      </div>
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '14px 20px 0',
          fontSize: 12,
          color: G.soft,
          lineHeight: 1.8,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        {content}
      </div>
      <button
        onClick={copy}
        style={{
          margin: '12px 20px 0',
          padding: '8px',
          background: 'transparent',
          border: `1px solid ${G.border}`,
          borderRadius: 3,
          color: G.muted,
          fontSize: 11,
          fontFamily: 'inherit',
          cursor: 'pointer',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          flexShrink: 0,
        }}
      >
        {copied ? 'Скопійовано' : 'Копіювати'}
      </button>
      <button
        onClick={onReset}
        style={{
          margin: '6px 20px 16px',
          padding: '6px',
          background: 'none',
          border: 'none',
          color: G.muted,
          fontSize: 11,
          fontFamily: 'inherit',
          cursor: 'pointer',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          textDecoration: 'underline',
          textUnderlineOffset: 3,
          flexShrink: 0,
        }}
      >
        Новий бриф
      </button>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function BriefWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [screen, setScreen] = useState('welcome');
  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [briefResult, setBriefResult] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [showBadge, setShowBadge] = useState(false);
  const [attachedFile, setAttachedFile] = useState(null); // { file, base64, mimeType }
  const endRef = useRef(null);
  const inputRef = useRef(null);
  const fileRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setShowBadge(true), 4000);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);
  useEffect(() => {
    if (screen === 'chat') inputRef.current?.focus();
  }, [screen]);

  // ─── File attach ────────────────────────────────────────────────────────────
  const handleFileChange = useCallback(async e => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Підтримувані типи: зображення + PDF
    const allowed = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
      'application/pdf',
    ];
    if (!allowed.includes(file.type)) {
      alert('Підтримуються: JPG, PNG, WEBP, GIF, PDF');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('Максимальний розмір файлу — 10 МБ');
      return;
    }
    const base64 = await fileToBase64(file);
    setAttachedFile({ file, base64, mimeType: file.type });
    e.target.value = '';
  }, []);

  // ─── Process reply ──────────────────────────────────────────────────────────
  async function process(reply, base) {
    const parsed = tryParseJSON(reply);
    if (parsed) {
      setBriefResult(parsed);
      setMessages([
        ...base,
        {
          role: 'assistant',
          content: 'Бриф зібрано. Переходимо до результату...',
        },
      ]);
      setTimeout(() => setScreen('brief'), 900);
    } else {
      setMessages([...base, { role: 'assistant', content: reply }]);
    }
  }

  // ─── Send with optional file ────────────────────────────────────────────────
  async function sendMsg(text, base, fileData) {
    // Формуємо content: якщо є файл — масив parts для Gemini multimodal
    const userContent = fileData
      ? { text, file: fileData } // route.js обробить це
      : text;

    const displayText = fileData
      ? `${text ? text + '\n' : ''}📎 ${fileData.file.name}`
      : text;

    const msgs = [
      ...base,
      { role: 'user', content: userContent, display: displayText },
    ];
    setMessages(msgs);
    setIsTyping(true);
    setAttachedFile(null);

    try {
      // Для API надсилаємо messages з можливим файлом
      const apiMsgs = msgs.map(m => ({
        role: m.role,
        content: m.content,
      }));
      await process(await callClaude(apiMsgs), msgs);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages([
        ...msgs,
        { role: 'assistant', content: 'Помилка з`єднання. Спробуйте ще раз.' },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  const handleSend = useCallback(async () => {
    const text = inputVal.trim();
    if ((!text && !attachedFile) || isTyping) return;
    setInputVal('');
    await sendMsg(text, messages, attachedFile);
  }, [inputVal, isTyping, messages, attachedFile]);

  const startChat = useCallback(() => {
    setScreen('chat');
    setMessages([]);
    sendMsg(
      selectedStyle
        ? 'Привіт! Хочу замовити AI-генерацію в стилі "' + selectedStyle + '"'
        : 'Привіт! Хочу замовити AI-генерацію',
      [],
      null,
    );
  }, [selectedStyle]);

  const reset = () => {
    setScreen('welcome');
    setMessages([]);
    setBriefResult(null);
    setSelectedStyle(null);
    setInputVal('');
    setAttachedFile(null);
  };

  const canSend = (inputVal.trim() || attachedFile) && !isTyping;

  return (
    <>
      <style>{`
        @keyframes jnbPulse { 0%,80%,100%{transform:scale(0.6);opacity:0.25} 40%{transform:scale(1);opacity:0.65} }
        #jnb-fab:hover { border-color: rgba(180,148,90,0.55) !important; background: rgba(18,16,14,0.85) !important; }
        #jnb-start:hover { background: rgba(180,148,90,0.09) !important; }
        #jnb-msgs::-webkit-scrollbar { width:3px }
        #jnb-msgs::-webkit-scrollbar-thumb { background: rgba(180,148,90,0.15); border-radius:2px }
        #jnb-attach:hover { border-color: rgba(180,148,90,0.4) !important; }
      `}</style>

      {/* Hidden file input */}
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,application/pdf"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {/* Badge */}
      {!isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: 84,
            right: 28,
            color: G.muted,
            fontSize: 10,
            letterSpacing: '0.09em',
            textTransform: 'uppercase',
            zIndex: 9997,
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            fontFamily: 'inherit',
            opacity: showBadge ? 0.7 : 0,
            transform: showBadge ? 'translateY(0)' : 'translateY(4px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          Замовити бриф
        </div>
      )}

      {/* FAB */}
      <button
        id="jnb-fab"
        onClick={() => {
          setIsOpen(o => !o);
          setShowBadge(false);
        }}
        style={{
          position: 'fixed',
          bottom: 28,
          right: 28,
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: G.fabBg,
          border: `1px solid ${G.borderGold}`,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          cursor: 'pointer',
          zIndex: 9998,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'border-color 0.3s, background 0.3s',
          boxShadow: 'none',
        }}
        aria-label="Бриф"
      >
        {isOpen ? (
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke={G.gold}
            strokeWidth="1.5"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke={G.gold}
            strokeWidth="1.4"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Popup */}
      <div
        style={{
          position: 'fixed',
          bottom: 84,
          right: 28,
          width: 358,
          height: 570,
          background: G.bg,
          border: `1px solid ${G.border}`,
          borderRadius: 14,
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow:
            '0 8px 48px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.035)',
          opacity: isOpen ? 1 : 0,
          transform: isOpen
            ? 'translateY(0) scale(1)'
            : 'translateY(10px) scale(0.98)',
          transition: 'opacity 0.2s ease, transform 0.2s ease',
          pointerEvents: isOpen ? 'all' : 'none',
          fontFamily: "'DM Sans', -apple-system, sans-serif",
        }}
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div
          style={{
            padding: '17px 20px 13px',
            borderBottom: `1px solid ${G.border}`,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexShrink: 0,
          }}
        >
          <div>
            <p
              style={{
                color: G.goldText,
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              Creative Brief
            </p>
            <p
              style={{
                color: G.muted,
                fontSize: 10,
                margin: '3px 0 0',
                letterSpacing: '0.04em',
              }}
            >
              @juliagolban
            </p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 4,
              opacity: 0.45,
              lineHeight: 0,
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke={G.soft}
              strokeWidth="1.5"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div
          style={{
            flex: 1,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Welcome */}
          {screen === 'welcome' && (
            <div
              style={{
                flex: 1,
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                overflowY: 'auto',
              }}
            >
              <p
                style={{
                  color: G.soft,
                  fontSize: 13,
                  lineHeight: 1.75,
                  margin: 0,
                  fontWeight: 300,
                }}
              >
                Оберіть стиль або одразу розпочніть — я поставлю потрібні
                запитання.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {STYLE_PILLS.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedStyle(p => (p === s ? null : s))}
                    style={{
                      padding: '4px 10px',
                      borderRadius: 3,
                      fontFamily: 'inherit',
                      border: `1px solid ${selectedStyle === s ? G.borderGold : G.border}`,
                      background:
                        selectedStyle === s ? G.goldDim : 'transparent',
                      color: selectedStyle === s ? G.goldText : G.muted,
                      fontSize: 11,
                      cursor: 'pointer',
                      letterSpacing: '0.02em',
                      transition: 'all 0.2s',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <button
                id="jnb-start"
                onClick={startChat}
                style={{
                  width: '100%',
                  padding: '11px',
                  background: 'transparent',
                  border: `1px solid ${G.borderGold}`,
                  borderRadius: 4,
                  color: G.goldText,
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  marginTop: 'auto',
                  fontFamily: 'inherit',
                  transition: 'background 0.2s',
                }}
              >
                Розпочати
              </button>
            </div>
          )}

          {/* Chat */}
          {screen === 'chat' && (
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              <div
                id="jnb-msgs"
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  padding: '16px 18px 8px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  scrollbarWidth: 'thin',
                }}
              >
                {messages.map((m, i) => (
                  <div
                    key={i}
                    style={{
                      maxWidth: '86%',
                      padding: '9px 13px',
                      borderRadius: 8,
                      fontSize: 13,
                      lineHeight: 1.6,
                      wordBreak: 'break-word',
                      whiteSpace: 'pre-wrap',
                      ...(m.role === 'user'
                        ? {
                            background: G.userBg,
                            border: '1px solid rgba(180,148,90,0.1)',
                            color: G.text,
                            alignSelf: 'flex-end',
                            borderBottomRightRadius: 2,
                          }
                        : {
                            background: G.botBg,
                            border: `1px solid ${G.border}`,
                            color: G.text,
                            alignSelf: 'flex-start',
                            borderBottomLeftRadius: 2,
                          }),
                    }}
                  >
                    {/* Показуємо display текст (з іменем файлу) або content */}
                    {m.display ||
                      (typeof m.content === 'string'
                        ? m.content
                        : m.content?.text || '')}
                  </div>
                ))}
                {isTyping && <TypingDots />}
                <div ref={endRef} />
              </div>

              {/* Input area */}
              <div
                style={{
                  padding: '8px 18px 14px',
                  borderTop: `1px solid ${G.border}`,
                  flexShrink: 0,
                }}
              >
                {/* File preview */}
                {attachedFile && (
                  <div style={{ marginBottom: 8 }}>
                    <FilePreview
                      file={attachedFile.file}
                      onRemove={() => setAttachedFile(null)}
                    />
                  </div>
                )}
                <div
                  style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}
                >
                  {/* Attach button */}
                  <button
                    id="jnb-attach"
                    onClick={() => fileRef.current?.click()}
                    disabled={isTyping}
                    title="Прикріпити фото або PDF"
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 4,
                      background: 'transparent',
                      border: `1px solid ${G.border}`,
                      cursor: isTyping ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      opacity: isTyping ? 0.3 : 0.7,
                      transition: 'opacity 0.2s, border-color 0.2s',
                    }}
                  >
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={G.soft}
                      strokeWidth="1.5"
                    >
                      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                    </svg>
                  </button>
                  {/* Textarea */}
                  <textarea
                    ref={inputRef}
                    value={inputVal}
                    onChange={e => setInputVal(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="Відповідь..."
                    rows={1}
                    disabled={isTyping}
                    style={{
                      flex: 1,
                      background: 'transparent',
                      border: 'none',
                      borderBottom: `1px solid ${G.border}`,
                      borderRadius: 0,
                      padding: '8px 0',
                      color: G.text,
                      fontSize: 13,
                      fontFamily: 'inherit',
                      resize: 'none',
                      maxHeight: 80,
                      outline: 'none',
                      lineHeight: 1.5,
                    }}
                  />
                  {/* Send button */}
                  <button
                    onClick={handleSend}
                    disabled={!canSend}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 4,
                      background: 'transparent',
                      border: `1px solid ${G.borderGold}`,
                      cursor: canSend ? 'pointer' : 'not-allowed',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      opacity: canSend ? 1 : 0.25,
                      transition: 'opacity 0.2s',
                    }}
                  >
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={G.gold}
                      strokeWidth="1.8"
                    >
                      <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          {screen === 'brief' && briefResult && (
            <BriefCard brief={briefResult} onReset={reset} />
          )}
        </div>
      </div>
    </>
  );
}
