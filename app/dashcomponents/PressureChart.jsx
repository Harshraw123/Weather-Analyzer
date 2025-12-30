import { Card } from '@/components/ui/card';
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from 'recharts';

export const PressureChart = ({ data = [] }) => {
  const chartData = [...data]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map(log => ({
      date: new Date(log.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      pressure: log.pressure,
      avgPressure: 1013,
    }));

  const minPressure =
    Math.min(...chartData.map(d => d.pressure)) - 10;
  const maxPressure =
    Math.max(...chartData.map(d => d.pressure)) + 10;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
      return (
        <div className="rounded-xl bg-background/90 backdrop-blur-md border border-border p-4 shadow-2xl">
          <p className="text-sm font-semibold mb-2 text-foreground">
            {label}
          </p>
          {payload.map((item, index) => (
            <p
              key={index}
              className="text-xs sm:text-sm font-medium"
              style={{ color: item.color }}
            >
              {item.name}: {item.value} hPa
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-4 sm:p-6 glass-panel neon-border">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Atmospheric Pressure Monitoring
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Pressure trend with standard atmospheric reference
        </p>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={320}>
        <ComposedChart data={chartData}>
          <defs>
            <linearGradient id="pressureGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(217 91% 60%)" stopOpacity={0.4} />
              <stop offset="100%" stopColor="hsl(217 91% 60%)" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="4 4"
            stroke="hsl(var(--border))"
            opacity={0.4}
          />

          <XAxis
            dataKey="date"
            tick={{ fontSize: 11 }}
            stroke="hsl(var(--muted-foreground))"
            tickMargin={10}
          />

          <YAxis
            domain={[minPressure, maxPressure]}
            tick={{ fontSize: 11 }}
            stroke="hsl(var(--muted-foreground))"
            tickMargin={10}
            width={45}
          />

          <Tooltip content={<CustomTooltip />} />

          <Legend
            verticalAlign="top"
            align="right"
            iconType="line"
            wrapperStyle={{
              fontSize: '12px',
              paddingBottom: '10px',
            }}
          />

          <Area
            type="monotone"
            dataKey="pressure"
            stroke="hsl(217 91% 60%)"
            strokeWidth={3}
            fill="url(#pressureGradient)"
            name="Pressure (hPa)"
            activeDot={{ r: 6 }}
          />

          <Line
            type="monotone"
            dataKey="avgPressure"
            stroke="hsl(160 84% 39%)"
            strokeWidth={2}
            strokeDasharray="6 6"
            dot={false}
            name="Standard (1013 hPa)"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  );
};
