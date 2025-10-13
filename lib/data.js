const cities = [
    // Global cities
    'New York', 'London', 'Tokyo', 'Paris', 'Sydney', 'Berlin', 'Moscow',
    'Dubai', 'Singapore', 'Los Angeles', 'Toronto', 'Chicago', 'Madrid', 'Rome',
    'Seoul', 'Bangkok', 'Hong Kong', 'San Francisco', 'Barcelona', 'Amsterdam',
    // Indian cities
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 
    'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 
    'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna', 'Vadodara', 'Ghaziabad'
  ];
  
  const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy', 'Stormy', 'Foggy', 'Snowy'];
  
  export const generateMockWeatherData = (days = 30) => {
    const data = [];
    const today = new Date();
  
    for (let i = 0; i < days; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
  
      cities.forEach((city) => {
        const log = {
          id: `log-${i}-${city.replace(/\s+/g, '-')}`,
          date: date.toISOString().split('T')[0],
          city,
          temperature: Math.round((Math.random() * 30 + 10) * 10) / 10,
          humidity: Math.round(Math.random() * 40 + 40),
          pressure: Math.round((Math.random() * 40 + 980) * 10) / 10,
          condition: conditions[Math.floor(Math.random() * conditions.length)],
        };
        data.push(log);
      });
    }
  
    // Sort by most recent date
    return data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };
  
  // Example: generate 30 days × all cities
  export const mockWeatherData = generateMockWeatherData(30);
  