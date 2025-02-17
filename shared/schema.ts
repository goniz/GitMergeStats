import { z } from "zod";

// GitHub API response types
export const queueItemSchema = z.object({
  id: z.number(),
  number: z.number(),
  title: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  mergeable: z.boolean(),
  state: z.string(),
});

export const queueStatsSchema = z.object({
  total_items: z.number(),
  avg_wait_time: z.number(),
  success_rate: z.number(),
  queue_items: z.array(queueItemSchema),
});

export type QueueItem = z.infer<typeof queueItemSchema>;
export type QueueStats = z.infer<typeof queueStatsSchema>;
