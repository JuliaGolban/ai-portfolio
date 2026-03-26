'use client';
import React from 'react';
import PropTypes from 'prop-types';
import {
  HeroSection, VideoBackground, StyledVideo, HeroContent,
  HeroEyebrow, HeroTitle, HeroSubtitle, HeroCTA,
} from './Hero.styled';

export default function Hero({ t, instagramUrl }) {
  const titleLines    = t.title.split('\n');
  const subtitleLines = t.subtitle.split('\n');

  return (
    <HeroSection id="hero">
      <VideoBackground>
        {/*
          3 sources for maximum compatibility & speed:
          1. WebM  — Chrome/Firefox/Edge, smallest size
          2. MP4 desktop — Safari desktop, good quality
          3. MP4 mobile — served via media query in <source>, very small
          All: autoPlay muted playsInline — required for mobile autoplay
        */}
        <StyledVideo
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          poster="/bg-cinematic-poster.jpg"
        >
          {/* WebM first — Chrome/Firefox pick this (2 MB) */}
          <source src="/bg-cinematic.webm" type="video/webm" />
          {/* Mobile MP4 — iOS/Android (279 KB) */}
          <source
            src="/bg-cinematic-mobile.mp4"
            type="video/mp4"
            media="(max-width: 768px)"
          />
          {/* Desktop MP4 — Safari desktop fallback (2 MB) */}
          <source src="/bg-cinematic-desktop.mp4" type="video/mp4" />
        </StyledVideo>
      </VideoBackground>

      <HeroContent>
        <HeroEyebrow
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {t.eyebrow}
        </HeroEyebrow>

        <HeroTitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {titleLines.map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < titleLines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </HeroTitle>

        <HeroSubtitle
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          {subtitleLines.map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < subtitleLines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </HeroSubtitle>

        <HeroCTA
          href={instagramUrl}
          target="_blank"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          {t.cta}
        </HeroCTA>
      </HeroContent>
    </HeroSection>
  );
}

Hero.propTypes = {
  t: PropTypes.shape({
    eyebrow:  PropTypes.string.isRequired,
    title:    PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    cta:      PropTypes.string.isRequired,
  }).isRequired,
  instagramUrl: PropTypes.string.isRequired,
};
