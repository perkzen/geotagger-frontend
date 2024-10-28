import { FC, ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@mui/material';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import classNames from 'classnames';
import GuessCard, {
  GuessCardProps,
} from '@/components/blocks/cards/guess-card/guess-card';
import { BestScore } from '@/lib/api/locations/models';
import { DEFAULT_TAKE } from '@/lib/constants/pagination';
import { useQueryParams } from '@/lib/hooks/use-query-params';
import { Pagination } from '@/lib/types/pagination';
import styles from './guesses-list.module.scss';

type GuessesListProps = {
  paginatedData: Pagination<BestScore>;
  emptyComponent?: ReactNode;
  className?: string;
  itemProps?: Pick<GuessCardProps, 'size' | 'className'>;
};

const GuessesList: FC<GuessesListProps> = ({
  paginatedData,
  emptyComponent,
  itemProps,
  className,
}) => {
  const t = useTranslations();
  const { updateQueryParams, urlQuery } = useQueryParams();

  const { data, meta } = paginatedData;

  const hasMore = meta.total >meta.take ;

  const virtualizer = useWindowVirtualizer({
    count: data.length,
    estimateSize: () => 235,
    overscan: 5,
  });

  const loadMore = () => {
    updateQueryParams({
      guess: {
        ...urlQuery.guess,
        take: urlQuery.guess.take + DEFAULT_TAKE,
      },
    });
  };

  if (data.length === 0) {
    return emptyComponent;
  }

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.list}>
        {virtualizer.getVirtualItems().map(({ key, index }) => (
          <GuessCard key={key} {...itemProps} score={data[index]} />
        ))}
      </div>
      <Button variant="outlined" onClick={loadMore} disabled={!hasMore}>
        {t('shared.loadMore')}
      </Button>
    </div>
  );
};

export default GuessesList;
