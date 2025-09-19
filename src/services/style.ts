import type { StyleRecommendation, UserVibe, TripPlan } from '../types';
import { getWeatherForecast } from './weather';

export const generateStyleRecommendation = async (
  userVibe: UserVibe,
  tripPlan: TripPlan
): Promise<StyleRecommendation> => {
  console.log('👗 Generating style recommendations...');
  console.log('👤 User Persona:', userVibe.persona?.name);
  console.log('📍 Destination:', tripPlan.destination);
  console.log('🎯 Vibes:', tripPlan.vibes);

  // Get weather data to inform style choices
  const weatherForecast = await getWeatherForecast(
    tripPlan.destination,
    tripPlan.startDate,
    tripPlan.endDate
  );

  // Base style themes based on persona and destination
  const styleThemes = {
    'the-adventurer': 'Rugged Explorer Chic',
    'the-luxury-seeker': 'Sophisticated Elegance',
    'the-culture-enthusiast': 'Cultured Minimalist',
    'the-foodie': 'Casual Cosmopolitan',
    'the-wellness-traveler': 'Zen Comfort',
    'the-budget-backpacker': 'Smart Casual',
    'the-photographer': 'Creative Professional',
    'the-social-butterfly': 'Trendy Social'
  };

  const theme = userVibe.persona ? 
    styleThemes[userVibe.persona.id as keyof typeof styleThemes] || 'Modern Traveler' :
    'Modern Traveler';

  // Generate color palette based on destination and weather
  const colorPalettes = {
    tropical: ['#87CEEB', '#F0E68C', '#FFB6C1', '#98FB98', '#FFF8DC'],
    urban: ['#2F4F4F', '#696969', '#D3D3D3', '#000000', '#FFFFFF'],
    cultural: ['#8B4513', '#DAA520', '#CD853F', '#F5DEB3', '#FFFAF0'],
    adventure: ['#228B22', '#8B4513', '#556B2F', '#A0522D', '#F5F5DC'],
    luxury: ['#000000', '#FFFFFF', '#FFD700', '#C0C0C0', '#4B0082']
  };

  // Determine palette based on vibes and destination
  let selectedPalette = colorPalettes.urban;
  if (tripPlan.vibes.includes('tropical') || tripPlan.vibes.includes('beach')) {
    selectedPalette = colorPalettes.tropical;
  } else if (tripPlan.vibes.includes('cultural') || tripPlan.vibes.includes('historic')) {
    selectedPalette = colorPalettes.cultural;
  } else if (tripPlan.vibes.includes('adventure') || tripPlan.vibes.includes('outdoor')) {
    selectedPalette = colorPalettes.adventure;
  } else if (tripPlan.vibes.includes('luxury') || tripPlan.vibes.includes('romantic')) {
    selectedPalette = colorPalettes.luxury;
  }

  // Generate style items based on weather and persona
  const isWarm = weatherForecast.currentWeather.temperature.max > 25;
  const isCold = weatherForecast.currentWeather.temperature.min < 15;
  const isRainy = weatherForecast.currentWeather.precipitation > 30;

  const dayLookItems = [
    {
      item: isWarm ? 'Linen Button-Down Shirt' : 'Merino Wool Sweater',
      description: isWarm ? 
        'Breathable and comfortable for warm weather exploration' :
        'Soft, temperature-regulating for comfortable sightseeing',
      category: 'casual' as const,
      price: '$85',
      image: isWarm ? 
        'https://images.unsplash.com/photo-1564557287817-3785e38ec1c5?w=400&h=400&fit=crop' :
        'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=400&fit=crop'
    },
    {
      item: isWarm ? 'Comfortable Chino Shorts' : 'Dark Wash Jeans',
      description: isWarm ?
        'Versatile shorts perfect for walking and casual dining' :
        'Classic fit jeans that work for most activities',
      category: 'casual' as const,
      price: '$65',
      image: isWarm ?
        'https://images.unsplash.com/photo-1555689547-1d1492f5c2bd?w=400&h=400&fit=crop' :
        'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop'
    },
    {
      item: 'Comfortable Walking Sneakers',
      description: 'Supportive shoes for all-day exploration and sightseeing',
      category: 'sporty' as const,
      price: '$120',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop'
    }
  ];

  const eveningLookItems = [
    {
      item: userVibe.gender === 'female' ? 'Midi Wrap Dress' : 'Collared Polo Shirt',
      description: userVibe.gender === 'female' ?
        'Elegant yet comfortable dress perfect for dinner out' :
        'Smart casual shirt suitable for restaurants and bars',
      category: 'formal' as const,
      price: '$95',
      image: userVibe.gender === 'female' ?
        'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop' :
        'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop'
    },
    {
      item: userVibe.gender === 'female' ? 'Block Heel Sandals' : 'Leather Loafers',
      description: userVibe.gender === 'female' ?
        'Stylish sandals that are comfortable for walking' :
        'Classic shoes that work from day to evening',
      category: 'formal' as const,
      price: '$110',
      image: userVibe.gender === 'female' ?
        'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop' :
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop'
    },
    {
      item: 'Lightweight Blazer',
      description: 'Perfect for elevating any outfit and handling air conditioning',
      category: 'classic' as const,
      price: '$130',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop'
    }
  ];

  const activityLookItems = [
    {
      item: isWarm ? 'Moisture-Wicking Tank Top' : 'Technical Long Sleeve',
      description: isWarm ?
        'Breathable top for outdoor activities and sports' :
        'Temperature-regulating shirt for active pursuits',
      category: 'sporty' as const,
      price: '$45',
      image: isWarm ?
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop' :
        'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop'
    },
    {
      item: 'Quick-Dry Hiking Pants',
      description: 'Versatile pants perfect for adventures and outdoor activities',
      category: 'sporty' as const,
      price: '$75',
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop'
    },
    {
      item: 'Outdoor Adventure Shoes',
      description: 'Durable footwear for hiking, walking, and outdoor exploration',
      category: 'sporty' as const,
      price: '$140',
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=400&h=400&fit=crop'
    }
  ];

  const accessories = [
    {
      item: isWarm ? 'Sun Hat' : 'Warm Beanie',
      description: isWarm ?
        'Stylish protection from sun with wide brim' :
        'Cozy knit hat to keep warm in cool weather',
      category: 'classic' as const,
      price: '$35',
      image: isWarm ?
        'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400&h=400&fit=crop' :
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop'
    },
    {
      item: 'Crossbody Travel Bag',
      description: 'Secure, hands-free bag perfect for sightseeing and shopping',
      category: 'casual' as const,
      price: '$85',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop'
    },
    {
      item: 'Polarized Sunglasses',
      description: 'UV protection with style for bright days and outdoor activities',
      category: 'trendy' as const,
      price: '$120',
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop'
    },
    {
      item: isRainy ? 'Compact Travel Umbrella' : 'Lightweight Scarf',
      description: isRainy ?
        'Portable umbrella for unexpected weather changes' :
        'Versatile accessory for style and warmth',
      category: 'classic' as const,
      price: '$25',
      image: isRainy ?
        'https://images.unsplash.com/photo-1541411321242-38d81dbf98fb?w=400&h=400&fit=crop' :
        'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=400&fit=crop'
    }
  ];

  const description = `A curated collection designed for your ${tripPlan.destination} adventure. 
    This ${theme.toLowerCase()} aesthetic combines comfort with style, perfectly suited for 
    ${weatherForecast.currentWeather.description.toLowerCase()} and your planned activities. 
    Each piece is chosen to complement your ${userVibe.persona?.name.toLowerCase() || 'travel'} style 
    while ensuring you look and feel great throughout your journey.`;

  const styleRecommendation: StyleRecommendation = {
    theme,
    description,
    looks: {
      "Day Look": dayLookItems,
      "Evening Look": eveningLookItems,
      "Activity Look": activityLookItems
    },
    accessories,
    colorPalette: selectedPalette
  };

  console.log('✅ Style recommendations generated:', {
    theme,
    totalItems: Object.values(styleRecommendation.looks).flat().length + accessories.length,
    colorPalette: selectedPalette.length,
    weather: weatherForecast.currentWeather.condition
  });

  return styleRecommendation;
};
