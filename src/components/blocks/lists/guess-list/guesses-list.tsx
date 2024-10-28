import { FC, ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@mui/material';
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

  const hasMore = meta.take > meta.total;

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
        {data.map((score, i) => (
          <GuessCard key={i} {...itemProps} score={score} />
        ))}
      </div>
      <Button variant="outlined" onClick={loadMore} disabled={hasMore}>
        {t('shared.loadMore')}
      </Button>
    </div>
  );
};

export default GuessesList;
