'use client';

import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { CVData } from '@/types/cv';

// Minimal PDF Styles - Ultra-clean Design
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 60,
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 40,
  },
  name: {
    fontSize: 32,
    fontWeight: 'normal',
    color: '#000000',
    marginBottom: 8,
    letterSpacing: -1,
  },
  title: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 20,
    fontWeight: 'normal',
  },
  contactInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 9,
    color: '#888888',
    gap: 20,
  },
  contactItem: {
    marginBottom: 2,
  },
  section: {
    marginBottom: 35,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
    textTransform: 'lowercase',
    letterSpacing: 0.5,
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.6,
    color: '#444444',
    textAlign: 'left',
  },
  experienceItem: {
    marginBottom: 25,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 6,
  },
  experienceTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000000',
  },
  experienceCompany: {
    fontSize: 10,
    color: '#666666',
    marginTop: 2,
  },
  experienceDate: {
    fontSize: 9,
    color: '#999999',
    textAlign: 'right',
  },
  experienceDescription: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#555555',
    marginTop: 8,
  },
  educationItem: {
    marginBottom: 20,
  },
  educationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  educationDegree: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000000',
  },
  educationSchool: {
    fontSize: 10,
    color: '#666666',
    marginTop: 2,
  },
  educationDetails: {
    fontSize: 9,
    color: '#888888',
    marginTop: 3,
  },
  educationDate: {
    fontSize: 9,
    color: '#999999',
    textAlign: 'right',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  skillItem: {
    fontSize: 9,
    color: '#666666',
    marginBottom: 8,
  },
});

interface MinimalPDFTemplateProps {
  cvData: CVData;
}

const MinimalPDFTemplate: React.FC<MinimalPDFTemplateProps> = ({ cvData }) => {
  const { personalInfo, experiences, education, skills } = cvData;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
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
            <Text style={styles.sectionTitle}>about</Text>
            <Text style={styles.summary}>{personalInfo.summary}</Text>
          </View>
        )}

        {/* Work Experience */}
        {experiences.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>experience</Text>
            {experiences.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.experienceTitle}>{exp.position}</Text>
                    <Text style={styles.experienceCompany}>{exp.company}</Text>
                  </View>
                  <Text style={styles.experienceDate}>
                    {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'present' : formatDate(exp.endDate)}
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
            <Text style={styles.sectionTitle}>education</Text>
            {education.map((edu) => (
              <View key={edu.id} style={styles.educationItem}>
                <View style={styles.educationHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.educationDegree}>{edu.degree}</Text>
                    <Text style={styles.educationSchool}>{edu.school}</Text>
                    <Text style={styles.educationDetails}>
                      {edu.field && `${edu.field}`}
                      {edu.gpa && ` • ${edu.gpa}`}
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
            <Text style={styles.sectionTitle}>skills</Text>
            <View style={styles.skillsContainer}>
              {skills.map((skill) => (
                <Text key={skill.id} style={styles.skillItem}>
                  {skill.name}
                </Text>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default MinimalPDFTemplate; 