import styled from 'styled-components';
import { motion } from 'framer-motion';

export const IndexSection = styled.section`
  padding: 0 24px 100px;
  max-width: 1400px;
  margin: 0 auto;
  @media (min-width: 768px) {
    padding: 0 80px 120px;
  }
`;

export const IndexHeader = styled.div`
  margin-bottom: 40px;
`;

export const IndexGrid = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 1fr;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
    /* Last item (campaign) spans full width
    & > *:last-child { 
    grid-column: 1 / -1; 
    aspect-ratio: 16/9 !important; 
    } */
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
    /* Second to last (video) — 2 cols, last (campaign) — full 
    & > *:nth-last-child(2) {
      grid-column: 2 / 4;
    }
    & > *:last-child {
      grid-column: 1 / -1;
      aspect-ratio: 16/9 !important;
    }*/
  }
`;

export const IndexCard = styled(motion.div)`
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  background: #0d0d0d;
  aspect-ratio: 4/3;
  /*
  @media (min-width: 900px) {
    &[data-tall="true"] { 
    aspect-ratio: 3/4;
     }
  }

  /* Campaign card — wide panoramic
  &[data-campaign='true'] {
    aspect-ratio: 16/5;
  }*/
`;

export const CardMedia = styled.div`
  position: absolute;
  inset: 0;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: brightness(0.72) saturate(0.82);
    transition:
      transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94),
      filter 0.5s;
  }
  ${IndexCard}:hover img {
    transform: scale(1.05);
    filter: brightness(0.5) saturate(0.7);
  }
`;

export const CardGradient = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(5, 5, 5, 0.9) 0%,
    rgba(5, 5, 5, 0.1) 45%,
    transparent 100%
  );
`;

export const CardNum = styled.span`
  position: absolute;
  top: 16px;
  left: 18px;
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 10px;
  font-weight: 200;
  color: rgba(255, 255, 255, 0.22);
  line-height: 1;
  z-index: 1;
`;

export const CardArrow = styled.span`
  display: none; /* hidden on mobile — looks bad on touch */
  @media (min-width: 768px) {
    display: block;
    position: absolute;
    top: 16px;
    right: 18px;
    font-size: 13px;
    color: rgba(255, 255, 255, 0);
    transition: all 0.35s;
    z-index: 1;
    ${IndexCard}:hover & {
      color: rgba(255, 255, 255, 0.5);
      transform: translate(3px, -3px);
    }
  }
`;

export const CardContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 18px 18px 20px;
  z-index: 1;
`;

export const CardTitle = styled.h3`
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: clamp(1rem, 2.5vw, 1.55rem);
  font-weight: 200;
  color: rgba(255, 255, 255, 0.82);
  line-height: 1.1;
  transition: color 0.3s;
  ${IndexCard}:hover & {
    color: #fff;
  }

  /* Campaign card — bigger title */
  ${IndexCard}[data-campaign="true"] & {
    font-size: clamp(1.4rem, 3.5vw, 2.4rem);
  }
`;
