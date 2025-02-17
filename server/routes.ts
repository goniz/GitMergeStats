import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

// Mock data for demonstration
const mockQueueStats = {
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

export async function registerRoutes(app: Express): Promise<Server> {
  // Queue statistics endpoint
  app.get('/api/queue-stats', async (_req, res) => {
    try {
      // In a real application, this would fetch data from GitHub's API
      // For now, we're using mock data
      res.json(mockQueueStats);
    } catch (error) {
      console.error('Error fetching queue stats:', error);
      res.status(500).json({ message: 'Failed to fetch queue statistics' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}