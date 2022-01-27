import React, { PropsWithChildren } from 'react';
import { ThemeProvider as ThemeProviderComponent } from 'styled-components';
import FontStyle from './FontStyle';
import GlobalStyle from './GlobalStyle';

const theme = {
  breakpoints: {
    xs: '0px',
    sm: '600px',
    md: '900px',
    lg: '1200px',
    lgx: '1440',
    xl: '1536px',
  },
};

const ThemeProvider = ({ children }: PropsWithChildren<{}>) => (
  <ThemeProviderComponent theme={theme}>
    <FontStyle />
    <GlobalStyle />
    {children}
  </ThemeProviderComponent>
);

export default ThemeProvider;
