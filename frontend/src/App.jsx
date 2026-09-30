import { useEffect, useRef, useState } from 'react';
import {
  Activity,
  ArrowUp,
  AudioLines,
  Check,
  ChevronDown,
  CircleHelp,
  Heart,
  Languages,
  LifeBuoy,
  Mic,
  MicOff,
  Plus,
  ShieldCheck,
  Siren,
  Volume2,
  VolumeX,
} from 'lucide-react';

const languages = {
  en: { label: 'English', speech: 'en-IN', placeholder: 'Ask anything about your health…' },
  te: { label: 'తెలుగు', speech: 'te-IN', placeholder: 'మీ ఆరోగ్యం గురించి అడగండి…' },
  hi: { label: 'हिन्दी', speech: 'hi-IN', placeholder: 'अपनी सेहत के बारे में पूछें…' },
};

const copy = {
  en: {
    greeting: 'Hello, I’m here to help.',
    intro: 'Tell me what’s on your mind. I can share general health information and help you think about what to do next.',
    today: 'TODAY',
    online: 'Ready to listen',
    title: 'A little care,\nwherever you are.',
    subtitle: 'A calm place to ask health questions, in the language that feels like yours.',
    listening: 'Listening…',
    micLabel: 'Tap to speak',
    micHint: 'or type your question below',
    send: 'Send message',
    emergencyTitle: 'Need urgent help?',
    emergencyText: 'For severe or sudden symptoms, get help right away.',
    emergencyAction: 'Call emergency services · India 112',
    safe: 'Private conversation',
    safeNote: 'Your questions are handled with care. This assistant does not diagnose or replace a clinician.',
    suggestions: ['How can I sleep better?', 'What helps with a mild headache?', 'How do I manage stress?'],
    thinking: 'Let me think that through…',
    failed: 'I could not reach the health guide just now. Please try again in a moment.',
    language: 'Language',
    you: 'You',
    assistant: 'ArogyaVoice',
    voiceUnsupported: 'Voice input is not available in this browser. You can type your question instead.',
    micError: 'Microphone access was unavailable. Check your browser permission and try again.',
  },
  te: {
    greeting: 'నమస్కారం, నేను సహాయం చేయడానికి ఇక్కడ ఉన్నాను.',
    intro: 'మీ మనసులో ఉన్నది చెప్పండి. సాధారణ ఆరోగ్య సమాచారం అందించి, తదుపరి ఏమి చేయాలో ఆలోచించడంలో సహాయపడతాను.',
    today: 'ఈ రోజు',
    online: 'వినడానికి సిద్ధంగా ఉంది',
    title: 'మీరు ఎక్కడున్నా,\nఆప్యాయమైన ఆరోగ్య సహాయం.',
    subtitle: 'మీకు సౌకర్యంగా అనిపించే భాషలో ఆరోగ్య ప్రశ్నలు అడగండి.',
    listening: 'వింటున్నాను…',
    micLabel: 'మాట్లాడటానికి నొక్కండి',
    micHint: 'లేదా మీ ప్రశ్నను టైప్ చేయండి',
    send: 'సందేశం పంపండి',
    emergencyTitle: 'అత్యవసర సహాయం కావాలా?',
    emergencyText: 'తీవ్రమైన లేదా అకస్మాత్తు లక్షణాలు ఉంటే వెంటనే సహాయం పొందండి.',
    emergencyAction: 'అత్యవసర సేవలకు కాల్ చేయండి · భారతదేశం 112',
    safe: 'గోప్యమైన సంభాషణ',
    safeNote: 'మీ ప్రశ్నలకు జాగ్రత్తగా స్పందిస్తాము. ఇది రోగ నిర్ధారణ కాదు, వైద్యుడికి ప్రత్యామ్నాయం కాదు.',
    suggestions: ['మంచి నిద్రకు ఏం చేయాలి?', 'తేలికపాటి తలనొప్పికి ఏది సహాయపడుతుంది?', 'ఒత్తిడిని ఎలా తగ్గించుకోవాలి?'],
    thinking: 'ఆలోచిస్తున్నాను…',
    failed: 'ఆరోగ్య సహాయాన్ని ఇప్పుడే సంప్రదించలేకపోయాను. దయచేసి మళ్లీ ప్రయత్నించండి.',
    language: 'భాష',
    you: 'మీరు',
    assistant: 'ఆరోగ్య వాయిస్',
    voiceUnsupported: 'ఈ బ్రౌజర్‌లో వాయిస్ ఇన్‌పుట్ అందుబాటులో లేదు. బదులుగా మీ ప్రశ్నను టైప్ చేయండి.',
    micError: 'మైక్రోఫోన్ అనుమతి అందలేదు. బ్రౌజర్ అనుమతులను తనిఖీ చేసి మళ్లీ ప్రయత్నించండి.',
  },
  hi: {
    greeting: 'नमस्ते, मैं आपकी मदद के लिए हूँ।',
    intro: 'जो भी बात मन में है, बताइए। मैं सामान्य स्वास्थ्य जानकारी और आगे क्या करना है, यह सोचने में मदद कर सकता हूँ।',
    today: 'आज',
    online: 'सुनने के लिए तैयार',
    title: 'सेहत की बात,\nअपनी भाषा में।',
    subtitle: 'स्वास्थ्य से जुड़े सवाल पूछें, उस भाषा में जिसमें आप सहज महसूस करते हैं।',
    listening: 'सुन रहा हूँ…',
    micLabel: 'बोलने के लिए दबाएँ',
    micHint: 'या नीचे अपना सवाल लिखें',
    send: 'संदेश भेजें',
    emergencyTitle: 'तुरंत मदद चाहिए?',
    emergencyText: 'गंभीर या अचानक लक्षण हों तो तुरंत मदद लें।',
    emergencyAction: 'आपातकालीन सेवा को कॉल करें · भारत 112',
    safe: 'निजी बातचीत',
    safeNote: 'आपके सवालों का जवाब सावधानी से दिया जाता है। यह सहायक निदान नहीं करता और डॉक्टर का विकल्प नहीं है।',
    suggestions: ['अच्छी नींद के लिए क्या करूँ?', 'हल्के सिरदर्द में क्या मदद करता है?', 'तनाव कैसे कम करूँ?'],
    thinking: 'ज़रा सोचने दीजिए…',
    failed: 'अभी स्वास्थ्य मार्गदर्शक से संपर्क नहीं हो पाया। कृपया थोड़ी देर में फिर कोशिश करें।',
    language: 'भाषा',
    you: 'आप',
    assistant: 'आरोग्यवॉइस',
    voiceUnsupported: 'इस ब्राउज़र में आवाज़ से सवाल पूछना उपलब्ध नहीं है। आप सवाल लिख सकते हैं।',
    micError: 'माइक्रोफ़ोन की अनुमति नहीं मिली। ब्राउज़र की अनुमति जाँचकर फिर कोशिश करें।',
  },
};

