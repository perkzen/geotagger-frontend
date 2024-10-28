import CardSkeleton from '@/components/blocks/skeletons/card-skeleton';
import styles from '../lists/locations-list/locations-list.module.scss';

const ListSkeleton = () => {
  return (
    <div className={styles.container}>
      {Array.from({ length: 3 }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
};

export default ListSkeleton;
