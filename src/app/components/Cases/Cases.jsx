'use client';

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence } from 'framer-motion';
import Reveal from '../shared/Reveal';
import { SectionLabel, SectionTitle, SectionDesc } from '../shared/shared.styled';
import {
  CasesSection, CasesHeader,
  CarouselTrack, CaseCard, CardOverlay,
  CardClient, CardTitle, CardSubtitle, CardTagList, CardTag, CardCTA,
  Backdrop, ModalBox, ModalClose, ModalCover, ModalBody,
  ModalMeta, ModalClient, ModalTagList, ModalTag,
  ModalTitle, ModalSubtitle,
  ModalBlockLabel, ModalText, ModalQuote,
  ModalImageGrid, ModalResultBox,
  ModalTools, ModalTool, ModalCTA,
} from './Cases.styled';

/* ── Case card cover — video or image ── */
function CardCover({ c }) {
  const videoRef = useRef(null);

  if (c.cover_video) {
    return (
      <video
        ref={videoRef}
        src={c.cover_video}
        poster={c.cover_poster || undefined}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
      />
    );
  }
  if (c.cover_image) {
    return <img src={c.cover_image} alt={c.title_en} loading="lazy" />;
  }
  return <div style={{ width: '100%', height: '100%', background: '#111' }} />;
}
CardCover.propTypes = { c: PropTypes.object.isRequired };

/* ── Modal cover ── */
function ModalCoverMedia({ c }) {
  if (c.cover_video) {
    return (
      <video
        src={c.cover_video}
        poster={c.cover_poster || undefined}
        autoPlay loop muted playsInline
      />
    );
  }
  if (c.cover_image) {
    return <img src={c.cover_image} alt={c.title_en} />;
  }
  return null;
}
ModalCoverMedia.propTypes = { c: PropTypes.object.isRequired };

/* ── Modal ── */
function CaseModal({ c, lang, onClose, contactUrl }) {
  const t = {
    task:   lang === 'ua' ? 'Завдання'  : 'Task',
    idea:   lang === 'ua' ? 'Ідея'      : 'Idea',
    result: lang === 'ua' ? 'Результат' : 'Result',
    tools:  lang === 'ua' ? 'Інструменти' : 'Tools',
    order:  lang === 'ua' ? 'Замовити схожий проєкт →' : 'Order a similar project →',
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const esc = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', esc);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', esc);
    };
  }, [onClose]);

  const tags = c[`tags_${lang}`] || c.tags_en || [];
  const hasImages = c.images && c.images.length > 0;

  return (
    <Backdrop
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <ModalBox
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={e => e.stopPropagation()}
      >
        <ModalClose onClick={onClose}>×</ModalClose>

        <ModalCover style={{ marginTop: -48 }}>
          <ModalCoverMedia c={c} />
        </ModalCover>

        <ModalBody>
          <ModalMeta>
            <ModalClient>{c.client}</ModalClient>
            <ModalTagList>
              {tags.map(tag => <ModalTag key={tag}>{tag}</ModalTag>)}
            </ModalTagList>
          </ModalMeta>

          <ModalTitle>{c[`title_${lang}`] || c.title_en}</ModalTitle>
          <ModalSubtitle>{c[`subtitle_${lang}`] || c.subtitle_en}</ModalSubtitle>

          {/* Intro quote */}
          {(c[`intro_${lang}`] || c.intro_en) && (
            <ModalQuote>{c[`intro_${lang}`] || c.intro_en}</ModalQuote>
          )}

          {/* Task */}
          {(c[`task_${lang}`] || c.task_en) && (
            <>
              <ModalBlockLabel>{t.task}</ModalBlockLabel>
              <ModalText>{c[`task_${lang}`] || c.task_en}</ModalText>
            </>
          )}

          {/* Idea */}
          {(c[`idea_${lang}`] || c.idea_en) && (
            <>
              <ModalBlockLabel>{t.idea}</ModalBlockLabel>
              <ModalText>{c[`idea_${lang}`] || c.idea_en}</ModalText>
            </>
          )}

          {/* Image grid */}
          {hasImages && (
            <ModalImageGrid>
              {c.images.map(src => (
                <div key={src}>
                  <img src={src} alt="" loading="lazy" />
                </div>
              ))}
            </ModalImageGrid>
          )}

          {/* Result */}
          {(c[`result_${lang}`] || c.result_en) && (
            <ModalResultBox>
              <ModalBlockLabel>{t.result}</ModalBlockLabel>
              <ModalText style={{ marginBottom: 0 }}>{c[`result_${lang}`] || c.result_en}</ModalText>
            </ModalResultBox>
          )}

          {/* Tools */}
          {c.tools && c.tools.length > 0 && (
            <>
              <ModalBlockLabel>{t.tools}</ModalBlockLabel>
              <ModalTools>
                {c.tools.map(tool => <ModalTool key={tool}>{tool}</ModalTool>)}
              </ModalTools>
            </>
          )}

          <ModalCTA href={contactUrl} onClick={onClose}>{t.order}</ModalCTA>
        </ModalBody>
      </ModalBox>
    </Backdrop>
  );
}
CaseModal.propTypes = {
  c:          PropTypes.object.isRequired,
  lang:       PropTypes.string.isRequired,
  onClose:    PropTypes.func.isRequired,
  contactUrl: PropTypes.string.isRequired,
};

/* ── Main Cases component ── */
export default function Cases({ cases, lang, contact }) {
  const [active, setActive] = useState(null);

  const label = lang === 'ua' ? 'Case Studies' : 'Case Studies';
  const title = lang === 'ua' ? 'AI Campaign\nпроєкти' : 'AI Campaign\nProjects';
  const desc  = lang === 'ua'
    ? 'Концептуальні кейси для глобальних брендів. Повний AI-продакшн — від ідеї до фінального кадру.'
    : 'Conceptual cases for global brands. Full AI production — from idea to final frame.';
  const openLabel = lang === 'ua' ? 'Відкрити кейс' : 'Open case';

  return (
    <CasesSection id="cases">
      <CasesHeader>
        <Reveal>
          <SectionLabel>{label}</SectionLabel>
          <SectionTitle>{title}</SectionTitle>
          <SectionDesc>{desc}</SectionDesc>
        </Reveal>
      </CasesHeader>

      <CarouselTrack>
        {cases.map((c, i) => {
          const tags = c[`tags_${lang}`] || c.tags_en || [];
          return (
            <Reveal key={c.id} delay={i * 0.1}>
              <CaseCard onClick={() => setActive(c)}>
                <CardCover c={c} />
                <CardOverlay>
                  <CardClient>{c.client}</CardClient>
                  <CardTitle>{c[`title_${lang}`] || c.title_en}</CardTitle>
                  <CardSubtitle>{c[`subtitle_${lang}`] || c.subtitle_en}</CardSubtitle>
                  <CardTagList>
                    {tags.map(tag => <CardTag key={tag}>{tag}</CardTag>)}
                  </CardTagList>
                  <CardCTA>{openLabel} →</CardCTA>
                </CardOverlay>
              </CaseCard>
            </Reveal>
          );
        })}
      </CarouselTrack>

      <AnimatePresence>
        {active && (
          <CaseModal
            c={active}
            lang={lang}
            onClose={() => setActive(null)}
            contactUrl={`${contact.instagram}`}
          />
        )}
      </AnimatePresence>
    </CasesSection>
  );
}

Cases.propTypes = {
  cases:   PropTypes.array.isRequired,
  lang:    PropTypes.string.isRequired,
  contact: PropTypes.object.isRequired,
};
