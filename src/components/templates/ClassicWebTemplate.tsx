'use client';

import React from 'react';
import { CVData } from '@/types/cv';

interface ClassicWebTemplateProps {
  cvData: CVData;
}

const ClassicWebTemplate: React.FC<ClassicWebTemplateProps> = ({ cvData }) => {
  const { personalInfo, experiences, education, skills } = cvData;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  // Group skills by level for classic presentation
  const skillsByLevel = skills.reduce((acc, skill) => {
    if (!acc[skill.level]) acc[skill.level] = [];
    acc[skill.level].push(skill.name);
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <div className="bg-white p-4 lg:p-8 font-serif text-sm leading-relaxed">
      {/* Header */}
      <div className="mb-8 pb-6 border-b-2 border-black text-center">
        <h1 className="text-2xl lg:text-3xl font-bold text-black mb-2 uppercase tracking-widest">
          {personalInfo.name || 'Full Name'}
        </h1>
        <h2 className="text-lg lg:text-xl text-gray-700 italic mb-4">
          {personalInfo.title || 'Job Title'}
        </h2>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
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
          <h3 className="text-base font-bold text-black mb-4 uppercase tracking-wide text-center border-b border-black pb-2">
            Professional Summary
          </h3>
          <p className="text-gray-700 leading-relaxed text-justify italic">
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Work Experience */}
      {experiences.length > 0 && (
        <div className="mb-8">
          <h3 className="text-base font-bold text-black mb-4 uppercase tracking-wide text-center border-b border-black pb-2">
            Professional Experience
          </h3>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div 
                key={exp.id} 
                className={`${index !== experiences.length - 1 ? 'pb-6 border-b border-gray-300' : ''}`}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                  <div className="flex-1">
                    <h4 className="font-bold text-black text-sm">
                      {exp.position}
                    </h4>
                    <p className="text-gray-700 italic text-sm mt-1">
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
          <h3 className="text-base font-bold text-black mb-4 uppercase tracking-wide text-center border-b border-black pb-2">
            Education
          </h3>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div 
                key={edu.id} 
                className={`${index !== education.length - 1 ? 'pb-4 border-b border-gray-200' : ''}`}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                  <div className="flex-1">
                    <h4 className="font-bold text-black text-sm">
                      {edu.degree}
                    </h4>
                    <p className="text-gray-700 italic text-sm mt-1">
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
          <h3 className="text-base font-bold text-black mb-4 uppercase tracking-wide text-center border-b border-black pb-2">
            Technical Skills
          </h3>
          <div className="space-y-3">
            {Object.entries(skillsByLevel).map(([level, skillNames]) => (
              <div key={level} className="flex flex-col sm:flex-row sm:items-center">
                <div className="font-bold text-black text-xs uppercase min-w-0 sm:min-w-[80px] mb-1 sm:mb-0">
                  {level}:
                </div>
                <div className="text-gray-700 text-xs flex-1">
                  {skillNames.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassicWebTemplate; 