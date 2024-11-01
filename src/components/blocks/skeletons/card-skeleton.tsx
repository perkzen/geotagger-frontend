import { FC } from 'react';
import { Skeleton } from '@mui/material';
import classNames from 'classnames';
import styles from './card-skeleton.module.scss';

type CardSkeletonProps = {
  size?: 'md' | 'lg';
};

const CardSkeleton: FC<CardSkeletonProps> = ({ size = 'md' }) => {
  return (
    <Skeleton
      variant="rectangular"
      className={classNames(styles.container, {
        [styles.md]: size === 'md',
        [styles.lg]: size === 'lg',
      })}
    />
  );
};

export default CardSkeleton;
