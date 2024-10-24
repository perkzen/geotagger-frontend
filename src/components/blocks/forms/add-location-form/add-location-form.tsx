'use client';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Typography } from '@mui/material';
import { MapMouseEvent } from '@vis.gl/react-google-maps';
import PlaceholderImage from 'public/images/placeholder-image.svg';
import FileUploadInput from '@/components/ui/file-upload-input/file-upload-input';
import Input from '@/components/ui/input/input';
import Map from '@/components/ui/map/map';
import { useAddLocation, useGeocode } from '@/lib/api/locations/hooks';
import { Routes } from '@/lib/constants/routes';
import { Coordinates } from '@/lib/types/coordinates';
import {
  AddLocationFormData,
  AddLocationValidator,
} from '@/lib/validators/add-location';
import styles from './add-location-form.module.scss';

const AddLocationForm: FC = () => {
  const t = useTranslations();
  const { push } = useRouter();

  const { register, handleSubmit, setValue, formState, watch } =
    useForm<AddLocationFormData>({
      resolver: zodResolver(AddLocationValidator),
    });

  const { errors } = formState;

  const [lat, lng] = watch(['lat', 'lng']);

  const coordinates: Coordinates | undefined =
    lat && lng ? { lat, lng } : undefined;

  const { mutateAsync: fetchAddress } = useGeocode({
    onSuccess: (data) => setValue('address', data.address),
  });

  const { mutateAsync: addLocation, isPending: isUploading } = useAddLocation({
    onSuccess: () => push(Routes.PROFILE),
  });

  const selectedFile = watch('fileList')?.item(0);
  const imgSrc = selectedFile
    ? URL.createObjectURL(selectedFile)
    : PlaceholderImage;

  const onSubmit = (data: AddLocationFormData) => {
    void addLocation(data);
  };

  const handleMapClick = (e: MapMouseEvent) => {
    const lat = e.detail.latLng?.lat;
    const lng = e.detail.latLng?.lng;

    if (!lat || !lng) return;

    setValue('lat', lat);
    setValue('lng', lng);
    void fetchAddress({ lat, lng });
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.imageContainer}>
        <div className={styles.image}>
          <Image src={imgSrc} alt={'location'} fill quality={100} />
        </div>
        {!!errors.fileList && (
          <Typography variant="caption" color="error" id="my-helper-text">
            {errors.fileList.message}
          </Typography>
        )}
      </div>
      <FileUploadInput
        {...register('fileList')}
        className={styles.button}
        variant="outlined"
        accept="image/png,image/jpg"
      >
        {t('shared.uploadImage')}
      </FileUploadInput>
      <Map
        onClick={handleMapClick}
        markers={!!coordinates ? [coordinates] : []}
      />
      <Input
        {...register('address')}
        label={t('location.add.location')}
        error={!!errors.address}
        helperText={errors.address?.message}
      />
      <Button
        className={styles.button}
        variant="contained"
        type="submit"
        disabled={isUploading}
      >
        {t('location.add.addNew')}
      </Button>
    </form>
  );
};

export default AddLocationForm;
