'use client';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Nav as NavWrap,
  NavLogo,
  NavLinks,
  NavLink,
  LangSwitch,
  BurgerBtn,
  BurgerLine,
  MobileMenu,
  MobileMenuLink,
} from './Nav.styled';

export default function Nav({ lang, onToggleLang, contact, translations }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const t = translations[lang].nav;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = id => {
    setMenuOpen(false);
    setTimeout(
      () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }),
      50,
    );
  };

  const navItems = [
    { label: t.about, id: 'about' },
    { label: t.works, id: 'works' },
    { label: t.pricing, id: 'pricing' },
    { label: t.order, id: 'contact' },
  ];

  return (
    <>
      <NavWrap $scrolled={scrolled}>
        <NavLogo onClick={() => scrollTo('hero')}>JG</NavLogo>

        <NavLinks>
          {navItems.map(item => (
            <NavLink key={item.id} onClick={() => scrollTo(item.id)}>
              {item.label}
            </NavLink>
          ))}
          {/* <NavLink href={contact.instagram} target="_blank">{t.ig}</NavLink> */}
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

      <AnimatePresence>
        {menuOpen && (
          <MobileMenu
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item, i) => (
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
