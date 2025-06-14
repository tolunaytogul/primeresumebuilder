'use client';

import React from 'react';
import { CVData } from '@/types/cv';

interface CreativeWebTemplateProps {
  cvData: CVData;
}

const CreativeWebTemplate: React.FC<CreativeWebTemplateProps> = ({ cvData }) => {
  const { personalInfo, experiences, education, skills } = cvData;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const getSkillProgress = (level: string) => {
    const levels = { 'Beginner': 25, 'Intermediate': 50, 'Advanced': 75, 'Expert': 100 };
    return levels[level as keyof typeof levels] || 50;
  };

  return (
    <div className="bg-white flex flex-col xl:flex-row min-h-[600px] xl:min-h-[800px] font-sans leading-relaxed">
      {/* Sidebar */}
      <div className="w-full xl:w-2/5 bg-gradient-to-b from-purple-900 to-purple-800 text-white p-4 sm:p-6 xl:p-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center xl:text-left">
          <h1 className="text-heading-lg text-white mb-2 break-words">
            {personalInfo.name || 'Full Name'}
          </h1>
          <h2 className="text-heading-sm text-purple-200 mb-4 sm:mb-6 break-words">
            {personalInfo.title || 'Job Title'}
          </h2>
        </div>

        {/* Contact Info */}
        <div className="mb-6 sm:mb-8">
          <h3 className="text-overline text-white mb-3 sm:mb-4 border-b-2 border-purple-400 pb-2">
            Contact
          </h3>
          <div className="space-y-2 sm:space-y-3 text-body-sm">
            {personalInfo.email && (
              <div className="flex items-start gap-2 text-purple-100">
                <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="break-all min-w-0">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-start gap-2 text-accent-100">
                <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="break-words min-w-0">{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-start gap-2 text-accent-100">
                <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="break-words min-w-0">{personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-6 sm:mb-8">
            <h3 className="text-overline text-white mb-3 sm:mb-4 border-b-2 border-accent-400 pb-2">
              Skills
            </h3>
            <div className="space-y-3 sm:space-y-4">
              {skills.map((skill) => (
                <div key={skill.id} className="space-y-1 sm:space-y-2">
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-body-sm text-white font-medium truncate">{skill.name}</span>
                    <span className="text-caption text-accent-200 flex-shrink-0">{skill.level}</span>
                  </div>
                  <div className="w-full bg-accent-700 rounded-full h-1.5 sm:h-2">
                    <div 
                      className="bg-gradient-to-r from-accent-400 to-accent-300 h-1.5 sm:h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getSkillProgress(skill.level)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education in Sidebar */}
        {education.length > 0 && (
          <div className="mb-6 sm:mb-8">
            <h3 className="text-overline text-white mb-3 sm:mb-4 border-b-2 border-accent-400 pb-2">
              Education
            </h3>
            <div className="space-y-3 sm:space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="space-y-1">
                  <h4 className="text-body-sm text-white font-semibold break-words">{edu.degree}</h4>
                  <p className="text-body-sm text-accent-200 break-words">{edu.school}</p>
                  {edu.field && (
                    <p className="text-caption text-accent-300 break-words">{edu.field}</p>
                  )}
                  {edu.startDate && edu.endDate && (
                    <p className="text-caption text-accent-300">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </p>
                  )}
                  {edu.gpa && (
                    <p className="text-caption text-accent-300">GPA: {edu.gpa}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-full xl:w-3/5 p-4 sm:p-6 xl:p-8">
        {/* Professional Summary */}
        {personalInfo.summary && (
          <div className="mb-6 sm:mb-8">
            <h3 className="text-heading-md text-accent-900 mb-3 sm:mb-4 border-l-4 border-accent-400 pl-3 sm:pl-4">
              About Me
            </h3>
            <p className="text-body-md text-gray-700">
              {personalInfo.summary}
            </p>
          </div>
        )}

        {/* Work Experience */}
        {experiences.length > 0 && (
          <div className="mb-6 sm:mb-8">
            <h3 className="text-heading-md text-accent-900 mb-4 sm:mb-6 border-l-4 border-accent-400 pl-3 sm:pl-4">
              Experience
            </h3>
            <div className="space-y-4 sm:space-y-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="pl-3 sm:pl-4 border-l-2 border-gray-200 relative">
                  {/* Timeline dot */}
                  <div className="absolute -left-1.5 sm:-left-2 top-2 w-3 h-3 sm:w-4 sm:h-4 bg-accent-400 rounded-full border-2 border-white"></div>
                  
                  <div className="space-y-2">
                    <div className="flex flex-col gap-1 sm:gap-2">
                      <div className="flex-1">
                        <h4 className="text-heading-sm text-accent-900 break-words">
                          {exp.position}
                        </h4>
                        <p className="text-body-sm text-accent-600 font-semibold mt-1 break-words">
                          {exp.company}
                        </p>
                      </div>
                      <div className="text-caption text-gray-500 italic">
                        {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                      </div>
                    </div>
                    {exp.description && (
                      <p className="text-body-sm text-gray-600 mt-2 sm:mt-3">
                        {exp.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreativeWebTemplate; 