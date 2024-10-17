import Link from 'next/link';
import { Avatar, Typography } from '@mui/material';
import { useProfile } from '@/lib/api/profile/hooks';
import { Routes } from '@/lib/constants/routes';
import styles from './user-info.module.scss';

const UserInfo = () => {
  const { data: profile } = useProfile();
  const imageUrl = profile?.imageUrl || undefined;

  return (
    <Link href={Routes.PROFILE} className={styles.container}>
      <Avatar src={imageUrl} />
      <Typography variant="h5">
        {`${profile?.firstname} ${profile?.lastname}`}
      </Typography>
    </Link>
  );
};

export default UserInfo;
