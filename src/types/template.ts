export type TemplateType = 'modern' | 'classic' | 'creative' | 'minimal';

export interface Template {
  id: TemplateType;
  name: string;
  description: string;
  preview: string; // Preview image path or component
  isPremium?: boolean;
}

export const AVAILABLE_TEMPLATES: Template[] = [
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean, modern design with blue accents and professional layout',
    preview: '/templates/modern-preview.png',
    isPremium: false
  },
  {
    id: 'classic',
    name: 'Classic Traditional',
    description: 'Traditional format with serif fonts and conservative styling',
    preview: '/templates/classic-preview.png',
    isPremium: false
  },
  {
    id: 'creative',
    name: 'Creative Designer',
    description: 'Bold design with creative elements for design professionals',
    preview: '/templates/creative-preview.png',
    isPremium: true
  },
  {
    id: 'minimal',
    name: 'Minimal Clean',
    description: 'Ultra-clean minimalist design with maximum white space',
    preview: '/templates/minimal-preview.png',
    isPremium: false
  }
]; 