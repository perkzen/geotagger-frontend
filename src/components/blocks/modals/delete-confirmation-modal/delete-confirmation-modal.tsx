import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Button, Card, Modal, Typography } from '@mui/material';
import { ModalStateProps } from '@/lib/types/modal';
import styles from './delete-confirmation-modal.module.scss';

const DeleteConfirmationModal: FC<ModalStateProps<'DELETE_CONFIRMATION'>> = ({
  data,
  props,
}) => {
  const t = useTranslations('shared');

  const { title } = data;

  const handleClose = () => {
    props.onClose();
  };

  return (
    <Modal {...props}>
      <Card className={styles.container}>
        <Typography variant="h5">{title}</Typography>
        <Button variant="contained" onClick={handleClose}>
          {t('dismiss')}
        </Button>
      </Card>
    </Modal>
  );
};

export default DeleteConfirmationModal;
