'use client';
import React from 'react';
import PropTypes from 'prop-types';
import Reveal from '../shared/Reveal';
import { Divider, SectionLabel, SectionTitle, SectionDesc, ImageFrame, FrameImg, FrameOverlay, FrameCaption } from '../shared/shared.styled';
import { PortfolioSection, SectionHeader, Grid3, GridAsymmetric, GridEditorial, GridCinema } from './Portfolio.styled';

const GRID_MAP = {
  'grid-3':          Grid3,
  'grid-asymmetric': GridAsymmetric,
  'grid-editorial':  GridEditorial,
  'grid-cinema':     GridCinema,
};

function PortfolioGrid({ images, layout }) {
  const GridComponent = GRID_MAP[layout] || Grid3;
  return (
    <GridComponent>
      {images.map((img, i) => (
        <Reveal key={img.src} delay={i * 0.07}>
          <ImageFrame style={{ height: '100%' }}>
            <FrameImg src={img.src} alt={img.caption} loading="lazy" />
            <FrameOverlay><FrameCaption>{img.caption}</FrameCaption></FrameOverlay>
          </ImageFrame>
        </Reveal>
      ))}
    </GridComponent>
  );
}
PortfolioGrid.propTypes = { images: PropTypes.array.isRequired, layout: PropTypes.string.isRequired };

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
            <PortfolioGrid images={section.images} layout={section.layout} />
          </PortfolioSection>

          {si < sections.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </div>
  );
}

Portfolio.propTypes = {
  sections: PropTypes.array.isRequired,
  lang:     PropTypes.string.isRequired,
};
