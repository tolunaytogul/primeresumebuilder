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

  // Format date helper
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
        <h3 className="text-lg font-semibold text-content-primary">
          Work Experience
        </h3>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full sm:w-auto px-4 py-2 text-sm bg-surface-brand text-content-inverse rounded-md hover:bg-surface-brand-light transition-colors"
          >
            + Add Experience
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {isAdding && (
        <div className="border border-ui-primary rounded-lg p-4 bg-surface-secondary">
          <h4 className="font-medium text-content-primary mb-4">
            {editingId ? 'Edit Experience' : 'Add New Experience'}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Position */}
            <div>
              <label className="block text-body-sm font-medium text-content-tertiary mb-2">
                Position *
              </label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => handleInputChange('position', e.target.value)}
                placeholder="e.g. Frontend Developer"
                className="w-full px-3 py-2 border border-ui-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-body-sm font-medium text-content-tertiary mb-2">
                Company *
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                placeholder="e.g. Google, Microsoft"
                className="w-full px-3 py-2 border border-ui-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-body-sm font-medium text-content-tertiary mb-2">
                Start Date *
              </label>
              <input
                type="month"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                className="w-full px-3 py-2 border border-ui-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>

            {/* Current Job Checkbox */}
            <div className="flex items-center">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isCurrentJob}
                  onChange={(e) => handleInputChange('isCurrentJob', e.target.checked)}
                  className="rounded border-ui-secondary focus:ring-brand"
                />
                <span className="text-body-sm text-content-secondary">I currently work here</span>
              </label>
            </div>

            {/* End Date */}
            {!formData.isCurrentJob && (
              <div className="md:col-span-2">
                <label className="block text-body-sm font-medium text-content-tertiary mb-2">
                  End Date *
                </label>
                <input
                  type="month"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  className="w-full px-3 py-2 border border-ui-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
                />
              </div>
            )}

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-body-sm font-medium text-content-tertiary mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe your role, achievements, and responsibilities..."
                rows={4}
                className="w-full px-3 py-2 border border-ui-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-brand resize-none"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <button
              onClick={editingId ? handleUpdate : handleAdd}
              className="w-full sm:w-auto px-4 py-2 bg-surface-brand text-content-inverse rounded-md hover:bg-surface-brand-light transition-colors"
            >
              {editingId ? 'Update' : 'Add'} Experience
            </button>
            <button
              onClick={resetForm}
              className="w-full sm:w-auto px-4 py-2 border border-ui-secondary text-content-secondary rounded-md hover:bg-surface-secondary transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Experience List */}
      <div className="space-y-4">
        {experiences.length === 0 ? (
          <div className="text-center text-content-quaternary py-8">
            <div className="text-4xl mb-2">💼</div>
            <p>No work experience added yet</p>
            <p className="text-sm mt-1">Click "Add Experience" to get started</p>
          </div>
        ) : (
          experiences.map((experience) => (
            <div key={experience.id} className="border border-ui-primary rounded-lg p-4 bg-white">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h4 className="font-semibold text-content-primary">{experience.position}</h4>
                  <p className="text-content-brand font-medium">{experience.company}</p>
                  <p className="text-body-sm text-content-tertiary">
                    {formatDate(experience.startDate)} - {experience.isCurrentJob ? 'Present' : formatDate(experience.endDate)}
                  </p>
                  {experience.description && (
                    <p className="text-body-sm text-content-secondary mt-2">{experience.description}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(experience)}
                    className="flex-1 sm:flex-none px-3 py-1 text-content-brand hover:text-content-accent text-sm bg-surface-brand bg-opacity-10 hover:bg-opacity-20 rounded transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(experience.id)}
                    className="flex-1 sm:flex-none px-3 py-1 text-content-danger hover:text-danger-600 text-sm bg-surface-danger bg-opacity-10 hover:bg-opacity-20 rounded transition-colors"
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