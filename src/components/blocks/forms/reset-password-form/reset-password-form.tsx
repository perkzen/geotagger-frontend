'use client';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next-nprogress-bar';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mui/material';
import PasswordInput from '@/components/ui/password-input/password-input';
import { useResetPassword } from '@/lib/api/auth/hooks';
import { Routes } from '@/lib/constants/routes';
import {
  ResetPasswordData,
  ResetPasswordValidator,
} from '@/lib/validators/reset-password';
import styles from './reset-password-form.module.scss';

type ResetPasswordFormProps = {
  token: string;
};

const ResetPasswordForm: FC<ResetPasswordFormProps> = ({ token }) => {
  const t = useTranslations('shared');
  const { push } = useRouter();

  const { mutateAsync: resetPassword } = useResetPassword({
    onSuccess: () => {
      push(Routes.SIGN_IN);
    },
  });

  const { register, handleSubmit, formState } = useForm<ResetPasswordData>({
    resolver: zodResolver(ResetPasswordValidator),
  });

  const { errors } = formState;

  const onSubmit = (data: ResetPasswordData) => {
    void resetPassword({ token, password: data.newPassword });
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <PasswordInput
        {...register('newPassword')}
        label={t('newPassword')}
        error={!!errors.newPassword}
        helperText={errors.newPassword?.message}
      />
      <PasswordInput
        {...register('repeatPassword')}
        label={t('repeatNewPassword')}
        error={!!errors.repeatPassword}
        helperText={errors.repeatPassword?.message}
      />
      <Button type="submit" variant="contained">
        {t('resetPassword')}
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
