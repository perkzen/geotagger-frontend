import { CSSProperties } from 'react';
import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    contrast: Palette['primary'];
    danger: Palette['primary'];
  }

  interface PaletteOptions {
    contrast?: PaletteOptions['primary'];
    danger?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    xs: CSSProperties;
    sm: CSSProperties;
  }

  interface TypographyVariantsOptions {
    xs?: CSSProperties;
    sm?: CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    xs: true;
    sm: true
  }

  interface TypographyPropsColorOverrides {
    contrast: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    contrast: true;
  }
}
