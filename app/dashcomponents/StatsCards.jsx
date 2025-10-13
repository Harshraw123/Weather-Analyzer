import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Calendar, Thermometer } from 'lucide-react';
import { Card } from '@/components/ui/card';




export const StatsCards = ({ stats }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cards = [
    {
      title: 'Average Temperature',
      value: `${stats.avgTemperature}°C`,
      icon: Thermometer,
      gradient: 'from-emerald-500 to-teal-500',
      iconBg: 'bg-emerald-500/20',
      glow: 'glow-emerald',
    },
    {
      title: 'Highest Temperature',
      value: `${stats.maxTemperature}°C`,
      icon: TrendingUp,
      gradient: 'from-blue-500 to-cyan-500',
      iconBg: 'bg-blue-500/20',
      glow: 'glow-blue',
    },
    {
      title: 'Lowest Temperature',
      value: `${stats.minTemperature}°C`,
      icon: TrendingDown,
      gradient: 'from-purple-500 to-pink-500',
      iconBg: 'bg-purple-500/20',
      glow: 'shadow-lg',
    },
    {
      title: 'Total Days Logged',
      value: stats.totalDays,
      icon: Calendar,
      gradient: 'from-emerald-400 to-blue-500',
      iconBg: 'bg-emerald-400/20',
      glow: 'shadow-lg',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <Card
          key={index}
          className={`glass-panel neon-border relative overflow-hidden hover:scale-105 transition-all duration-300 ${card.glow}`}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${card.iconBg} backdrop-blur-sm`}>
                <card.icon className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
              <p className={`text-3xl font-bold bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}>
                {mounted ? card.value : '...'}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
