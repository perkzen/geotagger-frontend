'use client';
import { FC } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Close, Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import classNames from 'classnames';
import { Location } from '@/lib/api/locations/models';
import { Routes } from '@/lib/constants/routes';
import { useDeleteLocationModal } from '@/lib/hooks/use-delete-location-modal';
import styles from './location-card.module.scss';

export type LocationCardProps = {
  location: Location;
  className?: string;
  allowEdit?: boolean;
  size?: 'md' | 'lg';
};

const LocationCard: FC<LocationCardProps> = ({
  location,
  className,
  allowEdit,
  size = 'md',
}) => {
  const { push } = useRouter();
  const openDeleteLocationModal = useDeleteLocationModal({ id: location.id });

  return (
    <div
      className={classNames(styles.container, className, {
        [styles.md]: size === 'md',
        [styles.lg]: size === 'lg',
      })}
    >
      <Image
        src={location.imageUrl}
        alt={location.address}
        quality={100}
        fill
      />
      {allowEdit && (
        <>
          <IconButton
            className={styles.edit}
            onClick={() => push(`${Routes.EDIT_LOCATION}/${location.id}`)}
          >
            <Edit />
          </IconButton>
          <IconButton
            className={styles.delete}
            onClick={openDeleteLocationModal}
          >
            <Close />
          </IconButton>
        </>
      )}
    </div>
  );
};

export default LocationCard;
