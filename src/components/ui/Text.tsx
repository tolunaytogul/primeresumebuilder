import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TextProps {
  children: ReactNode;
  as?: 'p' | 'span' | 'label' | 'small' | 'div';
  className?: string;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'default' | 'muted' | 'primary' | 'secondary' | 'success' | 'danger';
  align?: 'left' | 'center' | 'right' | 'justify';
  leading?: 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose';
}

const sizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl'
};

const weightClasses = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold'
};

const colorClasses = {
  default: 'text-foreground',
  muted: 'text-neutral-600',
  primary: 'text-primary',
  secondary: 'text-secondary',
  success: 'text-success',
  danger: 'text-danger'
};

const alignClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify'
};

const leadingClasses = {
  tight: 'leading-tight',
  snug: 'leading-snug',
  normal: 'leading-normal',
  relaxed: 'leading-relaxed',
  loose: 'leading-loose'
};

export function Text({
  children,
  as: Component = 'p',
  className,
  size = 'base',
  weight = 'normal',
  color = 'default',
  align = 'left',
  leading = 'normal'
}: TextProps) {
  return (
    <Component
      className={cn(
        'font-sans',
        sizeClasses[size],
        weightClasses[weight],
        colorClasses[color],
        alignClasses[align],
        leadingClasses[leading],
        className
      )}
    >
      {children}
    </Component>
  );
} 