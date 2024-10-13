'use client';
import { ReactNode, useMemo } from 'react';
import ConfirmationModal from '@/components/blocks/modals/confirmation-modal/confirmation-modal';
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
