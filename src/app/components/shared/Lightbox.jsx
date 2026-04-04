'use client';

import { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

/* ── Styled ── */
const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 300;
  background: rgba(5, 5, 5, 0.96);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  cursor: zoom-out;
`;

const ImgWrap = styled(motion.div)`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FullImg = styled.img`
  max-width: 90vw;
  max-height: 90vh;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 2px;
  /* render at true pixel size up to 80vw/80vh */
  display: block;
`;

const CloseBtn = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  font-size: 28px;
  font-weight: 100;
  color: rgba(255, 255, 255, 0.3);
  line-height: 1;
  z-index: 10;
  padding: 4px 10px;
  transition: color 0.2s;
  &:hover { color: rgba(255, 255, 255, 0.8); }
`;

const Caption = styled.p`
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 9px;
  font-weight: 300;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.2);
`;

const NavBtn = styled.button`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
  font-weight: 100;
  color: rgba(255, 255, 255, 0.2);
  padding: 16px 20px;
  transition: color 0.2s;
  z-index: 10;
  &:hover { color: rgba(255, 255, 255, 0.7); }
  ${({ $right }) => $right ? 'right: 8px;' : 'left: 8px;'}
`;

/* ── Component ── */
export default function Lightbox({ images, index, onClose, onChange }) {
  const img = images[index];

  const prev = useCallback(() => onChange((index - 1 + images.length) % images.length), [index, images.length, onChange]);
  const next = useCallback(() => onChange((index + 1) % images.length), [index, images.length, onChange]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handle = e => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft')  prev();
    };
    window.addEventListener('keydown', handle);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handle);
    };
  }, [onClose, next, prev]);

  if (!img) return null;

  // Always show full-quality PNG in lightbox
  const fullSrc = img.src.replace(/\.webp$/, '.png');

  return (
    <AnimatePresence>
      <Backdrop
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      >
        <CloseBtn onClick={onClose}>×</CloseBtn>

        {images.length > 1 && (
          <>
            <NavBtn onClick={e => { e.stopPropagation(); prev(); }}>‹</NavBtn>
            <NavBtn $right onClick={e => { e.stopPropagation(); next(); }}>›</NavBtn>
          </>
        )}

        <ImgWrap
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          onClick={e => e.stopPropagation()}
        >
          <FullImg
            key={fullSrc}
            src={fullSrc}
            alt={img.caption || ''}
          />
        </ImgWrap>

        {img.caption && <Caption>{img.caption}</Caption>}
      </Backdrop>
    </AnimatePresence>
  );
}

Lightbox.propTypes = {
  images:   PropTypes.arrayOf(PropTypes.shape({ src: PropTypes.string, caption: PropTypes.string })).isRequired,
  index:    PropTypes.number.isRequired,
  onClose:  PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};
