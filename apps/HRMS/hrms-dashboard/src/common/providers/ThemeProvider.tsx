'use client';
import { ThemeProvider } from '@mui/material';
import { theme as hrmsTheme } from '../../app/theme';
import { PropsWithChildren, useMemo } from 'react';

export const ThemeProviderHRMS = ({ children }: PropsWithChildren) => {
  const theme = useMemo(() => hrmsTheme, []);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
