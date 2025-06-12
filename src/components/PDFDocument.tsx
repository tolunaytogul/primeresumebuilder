'use client';

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { CVData } from '@/types/cv';

// PDF Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Times-Roman',
  },
  header: {
    marginBottom: 20,
    borderBottom: 2,
    borderBottomColor: '#3B82F6',
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    color: '#3B82F6',
    marginBottom: 10,
  },
  contactInfo: {
    flexDirection: 'column',
    fontSize: 11,
    color: '#6B7280',
    gap: 2,
  },
  contactItem: {
    marginBottom: 2,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  summary: {
    fontSize: 11,
    lineHeight: 1.5,
    color: '#374151',
    textAlign: 'justify',
  },
  experienceItem: {
    marginBottom: 12,
    paddingLeft: 10,
    borderLeft: 2,
    borderLeftColor: '#3B82F6',
  },
  experienceTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  experienceCompany: {
    fontSize: 11,
    color: '#3B82F6',
    fontWeight: 'bold',
  },
  experienceDate: {
    fontSize: 10,
    color: '#6B7280',
    marginBottom: 4,
  },
  experienceDescription: {
    fontSize: 10,
    lineHeight: 1.4,
    color: '#374151',
  },
  educationItem: {
    marginBottom: 10,
    paddingLeft: 10,
    borderLeft: 2,
    borderLeftColor: '#10B981',
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
  },
  educationDetails: {
    fontSize: 10,
    color: '#6B7280',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillItem: {
    backgroundColor: '#F3F4F6',
    padding: 4,
    margin: 2,
    borderRadius: 4,
    fontSize: 10,
    color: '#374151',
  }
});

interface PDFDocumentProps {
  cvData: CVData;
}

const PDFDocument: React.FC<PDFDocumentProps> = ({ cvData }) => {
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
              <Text style={styles.contactItem}>Email: {personalInfo.email}</Text>
            )}
            {personalInfo.phone && (
              <Text style={styles.contactItem}>Phone: {personalInfo.phone}</Text>
            )}
            {personalInfo.location && (
              <Text style={styles.contactItem}>Location: {personalInfo.location}</Text>
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
            {experiences.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <Text style={styles.experienceTitle}>{exp.position}</Text>
                <Text style={styles.experienceCompany}>{exp.company}</Text>
                <Text style={styles.experienceDate}>
                  {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                </Text>
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
            {education.map((edu) => (
              <View key={edu.id} style={styles.educationItem}>
                <Text style={styles.educationDegree}>{edu.degree}</Text>
                <Text style={styles.educationSchool}>{edu.school}</Text>
                <Text style={styles.educationDetails}>
                  {edu.field && `${edu.field} • `}
                  {edu.startDate && edu.endDate && `${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}`}
                  {edu.gpa && ` • GPA: ${edu.gpa}`}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsContainer}>
              {skills.map((skill) => (
                <Text key={skill.id} style={styles.skillItem}>
                  {skill.name} • {skill.level}
                </Text>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default PDFDocument; 