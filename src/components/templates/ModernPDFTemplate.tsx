'use client';

import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { CVData } from '@/types/cv';

// Modern PDF Styles - Clean Professional Design
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.3,
  },
  header: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottom: 2,
    borderBottomColor: '#3B82F6',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 6,
  },
  title: {
    fontSize: 14,
    color: '#3B82F6',
    marginBottom: 12,
    fontWeight: 'bold',
  },
  contactInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 10,
    color: '#6B7280',
    gap: 20,
  },
  contactItem: {
    marginBottom: 2,
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    borderBottom: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 4,
  },
  summary: {
    fontSize: 11,
    lineHeight: 1.6,
    color: '#374151',
    textAlign: 'justify',
  },
  experienceItem: {
    marginBottom: 12,
    paddingBottom: 8,
    borderBottom: 1,
    borderBottomColor: '#F3F4F6',
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  experienceTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  experienceCompany: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: 'bold',
    marginTop: 2,
  },
  experienceDate: {
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'right',
    fontWeight: 'bold',
  },
  experienceDescription: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#4B5563',
    marginTop: 8,
  },
  educationItem: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottom: 1,
    borderBottomColor: '#F9FAFB',
  },
  educationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  educationDegree: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  educationSchool: {
    fontSize: 11,
    color: '#10B981',
    fontWeight: 'bold',
    marginTop: 2,
  },
  educationDetails: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 3,
  },
  educationDate: {
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'right',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  skillBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 6,
    border: 1,
  },
  skillText: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  // Skill level colors
  beginnerSkill: {
    backgroundColor: '#F3F4F6',
    borderColor: '#9CA3AF',
  },
  beginnerText: {
    color: '#6B7280',
  },
  intermediateSkill: {
    backgroundColor: '#DBEAFE',
    borderColor: '#3B82F6',
  },
  intermediateText: {
    color: '#1D4ED8',
  },
  advancedSkill: {
    backgroundColor: '#EDE9FE',
    borderColor: '#8B5CF6',
  },
  advancedText: {
    color: '#7C3AED',
  },
  expertSkill: {
    backgroundColor: '#FED7AA',
    borderColor: '#F97316',
  },
  expertText: {
    color: '#EA580C',
  },
});

interface ModernPDFTemplateProps {
  cvData: CVData;
}

const ModernPDFTemplate: React.FC<ModernPDFTemplateProps> = ({ cvData }) => {
  const { personalInfo, experiences, education, skills } = cvData;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const getSkillStyles = (level: string) => {
    switch (level) {
      case 'Beginner':
        return { badge: styles.beginnerSkill, text: styles.beginnerText };
      case 'Intermediate':
        return { badge: styles.intermediateSkill, text: styles.intermediateText };
      case 'Advanced':
        return { badge: styles.advancedSkill, text: styles.advancedText };
      case 'Expert':
        return { badge: styles.expertSkill, text: styles.expertText };
      default:
        return { badge: styles.beginnerSkill, text: styles.beginnerText };
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header - Personal Info */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.name || 'Full Name'}</Text>
          <Text style={styles.title}>{personalInfo.title || 'Job Title'}</Text>
          <View style={styles.contactInfo}>
            {personalInfo.email && (
              <Text style={styles.contactItem}>{personalInfo.email}</Text>
            )}
            {personalInfo.phone && (
              <Text style={styles.contactItem}>{personalInfo.phone}</Text>
            )}
            {personalInfo.location && (
              <Text style={styles.contactItem}>{personalInfo.location}</Text>
            )}
          </View>
        </View>

        {/* Professional Summary */}
        {personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summary}>{personalInfo.summary}</Text>
          </View>
        )}

        {/* Work Experience */}
        {experiences.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {experiences.map((exp, index) => (
              <View key={exp.id} style={[styles.experienceItem, index === experiences.length - 1 ? { borderBottom: 0 } : {}]}>
                <View style={styles.experienceHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.experienceTitle}>{exp.position}</Text>
                    <Text style={styles.experienceCompany}>{exp.company}</Text>
                  </View>
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

        {/* Education */}
        {education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu, index) => (
              <View key={edu.id} style={[styles.educationItem, index === education.length - 1 ? { borderBottom: 0 } : {}]}>
                <View style={styles.educationHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.educationDegree}>{edu.degree}</Text>
                    <Text style={styles.educationSchool}>{edu.school}</Text>
                    <Text style={styles.educationDetails}>
                      {edu.field && `${edu.field}`}
                      {edu.gpa && ` • GPA: ${edu.gpa}`}
                    </Text>
                  </View>
                  {edu.startDate && edu.endDate && (
                    <Text style={styles.educationDate}>
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsContainer}>
              {skills.map((skill) => {
                const skillStyles = getSkillStyles(skill.level);
                return (
                  <View key={skill.id} style={[styles.skillBadge, skillStyles.badge]}>
                    <Text style={[styles.skillText, skillStyles.text]}>
                      {skill.name}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ModernPDFTemplate; 