/* eslint-disable @next/next/no-page-custom-font */
import React from 'react';
import PropTypes from 'prop-types';
import StyledComponentsRegistry from '../lib/registry';
import './globals.css';
import BriefWidget from './components/shared/BriefWidget';

export const metadata = {
  title: 'AI Creator Portfolio | Emotional Cinematic',
  description: 'Digital Soul & Artificial Intelligence',
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,200;0,300;1,200;1,300&family=Jost:wght@200;300;400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <StyledComponentsRegistry>
          {children}
          <BriefWidget />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
