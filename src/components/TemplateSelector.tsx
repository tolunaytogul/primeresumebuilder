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
        className="flex items-center gap-3 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-gray-400 transition-colors w-full sm:w-auto"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded shadow-sm flex items-center justify-center">
            <span className="text-white text-xs font-bold">CV</span>
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-gray-900">{currentTemplate?.name}</p>
            <p className="text-xs text-gray-500">Template</p>
          </div>
        </div>
        <svg 
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Template Selection Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[400px]">
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Choose Template</h3>
            <div className="grid grid-cols-1 gap-3">
              {AVAILABLE_TEMPLATES.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateSelect(template.id)}
                  className={`flex items-start gap-4 p-3 rounded-lg border-2 transition-all text-left hover:shadow-md ${
                    selectedTemplate === template.id
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : template.isPremium && !isPremium
                      ? 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  } ${template.isPremium && !isPremium ? 'relative' : ''}`}
                >
                  {/* Template Preview */}
                  <div className="flex-shrink-0 relative">
                    <TemplatePreview 
                      templateType={template.id} 
                      className="w-16 h-20 border border-gray-200 rounded shadow-sm"
                    />
                    {template.isPremium && !isPremium && (
                      <div className="absolute inset-0 bg-black bg-opacity-40 rounded flex items-center justify-center">
                        <span className="text-white text-xs">🔒</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Template Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-gray-900 text-sm">{template.name}</h4>
                      {template.isPremium && (
                        <span className="px-2 py-0.5 bg-gradient-to-r from-orange-400 to-orange-500 text-white text-xs font-medium rounded-full">
                          Premium
                        </span>
                      )}
                      {selectedTemplate === template.id && (
                        <span className="text-blue-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{template.description}</p>
                    
                    {/* Template Features */}
                    <div className="mt-2 flex flex-wrap gap-1">
                      {template.id === 'modern' && (
                        <>
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">Professional</span>
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">Skill Badges</span>
                        </>
                      )}
                      {template.id === 'classic' && (
                        <>
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">Traditional</span>
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">Conservative</span>
                        </>
                      )}
                      {template.id === 'creative' && (
                        <>
                          <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded">Two-Column</span>
                          <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded">Progress Bars</span>
                        </>
                      )}
                      {template.id === 'minimal' && (
                        <>
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">Clean</span>
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">Spacious</span>
                        </>
                      )}
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
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
} 