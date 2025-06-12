import { useState, useCallback } from 'react';

interface ValidationErrors {
  [key: string]: string;
}

interface ValidationRules {
  [key: string]: {
    required?: boolean;
    email?: boolean;
    minLength?: number;
  };
}

export const useFormValidation = (rules: ValidationRules) => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateField = useCallback((field: string, value: string): string => {
    const rule = rules[field];
    if (!rule) return '';

    // Required validation
    if (rule.required && (!value || value.trim() === '')) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }

    // Email validation
    if (rule.email && value && value.trim() !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
      }
    }

    // Min length validation
    if (rule.minLength && value && value.trim().length < rule.minLength) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} must be at least ${rule.minLength} characters`;
    }

    return '';
  }, [rules]);

  const validateAllFields = useCallback((data: { [key: string]: string }): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    Object.keys(rules).forEach(field => {
      const error = validateField(field, data[field] || '');
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [rules, validateField]);

  const validateSingleField = useCallback((field: string, value: string) => {
    const error = validateField(field, value);
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
    return !error;
  }, [validateField]);

  const clearError = useCallback((field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    errors,
    validateAllFields,
    validateSingleField,
    clearError,
    clearAllErrors,
    hasErrors: Object.keys(errors).length > 0
  };
}; 