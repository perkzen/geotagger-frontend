import { useTranslations } from 'next-intl';
import { Typography } from '@mui/material';
import AddLocationForm from '@/components/blocks/forms/add-location-form/add-location-form';
import styles from './add-location-page.module.scss';

export default function AddLocationPage() {
  const t = useTranslations();

  return (
    <div className={styles.container}>
      <Typography variant="h4" className={styles.title}>
        {t.rich('location.add.title', {
          span: (chunks) => <span>{chunks}</span>,
        })}
        .
      </Typography>
      <AddLocationForm key={'id'} />
    </div>
  );
}
