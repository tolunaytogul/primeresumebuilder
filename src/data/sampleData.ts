import { CVData } from '@/types/cv';

export const sampleCVData: CVData = {
  personalInfo: {
    name: 'Sarah Johnson',
    title: 'Senior Frontend Developer',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    summary: 'Passionate frontend developer with 6+ years of experience building scalable web applications using React, TypeScript, and modern development practices. Proven track record of leading cross-functional teams and delivering high-quality user experiences that drive business growth. Expertise in performance optimization, accessibility, and responsive design.'
  },
  experiences: [
    {
      id: '1',
      position: 'Senior Frontend Developer',
      company: 'TechCorp Solutions',
      startDate: '2022-03',
      endDate: '',
      isCurrentJob: true,
      description: 'Lead frontend development for enterprise SaaS platform serving 100k+ users. Architected and implemented React-based component library, reducing development time by 40%. Mentored junior developers and established best practices for code quality and testing.'
    },
    {
      id: '2',
      position: 'Frontend Developer',
      company: 'Digital Innovations Inc',
      startDate: '2020-01',
      endDate: '2022-02',
      isCurrentJob: false,
      description: 'Developed responsive web applications using React, Redux, and TypeScript. Collaborated with UX/UI designers to implement pixel-perfect designs. Improved application performance by 60% through code optimization and lazy loading strategies.'
    },
    {
      id: '3',
      position: 'Junior Web Developer',
      company: 'StartupHub',
      startDate: '2018-06',
      endDate: '2019-12',
      isCurrentJob: false,
      description: 'Built interactive web interfaces using HTML5, CSS3, and JavaScript. Worked closely with backend developers to integrate RESTful APIs. Participated in agile development process and contributed to product roadmap discussions.'
    }
  ],
  education: [
    {
      id: '1',
      degree: 'Bachelor of Science in Computer Science',
      school: 'University of California, Berkeley',
      field: 'Computer Science',
      startDate: '2014-09',
      endDate: '2018-05',
      gpa: '3.8'
    },
    {
      id: '2',
      degree: 'Frontend Development Bootcamp',
      school: 'General Assembly',
      field: 'Web Development',
      startDate: '2018-01',
      endDate: '2018-04',
      gpa: ''
    }
  ],
  skills: [
    {
      id: '1',
      name: 'React',
      level: 'Expert'
    },
    {
      id: '2',
      name: 'TypeScript',
      level: 'Expert'
    },
    {
      id: '3',
      name: 'JavaScript',
      level: 'Expert'
    },
    {
      id: '4',
      name: 'Next.js',
      level: 'Advanced'
    },
    {
      id: '5',
      name: 'Node.js',
      level: 'Advanced'
    },
    {
      id: '6',
      name: 'GraphQL',
      level: 'Advanced'
    },
    {
      id: '7',
      name: 'AWS',
      level: 'Intermediate'
    },
    {
      id: '8',
      name: 'Docker',
      level: 'Intermediate'
    },
    {
      id: '9',
      name: 'Python',
      level: 'Beginner'
    },
    {
      id: '10',
      name: 'Figma',
      level: 'Intermediate'
    }
  ]
}; 