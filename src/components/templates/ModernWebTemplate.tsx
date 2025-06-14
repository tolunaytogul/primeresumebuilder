'use client';

import React from 'react';
import { CVData } from '@/types/cv';

interface ModernWebTemplateProps {
  cvData: CVData;
}

const ModernWebTemplate: React.FC<ModernWebTemplateProps> = ({ cvData }) => {
  const { personalInfo, experiences, education, skills } = cvData;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const getSkillBadgeClass = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-gray-100 text-gray-600 border-gray-300';
      case 'Intermediate':
            return 'bg-primary-100 text-primary-700 border-primary-300';
  case 'Advanced':
    return 'bg-accent-100 text-accent-700 border-accent-300';
      case 'Expert':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-300';
    }
  };

  return (
    <div className="bg-white p-4 lg:p-8 font-sans text-sm leading-relaxed">
      {/* Header */}
              <div className="mb-8 pb-6 border-b-4 border-primary-500">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
          {personalInfo.name || 'Full Name'}
        </h1>
                  <h2 className="text-lg lg:text-xl text-primary-600 font-bold mb-4">
          {personalInfo.title || 'Job Title'}
        </h2>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {personalInfo.email && (
            <span className="break-all">{personalInfo.email}</span>
          )}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </div>

      {/* Professional Summary */}
      {personalInfo.summary && (
        <div className="mb-8">
          <h3 className="text-base font-bold text-gray-800 mb-4 uppercase tracking-wide border-b-2 border-gray-200 pb-2">
            Professional Summary
          </h3>
          <p className="text-gray-700 leading-relaxed text-justify">
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Work Experience */}
      {experiences.length > 0 && (
        <div className="mb-8">
          <h3 className="text-base font-bold text-gray-800 mb-4 uppercase tracking-wide border-b-2 border-gray-200 pb-2">
            Work Experience
          </h3>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div 
                key={exp.id} 
                className={`${index !== experiences.length - 1 ? 'pb-6 border-b border-gray-100' : ''}`}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 text-sm">
                      {exp.position}
                    </h4>
                    <p className="text-primary-600 font-bold text-sm mt-1">
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-gray-600 text-xs font-bold mt-2 sm:mt-0 sm:text-right">
                    {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                  </div>
                </div>
                {exp.description && (
                  <p className="text-gray-600 text-xs leading-relaxed mt-2">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-8">
          <h3 className="text-base font-bold text-gray-800 mb-4 uppercase tracking-wide border-b-2 border-gray-200 pb-2">
            Education
          </h3>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div 
                key={edu.id} 
                className={`${index !== education.length - 1 ? 'pb-4 border-b border-gray-50' : ''}`}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 text-sm">
                      {edu.degree}
                    </h4>
                    <p className="text-green-600 font-bold text-sm mt-1">
                      {edu.school}
                    </p>
                    <div className="text-gray-600 text-xs mt-1">
                      {edu.field && <span>{edu.field}</span>}
                      {edu.gpa && <span> • GPA: {edu.gpa}</span>}
                    </div>
                  </div>
                  {edu.startDate && edu.endDate && (
                    <div className="text-gray-600 text-xs mt-2 sm:mt-0 sm:text-right">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-8">
          <h3 className="text-base font-bold text-gray-800 mb-4 uppercase tracking-wide border-b-2 border-gray-200 pb-2">
            Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className={`px-3 py-1 rounded text-xs font-bold border ${getSkillBadgeClass(skill.level)}`}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModernWebTemplate; 