import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    contrast: Palette['primary'];
  }

  interface PaletteOptions {
    contrast?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsColorOverrides {
    contrast: true;
  }
}
