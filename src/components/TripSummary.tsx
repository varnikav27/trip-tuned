import { 
  CheckCircle, 
  Download, 
  Share2, 
  ShoppingBag, 
  Calendar, 
  MapPin, 
  Plane, 
  Hotel,
  Mail,
  RotateCcw,
  ExternalLink,
  Star
} from 'lucide-react';
import type { TripPlan, TripRecommendation, PackingRecommendation, StyleRecommendation, UserVibe } from '../types';
import { Header } from './Header';

interface TripSummaryProps {
  userVibe: UserVibe;
  tripPlan: TripPlan;
  tripRecommendation: TripRecommendation;
  packingRecommendation: PackingRecommendation;
  styleRecommendation: StyleRecommendation;
  onPlanAnother: () => void;
}

export const TripSummary = ({
  userVibe,
  tripPlan,
  tripRecommendation,
  packingRecommendation,
  styleRecommendation,
  onPlanAnother,
}: TripSummaryProps) => {
  const formatDate = (date: Date | null) => {
    if (!date) return 'Date TBD';
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const handleDownloadSummary = () => {
    // In a real app, this would generate a PDF
    console.log('📄 Downloading trip summary...');
    alert('Trip summary would be downloaded as PDF');
  };

  const handleEmailSummary = () => {
    // In a real app, this would send an email
    console.log('📧 Emailing trip summary...');
    alert('Trip summary would be emailed to you');
  };

  const handleShareTrip = () => {
    // In a real app, this would open share dialog
    console.log('📱 Sharing trip...');
    if (navigator.share) {
      navigator.share({
        title: `My ${tripPlan.destination} Trip Plan`,
        text: `Check out my personalized trip plan to ${tripPlan.destination}!`,
        url: window.location.href
      });
    } else {
      alert('Trip sharing link copied to clipboard!');
    }
  };

  const getTotalItems = () => {
    const packingItems = Object.values(packingRecommendation.clothing).flat().length + 
                        packingRecommendation.essentials.length;
    const styleItems = Object.values(styleRecommendation.looks).flat().length + 
                      styleRecommendation.accessories.length;
    return packingItems + styleItems;
  };

  const generateFlightSearchUrl = () => {
    const from = encodeURIComponent(tripPlan.fromLocation || 'Delhi, India');
    const to = encodeURIComponent(tripPlan.destination);
    
    // Format dates for Google Flights (YYYY-MM-DD)
    const departureDate = tripPlan.startDate ? tripPlan.startDate.toISOString().split('T')[0] : '';
    const returnDate = tripPlan.endDate ? tripPlan.endDate.toISOString().split('T')[0] : '';
    
    // Build Google Flights URL with all parameters
    let flightUrl = `https://www.google.com/travel/flights?q=flights+from+${from}+to+${to}`;
    
    if (departureDate) {
      flightUrl += `&departure=${departureDate}`;
    }
    
    if (returnDate) {
      flightUrl += `&return=${returnDate}`;
    }
    
    // Add round trip parameter if we have both dates
    if (departureDate && returnDate) {
      flightUrl += `&type=2`; // Round trip
    } else if (departureDate) {
      flightUrl += `&type=1`; // One way
    }
    
    return flightUrl;
  };

  const generateHotelSearchUrl = () => {
    const destination = encodeURIComponent(tripPlan.destination);
    
    // Format dates for Google Hotels (YYYY-MM-DD)
    const checkIn = tripPlan.startDate ? tripPlan.startDate.toISOString().split('T')[0] : '';
    const checkOut = tripPlan.endDate ? tripPlan.endDate.toISOString().split('T')[0] : '';
    
    // Build Google Hotels URL with destination and dates
    let hotelUrl = `https://www.google.com/travel/hotels?q=hotels+in+${destination}`;
    
    if (checkIn) {
      hotelUrl += `&checkin=${checkIn}`;
    }
    
    if (checkOut) {
      hotelUrl += `&checkout=${checkOut}`;
    }
    
    // Add guest count (default to 1 adult)
    hotelUrl += `&adults=1`;
    
    return hotelUrl;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 relative">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex flex-col items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
              <CheckCircle className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                🎉 Your Trip is Ready!
              </h1>
              <p className="text-lg sm:text-xl text-gray-600">
                Complete personalized plan for {tripPlan.destination}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Trip Overview */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Trip Overview</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                <MapPin className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800">Destination</h3>
                <p className="text-sm text-gray-600">{tripPlan.destination}</p>
                <p className="text-xs text-gray-500">from {tripPlan.fromLocation}</p>
                {tripRecommendation.title && (
                  <p className="text-xs text-blue-600 mt-1 font-medium">{tripRecommendation.title}</p>
                )}
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                <Calendar className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800">Dates</h3>
                <p className="text-sm text-gray-600">{formatDate(tripPlan.startDate)}</p>
                <p className="text-xs text-gray-500">to {formatDate(tripPlan.endDate)}</p>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                <Star className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800">Style</h3>
                <p className="text-sm text-gray-600">{userVibe.persona?.name || 'Traveler'}</p>
                <p className="text-xs text-gray-500">{tripPlan.vibes.slice(0, 2).join(', ')}</p>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
                <ShoppingBag className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800">Items</h3>
                <p className="text-sm text-gray-600">{getTotalItems()} recommendations</p>
                <p className="text-xs text-gray-500">Packing + Style</p>
              </div>
            </div>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Save & Export */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Download className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-800">Save Your Plan</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Download or email your complete trip recommendations
              </p>
              <div className="space-y-2">
                <button
                  onClick={handleDownloadSummary}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Download PDF
                </button>
                <button
                  onClick={handleEmailSummary}
                  className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                >
                  <Mail size={16} />
                  Email Summary
                </button>
              </div>
            </div>

            {/* Share Trip */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Share2 className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-800">Share & Inspire</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Share your trip plan with friends and family
              </p>
              <button
                onClick={handleShareTrip}
                className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                Share Trip Plan
              </button>
            </div>

            {/* Book Your Trip */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Plane className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-800">Book Your Trip</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Ready to book? Find the best deals on flights and hotels
              </p>
              <div className="space-y-2">
                <a
                  href={generateFlightSearchUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                >
                  Find Flights
                  <ExternalLink size={14} />
                </a>
                <a
                  href={generateHotelSearchUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                >
                  <Hotel size={16} />
                  Find Hotels
                </a>
              </div>
            </div>
          </div>

          {/* Shopping Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-orange-500" />
              Shop Your Style
            </h3>
            <p className="text-gray-600 mb-6">
              Get the recommended items for your {tripPlan.destination} adventure
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {packingRecommendation.shopTheLook.slice(0, 3).map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-gray-800 mb-1">{item.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-green-600">{item.price}</span>
                    <button className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full hover:bg-orange-200 transition-colors">
                      Shop Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Start Over */}
          <div className="text-center">
            <button
              onClick={onPlanAnother}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <RotateCcw size={20} />
              Plan Another Trip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
