# 🎨 Design System Component Guide

A comprehensive guide to PrimeResumeBuilder's design system components, patterns, and best practices.

## 📋 **Table of Contents**

1. [Design Principles](#design-principles)
2. [Component Library](#component-library)
3. [Design Tokens](#design-tokens)
4. [Animation System](#animation-system)
5. [Layout Patterns](#layout-patterns)
6. [Best Practices](#best-practices)

---

## 🎯 **Design Principles**

### **Consistency**
- Use design tokens for all spacing, colors, and typography
- Follow established component patterns
- Maintain visual hierarchy across all pages

### **Accessibility**
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- High contrast color combinations

### **Performance**
- Optimized bundle sizes
- Efficient animations
- Mobile-first responsive design
- Progressive enhancement

### **Developer Experience**
- TypeScript for type safety
- Consistent API patterns
- Comprehensive documentation
- Easy customization

---

## 🧩 **Component Library**

### **Layout Components**

#### **Layout**
Main page wrapper with header and footer.

```tsx
import { Layout } from '@/components/layout';

// Basic usage
<Layout>
  <YourPageContent />
</Layout>

// With custom classes
<Layout 
  className="bg-neutral-50"
  showHeader={true}
  showFooter={true}
>
  <YourPageContent />
</Layout>
```

**Props:**
- `children`: ReactNode - Page content
- `className?`: string - Additional CSS classes
- `showHeader?`: boolean - Show/hide header (default: true)
- `showFooter?`: boolean - Show/hide footer (default: true)

#### **Container**
Responsive content container with max-width constraints.

```tsx
import { Container } from '@/components/ui';

// Basic usage
<Container>
  <YourContent />
</Container>

// With size variants
<Container size="sm">Small container (max-w-2xl)</Container>
<Container size="md">Medium container (max-w-4xl)</Container>
<Container size="lg">Large container (max-w-6xl)</Container>
<Container size="xl">Extra large container (max-w-7xl)</Container>
<Container size="full">Full width container</Container>
```

**Props:**
- `children`: ReactNode - Container content
- `size?`: 'sm' | 'md' | 'lg' | 'xl' | 'full' - Container size (default: 'lg')
- `className?`: string - Additional CSS classes

### **UI Components**

#### **Button**
Versatile button component with multiple variants and states.

```tsx
import { Button } from '@/components/ui';

// Variants
<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="danger">Danger Action</Button>

// Sizes
<Button size="sm">Small Button</Button>
<Button size="md">Medium Button</Button>
<Button size="lg">Large Button</Button>

// States
<Button disabled>Disabled Button</Button>
<Button isLoading>Loading Button</Button>

// With custom styling
<Button className="hover-lift transition-all duration-300">
  Custom Button
</Button>
```

**Props:**
- `children`: ReactNode - Button content
- `variant?`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' - Button style
- `size?`: 'sm' | 'md' | 'lg' - Button size
- `isLoading?`: boolean - Show loading spinner
- `disabled?`: boolean - Disable button
- `className?`: string - Additional CSS classes
- All standard button HTML attributes

#### **Card**
Flexible card component with optional header and footer.

```tsx
import { Card } from '@/components/ui';

// Basic usage
<Card>
  <CardContent />
</Card>

// With variants
<Card shadow="sm">Subtle shadow</Card>
<Card shadow="md">Medium shadow</Card>
<Card shadow="lg">Large shadow</Card>
<Card shadow="xl">Extra large shadow</Card>
<Card shadow="none">No shadow</Card>

// With padding variants
<Card padding="sm">Small padding</Card>
<Card padding="md">Medium padding</Card>
<Card padding="lg">Large padding</Card>

// With header and footer
<Card 
  header={<Heading level={3}>Card Title</Heading>}
  footer={<Button variant="outline">Action</Button>}
>
  <Text>Card content goes here</Text>
</Card>

// Interactive card
<Card className="hover-lift transition-all duration-300 cursor-pointer">
  <InteractiveContent />
</Card>
```

**Props:**
- `children`: ReactNode - Card content
- `shadow?`: 'sm' | 'md' | 'lg' | 'xl' | 'none' - Shadow intensity
- `padding?`: 'sm' | 'md' | 'lg' - Internal padding
- `header?`: ReactNode - Optional header content
- `footer?`: ReactNode - Optional footer content
- `className?`: string - Additional CSS classes

#### **Heading**
Semantic heading component with consistent typography.

```tsx
import { Heading } from '@/components/ui';

// Semantic levels
<Heading level={1}>Main Page Title</Heading>
<Heading level={2}>Section Title</Heading>
<Heading level={3}>Subsection Title</Heading>
<Heading level={4}>Component Title</Heading>

// Size overrides
<Heading level={1} size="6xl">Hero Title</Heading>
<Heading level={2} size="2xl">Large Section</Heading>
<Heading level={3} size="lg">Small Section</Heading>

// Weight variants
<Heading level={2} weight="normal">Light Heading</Heading>
<Heading level={2} weight="medium">Medium Heading</Heading>
<Heading level={2} weight="semibold">Semibold Heading</Heading>
<Heading level={2} weight="bold">Bold Heading</Heading>

// Color variants
<Heading level={1} color="primary">Primary Color</Heading>
<Heading level={2} color="muted">Muted Color</Heading>
<Heading level={3} color="danger">Danger Color</Heading>

// With gradient
<Heading level={1} className="text-gradient">
  Gradient Heading
</Heading>
```

**Props:**
- `children`: ReactNode - Heading text
- `level`: 1 | 2 | 3 | 4 | 5 | 6 - Semantic heading level
- `size?`: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' - Visual size
- `weight?`: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' - Font weight
- `color?`: 'default' | 'muted' | 'primary' | 'secondary' | 'danger' - Text color
- `className?`: string - Additional CSS classes

#### **Text**
Flexible text component for body content.

```tsx
import { Text } from '@/components/ui';

// Basic usage
<Text>Default paragraph text</Text>

// Element variants
<Text as="p">Paragraph</Text>
<Text as="span">Inline text</Text>
<Text as="label">Form label</Text>
<Text as="small">Small text</Text>
<Text as="div">Div container</Text>

// Size variants
<Text size="xs">Extra small text</Text>
<Text size="sm">Small text</Text>
<Text size="base">Base text</Text>
<Text size="lg">Large text</Text>
<Text size="xl">Extra large text</Text>

// Weight variants
<Text weight="normal">Normal weight</Text>
<Text weight="medium">Medium weight</Text>
<Text weight="semibold">Semibold weight</Text>
<Text weight="bold">Bold weight</Text>

// Color variants
<Text color="default">Default color</Text>
<Text color="muted">Muted color</Text>
<Text color="primary">Primary color</Text>
<Text color="success">Success color</Text>
<Text color="danger">Danger color</Text>

// Alignment
<Text align="left">Left aligned</Text>
<Text align="center">Center aligned</Text>
<Text align="right">Right aligned</Text>
<Text align="justify">Justified text</Text>

// Line height
<Text leading="tight">Tight line height</Text>
<Text leading="normal">Normal line height</Text>
<Text leading="relaxed">Relaxed line height</Text>
```

**Props:**
- `children`: ReactNode - Text content
- `as?`: 'p' | 'span' | 'label' | 'small' | 'div' - HTML element
- `size?`: 'xs' | 'sm' | 'base' | 'lg' | 'xl' - Text size
- `weight?`: 'normal' | 'medium' | 'semibold' | 'bold' - Font weight
- `color?`: 'default' | 'muted' | 'primary' | 'secondary' | 'success' | 'danger' - Text color
- `align?`: 'left' | 'center' | 'right' | 'justify' - Text alignment
- `leading?`: 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose' - Line height
- `className?`: string - Additional CSS classes

---

## 🎬 **Animation System**

### **Animation Components**

#### **FadeIn**
Smooth opacity transition from 0 to 1.

```tsx
import { FadeIn } from '@/components/ui';

<FadeIn>
  <YourContent />
</FadeIn>

// With custom timing
<FadeIn delay={0.3} duration={0.8}>
  <DelayedContent />
</FadeIn>
```

#### **SlideUp**
Slide animation from bottom with opacity fade.

```tsx
import { SlideUp } from '@/components/ui';

<SlideUp>
  <YourContent />
</SlideUp>

// Staggered slides
<SlideUp delay={0.1}>First item</SlideUp>
<SlideUp delay={0.2}>Second item</SlideUp>
<SlideUp delay={0.3}>Third item</SlideUp>
```

#### **StaggerContainer & StaggerItem**
Orchestrated animations for multiple elements.

```tsx
import { StaggerContainer, StaggerItem } from '@/components/ui';

<StaggerContainer staggerDelay={0.1}>
  <StaggerItem>Item 1</StaggerItem>
  <StaggerItem>Item 2</StaggerItem>
  <StaggerItem>Item 3</StaggerItem>
  <StaggerItem>Item 4</StaggerItem>
</StaggerContainer>
```

#### **PageTransition**
Page-level transition wrapper.

```tsx
import { PageTransition } from '@/components/ui';

<PageTransition>
  <YourPageContent />
</PageTransition>
```

### **CSS Animation Classes**

```css
/* Hover effects */
.hover-lift:hover { transform: translateY(-2px); }
.hover-scale:hover { transform: scale(1.05); }
.hover-rotate:hover { transform: rotate(5deg); }

/* Transition speeds */
.transition-fast { transition-duration: 150ms; }
.transition-normal { transition-duration: 300ms; }
.transition-slow { transition-duration: 500ms; }

/* Loading states */
.loading-skeleton { /* Shimmer effect */ }
.animate-pulse { /* Pulse animation */ }
.animate-spin { /* Spinner animation */ }
```

---

## 🎨 **Design Tokens**

### **Color System**

```css
/* Primary Colors (Blue) */
--color-primary-50: #eff6ff;
--color-primary-100: #dbeafe;
--color-primary-500: #3b82f6;
--color-primary-600: #2563eb;
--color-primary-700: #1d4ed8;

/* Secondary Colors (Slate) */
--color-secondary-500: #64748b;
--color-secondary-600: #475569;
--color-secondary-700: #334155;

/* Accent Colors (Purple) */
--color-accent-500: #d946ef;
--color-accent-600: #c026d3;

/* Semantic Colors */
--color-success-500: #22c55e;
--color-danger-500: #ef4444;
--color-neutral-500: #737373;
```

### **Typography Scale**

```css
/* Font Sizes */
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */
--font-size-2xl: 1.5rem;    /* 24px */
--font-size-3xl: 1.875rem;  /* 30px */
--font-size-4xl: 2.25rem;   /* 36px */

/* Font Weights */
font-normal: 400;
font-medium: 500;
font-semibold: 600;
font-bold: 700;
```

### **Spacing Scale**

```css
/* Spacing (based on 0.25rem = 4px) */
--spacing-1: 0.25rem;   /* 4px */
--spacing-2: 0.5rem;    /* 8px */
--spacing-3: 0.75rem;   /* 12px */
--spacing-4: 1rem;      /* 16px */
--spacing-6: 1.5rem;    /* 24px */
--spacing-8: 2rem;      /* 32px */
--spacing-12: 3rem;     /* 48px */
--spacing-16: 4rem;     /* 64px */
```

### **Shadow System**

```css
/* Shadows */
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
```

---

## 📐 **Layout Patterns**

### **Page Layout**
```tsx
<Layout>
  <Container>
    <FadeIn>
      <Heading level={1} className="text-gradient mb-6">
        Page Title
      </Heading>
    </FadeIn>
    
    <SlideUp delay={0.2}>
      <Text size="lg" color="muted" className="mb-8">
        Page description
      </Text>
    </SlideUp>
    
    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StaggerItem>
        <Card className="hover-lift">
          <CardContent />
        </Card>
      </StaggerItem>
      {/* More items */}
    </StaggerContainer>
  </Container>
</Layout>
```

### **Hero Section**
```tsx
<section className="py-20 lg:py-32">
  <Container>
    <div className="text-center max-w-4xl mx-auto">
      <FadeIn>
        <Heading level={1} size="5xl" className="text-gradient mb-6">
          Hero Title
        </Heading>
      </FadeIn>
      
      <SlideUp delay={0.2}>
        <Text size="xl" color="muted" className="mb-8">
          Hero description
        </Text>
      </SlideUp>
      
      <SlideUp delay={0.4}>
        <div className="flex gap-4 justify-center">
          <Button size="lg" className="hover-lift">
            Primary Action
          </Button>
          <Button variant="outline" size="lg" className="hover-lift">
            Secondary Action
          </Button>
        </div>
      </SlideUp>
    </div>
  </Container>
</section>
```

### **Card Grid**
```tsx
<StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map((item, index) => (
    <StaggerItem key={item.id}>
      <Card 
        className="hover-lift transition-all duration-300 h-full"
        padding="lg"
      >
        <Heading level={3} size="lg" className="mb-3">
          {item.title}
        </Heading>
        <Text color="muted" className="mb-4">
          {item.description}
        </Text>
        <Button variant="outline" className="w-full">
          Learn More
        </Button>
      </Card>
    </StaggerItem>
  ))}
</StaggerContainer>
```

---

## ✅ **Best Practices**

### **Component Usage**

#### **Do's**
- Use semantic heading levels (h1 → h6)
- Apply consistent spacing with design tokens
- Use animation components for smooth interactions
- Implement proper ARIA labels for accessibility
- Follow mobile-first responsive design

#### **Don'ts**
- Don't skip heading levels (h1 → h3)
- Don't use arbitrary values instead of design tokens
- Don't create custom animations without reduced motion support
- Don't forget keyboard navigation support
- Don't ignore touch target sizes on mobile

### **Performance**

#### **Animation Performance**
```tsx
// Good: Use transform and opacity
<div className="hover-lift transition-fast">
  Content
</div>

// Avoid: Animating layout properties
<div className="hover:w-full transition-all">
  Content
</div>
```

#### **Bundle Optimization**
```tsx
// Good: Import only what you need
import { Button, Card } from '@/components/ui';

// Avoid: Importing entire library
import * as UI from '@/components/ui';
```

### **Accessibility**

#### **Keyboard Navigation**
```tsx
// Good: Proper focus management
<Button 
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleAction();
    }
  }}
>
  Action
</Button>
```

#### **Screen Reader Support**
```tsx
// Good: Descriptive ARIA labels
<Button aria-label="Close modal dialog">
  ×
</Button>

// Good: Proper heading hierarchy
<Heading level={1}>Main Title</Heading>
<Heading level={2}>Section Title</Heading>
<Heading level={3}>Subsection Title</Heading>
```

### **Responsive Design**

#### **Mobile-First Approach**
```tsx
// Good: Mobile-first responsive classes
<div className="flex flex-col md:flex-row gap-4 md:gap-6">
  <div className="w-full md:w-1/2">Content</div>
  <div className="w-full md:w-1/2">Content</div>
</div>
```

#### **Touch Targets**
```tsx
// Good: Adequate touch targets
<Button size="md" className="min-h-[44px] min-w-[44px]">
  Touch Action
</Button>
```

---

## 🚀 **Getting Started**

1. **Import components** from the design system
2. **Use design tokens** for consistent styling
3. **Follow accessibility guidelines** for inclusive design
4. **Test on multiple devices** for responsive behavior
5. **Validate with screen readers** for accessibility compliance

For more examples and advanced usage, check the component implementations in `/src/components/ui/` and `/src/components/layout/`.

---

**Happy building! 🎉** 