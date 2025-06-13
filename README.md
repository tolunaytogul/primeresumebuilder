# 🎨 PrimeResumeBuilder - Design System & AI Resume Builder

A modern, production-ready resume builder with a comprehensive design system built on **Next.js 15**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**.

## 🚀 **Live Demo**

- **Production**: [https://primeresumebuilder.vercel.app](https://primeresumebuilder.vercel.app)
- **CV Editor**: [https://primeresumebuilder.vercel.app/cv-editor](https://primeresumebuilder.vercel.app/cv-editor)

## ✨ **Features**

### **🎯 Core Functionality**
- **AI-Powered Resume Builder** with real-time preview
- **4 Professional Templates** (Modern, Classic, Creative, Minimal)
- **Premium Features System** with $9.99 lifetime pricing
- **Auto-save & Data Persistence** with localStorage
- **PDF Export** with optimized layouts
- **Mobile-First Responsive Design**

### **🎨 Design System**
- **Complete UI Component Library** (Button, Card, Heading, Text, Container)
- **Design Tokens** (Colors, Typography, Spacing, Shadows, Transitions)
- **Animation System** with Framer Motion wrappers
- **Accessibility Compliant** (WCAG 2.1 AA standards)
- **Cross-Browser Compatible** (Chrome, Firefox, Safari, Edge)

## 🛠️ **Tech Stack**

- **Framework**: Next.js 15.3.3 with App Router
- **Language**: TypeScript with full type safety
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Animations**: Framer Motion with reduced motion support
- **PDF Generation**: @react-pdf/renderer
- **State Management**: React Context API
- **Deployment**: Vercel with automatic deployments

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 18+ 
- npm, yarn, or pnpm

### **Installation**

```bash
# Clone the repository
git clone https://github.com/tolunaytogul/primeresumebuilder.git
cd primeresumebuilder

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### **Available Scripts**

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
```

## 🎨 **Design System Documentation**

### **🎯 Core Components**

#### **Layout Components**
```tsx
import { Layout, Container } from '@/components/layout';
import { Header, Footer } from '@/components/layout';

// Full page layout with header/footer
<Layout>
  <Container>
    Your content here
  </Container>
</Layout>
```

#### **UI Components**
```tsx
import { Button, Card, Heading, Text } from '@/components/ui';

// Button variants
<Button variant="primary" size="lg">Primary Action</Button>
<Button variant="outline" size="md">Secondary Action</Button>
<Button variant="ghost" size="sm">Tertiary Action</Button>

// Typography
<Heading level={1} size="4xl" className="text-gradient">
  Main Title
</Heading>
<Text size="lg" color="muted">
  Descriptive text content
</Text>

// Cards
<Card padding="lg" shadow="md" className="hover-lift">
  <Heading level={3} size="lg">Card Title</Heading>
  <Text color="muted">Card content</Text>
</Card>
```

#### **Animation Components**
```tsx
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from '@/components/ui';

// Individual animations
<FadeIn delay={0.2}>
  <Heading>Animated Title</Heading>
</FadeIn>

<SlideUp delay={0.4}>
  <Text>Animated content</Text>
</SlideUp>

// Staggered animations
<StaggerContainer>
  <StaggerItem>Item 1</StaggerItem>
  <StaggerItem>Item 2</StaggerItem>
  <StaggerItem>Item 3</StaggerItem>
</StaggerContainer>
```

### **🎨 Design Tokens**

#### **Color System**
```css
/* Primary Colors */
--color-primary-50: #eff6ff;
--color-primary-500: #3b82f6;
--color-primary-600: #2563eb;
--color-primary-700: #1d4ed8;

/* Usage in Tailwind */
bg-primary-500 text-primary-700 border-primary-200
```

#### **Typography Scale**
```css
/* Font Sizes */
--font-size-xs: 0.75rem;    /* text-xs */
--font-size-sm: 0.875rem;   /* text-sm */
--font-size-base: 1rem;     /* text-base */
--font-size-lg: 1.125rem;   /* text-lg */
--font-size-xl: 1.25rem;    /* text-xl */
--font-size-2xl: 1.5rem;    /* text-2xl */
--font-size-3xl: 1.875rem;  /* text-3xl */
--font-size-4xl: 2.25rem;   /* text-4xl */
```

#### **Spacing Scale**
```css
/* Spacing */
--spacing-1: 0.25rem;   /* 4px */
--spacing-2: 0.5rem;    /* 8px */
--spacing-4: 1rem;      /* 16px */
--spacing-6: 1.5rem;    /* 24px */
--spacing-8: 2rem;      /* 32px */
```

### **🎬 Animation Guidelines**

#### **Duration Standards**
- **Fast**: 150ms - Hover effects, focus states
- **Normal**: 300ms - Component transitions
- **Slow**: 500ms - Page transitions, complex animations

#### **Easing Functions**
```css
--ease-out: cubic-bezier(0, 0, 0.2, 1);           /* Default */
--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);  /* Smooth */
--ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);  /* Dramatic */
```

#### **Accessibility**
- Respects `prefers-reduced-motion`
- Provides CSS fallbacks
- Maintains focus indicators

## 📱 **Responsive Design**

### **Breakpoint System**
```css
/* Mobile First Approach */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
```

### **Mobile Optimizations**
- **Touch Targets**: Minimum 44px for interactive elements
- **Safe Area Insets**: Support for notched devices
- **Mobile-First Layout**: CV Editor prioritizes preview on mobile
- **Touch Gestures**: Optimized for thumb navigation

## ♿ **Accessibility Features**

### **Keyboard Navigation**
- Full keyboard accessibility
- Logical tab order
- Visible focus indicators
- Skip links for screen readers

### **Screen Reader Support**
- Semantic HTML structure
- ARIA labels and descriptions
- Proper heading hierarchy
- Live regions for dynamic content

### **Visual Accessibility**
- High contrast color combinations
- Scalable text (up to 200%)
- Focus-visible outlines
- Reduced motion support

## 🏗️ **Architecture**

### **Project Structure**
```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles & design tokens
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Homepage
│   └── cv-editor/        # CV Editor page
├── components/
│   ├── ui/               # Design system components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── animations.tsx
│   │   └── index.ts
│   ├── layout/           # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Layout.tsx
│   └── [feature]/        # Feature-specific components
├── context/              # React Context providers
├── lib/                  # Utilities and helpers
├── styles/               # Additional CSS utilities
└── types/                # TypeScript type definitions
```

### **State Management**
- **React Context API** for global state
- **localStorage** for data persistence
- **Auto-save** functionality
- **Premium features** state management

## 🚀 **Deployment**

### **Vercel (Recommended)**
```bash
# Deploy to Vercel
npm run build
vercel --prod
```

### **Environment Variables**
```env
# Add to .env.local
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### **Build Optimization**
- **Static Generation** for optimal performance
- **Bundle Analysis** with webpack-bundle-analyzer
- **Image Optimization** with Next.js Image component
- **Font Optimization** with next/font

## 📊 **Performance Metrics**

- **Homepage**: 153kB (45.7kB page + 107kB shared)
- **CV Editor**: 661kB (508kB page + 153kB shared)
- **Lighthouse Score**: 95+ Performance, 100 Accessibility
- **Core Web Vitals**: All metrics in green

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Development Guidelines**
- Follow TypeScript strict mode
- Use design system components
- Maintain accessibility standards
- Write responsive, mobile-first code
- Include proper ARIA labels

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **Next.js Team** for the amazing framework
- **Tailwind CSS** for the utility-first approach
- **Framer Motion** for smooth animations
- **Vercel** for seamless deployment
- **React PDF** for PDF generation capabilities

---

**Built with ❤️ for job seekers worldwide**

For questions or support, please open an issue on GitHub.
