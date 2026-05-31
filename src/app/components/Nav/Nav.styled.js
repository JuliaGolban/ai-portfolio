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
    $scrolled ? 'var(--bg-nav)' : 'transparent'};
  backdrop-filter: ${({ $scrolled }) => ($scrolled ? 'blur(14px)' : 'none')};
  @media (min-width: 768px) {
    padding: 32px 80px;
  }
`;

export const NavLogo = styled.a`
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 16px;
  font-weight: 400;
  color: var(--text-nav);
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: var(--text-dark);
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
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--text-medium);
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: var(--text-dark);
  }
`;

/* ── Dropdown ── */
export const DropdownWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const DropdownTrigger = styled.button`
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--text-medium);
  cursor: pointer;
  transition: color 0.3s;
  display: flex;
  align-items: center;
  gap: 5px;
  &:hover {
    color: var(--text-dark);
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
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--text-medium);
  cursor: pointer;
  transition:
    color 0.2s,
    background 0.2s;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    color: var(--text-dark);
    background: var(--bg-faint);
  }
`;

export const DropdownSubItem = styled.a`
  display: block;
  padding: 10px 28px;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--text-medium);
  cursor: pointer;
  transition:
    color 0.2s,
    background 0.2s;
  &:hover {
    color: var(--text-dark);
    background: var(--bg-faint);
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
  color: var(--text-medium);
  transition: color 0.3s;
  &:hover {
    color: var(--text-dark);
  }
`;

export const LangSwitch = styled.button`
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.3em;
  color: var(--text-medium);
  cursor: pointer;
  transition: color 0.3s;
  /* border-color 0.3s; */
  &:hover {
    color: var(--text);
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
  background: var(--text-muted);
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
  background: var(--overlay);
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
  font-weight: 400;
  color: var(--text-label);
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: var(--text);
  }
`;

export const MobileMenuSub = styled.a`
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--text-label);
  cursor: pointer;
  transition: color 0.3s;
  margin-top: -20px;
  &:hover {
    color: var(--text);
  }
`;
