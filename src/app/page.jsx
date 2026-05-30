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

export default function Page() {
  const [lang, setLang] = useState('ua');
  const [campaignOpen, setCampaignOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [theme, setTheme] = useState('dark');
  const mounted = useRef(false);
  const bgVideoRef = useRef(null);

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

  /* Apply theme to <html> */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  /* Sound toggle — controls bg video mute */
  const handleToggleSound = useCallback(() => {
    const bg = bgVideoRef.current;
    if (!bg) return;
    const next = !soundOn;
    bg.muted = !next;
    setSoundOn(next);
  }, [soundOn]);

  const toggleLang = () => setLang(l => (l === 'ua' ? 'en' : 'ua'));
  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

  const openCampaign = useCallback(() => setCampaignOpen(true), []);
  const closeCampaign = useCallback(() => setCampaignOpen(false), []);

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
        />

        <About about={about} lang={lang} contact={contact} />

        <Divider />

        <WorksIndex
          sections={portfolio}
          cases={cases}
          lang={lang}
          onNavigate={scrollTo}
        />

        <Portfolio sections={portfolio} lang={lang} bgVideoRef={bgVideoRef} />

        <Cases cases={cases} lang={lang} contact={contact} />

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
