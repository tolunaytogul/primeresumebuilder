'use client';

import React from 'react';
import { useCV } from '@/context/CVContext';
import WebTemplateFactory from './templates/WebTemplateFactory';
import DownloadButton from './DownloadButton';

export default function CVPreview() {
  const { cvData, selectedTemplate } = useCV();
  const { personalInfo } = cvData;

  return (
    <div className="space-y-4">
      {/* Mobile-Optimized Download Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-white rounded-lg shadow-sm border border-ui-primary">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-content-primary">Ready to Download?</h3>
          <p className="text-xs text-content-tertiary">Export your resume as PDF</p>
        </div>
        <DownloadButton cvData={cvData} />
      </div>
      
      {/* Mobile-Optimized CV Preview */}
      <div className="shadow-lg rounded-lg overflow-hidden bg-white">
        {/* Empty State - Mobile Friendly */}
        {!personalInfo.name && !personalInfo.title && !personalInfo.email ? (
          <div className="p-6 lg:p-10 text-center text-content-quaternary py-16 lg:py-20">
            <div className="text-4xl lg:text-6xl mb-4">📄</div>
            <h3 className="text-lg lg:text-xl font-medium mb-2">Your resume will appear here</h3>
            <p className="text-sm lg:text-base text-content-tertiary mb-4">Start by filling out the form below</p>
            <div className="inline-flex items-center gap-2 text-xs text-content-brand bg-surface-brand bg-opacity-10 px-3 py-2 rounded-full">
              <span>💡</span>
              <span>Try "Load Sample Data" to see an example</span>
            </div>
          </div>
        ) : (
          <div className="min-h-[500px] lg:min-h-[800px]">
            <WebTemplateFactory templateType={selectedTemplate} cvData={cvData} />
          </div>
        )}
      </div>

      {/* Mobile Helper Text */}
      <div className="lg:hidden text-center text-xs text-content-tertiary bg-surface-secondary p-3 rounded-lg">
        <span>💡 Tip: Your changes appear instantly above. Scroll down to edit your information.</span>
      </div>
    </div>
  );
} 