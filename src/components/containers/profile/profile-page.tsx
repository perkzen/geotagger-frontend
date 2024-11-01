import { Suspense } from 'react';
import { useTranslations } from 'next-intl';
import { Typography } from '@mui/material';
import BestGuessesList from '@/components/blocks/lists/best-guesses-list/best-guesses-list';
import UploadsList from '@/components/blocks/lists/uploads-list/uploads-list';
import ProfileInfo from '@/components/blocks/profile-info/profile-info';
import ProfileInfoSkeleton from '@/components/blocks/profile-info/profile-info-skeleton';
import ListSkeleton from '@/components/blocks/skeletons/list-skeleton';
import styles from './profile-page.module.scss';

const ProfilePage = () => {
  const t = useTranslations('profile');

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Suspense fallback={<ProfileInfoSkeleton />}>
          <ProfileInfo avatar={{ size: 'lg' }} />
        </Suspense>
      </div>
      <div className={styles.section}>
        <Typography variant="h5">{t('myBestGuesses')}</Typography>
        <Suspense fallback={<ListSkeleton />}>
          <BestGuessesList />
        </Suspense>
      </div>
      <div className={styles.section}>
        <Typography variant="h5">{t('myUploads')}</Typography>
        <Suspense fallback={<ListSkeleton />}>
          <UploadsList />
        </Suspense>
      </div>
    </div>
  );
};

export default ProfilePage;
