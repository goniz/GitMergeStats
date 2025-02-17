import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import StatsCard from "@/components/stats-card";
import MergeQueueChart from "@/components/merge-queue-chart";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { fetchQueueStats } from "@/lib/github";

export default function Dashboard() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["/api/queue-stats"],
    queryFn: fetchQueueStats,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load merge queue statistics. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Merge Queue Statistics
        </h1>

        <div className="grid gap-4 md:grid-cols-3 mb-8">
          {isLoading ? (
            <>
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
            </>
          ) : (
            <>
              <StatsCard
                title="Queue Length"
                value={data?.total_items.toString() || "0"}
                description="Current items in queue"
              />
              <StatsCard
                title="Average Wait Time"
                value={`${Math.round(data?.avg_wait_time || 0)}min`}
                description="Time until merge"
              />
              <StatsCard
                title="Success Rate"
                value={`${Math.round((data?.success_rate || 0) * 100)}%`}
                description="Successful merges"
              />
            </>
          )}
        </div>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Queue History</h2>
          {isLoading ? (
            <Skeleton className="h-[400px]" />
          ) : (
            <MergeQueueChart data={data?.queue_items || []} />
          )}
        </Card>
      </div>
    </div>
  );
}
