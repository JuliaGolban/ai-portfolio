import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(5,5,5,0.92);
  backdrop-filter: blur(8px);
  overflow-y: auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 60px 24px;
`;

export const ModalBox = styled(motion.div)`
  background: #0a0a0a;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 4px;
  max-width: 860px;
  width: 100%;
  padding: clamp(32px, 5vw, 64px);
  position: relative;
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  font-size: 22px;
  font-weight: 100;
  color: rgba(255,255,255,0.25);
  line-height: 1;
  transition: color 0.2s;
  &:hover { color: rgba(255,255,255,0.7); }
`;

export const TagList = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

export const Tag = styled.span`
  font-size: 9px;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.22);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 4px 10px;
  border-radius: 1px;
`;

export const ModalTitle = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-weight: 200;
  font-size: clamp(1.6rem, 4vw, 2.8rem);
  line-height: 1.1;
  color: rgba(255,255,255,0.85);
  margin-bottom: 32px;
`;

export const Cover = styled.div`
  border-radius: 3px;
  overflow: hidden;
  aspect-ratio: 16/6;
  margin-bottom: 48px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.88) saturate(0.88);
  }
`;

export const BlockLabel = styled.p`
  font-size: 9px;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.2);
  margin-bottom: 12px;
`;

export const BlockText = styled.p`
  font-family: 'Jost', sans-serif;
  font-size: 14px;
  font-weight: 300;
  line-height: 1.85;
  color: rgba(255,255,255,0.5);
`;

export const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 40px;
`;

export const ImageGridCell = styled.div`
  aspect-ratio: 3/4;
  border-radius: 3px;
  overflow: hidden;
  background: #0f0f0f;
  img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.88); }
`;

export const ResultBox = styled.div`
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 3px;
  padding: 28px 24px;
  margin-bottom: 32px;
`;

export const ToolsList = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const ToolChip = styled.span`
  font-size: 11px;
  font-weight: 300;
  letter-spacing: 0.06em;
  color: rgba(255,255,255,0.4);
  background: rgba(255,255,255,0.04);
  padding: 6px 14px;
  border-radius: 2px;
`;

export const ModalCTA = styled.a`
  display: inline-block;
  margin-top: 40px;
  font-family: 'Jost', sans-serif;
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.45);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 14px 36px;
  border-radius: 1px;
  text-decoration: none;
  transition: color 0.3s, border-color 0.3s;
  &:hover { color: rgba(255,255,255,0.85); border-color: rgba(255,255,255,0.3); }
`;
