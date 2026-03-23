import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { motion } from 'framer-motion';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,200;0,300;1,200;1,300&family=Jost:wght@200;300;400&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #050505; color: #fff; font-family: 'Jost', sans-serif; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
  a { color: inherit; text-decoration: none; }
  button { background: none; border: none; cursor: pointer; font-family: inherit; color: inherit; }
`;

const grain = keyframes`
  0%, 100% { transform: translate(0,0) }
  20% { transform: translate(-5%,-10%) }
  60% { transform: translate(-15%,5%) }
  90% { transform: translate(10%,5%) }
`;

// ─── Layout
export const Container = styled.main`
  background: #050505;
  color: white;
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

// ─── Nav
export const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 90;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  transition:
    background 0.4s,
    backdrop-filter 0.4s;
  background: ${({ $scrolled }) =>
    $scrolled ? 'rgba(5,5,5,0.88)' : 'transparent'};
  backdrop-filter: ${({ $scrolled }) => ($scrolled ? 'blur(14px)' : 'none')};
  @media (min-width: 768px) {
    padding: 32px 80px;
  }
`;
export const NavLogo = styled.a`
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 16px;
  font-weight: 200;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: rgba(255, 255, 255, 0.95);
  }
`;
export const NavLinks = styled.div`
  display: none;
  gap: 40px;
  align-items: center;
  @media (min-width: 768px) {
    display: flex;
  }
`;
export const NavLink = styled.a`
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.38);
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: rgba(255, 255, 255, 0.85);
  }
`;
export const LangSwitch = styled.button`
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.3em;
  color: rgba(255, 255, 255, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 5px 10px;
  border-radius: 1px;
  cursor: pointer;
  transition:
    color 0.3s,
    border-color 0.3s;
  &:hover {
    color: rgba(255, 255, 255, 0.75);
    border-color: rgba(255, 255, 255, 0.3);
  }
`;
export const BurgerBtn = styled.button`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 4px;
  z-index: 95;
  @media (min-width: 768px) {
    display: none;
  }
`;
export const BurgerLine = styled.span`
  display: block;
  width: 22px;
  height: 1px;
  background: rgba(255, 255, 255, 0.6);
  transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  &:nth-child(1) {
    transform: ${({ $open }) =>
      $open ? 'translateY(6px) rotate(45deg)' : 'none'};
  }
  &:nth-child(2) {
    opacity: ${({ $open }) => ($open ? 0 : 1)};
  }
  &:nth-child(3) {
    transform: ${({ $open }) =>
      $open ? 'translateY(-6px) rotate(-45deg)' : 'none'};
  }
`;
export const MobileMenu = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 88;
  background: rgba(5, 5, 5, 0.97);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  @media (min-width: 768px) {
    display: none;
  }
`;
export const MobileMenuLink = styled.a`
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: clamp(2rem, 8vw, 3rem);
  font-weight: 200;
  color: rgba(255, 255, 255, 0.65);
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: #fff;
  }
`;

// ─── Hero
export const HeroSection = styled.section`
  height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 60px 24px;
  position: relative;
  overflow: hidden;
  @media (min-width: 768px) {
    padding: 80px 80px;
  }
`;
export const VideoBackground = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      #050505 0%,
      rgba(5, 5, 5, 0.5) 40%,
      rgba(5, 5, 5, 0.1) 100%
    );
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
  color: rgba(255, 255, 255, 0.38);
  margin-bottom: 20px;
  text-transform: uppercase;
`;
export const Title = styled(motion.h1)`
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
  color: rgba(255, 255, 255, 0.38);
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
  color: rgba(255, 255, 255, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 4px;
  transition:
    color 0.3s,
    border-color 0.3s;
  cursor: pointer;
  &:hover {
    color: rgba(255, 255, 255, 0.9);
    border-color: rgba(255, 255, 255, 0.38);
  }
`;

// ─── Shared
export const SectionLabel = styled.p`
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.2);
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
  color: rgba(255, 255, 255, 0.3);
  max-width: 360px;
  margin-top: 16px;
`;
export const Divider = styled.div`
  width: 1px;
  height: 80px;
  background: rgba(255, 255, 255, 0.07);
  margin: 0 auto 120px;
`;

// ─── Images
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

// ─── About
export const AboutSection = styled.section`
  padding: 140px 24px;
  max-width: 1400px;
  margin: 0 auto;
  @media (min-width: 768px) {
    padding: 160px 80px;
  }
`;
export const AboutLayout = styled.div`
  display: grid;
  gap: 60px;
  grid-template-columns: 1fr;
  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 80px;
  }
