'use client';

import React from 'react';
import { CVData } from '@/types/cv';

interface MinimalWebTemplateProps {
  cvData: CVData;
}

const MinimalWebTemplate: React.FC<MinimalWebTemplateProps> = ({ cvData }) => {
  const { personalInfo, experiences, education, skills } = cvData;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white p-8 lg:p-12 font-sans text-sm leading-loose max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl lg:text-5xl font-light text-black mb-3 tracking-tight">
          {personalInfo.name || 'Full Name'}
        </h1>
        <h2 className="text-lg lg:text-xl text-gray-600 mb-8 font-normal">
          {personalInfo.title || 'Job Title'}
        </h2>
        <div className="flex flex-wrap gap-6 text-sm text-gray-500">
          {personalInfo.email && (
            <span className="break-all">{personalInfo.email}</span>
          )}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </div>

      {/* Professional Summary */}
      {personalInfo.summary && (
        <div className="mb-12">
          <h3 className="text-base font-bold text-black mb-6 lowercase tracking-wide">
            about
          </h3>
          <p className="text-gray-600 leading-loose text-base max-w-3xl">
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Work Experience */}
      {experiences.length > 0 && (
        <div className="mb-12">
          <h3 className="text-base font-bold text-black mb-8 lowercase tracking-wide">
            experience
          </h3>
          <div className="space-y-10">
            {experiences.map((exp) => (
              <div key={exp.id} className="space-y-3">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-baseline">
                  <div className="flex-1">
                    <h4 className="font-bold text-black text-base mb-1">
                      {exp.position}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-gray-400 text-xs mt-2 lg:mt-0 lg:text-right">
                    {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'present' : formatDate(exp.endDate)}
                  </div>
                </div>
                {exp.description && (
                  <p className="text-gray-500 text-sm leading-relaxed mt-4 max-w-3xl">
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
        <div className="mb-12">
          <h3 className="text-base font-bold text-black mb-8 lowercase tracking-wide">
            education
          </h3>
          <div className="space-y-8">
            {education.map((edu) => (
              <div key={edu.id} className="space-y-2">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-baseline">
                  <div className="flex-1">
                    <h4 className="font-bold text-black text-base mb-1">
                      {edu.degree}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {edu.school}
                    </p>
                    <div className="text-gray-500 text-xs mt-1">
                      {edu.field && <span>{edu.field}</span>}
                      {edu.gpa && <span> • {edu.gpa}</span>}
                    </div>
                  </div>
                  {edu.startDate && edu.endDate && (
                    <div className="text-gray-400 text-xs mt-2 lg:mt-0 lg:text-right">
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
        <div className="mb-12">
          <h3 className="text-base font-bold text-black mb-8 lowercase tracking-wide">
            skills
          </h3>
          <div className="flex flex-wrap gap-4">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="text-gray-600 text-sm"
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

export default MinimalWebTemplate; 