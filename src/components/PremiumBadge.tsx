'use client';

import React from 'react';
import { usePremium } from '@/context/PremiumContext';

interface PremiumBadgeProps {
  className?: string;
  showUpgradeButton?: boolean;
}

const PremiumBadge: React.FC<PremiumBadgeProps> = ({ 
  className = '', 
  showUpgradeButton = true 
}) => {
  const { isPremium, setShowUpgradeModal } = usePremium();

  if (isPremium) {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-accent-600 to-primary-600 text-white text-sm font-medium rounded-full ${className}`}>
        <span className="text-yellow-300">👑</span>
        <span>Premium</span>
      </div>
    );
  }

  if (showUpgradeButton) {
    return (
      <button
        onClick={() => setShowUpgradeModal(true)}
        className={`inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-full transition-colors ${className}`}
      >
        <span>⭐</span>
        <span>Upgrade</span>
      </button>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-600 text-sm font-medium rounded-full ${className}`}>
      <span>⭐</span>
      <span>Free</span>
    </div>
  );
};

export default PremiumBadge;
