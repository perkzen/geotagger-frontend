import NewLocationsList from '@/components/blocks/lists/new-locations-list/new-locations-list';
import PersonalBestGuessesList from '@/components/blocks/lists/personal-best-guesses-list/personal-best-guesses-list';
import styles from './logged-in-home-page.module.scss';

export default function LoggedInHomePage() {
  return (
    <div className={styles.container}>
      <PersonalBestGuessesList />
      <NewLocationsList />
    </div>
  );
}
