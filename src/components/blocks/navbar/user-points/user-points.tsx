import { FC } from 'react';
import Link from 'next/link';
import { Typography } from '@mui/material';
import { useSuspenseQuery } from '@tanstack/react-query';
import Avatar from '@/components/ui/avatar/avatar';
import { profileQueryOptions } from '@/lib/api/profile/hooks';
import { Routes } from '@/lib/constants/routes';
import styles from './user-points.module.scss';

const UserPoints: FC = () => {
  const { data: profile } = useSuspenseQuery(profileQueryOptions);

  return (
    <Link href={Routes.PROFILE} className={styles.container}>
      <Avatar src={profile?.imageUrl} size={'sm'} />
      <Typography variant="body1" className={styles.points}>
        {profile?.points}
      </Typography>
    </Link>
  );
};

export default UserPoints;
