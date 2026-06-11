'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

import portfolioData from './data.json';
import { LangCtx } from './LangContext';
import {
  translations,
  briefQuestionsTranslations,
  faqTranslations,
} from './translations';

import {
  GlobalStyle,
  Container,
  Divider,
  CursorDot,
} from './components/shared/shared.styled';
import Nav from './components/Nav/Nav';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import WorksIndex from './components/WorksIndex/WorksIndex';
import Portfolio from './components/Portfolio/Portfolio';
import Pricing from './components/Pricing/Pricing';
import Cases from './components/Cases/Cases';
import Brief from './components/Brief/Brief';
import CampaignModal from './components/CampaignModal/CampaignModal';
import Footer from './components/Footer/Footer';
import Audio from './components/Audio/Audio';

import { lsGet, lsSet } from '../lib/helpers';

/* ── helpers ── */
const LS_SOUND = 'jg-sound';
const LS_THEME = 'jg-theme';
const LS_LANG = 'jg-lang';

export default function Page() {
  /* ── init from localStorage ── */
  const [lang, setLang] = useState(() => lsGet(LS_LANG, 'ua'));
  const [theme, setTheme] = useState(() => lsGet(LS_THEME, 'dark'));
  const [soundOn, setSoundOn] = useState(false); // always start false — browser autoplay policy

  const [campaignOpen, setCampaignOpen] = useState(false);
  const mounted = useRef(false);

  /* ref to bg video element — set by Hero */
  const bgVideoRef = useRef(null);
  /* ref to currently playing portfolio video */
  const portfolioPlayingRef = useRef(null);

  /* cursor */
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 100 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 100 });

  useEffect(() => {
    mounted.current = true;
  }, []);

  useEffect(() => {
    const move = e => {
      mouseX.set(e.clientX - 18);
      mouseY.set(e.clientY - 18);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [mouseX, mouseY]);

  /* Apply theme */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    lsSet(LS_THEME, theme);
  }, [theme]);

  /* Restore sound from localStorage after bg video loads */
  useEffect(() => {
    const saved = lsGet(LS_SOUND, 'false');
    if (saved !== 'true') return;
    /* Try to apply sound when video is ready */
    const apply = () => {
      const bg = bgVideoRef.current;
      if (!bg) return;
      bg.muted = false;
      setSoundOn(true);
    };
    /* Video might not be ready yet — listen for canplay */
    const bg = bgVideoRef.current;
    if (bg) {
      if (bg.readyState >= 1) {
        apply();
      } else {
        bg.addEventListener('canplay', apply, { once: true });
      }
    } else {
      /* bgVideoRef not ready yet — retry after small delay */
      const t = setTimeout(apply, 800);
      return () => clearTimeout(t);
    }
  }, []); // run once on mount

  /* ── Called by Hero when bg video fires canplay ── */
  const onBgReady = useCallback(videoEl => {
    bgVideoRef.current = videoEl;
    const saved = lsGet(LS_SOUND, 'false');
    if (saved === 'true') {
      videoEl.muted = false;
      setSoundOn(true);
    }
  }, []);

  /* ── Sound toggle ── */
  const handleToggleSound = useCallback(() => {
    setSoundOn(prev => {
      const next = !prev;
      lsSet(LS_SOUND, next);
      const bg = bgVideoRef.current;

      if (next) {
        /* Enable sound */
        /* bg — only if no portfolio video is playing */
        if (bg && !portfolioPlayingRef.current) bg.muted = false;
        /* Portfolio video currently playing */
        if (portfolioPlayingRef.current)
          portfolioPlayingRef.current.muted = false;
      } else {
        /* Mute everything */
        if (bg) bg.muted = true;
        if (portfolioPlayingRef.current)
          portfolioPlayingRef.current.muted = true;
        /* Also mute any other videos */
        document.querySelectorAll('video').forEach(v => {
          v.muted = true;
        });
      }
      return next;
    });
  }, []);

  /* ── Called by Portfolio when video starts playing ── */
  const onPortfolioVideoPlay = useCallback(
    videoEl => {
      portfolioPlayingRef.current = videoEl;
      /* Mute bg */
      const bg = bgVideoRef.current;
      if (bg) bg.muted = true;
      /* Apply sound state to portfolio video */
      if (videoEl) videoEl.muted = !soundOn;
    },
    [soundOn],
  );

  const onPortfolioVideoPause = useCallback(() => {
    portfolioPlayingRef.current = null;
    if (bgVideoRef.current) bgVideoRef.current.muted = !soundOn;
  }, [soundOn]);

  /* ── Cases modal bg control ── */
  const onCasesModalOpen = useCallback(() => {
    if (bgVideoRef.current) bgVideoRef.current.muted = true;
  }, []);

  const onCasesModalClose = useCallback(() => {
    if (bgVideoRef.current && !portfolioPlayingRef.current) {
      bgVideoRef.current.muted = !soundOn;
    }
  }, [soundOn]);

  /* ── Campaign modal: mute/restore bg ── */
  const openCampaign = useCallback(() => {
    const bg = bgVideoRef.current;
    if (bg) bg.muted = true;
    setCampaignOpen(true);
  }, []);

  const closeCampaign = useCallback(() => {
    setCampaignOpen(false);
    /* Restore bg — only if no portfolio video playing */
    const bg = bgVideoRef.current;
    if (bg && !portfolioPlayingRef.current) bg.muted = !soundOn;
  }, [soundOn]);

  /* ── Lang toggle ── */
  const toggleLang = useCallback(() => {
    setLang(l => {
      const next = l === 'ua' ? 'en' : 'ua';
      lsSet(LS_LANG, next);
      /* Notify BriefWidget (same tab — custom event; other tabs — storage event) */
      setTimeout(() => {
        window.dispatchEvent(
          new CustomEvent('jg-lang-change', { detail: next }),
        );
      }, 0);
      return next;
    });
  }, []);

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

  const t = translations[lang];
  const faq = faqTranslations[lang];
  const {
    about,
    serviceCategories,
    additionalServices,
    pricingNote,
    portfolio,
    cases,
    contact,
    audio,
  } = portfolioData;

  const scrollTo = id =>
    setTimeout(
      () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }),
      50,
    );

  return (
    <LangCtx.Provider value={lang}>
      <GlobalStyle />
      <Container>
        {mounted && (
          <CursorDot style={{ x: smoothX, y: smoothY }} initial={false} />
        )}

        <CampaignModal
          open={campaignOpen}
          onClose={closeCampaign}
          campaign={cases?.[0] || null}
          lang={lang}
          soundOn={soundOn}
        />

        <Nav
          lang={lang}
          onToggleLang={toggleLang}
          contact={contact}
          translations={translations}
          soundOn={soundOn}
          onToggleSound={handleToggleSound}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        <Hero
          t={t.hero}
          instagramUrl={contact.instagram}
          bgVideoRef={bgVideoRef}
          onBgReady={onBgReady}
        />

        <About about={about} lang={lang} contact={contact} />

        <Divider />

        <WorksIndex
          sections={portfolio}
          cases={cases}
          lang={lang}
          onNavigate={scrollTo}
        />

        <Portfolio
          sections={portfolio}
          lang={lang}
          bgVideoRef={bgVideoRef}
          soundOn={soundOn}
          onVideoPlay={onPortfolioVideoPlay}
          onVideoPause={onPortfolioVideoPause}
        />
        <Divider />

        <Audio audioData={audio} lang={lang} soundOn={soundOn} />

        <Divider />

        <Cases
          cases={cases}
          lang={lang}
          contact={contact}
          soundOn={soundOn}
          onModalOpen={onCasesModalOpen}
          onModalClose={onCasesModalClose}
        />

        <Pricing
          serviceCategories={serviceCategories}
          additionalServices={additionalServices}
          pricingNote={pricingNote}
          faq={faq}
          lang={lang}
          t={t.pricing}
          onCampaignOpen={openCampaign}
        />

        <Brief
          lang={lang}
          t={t}
          contact={contact}
          briefQuestions={briefQuestionsTranslations}
        />

        <Footer lang={lang} t={t.footer} />
      </Container>
    </LangCtx.Provider>
  );
}
