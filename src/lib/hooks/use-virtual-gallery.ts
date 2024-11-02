import { useRef } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { useGrid } from '@virtual-grid/react';
import vars from 'src/styles/variables.module.scss';

type UseVirtualGalleryOptions = {
  count: number;
  cardSize: 'lg' | 'md';
};

const getCardSize = (
  size: UseVirtualGalleryOptions['cardSize'],
  isMobile: boolean
) => {
  if (isMobile) {
    return { width: +vars.cardMobileWidth, height: +vars.cardMobileHeight };
  }

  if (size === 'lg') {
    return { width: +vars.cardLgWidth, height: +vars.cardLgHeight };
  }

  return { width: +vars.cardMdWidth, height: +vars.cardMdHeight };
};

export const useVirtualGallery = ({
  count,
  cardSize,
}: UseVirtualGalleryOptions) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const ref = useRef<HTMLDivElement>(null);

  const grid = useGrid({
    scrollRef: ref,
    count: count,
    columns: isMobile ? 'auto' : 4,
    horizontal: false,
    size: getCardSize(cardSize, isMobile),
    gap: 20,
    padding: 0,
    overscan: 4,
  });

  return [grid, ref] as const;
};
