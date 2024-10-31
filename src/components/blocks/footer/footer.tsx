'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Typography, useMediaQuery, useTheme } from '@mui/material';
import Logo from 'public/images/footer-logo.svg';
import MobileLogo from 'public/images/mobile-footer-logo.svg';
import styles from './footer.module.scss';

const Footer = () => {
  const t = useTranslations('footer');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <footer className={styles.container}>
      <Image src={isMobile ? MobileLogo : Logo} height={30} alt={'logo'} />
      <Typography variant={isMobile ? 'caption' : 'body1'} color="contrast">
        {t('allRightsReserved')}
      </Typography>
    </footer>
  );
};

export default Footer;
