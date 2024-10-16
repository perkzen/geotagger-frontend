import LocationCardSkeleton from '@/components/blocks/cards/location-card/location-card-skeleton';
import styles from './locations-list.module.scss';

const LocationsListSkeleton = () => {
  return (
    <div className={styles.container}>
      {Array.from({ length: 3 }).map((_, index) => (
        <LocationCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default LocationsListSkeleton;
