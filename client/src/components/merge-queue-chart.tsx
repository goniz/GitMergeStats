import { QueueItem } from "@shared/schema";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";

interface MergeQueueChartProps {
  data: QueueItem[];
}

export default function MergeQueueChart({ data }: MergeQueueChartProps) {
  const chartData = data
    .sort((a, b) => parseISO(a.created_at).getTime() - parseISO(b.created_at).getTime())
    .map(item => ({
      time: format(parseISO(item.created_at), "HH:mm"),
      duration: item.duration_minutes,
      title: item.title,
    }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          label={{ value: "Time Created", position: "insideBottom", offset: -10 }}
        />
        <YAxis
          label={{
            value: "Minutes to Merge",
            angle: -90,
            position: "insideLeft",
            offset: 10,
          }}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              return (
                <div className="bg-background border border-border p-2 rounded-md shadow-md">
                  <p className="font-medium">{data.title}</p>
                  <p className="text-sm text-muted-foreground">Created at: {data.time}</p>
                  <p className="text-sm text-primary">Duration: {data.duration} minutes</p>
                </div>
              );
            }
            return null;
          }}
        />
        <Line
          type="monotone"
          dataKey="duration"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={{
            stroke: "hsl(var(--primary))",
            fill: "hsl(var(--background))",
            strokeWidth: 2,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}