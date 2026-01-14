import { z } from 'zod';

export const activitySchema = z.object({
  id: z.string(),
  professorId: z.string(),
  title: z.string(),
  description: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  accessCode: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const activityListSchema = z.array(activitySchema);

export type Activity = z.infer<typeof activitySchema>;
export type ActivityList = z.infer<typeof activityListSchema>;
