import CVForm from '@/components/CVForm';
import CVPreview from '@/components/CVPreview';
import Link from 'next/link';

export default function CVEditorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Resume Builder</h1>
            <p className="text-gray-600">Create your professional resume</p>
          </div>
          <Link 
            href="/"
            className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Home
          </Link>
        </div>
        
        <div className="flex gap-8">
          {/* Sol taraf - Form */}
          <div className="w-1/2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <CVForm />
            </div>
          </div>
          
          {/* Sağ taraf - Önizleme */}
          <div className="w-1/2">
            <CVPreview />
          </div>
        </div>
      </div>
    </div>
  );
} 