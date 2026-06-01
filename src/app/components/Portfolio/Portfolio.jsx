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
  onRerender,
  soundOn,
  onVideoPlay,
  onVideoPause,
}) {
  const ref = useRef(null);
  // eslint-disable-next-line react-hooks/refs
  const isPlaying = playingRef.current === ref.current;

  const toggle = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    if (playingRef.current === el) {
      /* Pause this video */
      el.pause();
      el.muted = true;
      playingRef.current = null;
      onVideoPause();
    } else {
      /* Pause previous if any */
      if (playingRef.current) {
        playingRef.current.pause();
        playingRef.current.muted = true;
      }
      /* Apply sound state before play */
      el.muted = !soundOn;
      el.play().catch(() => {
        /* If blocked with sound, try muted */
        el.muted = true;
        el.play().catch(() => {});
      });
      playingRef.current = el;
      onVideoPlay(el);
    }
    onRerender(Date.now());
  }, [playingRef, onRerender, soundOn, onVideoPlay, onVideoPause]);

  /* Keep muted state in sync with soundOn while playing */
  useEffect(() => {
    const el = ref.current;
    if (el && playingRef.current === el) {
      el.muted = !soundOn;
    }
  }, [soundOn, playingRef]);

  return (
    <Reveal delay={delay}>
      <VideoCard data-ratio={video.ratio || '9:16'} onClick={toggle}>
        <video
          ref={ref}
          src={video.src}
          poster={video.poster}
          loop
          playsInline
          muted /* start muted, unmuted on play based on soundOn */
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
  onRerender: PropTypes.func.isRequired,
  soundOn: PropTypes.bool.isRequired,
  onVideoPlay: PropTypes.func.isRequired,
  onVideoPause: PropTypes.func.isRequired,
};

/* ── Video grid ── */
function VideoGrid({ section, soundOn, onVideoPlay, onVideoPause }) {
  const playingRef = useRef(null);
  const [, rerender] = useState(0);
  const GridComponent = GRID_MAP[section.layout] || Grid3;

  return (
    <GridComponent>
      {(section.videos || []).map((video, i) => (
        <VidCard
          key={video.src}
          video={video}
          delay={i * 0.06}
          playingRef={playingRef}
          onRerender={rerender}
          soundOn={soundOn}
          onVideoPlay={onVideoPlay}
          onVideoPause={onVideoPause}
        />
      ))}
    </GridComponent>
  );
}
VideoGrid.propTypes = {
  section: PropTypes.object.isRequired,
  soundOn: PropTypes.bool.isRequired,
  onVideoPlay: PropTypes.func.isRequired,
  onVideoPause: PropTypes.func.isRequired,
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

/* ── Main ── */
export default function Portfolio({
  sections,
  lang,
  soundOn,
  onVideoPlay,
  onVideoPause,
}) {
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
                soundOn={soundOn}
                onVideoPlay={onVideoPlay}
                onVideoPause={onVideoPause}
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
  soundOn: PropTypes.bool.isRequired,
  onVideoPlay: PropTypes.func.isRequired,
  onVideoPause: PropTypes.func.isRequired,
};
