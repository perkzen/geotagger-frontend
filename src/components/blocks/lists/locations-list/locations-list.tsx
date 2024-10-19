import { FC, ReactNode } from 'react';
import classNames from 'classnames';
import LocationCard, {
  LocationCardProps,
} from '@/components/blocks/cards/location-card/location-card';
import { Location } from '@/lib/api/locations/models';
import styles from './locations-list.module.scss';

type LocationsListProps = {
  data: Location[];
  emptyComponent?: ReactNode;
  className?: string;
  itemProps?: Omit<LocationCardProps, 'location'>;
};

const LocationsList: FC<LocationsListProps> = ({
  data,
  emptyComponent,
  itemProps,
  className,
}) => {
  if (data.length === 0) {
    return emptyComponent;
  }

  return (
    <div className={classNames(styles.container, className)}>
      {data.map((location) => (
        <LocationCard {...itemProps} key={location.id} location={location} />
      ))}
    </div>
  );
};

export default LocationsList;
