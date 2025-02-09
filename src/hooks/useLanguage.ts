import { useState } from 'react';

export const useLanguage = () => {
  // For now, we'll use a simple state. Later this can be connected to your app's language management system
  const [isArabic, setIsArabic] = useState(true);

  return {
    isArabic,
    setIsArabic,
  };
}; 