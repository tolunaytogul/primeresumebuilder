'use client';

import React, { useState } from 'react';
import { useCV } from '@/context/CVContext';
import { usePremium } from '@/context/PremiumContext';
import { AVAILABLE_TEMPLATES, TemplateType } from '@/types/template';
import TemplatePreview from './TemplatePreview';


export default function TemplateSelector() {
  const { selectedTemplate, setTemplate } = useCV();
  const { isPremium, setShowUpgradeModal } = usePremium();
  const [isOpen, setIsOpen] = useState(false);

  const handleTemplateSelect = (templateId: TemplateType) => {
    const template = AVAILABLE_TEMPLATES.find(t => t.id === templateId);
    
    // Check if template is premium and user doesn't have premium access
    if (template?.isPremium && !isPremium) {
      setShowUpgradeModal(true);
      setIsOpen(false);
      return;
    }
    
    setTemplate(templateId);
    setIsOpen(false);
  };

  const currentTemplate = AVAILABLE_TEMPLATES.find(t => t.id === selectedTemplate);

  return (
    <div className="relative">
      {/* Current Template Display */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-gray-400 rounded-lg hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors w-full sm:w-auto min-h-[44px] touch-manipulation"
      >
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <div className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0">
            <TemplatePreview templateType={selectedTemplate} className="w-full h-full" />
          </div>
          <div className="text-left min-w-0 flex-1">
            <div className="font-medium text-gray-900 text-sm sm:text-base truncate">
              {currentTemplate?.name}
            </div>
            <div className="text-xs sm:text-sm text-gray-500 truncate">
              {currentTemplate?.description}
            </div>
          </div>
        </div>
        <svg 
          className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Template Selection Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-[1000] w-full sm:min-w-[400px] sm:w-auto max-h-[70vh] overflow-y-auto">
          <div className="p-3 sm:p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 sm:mb-4">Choose Template</h3>
            <div className="space-y-2 sm:space-y-3">
              {AVAILABLE_TEMPLATES.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateSelect(template.id)}
                  className={`w-full p-3 sm:p-4 border rounded-lg text-left transition-all hover:border-primary-300 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[60px] sm:min-h-[80px] touch-manipulation ${
                    selectedTemplate === template.id 
                      ? 'border-primary-500 bg-primary-50' 
                      : 'border-gray-200'
                  } ${template.isPremium && !isPremium ? 'relative' : ''}`}
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="flex-shrink-0 relative">
                      <div className="w-8 h-8 sm:w-12 sm:h-12">
                        <TemplatePreview templateType={template.id} className="w-full h-full" />
                      </div>
                      {template.isPremium && !isPremium && (
                        <div className="absolute inset-0 bg-black bg-opacity-40 rounded flex items-center justify-center">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-900 text-sm sm:text-base truncate">
                          {template.name}
                        </h4>
                        {template.isPremium && (
                          <span className="px-1.5 py-0.5 bg-gradient-to-r from-accent-400 to-accent-500 text-white text-xs font-medium rounded-full flex-shrink-0">
                            Premium
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {template.description}
                      </p>
                      
                      {/* Template Features - Mobile Optimized */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {template.features.slice(0, 3).map((feature, index) => {
                          // Template'e göre renk şeması
                          const getFeatureStyle = (templateId: string) => {
                            switch (templateId) {
                              case 'modern':
                                return 'bg-primary-100 text-primary-700';
                              case 'creative':
                                return 'bg-purple-100 text-purple-700';
                              case 'classic':
                                return 'bg-neutral-100 text-neutral-700';
                              case 'minimal':
                                return 'bg-success-100 text-success-700';
                              default:
                                return 'bg-neutral-100 text-neutral-700';
                            }
                          };
                          
                          return (
                            <span 
                              key={index}
                              className={`px-1.5 py-0.5 text-xs rounded-full flex-shrink-0 ${getFeatureStyle(template.id)}`}
                            >
                              {feature}
                            </span>
                          );
                        })}
                        {template.features.length > 3 && (
                          <span className="px-1.5 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600 flex-shrink-0">
                            +{template.features.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Close Button */}
          <div className="border-t border-gray-200 p-3">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full px-3 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[999]" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
} 