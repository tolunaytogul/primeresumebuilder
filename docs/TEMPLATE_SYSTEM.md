# 🎨 Template System Documentation

## Overview
PrimeResumeBuilder uses a flexible template system that allows for diverse design approaches while maintaining consistency in core functionality.

## Template Architecture

### Template Types
Each template has its own unique design philosophy and color scheme:

#### 1. **Modern Professional** (`modern`)
- **Color Scheme**: Blue-based (#2563eb primary)
- **Philosophy**: Clean, corporate, ATS-friendly
- **Features**: Professional layout, skill badges, clean typography
- **Target Audience**: Corporate professionals, tech workers

#### 2. **Creative Designer** (`creative`) 
- **Color Scheme**: Purple-based (#7c3aed primary)
- **Philosophy**: Bold, artistic, portfolio-style
- **Features**: Two-column layout, progress bars, creative elements
- **Target Audience**: Designers, artists, creative professionals

#### 3. **Classic Traditional** (`classic`)
- **Color Scheme**: Gray-based (#374151 primary)
- **Philosophy**: Conservative, traditional, timeless
- **Features**: Serif fonts, traditional layout, corporate styling
- **Target Audience**: Legal, finance, traditional industries

#### 4. **Minimal Clean** (`minimal`)
- **Color Scheme**: Black/Green-based (#000000 primary)
- **Philosophy**: Ultra-clean, typography-focused
- **Features**: Maximum white space, minimal elements
- **Target Audience**: Minimalists, modern professionals

## Template Structure

### Color Scheme Interface
```typescript
interface TemplateColorScheme {
  primary: string;    // Main brand color
  secondary: string;  // Supporting color
  accent: string;     // Highlight color
  text: string;       // Primary text color
  background: string; // Background color
}
```

### Template Definition
```typescript
interface Template {
  id: TemplateType;
  name: string;
  description: string;
  preview: string;
  isPremium?: boolean;
  colorScheme: TemplateColorScheme;
  features: string[];
}
```

## Design Principles

### 1. **Template Independence**
- Each template maintains its own visual identity
- Templates can use different color schemes
- Core functionality remains consistent across all templates

### 2. **Scalability**
- Easy to add new templates
- Consistent interface for all templates
- Feature-based categorization

### 3. **User Experience**
- Clear visual differentiation between templates
- Feature badges help users choose appropriate template
- Premium/free distinction

## Adding New Templates

### Step 1: Define Template Type
```typescript
// Add to src/types/template.ts
export type TemplateType = 'modern' | 'classic' | 'creative' | 'minimal' | 'new-template';
```

### Step 2: Add Template Definition
```typescript
{
  id: 'new-template',
  name: 'Template Name',
  description: 'Template description',
  preview: '/templates/new-template-preview.png',
  isPremium: false,
  colorScheme: {
    primary: '#color',
    secondary: '#color',
    accent: '#color',
    text: '#color',
    background: '#color'
  },
  features: ['Feature 1', 'Feature 2', 'Feature 3']
}
```

### Step 3: Create Template Component
```typescript
// src/components/templates/NewTemplate.tsx
const NewTemplate: React.FC<TemplateProps> = ({ cvData }) => {
  // Template implementation
};
```

### Step 4: Update Template Renderer
```typescript
// Add to template renderer switch statement
case 'new-template':
  return <NewTemplate cvData={cvData} />;
```

### Step 5: Add Preview Component
```typescript
// Update TemplatePreview.tsx with new template preview
```

## Color System Guidelines

### Template-Specific Colors
- Templates can define their own color schemes
- Use semantic color names within templates
- Maintain accessibility standards (WCAG 2.1 AA)

### Global UI Colors
- UI components use global theme tokens
- Consistent across all templates
- Primary: #2563eb, Secondary: #10b981, Accent: #f59e0b

## Best Practices

### 1. **Consistency**
- Maintain consistent spacing and typography scales
- Use consistent component interfaces
- Follow accessibility guidelines

### 2. **Performance**
- Optimize template rendering
- Use CSS-in-JS efficiently
- Minimize bundle size impact

### 3. **Maintainability**
- Document template-specific features
- Use TypeScript for type safety
- Follow naming conventions

## Template Features

### Feature Categories
- **Layout**: Two-column, single-column, sidebar
- **Styling**: Professional, creative, minimal, traditional
- **Elements**: Progress bars, skill badges, icons
- **Typography**: Sans-serif, serif, modern, classic

### Feature Implementation
- Features are displayed as badges in UI
- Help users understand template capabilities
- Guide template selection process

## Future Enhancements

### Planned Features
- [ ] Template customization options
- [ ] Color scheme variants per template
- [ ] Template-specific sections
- [ ] Advanced layout options
- [ ] Template marketplace

### Considerations
- User-generated templates
- Template versioning
- A/B testing capabilities
- Analytics integration

## Technical Notes

### File Structure
```
src/
├── components/
│   ├── templates/
│   │   ├── ModernWebTemplate.tsx
│   │   ├── CreativeWebTemplate.tsx
│   │   ├── ClassicTemplate.tsx
│   │   └── MinimalTemplate.tsx
│   ├── TemplateSelector.tsx
│   └── TemplatePreview.tsx
├── types/
│   └── template.ts
└── styles/
    └── templates/
```

### Dependencies
- React 18+
- TypeScript
- Tailwind CSS
- Framer Motion (for animations)

---

*Last updated: December 2024* 