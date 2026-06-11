import styled, { keyframes, css } from 'styled-components';
import { motion } from 'framer-motion';

export const AudioSection = styled.section`
  padding: 0 24px 140px;
  max-width: 1400px;
  margin: 0 auto;
  @media (min-width: 768px) {
    padding: 0 80px 160px;
  }
`;

export const SectionHeader = styled.div`
  margin-bottom: 64px;
`;

export const TrackList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

/* ── Single track row ── */
export const TrackRow = styled(motion.div)`
  position: relative;
  background: ${({ $active }) =>
    $active ? 'var(--border-soft)' : 'transparent'};
  border: 1px solid
    ${({ $active }) => ($active ? 'var(--border-soft)' : 'transparent')};
  border-radius: 4px;
  padding: 20px 24px;
  display: grid;
  grid-template-columns: 44px 150px 1fr auto;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  transition:
    background 0.3s,
    border-color 0.3s;
  &:hover {
    background: var(--border);
    border-color: var(--border-soft);
  }
  @media (min-width: 640px) {
    grid-template-columns: 44px 300px 1fr auto;
    gap: 28px;
  }
`;

export const Overlay = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--overlay);
`;

/* ── Play button ── */
const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

export const PlayBtn = styled.button`
  position: absolute;
  z-index: 2;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--border-light);
  background: var(--border-light);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s;
  color: rgba(255, 255, 255, 0.7);

  &:hover {
    border-color: var(--border-dark);
    background: var(--border);
    color: #fff;
  }

  svg {
    display: block;
    flex-shrink: 0;
  }

  /* Loading ring */
  ${({ $loading }) =>
    $loading &&
    css`
      border-color: transparent;
      border-top-color: var(--border-medium);
      animation: ${spin} 0.9s linear infinite;
    `}
`;

/* ── Track info ── */
export const TrackInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
`;

export const TrackTitle = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: clamp(1rem, 2vw, 1.25rem);
  font-weight: 200;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
`;

export const TrackDesc = styled.p`
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

/* ── Waveform ── */
export const WaveformWrap = styled.div`
  position: relative;
  display: flex;
  height: 48px;
  align-items: center;
  gap: 1.5px;
  cursor: pointer;
`;

export const WaveBar = styled.span`
  flex-shrink: 0;
  width: 2px;
  border-radius: 1px;
  height: ${({ $h }) => Math.round($h * 100)}%;
  background: ${({ $played }) =>
    $played ? 'var(--border-dark)' : 'var(--border)'};
  transition:
    background 0.15s,
    transform 0.15s;

  /* Active track: bars bob slightly while playing */
  ${({ $active, $h, $idx }) =>
    $active &&
    css`
      animation: waveBob ${0.6 + ($idx % 7) * 0.08}s ease-in-out infinite
        alternate;
      animation-delay: ${($idx % 5) * 0.07}s;
      @keyframes waveBob {
        from {
          transform: scaleY(1);
        }
        to {
          transform: scaleY(${0.55 + $h * 0.55});
        }
      }
    `}
`;

/* ── Right side: time ── */
export const TimeWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
  flex-shrink: 0;
`;

export const TimeElapsed = styled.span`
  font-size: 11px;
  font-weight: 300;
  letter-spacing: 0.08em;
  color: var(--text-nav);
  font-variant-numeric: tabular-nums;
`;

export const TimeDuration = styled.span`
  font-size: 9px;
  font-weight: 300;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  font-variant-numeric: tabular-nums;
`;

/* ── Progress bar below waveform (mobile) ── */
export const ProgressBar = styled.div`
  position: absolute;
  top: 30px;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--border);
`;

export const ProgressFill = styled.div`
  height: 100%;
  background: var(--border-medium);
  width: ${({ $pct }) => $pct}%;
  transition: width 0.1s linear;
`;

/* ── SoundCloud link ── */
export const SCLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 40px;
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--text-muted);
  transition: color 0.3s;
  border-bottom: 1px solid var(--border-soft);
  padding-bottom: 3px;
  &:hover {
    color: var(--text-frame);
    border-color: var(--border-soft);
  }

  svg {
    flex-shrink: 0;
  }
`;
