'use client';

import CVForm from '@/components/CVForm';
import CVPreview from '@/components/CVPreview';
import SaveStatusIndicator from '@/components/SaveStatusIndicator';
import TemplateSelector from '@/components/TemplateSelector';
import PremiumModal from '@/components/PremiumModal';
import PremiumBadge from '@/components/PremiumBadge';
import Link from 'next/link';
import { useCV } from '@/context/CVContext';
import { useState } from 'react';
import { Layout } from '@/components/layout';
import { Container, Button, Heading, Text, Card, FadeIn, SlideUp } from '@/components/ui';

export default function CVEditorPage() {
  const { clearSavedData, loadSampleData, hasSavedData } = useCV();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClearData = () => {
    if (showConfirm) {
      clearSavedData();
      setShowConfirm(false);
    } else {
      setShowConfirm(true);
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <Layout className="bg-neutral-50">
      <Container className="py-4 lg:py-8">
        {/* Header */}
        <FadeIn>
          <div className="flex flex-col gap-4 mb-6 lg:mb-8">
            {/* Top Row - Title and Navigation */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <Heading level={1} size="3xl" className="text-gradient">
                    Resume Builder
                  </Heading>
                  <SaveStatusIndicator />
                  <PremiumBadge />
                </div>
                <Text color="muted">Create your professional resume</Text>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <TemplateSelector />
                <Button variant="ghost" size="sm" className="hover-lift">
                  <Link href="/">
                    ← Home
                  </Link>
                </Button>
              </div>
            </div>

            {/* Data Management Controls - Mobile Optimized */}
            <Card className="hover-lift transition-all duration-300">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Heading level={4} size="sm" className="mb-1">Quick Actions</Heading>
                  <Text size="xs" color="muted">Your data is automatically saved</Text>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  {/* Sample Data Button */}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={loadSampleData}
                    className="bg-primary-50 text-primary-700 border-primary-200 hover:bg-primary-100 whitespace-nowrap"
                  >
                    📄 Load Sample Data
                  </Button>
                  
                  {/* Clear Data Button */}
                  {hasSavedData() && (
                    <div className="flex gap-2">
                      {showConfirm ? (
                        <>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={handleClearData}
                            className="whitespace-nowrap"
                          >
                            ✓ Confirm Clear
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCancel}
                            className="whitespace-nowrap"
                          >
                            ✕ Cancel
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleClearData}
                          className="text-danger-600 hover:text-danger-800 border-danger-200 hover:border-danger-300 whitespace-nowrap"
                        >
                          🗑️ Clear All Data
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </FadeIn>
        
        {/* Mobile-First Layout: Preview First, Then Form */}
        <div className="flex flex-col gap-6 lg:hidden">
          {/* CV Preview Section - Now at Top for Mobile */}
          <SlideUp delay={0.2}>
            <div className="w-full">
              <div className="mb-4">
                <Heading level={2} size="lg" className="mb-2">📋 Live Preview</Heading>
                <Text size="sm" color="muted">See your changes in real-time</Text>
              </div>
              <CVPreview />
            </div>
          </SlideUp>
          
          {/* Form Section - Below Preview for Mobile */}
          <SlideUp delay={0.4}>
            <div className="w-full">
              <div className="mb-4">
                <Heading level={2} size="lg" className="mb-2">✏️ Edit Your Resume</Heading>
                <Text size="sm" color="muted">Fill in your information below</Text>
              </div>
              <Card padding="lg" className="hover-lift transition-all duration-300">
                <CVForm />
              </Card>
            </div>
          </SlideUp>
        </div>

        {/* Desktop Layout: Side by Side */}
        <div className="hidden lg:block">
          <div className="flex gap-8 mt-8">
            {/* Form Section */}
            <SlideUp delay={0.2}>
              <div className="w-1/2">
                <div className="mb-4">
                  <Heading level={2} size="lg" className="mb-2">✏️ Edit Your Resume</Heading>
                  <Text size="sm" color="muted">Fill in your information</Text>
                </div>
                <Card padding="lg" className="hover-lift transition-all duration-300">
                  <CVForm />
                </Card>
              </div>
            </SlideUp>
            
            {/* Preview Section */}
            <SlideUp delay={0.4}>
              <div className="w-1/2">
                <div className="mb-4">
                  <Heading level={2} size="lg" className="mb-2">📋 Live Preview</Heading>
                  <Text size="sm" color="muted">See your changes in real-time</Text>
                </div>
                <CVPreview />
              </div>
            </SlideUp>
          </div>
        </div>
      </Container>
      
      {/* Premium Modal */}
      <PremiumModal />
    </Layout>
  );
} 