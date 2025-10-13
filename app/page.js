'use client';

import { useState } from 'react';
import { DashboardLayout } from './dashcomponents/DashboardLayout';
import { StatsCards } from './dashcomponents/StatsCards';
import { WeatherChart } from './dashcomponents/WeatherChart';
import { WeatherTable } from './dashcomponents/WeatherTable';
import { SearchPanel } from './dashcomponents/SerachPanel';
import { FilterPanel } from './dashcomponents/FilterPanel';
import { HumidityBarChart } from './dashcomponents/HumidityBarChart';
import { WeatherDistributionPie as WeatherDistribution } from './dashcomponents/WeatherDistribution';
import { PressureChart } from './dashcomponents/PressureChart';
import { mockWeatherData } from '../lib/data'
import {
  mergeSort,
  binarySearchByDate,
  calculateStats,
  filterByDateRange,
  filterByTemperature,
} from '../lib/weatherAlgorithms'

export default function Dashboard() {
  const [weatherLogs, setWeatherLogs] = useState(mockWeatherData);
  const [filteredLogs, setFilteredLogs] = useState(mockWeatherData);
  const [searchResult, setSearchResult] = useState(null);

  const handleSort = (field, order) => {
    const sorted = mergeSort([...filteredLogs], field, order);
    setFilteredLogs(sorted);
  };

  const handleSearch = (date) => {
    const result = binarySearchByDate(weatherLogs, date);
    setSearchResult(result);
  };

  const handleFilter = (filters) => {
    let filtered = [...weatherLogs];

    if (filters.startDate && filters.endDate) {
      filtered = filterByDateRange(filtered, filters.startDate, filters.endDate);
    }

    if (filters.minTemp !== undefined && filters.maxTemp !== undefined) {
      filtered = filterByTemperature(filtered, filters.minTemp, filters.maxTemp);
    }

    if (filters.city) {
      filtered = filtered.filter((log) => log.city === filters.city);
    }

    setFilteredLogs(filtered);
  };

  const handleResetFilters = () => {
    setFilteredLogs(weatherLogs);
    setSearchResult(null);
  };

  const stats = calculateStats(filteredLogs);

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Search and Filter Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <SearchPanel onSearch={handleSearch} searchResult={searchResult} />
          <FilterPanel onFilter={handleFilter} onReset={handleResetFilters} />
        </div>

        {/* Stats Cards */}
        <StatsCards stats={stats} />

        {/* Main Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <WeatherChart data={filteredLogs} />
          </div>
          <div className="xl:col-span-1">
            <WeatherDistribution data={filteredLogs} />
          </div>
        </div>

        {/* Secondary Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <HumidityBarChart data={filteredLogs} />
          <PressureChart data={filteredLogs} />
        </div>

        {/* Data Table */}
        <WeatherTable data={filteredLogs.slice(0, 10)} onSort={handleSort} />
      </div>
    </DashboardLayout>
  );
}
