import { useModalStore } from '@/lib/stores/modal-store';
import { ModalData, ModalTypes } from '@/lib/types/modal';

export const useConfirmationModal = () => {
  const openModal = useModalStore((state) => state.openModal);

  return (data: ModalData['CONFIRMATION'], onClose?: () => void) => {
    openModal({
      type: ModalTypes.CONFIRMATION,
      data,
    });

    onClose?.();
  };
};
