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
} from '@/lib/api/locations/hooks';
import { LocationsList } from '@/lib/api/locations/models';
import { useCreateUploadUrl, useUploadFile } from '@/lib/api/media/hooks';
import { Routes } from '@/lib/constants/routes';
import { useErrorModal } from '@/lib/hooks/use-error-modal';
import { createApiError } from '@/lib/types/api-error';
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
  const openErrorModal = useErrorModal();
  const queryClient = getQueryClient();
  const { push } = useRouter();

  const { register, handleSubmit, formState, watch } =
    useForm<EditLocationFormData>({
      resolver: zodResolver(EditLocationValidator),
    });

  const { errors, dirtyFields } = formState;

  const { data: location } = useSuspenseQuery(locationQueryOptions(id));

  const { mutateAsync: uploadFile, isPending: isUpdating } = useUploadFile({
    onSuccess: () => {
      // wait for the image to be uploaded S3 and processed by the backend
      setTimeout(() => {
        void queryClient.invalidateQueries({ queryKey: [MY_LOCATIONS_KEY] });
      }, 2000);
      push(Routes.PROFILE);
    },
    onError: (error, variables, context) => {
      const apiError = createApiError(error, {
        statusCode: 400,
        error: 'Failed to update location',
        code: 'UPDATE_FAILED',
      });

      openErrorModal(apiError);

      queryClient.setQueryData(
        [MY_LOCATIONS_KEY],
        (context as { previousLocations: LocationsList }).previousLocations
      );
    },
  });

  const { mutateAsync: createUploadUrl } = useCreateUploadUrl();

  const selectedFile = watch('fileList')?.item(0);
  const imgSrc = selectedFile
    ? URL.createObjectURL(selectedFile)
    : location.imageUrl;

  const onSubmit = async (data: EditLocationFormData) => {
    const mimeType = data.fileList[0].type;
    const originalFilename = data.fileList[0].name;

    const url = await createUploadUrl({
      bucketPath: 'locations/images',
      mimeType,
      originalFilename,
      ownerId: location.id,
    });

    void uploadFile({ url, file: data.fileList[0] });
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
