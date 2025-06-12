'use client';

import React from 'react';
import { CVData } from '@/types/cv';
import { TemplateType } from '@/types/template';
import ModernPDFTemplate from './ModernPDFTemplate';
import ClassicPDFTemplate from './ClassicPDFTemplate';
import CreativePDFTemplate from './CreativePDFTemplate';
import MinimalPDFTemplate from './MinimalPDFTemplate';

interface TemplateFactoryProps {
  templateType: TemplateType;
  cvData: CVData;
}

const TemplateFactory: React.FC<TemplateFactoryProps> = ({ templateType, cvData }) => {
  switch (templateType) {
    case 'modern':
      return <ModernPDFTemplate cvData={cvData} />;
    case 'classic':
      return <ClassicPDFTemplate cvData={cvData} />;
    case 'creative':
      return <CreativePDFTemplate cvData={cvData} />;
    case 'minimal':
      return <MinimalPDFTemplate cvData={cvData} />;
    default:
      return <ModernPDFTemplate cvData={cvData} />;
  }
};

export default TemplateFactory; 