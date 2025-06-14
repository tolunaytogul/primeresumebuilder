'use client';

import React, { useState } from 'react';
import { useCV } from '@/context/CVContext';
import { Education } from '@/types/cv';

export default function EducationForm() {
  const { cvData, addEducation, updateEducation, deleteEducation } = useCV();
  const { education } = cvData;

  // Form state for new/editing education
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Education, 'id'>>({
    school: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    gpa: '',
  });

  // Generate unique ID
  const generateId = () => `edu_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // Handle form input changes
  const handleInputChange = (field: keyof Omit<Education, 'id'>, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle add new education
  const handleAdd = () => {
    if (formData.school.trim() && formData.degree.trim()) {
      const newEducation: Education = {
        ...formData,
        id: generateId(),
        // Remove gpa if empty to make it undefined
        gpa: formData.gpa?.trim() || undefined,
      };
      addEducation(newEducation);
      resetForm();
    }
  };

  // Handle edit education
  const handleEdit = (education: Education) => {
    setEditingId(education.id);
    setFormData({
      school: education.school,
      degree: education.degree,
      field: education.field,
      startDate: education.startDate,
      endDate: education.endDate,
      gpa: education.gpa || '',
    });
    setIsAdding(true);
  };

  // Handle update education
  const handleUpdate = () => {
    if (editingId && formData.school.trim() && formData.degree.trim()) {
      updateEducation(editingId, {
        ...formData,
        gpa: formData.gpa?.trim() || undefined,
      });
      resetForm();
    }
  };

  // Handle delete education
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this education?')) {
      deleteEducation(id);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
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
          Education
        </h3>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full sm:w-auto px-4 py-2 text-sm bg-surface-brand text-content-inverse rounded-md hover:bg-surface-brand-light transition-colors"
          >
            + Add Education
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {isAdding && (
        <div className="border border-ui-primary rounded-lg p-4 bg-surface-secondary">
          <h4 className="font-medium text-content-primary mb-4">
            {editingId ? 'Edit Education' : 'Add New Education'}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* School */}
            <div>
              <label className="block text-body-sm font-medium text-content-tertiary mb-2">
                School/University *
              </label>
              <input
                type="text"
                value={formData.school}
                onChange={(e) => handleInputChange('school', e.target.value)}
                placeholder="e.g. Harvard University"
                className="w-full px-3 py-2 border border-ui-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>

            {/* Degree */}
            <div>
              <label className="block text-body-sm font-medium text-content-tertiary mb-2">
                Degree *
              </label>
              <input
                type="text"
                value={formData.degree}
                onChange={(e) => handleInputChange('degree', e.target.value)}
                placeholder="e.g. Bachelor of Science"
                className="w-full px-3 py-2 border border-ui-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>

            {/* Field of Study */}
            <div>
              <label className="block text-body-sm font-medium text-content-tertiary mb-2">
                Field of Study
              </label>
              <input
                type="text"
                value={formData.field}
                onChange={(e) => handleInputChange('field', e.target.value)}
                placeholder="e.g. Computer Science"
                className="w-full px-3 py-2 border border-ui-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>

            {/* GPA */}
            <div>
              <label className="block text-body-sm font-medium text-content-tertiary mb-2">
                GPA (Optional)
              </label>
              <input
                type="text"
                value={formData.gpa || ''}
                onChange={(e) => handleInputChange('gpa', e.target.value)}
                placeholder="e.g. 3.8"
                className="w-full px-3 py-2 border border-ui-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-body-sm font-medium text-content-tertiary mb-2">
                Start Date
              </label>
              <input
                type="month"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                className="w-full px-3 py-2 border border-ui-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-body-sm font-medium text-content-tertiary mb-2">
                End Date
              </label>
              <input
                type="month"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                className="w-full px-3 py-2 border border-ui-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <button
              onClick={editingId ? handleUpdate : handleAdd}
              className="w-full sm:w-auto px-4 py-2 bg-surface-brand text-content-inverse rounded-md hover:bg-surface-brand-light transition-colors"
            >
              {editingId ? 'Update' : 'Add'} Education
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

      {/* Education List */}
      <div className="space-y-4">
        {education.length === 0 ? (
          <div className="text-center text-content-quaternary py-8">
            <div className="text-4xl mb-2">🎓</div>
            <p>No education added yet</p>
            <p className="text-sm mt-1">Click "Add Education" to get started</p>
          </div>
        ) : (
          education.map((edu) => (
            <div key={edu.id} className="border border-ui-primary rounded-lg p-4 bg-white">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h4 className="font-semibold text-content-primary">{edu.degree}</h4>
                  <p className="text-content-brand font-medium">{edu.school}</p>
                  {edu.field && (
                    <p className="text-body-sm text-content-secondary">{edu.field}</p>
                  )}
                  <p className="text-body-sm text-content-tertiary">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    {edu.gpa && <span className="ml-2">• GPA: {edu.gpa}</span>}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(edu)}
                    className="flex-1 sm:flex-none px-3 py-1 text-content-brand hover:text-content-accent text-sm bg-surface-brand bg-opacity-10 hover:bg-opacity-20 rounded transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(edu.id)}
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