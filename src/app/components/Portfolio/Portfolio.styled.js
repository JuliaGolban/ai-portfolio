import styled from 'styled-components';

export const PortfolioSection = styled.section`
  padding: 0 24px 140px;
  max-width: 1400px;
  margin: 0 auto;
  @media (min-width: 768px) { padding: 0 80px 160px; }
`;

export const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 60px;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }
`;

export const Grid3 = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr;
  @media (min-width: 640px) { grid-template-columns: repeat(3, 1fr); }
  & > * { aspect-ratio: 3/4; }
`;

export const GridAsymmetric = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 360px 240px;
  }
  & > *:first-child {
    @media (min-width: 768px) { grid-column: 1/2; grid-row: 1/3; }
    aspect-ratio: 2/3;
  }
  & > *:nth-child(2) {
    @media (min-width: 768px) { grid-column: 2/4; grid-row: 1; }
    aspect-ratio: 16/9;
  }
  & > *:not(:first-child):not(:nth-child(2)) { aspect-ratio: 1/1; }
`;

export const GridEditorial = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr;
  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr 1fr;
    grid-template-rows: 500px 280px;
  }
  & > *:first-child {
    @media (min-width: 768px) { grid-column: 1; grid-row: 1/3; }
    aspect-ratio: 3/4;
  }
  & > *:not(:first-child) { aspect-ratio: 3/4; }
`;

export const GridCinema = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr;
  @media (min-width: 768px) {
    grid-template-columns: 5fr 2fr 2fr;
    grid-template-rows: 420px 280px;
  }
  & > *:first-child {
    @media (min-width: 768px) { grid-column: 1; grid-row: 1/3; }
    aspect-ratio: 2/3;
  }
  & > *:not(:first-child) { aspect-ratio: 3/4; }
`;
