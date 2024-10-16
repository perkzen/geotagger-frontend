'use client';
import { Avatar, Typography } from '@mui/material';
import NoGuessesInfo from '@/components/blocks/no-guesses-info/no-guesses-info';
import NoUploadsInfo from '@/components/blocks/no-uploads-info/no-uploads-info';
import { useProfile } from '@/lib/hooks/user';
import styles from './profile-page.module.scss';

const ProfilePage = () => {
  const { data: profile } = useProfile();

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Avatar
          src={profile?.imageUrl ?? undefined}
          alt={'user'}
          className={styles.avatar}
        />
        <Typography variant="h4">{`${profile?.firstname} ${profile?.lastname}`}</Typography>
      </div>
      <NoGuessesInfo />
      <NoUploadsInfo />
    </div>
  );
};

export default ProfilePage;
