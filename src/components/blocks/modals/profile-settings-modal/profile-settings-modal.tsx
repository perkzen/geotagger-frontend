import { FC, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, Modal, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import ChangePasswordForm from '@/components/blocks/forms/change-password-form/change-password-form';
import ChangeProfilePicForm from '@/components/blocks/forms/change-profile-pic-form/change-profile-pic-form';
import ProfileSettingsForm from '@/components/blocks/forms/profile-settings-form/profile-settings-form';
import { useConfirmationModal } from '@/lib/hooks/use-confirmation-modal';
import { useErrorModal } from '@/lib/hooks/use-error-modal';
import { useUsersAuthProvider } from '@/lib/hooks/user';
import { ApiError } from '@/lib/types/api-error';
import { ModalStateProps } from '@/lib/types/modal';
import styles from './profile-settings-modal.module.scss';

enum ProfileSettingsForms {
  PROFILE = 'PROFILE',
  PASSWORD = 'PASSWORD',
  PROFILE_PIC = 'PROFILE_PIC',
}

const ProfileSettingsModal: FC<ModalStateProps> = ({ props }) => {
  const t = useTranslations();
  const [form, setForm] = useState(ProfileSettingsForms.PROFILE);

  const openErrorModal = useErrorModal();
  const openConfirmationModal = useConfirmationModal();

  const authProvider = useUsersAuthProvider();
  const isLocalProvider = authProvider === 'local';

  const handleClose = () => {
    props.onClose();
  };

  const handleSuccess = () => {
    openConfirmationModal(
      {
        title: t('profileSettings.informationChanged'),
        message: t('profileSettings.settingsSaved'),
      },
      handleClose
    );
  };

  const handleError = (error: AxiosError<ApiError>) => {
    openErrorModal(error, handleClose);
  };

  const links = useMemo(() => {
    const links = [];

    if (isLocalProvider) {
      links.push({
        onClick: () => setForm(ProfileSettingsForms.PASSWORD),
        text: t('profileSettings.changePassword'),
      });
    }

    links.push({
      onClick: () => setForm(ProfileSettingsForms.PROFILE_PIC),
      text: t('profileSettings.changeProfilePic'),
    });

    return links;
  }, [isLocalProvider, t]);

  const getForm = () => {
    switch (form) {
      case ProfileSettingsForms.PASSWORD:
        return (
          <ChangePasswordForm
            onCancel={handleClose}
            onSuccess={handleSuccess}
            onError={handleError}
          />
        );
      case ProfileSettingsForms.PROFILE_PIC:
        return (
          <ChangeProfilePicForm
            onCancel={handleClose}
            onSubmit={handleSuccess}
          />
        );
      default:
        return (
          <ProfileSettingsForm
            onCancel={handleClose}
            onSuccess={handleSuccess}
            onError={handleError}
            links={links}
          />
        );
    }
  };

  return (
    <Modal {...props}>
      <Card className={styles.container}>
        <Typography className={styles.title} variant="h5">
          {t('profileSettings.profile')}{' '}
          <span>{t('profileSettings.settings')}.</span>
        </Typography>
        {getForm()}
      </Card>
    </Modal>
  );
};

export default ProfileSettingsModal;
