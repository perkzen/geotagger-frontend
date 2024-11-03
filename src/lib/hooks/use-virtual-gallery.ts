import { useRef } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { useGrid } from '@virtual-grid/react';
import vars from 'src/styles/variables.module.scss';

type UseVirtualGalleryOptions = {
  count: number;
  cardSize: 'lg' | 'md';
  columns?: number | 'auto';
};

export const useVirtualGallery = ({
  count,
  cardSize,
  columns = 3,
}: UseVirtualGalleryOptions) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isLg = useMediaQuery(theme.breakpoints.down('lg'));

  const ref = useRef<HTMLDivElement>(null);

  const getColumns = () => {
    if (isSm) {
      return 1;
    }

    if (isLg) {
      return 2;
    }

    return columns;
  };

  const getCardSize = () => {
    if (isSm) {
      return { width: +vars.cardMobileWidth, height: +vars.cardMobileHeight };
    }

    if (cardSize === 'lg') {
      return { width: +vars.cardLgWidth, height: +vars.cardLgHeight };
    }

    return { width: +vars.cardMdWidth, height: +vars.cardMdHeight };
  };

  const grid = useGrid({
    scrollRef: ref,
    count: count,
    columns: getColumns(),
    horizontal: false,
    size: getCardSize(),
    gap: 20,
    padding: 0,
    overscan: 4,
  });

  return [grid, ref] as const;
};
