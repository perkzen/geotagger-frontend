'use client';
import { FC } from 'react';
import Image from 'next/image';
import { LockOutlined } from '@mui/icons-material';
import { Typography } from '@mui/material';
import classNames from 'classnames';
import PlaceholderLocation from 'public/images/location-1.jpeg';
import GuessCardOverlay from '@/components/blocks/cards/guess-card-overlay/guess-card-overlay';
import { BestScore } from '@/lib/api/locations/models';
import { useHover } from '@/lib/hooks/use-hover';
import styles from './guess-card.module.scss';

export type GuessCardProps = (
  | {
      isLocked?: true;
      guess?: never;
    }
  | {
      isLocked?: false;
      guess: BestScore;
    }
) & {
  className?: string;
  size?: 'md' | 'lg';
};

const GuessCard: FC<GuessCardProps> = ({
  isLocked = false,
  guess,
  className,
  size = 'md',
}) => {
  const [ref, isHovering] = useHover<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={classNames(styles.container, className, {
        [styles.md]: size === 'md',
        [styles.lg]: size === 'lg',
      })}
    >
      <Image
        src={guess?.location.media.keyUrl ?? PlaceholderLocation}
        alt={'guess-location'}
        quality={100}
        fill
      />
      {isLocked? (
        <LockOutlined className={styles.icon} />
      ) : (
        <>
          <GuessCardOverlay
            locationId={guess!.location.id}
            isHovering={isHovering}
            size={size}
          />

          <Typography variant="h5" className={styles.text} color="contrast">
            {guess?.distance}
          </Typography>
        </>
      )}
    </div>
  );
};

export default GuessCard;
