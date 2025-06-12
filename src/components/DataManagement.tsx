'use client';

import React, { useState } from 'react';
import { useCV } from '@/context/CVContext';

export default function DataManagement() {
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
    <div className="border-t pt-4 mt-6">
      <div className="flex flex-col gap-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-1">Data Management</h4>
          <p className="text-xs text-gray-500">Your resume data is automatically saved locally</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Sample Data Button */}
          <button
            onClick={loadSampleData}
            className="flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200"
          >
            Load Sample Data
          </button>
          
          {/* Clear Data Button - only show if there's saved data */}
          {hasSavedData() && (
            <div className="flex gap-2 flex-1">
              {showConfirm ? (
                <>
                  <button
                    onClick={handleClearData}
                    className="flex-1 px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Confirm Clear
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 px-4 py-2 text-sm font-medium border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={handleClearData}
                  className="flex-1 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800 border border-red-200 hover:border-red-300 rounded-lg transition-colors"
                >
                  Clear All Data
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 