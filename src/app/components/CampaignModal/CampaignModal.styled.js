import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 200;
  background: var(--overlay);
  backdrop-filter: blur(8px);
  overflow-y: auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 60px 24px;
`;

export const ModalBox = styled(motion.div)`
  background: var(--bg);
  border: 1px solid var(--border-soft);
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
  color: var(--text-medium);
  line-height: 1;
  transition: color 0.2s;
  &:hover {
    color: var(--text-faint);
  }
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
  color: var(--text-faint);
  border: 1px solid var(--border-soft);
  padding: 4px 10px;
  border-radius: 1px;
`;

export const ModalTitle = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-weight: 200;
  font-size: clamp(1.6rem, 4vw, 2.8rem);
  line-height: 1.1;
  color: var(--text-dark);
  margin-bottom: 32px;
`;

export const Cover = styled.div`
  border-radius: 3px;
  overflow: hidden;
  aspect-ratio: 4/3;
  margin-bottom: 48px;

  video,
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
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

export const BlockLabel = styled.p`
  font-size: 9px;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  color: var(--text-faint);
  margin-bottom: 12px;
`;

export const BlockText = styled.p`
  font-family: 'Jost', sans-serif;
  font-size: 14px;
  font-weight: 300;
  line-height: 1.85;
  color: var(--text-muted);
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
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.88);
  }
`;

export const ResultBox = styled.div`
  border: 1px solid var(--border-soft);
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
  color: var(--text-medium);
  background: var(--bg-light);
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
  color: var(--text-medium);
  border: 1px solid var(--border-soft);
  padding: 14px 36px;
  border-radius: 1px;
  text-decoration: none;
  transition:
    color 0.3s,
    border-color 0.3s;
  &:hover {
    color: var(--text-dark);
    border-color: var(--border-medium);
  }
`;
