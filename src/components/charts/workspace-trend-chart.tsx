import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { AnalyticsTrendPoint } from "@/types/workspace";

export function WorkspaceTrendChart({ data }: { data: AnalyticsTrendPoint[] }) {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#dde4ef" />
          <XAxis dataKey="label" stroke="#6b7280" />
          <YAxis yAxisId="left" stroke="#6b7280" />
          <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="conversations"
            stroke="#27426f"
            strokeWidth={3}
            dot={false}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="resolutions"
            stroke="#129575"
            strokeWidth={2.5}
            dot={false}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="responseMinutes"
            stroke="#f59e0b"
            strokeWidth={2.5}
            dot={false}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="leads"
            stroke="#648cff"
            strokeWidth={2.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
