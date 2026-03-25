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
import Portfolio from './components/Portfolio/Portfolio';
import Pricing from './components/Pricing/Pricing';
import Brief from './components/Brief/Brief';
import CampaignModal from './components/CampaignModal/CampaignModal';
import Footer from './components/Footer/Footer';

export default function Page() {
  const [lang, setLang] = useState('ua');
  const [campaignOpen, setCampaignOpen] = useState(false);
  // const [mounted, setMounted] = useState(false);
  const mounted = useRef(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 100 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 100 });

  // useEffect(() => {
  //   setMounted(true);
  // }, []);
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

  const toggleLang = () => setLang(l => (l === 'ua' ? 'en' : 'ua'));
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
    campaign,
    contact,
  } = portfolioData;

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
          campaign={campaign}
          lang={lang}
        />

        <Nav
          lang={lang}
          onToggleLang={toggleLang}
          contact={contact}
          translations={translations}
        />

        <Hero t={t.hero} instagramUrl={contact.instagram} />

        <About about={about} lang={lang} contact={contact} />

        <Divider />

        <Portfolio sections={portfolio} lang={lang} />

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
