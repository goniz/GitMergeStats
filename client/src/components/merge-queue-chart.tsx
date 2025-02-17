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
import { format } from "date-fns";

interface MergeQueueChartProps {
  data: QueueItem[];
}

export default function MergeQueueChart({ data }: MergeQueueChartProps) {
  const chartData = data.map(item => ({
    time: format(new Date(item.created_at), "HH:mm"),
    value: 1,
    state: item.state,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          label={{ value: "Time", position: "insideBottom", offset: -10 }}
        />
        <YAxis
          label={{
            value: "Queue Items",
            angle: -90,
            position: "insideLeft",
            offset: 10,
          }}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
