'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container, Button, Text } from '@/components/ui';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'CV Editor', href: '/cv-editor' },
  { name: 'Templates', href: '#templates' },
  { name: 'Pricing', href: '#pricing' }
];

export function Header({ className }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className={cn('bg-surface-brand border-b border-ui-brand sticky top-0 z-[1020]', className)}>
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg flex items-center justify-center">
              <Text as="span" size="sm" weight="bold" className="text-white">
                PR
              </Text>
            </div>
            <Text as="span" size="lg" weight="bold" className="text-content-inverse">
              PrimeResume
            </Text>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-content-inverse text-opacity-80 hover:text-content-inverse hover:text-opacity-100 transition-fast font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm" className="border-content-inverse border-opacity-30 text-content-inverse hover:bg-content-inverse hover:bg-opacity-10">
              Sign In
            </Button>
            <Button size="sm" className="bg-accent-600 text-white hover:bg-accent-700">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-content-inverse text-opacity-80 hover:text-content-inverse hover:bg-content-inverse hover:bg-opacity-10 transition-fast touch-manipulation"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div 
            id="mobile-menu" 
            className="md:hidden py-4 border-t border-ui-brand border-opacity-30"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-content-inverse text-opacity-80 hover:text-content-inverse hover:text-opacity-100 transition-fast font-medium px-2 py-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-ui-brand border-opacity-30">
                <Button variant="outline" size="sm" className="border-content-inverse border-opacity-30 text-content-inverse hover:bg-content-inverse hover:bg-opacity-10">
                  Sign In
                </Button>
                <Button size="sm" className="bg-accent-600 text-white hover:bg-accent-700">
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
} 