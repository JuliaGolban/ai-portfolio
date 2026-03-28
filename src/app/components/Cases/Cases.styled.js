import styled from 'styled-components';
import { motion } from 'framer-motion';

/* ── Section ── */
export const CasesSection = styled.section`
  padding: 0 0 140px;
  max-width: 1400px;
  margin: 0 auto;
  @media (min-width: 768px) { padding: 0 0 160px; }
`;

export const CasesHeader = styled.div`
  padding: 0 24px 48px;
  @media (min-width: 768px) { padding: 0 80px 56px; }
`;

/* ── Horizontal carousel ── */
export const CarouselTrack = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding: 0 24px 16px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
  @media (min-width: 768px) { padding: 0 80px 16px; }
`;

export const CaseCard = styled(motion.div)`
  flex: 0 0 min(82vw, 420px);
  scroll-snap-align: start;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  background: #0f0f0f;
  aspect-ratio: 3/4;

  /* cover media fills the card */
  video, img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: brightness(0.72) saturate(0.85);
    transition: filter 0.5s, transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94);
  }

  &:hover video,
  &:hover img {
    filter: brightness(0.55) saturate(0.75);
    transform: scale(1.03);
  }
`;

export const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(5,5,5,0.92) 0%,
    rgba(5,5,5,0.3)  45%,
    transparent      100%
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 28px 24px;
  gap: 8px;
  transition: background 0.4s;
  ${CaseCard}:hover & {
    background: linear-gradient(to top, rgba(5,5,5,0.98) 0%, rgba(5,5,5,0.5) 55%, transparent 100%);
  }
`;

export const CardClient = styled.p`
  font-size: 9px;
  font-weight: 300;
  letter-spacing: 0.45em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.38);
`;

export const CardTitle = styled.h3`
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: clamp(1.4rem, 3vw, 1.9rem);
  font-weight: 200;
  color: rgba(255,255,255,0.9);
  line-height: 1.1;
`;

export const CardSubtitle = styled.p`
  font-size: 11px;
  font-weight: 300;
  letter-spacing: 0.04em;
  color: rgba(255,255,255,0.35);
  line-height: 1.5;
  max-width: 300px;
`;

export const CardTagList = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 4px;
`;

export const CardTag = styled.span`
  font-size: 8px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.22);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 3px 8px;
  border-radius: 1px;
`;

export const CardCTA = styled.span`
  font-size: 9px;
  font-weight: 300;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.28);
  margin-top: 8px;
  transition: color 0.3s;
  ${CaseCard}:hover & { color: rgba(255,255,255,0.65); }
`;

/* ── Modal ── */
export const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(5,5,5,0.94);
  backdrop-filter: blur(10px);
  overflow-y: auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 48px 16px 80px;
  @media (min-width: 768px) { padding: 64px 24px 80px; }
`;

export const ModalBox = styled(motion.div)`
  background: #080808;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 4px;
  max-width: 900px;
  width: 100%;
  overflow: hidden;
`;

export const ModalClose = styled.button`
  position: sticky;
  top: 0;
  left: 100%;
  display: block;
  margin-left: auto;
  font-size: 22px;
  font-weight: 100;
  color: rgba(255,255,255,0.25);
  padding: 16px 20px;
  transition: color 0.2s;
  z-index: 10;
  &:hover { color: rgba(255,255,255,0.7); }
`;

export const ModalCover = styled.div`
  position: relative;
  aspect-ratio: 16/7;
  background: #0f0f0f;
  overflow: hidden;
  margin-top: -48px; /* slide under close btn */
  video, img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.85) saturate(0.85);
  }
  @media (min-width: 768px) { aspect-ratio: 16/6; }
`;

export const ModalBody = styled.div`
  padding: 40px 24px 48px;
  @media (min-width: 768px) { padding: 48px 56px 64px; }
`;

export const ModalMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

export const ModalClient = styled.span`
  font-size: 9px;
  font-weight: 300;
  letter-spacing: 0.45em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.28);
`;

export const ModalTagList = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

export const ModalTag = styled.span`
  font-size: 8px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.2);
  border: 1px solid rgba(255,255,255,0.08);
  padding: 3px 8px;
  border-radius: 1px;
`;

export const ModalTitle = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-weight: 200;
  font-size: clamp(1.8rem, 5vw, 3rem);
  color: rgba(255,255,255,0.88);
  line-height: 1.1;
  margin-bottom: 6px;
`;

export const ModalSubtitle = styled.p`
  font-size: 13px;
  font-weight: 300;
  letter-spacing: 0.05em;
  color: rgba(255,255,255,0.35);
  line-height: 1.7;
  margin-bottom: 40px;
  max-width: 640px;
`;

export const ModalBlockLabel = styled.p`
  font-size: 9px;
  letter-spacing: 0.45em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.18);
  margin-bottom: 10px;
`;

export const ModalText = styled.p`
  font-family: 'Jost', sans-serif;
  font-size: 14px;
  font-weight: 300;
  line-height: 1.9;
  color: rgba(255,255,255,0.48);
  margin-bottom: 32px;
  max-width: 680px;
`;

export const ModalQuote = styled.blockquote`
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  font-weight: 200;
  color: rgba(255,255,255,0.55);
  line-height: 1.6;
  border-left: 1px solid rgba(255,255,255,0.12);
  padding-left: 20px;
  margin: 0 0 32px;
  max-width: 640px;
`;

export const ModalImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  margin: 32px 0;
  & > div {
    aspect-ratio: 4/5;
    background: #0f0f0f;
    border-radius: 2px;
    overflow: hidden;
    img { width:100%; height:100%; object-fit:cover; filter: brightness(0.88); }
  }
`;

export const ModalResultBox = styled.div`
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 3px;
  padding: 24px 20px;
  margin: 28px 0;
`;

export const ModalTools = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 6px;
`;

export const ModalTool = styled.span`
  font-size: 11px;
  font-weight: 300;
  letter-spacing: 0.06em;
  color: rgba(255,255,255,0.38);
  background: rgba(255,255,255,0.04);
  padding: 6px 14px;
  border-radius: 2px;
`;

export const ModalCTA = styled.a`
  display: inline-block;
  margin-top: 36px;
  font-family: 'Jost', sans-serif;
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 14px 36px;
  border-radius: 1px;
  text-decoration: none;
  transition: color 0.3s, border-color 0.3s;
  &:hover { color: rgba(255,255,255,0.85); border-color: rgba(255,255,255,0.3); }
`;