`;
export const AboutText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;
export const AboutImages = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 10px;
`;
export const AboutImgMain = styled(ImageFrame)`
  aspect-ratio: 3/4;
  grid-column: 1;
  grid-row: 1 / 3;
`;
export const AboutImgSide = styled(ImageFrame)`
  aspect-ratio: 1/1;
`;

// ─── Portfolio
export const PortfolioSection = styled.section`
  padding: 0 24px 140px;
  max-width: 1400px;
  margin: 0 auto;
  @media (min-width: 768px) {
    padding: 0 80px 160px;
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
export const Grid3 = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr;
  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }
  & > * {
    aspect-ratio: 3/4;
  }
`;
export const GridAsymmetric = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 360px 240px;
  }
  & > *:first-child {
    @media (min-width: 768px) {
      grid-column: 1/2;
      grid-row: 1/3;
    }
    aspect-ratio: 2/3;
  }
  & > *:nth-child(2) {
    @media (min-width: 768px) {
      grid-column: 2/4;
      grid-row: 1;
    }
    aspect-ratio: 16/9;
  }
  & > *:not(:first-child):not(:nth-child(2)) {
    aspect-ratio: 1/1;
  }
`;
export const GridEditorial = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr;
  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr 1fr;
    grid-template-rows: 500px 280px;
  }
  & > *:first-child {
    @media (min-width: 768px) {
      grid-column: 1;
      grid-row: 1/3;
    }
    aspect-ratio: 3/4;
  }
  & > *:not(:first-child) {
    aspect-ratio: 3/4;
  }
`;
export const GridCinema = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr;
  @media (min-width: 768px) {
    grid-template-columns: 5fr 2fr 2fr;
    grid-template-rows: 420px 280px;
  }
  & > *:first-child {
    @media (min-width: 768px) {
      grid-column: 1;
      grid-row: 1/3;
    }
    aspect-ratio: 2/3;
  }
  & > *:not(:first-child) {
    aspect-ratio: 3/4;
  }
`;

// ─── Pricing — editorial rows
export const PricingSection = styled.section`
  padding: 140px 24px;
  max-width: 1400px;
  margin: 0 auto;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  @media (min-width: 768px) {
    padding: 160px 80px;
  }
`;
export const PricingGroupTitle = styled.h3`
  font-size: 9px;
  font-weight: 300;
  letter-spacing: 0.55em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.18);
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;
export const PricingRow = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 24px;
  padding: 20px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  transition: background 0.3s;
  ${({ $accent }) =>
    $accent &&
    `
    background: rgba(255,255,255,0.02);
    margin: 0 -16px;
    padding-left: 16px;
    padding-right: 16px;
    border-radius: 2px;
  `}
`;
export const PriceLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;
export const PriceTitle = styled.span`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  font-weight: 300;
  font-style: italic;
  color: rgba(255, 255, 255, 0.72);
  letter-spacing: 0.01em;
`;
export const PriceDesc = styled.span`
  font-size: 11px;
  font-weight: 300;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.25);
  line-height: 1.6;
  white-space: pre-line;
`;
export const PriceRight = styled.div`
  flex-shrink: 0;
`;
export const PriceTag = styled.span`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5rem;
  font-weight: 200;
  font-style: italic;
  color: ${({ $accent }) =>
    $accent ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.5)'};
  letter-spacing: -0.01em;
`;
export const PricingGroupNote = styled.p`
  font-size: 11px;
  font-weight: 300;
  letter-spacing: 0.06em;
  color: rgba(255, 255, 255, 0.2);
  line-height: 1.7;
  margin-top: 36px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  max-width: 560px;
`;

// ─── FAQ
export const FAQSection = styled.div`
  margin-top: 80px;
`;
export const FAQItem = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;
export const FAQQuestion = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 22px 0;
  font-size: 13px;
  font-weight: 300;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.5);
  text-align: left;
  gap: 16px;
  transition: color 0.3s;
  &:hover {
    color: rgba(255, 255, 255, 0.82);
  }
`;
export const FAQIcon = styled.span`
  font-size: 18px;
  font-weight: 100;
  color: rgba(255, 255, 255, 0.18);
  flex-shrink: 0;
  transition:
    transform 0.35s,
    color 0.3s;
  transform: ${({ $open }) => ($open ? 'rotate(45deg)' : 'rotate(0)')};
`;
export const FAQAnswer = styled(motion.div)`
  overflow: hidden;
`;
export const FAQAnswerInner = styled.p`
  font-size: 12px;
  font-weight: 300;
  line-height: 1.9;
  color: rgba(255, 255, 255, 0.28);
  padding-bottom: 22px;
  max-width: 640px;
`;

// ─── Contact
export const ContactSection = styled.section`
  padding: 140px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  @media (min-width: 768px) {
    padding: 160px 80px;
  }
`;
export const ContactLayout = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  gap: 80px;
  grid-template-columns: 1fr;
  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
    gap: 100px;
  }
