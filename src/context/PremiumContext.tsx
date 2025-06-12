'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface PremiumContextType {
  isPremium: boolean;
  showUpgradeModal: boolean;
  setShowUpgradeModal: (show: boolean) => void;
  upgradeToPremium: () => void;
  checkPremiumAccess: (feature: string) => boolean;
  premiumFeatures: string[];
}

const PremiumContext = createContext<PremiumContextType | undefined>(undefined);

export const usePremium = () => {
  const context = useContext(PremiumContext);
  if (context === undefined) {
    throw new Error('usePremium must be used within a PremiumProvider');
  }
  return context;
};

interface PremiumProviderProps {
  children: React.ReactNode;
}

export const PremiumProvider: React.FC<PremiumProviderProps> = ({ children }) => {
  const [isPremium, setIsPremium] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Premium features list
  const premiumFeatures = [
    'creative-template',
    'custom-colors',
    'advanced-export',
    'ai-suggestions',
    'unlimited-downloads'
  ];

  // Load premium status from localStorage
  useEffect(() => {
    const savedPremiumStatus = localStorage.getItem('isPremium');
    if (savedPremiumStatus === 'true') {
      setIsPremium(true);
    }
  }, []);

  // Save premium status to localStorage
  useEffect(() => {
    localStorage.setItem('isPremium', isPremium.toString());
  }, [isPremium]);

  const upgradeToPremium = () => {
    // In a real app, this would integrate with a payment system
    // For demo purposes, we'll just set premium to true
    setIsPremium(true);
    setShowUpgradeModal(false);
    
    // Show success message
    alert('🎉 Welcome to Premium! You now have access to all premium features.');
  };

  const checkPremiumAccess = (feature: string): boolean => {
    if (isPremium) return true;
    return !premiumFeatures.includes(feature);
  };

  const value: PremiumContextType = {
    isPremium,
    showUpgradeModal,
    setShowUpgradeModal,
    upgradeToPremium,
    checkPremiumAccess,
    premiumFeatures
  };

  return (
    <PremiumContext.Provider value={value}>
      {children}
    </PremiumContext.Provider>
  );
}; 