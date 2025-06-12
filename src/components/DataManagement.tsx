'use client';

import React, { useState } from 'react';
import { useCV } from '@/context/CVContext';

export default function DataManagement() {
  const { clearSavedData, hasSavedData } = useCV();
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

  if (!hasSavedData()) {
    return null;
  }

  return (
    <div className="border-t pt-4 mt-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h4 className="text-sm font-medium text-gray-700">Data Management</h4>
          <p className="text-xs text-gray-500">Your resume data is automatically saved locally</p>
        </div>
        
        <div className="flex gap-2">
          {showConfirm ? (
            <>
              <button
                onClick={handleClearData}
                className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Confirm Clear
              </button>
              <button
                onClick={handleCancel}
                className="px-3 py-1 text-xs border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleClearData}
              className="px-3 py-1 text-xs text-red-600 hover:text-red-800 border border-red-200 hover:border-red-300 rounded transition-colors"
            >
              Clear All Data
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 