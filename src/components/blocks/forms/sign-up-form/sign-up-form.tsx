'use client';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Typography } from '@mui/material';
import Input from '@/components/ui/input/input';
import PasswordInput from '@/components/ui/password-input/password-input';
import { useSignUp } from '@/lib/api/auth/hooks';
import { Routes } from '@/lib/constants/routes';
import { useError } from '@/lib/hooks/use-error';
import { SignUpFormData, SignUpValidator } from '@/lib/validators/sign-up';
import styles from './sign-up-form.module.scss';
import { useSessionStore } from '@/lib/stores/session-store';

const SignUpForm: FC = () => {
  const t = useTranslations('shared');
  const { push } = useRouter();
  const { getError } = useError();

  const { setSession } = useSessionStore();

  const {
    mutateAsync: signUp,
    error: signUpError,
    isPending,
  } = useSignUp({
    onSuccess: (data) => {
      setSession(data);
      push(Routes.HOME);
    },
  });

  const { register, handleSubmit, formState } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpValidator),
  });

  const { errors } = formState;

  const onSubmit = (data: SignUpFormData) => {
    void signUp(data);
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      {signUpError && (
        <Typography className={styles.error} color="error">
          {getError(signUpError)}
        </Typography>
      )}
      <Input
        {...register('email')}
        label={t('email')}
        placeholder={'hey@geotagger.com'}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <div className={styles.row}>
        <Input
          {...register('firstname')}
          label={t('firstname')}
          placeholder={'John'}
          error={!!errors.firstname}
          helperText={errors.firstname?.message}
        />
        <Input
          {...register('lastname')}
          label={t('lastname')}
          placeholder={'Doe'}
          error={!!errors.lastname}
          helperText={errors.lastname?.message}
        />
      </div>
      <PasswordInput
        {...register('password')}
        label={t('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <PasswordInput
        {...register('repeatPassword')}
        label={t('repeatPassword')}
        error={!!errors.repeatPassword}
        helperText={errors.repeatPassword?.message}
      />
      <Button variant="contained" type="submit" disabled={isPending}>
        {t('signUp')}
      </Button>
      <div className={styles.alreadyHaveAccount}>
        <Typography variant="body1">{t('alreadyHaveAccount')}</Typography>
        <Link href={Routes.SIGN_IN}>{t('signIn')}</Link>
      </div>
    </form>
  );
};

export default SignUpForm;
