import CardSkeleton from '@/components/blocks/lists/skeletons/card-skeleton';
import styles from '../locations-list/locations-list.module.scss';

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
