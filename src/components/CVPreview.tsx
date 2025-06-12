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
      {/* Download Button */}
      <DownloadButton cvData={cvData} />
      
      {/* CV Preview */}
      <div className="shadow-lg rounded-lg min-h-[600px] lg:min-h-[800px] overflow-hidden">
        {/* Empty State */}
        {!personalInfo.name && !personalInfo.title && !personalInfo.email ? (
          <div className="bg-white p-6 lg:p-10 text-center text-gray-400 py-12 lg:py-16">
            <div className="text-5xl lg:text-6xl mb-4">📄</div>
            <p className="text-lg lg:text-xl font-medium">Your resume will appear here</p>
            <p className="text-sm lg:text-base mt-2">Start by filling out the form above</p>
          </div>
        ) : (
          <WebTemplateFactory templateType={selectedTemplate} cvData={cvData} />
        )}
      </div>
    </div>
  );
} 