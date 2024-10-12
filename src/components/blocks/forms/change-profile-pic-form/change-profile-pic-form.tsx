import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Avatar, Button, Typography } from '@mui/material';
import FileUploadInput from '@/components/ui/file-upload-input/file-upload-input';
import styles from './change-profile-pic-form.module.scss';

type ProfileSettingsFormProps = {
  onCancel: () => void;
  onSubmit: () => void;
};

const ChangeProfilePicForm: FC<ProfileSettingsFormProps> = ({
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
        {t('profileSettings.changeYourProfilePic')}
      </Typography>
      <div className={styles.items}>
        <Avatar className={styles.avatar} />
        <FileUploadInput variant="outlined" accept={'image/*'}>
          {t('profileSettings.uploadNewPic')}
        </FileUploadInput>
      </div>
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

export default ChangeProfilePicForm;
