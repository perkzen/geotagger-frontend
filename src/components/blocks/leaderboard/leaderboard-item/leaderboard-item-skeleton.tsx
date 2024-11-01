import { Skeleton } from '@mui/material';
import styles from './leaderboard-item.module.scss';

const LeaderboardItemSkeleton = () => {
  return (
    <li className={styles.container}>
      <Skeleton variant="circular" width={27} height={27} />
      <Skeleton variant="circular" width={40} height={40} />
      <div className={styles.info}>
        <Skeleton variant="text" height={20} width={100} />
        <Skeleton variant="text" height={18} width={50} />
      </div>
      <Skeleton
        className={styles.distance}
        variant="text"
        height={20}
        width={60}
      />
    </li>
  );
};

export default LeaderboardItemSkeleton;
