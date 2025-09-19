import { useState } from 'react';
import { PersonaSelection } from './components/PersonaSelection';
import { StepOne } from './components/StepOne';
import { StepTwoEnhanced } from './components/StepTwoEnhanced';
import { RecommendationResults } from './components/RecommendationsResults';
import { PackingResults } from './components/PackingResults';
import { StyleRecommendations } from './components/StyleRecommendations';
import { TripSummary } from './components/TripSummary';
import { generateTripRecommendation, generatePackingRecommendation } from './services/gemini';
import { generateStyleRecommendation } from './services/style';
import type { TripPlan, TripRecommendation, UserVibe, PackingRecommendation, UserPersona, StyleRecommendation } from './types';
import { DEFAULT_FROM_LOCATION } from './data/constants';

type Step = 'persona' | 'vibe' | 'planning' | 'results' | 'packing' | 'style' | 'summary';

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('persona');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [userVibe, setUserVibe] = useState<UserVibe>({
    age: 0,
    gender: 'male',
    preferredDestinationType: 'beaches',
    persona: undefined,
  });

  const [tripPlan, setTripPlan] = useState<TripPlan>({
    destination: '',
    fromLocation: DEFAULT_FROM_LOCATION.displayName,
    startDate: null,
    endDate: null,
    companions: 'solo',
    vibes: [],
  });

  const [recommendation, setRecommendation] = useState<TripRecommendation | null>(null);
  const [packingRecommendation, setPackingRecommendation] = useState<PackingRecommendation | null>(null);
  const [styleRecommendation, setStyleRecommendation] = useState<StyleRecommendation | null>(null);
  const [isGeneratingPacking, setIsGeneratingPacking] = useState(false);
  const [isGeneratingStyle, setIsGeneratingStyle] = useState(false);

  const updateUserVibe = (updates: Partial<UserVibe>) => {
    setUserVibe((prev: UserVibe) => ({ ...prev, ...updates }));
  };

  const updateTripPlan = (updates: Partial<TripPlan>) => {
    setTripPlan((prev: TripPlan) => ({ ...prev, ...updates }));
  };

  const handlePersonaSelect = (persona: UserPersona) => {
    setUserVibe((prev: UserVibe) => ({ ...prev, persona }));
  };

  const handlePersonaNext = () => {
    setCurrentStep('vibe');
  };

  const handleVibeNext = () => {
    setCurrentStep('planning');
  };

  const handleVibeBack = () => {
    setCurrentStep('persona');
  };

  const handlePlanningBack = () => {
    setCurrentStep('vibe');
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const result = await generateTripRecommendation(userVibe, tripPlan);
      setRecommendation(result);
      setCurrentStep('results');
    } catch (error) {
      console.error('Failed to generate recommendation:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGeneratePacking = async () => {
    setIsGeneratingPacking(true);
    try {
      const primaryVibe = tripPlan.vibes.length > 0 ? tripPlan.vibes[0] : 'adventure';
      const result = await generatePackingRecommendation(
        tripPlan.destination,
        tripPlan.startDate,
        tripPlan.endDate,
        primaryVibe,
        userVibe,
        tripPlan.fromLocation
      );
      setPackingRecommendation(result);
      setCurrentStep('packing');
    } catch (error) {
      console.error('Failed to generate packing recommendation:', error);
    } finally {
      setIsGeneratingPacking(false);
    }
  };

  const handleBackFromPacking = () => {
    setCurrentStep('results');
  };

  const handleGenerateStyle = async () => {
    setIsGeneratingStyle(true);
    try {
      const result = await generateStyleRecommendation(userVibe, tripPlan);
      setStyleRecommendation(result);
      setCurrentStep('style');
    } catch (error) {
      console.error('Failed to generate style recommendation:', error);
    } finally {
      setIsGeneratingStyle(false);
    }
  };

  const handleBackFromStyle = () => {
    setCurrentStep('packing');
  };

  const handleStyleComplete = () => {
    console.log('🎉 Style journey completed! Showing summary...');
    setCurrentStep('summary');
  };

  const handlePlanAnotherTrip = () => {
    console.log('🔄 Starting new trip planning journey!');
    // Reset entire app state
    setCurrentStep('persona');
    setUserVibe({
      age: 0,
      gender: 'male',
      preferredDestinationType: 'beaches',
      persona: undefined,
    });
    setTripPlan({
      destination: '',
      fromLocation: DEFAULT_FROM_LOCATION.displayName,
      startDate: null,
      endDate: null,
      companions: 'solo',
      vibes: [],
    });
    setRecommendation(null);
    setPackingRecommendation(null);
    setStyleRecommendation(null);
    setIsGenerating(false);
    setIsGeneratingPacking(false);
    setIsGeneratingStyle(false);
  };

  const handleStartOver = () => {
    setCurrentStep('persona');
    setUserVibe({
      age: 0,
      gender: 'male',
      preferredDestinationType: 'beaches',
      persona: undefined,
    });
    setTripPlan({
      destination: '',
      fromLocation: DEFAULT_FROM_LOCATION.displayName,
      startDate: null,
      endDate: null,
      companions: 'solo',
      vibes: [],
    });
    setRecommendation(null);
    setPackingRecommendation(null);
    setStyleRecommendation(null);
  };

  return (
    <div className="App">
      {currentStep === 'persona' && (
        <PersonaSelection
          selectedPersona={userVibe.persona}
          onPersonaSelect={handlePersonaSelect}
          onNext={handlePersonaNext}
        />
      )}

      {currentStep === 'vibe' && (
        <StepOne
          userVibe={userVibe}
          updateUserVibe={updateUserVibe}
          onNext={handleVibeNext}
          onBack={handleVibeBack}
        />
      )}
      
      {currentStep === 'planning' && (
        <StepTwoEnhanced
          userVibe={userVibe}
          tripPlan={tripPlan}
          updateTripPlan={updateTripPlan}
          onBack={handlePlanningBack}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
        />
      )}
      
      {currentStep === 'results' && recommendation && (
        <RecommendationResults
          userVibe={userVibe}
          tripPlan={tripPlan}
          recommendation={recommendation}
          onStartOver={handleStartOver}
          onGeneratePacking={handleGeneratePacking}
          isGeneratingPacking={isGeneratingPacking}
        />
      )}
      
      {currentStep === 'packing' && packingRecommendation && (
        <PackingResults
          packingRecommendation={packingRecommendation}
          tripPlan={tripPlan}
          userVibe={userVibe}
          onBack={handleBackFromPacking}
          onGenerateStyle={handleGenerateStyle}
          isGeneratingStyle={isGeneratingStyle}
        />
      )}
      
      {currentStep === 'style' && styleRecommendation && (
        <StyleRecommendations
          styleRecommendation={styleRecommendation}
          tripPlan={tripPlan}
          userVibe={userVibe}
          onBack={handleBackFromStyle}
          onComplete={handleStyleComplete}
          onPlanAnother={handlePlanAnotherTrip}
        />
      )}
      
      {currentStep === 'summary' && recommendation && packingRecommendation && styleRecommendation && (
        <TripSummary
          userVibe={userVibe}
          tripPlan={tripPlan}
          tripRecommendation={recommendation}
          packingRecommendation={packingRecommendation}
          styleRecommendation={styleRecommendation}
          onPlanAnother={handlePlanAnotherTrip}
        />
      )}
    </div>
  );
}

export default App;