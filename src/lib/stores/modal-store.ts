import { create } from 'zustand';
import {
  ModalProps,
  ModalStateProps,
  OpenModalOptions,
} from '@/lib/types/modal';

type ModalState = {
  modals: ModalStateProps[];
  openModal: (modal: OpenModalOptions) => void;
  closeModal: (id: string | number) => void;
  closeAllModals: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  modals: [],
  openModal: (modal) =>
    set((state) => {
      const id = modal.id ?? crypto.randomUUID(); // maybe use Date.now

      const props: ModalProps = {
        ...modal.props,
        open: true,
        disableScrollLock: true,
        onClose: () => {
          set((state) => ({
            modals: state.modals.filter((m) => m.id !== id),
          }));
        },
      };

      return {
        modals: [
          ...state.modals,
          {
            ...modal,
            id,
            props,
            data: modal.data ?? ({} as never),
          },
        ],
      };
    }),
  closeModal: (id) =>
    set((state) => ({
      modals: state.modals.filter((modal) => modal.id !== id),
    })),
  closeAllModals: () => set({ modals: [] }),
}));
