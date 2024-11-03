'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mui/material';
import Input from '@/components/ui/input/input';
import { useForgotPassword } from '@/lib/api/auth/hooks';
import { Routes } from '@/lib/constants/routes';
import {
  ForgotPasswordData,
  ForgotPasswordValidator,
} from '@/lib/validators/forgot-password';
import styles from './forgot-password-form.module.scss';

const ForgotPasswordForm = () => {
  const t = useTranslations('shared');

  const { mutateAsync: sendEmail, isPending } = useForgotPassword();

  const { register, formState, handleSubmit, reset } =
    useForm<ForgotPasswordData>({
      resolver: zodResolver(ForgotPasswordValidator),
    });

  const { errors } = formState;

  const onSubmit = (data: ForgotPasswordData) => {
    void sendEmail(data);
    reset();
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register('email')}
        label={t('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
        autoComplete={'email'}
      />
      <div className={styles.row}>
        <Link href={Routes.SIGN_IN}>{t('backToSignIn')}</Link>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isPending}
        >
          {t('send')}
        </Button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
