import { QueueStats } from "@shared/schema";

// In a real implementation, this would fetch from the GitHub API
// For demo purposes, we'll generate some mock data
export async function fetchQueueStats(): Promise<QueueStats> {
  const response = await fetch('/api/queue-stats', {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch queue statistics');
  }

  return await response.json();
}