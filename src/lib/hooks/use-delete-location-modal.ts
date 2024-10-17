import { useTranslations } from 'next-intl';
import { MY_LOCATIONS_KEY, useDeleteLocation } from '@/lib/api/locations/hooks';
import { useModalStore } from '@/lib/stores/modal-store';
import { ModalTypes } from '@/lib/types/modal';
import { getQueryClient } from '@/lib/utils/get-query-client';

type UseDeleteLocationModalOptions = {
  id: string;
};

export const useDeleteLocationModal = ({
  id,
}: UseDeleteLocationModalOptions) => {
  const t = useTranslations();
  const openModal = useModalStore((state) => state.openModal);

  const queryClient = getQueryClient();

  const { mutateAsync: deleteLocation } = useDeleteLocation({
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [MY_LOCATIONS_KEY],
      });

      openModal({
        type: ModalTypes.DELETE_CONFIRMATION,
        data: {
          title: t('location.delete.success'),
        },
      });
    },
  });

  return () => {
    openModal({
      type: ModalTypes.DELETE,
      data: {
        title: t('shared.areYouSure'),
        message: t('location.delete.message'),
        onSubmit: () => deleteLocation(id),
      },
    });
  };
};
