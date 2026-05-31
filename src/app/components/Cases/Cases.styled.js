import styled from 'styled-components';
import { motion } from 'framer-motion';

/* ── Section ── */
export const CasesSection = styled.section`
  padding: 0 0 140px;
  max-width: 1400px;
  margin: 0 auto;
  @media (min-width: 768px) {
    padding: 0 0 160px;
  }
`;

export const CasesHeader = styled.div`
  padding: 0 24px 48px;
  @media (min-width: 768px) {
    padding: 0 80px 56px;
  }
`;

/* ── Carousel ── */
export const CarouselTrack = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  overflow-x: auto;
  padding: 0 24px 16px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 768px) {
    padding: 0 80px 16px;
  }
`;

export const CaseCard = styled(motion.div)`
  flex: 0 0 min(80vw, 380px);
  scroll-snap-align: start;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  background: #0f0f0f;
  aspect-ratio: 9/16;

  video,
  img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* always fills, crops if ratio differs */
    display: block;
    filter: brightness(0.72) saturate(0.85);
    transition:
      filter 0.5s,
      transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  &:hover video,
  &:hover img {
    filter: brightness(0.5) saturate(0.75);
    transform: scale(1.03);
  }
`;

export const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(5, 5, 5, 0.95) 0%,
    rgba(5, 5, 5, 0.2) 50%,
    transparent 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 28px 22px;
  gap: 7px;
`;

export const CardClient = styled.p`
  font-size: 10px;
  font-weight: 400;
  letter-spacing: 0.45em;
  text-transform: uppercase;
  color: var(--text-muted);
`;

export const CardTitle = styled.h3`
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: clamp(1.4rem, 3vw, 1.9rem);
  font-weight: 200;
  color: var(--text-dark);
  line-height: 1.1;
`;

export const CardSubtitle = styled.p`
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.03em;
  color: var(--text-muted);
  line-height: 1.5;
`;

export const CardTagList = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  margin-top: 2px;
`;

export const CardTag = styled.span`
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--text-muted);
  border: 1px solid var(--border-soft);
  padding: 2px 7px;
  border-radius: 1px;
`;

export const CardCTA = styled.span`
  font-size: 10px;
  font-weight: 400;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-top: 6px;
  transition: color 0.3s;
  ${CaseCard}:hover & {
    color: var(--text-label);
  }
`;

/* ── Modal backdrop — no scroll on backdrop itself ── */
export const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 200;
  background: var(--overlay);
  backdrop-filter: blur(10px);
  /* No overflow-y: auto here — scroll only inside text column */
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 12px;
  @media (min-width: 768px) {
    padding: 40px 24px;
  }
`;

export const ModalBox = styled(motion.div)`
  background: var(--bg-modal);
  border: 1px solid var(--border-soft);
  border-radius: 4px;
  max-width: 960px;
  width: 100%;
  overflow: hidden;
  position: relative;
  /* Fixed height so modal never goes off-screen */
  max-height: calc(100vh - 48px);
  display: flex;
  flex-direction: column;
  @media (min-width: 700px) {
    max-height: calc(100vh - 80px);
  }
`;

export const ModalClose = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 22px;
  font-weight: 100;
  color: var(--text-muted);
  z-index: 10;
  transition: color 0.2s;
  line-height: 1;
  padding: 4px 8px;
  &:hover {
    color: var(--text-label);
  }
`;

/* ── Two-column layout ── */
export const ModalLayout = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0; /* important: allows children to scroll */
  gap: 0;
  @media (min-width: 700px) {
    flex-direction: row;
  }
`;

/*
  Video column — fixed container, video fills it with object-fit: contain.
  Any aspect ratio (9:16, 4:5) gets cropped to fill — no black bars, no distortion.
  Width controlled; height stretches to match text column on desktop.
*/
export const ModalVideoWrap = styled.div`
  flex: 0 0 auto;
  overflow: hidden;
  background: var(--bg-card);

  /* Mobile: fixed height box */
  width: 100%;
  height: 260px;

  @media (min-width: 700px) {
    /* Desktop: fixed width, full height of modal */
    width: 300px;
    height: auto;
    align-self: stretch;
  }

  video,
  img {
    width: 100%;
    height: 100%;
    object-fit: contain; /* always fills, crops if ratio differs */
    display: block;
  }
`;

/*
  Text column — scrollable, takes remaining space.
  Scroll here, not on backdrop.
*/
export const ModalTextWrap = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 48px 24px 32px;
  display: flex;
  flex-direction: column;

  @media (min-width: 700px) {
    padding: 48px 36px 36px;
  }

  /* Thin scrollbar */
  scrollbar-width: thin;
  scrollbar-color: var(--text-faint) transparent;
  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--text-faint);
    border-radius: 2px;
  }
`;

export const ModalMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  flex-wrap: wrap;
`;

export const ModalClient = styled.span`
  font-size: 10px;
  font-weight: 400;
  letter-spacing: 0.45em;
  text-transform: uppercase;
  color: var(--text-muted);
`;

export const ModalTagList = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
`;

export const ModalTag = styled.span`
  font-size: 8px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-faint);
  border: 1px solid var(--border-soft);
  padding: 2px 7px;
  border-radius: 1px;
`;

export const ModalTitle = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-weight: 200;
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  color: var(--text-dark);
  line-height: 1.1;
  margin-bottom: 6px;
`;

export const ModalSubtitle = styled.p`
  font-size: 12px;
  font-weight: 300;
  letter-spacing: 0.04em;
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: 24px;
`;

export const ModalBlockLabel = styled.p`
  font-size: 9px;
  letter-spacing: 0.42em;
  text-transform: uppercase;
  color: var(--text-faint);
  margin-bottom: 8px;
`;

export const ModalText = styled.p`
  font-family: 'Jost', sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.85;
  color: var(--text-muted);
  margin-bottom: 22px;
`;

export const ModalQuote = styled.blockquote`
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: clamp(1rem, 2vw, 1.25rem);
  font-weight: 200;
  color: var(--text-label);
  line-height: 1.6;
  border-left: 1px solid var(--border-soft);
  padding-left: 16px;
  margin: 0 0 22px;
`;

export const ModalResultBox = styled.div`
  border: 1px solid var(--border-soft);
  border-radius: 3px;
  padding: 18px 16px;
  margin: 8px 0 16px;
`;

export const ModalTools = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 4px;
`;

export const ModalTool = styled.span`
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.05em;
  color: var(--text-medium);
  background: var(--bg-light);
  padding: 5px 12px;
  border-radius: 2px;
`;

export const ModalCTA = styled.a`
  display: inline-block;
  font-family: 'Jost', sans-serif;
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.38em;
  text-transform: uppercase;
  color: var(--text-medium);
  border: 1px solid var(--border-soft);
  padding: 13px 28px;
  border-radius: 1px;
  text-decoration: none;
  transition:
    color 0.3s,
    border-color 0.3s;
  align-self: flex-start;
  margin-top: 24px;
  &:hover {
    color: var(--text-dark);
    border-color: var(--border-medium);
  }
`;
