'use client';

import React, { useState } from 'react';
import { useCV } from '@/context/CVContext';
import { Skill } from '@/types/cv';

export default function SkillsForm() {
  const { cvData, addSkill, updateSkill, deleteSkill } = useCV();
  const { skills } = cvData;

  // Form state for new/editing skill
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Skill, 'id'>>({
    name: '',
    level: 'Beginner',
  });

  // Generate unique ID
  const generateId = () => `skill_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // Handle form input changes
  const handleInputChange = (field: keyof Omit<Skill, 'id'>, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle add new skill
  const handleAdd = () => {
    if (formData.name.trim()) {
      const newSkill: Skill = {
        ...formData,
        id: generateId(),
      };
      addSkill(newSkill);
      resetForm();
    }
  };

  // Handle edit skill
  const handleEdit = (skill: Skill) => {
    setEditingId(skill.id);
    setFormData({
      name: skill.name,
      level: skill.level,
    });
    setIsAdding(true);
  };

  // Handle update skill
  const handleUpdate = () => {
    if (editingId && formData.name.trim()) {
      updateSkill(editingId, formData);
      resetForm();
    }
  };

  // Handle delete skill
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      deleteSkill(id);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      level: 'Beginner',
    });
    setIsAdding(false);
    setEditingId(null);
  };

  // Get level color
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
        <h3 className="text-lg font-semibold text-gray-800">
          Skills
        </h3>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full sm:w-auto px-4 py-2 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            + Add Skill
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {isAdding && (
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <h4 className="font-medium text-gray-800 mb-4">
            {editingId ? 'Edit Skill' : 'Add New Skill'}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Skill Name */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Skill Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g. JavaScript, Photoshop, Leadership"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Skill Level */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Level *
              </label>
              <select
                value={formData.level}
                onChange={(e) => handleInputChange('level', e.target.value as Skill['level'])}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <button
              onClick={editingId ? handleUpdate : handleAdd}
              className="w-full sm:w-auto px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              {editingId ? 'Update' : 'Add'} Skill
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

      {/* Skills List */}
      <div className="space-y-4">
        {skills.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <div className="text-4xl mb-2">🛠️</div>
            <p>No skills added yet</p>
            <p className="text-sm mt-1">Click "Add Skill" to get started</p>
          </div>
        ) : (
          <>
            {/* Skills Display */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className={`px-2 sm:px-3 py-2 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2 ${getLevelColor(skill.level)} border`}
                >
                  <span>{skill.name}</span>
                  <span className="text-xs opacity-75 hidden sm:inline">• {skill.level}</span>
                  <span className="text-xs opacity-75 sm:hidden">•</span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleEdit(skill)}
                      className="text-purple-600 hover:text-purple-800 text-xs underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(skill.id)}
                      className="text-red-600 hover:text-red-800 text-xs underline"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Skills Summary */}
            <div className="border-t pt-4">
              <div className="text-xs sm:text-sm text-gray-600 flex flex-wrap gap-2 sm:gap-4">
                <span>Total: <strong>{skills.length}</strong> skills</span>
                <span>Expert: <strong>{skills.filter(s => s.level === 'Expert').length}</strong></span>
                <span>Advanced: <strong>{skills.filter(s => s.level === 'Advanced').length}</strong></span>
                <span className="hidden sm:inline">Intermediate: <strong>{skills.filter(s => s.level === 'Intermediate').length}</strong></span>
                <span className="hidden sm:inline">Beginner: <strong>{skills.filter(s => s.level === 'Beginner').length}</strong></span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 