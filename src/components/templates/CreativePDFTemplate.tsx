'use client';

import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { CVData } from '@/types/cv';

// Creative PDF Styles - Bold Creative Design
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    fontSize: 9,
    lineHeight: 1.3,
  },
  sidebar: {
    width: '35%',
    backgroundColor: '#2D1B69',
    padding: 20,
    color: '#FFFFFF',
  },
  mainContent: {
    width: '65%',
    padding: 25,
    paddingLeft: 20,
  },
  sidebarHeader: {
    marginBottom: 20,
    textAlign: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 10,
    color: '#E0E7FF',
    marginBottom: 15,
    textAlign: 'center',
  },
  sidebarSection: {
    marginBottom: 18,
  },
  sidebarSectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    borderBottom: 1,
    borderBottomColor: '#8B5CF6',
    paddingBottom: 3,
  },
  contactItem: {
    fontSize: 9,
    color: '#E0E7FF',
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  skillItem: {
    marginBottom: 12,
  },
  skillName: {
    fontSize: 10,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  skillLevel: {
    height: 4,
    backgroundColor: '#4C1D95',
    borderRadius: 2,
    marginBottom: 2,
  },
  skillProgress: {
    height: 4,
    backgroundColor: '#8B5CF6',
    borderRadius: 2,
  },
  skillLevelText: {
    fontSize: 8,
    color: '#C7D2FE',
  },
  mainSection: {
    marginBottom: 20,
  },
  mainSectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2D1B69',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    borderLeft: 3,
    borderLeftColor: '#8B5CF6',
    paddingLeft: 10,
  },
  summary: {
    fontSize: 11,
    lineHeight: 1.6,
    color: '#374151',
    textAlign: 'justify',
  },
  experienceItem: {
    marginBottom: 12,
    paddingLeft: 10,
    borderLeft: 2,
    borderLeftColor: '#E5E7EB',
  },
  experienceHeader: {
    marginBottom: 8,
  },
  experienceTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2D1B69',
    marginBottom: 2,
  },
  experienceCompany: {
    fontSize: 11,
    color: '#8B5CF6',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  experienceDate: {
    fontSize: 9,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  experienceDescription: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#4B5563',
    marginTop: 6,
  },
  educationItem: {
    marginBottom: 15,
    paddingLeft: 15,
    borderLeft: 2,
    borderLeftColor: '#E5E7EB',
  },
  educationDegree: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2D1B69',
    marginBottom: 2,
  },
  educationSchool: {
    fontSize: 10,
    color: '#8B5CF6',
    marginBottom: 2,
  },
  educationDetails: {
    fontSize: 9,
    color: '#6B7280',
    marginBottom: 2,
  },
  educationDate: {
    fontSize: 9,
    color: '#6B7280',
    fontStyle: 'italic',
  },
});

interface CreativePDFTemplateProps {
  cvData: CVData;
}

const CreativePDFTemplate: React.FC<CreativePDFTemplateProps> = ({ cvData }) => {
  const { personalInfo, experiences, education, skills } = cvData;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const getSkillProgress = (level: string) => {
    const levels = { 'Beginner': 25, 'Intermediate': 50, 'Advanced': 75, 'Expert': 100 };
    return levels[level as keyof typeof levels] || 50;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          {/* Header */}
          <View style={styles.sidebarHeader}>
            <Text style={styles.name}>{personalInfo.name || 'Full Name'}</Text>
            <Text style={styles.title}>{personalInfo.title || 'Job Title'}</Text>
          </View>

          {/* Contact Info */}
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarSectionTitle}>Contact</Text>
            {personalInfo.email && (
              <View style={styles.contactItem}>
                <Text>{personalInfo.email}</Text>
              </View>
            )}
            {personalInfo.phone && (
              <View style={styles.contactItem}>
                <Text>{personalInfo.phone}</Text>
              </View>
            )}
            {personalInfo.location && (
              <View style={styles.contactItem}>
                <Text>{personalInfo.location}</Text>
              </View>
            )}
          </View>

          {/* Skills */}
          {skills.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarSectionTitle}>Skills</Text>
              {skills.map((skill) => (
                <View key={skill.id} style={styles.skillItem}>
                  <Text style={styles.skillName}>{skill.name}</Text>
                  <View style={styles.skillLevel}>
                    <View 
                      style={[
                        styles.skillProgress, 
                        { width: `${getSkillProgress(skill.level)}%` }
                      ]} 
                    />
                  </View>
                  <Text style={styles.skillLevelText}>{skill.level}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Education in Sidebar */}
          {education.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarSectionTitle}>Education</Text>
              {education.map((edu) => (
                <View key={edu.id} style={{ marginBottom: 15 }}>
                  <Text style={[styles.skillName, { marginBottom: 2 }]}>{edu.degree}</Text>
                  <Text style={[styles.skillLevelText, { marginBottom: 2 }]}>{edu.school}</Text>
                  {edu.field && (
                    <Text style={[styles.skillLevelText, { fontSize: 8 }]}>{edu.field}</Text>
                  )}
                  {edu.startDate && edu.endDate && (
                    <Text style={[styles.skillLevelText, { fontSize: 8, marginTop: 2 }]}>
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Professional Summary */}
          {personalInfo.summary && (
            <View style={styles.mainSection}>
              <Text style={styles.mainSectionTitle}>About Me</Text>
              <Text style={styles.summary}>{personalInfo.summary}</Text>
            </View>
          )}

          {/* Work Experience */}
          {experiences.length > 0 && (
            <View style={styles.mainSection}>
              <Text style={styles.mainSectionTitle}>Experience</Text>
              {experiences.map((exp) => (
                <View key={exp.id} style={styles.experienceItem}>
                  <View style={styles.experienceHeader}>
                    <Text style={styles.experienceTitle}>{exp.position}</Text>
                    <Text style={styles.experienceCompany}>{exp.company}</Text>
                    <Text style={styles.experienceDate}>
                      {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                    </Text>
                  </View>
                  {exp.description && (
                    <Text style={styles.experienceDescription}>{exp.description}</Text>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default CreativePDFTemplate; 