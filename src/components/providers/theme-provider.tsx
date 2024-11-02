import { ReactNode } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material';
import mediaQuery from 'css-mediaquery';
import vars from '@/styles/variables.module.scss';

const ssrMatchMedia = (deviceType: string) => (query: string) => ({
  matches: mediaQuery.match(query, {
    width: deviceType === 'mobile' ? '0px' : '1024px',
  }),
});

export default function ThemeProvider({
  children,
  userAgent,
}: {
  children: ReactNode;
  userAgent: string;
}) {
  const theme = createTheme({
    palette: {
      primary: {
        main: vars.primary,
      },
      text: {
        primary: vars.textPrimary,
        secondary: vars.textSecondary,
      },
      error: {
        main: vars.error,
      },
      contrast: {
        main: vars.white,
      },
      danger: {
        main: vars.danger,
      },
    },
    typography: {
      xs: {
        fontWeight: 500,
        fontSize: '12px',
        lineHeight: '18px',
        color: vars.dark,
      },
      sm: {
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '20px',
        color: vars.dark,
      },
      caption: {
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: '14px',
        color: vars.dark,
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
        color: vars.dark,

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
        color: vars.dark,
      },
      h4: {
        fontWeight: 400,
        fontSize: '34px',
        lineHeight: '40px',
        letterSpacing: '0.25px',
        color: vars.dark,
      },
      h5: {
        fontWeight: 400,
        fontSize: '24px',
        lineHeight: '28px',
        letterSpacing: '0.25px',
        color: vars.dark,
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
      MuiUseMediaQuery: {
        defaultProps: {
          ssrMatchMedia: ssrMatchMedia(userAgent),
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: vars.primaryHover,
              color: vars.white,
            },
          },
        },
      },
      MuiButton: {
        variants: [
          {
            props: { variant: 'contrast' },
            style: {
              backgroundColor: vars.white,
              color: vars.primary,
            },
          },
        ],
        styleOverrides: {
          root: {
            padding: '8px 30px',
            borderRadius: '8px',
          },
          contained: {
            '&:disabled': {
              backgroundColor: vars.primaryDisabled,
              color: vars.white,
            },
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
      MuiModal: {
        styleOverrides: {
          root: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            boxShadow: vars.shadow,
            padding: '32px',
            color: vars.dark,
          },
        },
      },
    },
  });

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
