'use client';

import React from 'react';
import { CVData } from '@/types/cv';
import { TemplateType } from '@/types/template';
import ModernWebTemplate from './ModernWebTemplate';
import ClassicWebTemplate from './ClassicWebTemplate';
import CreativeWebTemplate from './CreativeWebTemplate';
import MinimalWebTemplate from './MinimalWebTemplate';

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
      return <CreativeWebTemplate cvData={cvData} />;
    case 'minimal':
      return <MinimalWebTemplate cvData={cvData} />;
    default:
      return <ModernWebTemplate cvData={cvData} />;
  }
};

export default WebTemplateFactory; 