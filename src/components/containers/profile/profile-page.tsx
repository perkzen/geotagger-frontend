import { Suspense } from 'react';
import GuessesList from '@/components/blocks/lists/guess-list/guesses-list';
import LocationsListSkeleton from '@/components/blocks/lists/locations-list/locations-list-skeleton';
import UploadsList from '@/components/blocks/lists/uploads-list/uploads-list';
import ProfileInfo from '@/components/blocks/profile-info/profile-info';
import ProfileInfoSkeleton from '@/components/blocks/profile-info/profile-info-skeleton';
import styles from './profile-page.module.scss';

const ProfilePage = () => {
  return (
    <div className={styles.container}>
      <Suspense fallback={<ProfileInfoSkeleton />}>
        <ProfileInfo />
      </Suspense>
      <GuessesList />
      <Suspense fallback={<LocationsListSkeleton />}>
        <UploadsList />
      </Suspense>
    </div>
  );
};

export default ProfilePage;
