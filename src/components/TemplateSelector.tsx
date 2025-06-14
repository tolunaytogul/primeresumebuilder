'use client';

import { useState } from 'react';
import { useCV } from '@/context/CVContext';
import { AVAILABLE_TEMPLATES, TemplateType } from '@/types/template';
import TemplatePreview from './TemplatePreview';

export default function TemplateSelector() {
  const { selectedTemplate, setTemplate } = useCV();
  const [isOpen, setIsOpen] = useState(false);

  const templates = AVAILABLE_TEMPLATES;
  const currentTemplate = templates.find(t => t.id === selectedTemplate);

  const handleTemplateSelect = (templateId: TemplateType) => {
    setTemplate(templateId);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="mb-2">
        <label className="block text-body-sm text-red font-medium text-content-tertiary">
          Choose Template
        </label>
      </div>
      
      {/* Template Selector Button */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-ui-tertiary rounded-lg hover:border-ui-tertiary focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-colors w-full sm:w-auto min-h-[44px] touch-manipulation"
        >
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0">
              <TemplatePreview templateType={selectedTemplate} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-medium text-content-primary text-sm sm:text-base truncate">
                {currentTemplate?.name || 'Select Template'}
              </div>
            </div>
          </div>
          <svg 
            className={`w-4 h-4 sm:w-5 sm:h-5 text-neutral-500 transition-transform flex-shrink-0 ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-[999]" 
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown Content */}
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-ui-primary rounded-lg shadow-lg z-[1000] w-full sm:min-w-[400px] sm:w-auto max-h-[70vh] overflow-y-auto">
              <div className="p-2">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleTemplateSelect(template.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors text-left min-h-[44px] touch-manipulation ${
                      selectedTemplate === template.id 
                        ? 'bg-primary-50 border-primary-200' 
                        : 'border-ui-primary'
                    }`}
                  >
                    <div className="w-12 h-16 flex-shrink-0">
                      <TemplatePreview templateType={template.id} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-neutral-900 text-sm sm:text-base truncate">
                        {template.name}
                      </div>
                      <div className="text-xs sm:text-sm text-neutral-600 mt-1 line-clamp-2">
                        {template.description}
                      </div>
                      {template.isPremium && (
                        <div className="flex items-center gap-1 mt-2">
                          <span className="text-yellow-500 text-xs">👑</span>
                          <span className="text-xs text-accent-600 font-medium">Premium</span>
                        </div>
                      )}
                    </div>
                    {selectedTemplate === template.id && (
                      <div className="flex-shrink-0">
                        <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
              
              {/* Premium CTA */}
              <div className="border-t border-ui-primary p-3">
                <div className="text-xs text-neutral-600 text-center">
                  <span className="text-yellow-500">👑</span> Unlock all premium templates
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 