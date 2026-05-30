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

/* ── Dropdown ── */
export const DropdownWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const DropdownTrigger = styled.button`
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.38);
  cursor: pointer;
  transition: color 0.3s;
  display: flex;
  align-items: center;
  gap: 5px;
  &:hover {
    color: rgba(255, 255, 255, 0.85);
  }
  /* tiny chevron */
  &::after {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    border-top: 4px solid currentColor;
    opacity: 0.5;
    transition: transform 0.25s;
  }
  &[data-open='true']::after {
    transform: rotate(180deg);
  }
`;

export const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: calc(100% + 14px);
  left: 50%;
  transform: translateX(-50%);
  /* background: rgba(8, 8, 8, 0.96); */
  background: transparent;
  /* border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 3px;*/
  backdrop-filter: blur(16px);
  min-width: 160px;
  overflow: hidden;
  z-index: 10;
  /* triangle pointer */
  &::before {
    content: '';
    position: absolute;
    top: -5px;
    right: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid rgba(255, 255, 255, 0.08);
  }
`;

export const DropdownItem = styled.a`
  display: block;
  padding: 12px 18px;
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.38);
  cursor: pointer;
  transition:
    color 0.2s,
    background 0.2s;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    color: rgba(255, 255, 255, 0.85);
    background: rgba(255, 255, 255, 0.04);
  }
`;

export const DropdownSubItem = styled.a`
  display: block;
  padding: 10px 28px;
  font-size: 9px;
  font-weight: 300;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition:
    color 0.2s,
    background 0.2s;
  &:hover {
    color: rgba(255, 255, 255, 0.75);
    background: rgba(255, 255, 255, 0.06);
  }
`;

/* ── Controls (lang + theme + sounds) ── */
export const NavControls = styled.div`
  display: none;
  gap: 8px;
  align-items: center;
  @media (min-width: 768px) {
    display: flex;
  }
`;

export const IconBtn = styled.button`
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);
  transition: color 0.3s;
  &:hover {
    color: rgba(255, 255, 255, 0.95);
  }
`;

export const LangSwitch = styled.button`
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.3em;
  color: rgba(255, 255, 255, 0.35);
  /* padding: 5px 10px; 
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1px; */
  cursor: pointer;
  transition:
    color 0.3s,
    /* border-color 0.3s; */
  &:hover {
    color: rgba(255, 255, 255, 0.75);
    /* border-color: rgba(255, 255, 255, 0.3); */
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
  gap: 36px;
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

export const MobileMenuSub = styled.a`
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: color 0.3s;
  margin-top: -20px;
  &:hover {
    color: rgba(255, 255, 255, 0.7);
  }
`;
