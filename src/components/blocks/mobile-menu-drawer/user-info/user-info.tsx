import { Avatar, Typography } from '@mui/material';
import { useProfile } from '@/lib/hooks/user';
import styles from './user-info.module.scss';

const UserInfo = () => {
  const { data: profile } = useProfile();
  const imageUrl = profile?.imageUrl || undefined;

  return (
    <div className={styles.container}>
      <Avatar src={imageUrl} />
      <Typography variant="h5">
        {`${profile?.firstname} ${profile?.lastname}`}
      </Typography>
    </div>
  );
};

export default UserInfo;
