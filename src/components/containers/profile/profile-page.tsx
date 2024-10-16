import GuessesList from '@/components/blocks/guess-list/guesses-list';
import ProfileInfo from '@/components/blocks/profile-info/profile-info';
import UploadsList from '@/components/blocks/uploads-list/uploads-list';
import { myLocationsQueryOptions } from '@/lib/api/locations/hooks';
import { profileQueryOptions } from '@/lib/api/profile/hooks';
import { getQueryClient } from '@/lib/utils/get-query-client';
import styles from './profile-page.module.scss';

const ProfilePage = async () => {
  const queryClient = getQueryClient();

  void Promise.all([
    queryClient.prefetchQuery(profileQueryOptions),
    queryClient.prefetchQuery(
      myLocationsQueryOptions({
        take: 5,
        skip: 0,
      })
    ),
  ]);

  return (
    <div className={styles.container}>
      <ProfileInfo />
      <GuessesList />
      <UploadsList />
    </div>
  );
};

export default ProfilePage;
