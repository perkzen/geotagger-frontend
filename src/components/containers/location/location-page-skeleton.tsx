import { useTranslations } from 'next-intl';
import { Typography } from '@mui/material';
import AddGuessFormSkeleton from "@/components/blocks/forms/add-guess-form/add-guess-form-skeleton";
import LeaderboardSkeleton from '@/components/blocks/leaderboard/leaderboard-skeleton';
import styles from '@/components/containers/location/location-page.module.scss';

const LocationPageSkeleton = () => {
  const t = useTranslations();

  return (
    <div className={styles.container}>
      <div className={styles.guess}>
        <Typography variant="h4" className={styles.title}>
          {t.rich('location.guess.title', {
            span: (chunks) => <span>{chunks}</span>,
          })}
          !
        </Typography>
        <AddGuessFormSkeleton />
      </div>
      <LeaderboardSkeleton />
    </div>
  );
};

export default LocationPageSkeleton;
