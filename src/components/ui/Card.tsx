import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  shadow?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  padding?: 'sm' | 'md' | 'lg';
  header?: ReactNode;
  footer?: ReactNode;
}

const shadowVariants = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl'
};

const paddingVariants = {
  sm: 'p-3 sm:p-4',
  md: 'p-4 sm:p-6',
  lg: 'p-6 sm:p-8'
};

export function Card({
  children,
  className,
  shadow = 'md',
  padding = 'md',
  header,
  footer
}: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-lg border border-neutral-200 transition-fast',
        shadowVariants[shadow],
        className
      )}
    >
      {header && (
        <div className={cn(
          'border-b border-neutral-200',
          paddingVariants[padding],
          'pb-4'
        )}>
          {header}
        </div>
      )}
      
      <div className={cn(
        paddingVariants[padding],
        header && 'pt-4',
        footer && 'pb-4'
      )}>
        {children}
      </div>
      
      {footer && (
        <div className={cn(
          'border-t border-neutral-200',
          paddingVariants[padding],
          'pt-4'
        )}>
          {footer}
        </div>
      )}
    </div>
  );
} 