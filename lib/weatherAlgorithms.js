// Merge Sort Implementation for efficient sorting
export const mergeSort = (arr, field, order = 'asc') => {
    if (arr.length <= 1) return arr;
  
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid), field, order);
    const right = mergeSort(arr.slice(mid), field, order);
  
    return merge(left, right, field, order);
  };
  
  const merge = (left, right, field, order) => {
    const result = [];
    let i = 0;
    let j = 0;
  
    while (i < left.length && j < right.length) {
      const leftValue = field === 'date' ? new Date(left[i][field]).getTime() : left[i][field];
      const rightValue = field === 'date' ? new Date(right[j][field]).getTime() : right[j][field];
  
      const comparison = order === 'asc' ? leftValue <= rightValue : leftValue >= rightValue;
  
      if (comparison) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }
  
    return result.concat(left.slice(i)).concat(right.slice(j));
  };
  
  // Binary Search Implementation for date lookup
  export const binarySearchByDate = (arr, targetDate) => {
    // First sort by date
    const sortedArr = [...arr].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  
    let left = 0;
    let right = sortedArr.length - 1;
  
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const midDate = new Date(sortedArr[mid].date).toDateString();
      const target = new Date(targetDate).toDateString();
  
      if (midDate === target) {
        return sortedArr[mid];
      } else if (new Date(midDate) < new Date(target)) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  
    return null;
  };
  
  // Calculate statistics
  export const calculateStats = (logs) => {
    if (logs.length === 0) {
      return {
        avgTemperature: 0,
        maxTemperature: 0,
        minTemperature: 0,
        totalDays: 0,
      };
    }
  
    const temperatures = logs.map(log => log.temperature);
    const sum = temperatures.reduce((acc, temp) => acc + temp, 0);
  
    return {
      avgTemperature: Math.round((sum / logs.length) * 10) / 10,
      maxTemperature: Math.max(...temperatures),
      minTemperature: Math.min(...temperatures),
      totalDays: logs.length,
    };
  };
  
  // Filter data by date range
  export const filterByDateRange = (logs, startDate, endDate) => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
  
    return logs.filter(log => {
      const logDate = new Date(log.date).getTime();
      return logDate >= start && logDate <= end;
    });
  };
  
  // Filter by temperature threshold
  export const filterByTemperature = (logs, minTemp, maxTemp) => {
    return logs.filter(log => log.temperature >= minTemp && log.temperature <= maxTemp);
  };
  