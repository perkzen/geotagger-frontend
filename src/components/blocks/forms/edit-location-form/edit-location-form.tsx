'use client';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Typography } from '@mui/material';
import { useSuspenseQuery } from '@tanstack/react-query';
import FileUploadInput from '@/components/ui/file-upload-input/file-upload-input';
import {
  locationQueryOptions,
  MY_LOCATIONS_KEY,
  useUpdateLocation,
} from '@/lib/api/locations/hooks';
import { Routes } from '@/lib/constants/routes';
import { getQueryClient } from '@/lib/utils/get-query-client';
import {
  EditLocationFormData,
  EditLocationValidator,
} from '@/lib/validators/edit-auction';
import styles from './edit-location-form.module.scss';

type EditLocationFormProps = {
  id: string;
};

const EditLocationForm: FC<EditLocationFormProps> = ({ id }) => {
  const t = useTranslations();
  const queryClient = getQueryClient();
  const { push } = useRouter();

  const { data: location } = useSuspenseQuery(locationQueryOptions(id));
  const { mutateAsync: updateLocation, isPending: isUpdating } =
    useUpdateLocation({
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: [MY_LOCATIONS_KEY] });
        push(Routes.PROFILE);
      },
    });

  const { register, handleSubmit, formState, watch } =
    useForm<EditLocationFormData>({
      resolver: zodResolver(EditLocationValidator),
    });

  const { errors, dirtyFields } = formState;

  const selectedFile = watch('fileList')?.item(0);
  const imgSrc = selectedFile
    ? URL.createObjectURL(selectedFile)
    : location.imageUrl;

  const onSubmit = (data: EditLocationFormData) => {
    void updateLocation({
      ...location,
      fileList: data.fileList,
    });
  };

  return (
    <form
      id="edit-location-form"
      className={styles.container}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={styles.imageContainer}>
        <div className={styles.image}>
          <Image src={imgSrc} alt={'location'} fill quality={100} />
        </div>
        {!!errors.fileList && (
          <Typography variant="caption" color="error">
            {errors.fileList.message}
          </Typography>
        )}
        <Typography variant="body1">{location.address}</Typography>
      </div>
      <div className={styles.row}>
        <FileUploadInput
          {...register('fileList')}
          className={styles.button}
          variant="outlined"
          accept="image/png,image/jpg"
        >
          {t('shared.uploadImage')}
        </FileUploadInput>
        <div className={styles.group}>
          <Button
            variant="contained"
            type="submit"
            disabled={!dirtyFields.fileList || isUpdating}
          >
            {t('shared.save')}
          </Button>
          <Link href={Routes.PROFILE}>{t('shared.cancel')}</Link>
        </div>
      </div>
    </form>
  );
};

export default EditLocationForm;
