import { Card } from '@/components/ui/card';

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';



export const WeatherDistributionPie = ({ data }) => {
  const conditionCounts = data.reduce((acc, log) => {
    acc[log.condition] = (acc[log.condition] || 0) + 1;
    return acc;
  }, {} );

  const chartData = Object.entries(conditionCounts).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = [
    'hsl(160 84% 39%)',
    'hsl(217 91% 60%)',
    'hsl(160 100% 50%)',
    'hsl(200 100% 70%)',
    'hsl(280 100% 70%)',
  ];

  const CustomTooltip = ({ active, payload } ) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel p-4 rounded-lg shadow-xl neon-border">
          <p className="font-semibold text-foreground">{payload[0].name}</p>
          <p className="text-sm text-muted-foreground">
            Count: {payload[0].value} days
          </p>
          <p className="text-sm text-muted-foreground">
            {((payload[0].value / data.length) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6 glass-panel neon-border h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Weather Condition Distribution
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Breakdown by weather type
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={(props) => 
              `${props.name} ${(props.percent * 100).toFixed(0)}%`
            }
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              fontSize: '12px',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};
