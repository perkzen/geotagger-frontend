import { z } from 'zod';

export const ProfileSettingsValidator = z.object({
  firstname: z.string().min(3).max(64),
  lastname: z.string().min(3).max(64),
  email: z.string().email(),
});

export type ProfileSettingsFormData = z.infer<typeof ProfileSettingsValidator>;
