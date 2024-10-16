'use client';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Button, Typography } from '@mui/material';
import { Routes } from '@/lib/constants/routes';
import styles from './no-uploads-info.module.scss';

const NoUploadsInfo = () => {
  const t = useTranslations('profile');
  const { push } = useRouter();

  return (
    <div className={styles.container}>
      <Typography variant="h5">{t('myUploads')}</Typography>
      <div className={styles.content}>
        <div className={styles.text}>
          <Typography variant="body1">{t('noUploads')}</Typography>
          <Typography variant="caption">{t('uploadInfo')}</Typography>
        </div>
        <Button variant="contained" onClick={() => push(Routes.ADD_LOCATION)}>
          {t('addLocation')}
        </Button>
      </div>
    </div>
  );
};

export default NoUploadsInfo;
