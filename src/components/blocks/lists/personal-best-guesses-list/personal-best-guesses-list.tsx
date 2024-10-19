import { useTranslations } from 'next-intl';
import { Typography } from '@mui/material';
import styles from './personal-best-guesses-list.module.scss';

const PersonalBestGuessesList = () => {
  const t = useTranslations();

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Typography variant="h4" color="primary">
          {t('home.personalBestGuesses')}
        </Typography>
        <Typography variant="body1">
          {t('home.bestGuessesDescription')}
        </Typography>
      </div>
    </div>
  );
};

export default PersonalBestGuessesList;
