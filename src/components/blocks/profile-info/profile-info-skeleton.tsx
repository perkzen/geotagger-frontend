import { Skeleton } from '@mui/material';
import styles from './profile-info.module.scss';

const ProfileInfoSkeleton = () => {
  return (
    <div className={styles.container}>
      <Skeleton variant="circular" width={64} height={64} />
      <Skeleton variant="text" width={200} height={40} />
    </div>
  );
};

export default ProfileInfoSkeleton;
