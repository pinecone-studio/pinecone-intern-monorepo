import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#121316',
      contrastText: '#fff',
    },
    secondary: {
      main: '#fff',
      contrastText: '#121316',
    },
  },
});

describe('Material-UI Theme', () => {
  it('should have primary color #121316', () => {
    expect(theme.palette.primary.main).toBe('#121316');
    expect(theme.palette.primary.contrastText).toBe('#fff');
  });

  it('should have secondary color #fff', () => {
    expect(theme.palette.secondary.main).toBe('#fff');
    expect(theme.palette.secondary.contrastText).toBe('#121316');
  });
});
