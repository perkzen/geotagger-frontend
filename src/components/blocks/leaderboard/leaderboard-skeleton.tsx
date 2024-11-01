import { useTranslations } from 'next-intl';
import { Typography } from '@mui/material';
import styles from '@/components/blocks/leaderboard/leaderboard.module.scss';
import LeaderboardItemSkeleton from '@/components/blocks/leaderboard/leaderboard-item/leaderboard-item-skeleton';

const LeaderboardSkeleton = () => {
  const t = useTranslations();

  return (
    <div className={styles.container}>
      <Typography variant="h4">{t('location.guess.leaderboard')}</Typography>
      <ul className={styles.list}>
        {Array.from({ length: 10 }).map((_, index) => (
          <LeaderboardItemSkeleton key={index} />
        ))}
      </ul>
    </div>
  );
};

export default LeaderboardSkeleton;
