'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
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

/* ── .png → .webp swap for grid thumbnails ── */
const toWebp = src => (src ? src.replace(/\.png$/i, '.webp') : src);

/* ── Grid map ── */
const GRID_MAP = {
  'grid-3': Grid3,
  'grid-asymmetric': GridAsymmetric,
  'grid-editorial': GridEditorial,
  'grid-cinema': GridCinema,
  'grid-video': GridVideo,
};

/* ── Video card — plays inline on click ── */
function VidCard({ video, delay }) {
  const [playing, setPlaying] = useState(false);
  const ref = React.useRef(null);

  const toggle = () => {
    if (!ref.current) return;
    if (playing) {
      ref.current.pause();
      setPlaying(false);
    } else {
      ref.current.play();
      setPlaying(true);
    }
  };

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
          onEnded={() => setPlaying(false)}
        />
        {!playing && (
          <VideoOverlay>
            <PlayBtn />
          </VideoOverlay>
        )}
        <FrameOverlay style={{ opacity: playing ? 0 : undefined }}>
          <FrameCaption>{video.caption}</FrameCaption>
        </FrameOverlay>
      </VideoCard>
    </Reveal>
  );
}
VidCard.propTypes = {
  video: PropTypes.object.isRequired,
  delay: PropTypes.number,
};

/* ── Section images grid with lightbox ── */
function ImgGrid({ section }) {
  const [lightbox, setLightbox] = useState(null); // index | null
  const images = section.images || [];
  const GridComponent = GRID_MAP[section.layout] || Grid3;

  return (
    <>
      <GridComponent>
        {images.map((img, i) => (
          <Reveal key={img.src} delay={i * 0.06}>
            <ImageCard
              onClick={() => setLightbox(i)}
              title={img.caption}
              style={{ cursor: 'zoom-in' }}
            >
              {/* WebP thumbnail for fast grid loading */}
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

      {/* Full-resolution PNG lightbox */}
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

/* ── Video grid ── */
function VideoGrid({ section }) {
  const GridComponent = GRID_MAP[section.layout] || Grid3;
  return (
    <GridComponent>
      {(section.videos || []).map((video, i) => (
        <VidCard key={video.src} video={video} delay={i * 0.06} />
      ))}
    </GridComponent>
  );
}
VideoGrid.propTypes = { section: PropTypes.object.isRequired };

/* ── Main Portfolio ── */
export default function Portfolio({ sections, lang }) {
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
              <VideoGrid section={section} />
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
};
