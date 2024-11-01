import React from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button, Skeleton} from '@mui/material';
import styles from '@/components/blocks/forms/edit-location-form/edit-location-form.module.scss';
import FileUploadInput from '@/components/ui/file-upload-input/file-upload-input';
import { Routes } from '@/lib/constants/routes';

const EditLocationFormSkeleton = () => {
  const t = useTranslations();

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Skeleton variant="rectangular" className={styles.image} />
        <Skeleton variant="text" height={20} width={350} />
      </div>
      <div className={styles.row}>
        <FileUploadInput
          className={styles.button}
          variant="outlined"
          accept="image/png,image/jpg"
        >
          {t('shared.uploadImage')}
        </FileUploadInput>
        <div className={styles.group}>
          <Button variant="contained" type="submit" disabled>
            {t('shared.save')}
          </Button>
          <Link href={Routes.PROFILE}>{t('shared.cancel')}</Link>
        </div>
      </div>
    </div>
  );
};

export default EditLocationFormSkeleton;
