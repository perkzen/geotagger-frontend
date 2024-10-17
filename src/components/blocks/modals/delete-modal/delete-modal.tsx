import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Button, Card, Modal, Typography } from '@mui/material';
import { ModalStateProps } from '@/lib/types/modal';
import styles from './delete-modal.module.scss';

const DeleteModal: FC<ModalStateProps<'DELETE'>> = ({ data, props }) => {
  const t = useTranslations('shared');

  const { title, message, onSubmit } = data;

  const handleClose = () => {
    props.onClose();
  };

  const handleSubmit = () => {
    onSubmit();
    handleClose();
  };

  return (
    <Modal {...props}>
      <Card className={styles.container}>
        <Typography variant="h4">{title}</Typography>
        <Typography variant="body1">{message}</Typography>
        <div className={styles.buttons}>
          <Button
            variant="text"
            className={styles.cancel}
            onClick={handleClose}
          >
            {t('cancel')}
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            {t('submit')}
          </Button>
        </div>
      </Card>
    </Modal>
  );
};

export default DeleteModal;
