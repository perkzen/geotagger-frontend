import { useTranslations } from 'next-intl';
import { Typography } from '@mui/material';
import styles from './new-locations-list.module.scss';

const NewLocationsList = () => {
  const t = useTranslations();

  return (
    <div>
      <div className={styles.title}>
        <Typography variant="h4" color="primary">
          {t('home.newLocations')}
        </Typography>
        <Typography variant="body1">
          {t('home.newLocationsDescription')}
        </Typography>
      </div>
    </div>
  );
};

export default NewLocationsList;
