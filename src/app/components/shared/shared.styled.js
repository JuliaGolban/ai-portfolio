import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { motion } from 'framer-motion';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,200;0,300;1,200;1,300&family=Jost:wght@200;300;400&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    background: #050505;
    color: #fff;
    font-family: 'Jost', sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }
  a { color: inherit; text-decoration: none; }
  button { background: none; border: none; cursor: pointer; font-family: inherit; color: inherit; }
`;

const grain = keyframes`
  0%, 100% { transform: translate(0,0) }
  20%       { transform: translate(-5%,-10%) }
  60%       { transform: translate(-15%,5%) }
  90%       { transform: translate(10%,5%) }
`;

export const Container = styled.main`
  background: #050505;
  color: #fff;
  min-height: 100vh;
  position: relative;
  font-family: 'Jost', sans-serif;
  &::after {
    content: '';
    position: fixed;
    inset: -100%;
    background: url(https://grainy-gradients.vercel.app/noise.svg);
    opacity: 0.04;
    animation: ${grain} 8s steps(10) infinite;
    pointer-events: none;
    z-index: 100;
  }
`;

export const SectionLabel = styled.p`
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 24px;
`;

export const SectionTitle = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2rem, 5vw, 3.8rem);
  font-weight: 200;
  font-style: italic;
  line-height: 1.08;
  color: rgba(255, 255, 255, 0.82);
  white-space: pre-line;
`;

export const SectionDesc = styled.p`
  font-size: 13px;
  font-weight: 300;
  letter-spacing: 0.04em;
  line-height: 1.9;
  color: rgba(255, 255, 255, 0.42);
  max-width: 360px;
  margin-top: 16px;
`;

export const Divider = styled.div`
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.07);
  margin: 0 auto 120px;

  /* @media (min-width: 768px) {
    padding: 0 80px 60px;
  }
  @media (min-width: 1280px) {
    padding: 0 80px 80px;
  } */
`;

export const ImageFrame = styled(motion.div)`
  position: relative;
  overflow: hidden;
  border-radius: 3px;
  background: #0f0f0f;
  cursor: pointer;
`;

export const FrameImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition:
    transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    filter 0.5s;
  filter: brightness(0.88) saturate(0.88);
  ${ImageFrame}:hover & {
    transform: scale(1.04);
    filter: brightness(1) saturate(1);
  }
`;

export const FrameOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(5, 5, 5, 0.65) 0%, transparent 55%);
  opacity: 0;
  transition: opacity 0.4s;
  ${ImageFrame}:hover & {
    opacity: 1;
  }
  display: flex;
  align-items: flex-end;
  padding: 20px;
`;

export const FrameCaption = styled.p`
  font-size: 9px;
  font-weight: 300;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
`;

export const CursorDot = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 36px;
  height: 36px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  pointer-events: none;
  z-index: 999;
  mix-blend-mode: difference;
  display: none;
  @media (min-width: 1024px) {
    display: block;
  }
`;
