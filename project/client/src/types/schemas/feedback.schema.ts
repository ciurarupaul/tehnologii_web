import { z } from 'zod';

export const feedbackSchema = z.object({
  id: z.string(),
  activityId: z.string(),
  studentId: z.string(),
  type: z.enum(['smiley', 'frowny', 'surprised', 'confused']),
  comment: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const feedbackListSchema = z.array(feedbackSchema);

export type Feedback = z.infer<typeof feedbackSchema>;
export type FeedbackList = z.infer<typeof feedbackListSchema>;
