import { QueueStats } from "@shared/schema";

// Static mock data for the GitHub merge queue statistics
export async function fetchQueueStats(): Promise<QueueStats> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return {
    total_items: 5,
    avg_wait_time: 15.5,
    success_rate: 0.85,
    queue_items: [
      { timestamp: '2025-02-17T10:00:00Z', count: 3 },
      { timestamp: '2025-02-17T11:00:00Z', count: 5 },
      { timestamp: '2025-02-17T12:00:00Z', count: 4 },
      { timestamp: '2025-02-17T13:00:00Z', count: 6 },
      { timestamp: '2025-02-17T14:00:00Z', count: 5 }
    ]
  };
}