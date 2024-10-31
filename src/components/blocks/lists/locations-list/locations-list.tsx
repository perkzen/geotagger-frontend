import { FC, ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@mui/material';
import classNames from 'classnames';
import LocationCard, {
  LocationCardProps,
} from '@/components/blocks/cards/location-card/location-card';
import { Location } from '@/lib/api/locations/models';
import { DEFAULT_TAKE } from '@/lib/constants/pagination';
import { useQueryParams } from '@/lib/hooks/use-query-params';
import { Pagination } from '@/lib/types/pagination';
import styles from './locations-list.module.scss';

type LocationsListProps = {
  data: Pagination<Location>;
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
  const t = useTranslations();
  const { updateQueryParams, urlQuery } = useQueryParams();

  const { data: locations, meta } = data;

  const hasMore = meta.total > meta.take;

  if (locations.length === 0) {
    return emptyComponent;
  }

  const loadMore = () => {
    updateQueryParams({
      location: {
        ...urlQuery.location,
        take: urlQuery.location.take + DEFAULT_TAKE,
      },
    });
  };

  // TODO: this list should be virtualized
  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.list}>
        {locations.map((location) => (
          <LocationCard key={location.id} location={location} {...itemProps} />
        ))}
      </div>
      <Button variant="outlined" onClick={loadMore} disabled={!hasMore}>
        {t('shared.loadMore')}
      </Button>
    </div>
  );
};

export default LocationsList;
