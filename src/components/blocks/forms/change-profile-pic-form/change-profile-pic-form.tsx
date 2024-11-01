import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import Avatar from '@/components/ui/avatar/avatar';
import FileUploadInput from '@/components/ui/file-upload-input/file-upload-input';
import {
  GET_PROFILE_KEY,
  useProfile,
  useUpdateProfilePicture,
} from '@/lib/api/profile/hooks';
import { ApiError } from '@/lib/types/api-error';
import { getQueryClient } from '@/lib/utils/get-query-client';
import {
  ProfilePictureFormData,
  ProfilePictureValidator,
} from '@/lib/validators/profile-pciture';
import styles from './change-profile-pic-form.module.scss';

type ProfileSettingsFormProps = {
  onCancel: () => void;
  onSuccess: () => void;
  onError: (error: AxiosError<ApiError>) => void;
};

const ChangeProfilePicForm: FC<ProfileSettingsFormProps> = ({
  onCancel,
  onSuccess,
  onError,
}) => {
  const t = useTranslations();
  const queryClient = getQueryClient();

  const { data: profile } = useProfile();

  const { mutateAsync: updatePicture, isPending: isUploading } =
    useUpdateProfilePicture({
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: [GET_PROFILE_KEY] });
        onSuccess();
      },
      onError,
    });

  const { handleSubmit, register, watch, formState } =
    useForm<ProfilePictureFormData>({
      resolver: zodResolver(ProfilePictureValidator),
    });

  const { dirtyFields, errors } = formState;

  const onFormSubmit = (data: ProfilePictureFormData) => {
    void updatePicture(data.fileList[0]);
  };

  const selectedFile = watch('fileList')?.item(0);
  const imgSrc = selectedFile
    ? URL.createObjectURL(selectedFile)
    : (profile?.imageUrl ?? undefined);

  return (
    <form
      id="change-picture-form"
      className={styles.container}
      onSubmit={handleSubmit(onFormSubmit)}
    >
      <Typography variant="body1">
        {t('profileSettings.changeYourProfilePic')}
      </Typography>
      <div className={styles.items}>
        <Avatar src={imgSrc} size="lg" />
        <FileUploadInput
          {...register('fileList')}
          variant="outlined"
          accept={'image/png,image/jpg'}
        >
          {t('profileSettings.uploadNewPic')}
        </FileUploadInput>
        {!!errors.fileList && (
          <Typography variant="body1" color="error">
            {errors.fileList?.message}
          </Typography>
        )}
      </div>
      <div className={styles.actions}>
        <Button onClick={onCancel} variant="text" color="primary">
          {t('shared.cancel')}
        </Button>
        <Button
          variant="contained"
          form="change-picture-form"
          type="submit"
          disabled={!dirtyFields.fileList || isUploading}
        >
          {t('shared.submit')}
        </Button>
      </div>
    </form>
  );
};

export default ChangeProfilePicForm;
