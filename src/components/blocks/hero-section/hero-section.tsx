import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button, Typography } from '@mui/material';
import WorldMapBackground from 'public/images/background-world-map.svg';
import styles from './hero-section.module.scss';

const HeroSection = () => {
  const t = useTranslations();

  return (
    <div className={styles.container}>
      <div className={styles.headline}>
        <Typography variant={'h1'}>{t('home.title')}</Typography>
        <Typography variant="body1">{t('home.description')}</Typography>
        <Button variant="contained">{t('shared.signUp')}</Button>
      </div>
      <Image
        className={styles.image}
        src={WorldMapBackground}
        alt={'world-map'}
        objectFit={'contain'}
        quality={100}
      />
    </div>
  );
};

export default HeroSection;
