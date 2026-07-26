'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import Reveal from '../shared/Reveal';
import {
  SectionLabel,
  SectionTitle,
  SectionDesc,
} from '../shared/shared.styled';
import {
  AudioSection,
  SectionHeader,
  TrackList,
  TrackRow,
  Overlay,
  PlayBtn,
  TrackInfo,
  TrackTitle,
  TrackDesc,
  WaveformWrap,
  WaveBar,
  TimeWrap,
  TimeElapsed,
  TimeDuration,
  ProgressBar,
  ProgressFill,
  SCLink,
} from './Audio.styled';

/* ── Helpers ── */
function fmtTime(sec) {
  if (!isFinite(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/* ── SVG icons ── */
const PlayIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M3 2l9 5-9 5V2z" fill="currentColor" fillOpacity=".9" />
  </svg>
);

const PauseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <rect
      x="2.5"
      y="2"
      width="3"
      height="10"
      rx="1"
      fill="currentColor"
      fillOpacity=".9"
    />
    <rect
      x="8.5"
      y="2"
      width="3"
      height="10"
      rx="1"
      fill="currentColor"
      fillOpacity=".9"
    />
  </svg>
);

const SCIcon = () => (
  <svg width="18" height="10" viewBox="0 0 18 10" fill="currentColor">
    <path d="M0 7.5c0 .83.67 1.5 1.5 1.5S3 8.33 3 7.5V5.8A3.8 3.8 0 011.5 6C.67 6 0 6.67 0 7.5zM3.5 9h1V4.5a2.5 2.5 0 00-1 .22V9zM6 9h1V3a4 4 0 00-1 .18V9zM8.5 9h1V2.5C9.17 2.18 8.84 2 8.5 2c-.17 0-.34.03-.5.07V9zM11 9h1V2c-.33-.13-.66-.2-1-.2V9zM13.5 9h1V2.5a4.5 4.5 0 00-1-.5V9zM16 1.5A1.5 1.5 0 0014.5 0a1.5 1.5 0 00-1.41 1H16zM16 9h1.5A.5.5 0 0018 8.5v-5A4 4 0 0016 2v7z" />
  </svg>
);

/* ── Single track player ── */
function Track({ track, isActive, onActivate, onDeactivate, soundOn, lang }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0); // 0..1
  const [elapsed, setElapsed] = useState(0);

  /* Apply soundOn to audio element */
  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = !soundOn;
  }, [soundOn]);

  /* When another track becomes active — pause this one */
  useEffect(() => {
    if (!isActive && playing) {
      audioRef.current?.pause();
      setTimeout(() => setPlaying(false), 0);
      // setPlaying(false);
    }
  }, [isActive, playing]);

  const handlePlayPause = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;

    if (playing) {
      el.pause();
      setPlaying(false);
      onDeactivate();
    } else {
      setLoading(true);
      onActivate(track.id);
      el.muted = !soundOn;
      el.play()
        .then(() => {
          setPlaying(true);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [playing, soundOn, track.id, onActivate, onDeactivate]);

  const handleTimeUpdate = useCallback(() => {
    const el = audioRef.current;
    if (!el || !el.duration) return;
    setElapsed(el.currentTime);
    setProgress(el.currentTime / el.duration);
  }, []);

  const handleEnded = useCallback(() => {
    setPlaying(false);
    setProgress(0);
    setElapsed(0);
    onDeactivate();
  }, [onDeactivate]);

  /* Seek by clicking on waveform */
  const handleWaveSeek = useCallback(e => {
    const el = audioRef.current;
    if (!el || !el.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    el.currentTime = pct * el.duration;
  }, []);

  const bars = track.waveform || [];
  const playedCount = Math.round(progress * bars.length);

  return (
    <TrackRow
      $active={isActive}
      onClick={handlePlayPause}
      whileHover={{ x: 2 }}
      transition={{ duration: 0.2 }}
    >
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={track.src}
        poster={track.cover}
        preload="none"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onCanPlay={() => setLoading(false)}
      />

      {/* Play / Pause button */}
      <Overlay>
        <PlayBtn
          $loading={loading}
          onClick={e => {
            e.stopPropagation();
            handlePlayPause();
          }}
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {!loading && (playing ? <PauseIcon /> : <PlayIcon />)}
        </PlayBtn>
        <img
          src={track.cover}
          alt={track[`title_${lang}`]}
          width="48"
          height="48"
        />
      </Overlay>

      {/* Track info */}
      <TrackInfo>
        <TrackTitle>{track[`title_${lang}`]}</TrackTitle>
        <TrackDesc>{track.genre}</TrackDesc>
      </TrackInfo>

      {/* Waveform — desktop only */}
      <WaveformWrap
        onClick={e => {
          e.stopPropagation();
          handleWaveSeek(e);
        }}
      >
        {bars.map((h, i) => (
          <WaveBar
            key={i}
            $h={h}
            $played={i < playedCount}
            $active={playing && isActive}
            $idx={i}
          />
        ))}
        {/* Mobile progress bar */}
        <ProgressBar>
          <ProgressFill $pct={progress * 100} />
        </ProgressBar>
      </WaveformWrap>

      {/* Time */}
      <TimeWrap onClick={e => e.stopPropagation()}>
        <TimeElapsed>{fmtTime(elapsed)}</TimeElapsed>
        <TimeDuration>{track.duration}</TimeDuration>
      </TimeWrap>
    </TrackRow>
  );
}

Track.propTypes = {
  track: PropTypes.object.isRequired,
  isActive: PropTypes.bool.isRequired,
  onActivate: PropTypes.func.isRequired,
  onDeactivate: PropTypes.func.isRequired,
  soundOn: PropTypes.bool.isRequired,
  lang: PropTypes.string.isRequired,
};

/* ── Main Audio section ── */
export default function Audio({ audioData, lang, soundOn }) {
  const [activeId, setActiveId] = useState(null);

  const handleActivate = useCallback(id => setActiveId(id), []);
  const handleDeactivate = useCallback(() => setActiveId(null), []);

  if (!audioData) return null;

  const label = audioData[`label_${lang}`] || 'Audio & Sound';
  const title = audioData[`title_${lang}`];
  const desc = audioData[`desc_${lang}`];

  return (
    <AudioSection id="audio">
      <SectionHeader>
        <Reveal>
          <SectionLabel>{label}</SectionLabel>
          <SectionTitle>{title}</SectionTitle>
          <SectionDesc style={{ maxWidth: 560, marginTop: 16 }}>
            {desc}
          </SectionDesc>
        </Reveal>
      </SectionHeader>

      <Reveal delay={0.1}>
        <TrackList>
          {audioData.tracks.map(track => (
            <Track
              key={track.id}
              track={track}
              isActive={activeId === track.id}
              onActivate={handleActivate}
              onDeactivate={handleDeactivate}
              soundOn={soundOn}
              lang={lang}
            />
          ))}
        </TrackList>
      </Reveal>

      {/* SoundCloud link */}
      {audioData.soundcloud_url && (
        <Reveal delay={0.15}>
          <SCLink
            href={audioData.soundcloud_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <SCIcon />
            {lang === 'ua'
              ? 'Більше треків на SoundCloud →'
              : 'More tracks on SoundCloud →'}
          </SCLink>
        </Reveal>
      )}
      {/* Spotify link */}
      {audioData.spotify_url && (
        <Reveal delay={0.15}>
          <SCLink
            href={audioData.spotify_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <SCIcon />
            {lang === 'ua'
              ? 'Більше треків на Spotify →'
              : 'More tracks on Spotify →'}
          </SCLink>
        </Reveal>
      )}
    </AudioSection>
  );
}

AudioSection.propTypes = {
  audioData: PropTypes.object,
  lang: PropTypes.string.isRequired,
  soundOn: PropTypes.bool.isRequired,
};
