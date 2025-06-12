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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
        <h3 className="text-lg font-semibold text-gray-800">
          Education
        </h3>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full sm:w-auto px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            + Add Education
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {isAdding && (
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <h4 className="font-medium text-gray-800 mb-4">
            {editingId ? 'Edit Education' : 'Add New Education'}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* School */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                School/University *
              </label>
              <input
                type="text"
                value={formData.school}
                onChange={(e) => handleInputChange('school', e.target.value)}
                placeholder="e.g. Harvard University, MIT"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Degree */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Degree *
              </label>
              <input
                type="text"
                value={formData.degree}
                onChange={(e) => handleInputChange('degree', e.target.value)}
                placeholder="e.g. Bachelor of Science, Master's"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Field of Study */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Field of Study
              </label>
              <input
                type="text"
                value={formData.field}
                onChange={(e) => handleInputChange('field', e.target.value)}
                placeholder="e.g. Computer Science, Business"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* GPA */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                GPA (Optional)
              </label>
              <input
                type="text"
                value={formData.gpa}
                onChange={(e) => handleInputChange('gpa', e.target.value)}
                placeholder="e.g. 3.8/4.0, 85/100"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <button
              onClick={editingId ? handleUpdate : handleAdd}
              className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              {editingId ? 'Update' : 'Add'} Education
            </button>
            <button
              onClick={resetForm}
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Education List */}
      <div className="space-y-3">
        {education.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <div className="text-4xl mb-2">🎓</div>
            <p>No education added yet</p>
            <p className="text-sm mt-1">Click "Add Education" to get started</p>
          </div>
        ) : (
          education.map((edu) => (
            <div key={edu.id} className="border border-gray-200 rounded-lg p-4 bg-white">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{edu.degree}</h4>
                  <p className="text-green-600 font-medium">{edu.school}</p>
                  <div className="text-sm text-gray-500">
                    {edu.field && <span>{edu.field}</span>}
                    {edu.field && (edu.startDate || edu.endDate) && <span> • </span>}
                    {edu.startDate && edu.endDate && (
                      <span>
                        {new Date(edu.startDate + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {new Date(edu.endDate + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </span>
                    )}
                  </div>
                  {edu.gpa && (
                    <p className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</p>
                  )}
                </div>
                <div className="flex gap-2 w-full sm:w-auto sm:ml-4">
                  <button
                    onClick={() => handleEdit(edu)}
                    className="flex-1 sm:flex-none px-3 py-1 text-green-600 hover:text-green-800 text-sm bg-green-50 hover:bg-green-100 rounded transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(edu.id)}
                    className="flex-1 sm:flex-none px-3 py-1 text-red-600 hover:text-red-800 text-sm bg-red-50 hover:bg-red-100 rounded transition-colors"
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