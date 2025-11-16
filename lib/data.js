
// 🌍 Expanded Global + Indian Cities (Recent, Popular, High-Demand)
const cities = [
  // Global major cities
  'New York', 'London', 'Tokyo', 'Paris', 'Sydney', 'Berlin', 'Moscow',
  'Dubai', 'Singapore', 'Los Angeles', 'Toronto', 'Chicago', 'Madrid',
  'Rome', 'Seoul', 'Bangkok', 'Hong Kong', 'San Francisco', 'Barcelona',
  'Amsterdam', 'Istanbul', 'Doha', 'Beijing', 'Shanghai', 'Melbourne',
  'Cape Town', 'São Paulo', 'Mexico City', 'Jakarta', 'Kuala Lumpur',
  'Zurich', 'Stockholm', 'Vienna', 'Dublin', 'Copenhagen',

  // New recent trending cities
  'Austin', 'Miami', 'Vancouver', 'Riyadh', 'Warsaw', 'Prague', 'Helsinki',

  // 🇮🇳 Indian cities (More + Tier 1/2/3)
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata',
  'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore',
  'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna',
  'Vadodara', 'Ghaziabad', 'Surat', 'Ranchi', 'Noida', 'Gurugram',
  'Chandigarh', 'Coimbatore', 'Kochi', 'Goa', 'Guwahati', 'Mysore',
  'Jodhpur', 'Agra', 'Varanasi'
];

// 🌤️ Expanded weather conditions
const conditions = [
  'Sunny', 'Cloudy', 'Rainy',  'Stormy'
, 'Snowy', 'Windy', 'Haze', 'Thunderstorm',
    'Humid', 'Dry'
];

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
        temperature: Math.round((Math.random() * 35 + 5) * 10) / 10, // 5°C–40°C
        humidity: Math.round(Math.random() * 50 + 30), // 30–80%
        pressure: Math.round((Math.random() * 50 + 970) * 10) / 10, // 970–1020 hPa
        condition: conditions[Math.floor(Math.random() * conditions.length)],
      };

      data.push(log);
    });
  }

  // Sort by latest date
  return data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// 📦 Example output generator
export const mockWeatherData = generateMockWeatherData(30);

  
