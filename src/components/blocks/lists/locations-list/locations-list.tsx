import { FC, ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@mui/material';
import { Grid } from '@virtual-grid/react';
import classNames from 'classnames';
import LocationCard, {
  LocationCardProps,
} from '@/components/blocks/cards/location-card/location-card';
import { Location } from '@/lib/api/locations/models';
import { DEFAULT_TAKE } from '@/lib/constants/pagination';
import { useQueryParams } from '@/lib/hooks/use-query-params';
import { useVirtualGallery } from '@/lib/hooks/use-virtual-gallery';
import { Pagination } from '@/lib/types/pagination';
import styles from './locations-list.module.scss';

type LocationsListProps = {
  data: Pagination<Location>;
  emptyComponent?: ReactNode;
  className?: string;
  itemProps?: Omit<LocationCardProps, 'location'>;
  columns?: number | 'auto';
};

const LocationsList: FC<LocationsListProps> = ({
  data,
  emptyComponent,
  itemProps,
  className,
  columns,
}) => {
  const t = useTranslations();
  const { updateQueryParams, urlQuery } = useQueryParams();

  const { data: locations, meta } = data;

  const [grid, ref] = useVirtualGallery({
    count: locations.length,
    cardSize: itemProps?.size || 'md',
    columns,
  });

  const hasMore = meta.total > meta.take;

  if (locations.length === 0) {
    return emptyComponent;
  }

  const loadMore = () => {
    updateQueryParams({
      locations: {
        ...urlQuery.locations,
        take: urlQuery.locations.take + DEFAULT_TAKE,
      },
    });
  };

  return (
    <div className={classNames(styles.container, className)}>
      <div ref={ref} className={styles.gird}>
        <Grid grid={grid}>
          {(index) => (
            <LocationCard location={locations[index]} {...itemProps} />
          )}
        </Grid>
      </div>
      <Button variant="outlined" onClick={loadMore} disabled={!hasMore}>
        {t('shared.loadMore')}
      </Button>
    </div>
  );
};

export default LocationsList;
