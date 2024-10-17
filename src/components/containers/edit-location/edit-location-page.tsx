import { Suspense } from 'react';
import { useTranslations } from 'next-intl';
import { Typography } from '@mui/material';
import EditLocationForm from '@/components/blocks/forms/edit-location-form/edit-location-form';
import styles from './edit-location-page.module.scss';

type EditLocationPageProps = {
  id: string;
};

export default function EditLocationPage({ id }: EditLocationPageProps) {
  const t = useTranslations();

  return (
    <div className={styles.container}>
      <Typography variant="h4" className={styles.title}>
        {t.rich('location.edit.title', {
          span: (chunks) => <span>{chunks}</span>,
        })}
        .
      </Typography>

      <Suspense fallback={'loading...'}>
        <EditLocationForm id={id} />
      </Suspense>
    </div>
  );
}
