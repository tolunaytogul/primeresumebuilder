import { ReactNode, createElement } from 'react';
import { cn } from '@/lib/utils';

interface HeadingProps {
  children: ReactNode;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  color?: 'default' | 'muted' | 'primary' | 'secondary' | 'danger';
}

const headingDefaults = {
  1: { size: '4xl' as const, weight: 'bold' as const },
  2: { size: '3xl' as const, weight: 'bold' as const },
  3: { size: '2xl' as const, weight: 'semibold' as const },
  4: { size: 'xl' as const, weight: 'semibold' as const },
  5: { size: 'lg' as const, weight: 'medium' as const },
  6: { size: 'base' as const, weight: 'medium' as const }
};

const sizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
  '6xl': 'text-6xl'
};

const weightClasses = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold'
};

const colorClasses = {
  default: 'text-foreground',
  muted: 'text-neutral-600',
  primary: 'text-primary',
  secondary: 'text-secondary',
  danger: 'text-danger'
};

export function Heading({
  children,
  level,
  className,
  size,
  weight,
  color = 'default'
}: HeadingProps) {
  const tag = `h${level}`;
  const defaults = headingDefaults[level];
  
  const finalSize = size || defaults.size;
  const finalWeight = weight || defaults.weight;

  return createElement(
    tag,
    {
      className: cn(
        'font-sans leading-tight tracking-tight',
        sizeClasses[finalSize],
        weightClasses[finalWeight],
        colorClasses[color],
        className
      )
    },
    children
  );
} 