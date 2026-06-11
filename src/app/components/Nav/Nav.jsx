'use client';
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Nav as NavWrap,
  NavLogo,
  NavLinks,
  NavLink,
  NavControls,
  IconBtn,
  LangSwitch,
  BurgerBtn,
  BurgerLine,
  MobileMenu,
  MobileMenuLink,
  DropdownWrap,
  DropdownMenu,
  DropdownItem,
} from './Nav.styled';

/* ── SVG icons ── */
const SoundOnIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M2 5.5h2.5L8 3v10l-3.5-2.5H2V5.5z"
      fill="currentColor"
      fillOpacity=".7"
    />
    <path
      d="M10 5.5c1.1.6 1.8 1.7 1.8 2.5S11.1 9.9 10 10.5"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M12 3.5c1.8 1.1 2.8 2.8 2.8 4.5s-1 3.4-2.8 4.5"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeOpacity=".5"
    />
  </svg>
);
const SoundOffIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M2 5.5h2.5L8 3v10l-3.5-2.5H2V5.5z"
      fill="currentColor"
      fillOpacity=".35"
    />
    <path
      d="M11 6l3 4M14 6l-3 4"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeOpacity=".6"
    />
  </svg>
);
const SunIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    style={{ display: 'block' }}
  >
    <circle cx="8" cy="8" r="3" fill="currentColor" fillOpacity=".7" />
    <path
      d="M8 1v2M8 13v2M1 8h2M13 8h2M3.2 3.2l1.4 1.4M11.4 11.4l1.4 1.4M3.2 12.8l1.4-1.4M11.4 4.6l1.4-1.4"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeOpacity=".55"
    />
  </svg>
);
const MoonIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block' }}
  >
    <path
      d="M11.5 9.5A5 5 0 0 1 5 3a5 5 0 1 0 6.5 6.5z"
      fill="currentColor"
      fillOpacity=".6"
    />
  </svg>
);

export default function Nav({
  lang,
  onToggleLang,
  contact,
  translations,
  soundOn,
  onToggleSound,
  theme,
  onToggleTheme,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [worksOpen, setWorksOpen] = useState(false);
  const dropRef = useRef(null);
  const t = translations[lang].nav;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = e => {
      if (dropRef.current && !dropRef.current.contains(e.target))
        setWorksOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const scrollTo = id => {
    setMenuOpen(false);
    setWorksOpen(false);
    setTimeout(
      () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }),
      50,
    );
  };

  const worksItems =
    lang === 'ua'
      ? [
          { label: 'Зображення', id: 'works' },
          { label: 'Відео', id: 'video-animations' },
          { label: 'Музика', id: 'audio' },
          { label: 'Campaign', id: 'cases' },
        ]
      : [
          { label: 'Images', id: 'works' },
          { label: 'Video', id: 'video-animations' },
          { label: 'Audio', id: 'audio' },
          { label: 'Campaign', id: 'cases' },
        ];

  return (
    <>
      <NavWrap $scrolled={scrolled}>
        <NavLogo onClick={() => scrollTo('hero')}>JG</NavLogo>

        <NavLinks>
          <NavLink onClick={() => scrollTo('about')}>{t.about}</NavLink>

          <DropdownWrap ref={dropRef}>
            <NavLink
              as="button"
              onClick={() => setWorksOpen(o => !o)}
              style={{ display: 'flex', alignItems: 'center', gap: 5 }}
            >
              {t.works}
              <span
                style={{
                  fontSize: 7,
                  opacity: 0.5,
                  transform: worksOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform .25s',
                  display: 'inline-block',
                }}
              >
                ▼
              </span>
            </NavLink>
            <AnimatePresence>
              {worksOpen && (
                <DropdownMenu
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  {worksItems.map(item => (
                    <DropdownItem
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                    >
                      {item.label}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              )}
            </AnimatePresence>
          </DropdownWrap>

          <NavLink onClick={() => scrollTo('pricing')}>{t.pricing}</NavLink>
          <NavLink onClick={() => scrollTo('contact')}>{t.order}</NavLink>
          {/* <NavLink href={contact.instagram} target="_blank">
            {t.ig}
          </NavLink> */}

          {/* Controls group */}
          <NavControls>
            <IconBtn onClick={onToggleSound} title={soundOn ? 'Mute' : 'Sound'}>
              {soundOn ? <SoundOnIcon /> : <SoundOffIcon />}
            </IconBtn>
            <IconBtn
              onClick={onToggleTheme}
              title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </IconBtn>
            <LangSwitch onClick={onToggleLang}>
              {lang === 'ua' ? 'EN' : 'UA'}
            </LangSwitch>
          </NavControls>
        </NavLinks>

        <BurgerBtn onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
          <BurgerLine $open={menuOpen} />
          <BurgerLine $open={menuOpen} />
          <BurgerLine $open={menuOpen} />
        </BurgerBtn>
      </NavWrap>

      <AnimatePresence>
        {menuOpen && (
          <MobileMenu
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {[
              { label: t.about, id: 'about' },
              { label: t.pricing, id: 'pricing' },
              { label: t.order, id: 'contact' },
            ].map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <MobileMenuLink onClick={() => scrollTo(item.id)}>
                  {item.label}
                </MobileMenuLink>
              </motion.div>
            ))}
            {worksItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.06 }}
              >
                <MobileMenuLink
                  onClick={() => scrollTo(item.id)}
                  style={{ fontSize: 'clamp(1.3rem,5vw,2rem)', opacity: 0.7 }}
                >
                  {item.label}
                </MobileMenuLink>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{ display: 'flex', gap: 20, justifyContent: 'center' }}
            >
              <IconBtn onClick={onToggleSound}>
                {soundOn ? <SoundOnIcon /> : <SoundOffIcon />}
              </IconBtn>
              <IconBtn onClick={onToggleTheme}>
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              </IconBtn>
              <LangSwitch onClick={onToggleLang} style={{ background: 'none' }}>
                {lang === 'ua' ? 'EN' : 'UA'}
              </LangSwitch>
            </motion.div>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
}

Nav.propTypes = {
  lang: PropTypes.string.isRequired,
  onToggleLang: PropTypes.func.isRequired,
  contact: PropTypes.object.isRequired,
  translations: PropTypes.object.isRequired,
  soundOn: PropTypes.bool.isRequired,
  onToggleSound: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  onToggleTheme: PropTypes.func.isRequired,
};
