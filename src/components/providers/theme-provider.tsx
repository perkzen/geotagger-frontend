import { ReactNode } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material';
import vars from '@/styles/variables.module.scss';

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = createTheme({
    palette: {
      primary: {
        main: vars.primary,
      },
      text: {
        primary: vars.textPrimary,
      },
      error: {
        main: vars.error,
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
      h3: {
        fontWeight: 500,
        fontSize: '48px',
        lineHeight: '56.25px',
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
          },
          contained: {
            '&:hover': {
              backgroundColor: vars.primaryHover,
            },
          },
          outlined: {
            '&:hover': {
              backgroundColor: vars.primary,
              color: vars.white,
            },
          },
          text: {
            fontWeight: 400,
            color: vars.dark,
            fontSize: '16px',
            lineHeight: '18.75px',
            padding: '8px 24px',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
          },
          input: {
            padding: '8px 16px',
          },
        },
      },
    },
  });

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
