import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, Modal, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import ChangePasswordForm from '@/components/blocks/forms/change-password-form/change-password-form';
import ChangeProfilePicForm from '@/components/blocks/forms/change-profile-pic-form/change-profile-pic-form';
import ProfileSettingsForm from '@/components/blocks/forms/profile-settings-form/profile-settings-form';
import { useModalStore } from '@/lib/stores/modal-store';
import { ApiError } from '@/lib/types/api-error';
import { ModalStateProps, ModalTypes } from '@/lib/types/modal';
import styles from './profile-settings-modal.module.scss';

enum ProfileSettingsForms {
  PROFILE = 'PROFILE',
  PASSWORD = 'PASSWORD',
  PROFILE_PIC = 'PROFILE_PIC',
}

const ProfileSettingsModal: FC<ModalStateProps> = ({ props }) => {
  const t = useTranslations();
  const [form, setForm] = useState(ProfileSettingsForms.PROFILE);

  const openModal = useModalStore((state) => state.openModal);

  const handleClose = () => {
    props.onClose();
  };

  const openConfirmationModal = () => {
    openModal({
      type: ModalTypes.CONFIRMATION,
      data: {
        title: t('profileSettings.informationChanged'),
        message: t('profileSettings.settingsSaved'),
      },
    });

    handleClose();
  };

  const openErrorModal = (error: AxiosError<ApiError>) => {
    const response = error.response?.data;
    const message = Array.isArray(response?.error)
      ? response?.error[0]
      : response?.error;

    openModal({
      type: ModalTypes.ERROR,
      data: {
        errorCode: response?.statusCode || 500,
        message: message || t('errors.default'),
      },
    });

    handleClose();
  };

  const getForm = () => {
    switch (form) {
      case ProfileSettingsForms.PASSWORD:
        return (
          <ChangePasswordForm
            onCancel={handleClose}
            onSubmit={openConfirmationModal}
          />
        );
      case ProfileSettingsForms.PROFILE_PIC:
        return (
          <ChangeProfilePicForm
            onCancel={handleClose}
            onSubmit={openConfirmationModal}
          />
        );
      default:
        return (
          <ProfileSettingsForm
            onCancel={handleClose}
            onSuccess={openConfirmationModal}
            onError={openErrorModal}
            links={[
              {
                onClick: () => setForm(ProfileSettingsForms.PASSWORD),
                text: t('profileSettings.changePassword'),
              },
              {
                onClick: () => setForm(ProfileSettingsForms.PROFILE_PIC),
                text: t('profileSettings.changeProfilePic'),
              },
            ]}
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
