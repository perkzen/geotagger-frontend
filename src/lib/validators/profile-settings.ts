import { z } from 'zod';

export const ProfileSettingsValidator = z.object({
  firstname: z.string().trim().min(3).max(64),
  lastname: z.string().trim().min(3).max(64),
  email: z.string().trim().email(),
});

export type ProfileSettingsFormData = z.infer<typeof ProfileSettingsValidator>;
