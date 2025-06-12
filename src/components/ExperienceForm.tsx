'use client';

import React, { useState } from 'react';
import { useCV } from '@/context/CVContext';
import { Experience } from '@/types/cv';

export default function ExperienceForm() {
  const { cvData, addExperience, updateExperience, deleteExperience } = useCV();
  const { experiences } = cvData;

  // Form state for new/editing experience
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Experience, 'id'>>({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    isCurrentJob: false,
    description: '',
  });

  // Generate unique ID
  const generateId = () => `exp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // Handle form input changes
  const handleInputChange = (field: keyof Omit<Experience, 'id'>, value: string | boolean) => {
    setFormData(prev => ({ 
      ...prev, 
      [field]: value,
      // Clear end date when current job is checked
      ...(field === 'isCurrentJob' && value === true ? { endDate: '' } : {})
    }));
  };

  // Handle add new experience
  const handleAdd = () => {
    if (formData.company.trim() && formData.position.trim()) {
      const newExperience: Experience = {
        ...formData,
        id: generateId(),
      };
      addExperience(newExperience);
      resetForm();
    }
  };

  // Handle edit experience
  const handleEdit = (experience: Experience) => {
    setEditingId(experience.id);
    setFormData({
      company: experience.company,
      position: experience.position,
      startDate: experience.startDate,
      endDate: experience.endDate,
      isCurrentJob: experience.isCurrentJob,
      description: experience.description,
    });
    setIsAdding(true);
  };

  // Handle update experience
  const handleUpdate = () => {
    if (editingId && formData.company.trim() && formData.position.trim()) {
      updateExperience(editingId, formData);
      resetForm();
    }
  };

  // Handle delete experience
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      deleteExperience(id);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      isCurrentJob: false,
      description: '',
    });
    setIsAdding(false);
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">
          Work Experience
        </h3>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            + Add Experience
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {isAdding && (
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <h4 className="font-medium text-gray-800 mb-4">
            {editingId ? 'Edit Experience' : 'Add New Experience'}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Company *
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                placeholder="e.g. Google, Microsoft"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Position */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Position *
              </label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => handleInputChange('position', e.target.value)}
                placeholder="e.g. Software Engineer"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Start Date
              </label>
              <input
                type="month"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                End Date
              </label>
              <input
                type="month"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                disabled={formData.isCurrentJob}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>
          </div>

          {/* Currently Working */}
          <div className="mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isCurrentJob}
                onChange={(e) => handleInputChange('isCurrentJob', e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">I currently work here</span>
            </label>
          </div>

          {/* Description */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your responsibilities and achievements..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Form Actions */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={editingId ? handleUpdate : handleAdd}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {editingId ? 'Update' : 'Add'} Experience
            </button>
            <button
              onClick={resetForm}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Experience List */}
      <div className="space-y-3">
        {experiences.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <div className="text-4xl mb-2">💼</div>
            <p>No work experience added yet</p>
            <p className="text-sm mt-1">Click "Add Experience" to get started</p>
          </div>
        ) : (
          experiences.map((experience) => (
            <div key={experience.id} className="border border-gray-200 rounded-lg p-4 bg-white">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{experience.position}</h4>
                  <p className="text-blue-600 font-medium">{experience.company}</p>
                  <p className="text-sm text-gray-500">
                    {experience.startDate && new Date(experience.startDate + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {experience.isCurrentJob ? 'Present' : (experience.endDate && new Date(experience.endDate + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }))}
                  </p>
                  {experience.description && (
                    <p className="text-sm text-gray-700 mt-2">{experience.description}</p>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(experience)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(experience.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 