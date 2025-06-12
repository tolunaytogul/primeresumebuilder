'use client';

import React from 'react';
import { useCV } from '@/context/CVContext';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';

export default function CVForm() {
  const { cvData, updatePersonalInfo } = useCV();
  const { personalInfo } = cvData;

  const handleInputChange = (field: string, value: string) => {
    updatePersonalInfo({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Personal Information
        </h3>
        
        <div className="grid grid-cols-1 gap-4">
          {/* Ad Soyad */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              value={personalInfo.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Unvan */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-600 mb-2">
              Job Title *
            </label>
            <input
              type="text"
              id="title"
              value={personalInfo.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="e.g. Frontend Developer, Marketing Manager"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* E-posta */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              value={personalInfo.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="example@email.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Telefon */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-600 mb-2">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              value={personalInfo.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Konum */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-600 mb-2">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={personalInfo.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="City, Country"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Özet */}
          <div>
            <label htmlFor="summary" className="block text-sm font-medium text-gray-600 mb-2">
              Professional Summary
            </label>
            <textarea
              id="summary"
              value={personalInfo.summary}
              onChange={(e) => handleInputChange('summary', e.target.value)}
              placeholder="Write a brief professional summary about yourself..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <div className="border-t pt-6">
        <ExperienceForm />
      </div>

      {/* Education Section */}
      <div className="border-t pt-6">
        <EducationForm />
      </div>

      {/* Skills Section */}
      <div className="border-t pt-6">
        <SkillsForm />
      </div>
    </div>
  );
} 