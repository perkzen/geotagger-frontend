import { useTranslations } from 'next-intl';
import { Typography } from '@mui/material';
import EmptyUploadsList from '@/components/blocks/uploads-list/empty-uploads-list/empty-uploads-list';
import styles from './uploads-list.module.scss';

const UploadsList = () => {
  const t = useTranslations('profile');

  return (
    <div className={styles.container}>
      <Typography variant="h5">{t('myUploads')}</Typography>
      <EmptyUploadsList />
    </div>
  );
};

export default UploadsList;
