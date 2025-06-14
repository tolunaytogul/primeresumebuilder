export type TemplateType = 'modern' | 'classic' | 'creative' | 'minimal';

export interface TemplateColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  background: string;
}

export interface Template {
  id: TemplateType;
  name: string;
  description: string;
  preview: string; // Preview image path or component
  isPremium?: boolean;
  colorScheme: TemplateColorScheme;
  features: string[];
}

export const AVAILABLE_TEMPLATES: Template[] = [
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean, modern design with blue accents and professional layout',
    preview: '/templates/modern-preview.png',
    isPremium: false,
    colorScheme: {
      primary: '#2563eb', // Blue
      secondary: '#10b981', // Emerald
      accent: '#f59e0b', // Amber
      text: '#1f2937',
      background: '#ffffff'
    },
    features: ['Professional', 'Skill Badges', 'Clean Layout', 'ATS-Friendly']
  },
  {
    id: 'classic',
    name: 'Classic Traditional',
    description: 'Traditional format with serif fonts and conservative styling',
    preview: '/templates/classic-preview.png',
    isPremium: false,
    colorScheme: {
      primary: '#374151', // Gray
      secondary: '#6b7280', // Gray-500
      accent: '#dc2626', // Red
      text: '#111827',
      background: '#ffffff'
    },
    features: ['Traditional', 'Conservative', 'Serif Fonts', 'Corporate']
  },
  {
    id: 'creative',
    name: 'Creative Designer',
    description: 'Bold design with creative elements for design professionals',
    preview: '/templates/creative-preview.png',
    isPremium: true,
    colorScheme: {
      primary: '#7c3aed', // Purple
      secondary: '#f59e0b', // Amber
      accent: '#ec4899', // Pink
      text: '#1f2937',
      background: '#ffffff'
    },
    features: ['Two-Column', 'Progress Bars', 'Creative Layout', 'Portfolio Style']
  },
  {
    id: 'minimal',
    name: 'Minimal Clean',
    description: 'Ultra-clean minimalist design with maximum white space',
    preview: '/templates/minimal-preview.png',
    isPremium: false,
    colorScheme: {
      primary: '#000000', // Black
      secondary: '#6b7280', // Gray
      accent: '#10b981', // Emerald
      text: '#374151',
      background: '#ffffff'
    },
    features: ['Clean', 'Spacious', 'Minimalist', 'Typography Focus']
  }
]; 