import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from 'recharts';
  
  export const HumidityBarChart = ({ data }) => {
    const chartData = [...data]
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-10)
      .map(log => ({
        date: new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        humidity: log.humidity,
        temperature: log.temperature,
      }));
  
    const CustomTooltip = ({ active, payload }) => {
      if (active && payload && payload.length) {
        return (
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 shadow-lg">
            <p className="font-semibold text-emerald-400 mb-2">{payload[0].payload.date}</p>
            {payload.map((entry, index) => (
              <p key={index} className="text-sm" style={{ color: entry.fill }}>
                {entry.name}: {entry.value}
                {entry.name === 'humidity' ? '%' : '°C'}
              </p>
            ))}
          </div>
        );
      }
      return null;
    };
  
    return (
      <div className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg">
        <div className="mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-green-400 to-green-600 bg-clip-text text-transparent drop-shadow-md">
            Humidity & Temperature Analysis
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Comparative bar chart visualization
          </p>
        </div>
  
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <defs>
              <linearGradient id="humidityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#16a34a" stopOpacity={0.6} />
              </linearGradient>
              <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="white" opacity={0.2} />
            <XAxis dataKey="date" stroke="gray-400" style={{ fontSize: '12px' }} />
            <YAxis stroke="gray-400" style={{ fontSize: '12px' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '14px' }} />
            <Bar
              dataKey="humidity"
              fill="url(#humidityGradient)"
              radius={[8, 8, 0, 0]}
              name="Humidity"
            />
            <Bar
              dataKey="temperature"
              fill="url(#tempGradient)"
              radius={[8, 8, 0, 0]}
              name="Temperature"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };
  