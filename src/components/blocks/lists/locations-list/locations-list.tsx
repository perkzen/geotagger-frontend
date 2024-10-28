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
  paginatedData: Pagination<Location>;
  emptyComponent?: ReactNode;
  className?: string;
  itemProps?: Omit<LocationCardProps, 'location'>;
};

const LocationsList: FC<LocationsListProps> = ({
  paginatedData,
  emptyComponent,
  itemProps,
  className,
}) => {
  const t = useTranslations();
  const { updateQueryParams, urlQuery } = useQueryParams();

  const { data, meta } = paginatedData;

  const hasMore = meta.take > meta.total;

  if (data.length === 0) {
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

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.list}>
        {data.map((location) => (
          <LocationCard {...itemProps} key={location.id} location={location} />
        ))}
      </div>
      <Button variant="outlined" onClick={loadMore} disabled={hasMore}>
        {t('shared.loadMore')}
      </Button>
    </div>
  );
};

export default LocationsList;
