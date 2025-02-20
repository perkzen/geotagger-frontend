import { useTranslations } from 'next-intl';
import { Button, Typography } from '@mui/material';
import GuessCard from '@/components/blocks/cards/guess-card/guess-card';
import HeroSection from '@/components/blocks/hero-section/hero-section';
import { Routes } from '@/lib/constants/routes';
import styles from './logged-out-home-page.module.scss';

export default function LoggedOutHomePage() {
  const t = useTranslations();

  return (
    <div className={styles.container}>
      <HeroSection />
      <div className={styles.tryYourselfContainer}>
        <div className={styles.tryYourself}>
          <Typography variant="h4" color="primary">
            {t('home.subtitle')}
          </Typography>
          <div className={styles.infoContainer}>
            <Typography variant="body1">{t('home.info')}</Typography>
          </div>
        </div>
        <div className={styles.cards}>
          <GuessCard isLocked={true} />
          <GuessCard isLocked={true} />
          <GuessCard isLocked={true} />
        </div>
        <Button className={styles.button} variant="contained" href={Routes.SIGN_UP}>
          {t('shared.signUp')}
        </Button>
      </div>
    </div>
  );
}
