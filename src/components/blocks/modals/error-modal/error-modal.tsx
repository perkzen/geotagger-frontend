import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Button, capitalize, Card, Modal, Typography } from '@mui/material';
import { ModalStateProps } from '@/lib/types/modal';
import styles from './error-modal.module.scss';

const ErrorModal: FC<ModalStateProps<'ERROR'>> = ({ props, data }) => {
  const t = useTranslations();

  const { errorCode, message } = data;

  const handleClose = () => {
    props.onClose();
  };

  return (
    <Modal {...props}>
      <Card className={styles.container}>
        <Typography variant="h5">
          {t('errors.errorCode', {
            code: errorCode,
          })}
        </Typography>
        <Typography variant="body1" className={styles.message}>
          {capitalize(message)}
        </Typography>
        <Button variant="contained" onClick={handleClose}>
          {t('shared.dismiss')}
        </Button>
      </Card>
    </Modal>
  );
};

export default ErrorModal;
