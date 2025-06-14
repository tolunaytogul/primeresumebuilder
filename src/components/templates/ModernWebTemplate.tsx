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
        return 'bg-surface-secondary text-content-tertiary border-ui-secondary';
      case 'Intermediate': 
        return 'bg-primary-100 text-primary-800 border-primary-200';
      case 'Advanced': 
        return 'bg-accent-100 text-accent-800 border-accent-200';
      case 'Expert': 
        return 'bg-success-100 text-success-800 border-success-200';
      default: 
        return 'bg-surface-secondary text-content-tertiary border-ui-secondary';
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 font-sans leading-relaxed">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-heading-xl text-content-primary mb-2 break-words">
          {personalInfo.name || 'Full Name'}
        </h1>
        <h2 className="text-heading-md text-content-brand mb-3 sm:mb-4 break-words">
          {personalInfo.title || 'Job Title'}
        </h2>
        
        {/* Contact Info */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-caption text-content-tertiary">
          {personalInfo.email && (
            <div className="flex items-center gap-1 sm:gap-2">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-primary-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span className="break-all min-w-0">{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1 sm:gap-2">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-primary-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="break-words min-w-0">{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1 sm:gap-2">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-primary-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="break-words min-w-0">{personalInfo.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {personalInfo.summary && (
        <div className="mb-6 sm:mb-8">
          <h3 className="text-overline text-content-brand mb-3 sm:mb-4 border-b-2 border-ui-brand pb-2">
            Professional Summary
          </h3>
          <p className="text-body-md text-content-secondary">
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Work Experience */}
      {experiences.length > 0 && (
        <div className="mb-6 sm:mb-8">
          <h3 className="text-overline text-content-brand mb-4 sm:mb-6 border-b-2 border-ui-brand pb-2">
            Work Experience
          </h3>
          <div className="space-y-4 sm:space-y-6">
            {experiences.map((exp) => (
              <div key={exp.id} className="border-l-4 border-ui-brand pl-3 sm:pl-4">
                <div className="flex flex-col gap-1 sm:gap-2 mb-2">
                  <div className="flex-1">
                    <h4 className="text-heading-sm text-content-primary break-words">
                      {exp.position}
                    </h4>
                    <p className="text-body-sm text-content-brand font-semibold mt-1 break-words">
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-caption text-content-tertiary font-medium">
                    {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                  </div>
                </div>
                {exp.description && (
                  <p className="text-body-sm text-content-secondary">
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
        <div className="mb-6 sm:mb-8">
          <h3 className="text-overline text-content-brand mb-4 sm:mb-6 border-b-2 border-ui-brand pb-2">
            Education
          </h3>
          <div className="space-y-4 sm:space-y-6">
            {education.map((edu) => (
              <div key={edu.id} className="border-l-4 border-ui-brand pl-3 sm:pl-4">
                <div className="flex flex-col gap-1 sm:gap-2">
                  <div className="flex-1">
                    <h4 className="text-heading-sm text-content-primary break-words">
                      {edu.degree}
                    </h4>
                    <p className="text-body-sm text-content-brand font-semibold mt-1 break-words">
                      {edu.school}
                    </p>
                    {edu.field && (
                      <p className="text-body-sm text-content-secondary break-words">
                        {edu.field}
                      </p>
                    )}
                  </div>
                  <div className="text-caption text-content-tertiary">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    {edu.gpa && <span className="ml-2">• GPA: {edu.gpa}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6 sm:mb-8">
          <h3 className="text-overline text-content-brand mb-3 sm:mb-4 border-b-2 border-ui-brand pb-2">
            Skills
          </h3>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-caption border ${getSkillBadgeClass(skill.level)} break-words`}
              >
                {skill.name} • {skill.level}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModernWebTemplate; 