import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

export const SoundBtn = styled(motion.button)`
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 80;
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(8, 8, 8, 0.75);
  border: 1px solid rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
  border-radius: 2px;
  padding: 9px 14px;
  cursor: pointer;
  transition: border-color 0.3s, background 0.3s;
  &:hover {
    border-color: rgba(255,255,255,0.25);
    background: rgba(8, 8, 8, 0.92);
  }
  @media (max-width: 600px) {
    bottom: 20px;
    right: 20px;
  }
`;

export const SoundLabel = styled.span`
  font-family: 'Jost', sans-serif;
  font-size: 8px;
  font-weight: 300;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
  transition: color 0.3s;
  ${SoundBtn}:hover & { color: rgba(255,255,255,0.6); }
`;

/* Animated sound bars */
const barUp = keyframes`
  0%, 100% { transform: scaleY(0.3); }
  50%       { transform: scaleY(1); }
`;

export const BarsWrap = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 12px;
`;

export const Bar = styled.span`
  display: block;
  width: 2px;
  border-radius: 1px;
  background: rgba(255,255,255,0.35);
  transform-origin: bottom;
  height: 100%;

  ${({ $playing, $delay }) =>
    $playing
      ? `
        animation: ${barUp} ${0.9 + $delay * 0.15}s ease-in-out infinite;
        animation-delay: ${$delay * 0.12}s;
        background: rgba(255,255,255,0.55);
      `
      : `
        transform: scaleY(0.3);
        background: rgba(255,255,255,0.2);
      `
  }
`;
