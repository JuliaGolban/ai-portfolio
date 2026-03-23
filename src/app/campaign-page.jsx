'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import portfolioData from '../data.json';
import { LangCtx } from '../LangContext';
import {
  GlobalStyle, Container, Nav, NavLogo, NavLink, NavLinks, LangSwitch,
  SectionLabel, SectionTitle, SectionDesc,
  ImageFrame, FrameImg,
  Footer,
} from '../page.styled';

const Reveal = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay }}
  >
    {children}
  </motion.div>
);

const T = {
  ua: {
    back: '← Назад',
    task: 'Завдання',
    solution: 'Рішення',
    result: 'Результат',
    tools: 'Інструменти',
    order: 'Замовити схожий проєкт',
  },
  en: {
    back: '← Back',
    task: 'Task',
    solution: 'Solution',
    result: 'Result',
    tools: 'Tools',
    order: 'Order a similar project',
  },
};

export default function CampaignPage() {
  const lang = useContext(LangCtx) || 'ua';
  const t = T[lang];
  const { campaign, contact } = portfolioData;

  const title    = campaign[`title_${lang}`];
  const task     = campaign[`task_${lang}`];
  const solution = campaign[`solution_${lang}`];
  const result   = campaign[`result_${lang}`];
  const tags     = campaign[`tags_${lang}`];

  return (
    <>
      <GlobalStyle />
      <Container>
        {/* Minimal nav */}
        <Nav $scrolled>
          <NavLogo href="/">Julia Golban</NavLogo>
          <NavLinks>
            <NavLink href="/#pricing">Pricing</NavLink>
            <NavLink href="/#contact">Order</NavLink>
          </NavLinks>
        </Nav>

        <div style={{ maxWidth: 960, margin: '0 auto', padding: '140px 24px 100px' }}>

          {/* Back */}
          <Reveal>
            <Link href="/#works" style={{ fontSize: 10, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.25)', textDecoration: 'none', textTransform: 'uppercase' }}>
              {t.back}
            </Link>
          </Reveal>

          {/* Tags */}
          <Reveal delay={0.05}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 32 }}>
              {tags.map(tag => (
                <span key={tag} style={{ fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', border: '1px solid rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: 1 }}>
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Title */}
          <Reveal delay={0.1}>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 200, fontSize: 'clamp(2rem,5vw,3.5rem)', lineHeight: 1.1, color: 'rgba(255,255,255,0.85)', marginTop: 20 }}>
              {title}
            </h1>
          </Reveal>

          {/* Cover */}
          <Reveal delay={0.15}>
            <div style={{ marginTop: 48, borderRadius: 3, overflow: 'hidden', aspectRatio: '16/7' }}>
              <img src={campaign.cover} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.9) saturate(0.9)' }} />
            </div>
          </Reveal>

          {/* Task */}
          <Reveal delay={0.1}>
            <div style={{ marginTop: 72 }}>
              <SectionLabel>{t.task}</SectionLabel>
              <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 15, fontWeight: 300, lineHeight: 1.85, color: 'rgba(255,255,255,0.55)', maxWidth: 720 }}>
                {task}
              </p>
            </div>
          </Reveal>

          {/* Solution */}
          <Reveal delay={0.08}>
            <div style={{ marginTop: 56 }}>
              <SectionLabel>{t.solution}</SectionLabel>
              <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 15, fontWeight: 300, lineHeight: 1.85, color: 'rgba(255,255,255,0.55)', maxWidth: 720 }}>
                {solution}
              </p>
            </div>
          </Reveal>

          {/* Image grid */}
          <Reveal delay={0.1}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginTop: 56 }}>
              {campaign.images.map((src, i) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.8 }}
                  style={{ aspectRatio: '3/4', borderRadius: 3, overflow: 'hidden', background: '#0f0f0f' }}
                >
                  <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.9) saturate(0.9)' }} />
                </motion.div>
              ))}
            </div>
          </Reveal>

          {/* Result */}
          <Reveal delay={0.08}>
            <div style={{ marginTop: 64, padding: '36px 32px', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 3 }}>
              <SectionLabel>{t.result}</SectionLabel>
              <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 15, fontWeight: 300, lineHeight: 1.85, color: 'rgba(255,255,255,0.55)' }}>
                {result}
              </p>
            </div>
          </Reveal>

          {/* Tools */}
          <Reveal delay={0.06}>
            <div style={{ marginTop: 48 }}>
              <SectionLabel>{t.tools}</SectionLabel>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {campaign.tools.map(tool => (
                  <span key={tool} style={{ fontSize: 11, fontWeight: 300, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.04)', padding: '6px 14px', borderRadius: 2 }}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* CTA */}
          <Reveal delay={0.1}>
            <a href={`/#contact`} style={{ display: 'inline-block', marginTop: 64, fontFamily: "'Jost',sans-serif", fontSize: 10, fontWeight: 300, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.1)', padding: '14px 36px', borderRadius: 1, textDecoration: 'none', transition: 'all 0.3s' }}>
              {t.order} →
            </a>
          </Reveal>
        </div>

        <Footer>
          <span>Julia Golban © 2026</span>
          <span>{lang === 'ua' ? 'AI — інструмент. Людина — автор.' : 'AI as a tool. Human as an author.'}</span>
          <span>{lang === 'ua' ? 'Київ' : 'Kyiv'}</span>
        </Footer>
      </Container>
    </>
  );
}
