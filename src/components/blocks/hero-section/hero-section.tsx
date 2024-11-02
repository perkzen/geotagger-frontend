import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Button, Typography } from '@mui/material';
import WorldMapBackground from 'public/images/background-world-map.svg';
import { Routes } from '@/lib/constants/routes';
import styles from './hero-section.module.scss';

const HeroSection = () => {
  const t = useTranslations();

  return (
    <div className={styles.container}>
      <div className={styles.headline}>
        <Typography variant="h1" color="primary">
          {t('home.title')}
        </Typography>
        <Typography variant="body1">{t('home.description')}</Typography>
        <Button className={styles.button} variant="contained" href={Routes.SIGN_UP}>
          {t('shared.signUp')}
        </Button>
      </div>
      <Image
        className={styles.image}
        src={WorldMapBackground}
        alt={'world-map'}
        quality={100}
      />
    </div>
  );
};

export default HeroSection;
