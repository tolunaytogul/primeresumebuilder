'use client';

import React from 'react';
import { useCV } from '@/context/CVContext';
import DownloadButton from './DownloadButton';

export default function CVPreview() {
  const { cvData } = useCV();
  const { personalInfo, experiences, education, skills } = cvData;

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Intermediate': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Advanced': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Expert': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-4">
      {/* Download Button */}
      <DownloadButton cvData={cvData} />
      
      {/* CV Preview */}
      <div className="bg-white p-6 lg:p-10 shadow-lg rounded-lg min-h-[600px] lg:min-h-[800px] font-sans">
        {/* Header - Personal Information */}
        <div className="border-b border-gray-200 pb-6 lg:pb-8 mb-6 lg:mb-8">
          <div className="mb-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
              {personalInfo.name || 'Full Name'}
            </h1>
            <h2 className="text-xl lg:text-2xl text-blue-600 font-normal">
              {personalInfo.title || 'Job Title'}
            </h2>
          </div>
          
          <div className="flex flex-wrap gap-4 lg:gap-6 text-sm lg:text-base text-gray-600">
            {personalInfo.email && (
              <div className="flex items-center gap-2">
                <span className="font-semibold">Email:</span>
                <span className="break-all">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <span className="font-semibold">Phone:</span>
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-2">
                <span className="font-semibold">Location:</span>
                <span>{personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Professional Summary */}
        {personalInfo.summary && (
          <div className="mb-6 lg:mb-8">
            <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-3 lg:mb-4 uppercase tracking-wide border-b border-blue-600 pb-1">
              Professional Summary
            </h3>
            <p className="text-gray-700 leading-relaxed text-sm lg:text-base text-justify">
              {personalInfo.summary}
            </p>
          </div>
        )}

        {/* Work Experience */}
        {experiences.length > 0 && (
          <div className="mb-6 lg:mb-8">
            <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-3 lg:mb-4 uppercase tracking-wide border-b border-blue-600 pb-1">
              Work Experience
            </h3>
            <div className="space-y-4 lg:space-y-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="border-l-4 border-blue-600 pl-4 lg:pl-6 relative">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-2">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-base lg:text-lg">{exp.position}</h4>
                      <p className="text-blue-600 font-bold text-sm lg:text-base">{exp.company}</p>
                    </div>
                    <p className="text-xs lg:text-sm text-gray-500 font-semibold lg:text-right lg:min-w-[120px] mt-1 lg:mt-0">
                      {exp.startDate && new Date(exp.startDate + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {exp.isCurrentJob ? 'Present' : (exp.endDate && new Date(exp.endDate + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }))}
                    </p>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 text-xs lg:text-sm leading-relaxed mt-2">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-6 lg:mb-8">
            <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-3 lg:mb-4 uppercase tracking-wide border-b border-blue-600 pb-1">
              Education
            </h3>
            <div className="space-y-4 lg:space-y-5">
              {education.map((edu) => (
                <div key={edu.id} className="border-l-4 border-green-600 pl-4 lg:pl-6">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-1">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-base lg:text-lg">{edu.degree}</h4>
                      <p className="text-green-600 font-bold text-sm lg:text-base">{edu.school}</p>
                      <div className="text-xs lg:text-sm text-gray-500 mt-1">
                        {edu.field && <span>{edu.field}</span>}
                        {edu.gpa && <span className="ml-2">• GPA: {edu.gpa}</span>}
                      </div>
                    </div>
                    {edu.startDate && edu.endDate && (
                      <p className="text-xs lg:text-sm text-gray-500 font-semibold lg:text-right lg:min-w-[120px] mt-1 lg:mt-0">
                        {new Date(edu.startDate + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {new Date(edu.endDate + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-6 lg:mb-8">
            <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-3 lg:mb-4 uppercase tracking-wide border-b border-blue-600 pb-1">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2 lg:gap-3">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className={`px-3 lg:px-4 py-2 rounded-full text-xs lg:text-sm font-bold border ${getSkillLevelColor(skill.level)}`}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!personalInfo.name && !personalInfo.title && !personalInfo.email && (
          <div className="text-center text-gray-400 py-12 lg:py-16">
            <div className="text-5xl lg:text-6xl mb-4">📄</div>
            <p className="text-lg lg:text-xl font-medium">Your resume will appear here</p>
            <p className="text-sm lg:text-base mt-2">Start by filling out the form above</p>
          </div>
        )}
      </div>
    </div>
  );
} 