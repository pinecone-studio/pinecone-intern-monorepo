'use client';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../app/theme';
import { PropsWithChildren } from 'react';

export const ThemeProviderHRMS = ({ children }: PropsWithChildren) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
