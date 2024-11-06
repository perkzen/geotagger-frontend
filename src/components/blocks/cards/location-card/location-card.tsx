'use client';
import { FC } from 'react';
import { useRouter } from 'next-nprogress-bar';
import Image from 'next/image';
import { Close, Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import classNames from 'classnames';
import GuessCardOverlay from '@/components/blocks/cards/guess-card-overlay/guess-card-overlay';
import { Location } from '@/lib/api/locations/models';
import { Routes } from '@/lib/constants/routes';
import { useDeleteLocationModal } from '@/lib/hooks/use-delete-location-modal';
import { useHover } from '@/lib/hooks/use-hover';
import styles from './location-card.module.scss';

export type LocationCardProps = {
  location: Location;
  className?: string;
  allowEdit?: boolean;
  size?: 'md' | 'lg';
  as?: 'link' | 'div';
};

const LocationCard: FC<LocationCardProps> = ({
  location,
  className,
  allowEdit,
  size = 'md',
  as = 'div',
}) => {
  const { push } = useRouter();
  const [ref, isHovering] = useHover<HTMLDivElement>();

  const openDeleteLocationModal = useDeleteLocationModal({ id: location.id });

  return (
    <div
      ref={ref}
      className={classNames(styles.container, className, {
        [styles.md]: size === 'md',
        [styles.lg]: size === 'lg',
      })}
    >
      {as === 'link' && (
        <GuessCardOverlay
          locationId={location.id}
          isHovering={isHovering}
          size={size}
        />
      )}

      <Image
        src={location.imageUrl}
        alt={location.address}
        quality={100}
        fill
      />
      {allowEdit && (
        <>
          <IconButton
            color="primary"
            className={styles.edit}
            onClick={() => push(`${Routes.EDIT_LOCATION}/${location.id}`)}
          >
            <Edit />
          </IconButton>
          <IconButton
            color="error"
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
