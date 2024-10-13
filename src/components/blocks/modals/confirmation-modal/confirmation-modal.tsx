import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Button, Card, Modal, Typography } from '@mui/material';
import { ModalStateProps } from '@/lib/types/modal';
import styles from './confirmation-modal.module.scss';

const ConfirmationModal: FC<ModalStateProps<'CONFIRMATION'>> = ({
  props,
  data,
}) => {
  const t = useTranslations('shared');

  const { title, message } = data;

  const handleClose = () => {
    props.onClose();
  };

  return (
    <Modal {...props}>
      <Card className={styles.container}>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body1">{message}</Typography>
        <Button variant="contained" onClick={handleClose}>
          {t('close')}
        </Button>
      </Card>
    </Modal>
  );
};

export default ConfirmationModal;
