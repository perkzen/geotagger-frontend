import { FC, ReactNode } from 'react';
import LocationCard from '@/components/blocks/cards/location-card/location-card';
import { Location } from '@/lib/api/locations/models';
import styles from './locations-list.module.scss';

type LocationsListProps = {
  data?: Location[];
  emptyComponent?: ReactNode;
};

const LocationsList: FC<LocationsListProps> = ({
  data = [],
  emptyComponent,
}) => {
  if (data.length === 0) {
    return emptyComponent || 'no data';
  }

  return (
    <div className={styles.container}>
      {data.map((location) => (
        <LocationCard location={location} key={location.id} />
      ))}
    </div>
  );
};

export default LocationsList;
