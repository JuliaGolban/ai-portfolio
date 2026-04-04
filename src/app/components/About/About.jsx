'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence } from 'framer-motion';
import Reveal from '../shared/Reveal';
import Lightbox from '../shared/Lightbox';
import { SectionLabel, SectionTitle, FrameImg, FrameOverlay, FrameCaption } from '../shared/shared.styled';
import {
  AboutSection, AboutLayout, AboutText, AboutSubtitle, AboutBio,
  SocialLinks, SocialLink, AboutImages, AboutImgMain, AboutImgSide,
} from './About.styled';

const toWebp = src => src ? src.replace(/\.png$/i, '.webp') : src;

export default function About({ about, lang, contact }) {
  const [lightbox, setLightbox] = useState(null);

  return (
    <AboutSection id="about">
      <Reveal><SectionLabel>{lang === 'ua' ? 'Про мене' : 'About'}</SectionLabel></Reveal>

      <AboutLayout>
        <Reveal delay={0.1}>
          <AboutText>
            <SectionTitle>{about.name}</SectionTitle>
            <AboutSubtitle>{about.title}</AboutSubtitle>
            <AboutBio>{about[`bio_${lang}`]}</AboutBio>
            <SocialLinks>
              <SocialLink href={contact.instagram} target="_blank">Instagram</SocialLink>
              <SocialLink href={contact.telegram}  target="_blank">Telegram</SocialLink>
              <SocialLink href={`mailto:${contact.email}`}>{contact.email}</SocialLink>
            </SocialLinks>
          </AboutText>
        </Reveal>

        <AboutImages>
          <AboutImgMain
            onClick={() => setLightbox(0)}
            style={{ cursor: 'zoom-in' }}
          >
            <FrameImg
              src={toWebp(about.images[0].src)}
              alt={about.images[0].caption}
              loading="eager"
            />
            <FrameOverlay><FrameCaption>{about.images[0].caption}</FrameCaption></FrameOverlay>
          </AboutImgMain>

          {about.images.slice(1).map((img, i) => (
            <Reveal key={img.src} delay={i * 0.12}>
              <AboutImgSide
                onClick={() => setLightbox(i + 1)}
                style={{ cursor: 'zoom-in' }}
              >
                <FrameImg src={toWebp(img.src)} alt={img.caption} loading="lazy" />
                <FrameOverlay><FrameCaption>{img.caption}</FrameCaption></FrameOverlay>
              </AboutImgSide>
            </Reveal>
          ))}
        </AboutImages>
      </AboutLayout>

      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox
            images={about.images}
            index={lightbox}
            onClose={() => setLightbox(null)}
            onChange={setLightbox}
          />
        )}
      </AnimatePresence>
    </AboutSection>
  );
}

About.propTypes = {
  about:   PropTypes.object.isRequired,
  lang:    PropTypes.string.isRequired,
  contact: PropTypes.object.isRequired,
};
