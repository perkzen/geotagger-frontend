import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mui/material';
import { MapMouseEvent } from '@vis.gl/react-google-maps';
import Input from '@/components/ui/input/input';
import Map from '@/components/ui/map/map';
import {
  locationQueryOptions,
  useGuessLocation,
} from '@/lib/api/locations/hooks';
import { GuessDetails, Location } from '@/lib/api/locations/models';
import { profileQueryOptions } from '@/lib/api/profile/hooks';
import { useErrorModal } from '@/lib/hooks/use-error-modal';
import { Coordinates } from '@/lib/types/coordinates';
import { getQueryClient } from '@/lib/utils/get-query-client';
import {
  AddGuessFormData,
  AddGuessValidator,
} from '@/lib/validators/add-guess';
import styles from './add-guess-form.module.scss';

type AddGuessFormProps = {
  location: Location;
};

const AddGuessForm: FC<AddGuessFormProps> = ({ location }) => {
  const t = useTranslations();
  const queryClient = getQueryClient();
  const openErrorModal = useErrorModal();

  const [guess, setGuess] = useState<GuessDetails>();

  const { setValue, watch, handleSubmit, reset } = useForm<AddGuessFormData>({
    resolver: zodResolver(AddGuessValidator),
  });

  const [lat, lng] = watch(['lat', 'lng']);

  const coordinates: Coordinates | undefined =
    lat && lng ? { lat, lng } : undefined;

  const isDirty = !!coordinates;

  const { mutateAsync: guessLocation, isPending: isLoading } = useGuessLocation(
    {
      onSuccess: (data) => {
        setGuess(data);
        void Promise.all([
          queryClient.invalidateQueries(profileQueryOptions),
          queryClient.invalidateQueries(locationQueryOptions(location.id)),
        ]);
      },
      onError: (error) => openErrorModal(error),
    }
  );

  const onSubmit = (data: AddGuessFormData) => {
    void guessLocation({ id: location.id, ...data });
    reset();
  };

  const handleMapClick = (e: MapMouseEvent) => {
    const lat = e.detail.latLng?.lat;
    const lng = e.detail.latLng?.lng;

    if (!lat || !lng) return;

    setValue('lat', lat);
    setValue('lng', lng);
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.image}>
        <Image src={location.imageUrl} alt={'location'} fill quality={100} />
      </div>
      <Map
        onClick={handleMapClick}
        markers={!!coordinates ? [coordinates] : []}
      />
      <div className={styles.row}>
        <Input
          label={t('location.guess.guessedLocation')}
          defaultValue={guess?.address}
          slotProps={{
            input: { readOnly: true },
          }}
        />
        <Input
          label={t('location.guess.errorDistance')}
          defaultValue={guess?.distanceText}
          slotProps={{
            input: { readOnly: true },
          }}
        />
      </div>
      <Button
        variant="contained"
        type="submit"
        disabled={isLoading || !isDirty}
      >
        {t('location.guess.guess')}
      </Button>
    </form>
  );
};

export default AddGuessForm;
