import { Card } from '@/components/ui/card';

import {
  LineChart,
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


export const PressureChart = ({ data }) => {
  const chartData = [...data]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(log => ({
      date: new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      pressure: log.pressure,
      avgPressure: 1013, // Standard atmospheric pressure
    }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel p-4 rounded-lg shadow-xl neon-border">
          <p className="font-semibold text-foreground mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.stroke }}>
              {entry.name}: {entry.value} hPa
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6 glass-panel neon-border">
      <div className="mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Atmospheric Pressure Monitoring
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Pressure trends with standard reference line
        </p>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={chartData}>
          <defs>
            <linearGradient id="pressureGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(217 91% 60%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(217 91% 60%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis
            dataKey="date"
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
            domain={[950, 1050]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              paddingTop: '20px',
              fontSize: '14px',
            }}
          />
          <Area
            type="monotone"
            dataKey="pressure"
            stroke="hsl(217 91% 60%)"
            strokeWidth={3}
            fill="url(#pressureGradient)"
            name="Pressure"
          />
          <Line
            type="monotone"
            dataKey="avgPressure"
            stroke="hsl(160 84% 39%)"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            name="Standard (1013 hPa)"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  );
};
