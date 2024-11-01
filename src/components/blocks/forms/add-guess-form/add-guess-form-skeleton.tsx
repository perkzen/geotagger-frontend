import { useTranslations } from 'next-intl';
import { Button, Skeleton } from '@mui/material';
import Input from '@/components/ui/input/input';
import Map from '@/components/ui/map/map';
import styles from './add-guess-form.module.scss';

const AddGuessFormSkeleton = () => {
  const t = useTranslations();

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Skeleton variant="rectangular" width={'100%'} height={324} />
      </div>
      <Map />
      <div className={styles.row}>
        <Input label={t('location.guess.guessedLocation')} />
        <Input label={t('location.guess.errorDistance')} />
      </div>
      <Button variant="contained" type="submit" disabled>
        {t('location.guess.guess')}
      </Button>
    </div>
  );
};

export default AddGuessFormSkeleton;
