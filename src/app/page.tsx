import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
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
          <button className="w-full sm:w-auto border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 sm:px-8 rounded-lg transition-colors">
            View Templates
          </button>
        </div>
      </div>
    </div>
  );
}
