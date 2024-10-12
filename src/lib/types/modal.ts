import { ModalProps as MuiModalProps } from '@mui/material';

export const ModalTypes = {
  PROFILE_SETTINGS: 'PROFILE_SETTINGS',
  CONFIRMATION: 'CONFIRMATION',
  ERROR: 'ERROR',
} as const;

export type ModalType = keyof typeof ModalTypes;

export type ModalData = {
  [ModalTypes.CONFIRMATION]: {
    title: string;
    message: string;
  };
  [ModalTypes.ERROR]: {
    errorCode: number;
    message: string;
  };
};

export type ModalProps = Omit<MuiModalProps, 'children'> & {
  onClose: () => void;
};

export type ModalStateProps<T extends ModalType = ModalType> = {
  id?: string | number;
  type: ModalType;
  props: ModalProps;
  data: T extends keyof ModalData ? ModalData[T] : never;
};

export type OpenModalOptions<T extends ModalType = ModalType> = {
  id?: string | number;
  type: ModalType;
  data?: T extends keyof ModalData ? ModalData[T] : never;
  props?: Partial<Omit<MuiModalProps, 'open' | 'children'>>;
};

export const isModalType = <T extends ModalType>(
  modal: ModalStateProps,
  type: T
): modal is ModalStateProps<T> => modal.type === type;
