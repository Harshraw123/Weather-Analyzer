import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Calendar } from 'lucide-react';

export const SearchPanel = ({ onSearch, searchResult }) => {
  const [searchDate, setSearchDate] = useState('');

  const handleSearch = () => {
    if (searchDate) {
      onSearch(searchDate);
    }
  };

  return (
    <Card className="p-6 bg-white/10 backdrop-blur-lg border border-white/30 rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Search className="h-5 w-5 text-emerald-400 drop-shadow-lg" />
        <h3 className="text-lg font-semibold bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent drop-shadow-md">
          Binary Search by Date
        </h3>
      </div>

      {/* Search Input */}
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="pl-10 bg-white/10 border border-gray-400 text-gray-100 placeholder-gray-400"
          />
        </div>
        <Button
          onClick={handleSearch}
          className="bg-gradient-to-r from-emerald-400 to-green-600 text-black font-semibold hover:opacity-90 shadow-md"
        >
          Search
        </Button>
      </div>

      {/* Result Card */}
      {searchResult && (
        <div className="p-4 rounded-lg bg-white/20 backdrop-blur-lg border border-emerald-400/50 shadow-md mb-2">
          <p className="text-sm font-semibold text-emerald-400 mb-2">Result Found:</p>
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-100">
            <div>
              <span className="text-gray-400">City:</span>
              <span className="ml-2 font-medium">{searchResult.city}</span>
            </div>
            <div>
              <span className="text-gray-400">Temp:</span>
              <span className="ml-2 font-medium text-emerald-400">{searchResult.temperature}°C</span>
            </div>
            <div>
              <span className="text-gray-400">Humidity:</span>
              <span className="ml-2 font-medium">{searchResult.humidity}%</span>
            </div>
            <div>
              <span className="text-gray-400">Pressure:</span>
              <span className="ml-2 font-medium">{searchResult.pressure} hPa</span>
            </div>
          </div>
        </div>
      )}

      {/* No Result Message */}
      {searchDate && !searchResult && (
        <p className="text-sm text-gray-400">No data found for the selected date.</p>
      )}
    </Card>
  );
};
