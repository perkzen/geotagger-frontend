'use client';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Button, Typography } from '@mui/material';
import { Routes } from '@/lib/constants/routes';
import styles from './empty-guesses-list.module.scss';

const EmptyGuessesList = () => {
  const t = useTranslations('profile');
  const { push } = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <Typography variant="body1">{t('noBestGuesses')}</Typography>
        <Typography variant="caption">{t('guessInfo')}</Typography>
      </div>
      <Button variant="contained" onClick={() => push(Routes.HOME)}>
        {t('goToLocations')}
      </Button>
    </div>
  );
};

export default EmptyGuessesList;
