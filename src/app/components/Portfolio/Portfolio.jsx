'use client';
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Reveal from '../shared/Reveal';
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

/* ── Grid map ── */
const GRID_MAP = {
  'grid-3': Grid3,
  'grid-asymmetric': GridAsymmetric,
  'grid-editorial': GridEditorial,
  'grid-cinema': GridCinema,
  'grid-video': GridVideo,
};

/* ── Single image card ── */
function ImgCard({ img, delay, isWide }) {
  return (
    <Reveal delay={delay}>
      <ImageCard
        data-ratio={isWide ? '16:9' : '4:5'}
        whileHover={{ zIndex: 2 }}
      >
        <FrameImg
          src={img.src}
          alt={img.caption}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            filter: 'brightness(0.88) saturate(0.88)',
            transition: 'filter 0.5s',
          }}
        />
        <FrameOverlay>
          <FrameCaption>{img.caption}</FrameCaption>
        </FrameOverlay>
      </ImageCard>
    </Reveal>
  );
}
ImgCard.propTypes = {
  img: PropTypes.object.isRequired,
  delay: PropTypes.number,
  isWide: PropTypes.bool,
};

/* ── Video card with inline play/pause ── */
function VidCard({ video, delay }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <Reveal delay={delay}>
      <VideoCard data-ratio={video.ratio || '9:16'} onClick={toggle}>
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          loop
          playsInline
          muted
          preload="none"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
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

/* ── Section grid ── */
function SectionGrid({ section }) {
  const GridComponent = GRID_MAP[section.layout] || Grid3;
  const isVideo = section.layout === 'grid-video';

  if (isVideo) {
    const items = section.videos || [];
    return (
      <GridComponent>
        {items.map((video, i) => (
          <VidCard key={video.src} video={video} delay={i * 0.07} />
        ))}
      </GridComponent>
    );
  }

  return (
    <GridComponent>
      {(section.images || []).map((img, i) => {
        /* dark-3 and dark-10 are 16:9 wide */
        const isWide =
          img.src.includes('dark-3') || img.src.includes('dark-10');
        return (
          <ImgCard key={img.src} img={img} delay={i * 0.07} isWide={isWide} />
        );
      })}
    </GridComponent>
  );
}
SectionGrid.propTypes = { section: PropTypes.object.isRequired };

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
            <SectionGrid section={section} />
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
