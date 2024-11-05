import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getUploadUrl, uploadFile } from '@/lib/api/media/index';
import {CreateUploadUrlPayload, UploadFilePayload} from '@/lib/api/media/models';
import { ApiError } from '@/lib/types/api-error';

const CREATE_UPLOAD_URL_KEY = 'CREATE_UPLOAD_URL';

type UseCreateUploadUrlOptions = Omit<
  UseMutationOptions<
    Awaited<ReturnType<typeof getUploadUrl>>,
    AxiosError<ApiError>,
    CreateUploadUrlPayload,
    unknown
  >,
  'mutationFn' | 'mutationKey'
>;

export const useCreateUploadUrl = (options?: UseCreateUploadUrlOptions) => {
  return useMutation({
    ...options,
    mutationKey: [CREATE_UPLOAD_URL_KEY],
    mutationFn: getUploadUrl,
  });
};

const UPLOAD_FILE_KEY = 'UPLOAD_FILE';

type UseUploadFileOptions = Omit<
  UseMutationOptions<
    void,
    AxiosError,
    UploadFilePayload,
    unknown
  >,
  'mutationFn' | 'mutationKey'
>;

export const useUploadFile = (options?: UseUploadFileOptions) => {
  return useMutation({
    ...options,
    mutationKey: [UPLOAD_FILE_KEY],
    mutationFn: uploadFile,
  });
};
