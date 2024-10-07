import { ReactNode } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material';
import vars from '@/styles/variables.module.scss';

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = createTheme({
    palette: {
      primary: {
        main: vars.primary,
      },
    },
    typography: {
      caption: {
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: '14px',
        color: vars.white,
      },
      body1: {
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '18.75px',
        color: vars.dark,
      },
      h1: {
        fontWeight: 500,
        fontSize: '61px',
        lineHeight: '70px',
        letterSpacing: '-0.5px',
        color: vars.primary,

        [`@media (max-width:${vars.sm}px)`]: {
          fontWeight: 400,
          fontSize: '34px',
          lineHeight: '40px',
          letterSpacing: '0.25px',
        },
      },
      h4: {
        fontWeight: 400,
        fontSize: '34px',
        lineHeight: '40px',
        letterSpacing: '0.25px',
        color: vars.primary,

        [`@media (max-width:${vars.sm}px)`]: {
          fontWeight: 400,
          fontSize: '24px',
          lineHeight: '28px',
          letterSpacing: '0.25px',
        },
      },
      h5: {
        fontWeight: 400,
        fontSize: '24px',
        lineHeight: '28px',
        letterSpacing: '0.25px',
        color: vars.primary,
      },
      button: {
        textTransform: 'none',
        lineHeight: '20px',
        fontSize: '14px',
        fontWeight: 600,
      },
    },
    breakpoints: {
      values: {
        xs: +vars.xs,
        sm: +vars.sm,
        md: +vars.md,
        lg: +vars.lg,
        xl: +vars.xl,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            padding: '8px 30px',
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: vars.primaryHover,
            },
          },
        },
      },
    },
  });

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
