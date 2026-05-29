'use client';

import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { SoundBtn, SoundLabel, BarsWrap, Bar } from './SoundToggle.styled';

export default function SoundToggle({ src, lang }) {
  const audioRef  = useRef(null);
  const [playing, setPlaying]   = useState(false);
  const [loaded,  setLoaded]    = useState(false);
  const [mounted, setMounted]   = useState(false);

  /* Mount-only — avoid SSR mismatch */
  useEffect(() => { setMounted(true); }, []);

  /* Create audio element once on client */
  useEffect(() => {
    if (!mounted) return;
    const audio = new Audio(src);
    audio.loop   = true;
    audio.volume = 0;
    audioRef.current = audio;

    audio.addEventListener('canplaythrough', () => setLoaded(true));
    audio.load();

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [mounted, src]);

  /* Fade volume smoothly */
  const fadeTo = (target, duration = 1200) => {
    const audio = audioRef.current;
    if (!audio) return;
    const start   = audio.volume;
    const diff    = target - start;
    const step    = 20;
    const steps   = duration / step;
    let   current = 0;
    const timer = setInterval(() => {
      current++;
      audio.volume = Math.min(1, Math.max(0, start + diff * (current / steps)));
      if (current >= steps) {
        clearInterval(timer);
        if (target === 0) audio.pause();
      }
    }, step);
  };

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      fadeTo(0);
      setPlaying(false);
    } else {
      audio.play().then(() => {
        fadeTo(0.18); /* subtle — ambient should not distract */
        setPlaying(true);
      }).catch(() => {
        /* autoplay policy — user has to click, which they just did, so this rarely fires */
      });
    }
  };

  if (!mounted) return null;

  const label = playing
    ? (lang === 'ua' ? 'ЗВУК' : 'SOUND')
    : (lang === 'ua' ? 'ТИХО' : 'MUTED');

  return (
    <SoundBtn
      onClick={toggle}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.5, duration: 0.8 }}
      title={playing ? 'Вимкнути звук' : 'Увімкнути звук'}
    >
      <BarsWrap>
        <Bar $playing={playing} $delay={0} />
        <Bar $playing={playing} $delay={1} />
        <Bar $playing={playing} $delay={2} />
        <Bar $playing={playing} $delay={3} />
        <Bar $playing={playing} $delay={1} />
      </BarsWrap>
      <SoundLabel>{label}</SoundLabel>
    </SoundBtn>
  );
}

SoundToggle.propTypes = {
  src:  PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
};
