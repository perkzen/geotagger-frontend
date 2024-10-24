import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Typography } from '@mui/material';
import LeaderboardItem from '@/components/blocks/leaderboard/leaderboard-item/leaderboard-item';
import { Guess } from '@/lib/api/locations/models';
import styles from './leaderboard.module.scss';

type LeaderboardProps = {
  items: Guess[];
};

const Leaderboard: FC<LeaderboardProps> = ({ items }) => {
  const t = useTranslations();

  return (
    <div className={styles.container}>
      <Typography variant="h4">{t('location.guess.leaderboard')}</Typography>
      <ul>
        {items.map((g, index) => (
          <LeaderboardItem key={g.id} item={g} place={index + 1} />
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
