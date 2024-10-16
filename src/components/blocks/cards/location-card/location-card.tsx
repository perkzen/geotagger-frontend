import { FC } from 'react';
import Image from 'next/image';
import { Location } from '@/lib/api/locations/models';
import styles from './location-card.module.scss';
import { IconButton } from '@mui/material';
import { Close, Edit } from '@mui/icons-material';

type LocationCardProps = {
  location: Location;
};

const LocationCard: FC<LocationCardProps> = ({ location }) => {
  return (
    <div className={styles.container}>
      <Image
        src={location.imageUrl}
        alt={location.address}
        quality={100}
        fill
      />
      <IconButton className={styles.edit}>
        <Edit />
      </IconButton>
      <IconButton className={styles.delete}>
        <Close />
      </IconButton>
    </div>
  );
};

export default LocationCard;