function initialMessages(language) {
  return [{ id: 'welcome', role: 'assistant', content: copy[language].greeting + ' ' + copy[language].intro }];
}

export default function App() {
  const [language, setLanguage] = useState('en');
  const [messages, setMessages] = useState(() => initialMessages('en'));
  const [question, setQuestion] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [notice, setNotice] = useState('');
  const [muted, setMuted] = useState(false);
  const speechRef = useRef(null);
  const endRef = useRef(null);
  const t = copy[language];

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isSending]);

  useEffect(() => () => {
    speechRef.current?.stop();
    window.speechSynthesis?.cancel();
  }, []);

  function changeLanguage(nextLanguage) {
    setLanguage(nextLanguage);
    setNotice('');
  }

  async function sendMessage(event, suggestedQuestion) {
    event?.preventDefault();
    const text = (suggestedQuestion ?? question).trim();
    if (!text || isSending) return;
    setQuestion('');
    setNotice('');
    setMessages((current) => [...current, { id: crypto.randomUUID(), role: 'user', content: text }]);
    setIsSending(true);
    try {
      const response = await fetch('/api/health', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text, language }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Request failed');
      setMessages((current) => [...current, {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.answer,
        emergency: data.emergency,
      }]);
    } catch {
      setMessages((current) => [...current, { id: crypto.randomUUID(), role: 'assistant', content: t.failed }]);
    } finally {
      setIsSending(false);
    }
  }

  function startListening() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setNotice(t.voiceUnsupported);
      return;
    }
    if (isListening) {
      speechRef.current?.stop();
      setIsListening(false);
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = languages[language].speech;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuestion(transcript);
      setIsListening(false);
      speechRef.current = null;
      sendMessage(null, transcript);
    };
    recognition.onerror = () => {
      setIsListening(false);
      speechRef.current = null;
      setNotice(t.micError);
    };
    recognition.onend = () => {
      setIsListening(false);
      speechRef.current = null;
    };
    speechRef.current = recognition;
    setNotice('');
    setIsListening(true);
    try {
      recognition.start();
    } catch {
      setIsListening(false);
      setNotice(t.micError);
    }
  }

  function speak(content) {
    if (!window.speechSynthesis || muted) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(content);
    utterance.lang = languages[language].speech;
    window.speechSynthesis.speak(utterance);
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#home" aria-label="ArogyaVoice home">
          <span className="brand-mark"><Heart size={20} strokeWidth={2.5} /></span>
          <span>Arogya<span className="brand-light">Voice</span></span>
        </a>
        <div className="sidebar-rule" />
        <div className="sidebar-label">YOUR CARE SPACE</div>
        <button className="nav-item nav-item-active" type="button"><AudioLines size={18} /> <span>Voice assistant</span></button>
        <div className="sidebar-note">
          <span className="note-icon"><ShieldCheck size={18} /></span>
          <span className="note-heading">A thoughtful first step</span>
          <span className="note-copy">Clear, calm health guidance for everyday questions.</span>
        </div>
        <div className="sidebar-bottom">
          <div className="sidebar-rule" />
          <div className="sidebar-status"><span className="status-dot" /> {t.online}</div>
          <div className="sidebar-version">ArogyaVoice · Community health</div>
        </div>
      </aside>

      <main id="home" className="main-content">
        <header className="topbar">
          <div className="mobile-brand"><span className="brand-mark"><Heart size={18} /></span> Arogya<span className="brand-light">Voice</span></div>
          <div className="topbar-meta"><span className="topbar-dot" /> {t.online}</div>
          <label className="language-select-wrap">
            <Languages size={17} aria-hidden="true" />
            <span className="sr-only">{t.language}</span>
            <select value={language} onChange={(event) => changeLanguage(event.target.value)} aria-label={t.language}>
              {Object.entries(languages).map(([key, value]) => <option key={key} value={key}>{value.label}</option>)}
            </select>
            <ChevronDown size={15} className="select-chevron" />
          </label>
        </header>

        <section className="conversation-layout" aria-label="Health assistant conversation">
          <div className="welcome-block">
            <div className="eyebrow"><span className="eyebrow-line" /> AROGYAVOICE <span className="eyebrow-dot">·</span> {t.today}</div>
            <h1>{t.title.split('\n').map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</h1>
            <p>{t.subtitle}</p>
          </div>

          <div className="conversation" aria-live="polite">
            <div className="day-divider"><span /> {t.today} <span /></div>
            {messages.map((message) => (
              <article className={`message message-${message.role}`} key={message.id}>
                {message.role === 'assistant' && <div className="avatar"><Heart size={16} fill="currentColor" /></div>}
                <div className="message-body">
                  <div className="message-heading">
                    <span>{message.role === 'assistant' ? t.assistant : t.you}</span>
                    {message.emergency && <span className="urgent-tag"><Siren size={12} /> Urgent</span>}
                  </div>
                  <p>{message.content}</p>
                  {message.role === 'assistant' && message.id !== 'welcome' && (
                    <button className="speak-button" type="button" onClick={() => speak(message.content)} disabled={muted} aria-label="Read response aloud" title={muted ? 'Spoken responses are muted' : 'Read response aloud'}><Volume2 size={15} /> <span>Listen</span></button>
                  )}
                </div>
              </article>
            ))}
            {isSending && (
              <article className="message message-assistant">
                <div className="avatar"><Heart size={16} fill="currentColor" /></div>
                <div className="message-body"><div className="message-heading">{t.assistant}</div><p className="thinking"><span /><span /><span /> {t.thinking}</p></div>
              </article>
            )}
            <div ref={endRef} />
          </div>

          <div className="composer-area">
            {messages.length === 1 && !isSending && (
              <div className="suggestions" aria-label="Suggested questions">
                {t.suggestions.map((suggestion) => <button type="button" key={suggestion} onClick={() => sendMessage(null, suggestion)}><Plus size={14} />{suggestion}</button>)}
              </div>
            )}
            <button className={`voice-button${isListening ? ' voice-button-listening' : ''}`} type="button" onClick={startListening} aria-label={isListening ? 'Stop listening' : t.micLabel}>
              {isListening ? <MicOff size={27} /> : <Mic size={27} />}
              {isListening && <span className="voice-ripple" />}
            </button>
            <div className={`voice-caption${isListening ? ' voice-caption-active' : ''}`}>{isListening ? t.listening : t.micLabel}</div>
            <div className="voice-hint">{t.micHint}</div>
            {notice && <div className="notice" role="status">{notice}</div>}
            <form className="message-form" onSubmit={(event) => sendMessage(event)}>
              <input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder={languages[language].placeholder} aria-label={languages[language].placeholder} maxLength={1000} />
              <button type="submit" disabled={!question.trim() || isSending} aria-label={t.send} title={t.send}><ArrowUp size={20} /></button>
            </form>
            <div className="composer-footnote"><Check size={13} /> {t.safe}</div>
          </div>
        </section>

        <footer className="page-footer">
          <div className="footer-disclaimer"><CircleHelp size={15} /><span>{t.safeNote}</span></div>
          <button type="button" className="mute-toggle" onClick={() => { setMuted((value) => !value); if (!muted) window.speechSynthesis?.cancel(); }} aria-label={muted ? 'Enable spoken responses' : 'Stop spoken responses'} title={muted ? 'Enable spoken responses' : 'Stop spoken responses'}>{muted ? <VolumeX size={16} /> : <Volume2 size={16} />}</button>
        </footer>
      </main>

      <aside className="emergency-panel">
        <div className="emergency-panel-top"><span className="emergency-symbol"><LifeBuoy size={19} /></span><span className="emergency-kicker">HERE WHEN YOU NEED IT</span></div>
        <h2>{t.emergencyTitle}</h2>
        <p>{t.emergencyText}</p>
        <a className="emergency-link" href="tel:112"><span><Siren size={17} /></span>{t.emergencyAction}<ArrowUp size={14} className="emergency-arrow" /></a>
        <div className="emergency-foot"><Activity size={14} /> If you are outside India, call your local emergency number.</div>
      </aside>
    </div>
  );
}