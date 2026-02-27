import React from 'react';
import PropTypes from 'prop-types';
import StyledComponentsRegistry from '../lib/registry';
import './globals.css';

export const metadata = {
  title: 'AI Creator Portfolio | Emotional Cinematic',
  description: 'Digital Soul & Artificial Intelligence',
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
