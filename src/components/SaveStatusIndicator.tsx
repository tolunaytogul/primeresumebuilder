'use client';

import React from 'react';
import { useCV } from '@/context/CVContext';

export default function SaveStatusIndicator() {
  const { saveStatus, lastSaved } = useCV();

  const getStatusIcon = () => {
    switch (saveStatus) {
      case 'saving':
        return (
          <div className="w-3 h-3 border border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        );
      case 'saved':
        return <span className="text-green-500">✓</span>;
      case 'error':
        return <span className="text-red-500">⚠</span>;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (saveStatus) {
      case 'saving':
        return 'Saving...';
      case 'saved':
        return 'Saved';
      case 'error':
        return 'Save failed';
      default:
        return '';
    }
  };

  const getStatusColor = () => {
    switch (saveStatus) {
      case 'saving':
        return 'text-primary-600';
      case 'saved':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-gray-500';
    }
  };

  const formatLastSaved = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return 'just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };

  if (saveStatus === 'idle' && !lastSaved) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 text-xs">
      {getStatusIcon()}
      <span className={getStatusColor()}>
        {getStatusText()}
        {lastSaved && saveStatus !== 'saving' && (
          <span className="text-gray-400 ml-1">
            • {formatLastSaved(lastSaved)}
          </span>
        )}
      </span>
    </div>
  );
} 