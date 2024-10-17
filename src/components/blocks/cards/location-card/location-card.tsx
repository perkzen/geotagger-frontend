'use client';
import { FC } from 'react';
import Image from 'next/image';
import { Close, Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Location } from '@/lib/api/locations/models';
import { useDeleteLocationModal } from '@/lib/hooks/use-delete-location-modal';
import styles from './location-card.module.scss';

type LocationCardProps = {
  location: Location;
};

const LocationCard: FC<LocationCardProps> = ({ location }) => {
  const openDeleteLocationModal = useDeleteLocationModal({ id: location.id });

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
      <IconButton className={styles.delete} onClick={openDeleteLocationModal}>
        <Close />
      </IconButton>
    </div>
  );
};

export default LocationCard;
