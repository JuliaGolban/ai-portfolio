import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 90;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  transition: background 0.4s, backdrop-filter 0.4s;
  background: ${({ $scrolled }) => $scrolled ? 'rgba(5,5,5,0.88)' : 'transparent'};
  backdrop-filter: ${({ $scrolled }) => $scrolled ? 'blur(14px)' : 'none'};
  @media (min-width: 768px) { padding: 32px 80px; }
`;

export const NavLogo = styled.a`
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 16px;
  font-weight: 200;
  color: rgba(255,255,255,0.7);
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: color 0.3s;
  &:hover { color: rgba(255,255,255,0.95); }
`;

export const NavLinks = styled.div`
  display: none;
  gap: 40px;
  align-items: center;
  @media (min-width: 768px) { display: flex; }
`;

export const NavLink = styled.a`
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.38);
  cursor: pointer;
  transition: color 0.3s;
  &:hover { color: rgba(255,255,255,0.85); }
`;

export const LangSwitch = styled.button`
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.3em;
  color: rgba(255,255,255,0.25);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 5px 10px;
  border-radius: 1px;
  cursor: pointer;
  transition: color 0.3s, border-color 0.3s;
  &:hover { color: rgba(255,255,255,0.75); border-color: rgba(255,255,255,0.3); }
`;

export const BurgerBtn = styled.button`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 4px;
  z-index: 95;
  @media (min-width: 768px) { display: none; }
`;

export const BurgerLine = styled.span`
  display: block;
  width: 22px;
  height: 1px;
  background: rgba(255,255,255,0.6);
  transition: all 0.35s cubic-bezier(0.25,0.46,0.45,0.94);
  &:nth-child(1) { transform: ${({ $open }) => $open ? 'translateY(6px) rotate(45deg)' : 'none'}; }
  &:nth-child(2) { opacity: ${({ $open }) => $open ? 0 : 1}; }
  &:nth-child(3) { transform: ${({ $open }) => $open ? 'translateY(-6px) rotate(-45deg)' : 'none'}; }
`;

export const MobileMenu = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 88;
  background: rgba(5,5,5,0.97);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  @media (min-width: 768px) { display: none; }
`;

export const MobileMenuLink = styled.a`
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: clamp(2rem, 8vw, 3rem);
  font-weight: 200;
  color: rgba(255,255,255,0.65);
  cursor: pointer;
  transition: color 0.3s;
  &:hover { color: #fff; }
`;
