import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Button, Typography } from '@mui/material';
import PasswordInput from '@/components/ui/password-input/password-input';
import styles from './change-password-form.module.scss';

type ProfileSettingsFormProps = {
  onCancel: () => void;
  onSubmit: () => void;
};

const ChangePasswordForm: FC<ProfileSettingsFormProps> = ({
  onCancel,
  onSubmit,
}) => {
  const t = useTranslations();

  const { handleSubmit } = useForm();

  const onFormSubmit = () => {
    onSubmit();
  };

  return (
    <form
      id="change-password-form"
      className={styles.container}
      onSubmit={handleSubmit(onFormSubmit)}
    >
      <Typography variant="body1">
        {t('profileSettings.changeYourPassword')}
      </Typography>
      <PasswordInput label={t('profileSettings.currentPassword')} />
      <PasswordInput label={t('profileSettings.newPassword')} />
      <PasswordInput label={t('profileSettings.repeatNewPassword')} />
      <div className={styles.actions}>
        <Button onClick={onCancel} variant="text" color="primary">
          {t('shared.cancel')}
        </Button>
        <Button variant="contained" form="profile-settings-form" type="submit">
          {t('shared.submit')}
        </Button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
