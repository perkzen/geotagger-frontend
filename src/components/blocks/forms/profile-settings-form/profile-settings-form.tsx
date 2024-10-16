import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import Input from '@/components/ui/input/input';
import {
  GET_PROFILE_KEY,
  useProfile,
  useUpdateProfile,
} from '@/lib/api/profile/hooks';
import { ApiError } from '@/lib/types/api-error';
import { getQueryClient } from '@/lib/utils/get-query-client';
import {
  ProfileSettingsFormData,
  ProfileSettingsValidator,
} from '@/lib/validators/profile-settings';
import styles from './profile-settings-form.module.scss';

type ProfileSettingsFormProps = {
  onCancel: () => void;
  onSuccess: () => void;
  onError: (error: AxiosError<ApiError>) => void;
  links?: { onClick: () => void; text: string }[];
};

const ProfileSettingsForm: FC<ProfileSettingsFormProps> = ({
  onCancel,
  onSuccess,
  onError,
  links = [],
}) => {
  const t = useTranslations();
  const queryClient = getQueryClient();

  const { data: profile } = useProfile();
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile({
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [GET_PROFILE_KEY] });
      onSuccess();
    },
    onError,
  });

  const { handleSubmit, register, formState } =
    useForm<ProfileSettingsFormData>({
      defaultValues: {
        email: profile?.email,
        firstname: profile?.firstname,
        lastname: profile?.lastname,
      },
      resolver: zodResolver(ProfileSettingsValidator),
    });

  const { errors, isDirty } = formState;

  const onFormSubmit = (data: ProfileSettingsFormData) => {
    void updateProfile(data);
  };

  return (
    <form
      id="profile-settings-form"
      className={styles.container}
      onSubmit={handleSubmit(onFormSubmit)}
    >
      <Typography variant="body1">
        {t('profileSettings.changeYourInfo')}
      </Typography>
      <Input
        {...register('email')}
        label={t('shared.email')}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <div className={styles.row}>
        <Input
          {...register('firstname')}
          label={t('shared.firstname')}
          error={!!errors.firstname}
          helperText={errors.firstname?.message}
        />
        <Input
          {...register('lastname')}
          label={t('shared.lastname')}
          error={!!errors.lastname}
          helperText={errors.lastname?.message}
        />
      </div>
      <div className={styles.links}>
        {links.map((link, index) => (
          <Button key={index} variant="text" onClick={link.onClick}>
            {link.text}
          </Button>
        ))}
      </div>
      <div className={styles.actions}>
        <Button onClick={onCancel} variant="text" color="primary">
          {t('shared.cancel')}
        </Button>
        <Button
          variant="contained"
          form="profile-settings-form"
          type="submit"
          disabled={!isDirty || isUpdating}
        >
          {t('shared.submit')}
        </Button>
      </div>
    </form>
  );
};

export default ProfileSettingsForm;
