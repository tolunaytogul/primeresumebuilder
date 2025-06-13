import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { PageTransition } from '@/components/ui';

interface LayoutProps {
  children: ReactNode;
  className?: string;
  showHeader?: boolean;
  showFooter?: boolean;
  headerClassName?: string;
  footerClassName?: string;
}

export function Layout({
  children,
  className = '',
  showHeader = true,
  showFooter = true,
  headerClassName,
  footerClassName
}: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {showHeader && <Header className={headerClassName} />}
      
      <main className={`flex-1 ${className}`}>
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      
      {showFooter && <Footer className={footerClassName} />}
    </div>
  );
} 