'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence } from 'framer-motion';
import Reveal from '../shared/Reveal';
import Lightbox from '../shared/Lightbox';
import {
  Divider,
  SectionLabel,
  SectionTitle,
  SectionDesc,
  FrameImg,
  FrameOverlay,
  FrameCaption,
} from '../shared/shared.styled';
import {
  PortfolioSection,
  SectionHeader,
  ImageCard,
  VideoCard,
  Grid3,
  GridAsymmetric,
  GridEditorial,
  GridCinema,
  GridVideo,
  VideoOverlay,
  PlayBtn,
} from './Portfolio.styled';

const toWebp = src => (src ? src.replace(/\.png$/i, '.webp') : src);

const GRID_MAP = {
  'grid-3': Grid3,
  'grid-asymmetric': GridAsymmetric,
  'grid-editorial': GridEditorial,
  'grid-cinema': GridCinema,
  'grid-video': GridVideo,
};

/* ── Video card — only one plays at a time, bg mutes while playing ── */
function VidCard({
  video,
  delay,
  playingRef,
  setPlaying,
  bgVideoRef,
  soundOn,
}) {
  const ref = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = !soundOn;
  }, [soundOn]);

  const toggle = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const bg = bgVideoRef?.current;

    if (playingRef.current === el) {
      /* pause this video */
      el.pause();
      playingRef.current = null;
      setIsPlaying(false);
      setPlaying(null);
      /* restore bg sound if it was playing */
      if (bg) {
        // eslint-disable-next-line react-hooks/immutability
        bg.muted = false;
      }
    } else {
      /* pause previous */
      if (playingRef.current) {
        playingRef.current.pause();
      }
      /* mute bg */
      if (bg) {
        bg.muted = true;
      }
      el.muted = !soundOn;
      /* play this */
      el.play().catch(console.error);
      playingRef.current = el;
      setIsPlaying(true);
      setPlaying(el);
    }
    /* force re-render via setPlayingRef */
    setPlayingRef(el === playingRef.current ? el : null);
    // setPlayingRef(Date.now());
  }, [playingRef, setPlaying, bgVideoRef, soundOn]);

  return (
    <Reveal delay={delay}>
      <VideoCard data-ratio={video.ratio || '9:16'} onClick={toggle}>
        <video
          ref={ref}
          src={video.src}
          poster={video.poster}
          loop
          playsInline
          preload="none"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
          }}
        />
        {!isPlaying && (
          <VideoOverlay>
            <PlayBtn />
          </VideoOverlay>
        )}
        <FrameOverlay style={{ opacity: isPlaying ? 0 : undefined }}>
          <FrameCaption>{video.caption}</FrameCaption>
        </FrameOverlay>
      </VideoCard>
    </Reveal>
  );
}
VidCard.propTypes = {
  video: PropTypes.object.isRequired,
  delay: PropTypes.number,
  playingRef: PropTypes.object.isRequired,
  setPlaying: PropTypes.func.isRequired,
  bgVideoRef: PropTypes.object,
  soundOn: PropTypes.bool.isRequired,
};

/* ── Video grid — shared playing state ── */
function VideoGrid({ section, bgVideoRef, soundOn }) {
  const playingRef = useRef(null);
  const [, setPlaying] = useState(0); /* just for re-render */
  const GridComponent = GRID_MAP[section.layout] || Grid3;

  return (
    <GridComponent>
      {(section.videos || []).map((video, i) => (
        <VidCard
          key={video.src}
          video={video}
          delay={i * 0.06}
          playingRef={playingRef}
          setPlaying={setPlaying}
          bgVideoRef={bgVideoRef}
          soundOn={soundOn}
        />
      ))}
    </GridComponent>
  );
}
VideoGrid.propTypes = {
  section: PropTypes.object.isRequired,
  bgVideoRef: PropTypes.object,
  soundOn: PropTypes.bool.isRequired,
};

/* ── Image grid with lightbox ── */
function ImgGrid({ section }) {
  const [lightbox, setLightbox] = useState(null);
  const images = section.images || [];
  const GridComponent = GRID_MAP[section.layout] || Grid3;

  return (
    <>
      <GridComponent>
        {images.map((img, i) => (
          <Reveal key={img.src} delay={i * 0.06}>
            <ImageCard
              onClick={() => setLightbox(i)}
              style={{ cursor: 'zoom-in' }}
            >
              <FrameImg
                src={toWebp(img.src)}
                alt={img.caption}
                loading={i < 3 ? 'eager' : 'lazy'}
              />
              <FrameOverlay>
                <FrameCaption>{img.caption}</FrameCaption>
              </FrameOverlay>
            </ImageCard>
          </Reveal>
        ))}
      </GridComponent>
      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox
            images={images}
            index={lightbox}
            onClose={() => setLightbox(null)}
            onChange={setLightbox}
          />
        )}
      </AnimatePresence>
    </>
  );
}
ImgGrid.propTypes = { section: PropTypes.object.isRequired };

/* ── Main Portfolio ── */
export default function Portfolio({ sections, lang, bgVideoRef, soundOn }) {
  return (
    <div id="works">
      {sections.map((section, si) => (
        <React.Fragment key={section.id}>
          <PortfolioSection id={section.id}>
            <Reveal>
              <SectionHeader>
                <div>
                  <SectionLabel>{section[`label_${lang}`]}</SectionLabel>
                  <SectionTitle>{section[`title_${lang}`]}</SectionTitle>
                </div>
                <SectionDesc>{section[`desc_${lang}`]}</SectionDesc>
              </SectionHeader>
            </Reveal>
            {section.layout === 'grid-video' ? (
              <VideoGrid
                section={section}
                bgVideoRef={bgVideoRef}
                soundOn={soundOn}
              />
            ) : (
              <ImgGrid section={section} />
            )}
          </PortfolioSection>
          {si < sections.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </div>
  );
}

Portfolio.propTypes = {
  sections: PropTypes.array.isRequired,
  lang: PropTypes.string.isRequired,
  bgVideoRef: PropTypes.object,
  soundOn: PropTypes.bool.isRequired,
};
