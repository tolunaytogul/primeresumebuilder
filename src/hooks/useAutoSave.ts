import { useEffect, useState, useCallback } from 'react';
import { CVData } from '@/types/cv';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

const STORAGE_KEY = 'primeresumebuilder_cv_data';
const SAVE_DELAY = 1000; // 1 second debounce

export const useAutoSave = (cvData: CVData) => {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Debounced save function
  const debouncedSave = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      
      return (data: CVData) => {
        setSaveStatus('saving');
        
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            setSaveStatus('saved');
            setLastSaved(new Date());
            
            // Reset to idle after 2 seconds
            setTimeout(() => setSaveStatus('idle'), 2000);
          } catch (error) {
            console.error('Failed to save CV data:', error);
            setSaveStatus('error');
            setTimeout(() => setSaveStatus('idle'), 3000);
          }
        }, SAVE_DELAY);
      };
    })(),
    []
  );

  // Auto-save when CV data changes
  useEffect(() => {
    // Don't save if data is empty (initial state)
    const hasData = cvData.personalInfo.name || 
                   cvData.personalInfo.email || 
                   cvData.personalInfo.title ||
                   cvData.experiences.length > 0 ||
                   cvData.education.length > 0 ||
                   cvData.skills.length > 0;

    if (hasData) {
      debouncedSave(cvData);
    }
  }, [cvData, debouncedSave]);

  // Load saved data from localStorage
  const loadSavedData = useCallback((): CVData | null => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        // Validate the structure
        if (parsedData.personalInfo && parsedData.experiences && parsedData.education && parsedData.skills) {
          return parsedData as CVData;
        }
      }
    } catch (error) {
      console.error('Failed to load saved CV data:', error);
    }
    return null;
  }, []);

  // Clear saved data
  const clearSavedData = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setLastSaved(null);
      setSaveStatus('idle');
    } catch (error) {
      console.error('Failed to clear saved data:', error);
    }
  }, []);

  // Check if there's saved data available
  const hasSavedData = useCallback((): boolean => {
    try {
      return localStorage.getItem(STORAGE_KEY) !== null;
    } catch {
      return false;
    }
  }, []);

  return {
    saveStatus,
    lastSaved,
    loadSavedData,
    clearSavedData,
    hasSavedData
  };
}; 