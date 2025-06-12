import Link from "next/link";
import TemplatePreview from '@/components/TemplatePreview';
import PremiumModal from '@/components/PremiumModal';
import { AVAILABLE_TEMPLATES } from '@/types/template';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
            PrimeResumeBuilder
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 px-2">
            Create modern, professional resumes with AI assistance
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link 
              href="/cv-editor"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 sm:px-8 rounded-lg transition-colors"
            >
              Start Building Resume
            </Link>
            <a 
              href="#templates"
              className="w-full sm:w-auto border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 sm:px-8 rounded-lg transition-colors"
            >
              View Templates
            </a>
          </div>
        </div>
      </div>
      
      {/* Template Showcase */}
      <div id="templates" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Perfect Template
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select from our professionally designed templates to create a resume that stands out
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {AVAILABLE_TEMPLATES.map((template) => (
              <div key={template.id} className="group">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
                  {/* Template Preview */}
                  <div className="p-8 bg-gray-50">
                    <TemplatePreview 
                      templateType={template.id} 
                      className="w-full h-32 mx-auto"
                    />
                  </div>
                  
                  {/* Template Info */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                      {template.isPremium && (
                        <span className="px-2 py-1 bg-gradient-to-r from-orange-400 to-orange-500 text-white text-xs font-medium rounded-full">
                          Premium
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">{template.description}</p>
                    
                    {/* Template Features */}
                    <div className="flex flex-wrap gap-1 mb-6">
                      {template.id === 'modern' && (
                        <>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Professional</span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Skill Badges</span>
                        </>
                      )}
                      {template.id === 'classic' && (
                        <>
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">Traditional</span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">Conservative</span>
                        </>
                      )}
                      {template.id === 'creative' && (
                        <>
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">Two-Column</span>
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">Progress Bars</span>
                        </>
                      )}
                      {template.id === 'minimal' && (
                        <>
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Clean</span>
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Spacious</span>
                        </>
                      )}
                    </div>
                    
                    <Link
                      href="/cv-editor"
                      className="w-full px-4 py-3 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors text-center block"
                    >
                      Use This Template
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link
              href="/cv-editor"
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Building Your Resume
            </Link>
          </div>
        </div>
      </div>
      
      {/* Premium Modal */}
      <PremiumModal />
    </div>
  );
}
