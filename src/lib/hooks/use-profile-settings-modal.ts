import { useModalStore } from '@/lib/stores/modal-store';
import { ModalTypes } from '@/lib/types/modal';

export const useProfileSettingsModal = () => {
  const { openModal } = useModalStore();

  return () => {
    openModal({ type: ModalTypes.PROFILE_SETTINGS });
  };
};
