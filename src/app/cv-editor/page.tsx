import CVForm from '@/components/CVForm';
import CVPreview from '@/components/CVPreview';
import SaveStatusIndicator from '@/components/SaveStatusIndicator';
import DataManagement from '@/components/DataManagement';
import TemplateSelector from '@/components/TemplateSelector';
import Link from 'next/link';

export default function CVEditorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-4 lg:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 lg:mb-8 gap-4 sm:gap-0">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Resume Builder</h1>
              <SaveStatusIndicator />
            </div>
            <p className="text-gray-600 text-sm lg:text-base">Create your professional resume</p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <TemplateSelector />
            <Link 
              href="/"
              className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium whitespace-nowrap"
            >
              ← Home
            </Link>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Form Section */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
              <CVForm />
              <DataManagement />
            </div>
          </div>
          
          {/* Preview Section */}
          <div className="w-full lg:w-1/2">
            <CVPreview />
          </div>
        </div>
      </div>
    </div>
  );
} 