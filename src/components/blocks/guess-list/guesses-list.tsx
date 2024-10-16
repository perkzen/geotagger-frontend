import { useTranslations } from 'next-intl';
import { Typography } from '@mui/material';
import EmptyGuessesList from '@/components/blocks/guess-list/empty-guesses-list/empty-guesses-list';
import styles from './guesses-list.module.scss';

const GuessesList = () => {
  const t = useTranslations('profile');

  return (
    <div className={styles.container}>
      <Typography variant="h5">{t('myBestGuesses')}</Typography>
      <EmptyGuessesList />
    </div>
  );
};

export default GuessesList;
