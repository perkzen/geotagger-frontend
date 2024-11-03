'use client';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Typography } from '@mui/material';
import FacebookIcon from '@/components/ui/icons/facebook-icon';
import GoogleIcon from '@/components/ui/icons/google-icon';
import Input from '@/components/ui/input/input';
import PasswordInput from '@/components/ui/password-input/password-input';
import { signInWithFacebook, signInWithGoogle } from '@/lib/api/auth';
import { useSignIn } from '@/lib/api/auth/hooks';
import { Routes } from '@/lib/constants/routes';
import { useError } from '@/lib/hooks/use-error';
import { useSessionStore } from '@/lib/stores/session-store';
import { SignInFormData, SignInValidator } from '@/lib/validators/sign-in';
import styles from './sign-in-form.module.scss';

const SignInForm: FC = () => {
  const t = useTranslations('shared');
  const { push } = useRouter();
  const { getError } = useError();

  const { setSession } = useSessionStore();

  const {
    mutateAsync: signIn,
    error: signInError,
    isPending,
  } = useSignIn({
    onSuccess: async (data) => {
      setSession(data);
      push(Routes.HOME);
    },
  });

  const { register, handleSubmit, formState } = useForm<SignInFormData>({
    resolver: zodResolver(SignInValidator),
  });

  const { errors } = formState;

  const onSubmit = (data: SignInFormData) => {
    void signIn(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      {signInError && (
        <Typography className={styles.error} color="error">
          {getError(signInError)}
        </Typography>
      )}
      <Input
        {...register('email')}
        label={t('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
        autoComplete={'email'}
      />
      <PasswordInput
        {...register('password')}
        label={t('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
        autoComplete={'password'}
      />

      <Button variant="contained" type="submit" disabled={isPending}>
        {t('signIn')}
      </Button>

      <Button
        className={styles.google}
        startIcon={<GoogleIcon />}
        type="button"
        onClick={signInWithGoogle}
      >
        {t('signInWithGoogle')}
      </Button>

      <Button
        className={styles.facebook}
        startIcon={<FacebookIcon />}
        type="button"
        onClick={signInWithFacebook}
      >
        {t('signInWithFacebook')}
      </Button>

      <div className={styles.links}>
        <div className={styles.alreadyHaveAccount}>
          <Typography variant="body1">{t('createAccount')}</Typography>
          <Link href={Routes.SIGN_UP}>{t('signUp')}</Link>
        </div>
        <Link href={Routes.FORGOT_PASSWORD}>{t('forgotPassword')}?</Link>
      </div>
    </form>
  );
};

export default SignInForm;
