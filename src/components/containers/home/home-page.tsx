import { useTranslations } from 'next-intl';
import { Button, Typography } from '@mui/material';
import HeroSection from '@/components/blocks/hero-section/hero-section';
import GuessCard from '@/components/blocks/guess-card/guess-card';
import { Routes } from '@/lib/constants/routes';
import styles from './home-page.module.scss';

export default function HomePage() {
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
          <GuessCard isLocked />
          <GuessCard isLocked />
          <GuessCard isLocked />
        </div>
        <Button variant="contained" href={Routes.SIGN_UP}>
          {t('shared.signUp')}
        </Button>
      </div>
    </div>
  );
}
