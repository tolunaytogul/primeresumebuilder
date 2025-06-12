'use client';

import CVForm from '@/components/CVForm';
import CVPreview from '@/components/CVPreview';
import SaveStatusIndicator from '@/components/SaveStatusIndicator';
import TemplateSelector from '@/components/TemplateSelector';
import PremiumModal from '@/components/PremiumModal';
import PremiumBadge from '@/components/PremiumBadge';
import Link from 'next/link';
import { useCV } from '@/context/CVContext';
import { useState } from 'react';

export default function CVEditorPage() {
  const { clearSavedData, loadSampleData, hasSavedData } = useCV();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClearData = () => {
    if (showConfirm) {
      clearSavedData();
      setShowConfirm(false);
    } else {
      setShowConfirm(true);
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-4 lg:py-8">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-6 lg:mb-8">
          {/* Top Row - Title and Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Resume Builder</h1>
                <SaveStatusIndicator />
                <PremiumBadge />
              </div>
              <p className="text-gray-600 text-sm lg:text-base">Create your professional resume</p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <TemplateSelector />
              <Link 
                href="/"
                className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium whitespace-nowrap"
              >
                ← Home
              </Link>
            </div>
          </div>

          {/* Data Management Controls - Mobile Optimized */}
          <div className="flex flex-col sm:flex-row gap-3 p-4 bg-white rounded-lg shadow-sm border">
            <div className="flex-1">
              <h4 className="text-sm font-medium text-gray-700 mb-1">Quick Actions</h4>
              <p className="text-xs text-gray-500">Your data is automatically saved</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              {/* Sample Data Button */}
              <button
                onClick={loadSampleData}
                className="px-4 py-2 text-sm font-medium rounded-lg transition-colors bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 whitespace-nowrap"
              >
                📄 Load Sample Data
              </button>
              
              {/* Clear Data Button */}
              {hasSavedData() && (
                <div className="flex gap-2">
                  {showConfirm ? (
                    <>
                      <button
                        onClick={handleClearData}
                        className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap"
                      >
                        ✓ Confirm Clear
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 text-sm font-medium border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
                      >
                        ✕ Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleClearData}
                      className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800 border border-red-200 hover:border-red-300 rounded-lg transition-colors whitespace-nowrap"
                    >
                      🗑️ Clear All Data
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Mobile-First Layout: Preview First, Then Form */}
        <div className="flex flex-col gap-6">
          {/* CV Preview Section - Now at Top for Mobile */}
          <div className="w-full">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">📋 Live Preview</h2>
              <p className="text-sm text-gray-600">See your changes in real-time</p>
            </div>
            <CVPreview />
          </div>
          
          {/* Form Section - Below Preview for Mobile */}
          <div className="w-full">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">✏️ Edit Your Resume</h2>
              <p className="text-sm text-gray-600">Fill in your information below</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
              <CVForm />
            </div>
          </div>
        </div>

        {/* Desktop Layout: Side by Side */}
        <div className="hidden lg:block">
          <div className="flex gap-8 mt-8">
            {/* Form Section */}
            <div className="w-1/2">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">✏️ Edit Your Resume</h2>
                <p className="text-sm text-gray-600">Fill in your information</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <CVForm />
              </div>
            </div>
            
            {/* Preview Section */}
            <div className="w-1/2">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">📋 Live Preview</h2>
                <p className="text-sm text-gray-600">See your changes in real-time</p>
              </div>
              <CVPreview />
            </div>
          </div>
        </div>
      </div>
      
      {/* Premium Modal */}
      <PremiumModal />
    </div>
  );
} 