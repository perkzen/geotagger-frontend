import { Suspense } from 'react';
import BestGuessesList from '@/components/blocks/lists/best-guesses-list/best-guesses-list';
import ListSkeleton from '@/components/blocks/lists/skeletons/list-skeleton';
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
      <Suspense fallback={<ListSkeleton />}>
        <BestGuessesList />
      </Suspense>
      <Suspense fallback={<ListSkeleton />}>
        <UploadsList />
      </Suspense>
    </div>
  );
};

export default ProfilePage;
