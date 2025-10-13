import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { useState } from 'react';

export const WeatherTable = ({ data, onSort }) => {
  const [sortField, setSortField] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const handleSort = (field) => {
    const newOrder = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newOrder);
    onSort(field, newOrder);
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4 ml-1" />;
    return sortOrder === 'asc' ? <ArrowUp className="h-4 w-4 ml-1" /> : <ArrowDown className="h-4 w-4 ml-1" />;
  };

  return (
    <Card className="p-6 bg-white/10 backdrop-blur-lg border border-white/30 rounded-lg shadow-lg">
      <div className="mb-4">
        <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent drop-shadow-lg">
          Recent Weather Logs
        </h2>
        <p className="text-sm text-gray-300 mt-1">
          Latest records with sorting capabilities
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-400">
              <th className="text-left py-3 px-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('date')}
                  className="font-semibold text-xs text-gray-100 hover:text-emerald-400"
                >
                  Date
                  <SortIcon field="date" />
                </Button>
              </th>
              <th className="text-left py-3 px-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('temperature')}
                  className="font-semibold text-xs text-gray-100 hover:text-emerald-400"
                >
                  Temp
                  <SortIcon field="temperature" />
                </Button>
              </th>
              <th className="text-left py-3 px-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('humidity')}
                  className="font-semibold text-xs text-gray-100 hover:text-emerald-400"
                >
                  Humidity
                  <SortIcon field="humidity" />
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((log) => (
              <tr
                key={log.id}
                className="border-b border-gray-500/50 hover:bg-gray-700/30 transition-colors"
              >
                <td className="py-3 px-2 text-sm text-gray-100">
                  {new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </td>
                <td className="py-3 px-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-emerald-400 to-green-600 text-black drop-shadow-md">
                    {log.temperature}°C
                  </span>
                </td>
                <td className="py-3 px-2 text-sm text-gray-400">
                  {log.humidity}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
