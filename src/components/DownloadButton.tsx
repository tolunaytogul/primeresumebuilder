'use client';

import React, { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import PDFDocument from './PDFDocument';
import { CVData } from '@/types/cv';

interface DownloadButtonProps {
  cvData: CVData;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ cvData }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  // Validation check for required fields
  const isFormValid = () => {
    const { personalInfo } = cvData;
    return (
      personalInfo.name?.trim() &&
      personalInfo.title?.trim() &&
      personalInfo.email?.trim() &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email)
    );
  };

  const getMissingFields = () => {
    const { personalInfo } = cvData;
    const missing = [];
    
    if (!personalInfo.name?.trim()) missing.push('Full Name');
    if (!personalInfo.title?.trim()) missing.push('Job Title');
    if (!personalInfo.email?.trim()) missing.push('Email');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email)) missing.push('Valid Email');
    
    return missing;
  };

  const handleDownload = async () => {
    if (!isFormValid()) {
      const missingFields = getMissingFields();
      alert(`Please fill in the following required fields:\n• ${missingFields.join('\n• ')}`);
      return;
    }

    try {
      setIsGenerating(true);
      
      // Generate PDF
      const pdfBlob = await pdf(<PDFDocument cvData={cvData} />).toBlob();
      
      // Create download link
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      
      // Generate filename
      const fileName = cvData.personalInfo.name 
        ? `${cvData.personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`
        : 'Resume.pdf';
      
      link.download = fileName;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const formValid = isFormValid();

  return (
    <div className="space-y-2">
      <button
        onClick={handleDownload}
        disabled={isGenerating || !formValid}
        className={`w-full px-4 py-3 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 ${
          formValid 
            ? 'bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {isGenerating ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Generating PDF...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download PDF
          </>
        )}
      </button>
      
      {!formValid && (
        <p className="text-xs text-gray-500 text-center">
          Complete required fields (Name, Title, Email) to download
        </p>
      )}
    </div>
  );
};

export default DownloadButton; 