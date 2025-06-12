'use client';

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { CVData } from '@/types/cv';

// PDF Styles - Modern Professional Design
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 11,
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 25,
    paddingBottom: 15,
    borderBottom: 1,
    borderBottomColor: '#E5E7EB',
  },
  nameSection: {
    marginBottom: 8,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  title: {
    fontSize: 18,
    color: '#3B82F6',
    fontWeight: 'normal',
    marginBottom: 12,
  },
  contactInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 10,
    color: '#6B7280',
    gap: 15,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactLabel: {
    fontWeight: 'bold',
    marginRight: 4,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottom: 1,
    borderBottomColor: '#3B82F6',
    paddingBottom: 4,
  },
  summary: {
    fontSize: 11,
    lineHeight: 1.6,
    color: '#374151',
    textAlign: 'justify',
    marginBottom: 5,
  },
  experienceItem: {
    marginBottom: 16,
    paddingLeft: 12,
    borderLeft: 3,
    borderLeftColor: '#3B82F6',
    position: 'relative',
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  experienceLeft: {
    flex: 1,
  },
  experienceTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  experienceCompany: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: 'bold',
  },
  experienceDate: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: 'bold',
    textAlign: 'right',
    minWidth: 100,
  },
  experienceDescription: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#374151',
    marginTop: 6,
  },
  educationItem: {
    marginBottom: 14,
    paddingLeft: 12,
    borderLeft: 3,
    borderLeftColor: '#10B981',
  },
  educationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  educationLeft: {
    flex: 1,
  },
  educationDegree: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  educationSchool: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: 'bold',
  },
  educationDetails: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 2,
  },
  educationDate: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: 'bold',
    textAlign: 'right',
    minWidth: 100,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillItem: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
    borderRadius: 12,
    fontSize: 10,
    fontWeight: 'bold',
  },
  skillBeginner: {
    backgroundColor: '#F3F4F6',
    color: '#374151',
  },
  skillIntermediate: {
    backgroundColor: '#DBEAFE',
    color: '#1E40AF',
  },
  skillAdvanced: {
    backgroundColor: '#E9D5FF',
    color: '#7C3AED',
  },
  skillExpert: {
    backgroundColor: '#FED7AA',
    color: '#EA580C',
  },
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

  const getSkillStyle = (level: string) => {
    switch (level) {
      case 'Beginner': return [styles.skillItem, styles.skillBeginner];
      case 'Intermediate': return [styles.skillItem, styles.skillIntermediate];
      case 'Advanced': return [styles.skillItem, styles.skillAdvanced];
      case 'Expert': return [styles.skillItem, styles.skillExpert];
      default: return [styles.skillItem, styles.skillBeginner];
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header - Personal Info */}
        <View style={styles.header}>
          <View style={styles.nameSection}>
            <Text style={styles.name}>{personalInfo.name || 'Full Name'}</Text>
            <Text style={styles.title}>{personalInfo.title || 'Job Title'}</Text>
          </View>
          <View style={styles.contactInfo}>
            {personalInfo.email && (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Email:</Text>
                <Text>{personalInfo.email}</Text>
              </View>
            )}
            {personalInfo.phone && (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Phone:</Text>
                <Text>{personalInfo.phone}</Text>
              </View>
            )}
            {personalInfo.location && (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Location:</Text>
                <Text>{personalInfo.location}</Text>
              </View>
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
                <View style={styles.experienceHeader}>
                  <View style={styles.experienceLeft}>
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
            {education.map((edu) => (
              <View key={edu.id} style={styles.educationItem}>
                <View style={styles.educationHeader}>
                  <View style={styles.educationLeft}>
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
              {skills.map((skill) => (
                <Text key={skill.id} style={getSkillStyle(skill.level)}>
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

export default PDFDocument; 