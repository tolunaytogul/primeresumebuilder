'use client';

import React from 'react';
import { TemplateType } from '@/types/template';

interface TemplatePreviewProps {
  templateType: TemplateType;
  className?: string;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({ templateType, className = '' }) => {
  const getPreviewContent = () => {
    switch (templateType) {
      case 'modern':
        return (
          <div className="w-full h-full bg-white border border-gray-200 rounded-sm overflow-hidden">
            {/* Header */}
            <div className="h-3 bg-white border-b-2 border-blue-500 px-1 py-0.5">
              <div className="h-0.5 bg-gray-800 w-3/4 mb-0.5"></div>
              <div className="h-0.5 bg-blue-500 w-1/2"></div>
            </div>
            {/* Content */}
            <div className="p-1 space-y-1">
              <div className="h-0.5 bg-gray-300 w-full"></div>
              <div className="h-0.5 bg-gray-300 w-4/5"></div>
              <div className="h-0.5 bg-gray-300 w-3/4"></div>
              {/* Skills badges */}
              <div className="flex gap-0.5 mt-1">
                <div className="w-1.5 h-0.5 bg-blue-200 rounded-sm"></div>
                <div className="w-1.5 h-0.5 bg-purple-200 rounded-sm"></div>
                <div className="w-1.5 h-0.5 bg-orange-200 rounded-sm"></div>
              </div>
            </div>
          </div>
        );

      case 'classic':
        return (
          <div className="w-full h-full bg-white border border-gray-300 rounded-sm overflow-hidden">
            {/* Header */}
            <div className="h-3 bg-white border-b border-black px-1 py-0.5 text-center">
              <div className="h-0.5 bg-black w-3/4 mx-auto mb-0.5"></div>
              <div className="h-0.5 bg-gray-600 w-1/2 mx-auto"></div>
            </div>
            {/* Content */}
            <div className="p-1 space-y-1">
              <div className="text-center">
                <div className="h-0.5 bg-black w-2/3 mx-auto mb-0.5"></div>
              </div>
              <div className="h-0.5 bg-gray-400 w-full"></div>
              <div className="h-0.5 bg-gray-400 w-4/5"></div>
              <div className="h-0.5 bg-gray-400 w-3/4"></div>
              {/* Skills list */}
              <div className="space-y-0.5 mt-1">
                <div className="flex gap-0.5">
                  <div className="w-1 h-0.5 bg-black"></div>
                  <div className="w-3 h-0.5 bg-gray-400"></div>
                </div>
                <div className="flex gap-0.5">
                  <div className="w-1 h-0.5 bg-black"></div>
                  <div className="w-2.5 h-0.5 bg-gray-400"></div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'creative':
        return (
          <div className="w-full h-full bg-white rounded-sm overflow-hidden flex">
            {/* Sidebar */}
            <div className="w-2/5 bg-gradient-to-b from-purple-900 to-purple-800 p-0.5">
              <div className="space-y-0.5">
                <div className="h-0.5 bg-white w-3/4"></div>
                <div className="h-0.5 bg-purple-200 w-1/2"></div>
                {/* Progress bars */}
                <div className="space-y-0.5 mt-1">
                  <div className="w-full h-0.5 bg-purple-700 rounded-full">
                    <div className="w-4/5 h-0.5 bg-purple-300 rounded-full"></div>
                  </div>
                  <div className="w-full h-0.5 bg-purple-700 rounded-full">
                    <div className="w-3/5 h-0.5 bg-purple-300 rounded-full"></div>
                  </div>
                  <div className="w-full h-0.5 bg-purple-700 rounded-full">
                    <div className="w-4/5 h-0.5 bg-purple-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            {/* Main content */}
            <div className="w-3/5 p-0.5">
              <div className="space-y-0.5">
                <div className="h-0.5 bg-purple-900 w-3/4 border-l-2 border-purple-400 pl-0.5"></div>
                <div className="h-0.5 bg-gray-400 w-full"></div>
                <div className="h-0.5 bg-gray-400 w-4/5"></div>
                <div className="h-0.5 bg-gray-400 w-3/4"></div>
              </div>
            </div>
          </div>
        );

      case 'minimal':
        return (
          <div className="w-full h-full bg-white rounded-sm overflow-hidden">
            {/* Header */}
            <div className="h-4 bg-white px-1 py-0.5">
              <div className="h-1 bg-black w-3/4 mb-1"></div>
              <div className="h-0.5 bg-gray-500 w-1/2"></div>
            </div>
            {/* Content with lots of spacing */}
            <div className="p-1 space-y-1.5">
              <div className="h-0.5 bg-black w-1/4"></div>
              <div className="space-y-0.5">
                <div className="h-0.5 bg-gray-400 w-full"></div>
                <div className="h-0.5 bg-gray-400 w-3/4"></div>
              </div>
              <div className="h-0.5 bg-black w-1/3 mt-2"></div>
              <div className="space-y-0.5">
                <div className="h-0.5 bg-gray-400 w-4/5"></div>
                <div className="h-0.5 bg-gray-400 w-2/3"></div>
              </div>
              {/* Simple skills */}
              <div className="flex gap-0.5 mt-1">
                <div className="w-1 h-0.5 bg-gray-500"></div>
                <div className="w-1.5 h-0.5 bg-gray-500"></div>
                <div className="w-1 h-0.5 bg-gray-500"></div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full h-full bg-gray-100 rounded-sm flex items-center justify-center">
            <div className="text-xs text-gray-400">CV</div>
          </div>
        );
    }
  };

  return (
    <div className={`${className}`}>
      {getPreviewContent()}
    </div>
  );
};

export default TemplatePreview; 