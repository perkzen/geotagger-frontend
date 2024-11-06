import axios from 'axios';
import { api } from '@/lib/api';
import {
  CreateUploadUrlPayload,
  UploadFilePayload,
} from '@/lib/api/media/models';
import { ApiRoutes } from '@/lib/constants/api-routes';

export const getUploadUrl = async (payload: CreateUploadUrlPayload) => {
  const res = await api.post<{ url: string }>(ApiRoutes.media.upload, payload);
  return res.data.url;
};

export const uploadFile = async ({ url, file }: UploadFilePayload) => {
  await axios.put(url, file);
};
