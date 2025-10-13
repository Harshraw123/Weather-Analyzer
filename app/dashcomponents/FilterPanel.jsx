import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Filter, X } from 'lucide-react';

export const FilterPanel = ({ onFilter, onReset }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [minTemp, setMinTemp] = useState('');
  const [maxTemp, setMaxTemp] = useState('');

  const handleApplyFilters = () => {
    onFilter({
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      minTemp: minTemp ? parseFloat(minTemp) : undefined,
      maxTemp: maxTemp ? parseFloat(maxTemp) : undefined,
    });
  };

  const handleReset = () => {
    setStartDate('');
    setEndDate('');
    setMinTemp('');
    setMaxTemp('');
    onReset();
  };

  return (
    <Card className="p-6 bg-white/20 backdrop-blur-lg border border-white/30 rounded-lg shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-cyan-400 drop-shadow-lg" />
        <h3 className="text-lg font-semibold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
          Data Filters
        </h3>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="startDate" className="text-xs text-gray-300">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 bg-white/10 border border-gray-400 text-white placeholder-gray-400"
            />
          </div>
          <div>
            <Label htmlFor="endDate" className="text-xs text-gray-300">End Date</Label>
            <Input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 bg-white/10 border border-gray-400 text-white placeholder-gray-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="minTemp" className="text-xs text-gray-300">Min Temp (°C)</Label>
            <Input
              id="minTemp"
              type="number"
              value={minTemp}
              onChange={(e) => setMinTemp(e.target.value)}
              placeholder="0"
              className="mt-1 bg-white/10 border border-gray-400 text-white placeholder-gray-400"
            />
          </div>
          <div>
            <Label htmlFor="maxTemp" className="text-xs text-gray-300">Max Temp (°C)</Label>
            <Input
              id="maxTemp"
              type="number"
              value={maxTemp}
              onChange={(e) => setMaxTemp(e.target.value)}
              placeholder="50"
              className="mt-1 bg-white/10 border border-gray-400 text-white placeholder-gray-400"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleApplyFilters}
            className="flex-1 bg-gradient-to-r from-emerald-400 to-green-600 text-white font-semibold hover:opacity-90 shadow-lg"
          >
            Apply
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="flex-1 border border-gray-400 text-black"
          >
            <X className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>
    </Card>
  );
};
