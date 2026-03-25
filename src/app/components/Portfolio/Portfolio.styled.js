import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const PortfolioSection = styled.section`
  padding: 0 24px 120px;
  max-width: 1400px;
  margin: 0 auto;
  @media (min-width: 768px) {
    padding: 0 80px 120px;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 60px;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }
`;

const cardBase = css`
  position: relative;
  overflow: hidden;
  border-radius: 3px;
  background: #0f0f0f;
  cursor: pointer;
  aspect-ratio: 4/5;
  /* same hover as About section images */
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: transform;
  &:hover {
    transform: scale(1.04);
  }
`;

export const ImageCard = styled(motion.div)`
  ${cardBase}
`;

export const VideoCard = styled(motion.div)`
  ${cardBase}
  &[data-ratio='16:9'] {
    aspect-ratio: 16/9;
  }
`;

/* Mobile: 2-col grid (user's choice) */
const mobileScroll = css`
  @media (max-width: 639px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 10px;
    padding-bottom: 8px;
  }
`;

/* Shared grid wrapper — contain prevents scaled items bleeding outside */
const gridWrap = css`
  ${mobileScroll}
  contain: layout;
`;

export const Grid3 = styled.div`
  ${gridWrap}
  @media (min-width: 640px) {
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const GridAsymmetric = styled.div`
  ${gridWrap}
  @media (min-width: 640px) {
    display: grid;
    gap: 12px;
    grid-template-columns: 2fr 1fr 1fr;
  }
`;

export const GridEditorial = styled.div`
  ${gridWrap}
  @media (min-width: 640px) {
    display: grid;
    gap: 12px;
    grid-template-columns: 1fr 1fr 3fr;
  }
`;

export const GridCinema = styled.div`
  ${gridWrap}
  @media (min-width: 640px) {
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(3, 1fr);
    & [data-ratio='16:9'] {
      grid-column: 1 / -1;
      aspect-ratio: 16/9;
    }
  }
`;

export const GridVideo = styled.div`
  ${gridWrap}
  @media (min-width: 640px) {
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(3, 1fr);

    & > [data-ratio='16:9'] {
      grid-column: 1 / -1;
      aspect-ratio: 16/9;
    }
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const VideoOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(5, 5, 5, 0.3);
  transition: background 0.3s;
  ${VideoCard}:hover & {
    background: rgba(5, 5, 5, 0.1);
  }
`;

export const PlayBtn = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  background: rgba(5, 5, 5, 0.3);
  transition: all 0.3s;
  ${VideoCard}:hover & {
    border-color: rgba(255, 255, 255, 0.85);
    transform: scale(1.1);
  }
  &::after {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
    border-left: 12px solid rgba(255, 255, 255, 0.85);
    margin-left: 3px;
  }
`;
