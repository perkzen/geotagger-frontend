'use client';
import { Avatar, Typography } from '@mui/material';
import { useSuspenseQuery } from '@tanstack/react-query';
import { profileQueryOptions } from '@/lib/api/profile/hooks';
import styles from './profile-info.module.scss';

const ProfileInfo = () => {
  const { data: profile } = useSuspenseQuery(profileQueryOptions);

  return (
    <div className={styles.container}>
      <Avatar
        src={profile?.imageUrl ?? undefined}
        alt={'user'}
        className={styles.avatar}
      />
      <Typography variant="h4">{`${profile?.firstname} ${profile?.lastname}`}</Typography>
    </div>
  );
};

export default ProfileInfo;
