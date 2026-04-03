'use client';

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence } from 'framer-motion';
import Reveal from '../shared/Reveal';
import {
  SectionLabel,
  SectionTitle,
  SectionDesc,
} from '../shared/shared.styled';
import {
  CasesSection,
  CasesHeader,
  CarouselTrack,
  CaseCard,
  CardOverlay,
  CardClient,
  CardTitle,
  CardSubtitle,
  CardTagList,
  CardTag,
  CardCTA,
  Backdrop,
  ModalBox,
  ModalClose,
  ModalLayout,
  ModalVideoWrap,
  ModalTextWrap,
  ModalMeta,
  ModalClient,
  ModalTagList,
  ModalTag,
  ModalTitle,
  ModalSubtitle,
  ModalQuote,
  ModalBlockLabel,
  ModalText,
  ModalResultBox,
  ModalTools,
  ModalTool,
  ModalCTA,
} from './Cases.styled';

/* ── Card cover — preload="metadata" so browser knows duration/size ── */
function CardCover({ c, autoPlay = false }) {
  if (c.cover_video) {
    return (
      <video
        src={c.cover_video}
        poster={c.cover_poster || undefined}
        autoPlay={autoPlay}
        loop
        muted
        playsInline
        preload={autoPlay ? 'auto' : 'none'}
      />
    );
  }
  if (c.cover_image)
    return <img src={c.cover_image} alt={c.title_en} loading="lazy" />;
  return <div style={{ width: '100%', height: '100%', background: '#111' }} />;
}
CardCover.propTypes = { c: PropTypes.object.isRequired };

/* ── Modal video — plays immediately on mount, no poster wait ── */
function ModalVideo({ c }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Force play immediately — don't wait for preload
    el.currentTime = 0;
    const playPromise = el.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay blocked — still show poster, acceptable fallback
      });
    }
  }, []);

  if (c.cover_video) {
    return (
      <video
        ref={ref}
        src={c.cover_video}
        // No poster in modal — avoids flash while video loads
        loop
        muted
        playsInline
        // preload="auto" tells browser to buffer as much as possible
        preload="auto"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block',
        }}
      />
    );
  }
  if (c.cover_image) {
    return (
      <img
        src={c.cover_image}
        alt={c.title_en}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    );
  }
  return null;
}
ModalVideo.propTypes = { c: PropTypes.object.isRequired };

/* ── Modal ── */
function CaseModal({ c, lang, onClose, contactUrl }) {
  const labels = {
    task: lang === 'ua' ? 'Завдання' : 'Task',
    idea: lang === 'ua' ? 'Ідея' : 'Idea',
    result: lang === 'ua' ? 'Результат' : 'Result',
    tools: lang === 'ua' ? 'Інструменти' : 'Tools',
    order:
      lang === 'ua' ? 'Замовити схожий проєкт →' : 'Order a similar project →',
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const esc = e => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', esc);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', esc);
    };
  }, [onClose]);

  const tags = c[`tags_${lang}`] || c.tags_en || [];

  return (
    <Backdrop
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <ModalBox
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={e => e.stopPropagation()}
      >
        <ModalClose onClick={onClose}>×</ModalClose>

        <ModalLayout>
          {/* LEFT — video fills fixed container */}
          <ModalVideoWrap>
            <ModalVideo c={c} />
          </ModalVideoWrap>

          {/* RIGHT — scrollable text */}
          <ModalTextWrap>
            <ModalMeta>
              <ModalClient>{c.client}</ModalClient>
              <ModalTagList>
                {tags.map(tag => (
                  <ModalTag key={tag}>{tag}</ModalTag>
                ))}
              </ModalTagList>
            </ModalMeta>

            <ModalTitle>{c[`title_${lang}`] || c.title_en}</ModalTitle>
            <ModalSubtitle>
              {c[`subtitle_${lang}`] || c.subtitle_en}
            </ModalSubtitle>

            {(c[`intro_${lang}`] || c.intro_en) && (
              <ModalQuote>{c[`intro_${lang}`] || c.intro_en}</ModalQuote>
            )}

            {(c[`task_${lang}`] || c.task_en) && (
              <>
                <ModalBlockLabel>{labels.task}</ModalBlockLabel>
                <ModalText>{c[`task_${lang}`] || c.task_en}</ModalText>
              </>
            )}

            {(c[`idea_${lang}`] || c.idea_en) && (
              <>
                <ModalBlockLabel>{labels.idea}</ModalBlockLabel>
                <ModalText>{c[`idea_${lang}`] || c.idea_en}</ModalText>
              </>
            )}

            {(c[`result_${lang}`] || c.result_en) && (
              <ModalResultBox>
                <ModalBlockLabel>{labels.result}</ModalBlockLabel>
                <ModalText style={{ marginBottom: 0 }}>
                  {c[`result_${lang}`] || c.result_en}
                </ModalText>
              </ModalResultBox>
            )}

            {c.tools && c.tools.length > 0 && (
              <>
                <ModalBlockLabel style={{ marginTop: 24 }}>
                  {labels.tools}
                </ModalBlockLabel>
                <ModalTools>
                  {c.tools.map(tool => (
                    <ModalTool key={tool}>{tool}</ModalTool>
                  ))}
                </ModalTools>
              </>
            )}

            <ModalCTA href={contactUrl} onClick={onClose}>
              {labels.order}
            </ModalCTA>
          </ModalTextWrap>
        </ModalLayout>
      </ModalBox>
    </Backdrop>
  );
}
CaseModal.propTypes = {
  c: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  contactUrl: PropTypes.string.isRequired,
};

/* ── Main Cases component ── */
export default function Cases({ cases, lang, contact }) {
  const [active, setActive] = useState(null);

  const title =
    lang === 'ua' ? 'AI Campaign\nпроєкти' : 'AI Campaign\nProjects';
  const desc =
    lang === 'ua'
      ? 'Концептуальні кейси для глобальних брендів. Повний AI-продакшн — від ідеї до фінального кадру.'
      : 'Conceptual cases for global brands. Full AI production — from idea to final frame.';
  const openLbl = lang === 'ua' ? 'Відкрити кейс →' : 'Open case →';

  return (
    <CasesSection id="cases">
      <CasesHeader>
        <Reveal>
          <SectionLabel>Case Studies</SectionLabel>
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
                  <CardSubtitle>
                    {c[`subtitle_${lang}`] || c.subtitle_en}
                  </CardSubtitle>
                  <CardTagList>
                    {tags.map(tag => (
                      <CardTag key={tag}>{tag}</CardTag>
                    ))}
                  </CardTagList>
                  <CardCTA>{openLbl}</CardCTA>
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
            contactUrl={contact.instagram}
          />
        )}
      </AnimatePresence>
    </CasesSection>
  );
}

Cases.propTypes = {
  cases: PropTypes.array.isRequired,
  lang: PropTypes.string.isRequired,
  contact: PropTypes.object.isRequired,
};
