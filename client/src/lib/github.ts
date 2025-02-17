import { QueueStats } from "@shared/schema";

// In a real implementation, this would fetch from the GitHub API
// For demo purposes, we'll generate some mock data
export async function fetchQueueStats(): Promise<QueueStats> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const now = new Date();
  const queue_items = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    number: i + 100,
    title: `Fix bug #${i + 100}`,
    created_at: new Date(now.getTime() - (i * 3600000)).toISOString(),
    updated_at: new Date(now.getTime() - (i * 3000000)).toISOString(),
    mergeable: Math.random() > 0.2,
    state: Math.random() > 0.3 ? 'success' : 'pending',
  }));

  return {
    total_items: queue_items.length,
    avg_wait_time: 45, // minutes
    success_rate: 0.85,
    queue_items,
  };
}
