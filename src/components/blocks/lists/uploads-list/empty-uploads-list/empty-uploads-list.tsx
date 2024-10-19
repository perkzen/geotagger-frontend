'use client';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Button, Typography } from '@mui/material';
import { Routes } from '@/lib/constants/routes';
import styles from './empty-uploads-list.module.scss';

const EmptyUploadsList = () => {
  const t = useTranslations('profile');
  const { push } = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <Typography variant="body1">{t('noUploads')}</Typography>
        <Typography variant="caption">{t('uploadInfo')}</Typography>
      </div>
      <Button variant="contained" onClick={() => push(Routes.ADD_LOCATION)}>
        {t('addLocation')}
      </Button>
    </div>
  );
};

export default EmptyUploadsList;
