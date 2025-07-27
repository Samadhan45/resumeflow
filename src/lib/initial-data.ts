import type { Resume } from './types';

export const initialData: Resume = {
  personalInfo: {
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '123-456-7890',
    location: 'New York, NY',
    website: 'johndoe.com',
  },
  summary: 'A passionate and driven professional with experience in web development and design. Looking for a challenging role to grow my skills.',
  experience: [
    {
      id: '1',
      jobTitle: 'Software Engineer',
      company: 'Tech Corp',
      location: 'San Francisco, CA',
      startDate: 'Jan 2020',
      endDate: 'Present',
      responsibilities: 'Developed and maintained web applications using React and Node.js.',
      bulletPoints: [
        'Led the development of a new e-commerce platform, resulting in a 20% increase in sales.',
        'Collaborated with a team of 5 engineers to deliver high-quality code on time.',
        'Improved application performance by 30% through code optimization.',
      ],
    },
    {
      id: '2',
      jobTitle: 'Junior Web Developer',
      company: 'Innovate LLC',
      location: 'Boston, MA',
      startDate: 'Jun 2019',
      endDate: 'Dec 2019',
      responsibilities: 'Assisted senior developers in building and testing user-facing features for a SaaS product.',
      bulletPoints: [
        'Resolved over 50 front-end bugs related to CSS and JavaScript, improving user experience.',
        'Contributed to the development of a responsive and mobile-first UI using Bootstrap.',
        'Participated in daily stand-ups and agile development processes.',
      ],
    }
  ],
  education: [
    {
      id: '1',
      degree: 'B.S. in Computer Science',
      institution: 'University of Technology',
      graduationDate: 'May 2019',
    },
  ],
  skills: [
    { id: '1', name: 'JavaScript' },
    { id: '2', name: 'React' },
    { id: '3', name: 'Node.js' },
    { id: '4', name: 'TypeScript' },
  ],
  newSkill: '',
};
