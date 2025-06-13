import Link from "next/link";
import TemplatePreview from '@/components/TemplatePreview';
import PremiumModal from '@/components/PremiumModal';
import { AVAILABLE_TEMPLATES } from '@/types/template';
import { Layout } from '@/components/layout';
import { Container, Button, Heading, Text, Card, FadeIn, SlideUp, StaggerContainer, StaggerItem } from '@/components/ui';

export default function HomePage() {
  return (
    <Layout>
      <div className="bg-gradient-to-br from-primary-50 to-accent-50">
        {/* Hero Section */}
        <section className="py-20 lg:py-32">
          <Container>
            <div className="text-center max-w-4xl mx-auto">
              <FadeIn>
                <Heading level={1} size="5xl" className="text-gradient mb-6">
                  PrimeResumeBuilder
                </Heading>
              </FadeIn>
              
              <SlideUp delay={0.2}>
                <Text size="xl" color="muted" className="mb-8 max-w-2xl mx-auto">
                  Create modern, professional resumes with AI assistance. 
                  Stand out from the crowd with beautiful templates and smart suggestions.
                </Text>
              </SlideUp>
              
              <SlideUp delay={0.4}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="hover-lift">
                    <Link href="/cv-editor">
                      Start Building Resume
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="hover-lift">
                    <a href="#templates">
                      View Templates
                    </a>
                  </Button>
                </div>
              </SlideUp>
            </div>
          </Container>
        </section>
      
        {/* Template Showcase */}
        <section id="templates" className="bg-white py-20">
          <Container>
            <div className="text-center mb-16">
              <FadeIn>
                <Heading level={2} size="4xl" className="mb-4">
                  Choose Your Perfect Template
                </Heading>
              </FadeIn>
              
              <SlideUp delay={0.2}>
                <Text size="lg" color="muted" className="max-w-2xl mx-auto">
                  Select from our professionally designed templates to create a resume that stands out
                </Text>
              </SlideUp>
            </div>
            
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {AVAILABLE_TEMPLATES.map((template) => (
                <StaggerItem key={template.id}>
                  <Card className="group hover-lift transition-all duration-300">
                    {/* Template Preview */}
                    <div className="p-8 bg-neutral-50">
                      <TemplatePreview 
                        templateType={template.id} 
                        className="w-full h-32 mx-auto"
                      />
                    </div>
                    
                    {/* Template Info */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Heading level={3} size="lg">{template.name}</Heading>
                        {template.isPremium && (
                          <span className="px-2 py-1 bg-gradient-to-r from-accent-400 to-accent-500 text-white text-xs font-medium rounded-full">
                            Premium
                          </span>
                        )}
                      </div>
                      
                      <Text size="sm" color="muted" className="mb-4 leading-relaxed">
                        {template.description}
                      </Text>
                      
                      {/* Template Features */}
                      <div className="flex flex-wrap gap-1 mb-6">
                        {template.id === 'modern' && (
                          <>
                            <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">Professional</span>
                            <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">Skill Badges</span>
                          </>
                        )}
                        {template.id === 'classic' && (
                          <>
                            <span className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded-full">Traditional</span>
                            <span className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded-full">Conservative</span>
                          </>
                        )}
                        {template.id === 'creative' && (
                          <>
                            <span className="px-2 py-1 bg-accent-100 text-accent-700 text-xs rounded-full">Two-Column</span>
                            <span className="px-2 py-1 bg-accent-100 text-accent-700 text-xs rounded-full">Progress Bars</span>
                          </>
                        )}
                        {template.id === 'minimal' && (
                          <>
                            <span className="px-2 py-1 bg-success-100 text-success-700 text-xs rounded-full">Clean</span>
                            <span className="px-2 py-1 bg-success-100 text-success-700 text-xs rounded-full">Spacious</span>
                          </>
                        )}
                      </div>
                      
                      <Button variant="secondary" className="w-full">
                        <Link href="/cv-editor">
                          Use This Template
                        </Link>
                      </Button>
                    </div>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
            
            <div className="text-center mt-16">
              <SlideUp delay={0.6}>
                <Button size="lg" className="hover-lift">
                  <Link href="/cv-editor">
                    Start Building Your Resume
                  </Link>
                </Button>
              </SlideUp>
            </div>
          </Container>
        </section>
      </div>
      
      {/* Premium Modal */}
      <PremiumModal />
    </Layout>
  );
}
