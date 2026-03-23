import styled from 'styled-components';
import { motion } from 'framer-motion';

export const HeroSection = styled.section`
  height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 60px 24px;
  position: relative;
  overflow: hidden;
  @media (min-width: 768px) { padding: 80px 80px; }
`;

export const VideoBackground = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, #050505 0%, rgba(5,5,5,0.5) 40%, rgba(5,5,5,0.1) 100%);
  }
`;

export const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.55) saturate(0.85);
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 700px;
`;

export const HeroEyebrow = styled(motion.p)`
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.45em;
  color: rgba(255,255,255,0.38);
  margin-bottom: 20px;
  text-transform: uppercase;
`;

export const HeroTitle = styled(motion.h1)`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(3.5rem, 10vw, 8rem);
  font-weight: 200;
  font-style: italic;
  line-height: 0.95;
  letter-spacing: -0.02em;
  color: #fff;
  margin-bottom: 28px;
`;

export const HeroSubtitle = styled(motion.p)`
  font-size: clamp(12px, 1.4vw, 14px);
  font-weight: 300;
  letter-spacing: 0.06em;
  color: rgba(255,255,255,0.38);
  max-width: 420px;
  line-height: 1.9;
  margin-bottom: 40px;
`;

export const HeroCTA = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding-bottom: 4px;
  transition: color 0.3s, border-color 0.3s;
  cursor: pointer;
  &:hover { color: rgba(255,255,255,0.9); border-color: rgba(255,255,255,0.38); }
`;