`;
export const ContactLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const ContactTitle = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.4rem, 5vw, 4.2rem);
  font-weight: 200;
  font-style: italic;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.1;
`;
export const ContactSub = styled.p`
  font-size: 12px;
  font-weight: 300;
  letter-spacing: 0.06em;
  color: rgba(255, 255, 255, 0.22);
  line-height: 1.8;
  max-width: 320px;
`;
export const SocialLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const SocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.25);
  transition: color 0.3s;
  &::before {
    content: '';
    display: block;
    width: 20px;
    height: 1px;
    background: rgba(255, 255, 255, 0.12);
    transition:
      width 0.3s,
      background 0.3s;
    flex-shrink: 0;
  }
  &:hover {
    color: rgba(255, 255, 255, 0.72);
    &::before {
      width: 36px;
      background: rgba(255, 255, 255, 0.35);
    }
  }
`;

// ─── Brief Form
export const BriefForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
export const FormLabel = styled.label`
  font-size: 9px;
  font-weight: 300;
  letter-spacing: 0.45em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.22);
`;
const inputBase = `
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.72);
  font-family: 'Jost', sans-serif;
  font-size: 13px;
  font-weight: 300;
  letter-spacing: 0.04em;
  padding: 10px 0;
  outline: none;
  transition: border-color 0.3s;
  width: 100%;
  &::placeholder { color: rgba(255,255,255,0.16); }
  &:focus { border-color: rgba(255,255,255,0.3); }
`;
export const FormInput = styled.input`
  ${inputBase}
`;
export const FormTextarea = styled.textarea`
  ${inputBase}
  resize: none;
  height: 76px;
  line-height: 1.7;
`;
export const FormSelect = styled.select`
  ${inputBase}
  appearance: none;
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='rgba(255,255,255,0.18)'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 4px center;
  padding-right: 20px;
  option {
    background: #111;
    color: #fff;
  }
`;
export const PackageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
  @media (min-width: 480px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
export const PackageCard = styled.button`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px;
  border: 1px solid
    ${({ $selected }) =>
      $selected ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.07)'};
  border-radius: 2px;
  background: ${({ $selected }) =>
    $selected ? 'rgba(255,255,255,0.05)' : 'transparent'};
  cursor: pointer;
  text-align: left;
  transition:
    border-color 0.25s,
    background 0.25s;
  &:hover {
    border-color: rgba(255, 255, 255, 0.2);
  }
`;
export const PackageCardTitle = styled.span`
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.06em;
  color: rgba(255, 255, 255, 0.45);
  line-height: 1.4;
`;
export const PackageCardPrice = styled.span`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  font-weight: 200;
  font-style: italic;
  color: rgba(255, 255, 255, 0.65);
`;
export const CheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;
export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 11px;
  font-weight: 300;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.32);
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: rgba(255, 255, 255, 0.65);
  }
  input {
    accent-color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
  }
`;
export const FileUploadArea = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: 1px dashed rgba(255, 255, 255, 0.08);
  border-radius: 2px;
  padding: 24px;
  cursor: pointer;
  transition:
    border-color 0.3s,
    background 0.3s;
  &:hover {
    border-color: rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.02);
  }
  input {
    display: none;
  }
`;
export const FileUploadText = styled.span`
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.18);
`;
export const FileUploadName = styled.span`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 0.04em;
`;
export const SubmitBtn = styled(motion.button)`
  align-self: flex-start;
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 14px 36px;
  border-radius: 1px;
  cursor: pointer;
  transition:
    color 0.3s,
    border-color 0.3s,
    background 0.3s;
  &:hover {
    color: rgba(255, 255, 255, 0.88);
    border-color: rgba(255, 255, 255, 0.28);
    background: rgba(255, 255, 255, 0.03);
  }
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;
export const FormStatus = styled.p`
  font-size: 11px;
  font-weight: 300;
  letter-spacing: 0.06em;
  color: ${({ $success }) =>
    $success ? 'rgba(170,220,150,0.7)' : 'rgba(220,110,90,0.7)'};
`;

// ─── Footer
export const Footer = styled.footer`
  padding: 32px 80px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  font-size: 9px;
  font-weight: 300;
  letter-spacing: 0.3em;
  color: rgba(255, 255, 255, 0.1);
  @media (max-width: 600px) {
    padding: 32px 24px;
  }
`;

// ─── Cursor
export const CursorDot = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 36px;
  height: 36px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  pointer-events: none;
  z-index: 999;
  mix-blend-mode: difference;
  display: none;
  @media (min-width: 1024px) {
    display: block;
  }
`;
