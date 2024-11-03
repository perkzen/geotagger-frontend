import { Suspense } from 'react';
import { useTranslations } from 'next-intl';
import { Typography } from '@mui/material';
import NewLocationsList from '@/components/blocks/lists/new-locations-list/new-locations-list';
import PersonalBestGuessesList from '@/components/blocks/lists/personal-best-guesses-list/personal-best-guesses-list';
import ListSkeleton from '@/components/blocks/skeletons/list-skeleton';
import styles from './logged-in-home-page.module.scss';

export default function LoggedInHomePage() {
  const t = useTranslations();

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.title}>
          <Typography variant="h4" color="primary">
            {t('home.personalBestGuesses')}
          </Typography>
          <Typography variant="body1">
            {t('home.bestGuessesDescription')}
          </Typography>
        </div>
        <Suspense fallback={<ListSkeleton size="lg" count={1} />}>
          <PersonalBestGuessesList />
        </Suspense>
      </div>
      <div className={styles.section}>
        <div className={styles.title}>
          <Typography variant="h4" color="primary">
            {t('home.newLocations')}
          </Typography>
          <Typography variant="body1">
            {t('home.newLocationsDescription')}
          </Typography>
        </div>
        <Suspense fallback={<ListSkeleton size="lg" />}>
          <NewLocationsList />
        </Suspense>
      </div>
    </div>
  );
}
