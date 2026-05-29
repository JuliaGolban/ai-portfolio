'use client';

import PropTypes from 'prop-types';
import Reveal from '../shared/Reveal';
import { SectionLabel } from '../shared/shared.styled';
import {
  IndexSection,
  IndexHeader,
  IndexGrid,
  IndexCard,
  CardMedia,
  CardGradient,
  CardNum,
  CardArrow,
  CardContent,
  CardTitle,
} from './WorksIndex.styled';

const toWebp = src =>
  src ? src.replace(/\.png$/i, '.webp').replace(/\.jpg$/i, '.webp') : src;

const toPNG = src =>
  src ? src.replace(/\.png$/i, '.png').replace(/\.jpg$/i, '.png') : src;

/*
  data-tall cards: index 0 and 3 → portrait 3/4
  rest: landscape 4/3
*/
const TALL_IDX = new Set([0, 3]);

export default function WorksIndex({ sections, cases, lang, onNavigate }) {
  const label = lang === 'ua' ? 'Роботи' : 'Works';

  /* Build items: portfolio sections + campaign card */
  const campaignCard = cases?.length
    ? {
        id: 'cases',
        isCampaign: true,
        title: lang === 'ua' ? 'AI Campaign' : 'AI Campaign',
        cover: cases[0]?.cover_image || cases[0]?.cover_poster || null,
      }
    : null;

  /* Merge sections + campaign as last item */
  const items = [
    ...sections.map(s => ({
      id: s.id,
      layout: s.layout,
      title: (s[`label_${lang}`] || s.id).replace(/^\d+\s*[—–-]\s*/, ''),
      cover:
        s.layout === 'grid-video'
          ? s.videos?.[0]?.poster || null
          : s.images?.[0]?.src || null,
    })),
    ...(campaignCard ? [campaignCard] : []),
  ];

  return (
    <IndexSection id="works-index">
      <IndexHeader>
        <Reveal>
          <SectionLabel>{label}</SectionLabel>
        </Reveal>
      </IndexHeader>

      <IndexGrid $count={items.length}>
        {items.map((item, i) => {
          const cover = item.cover
            ? toWebp(item.cover)
              ? toPNG(item.cover)
              : item.cover
            : null;
          const num = String(i + 1).padStart(2, '0');
          const tall = TALL_IDX.has(i);

          return (
            <Reveal key={item.id} delay={i * 0.06}>
              <IndexCard
                data-tall={tall ? 'true' : 'false'}
                data-campaign={item.isCampaign ? 'true' : 'false'}
                onClick={() => onNavigate(item.id)}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <CardMedia>
                  {cover ? (
                    <img src={cover} alt={item.title} loading="lazy" />
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        background: '#111',
                      }}
                    />
                  )}
                </CardMedia>

                <CardGradient />
                <CardNum>{num}</CardNum>
                <CardArrow>↗</CardArrow>

                <CardContent>
                  <CardTitle>{item.title}</CardTitle>
                </CardContent>
              </IndexCard>
            </Reveal>
          );
        })}
      </IndexGrid>
    </IndexSection>
  );
}

WorksIndex.propTypes = {
  sections: PropTypes.array.isRequired,
  cases: PropTypes.array,
  lang: PropTypes.string.isRequired,
  onNavigate: PropTypes.func.isRequired,
};

WorksIndex.defaultProps = { cases: [] };
