import { FC } from 'react';
import Image from 'next/image';
import { Typography } from '@mui/material';
import classNames from 'classnames';
import { formatDistanceToNow } from 'date-fns';
import { Guess } from '@/lib/api/locations/models';
import styles from './leaderboard-item.module.scss';

type LeaderboardItemProps = {
  item: Guess;
  place: number;
};

const LeaderboardItem: FC<LeaderboardItemProps> = ({ item, place }) => {
  return (
    <li className={styles.container}>
      <Typography
        variant="caption"
        color="contrast"
        className={classNames(styles.badge, {
          [styles.first]: place === 1,
          [styles.second]: place === 2,
          [styles.third]: place === 3,
        })}
      >
        {place}
      </Typography>
      <Image
        className={styles.image}
        src={item.user.imageUrl}
        alt={'user'}
        width={40}
        height={40}
      />
      <div className={styles.info}>
        <Typography variant="body1">
          {item.user.firstname} {item.user.lastname}
        </Typography>
        <Typography variant="caption">
          {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
        </Typography>
      </div>
      <Typography className={styles.distance} variant="body1" color="primary">
        {item.distanceText}
      </Typography>
    </li>
  );
};

export default LeaderboardItem;
