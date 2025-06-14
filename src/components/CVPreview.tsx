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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-white rounded-lg shadow-sm border">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-700">Ready to Download?</h3>
          <p className="text-xs text-gray-500">Export your resume as PDF</p>
        </div>
        <DownloadButton cvData={cvData} />
      </div>
      
      {/* Mobile-Optimized CV Preview */}
      <div className="shadow-lg rounded-lg overflow-hidden bg-white">
        {/* Empty State - Mobile Friendly */}
        {!personalInfo.name && !personalInfo.title && !personalInfo.email ? (
          <div className="p-6 lg:p-10 text-center text-gray-400 py-16 lg:py-20">
            <div className="text-4xl lg:text-6xl mb-4">📄</div>
            <h3 className="text-lg lg:text-xl font-medium mb-2">Your resume will appear here</h3>
            <p className="text-sm lg:text-base text-gray-500 mb-4">Start by filling out the form below</p>
            <div className="inline-flex items-center gap-2 text-xs text-primary-600 bg-primary-50 px-3 py-2 rounded-full">
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
      <div className="lg:hidden text-center text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
        <span>💡 Tip: Your changes appear instantly above. Scroll down to edit your information.</span>
      </div>
    </div>
  );
} 