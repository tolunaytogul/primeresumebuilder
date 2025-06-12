'use client';

import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { CVData } from '@/types/cv';

// Classic PDF Styles - Traditional Conservative Design
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 35,
    fontFamily: 'Times-Roman',
    fontSize: 10,
    lineHeight: 1.3,
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
    borderBottom: 1,
    borderBottomColor: '#000000',
    paddingBottom: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    fontSize: 14,
    color: '#333333',
    fontStyle: 'italic',
    marginBottom: 12,
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    fontSize: 10,
    color: '#555555',
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
    color: '#000000',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    textAlign: 'center',
    borderBottom: 1,
    borderBottomColor: '#000000',
    paddingBottom: 4,
  },
  summary: {
    fontSize: 11,
    lineHeight: 1.6,
    color: '#333333',
    textAlign: 'justify',
    fontStyle: 'italic',
  },
  experienceItem: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottom: 1,
    borderBottomColor: '#CCCCCC',
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
    color: '#000000',
  },
  experienceCompany: {
    fontSize: 12,
    color: '#333333',
    fontStyle: 'italic',
    marginTop: 2,
  },
  experienceDate: {
    fontSize: 10,
    color: '#666666',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  experienceDescription: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#444444',
    marginTop: 8,
  },
  educationItem: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottom: 1,
    borderBottomColor: '#EEEEEE',
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
    color: '#000000',
  },
  educationSchool: {
    fontSize: 11,
    color: '#333333',
    fontStyle: 'italic',
    marginTop: 2,
  },
  educationDetails: {
    fontSize: 10,
    color: '#666666',
    marginTop: 3,
  },
  educationDate: {
    fontSize: 10,
    color: '#666666',
    textAlign: 'right',
  },
  skillsContainer: {
    flexDirection: 'column',
    gap: 8,
  },
  skillCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  skillLevel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000000',
    minWidth: 80,
    textTransform: 'uppercase',
  },
  skillList: {
    fontSize: 10,
    color: '#333333',
    flex: 1,
  },
});

interface ClassicPDFTemplateProps {
  cvData: CVData;
}

const ClassicPDFTemplate: React.FC<ClassicPDFTemplateProps> = ({ cvData }) => {
  const { personalInfo, experiences, education, skills } = cvData;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  // Group skills by level for classic presentation
  const skillsByLevel = skills.reduce((acc, skill) => {
    if (!acc[skill.level]) acc[skill.level] = [];
    acc[skill.level].push(skill.name);
    return acc;
  }, {} as Record<string, string[]>);

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
            <Text style={styles.sectionTitle}>Professional Experience</Text>
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
            <Text style={styles.sectionTitle}>Technical Skills</Text>
            <View style={styles.skillsContainer}>
              {Object.entries(skillsByLevel).map(([level, skillNames]) => (
                <View key={level} style={styles.skillCategory}>
                  <Text style={styles.skillLevel}>{level}:</Text>
                  <Text style={styles.skillList}>{skillNames.join(', ')}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ClassicPDFTemplate; 