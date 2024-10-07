'use client';
import React, { FC } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { Button, Typography } from '@mui/material';
import Input from '@/components/ui/input/input';
import styles from './sign-up-form.module.scss';
import PasswordInput from '@/components/ui/password-input/password-input';
import Link from 'next/link';
import { Routes } from '@/contants/routes';

type SignUpFormData = {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  repeatPassword: string;
};

const SignUpForm: FC = () => {
  const t = useTranslations('shared');
  const { register } = useForm<SignUpFormData>();

  return (
    <form className={styles.container}>
      <Input
        {...register('email')}
        label={t('email')}
        placeholder={'hey@geotagger.com'}
      />
      <div className={styles.row}>
        <Input
          {...register('firstname')}
          label={t('firstname')}
          placeholder={'John'}
        />
        <Input
          {...register('lastname')}
          label={t('lastname')}
          placeholder={'Doe'}
        />
      </div>
      <PasswordInput {...register('password')} label={t('password')} />
      <PasswordInput
        {...register('repeatPassword')}
        label={t('repeatPassword')}
      />
      <Button variant="contained">{t('signUp')}</Button>
      <div className={styles.alreadyHaveAccount}>
        <Typography variant="body1">{t('alreadyHaveAccount')}</Typography>
        <Link href={Routes.signIn}>{t('signIn')}</Link>
      </div>
    </form>
  );
};

export default SignUpForm;
