import { Skeleton } from '@mui/material';
import styles from './user-points.module.scss';

const UserPointsSkeleton = () => {
  return (
    <div className={styles.container}>
      <Skeleton variant="circular" width={36} height={36} />
      <Skeleton
        variant="text"
        width={20}
        height={40}
        sx={{ marginRight: '16px' }}
      />
    </div>
  );
};

export default UserPointsSkeleton;
