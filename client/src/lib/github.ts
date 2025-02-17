import { QueueStats } from "@shared/schema";

// In a real implementation, this would fetch from the GitHub API
// For demo purposes, we'll generate some mock data
export async function fetchQueueStats(): Promise<QueueStats> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const now = new Date();
  const queue_items = Array.from({ length: 10 }, (_, i) => {
    const created_at = new Date(now.getTime() - (i * 3600000)); // Each item created 1 hour apart
    const duration = Math.floor(Math.random() * 120) + 30; // Random duration between 30-150 minutes
    const merged_at = new Date(created_at.getTime() + (duration * 60000));

    return {
      id: i + 1,
      number: i + 100,
      title: `Fix bug #${i + 100}`,
      created_at: created_at.toISOString(),
      merged_at: merged_at.toISOString(),
      duration_minutes: duration,
      state: 'success',
    };
  });

  return {
    total_items: queue_items.length,
    avg_wait_time: queue_items.reduce((acc, item) => acc + item.duration_minutes, 0) / queue_items.length,
    success_rate: 0.85,
    queue_items,
  };
}