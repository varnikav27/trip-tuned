// Weather integration service
export interface WeatherData {
  temperature: {
    min: number;
    max: number;
    unit: string;
  };
  condition: string;
  humidity: number;
  precipitation: number;
  windSpeed: number;
  description: string;
  icon: string;
}

export interface WeatherForecast {
  destination: string;
  startDate: string;
  endDate: string;
  currentWeather: WeatherData;
  forecast: WeatherData[];
  recommendations: string[];
}

// Mock weather data for demonstration (replace with real API)
const mockWeatherData: Record<string, WeatherData> = {
  'paris': {
    temperature: { min: 15, max: 22, unit: '°C' },
    condition: 'Partly Cloudy',
    humidity: 65,
    precipitation: 20,
    windSpeed: 15,
    description: 'Mild autumn weather with occasional light showers',
    icon: '⛅'
  },
  'tokyo': {
    temperature: { min: 18, max: 25, unit: '°C' },
    condition: 'Clear',
    humidity: 70,
    precipitation: 5,
    windSpeed: 10,
    description: 'Pleasant spring weather with clear skies',
    icon: '☀️'
  },
  'bali': {
    temperature: { min: 24, max: 32, unit: '°C' },
    condition: 'Tropical',
    humidity: 80,
    precipitation: 60,
    windSpeed: 12,
    description: 'Warm tropical climate with afternoon showers',
    icon: '🌴'
  },
  'new york': {
    temperature: { min: 10, max: 18, unit: '°C' },
    condition: 'Cool',
    humidity: 55,
    precipitation: 30,
    windSpeed: 20,
    description: 'Cool autumn weather with crisp air',
    icon: '🍂'
  },
  'dubai': {
    temperature: { min: 25, max: 35, unit: '°C' },
    condition: 'Hot & Dry',
    humidity: 45,
    precipitation: 5,
    windSpeed: 8,
    description: 'Hot desert climate with minimal rainfall',
    icon: '🏜️'
  }
};

export const getWeatherForecast = async (
  destination: string,
  startDate: Date | null,
  endDate: Date | null
): Promise<WeatherForecast> => {
  console.log('🌤️ Fetching weather forecast for:', destination);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const destinationKey = destination.toLowerCase();
  const defaultWeather: WeatherData = {
    temperature: { min: 20, max: 28, unit: '°C' },
    condition: 'Pleasant',
    humidity: 60,
    precipitation: 15,
    windSpeed: 12,
    description: 'Comfortable weather conditions',
    icon: '🌤️'
  };
  
  const weather = mockWeatherData[destinationKey] || defaultWeather;
  
  // Generate forecast for trip duration
  const forecast: WeatherData[] = [];
  const tripDays = startDate && endDate ? 
    Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) : 7;
  
  for (let i = 0; i < Math.min(tripDays, 7); i++) {
    forecast.push({
      ...weather,
      temperature: {
        ...weather.temperature,
        min: weather.temperature.min + Math.floor(Math.random() * 6) - 3,
        max: weather.temperature.max + Math.floor(Math.random() * 6) - 3,
      }
    });
  }
  
  // Generate weather-based recommendations
  const recommendations = generateWeatherRecommendations(weather);
  
  console.log('✅ Weather forecast generated:', {
    destination,
    condition: weather.condition,
    temperature: `${weather.temperature.min}-${weather.temperature.max}${weather.temperature.unit}`,
    recommendations: recommendations.length
  });
  
  return {
    destination,
    startDate: startDate?.toISOString().split('T')[0] || '',
    endDate: endDate?.toISOString().split('T')[0] || '',
    currentWeather: weather,
    forecast,
    recommendations
  };
};

const generateWeatherRecommendations = (weather: WeatherData): string[] => {
  const recommendations: string[] = [];
  
  // Temperature-based recommendations
  if (weather.temperature.max > 30) {
    recommendations.push('Pack lightweight, breathable fabrics');
    recommendations.push('Bring sun protection (hat, sunglasses, sunscreen)');
    recommendations.push('Consider cooling accessories like a fan');
  } else if (weather.temperature.min < 10) {
    recommendations.push('Pack warm layers and a heavy coat');
    recommendations.push('Bring thermal underwear for extra warmth');
    recommendations.push('Don\'t forget warm accessories (gloves, scarf, hat)');
  } else {
    recommendations.push('Pack versatile layers for changing temperatures');
    recommendations.push('Bring a light jacket for cooler evenings');
  }
  
  // Precipitation-based recommendations
  if (weather.precipitation > 50) {
    recommendations.push('Pack a reliable rain jacket and umbrella');
    recommendations.push('Bring waterproof shoes or boots');
    recommendations.push('Consider quick-dry clothing materials');
  } else if (weather.precipitation > 20) {
    recommendations.push('Bring a light rain jacket just in case');
    recommendations.push('Pack an compact umbrella');
  }
  
  // Humidity-based recommendations
  if (weather.humidity > 70) {
    recommendations.push('Choose moisture-wicking fabrics');
    recommendations.push('Pack extra underwear and socks');
    recommendations.push('Consider anti-bacterial clothing sprays');
  }
  
  // Wind-based recommendations
  if (weather.windSpeed > 25) {
    recommendations.push('Avoid loose-fitting clothing that may flap');
    recommendations.push('Secure any hats or accessories');
    recommendations.push('Consider windproof outer layers');
  }
  
  return recommendations;
};
