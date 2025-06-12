'use client';

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { CVData, PersonalInfo, Experience, Education, Skill } from '@/types/cv';
import { useAutoSave } from '@/hooks/useAutoSave';

// İlk durum
const initialState: CVData = {
  personalInfo: {
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
  },
  experiences: [],
  education: [],
  skills: [],
};

// Action türleri
type CVAction =
  | { type: 'UPDATE_PERSONAL_INFO'; payload: Partial<PersonalInfo> }
  | { type: 'ADD_EXPERIENCE'; payload: Experience }
  | { type: 'UPDATE_EXPERIENCE'; payload: { id: string; data: Partial<Experience> } }
  | { type: 'DELETE_EXPERIENCE'; payload: string }
  | { type: 'ADD_EDUCATION'; payload: Education }
  | { type: 'UPDATE_EDUCATION'; payload: { id: string; data: Partial<Education> } }
  | { type: 'DELETE_EDUCATION'; payload: string }
  | { type: 'ADD_SKILL'; payload: Skill }
  | { type: 'UPDATE_SKILL'; payload: { id: string; data: Partial<Skill> } }
  | { type: 'DELETE_SKILL'; payload: string }
  | { type: 'RESET_CV' }
  | { type: 'LOAD_SAVED_DATA'; payload: CVData };

// Reducer
function cvReducer(state: CVData, action: CVAction): CVData {
  switch (action.type) {
    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        personalInfo: { ...state.personalInfo, ...action.payload },
      };
    
    case 'ADD_EXPERIENCE':
      return {
        ...state,
        experiences: [...state.experiences, action.payload],
      };
    
    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        experiences: state.experiences.map(exp =>
          exp.id === action.payload.id 
            ? { ...exp, ...action.payload.data }
            : exp
        ),
      };
    
    case 'DELETE_EXPERIENCE':
      return {
        ...state,
        experiences: state.experiences.filter(exp => exp.id !== action.payload),
      };
    
    case 'ADD_EDUCATION':
      return {
        ...state,
        education: [...state.education, action.payload],
      };
    
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        education: state.education.map(edu =>
          edu.id === action.payload.id 
            ? { ...edu, ...action.payload.data }
            : edu
        ),
      };
    
    case 'DELETE_EDUCATION':
      return {
        ...state,
        education: state.education.filter(edu => edu.id !== action.payload),
      };
    
    case 'ADD_SKILL':
      return {
        ...state,
        skills: [...state.skills, action.payload],
      };
    
    case 'UPDATE_SKILL':
      return {
        ...state,
        skills: state.skills.map(skill =>
          skill.id === action.payload.id 
            ? { ...skill, ...action.payload.data }
            : skill
        ),
      };
    
    case 'DELETE_SKILL':
      return {
        ...state,
        skills: state.skills.filter(skill => skill.id !== action.payload),
      };
    
    case 'RESET_CV':
      return initialState;
    
    case 'LOAD_SAVED_DATA':
      return action.payload;
    
    default:
      return state;
  }
}

// Context tiplerini tanımla
interface CVContextType {
  cvData: CVData;
  dispatch: React.Dispatch<CVAction>;
  updatePersonalInfo: (data: Partial<PersonalInfo>) => void;
  addExperience: (experience: Experience) => void;
  updateExperience: (id: string, data: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;
  addEducation: (education: Education) => void;
  updateEducation: (id: string, data: Partial<Education>) => void;
  deleteEducation: (id: string) => void;
  addSkill: (skill: Skill) => void;
  updateSkill: (id: string, data: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;
  resetCV: () => void;
  loadSavedData: () => void;
  clearSavedData: () => void;
  saveStatus: 'idle' | 'saving' | 'saved' | 'error';
  lastSaved: Date | null;
  hasSavedData: () => boolean;
}

// Context oluştur
const CVContext = createContext<CVContextType | undefined>(undefined);

// Provider bileşeni
export function CVProvider({ children }: { children: ReactNode }) {
  const [cvData, dispatch] = useReducer(cvReducer, initialState);
  const { saveStatus, lastSaved, loadSavedData: loadFromStorage, clearSavedData: clearFromStorage, hasSavedData } = useAutoSave(cvData);

  // Load saved data on mount
  useEffect(() => {
    const savedData = loadFromStorage();
    if (savedData) {
      dispatch({ type: 'LOAD_SAVED_DATA', payload: savedData });
    }
  }, [loadFromStorage]);

  // Helper fonksiyonlar
  const updatePersonalInfo = (data: Partial<PersonalInfo>) => {
    dispatch({ type: 'UPDATE_PERSONAL_INFO', payload: data });
  };

  const addExperience = (experience: Experience) => {
    dispatch({ type: 'ADD_EXPERIENCE', payload: experience });
  };

  const updateExperience = (id: string, data: Partial<Experience>) => {
    dispatch({ type: 'UPDATE_EXPERIENCE', payload: { id, data } });
  };

  const deleteExperience = (id: string) => {
    dispatch({ type: 'DELETE_EXPERIENCE', payload: id });
  };

  const addEducation = (education: Education) => {
    dispatch({ type: 'ADD_EDUCATION', payload: education });
  };

  const updateEducation = (id: string, data: Partial<Education>) => {
    dispatch({ type: 'UPDATE_EDUCATION', payload: { id, data } });
  };

  const deleteEducation = (id: string) => {
    dispatch({ type: 'DELETE_EDUCATION', payload: id });
  };

  const addSkill = (skill: Skill) => {
    dispatch({ type: 'ADD_SKILL', payload: skill });
  };

  const updateSkill = (id: string, data: Partial<Skill>) => {
    dispatch({ type: 'UPDATE_SKILL', payload: { id, data } });
  };

  const deleteSkill = (id: string) => {
    dispatch({ type: 'DELETE_SKILL', payload: id });
  };

  const resetCV = () => {
    dispatch({ type: 'RESET_CV' });
    clearFromStorage();
  };

  const loadSavedData = () => {
    const savedData = loadFromStorage();
    if (savedData) {
      dispatch({ type: 'LOAD_SAVED_DATA', payload: savedData });
    }
  };

  const clearSavedData = () => {
    clearFromStorage();
    dispatch({ type: 'RESET_CV' });
  };

  const value: CVContextType = {
    cvData,
    dispatch,
    updatePersonalInfo,
    addExperience,
    updateExperience,
    deleteExperience,
    addEducation,
    updateEducation,
    deleteEducation,
    addSkill,
    updateSkill,
    deleteSkill,
    resetCV,
    loadSavedData,
    clearSavedData,
    saveStatus,
    lastSaved,
    hasSavedData,
  };

  return <CVContext.Provider value={value}>{children}</CVContext.Provider>;
}

// Hook
export function useCV() {
  const context = useContext(CVContext);
  if (context === undefined) {
    throw new Error('useCV must be used within a CVProvider');
  }
  return context;
} 