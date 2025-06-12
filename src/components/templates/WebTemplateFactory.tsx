'use client';

import React from 'react';
import { CVData } from '@/types/cv';
import { TemplateType } from '@/types/template';
import ModernWebTemplate from './ModernWebTemplate';
import ClassicWebTemplate from './ClassicWebTemplate';

interface WebTemplateFactoryProps {
  templateType: TemplateType;
  cvData: CVData;
}

const WebTemplateFactory: React.FC<WebTemplateFactoryProps> = ({ templateType, cvData }) => {
  switch (templateType) {
    case 'modern':
      return <ModernWebTemplate cvData={cvData} />;
    case 'classic':
      return <ClassicWebTemplate cvData={cvData} />;
    case 'creative':
      // For now, use modern template for creative (can be enhanced later)
      return <ModernWebTemplate cvData={cvData} />;
    case 'minimal':
      // For now, use modern template for minimal (can be enhanced later)
      return <ModernWebTemplate cvData={cvData} />;
    default:
      return <ModernWebTemplate cvData={cvData} />;
  }
};

export default WebTemplateFactory; 