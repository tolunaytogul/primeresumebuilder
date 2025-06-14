'use client';

import React from 'react';
import { usePremium } from '@/context/PremiumContext';

const PremiumModal: React.FC = () => {
  const { showUpgradeModal, setShowUpgradeModal, upgradeToPremium } = usePremium();

  if (!showUpgradeModal) return null;

  const premiumFeatures = [
    {
      icon: '🎨',
      title: 'Creative Template',
      description: 'Access to our stunning creative template with sidebar design'
    },
    {
      icon: '🌈',
      title: 'Custom Color Themes',
      description: 'Personalize your resume with custom color schemes'
    },
    {
      icon: '📤',
      title: 'Advanced Export',
      description: 'Export to Word, LinkedIn, and other formats'
    },
    {
      icon: '🤖',
      title: 'AI Content Suggestions',
      description: 'Get AI-powered suggestions for better content'
    },
    {
      icon: '∞',
      title: 'Unlimited Downloads',
      description: 'Download your resume as many times as you want'
    },
    {
      icon: '⚡',
      title: 'Priority Support',
      description: 'Get faster support and feature requests'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1050] p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-accent-600 to-primary-600 text-white p-8 rounded-t-2xl">
          <button
            onClick={() => setShowUpgradeModal(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
              <span className="text-2xl">👑</span>
            </div>
            <h2 className="text-3xl font-bold mb-2">Upgrade to Premium</h2>
            <p className="text-accent-100">Unlock all features and create stunning resumes</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Pricing */}
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-to-r from-accent-600 to-primary-600 text-white rounded-2xl p-6 mb-6">
              <div className="text-4xl font-bold mb-2">$9.99</div>
              <div className="text-accent-100">One-time payment</div>
              <div className="text-sm text-accent-200 mt-1">Lifetime access</div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center gap-2 text-green-700">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">30-day money-back guarantee</span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {premiumFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl">{feature.icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={upgradeToPremium}
              className="flex-1 bg-gradient-to-r from-accent-600 to-primary-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-accent-700 hover:to-primary-700 transition-all duration-200 transform hover:scale-105"
            >
              🚀 Upgrade Now - $9.99
            </button>
            <button
              onClick={() => setShowUpgradeModal(false)}
              className="flex-1 sm:flex-none px-6 py-4 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Maybe Later
            </button>
          </div>

          {/* Trust indicators */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Instant Access</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>No Subscription</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumModal; 