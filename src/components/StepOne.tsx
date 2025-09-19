import { useState } from 'react';
import { ChevronLeft, ArrowRight, AlertCircle } from 'lucide-react';
import type { UserVibe, ValidationError } from '../types';
import { validator } from '../utils/validation';

interface StepOneProps {
  userVibe: UserVibe;
  updateUserVibe: (updates: Partial<UserVibe>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const StepOne = ({
  userVibe,
  updateUserVibe,
  onNext,
  onBack,
}: StepOneProps) => {
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const destinationTypes = [
    { id: 'beaches', name: 'Beaches', image: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop', icon: '🏖️' },
    { id: 'mountains', name: 'Mountains', image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop', icon: '🏔️' },
    { id: 'cities', name: 'Cities', image: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop', icon: '🏙️' },
    { id: 'countryside', name: 'Countryside', image: 'https://images.pexels.com/photos/1482193/pexels-photo-1482193.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop', icon: '🌾' },
    { id: 'desert', name: 'Desert', image: 'https://images.pexels.com/photos/33101/sahara-sahara-desert-desert-dunes.jpg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop', icon: '🏜️' },
    { id: 'islands', name: 'Islands', image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop', icon: '🏝️' }
  ];

  const getError = (field: string) => errors.find(error => error.field === field);

  const handleNext = () => {
    const validation = validator.validateUserVibe(userVibe);
    setErrors(validation.errors);
    
    if (validation.isValid) {
      onNext();
    }
  };

  const isComplete = userVibe.age > 0 && userVibe.gender && userVibe.preferredDestinationType;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Mobile and Desktop Layout */}
      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        {/* Hero Section - Top on mobile, Left on desktop */}
        <div className="relative flex-1 lg:flex-1">
          {/* Hero Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)'
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40" />
          </div>
          
          <div className="relative z-10 flex flex-col justify-center px-6 sm:px-8 lg:px-16 py-12 lg:py-0 min-h-[40vh] lg:min-h-screen">
            <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
              <div className="mb-8 lg:mb-12">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 lg:mb-8 leading-tight">
                  Get your trips 
                  <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    perfectly tuned
                  </span>
                </h1>
                <div className="space-y-4">
                  <p className="text-xl sm:text-2xl lg:text-3xl text-white font-light opacity-95 leading-relaxed">
                    Your next adventure, 
                    <span className="font-medium text-blue-200"> perfectly planned</span>
                  </p>
                  <div className="flex flex-col sm:flex-row items-center lg:items-start gap-3 sm:gap-6 text-white opacity-80">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <span className="text-sm sm:text-base">AI-Powered Recommendations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                      <span className="text-sm sm:text-base">Personalized Experiences</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                      <span className="text-sm sm:text-base">Style & Packing Guide</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section - Bottom on mobile, Right on desktop */}
        <div className="flex-1 bg-white bg-opacity-95 backdrop-blur-sm p-4 sm:p-8 lg:p-12 flex flex-col justify-start lg:justify-center overflow-y-auto">
          <div className="max-w-md mx-auto w-full py-4 lg:py-0">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Tell us about yourself
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Help us personalize your perfect travel experience
              </p>
            </div>

            {/* Back Button */}
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
            >
              <ChevronLeft size={20} />
              <span>Back to Persona</span>
            </button>

            {/* Age Input */}
            <div className="mb-8">
              <label className="block text-lg font-medium text-gray-700 mb-3">
                What's your age?
              </label>
              <input
                type="number"
                value={userVibe.age || ''}
                onChange={(e) => updateUserVibe({ age: parseInt(e.target.value) || 0 })}
                className={`w-full px-4 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  getError('age') ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your age"
                min="1"
                max="120"
              />
              {getError('age') && (
                <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                  <AlertCircle size={16} />
                  <span>{getError('age')?.message}</span>
                </div>
              )}
            </div>

            {/* Gender Selection */}
            <div className="mb-8">
              <label className="block text-lg font-medium text-gray-700 mb-4">
                Gender
              </label>
              <div className="flex gap-4">
                {['male', 'female', 'other'].map((gender) => (
                  <button
                    key={gender}
                    onClick={() => updateUserVibe({ gender: gender as any })}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all duration-200 ${
                      userVibe.gender === gender
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : `border-gray-300 hover:border-gray-400 text-gray-700 ${
                          getError('gender') ? 'border-red-300' : ''
                        }`
                    }`}
                  >
                    {gender.charAt(0).toUpperCase() + gender.slice(1)}
                  </button>
                ))}
              </div>
              {getError('gender') && (
                <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                  <AlertCircle size={16} />
                  <span>{getError('gender')?.message}</span>
                </div>
              )}
            </div>

            {/* Destination Preference */}
            <div className="mb-8">
              <label className="block text-lg font-medium text-gray-700 mb-4">
                What type of destination do you prefer?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 max-h-96 overflow-y-auto">
                {destinationTypes.map((type) => (
                  <div
                    key={type.id}
                    onClick={() => updateUserVibe({ preferredDestinationType: type.id as any })}
                    className={`relative cursor-pointer rounded-lg overflow-hidden transition-all duration-200 transform hover:scale-105 ${
                      userVibe.preferredDestinationType === type.id
                        ? 'ring-4 ring-blue-500 ring-opacity-50'
                        : 'hover:shadow-lg'
                    }`}
                  >
                    <div
                      className="h-20 sm:h-24 bg-cover bg-center"
                      style={{ backgroundImage: `url(${type.image})` }}
                    >
                      <div className={`absolute inset-0 bg-black transition-opacity ${
                        userVibe.preferredDestinationType === type.id ? 'bg-opacity-20' : 'bg-opacity-40'
                      }`} />
                    </div>
                    <div className={`absolute inset-0 flex flex-col items-center justify-center text-white ${
                      userVibe.preferredDestinationType === type.id ? 'bg-blue-500 bg-opacity-80' : ''
                    }`}>
                      <span className="text-xl sm:text-2xl mb-1">{type.icon}</span>
                      <span className="font-semibold text-xs sm:text-sm">{type.name}</span>
                    </div>
                  </div>
                ))}
              </div>
              {getError('preferredDestinationType') && (
                <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                  <AlertCircle size={16} />
                  <span>{getError('preferredDestinationType')?.message}</span>
                </div>
              )}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={!isComplete}
              className={`w-full py-4 px-6 text-lg font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                isComplete
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continue to Trip Planning
              <ArrowRight size={20} />
            </button>

            {/* Progress Indicator */}
            <div className="mt-6 text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Step 2 of 6</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};