import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@mui/material';
import { useProfileSettingsModal } from '@/lib/hooks/use-profile-settings-modal';
import styles from './admin-menu.module.scss';

type AdminMenuProps = {
  handleSignOut: () => void;
};

const AdminMenu: FC<AdminMenuProps> = ({ handleSignOut }) => {
  const t = useTranslations('shared');
  const handleOpenProfileSettings = useProfileSettingsModal();

  return (
    <div className={styles.container}>
      <Button onClick={handleOpenProfileSettings}>
        {t('profileSettings')}
      </Button>
      <Button onClick={handleSignOut}>{t('logout')}</Button>
    </div>
  );
};

export default AdminMenu;
