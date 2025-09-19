import { useState } from 'react';
import { ChevronLeft, Sparkles, Palette, ShoppingBag, Heart, Star, ArrowRight, RotateCcw } from 'lucide-react';
import type { StyleRecommendation, TripPlan, UserVibe } from '../types';
import { Header } from './Header';

interface StyleRecommendationsProps {
  styleRecommendation: StyleRecommendation;
  tripPlan: TripPlan;
  userVibe: UserVibe;
  onBack: () => void;
  onComplete: () => void;
  onPlanAnother: () => void;
}

export const StyleRecommendations = ({
  styleRecommendation,
  tripPlan,
  userVibe,
  onBack,
  onComplete,
  onPlanAnother,
}: StyleRecommendationsProps) => {
  const [selectedLook, setSelectedLook] = useState<'Day Look' | 'Evening Look' | 'Activity Look'>('Day Look');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (itemName: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(itemName)) {
      newFavorites.delete(itemName);
    } else {
      newFavorites.add(itemName);
    }
    setFavorites(newFavorites);
  };

  const lookOptions = ['Day Look', 'Evening Look', 'Activity Look'] as const;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 relative">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-4">
            <Sparkles className="text-purple-600" size={32} />
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
              Your Style Recommendations
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Curated fashion suggestions perfect for your {tripPlan.destination} adventure
          </p>
        </div>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <ChevronLeft size={20} />
          <span>Back to Packing List</span>
        </button>

        <div className="max-w-6xl mx-auto">
          {/* Theme Section */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 mb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
              <div className="p-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl">
                <Palette className="text-purple-600" size={32} />
              </div>
              <div className="text-center sm:text-left flex-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                  {styleRecommendation.theme}
                </h2>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  {styleRecommendation.description}
                </p>
              </div>
            </div>

            {/* Color Palette */}
            <div className="mt-6 sm:mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recommended Color Palette</h3>
              <div className="flex flex-wrap gap-2 sm:gap-4">
                {styleRecommendation.colorPalette.map((color, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white shadow-md"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-sm font-medium text-gray-700 capitalize">{color}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Look Selection */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Style Looks</h3>
            
            {/* Look Tabs */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-8">
              {lookOptions.map((look) => (
                <button
                  key={look}
                  onClick={() => setSelectedLook(look)}
                  className={`px-4 sm:px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex-1 ${
                    selectedLook === look
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {look}
                </button>
              ))}
            </div>

            {/* Selected Look Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {styleRecommendation.looks[selectedLook]?.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-4 sm:p-6 relative group hover:shadow-lg transition-all duration-300">
                  <button
                    onClick={() => toggleFavorite(item.item)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <Heart 
                      size={18}
                      className={favorites.has(item.item) ? 'text-red-500 fill-current' : 'text-gray-400'}
                    />
                  </button>

                  <div className="mb-4">
                    <div className="w-full h-32 sm:h-40 bg-gray-100 rounded-lg overflow-hidden mb-3">
                      <img 
                        src={item.image} 
                        alt={item.item}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          // Fallback to placeholder if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLDivElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center" style={{display: 'none'}}>
                        <ShoppingBag className="text-purple-400" size={32} />
                      </div>
                    </div>
                    <h4 className="font-bold text-gray-800 text-base sm:text-lg mb-2">{item.item}</h4>
                    <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.category === 'casual' ? 'bg-blue-100 text-blue-800' :
                        item.category === 'formal' ? 'bg-gray-100 text-gray-800' :
                        item.category === 'sporty' ? 'bg-green-100 text-green-800' :
                        item.category === 'trendy' ? 'bg-pink-100 text-pink-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {item.category}
                      </span>
                      <span className="font-bold text-purple-600">{item.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Accessories Section */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Essential Accessories</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {styleRecommendation.accessories.map((accessory, index) => (
                <div key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 text-center group hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Star className="text-purple-500" size={24} />
                  </div>
                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base mb-2">{accessory.item}</h4>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2">{accessory.description}</p>
                  <span className="text-sm font-bold text-purple-600">{accessory.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Section */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg p-4 sm:p-8 text-white">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">Your Style Journey Complete! ✨</h3>
            <p className="text-sm sm:text-base opacity-90 mb-6">
              Amazing! You've completed your personalized style guide for {tripPlan.destination}. 
              Ready to plan your next adventure?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold">{Object.values(styleRecommendation.looks).flat().length}</div>
                <div className="text-sm sm:text-base opacity-90">Style Items</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold">{styleRecommendation.accessories.length}</div>
                <div className="text-sm sm:text-base opacity-90">Accessories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold">{favorites.size}</div>
                <div className="text-sm sm:text-base opacity-90">Favorites</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button
                onClick={onComplete}
                className="flex items-center justify-center gap-2 bg-white text-purple-600 px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                View Trip Summary
                <ArrowRight size={20} />
              </button>
              
              <button
                onClick={onPlanAnother}
                className="flex items-center justify-center gap-2 bg-white bg-opacity-20 text-white border-2 border-white border-opacity-40 px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold hover:bg-opacity-30 hover:border-opacity-60 transition-all duration-200 transform hover:scale-105 backdrop-blur-sm"
              >
                <RotateCcw size={20} className="animate-pulse" />
                Plan Another Trip
              </button>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="fixed bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2">
          <div className="bg-white rounded-full px-3 sm:px-4 py-2 shadow-lg border">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Step 6 of 6</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
