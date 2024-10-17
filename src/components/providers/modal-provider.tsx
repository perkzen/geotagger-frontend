'use client';
import { ReactNode, useMemo } from 'react';
import ConfirmationModal from '@/components/blocks/modals/confirmation-modal/confirmation-modal';
import DeleteConfirmationModal from '@/components/blocks/modals/delete-confirmation-modal/delete-confirmation-modal';
import DeleteModal from '@/components/blocks/modals/delete-modal/delete-modal';
import ErrorModal from '@/components/blocks/modals/error-modal/error-modal';
import ProfileSettingsModal from '@/components/blocks/modals/profile-settings-modal/profile-settings-modal';
import { useModalStore } from '@/lib/stores/modal-store';
import { isModalType, ModalTypes } from '@/lib/types/modal';

export default function ModalProvider({ children }: { children: ReactNode }) {
  const { modals } = useModalStore();

  const openModals = useMemo(
    () =>
      modals.map((modal) => {
        if (isModalType(modal, ModalTypes.PROFILE_SETTINGS)) {
          return <ProfileSettingsModal key={modal.id} {...modal} />;
        }

        if (isModalType(modal, ModalTypes.CONFIRMATION)) {
          return <ConfirmationModal key={modal.id} {...modal} />;
        }

        if (isModalType(modal, ModalTypes.ERROR)) {
          return <ErrorModal key={modal.id} {...modal} />;
        }

        if (isModalType(modal, ModalTypes.DELETE)) {
          return <DeleteModal key={modal.id} {...modal} />;
        }

        if (isModalType(modal, ModalTypes.DELETE_CONFIRMATION)) {
          return <DeleteConfirmationModal key={modal.id} {...modal} />;
        }

        return null;
      }),
    [modals]
  );

  return (
    <>
      {children}
      {openModals}
    </>
  );
}
