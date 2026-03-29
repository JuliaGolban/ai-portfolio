'use client';
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Nav as NavWrap,
  NavLogo,
  NavLinks,
  NavLink,
  LangSwitch,
  DropdownWrap,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  BurgerBtn,
  BurgerLine,
  MobileMenu,
  MobileMenuLink,
  MobileMenuSub,
} from './Nav.styled';

export default function Nav({ lang, onToggleLang, contact, translations }) {
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

  // Close dropdown on outside click
  useEffect(() => {
    const handler = e => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setWorksOpen(false);
      }
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

  const worksItems = [
    { label: lang === 'ua' ? 'Зображення' : 'Images', id: 'personal-photo' },
    { label: lang === 'ua' ? 'Відео' : 'Video', id: 'video-animations' },
    { label: lang === 'ua' ? 'Campaign' : 'Campaign', id: 'cases' },
  ];

  const staticLinks = [
    { label: t.about, id: 'about' },
    { label: t.pricing, id: 'pricing' },
    { label: t.order, id: 'contact' },
  ];

  return (
    <>
      <NavWrap $scrolled={scrolled}>
        <NavLogo onClick={() => scrollTo('hero')}>JG</NavLogo>

        <NavLinks>
          {/* About */}
          <NavLink onClick={() => scrollTo('about')}>{t.about}</NavLink>

          {/* Works dropdown */}
          <DropdownWrap ref={dropRef}>
            <DropdownTrigger
              data-open={worksOpen}
              onClick={() => setWorksOpen(o => !o)}
            >
              {t.works}
            </DropdownTrigger>
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

          {/* Pricing & Order */}
          {staticLinks.slice(1).map(item => (
            <NavLink key={item.id} onClick={() => scrollTo(item.id)}>
              {item.label}
            </NavLink>
          ))}

          {/* <NavLink href={contact.instagram} target="_blank">
            {t.ig}
          </NavLink> */}
          <LangSwitch onClick={onToggleLang}>
            {lang === 'ua' ? 'EN' : 'UA'}
          </LangSwitch>
        </NavLinks>

        <BurgerBtn onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
          <BurgerLine $open={menuOpen} />
          <BurgerLine $open={menuOpen} />
          <BurgerLine $open={menuOpen} />
        </BurgerBtn>
      </NavWrap>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <MobileMenu
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
            >
              <MobileMenuLink onClick={() => scrollTo('about')}>
                {t.about}
              </MobileMenuLink>
            </motion.div>

            {/* Works group */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.07 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '25px',
              }}
            >
              <MobileMenuLink as="span" style={{ opacity: 0.9 }}>
                {t.works}
              </MobileMenuLink>
              {worksItems.map((item, i) => (
                <MobileMenuSub key={item.id} onClick={() => scrollTo(item.id)}>
                  {item.label}
                </MobileMenuSub>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14 }}
            >
              <MobileMenuLink onClick={() => scrollTo('pricing')}>
                {t.pricing}
              </MobileMenuLink>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.21 }}
            >
              <MobileMenuLink onClick={() => scrollTo('contact')}>
                {t.order}
              </MobileMenuLink>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 }}
            >
              <MobileMenuLink
                onClick={onToggleLang}
                style={{ fontSize: '1rem', letterSpacing: '0.3em' }}
              >
                {lang === 'ua' ? 'EN' : 'UA'}
              </MobileMenuLink>
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
};
