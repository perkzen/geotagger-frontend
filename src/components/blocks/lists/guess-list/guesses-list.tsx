import { FC, ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@mui/material';
import { Grid } from '@virtual-grid/react';
import classNames from 'classnames';
import GuessCard, {
  GuessCardProps,
} from '@/components/blocks/cards/guess-card/guess-card';
import { BestScore } from '@/lib/api/locations/models';
import { DEFAULT_TAKE } from '@/lib/constants/pagination';
import { useQueryParams } from '@/lib/hooks/use-query-params';
import { useVirtualGallery } from '@/lib/hooks/use-virtual-gallery';
import { Pagination } from '@/lib/types/pagination';
import styles from './guesses-list.module.scss';

type GuessesListProps = {
  data: Pagination<BestScore>;
  emptyComponent?: ReactNode;
  className?: string;
  itemProps?: Pick<GuessCardProps, 'size' | 'className'>;
  columns?: number | 'auto';
};

const GuessesList: FC<GuessesListProps> = ({
  data,
  emptyComponent,
  itemProps,
  className,
  columns,
}) => {
  const t = useTranslations();
  const { updateQueryParams, urlQuery } = useQueryParams();

  const { data: guesses, meta } = data;

  const [grid, ref] = useVirtualGallery({
    count: guesses.length,
    cardSize: itemProps?.size || 'md',
    columns,
  });

  const hasMore = meta.total > meta.take;

  const loadMore = () => {
    updateQueryParams({
      guess: {
        ...urlQuery.guess,
        take: urlQuery.guess.take + DEFAULT_TAKE,
      },
    });
  };

  if (guesses.length === 0) {
    return emptyComponent;
  }

  return (
    <div className={classNames(styles.container, className)}>
      <div ref={ref} className={styles.gird}>
        <Grid grid={grid}>
          {(index) => (
            <GuessCard key={index} guess={guesses[index]} {...itemProps} />
          )}
        </Grid>
      </div>
      <Button variant="outlined" onClick={loadMore} disabled={!hasMore}>
        {t('shared.loadMore')}
      </Button>
    </div>
  );
};

export default GuessesList;
