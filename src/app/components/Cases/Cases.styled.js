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
    object-fit: cover;
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
  font-size: 9px;
  font-weight: 300;
  letter-spacing: 0.45em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.35);
`;

export const CardTitle = styled.h3`
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: clamp(1.4rem, 3vw, 1.9rem);
  font-weight: 200;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.1;
`;

export const CardSubtitle = styled.p`
  font-size: 11px;
  font-weight: 300;
  letter-spacing: 0.03em;
  color: rgba(255, 255, 255, 0.32);
  line-height: 1.5;
`;

export const CardTagList = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  margin-top: 2px;
`;

export const CardTag = styled.span`
  font-size: 8px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2px 7px;
  border-radius: 1px;
`;

export const CardCTA = styled.span`
  font-size: 9px;
  font-weight: 300;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.25);
  margin-top: 6px;
  transition: color 0.3s;
  ${CaseCard}:hover & {
    color: rgba(255, 255, 255, 0.65);
  }
`;

/* ── Modal backdrop ── */
export const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(5, 5, 5, 0.94);
  backdrop-filter: blur(10px);
  overflow-y: auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 40px 12px 80px;
  @media (min-width: 768px) {
    padding: 56px 24px 80px;
    align-items: center;
  }
`;

export const ModalBox = styled(motion.div)`
  background: #080808;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 4px;
  max-width: 960px;
  width: 100%;
  overflow: hidden;
  position: relative;
  padding: 20px;
`;

export const ModalClose = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 22px;
  font-weight: 100;
  color: rgba(255, 255, 255, 0.25);
  z-index: 10;
  transition: color 0.2s;
  line-height: 1;
  padding: 4px 8px;
  &:hover {
    color: rgba(255, 255, 255, 0.7);
  }
`;

/* ── Two-column layout: video 9:16 + text ── */
export const ModalLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  @media (min-width: 700px) {
    flex-direction: row;
    min-height: 560px;
  }
`;

/* Left — 9:16 video column */
export const ModalVideoWrap = styled.div`
  flex: 0 0 auto;
  aspect-ratio: 4/5;
  background: #0f0f0f;
  overflow: hidden;
  width: 100%;

  @media (min-width: 700px) {
    width: clamp(60%, 32%, 320px);
    aspect-ratio: unset;
    height: auto;
    align-self: stretch;
  }

  video,
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

/* Right — text column */
export const ModalTextWrap = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 40px 24px 40px;
  display: flex;
  flex-direction: column;
  @media (min-width: 700px) {
    padding: 44px 36px 44px;
  }
  max-height: 85vh;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.08) transparent;
`;

export const ModalMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  flex-wrap: wrap;
`;

export const ModalClient = styled.span`
  font-size: 9px;
  font-weight: 300;
  letter-spacing: 0.45em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.25);
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
  color: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 2px 7px;
  border-radius: 1px;
`;

export const ModalTitle = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-weight: 200;
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  color: rgba(255, 255, 255, 0.88);
  line-height: 1.1;
  margin-bottom: 6px;
`;

export const ModalSubtitle = styled.p`
  font-size: 12px;
  font-weight: 300;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.32);
  line-height: 1.7;
  margin-bottom: 24px;
`;

export const ModalBlockLabel = styled.p`
  font-size: 9px;
  letter-spacing: 0.42em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.18);
  margin-bottom: 8px;
`;

export const ModalText = styled.p`
  font-family: 'Jost', sans-serif;
  font-size: 13px;
  font-weight: 300;
  line-height: 1.85;
  color: rgba(255, 255, 255, 0.45);
  margin-bottom: 22px;
`;

export const ModalQuote = styled.blockquote`
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: clamp(1rem, 2vw, 1.25rem);
  font-weight: 200;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.6;
  border-left: 1px solid rgba(255, 255, 255, 0.12);
  padding-left: 16px;
  margin: 0 0 22px;
`;

export const ModalResultBox = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.06);
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
  color: rgba(255, 255, 255, 0.35);
  background: rgba(255, 255, 255, 0.04);
  padding: 5px 12px;
  border-radius: 2px;
`;

export const ModalCTA = styled.a`
  display: inline-block;
  margin-top: auto;
  padding-top: 28px;
  font-family: 'Jost', sans-serif;
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.38em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.38);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 13px 28px;
  border-radius: 1px;
  text-decoration: none;
  transition:
    color 0.3s,
    border-color 0.3s;
  align-self: flex-start;
  margin-top: 24px;
  &:hover {
    color: rgba(255, 255, 255, 0.82);
    border-color: rgba(255, 255, 255, 0.28);
  }
`;

export const ModalContent = styled.div``;
