import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@mui/material';
import CardSkeleton from '@/components/blocks/skeletons/card-skeleton';
import styles from './list-skeleton.module.scss';

type ListSkeletonProps = {
  count?: number;
  size?: 'md' | 'lg';
};

const ListSkeleton: FC<ListSkeletonProps> = ({ count = 4, size }) => {
  const t = useTranslations();

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {Array.from({ length: count }).map((_, index) => (
          <CardSkeleton key={index} size={size} />
        ))}
      </div>
      <Button variant="outlined" disabled>
        {t('shared.loadMore')}
      </Button>
    </div>
  );
};

export default ListSkeleton;
