'use client';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FooterWrap = styled.footer`
  padding: 32px 80px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  border-top: 1px solid var(--border-soft);
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.3em;
  color: var(--text-light);
  @media (max-width: 600px) {
    padding: 32px 24px;
  }
`;

export default function Footer({ lang, t }) {
  return (
    <FooterWrap>
      <span>Julia Golban © 2026</span>
      <span>{t.tagline}</span>
      <span>{t.city}</span>
    </FooterWrap>
  );
}

Footer.propTypes = {
  lang: PropTypes.string.isRequired,
  t: PropTypes.object.isRequired,
};
