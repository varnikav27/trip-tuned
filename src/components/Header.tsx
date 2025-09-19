import React from 'react';

interface HeaderProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ 
  variant = 'light',
  className = ''
}) => {
  return (
    <div className={`absolute top-4 left-4 sm:top-6 sm:left-6 z-50 ${className}`}>
      <div className="flex items-center gap-3 bg-white bg-opacity-95 backdrop-blur-sm rounded-xl px-3 sm:px-4 py-2 sm:py-3 shadow-lg border border-white border-opacity-20">
        <img 
          src="/logo-red.svg" 
          alt="TripTuned Logo" 
          className="h-6 sm:h-8"
        />
      </div>
    </div>
  );
};
