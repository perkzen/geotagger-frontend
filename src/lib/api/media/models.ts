export type CreateUploadUrlPayload = {
  bucketPath: 'profile/images' | 'locations/images';
  originalFilename: string;
  mimeType: string;
  ownerId: string; // Location or user ID
};

export type UploadFilePayload = {
  url: string;
  file: File;
};
