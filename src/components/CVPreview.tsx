'use client';

import React from 'react';
import { useCV } from '@/context/CVContext';
import DownloadButton from './DownloadButton';

export default function CVPreview() {
  const { cvData } = useCV();
  const { personalInfo, experiences, education, skills } = cvData;

  return (
    <div className="space-y-4">
      {/* Download Button */}
      <DownloadButton cvData={cvData} />
      
      {/* CV Preview */}
      <div className="bg-white p-8 shadow-lg rounded-lg min-h-[800px]">
      {/* Header - Kişisel Bilgiler */}
      <div className="border-b-2 border-gray-200 pb-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {personalInfo.name || 'Full Name'}
        </h1>
        <h2 className="text-xl text-blue-600 mb-4">
          {personalInfo.title || 'Job Title'}
        </h2>
        
        <div className="flex flex-col gap-1 text-gray-600">
          {personalInfo.email && (
            <div className="flex items-center gap-2">
              <span className="w-4 h-4">📧</span>
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2">
              <span className="w-4 h-4">📱</span>
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-2">
              <span className="w-4 h-4">📍</span>
              <span>{personalInfo.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Profesyonel Özet */}
      {personalInfo.summary && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Professional Summary
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Deneyim */}
      {experiences.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Work Experience
          </h3>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="border-l-4 border-blue-200 pl-4">
                <h4 className="font-semibold text-gray-800">{exp.position}</h4>
                <p className="text-blue-600 font-medium">{exp.company}</p>
                <p className="text-sm text-gray-500 mb-2">
                  {exp.startDate && new Date(exp.startDate + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {exp.isCurrentJob ? 'Present' : (exp.endDate && new Date(exp.endDate + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }))}
                </p>
                {exp.description && (
                  <p className="text-gray-700 text-sm">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Eğitim */}
      {education.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Education
          </h3>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="border-l-4 border-green-200 pl-4">
                <h4 className="font-semibold text-gray-800">{edu.degree}</h4>
                <p className="text-green-600 font-medium">{edu.school}</p>
                <p className="text-sm text-gray-500">
                  {edu.field && <span>{edu.field}</span>}
                  {edu.field && (edu.startDate || edu.endDate) && <span> • </span>}
                  {edu.startDate && edu.endDate && (
                    <span>
                      {new Date(edu.startDate + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {new Date(edu.endDate + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                  )}
                </p>
                {edu.gpa && (
                  <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => {
              const getLevelColor = (level: string) => {
                switch (level) {
                  case 'Beginner': return 'bg-gray-100 text-gray-800';
                  case 'Intermediate': return 'bg-blue-100 text-blue-800';
                  case 'Advanced': return 'bg-purple-100 text-purple-800';
                  case 'Expert': return 'bg-orange-100 text-orange-800';
                  default: return 'bg-gray-100 text-gray-800';
                }
              };
              
              return (
                <span
                  key={skill.id}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(skill.level)}`}
                >
                  {skill.name} • {skill.level}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Boş durum mesajı */}
      {!personalInfo.name && !personalInfo.title && !personalInfo.email && (
        <div className="text-center text-gray-400 py-12">
          <div className="text-6xl mb-4">📄</div>
          <p className="text-lg">Your resume will appear here</p>
          <p className="text-sm mt-2">Start by filling out the form on the left</p>
        </div>
      )}
      </div>
    </div>
  );
} 