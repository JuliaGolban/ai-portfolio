'use client';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence } from 'framer-motion';
import {
  Backdrop,
  ModalBox,
  CloseBtn,
  TagList,
  Tag,
  ModalTitle,
  Cover,
  BlockLabel,
  BlockText,
  ImageGrid,
  ImageGridCell,
  ResultBox,
  ToolsList,
  ToolChip,
  ModalCTA,
} from './CampaignModal.styled';

const T = {
  ua: {
    task: 'Завдання',
    solution: 'Рішення',
    idea: 'Ідея',
    result: 'Результат',
    tools: 'Інструменти',
    order: 'Замовити схожий проєкт →',
  },
  en: {
    task: 'Task',
    solution: 'Solution',
    idea: 'Idea',
    result: 'Result',
    tools: 'Tools',
    order: 'Order a similar project →',
  },
};

export default function CampaignModal({
  open,
  onClose,
  campaign,
  lang,
  soundOn,
}) {
  const t = T[lang];
  const ref = useRef(null);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const handle = e => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [onClose]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.currentTime = 0;
    el.muted = !soundOn; // respect global sound state

    const tryPlay = () => {
      el.play().catch(() => {
        // If blocked with sound, fallback to muted
        el.muted = true;
        el.play().catch(() => {});
      });
    };

    const timer = setTimeout(tryPlay, 80);
    return () => clearTimeout(timer);
  }, []);

  if (!campaign) return null;

  return (
    <AnimatePresence>
      {open && (
        <Backdrop
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <ModalBox
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={e => e.stopPropagation()}
          >
            <CloseBtn onClick={onClose}>×</CloseBtn>

            <TagList>
              {campaign[`tags_${lang}`].map(tag => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </TagList>

            <ModalTitle>{campaign[`title_${lang}`]}</ModalTitle>

            <Cover>
              <video
                ref={ref}
                src={campaign.cover_video}
                poster={campaign.cover_poster}
                autoPlay
                loop
                playsInline
                preload="metadata"
              />
            </Cover>

            <div style={{ marginBottom: 36 }}>
              <BlockLabel>{t.task}</BlockLabel>
              <BlockText>{campaign[`task_${lang}`]}</BlockText>
            </div>

            <div style={{ marginBottom: 36 }}>
              <BlockLabel>{t.solution}</BlockLabel>
              <BlockText>{campaign[`solution_${lang}`]}</BlockText>
            </div>

            {campaign[`idea_${lang}`] && (
              <div style={{ marginBottom: 36 }}>
                <BlockLabel>{t.idea}</BlockLabel>
                <BlockText>{campaign[`idea_${lang}`]}</BlockText>
              </div>
            )}

            <ImageGrid>
              {campaign.images.map(src => (
                <ImageGridCell key={src}>
                  <img src={src} alt="" />
                </ImageGridCell>
              ))}
            </ImageGrid>

            <ResultBox>
              <BlockLabel>{t.result}</BlockLabel>
              <BlockText>{campaign[`result_${lang}`]}</BlockText>
            </ResultBox>

            <div style={{ marginBottom: 40 }}>
              <BlockLabel>{t.tools}</BlockLabel>
              <ToolsList>
                {campaign.tools.map(tool => (
                  <ToolChip key={tool}>{tool}</ToolChip>
                ))}
              </ToolsList>
            </div>

            <ModalCTA href="#contact" onClick={onClose}>
              {t.order}
            </ModalCTA>
          </ModalBox>
        </Backdrop>
      )}
    </AnimatePresence>
  );
}

CampaignModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  campaign: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired,
};
