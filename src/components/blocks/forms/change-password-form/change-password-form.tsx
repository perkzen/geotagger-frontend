import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import PasswordInput from '@/components/ui/password-input/password-input';
import { useChangePassword } from '@/lib/api/auth/hooks';
import { ApiError } from '@/lib/types/api-error';
import {
  ChangePasswordFormData,
  ChangePasswordValidator,
} from '@/lib/validators/change-password';
import styles from './change-password-form.module.scss';

type ProfileSettingsFormProps = {
  onCancel: () => void;
  onSuccess: () => void;
  onError: (error: AxiosError<ApiError>) => void;
};

const defaultValues: ChangePasswordFormData = {
  currentPassword: '',
  newPassword: '',
  repeatPassword: '',
};

const ChangePasswordForm: FC<ProfileSettingsFormProps> = ({
  onCancel,
  onSuccess,
  onError,
}) => {
  const t = useTranslations();

  const { mutateAsync: changePassword, isPending: isUpdating } =
    useChangePassword({
      onSuccess,
      onError,
    });

  const { handleSubmit, formState, register } = useForm<ChangePasswordFormData>(
    {
      defaultValues,
      resolver: zodResolver(ChangePasswordValidator),
    }
  );

  const { errors, isDirty } = formState;

  const onFormSubmit = (data: ChangePasswordFormData) => {
    void changePassword(data);
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
      <PasswordInput
        {...register('currentPassword')}
        label={t('profileSettings.currentPassword')}
        error={!!errors.currentPassword}
        helperText={errors.currentPassword?.message}
      />
      <PasswordInput
        {...register('newPassword')}
        label={t('profileSettings.newPassword')}
        error={!!errors.newPassword}
        helperText={errors.newPassword?.message}
      />
      <PasswordInput
        {...register('repeatPassword')}
        label={t('profileSettings.repeatNewPassword')}
        error={!!errors.repeatPassword}
        helperText={errors.repeatPassword?.message}
      />
      <div className={styles.actions}>
        <Button onClick={onCancel} variant="text" color="primary">
          {t('shared.cancel')}
        </Button>
        <Button
          variant="contained"
          form="change-password-form"
          type="submit"
          disabled={!isDirty || isUpdating}
        >
          {t('shared.submit')}
        </Button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
