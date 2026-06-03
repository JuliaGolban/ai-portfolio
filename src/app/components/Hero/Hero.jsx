'use client';
import React from 'react';
import PropTypes from 'prop-types';
import {
  HeroSection,
  VideoBackground,
  StyledVideo,
  HeroContent,
  HeroEyebrow,
  HeroTitle,
  HeroSubtitle,
  HeroCTA,
} from './Hero.styled';

export default function Hero({ t, instagramUrl, bgVideoRef, onBgReady }) {
  const titleLines = t.title.split('\n');
  const subtitleLines = t.subtitle.split('\n');

  /* When video is ready → tell page.jsx so it can apply saved sound preference */
  const handleCanPlay = () => {
    if (onBgReady && bgVideoRef?.current) {
      onBgReady(bgVideoRef.current);
    }
  };

  return (
    <HeroSection id="hero">
      <VideoBackground>
        <StyledVideo
          ref={bgVideoRef}
          autoPlay
          loop
          playsInline
          preload="none"
          poster="/bg-cinematic-poster.jpg"
          /* start muted — user enables sound via toggle */
          muted
          onCanPlay={handleCanPlay}
        >
          <source src="/bg-cinematic.webm" type="video/webm" />
          <source
            src="/bg-cinematic-mobile.mp4"
            type="video/mp4"
            media="(max-width: 768px)"
          />
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
          transition={{
            duration: 1.2,
            delay: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {titleLines.map((l, i) => (
            <React.Fragment key={i}>
              {l}
              {i < titleLines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </HeroTitle>
        <HeroSubtitle
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          {subtitleLines.map((l, i) => (
            <React.Fragment key={i}>
              {l}
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
    eyebrow: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    cta: PropTypes.string,
  }).isRequired,
  instagramUrl: PropTypes.string.isRequired,
  bgVideoRef: PropTypes.object.isRequired,
  onBgReady: PropTypes.func.isRequired,
};
