'use client';
import { useTranslations } from 'next-intl';
import { Typography } from '@mui/material';
import {  useSuspenseQuery } from '@tanstack/react-query';
import AddGuessForm from '@/components/blocks/forms/add-guess-form/add-guess-form';
import Leaderboard from '@/components/blocks/leaderboard/leaderboard';
import { locationQueryOptions } from '@/lib/api/locations/hooks';
import styles from './location-page.module.scss';

type LocationPageProps = {
  id: string;
};

export default function LocationPage({ id }: LocationPageProps) {
  const t = useTranslations();
  const { data: location } = useSuspenseQuery(locationQueryOptions(id));

  const { guesses } = location;

  return (
    <div className={styles.container}>
      <div className={styles.guess}>
        <Typography variant="h4" className={styles.title}>
          {t.rich('location.guess.title', {
            span: (chunks) => <span>{chunks}</span>,
          })}
          !
        </Typography>
        <AddGuessForm location={location} />
      </div>
      <Leaderboard items={guesses} />
    </div>
  );
}
