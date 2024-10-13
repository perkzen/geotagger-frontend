import { AxiosError } from 'axios';
import { useError } from '@/lib/hooks/use-error';
import { useModalStore } from '@/lib/stores/modal-store';
import { ApiError } from '@/lib/types/api-error';
import { ModalTypes } from '@/lib/types/modal';

export const useErrorModal = () => {
  const { getError } = useError();

  const openModal = useModalStore((state) => state.openModal);

  return (error: AxiosError<ApiError>, onClose?: () => void) => {
    const response = error.response?.data;

    openModal({
      type: ModalTypes.ERROR,
      data: {
        errorCode: response?.statusCode || 500,
        message: getError(error),
      },
    });

    onClose?.();
  };
};
