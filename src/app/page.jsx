'use client';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { motion, useMotionValue, useSpring } from 'framer-motion';
// import { Send, Instagram, Globe } from 'lucide-react';

// --- Animations ---
const grain = keyframes`
  0%, 100% { transform:translate(0,0) }
  20% { transform:translate(-5%,-10%) }
  60% { transform:translate(-15%,5%) }
  90% { transform:translate(10%,5%) }
`;

// --- Styled Components ---
const Container = styled.main`
  background: #050505;
  color: white;
  min-height: 100vh;
  position: relative;
  &::after {
    content: '';
    position: fixed;
    inset: -100%;
    background: url(https://grainy-gradients.vercel.app/noise.svg);
    opacity: 0.05;
    animation: ${grain} 8s steps(10) infinite;
    pointer-events: none;
    z-index: 100;
  }
`;

const MobileNav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 90;
  display: flex;
  justify-content: space-between;
  padding: 24px;
  backdrop-filter: blur(10px);
  font-size: 12px;
  letter-spacing: 0.3em;
  @media (min-width: 768px) {
    padding: 40px 80px;
  }
`;

const HeroSection = styled.section`
  height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const VideoBackground = styled.div`
  position: absolute;
  inset: 0;
  z-index: -1;
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle, transparent 0%, #050505 100%);
  }
`;

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.4) saturate(0.8);
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 10vw, 8rem);
  font-weight: 200;
  line-height: 1;
  margin: 20px 0;
  background: linear-gradient(to bottom, #fff, #444);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const PortfolioGrid = styled.section`
  display: grid;
  gap: 40px;
  padding: 100px 24px;
  max-width: 1200px;
  margin: 0 auto;
  grid-template-columns: 1fr;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const GlassCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 30px;
  padding: 30px;
`;

const CursorDot = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  pointer-events: none;
  z-index: 999;
  display: none;
  @media (min-width: 1024px) {
    display: block;
  }
`;

// --- Sub-components with Prop-Types ---
const Reveal = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: true }}
    transition={{ duration: 1 }}
  >
    {children}
  </motion.div>
);
Reveal.propTypes = { children: PropTypes.node.isRequired };

// --- Main Page Component ---
export default function Portfolio() {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 100 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 100 });

  useEffect(() => {
    const move = e => {
      mouseX.set(e.clientX - 20);
      mouseY.set(e.clientY - 20);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [mouseX, mouseY]);

  const textAnimation = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const letterAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Container>
      <CursorDot
        style={{ x: smoothX, y: smoothY }}
        animate={{
          scale: isHovered ? 1.5 : 1,
          background: isHovered ? 'rgba(255,255,255,0.1)' : 'transparent',
        }}
      />

      <MobileNav>
        <div>AI.CREATOR</div>
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          CONTACT
        </div>
      </MobileNav>

      <HeroSection>
        <VideoBackground>
          <StyledVideo autoPlay loop muted playsInline>
            <source src="/bg-cinematic.mp4" type="video/mp4" />
          </StyledVideo>
        </VideoBackground>

        <Title variants={textAnimation} initial="hidden" animate="visible">
          {'Beyond Art'.split('').map((char, i) => (
            <motion.span key={i} variants={letterAnimation}>
              {char}
            </motion.span>
          ))}
        </Title>
      </HeroSection>

      <PortfolioGrid>
        {[1, 2, 3, 4].map(item => (
          <Reveal key={item}>
            <GlassCard
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div
                style={{
                  aspectRatio: '16/9',
                  background: '#111',
                  borderRadius: '15px',
                  marginBottom: '20px',
                }}
              />
              <h3 style={{ fontWeight: 200 }}>Cinematic AI Frame {item}</h3>
            </GlassCard>
          </Reveal>
        ))}
      </PortfolioGrid>

      <footer
        style={{
          padding: '80px',
          textAlign: 'center',
          opacity: 0.2,
          fontSize: '10px',
          letterSpacing: '4px',
        }}
      >
        ESTABLISHED 2026 • CODED BY AI
      </footer>
    </Container>
  );
}
