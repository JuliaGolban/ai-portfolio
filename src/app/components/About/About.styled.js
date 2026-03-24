import styled from 'styled-components';
import { ImageFrame } from '../shared/shared.styled';

export const AboutSection = styled.section`
  padding: 140px 24px;
  max-width: 1400px;
  margin: 0 auto;
  @media (min-width: 768px) {
    padding: 160px 80px;
  }
`;

export const AboutLayout = styled.div`
  display: grid;
  gap: 60px;
  grid-template-columns: 1fr;
  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 80px;
  }
`;

export const AboutText = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AboutSubtitle = styled.p`
  font-family: 'Jost', sans-serif;
  font-weight: 200;
  font-size: clamp(0.85rem, 1.4vw, 1rem);
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: 0.06em;
  margin-top: 4px;
`;

export const AboutBio = styled.p`
  font-size: 13px;
  font-weight: 300;
  letter-spacing: 0.04em;
  line-height: 1.9;
  color: rgba(255, 255, 255, 0.36);
  max-width: 440px;
  margin-top: 20px;
`;

export const SocialLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 24px;
`;

export const SocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
  transition: color 0.3s;
  &::before {
    content: '';
    display: block;
    width: 20px;
    height: 1px;
    background: rgba(255, 255, 255, 0.12);
    transition:
      width 0.3s,
      background 0.3s;
    flex-shrink: 0;
  }
  &:hover {
    color: rgba(255, 255, 255, 0.72);
    &::before {
      width: 36px;
      background: rgba(255, 255, 255, 0.35);
    }
  }
`;

export const AboutImages = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 10px;
`;

export const AboutImgMain = styled(ImageFrame)`
  aspect-ratio: 3/4;
  grid-column: 1;
  grid-row: 1 / 3;
`;

export const AboutImgSide = styled(ImageFrame)`
  aspect-ratio: 1/1;
`;
