import type { Resume } from './types';

export const initialData: Resume = {
  personalInfo: {
    name: 'Samadhan Vilas Kadam',
    email: 'samadhankadam002@gmail.com',
    phone: '8010792529',
    location: 'Pune, India',
    website: 'samadhan-zeta.vercel.app',
  },
  summary: 'Java Developer with expertise in building scalable full-stack applications using React.js and Next.js. Possesses strong problem-solving and debugging skills and is a quick learner.',
  experience: [
    {
      id: '1',
      jobTitle: 'Full Stack Finance WebApp',
      company: 'HisabKitab',
      location: 'Next.js, Tailwind CSS, Clerk, Gemini AI, PostgreSQL',
      startDate: '',
      endDate: 'May 2025',
      responsibilities: 'Helps users track income, expenses, and current balance with real-time financial insights.',
      bulletPoints: [
        'Integrated Clerk for Google login (100+ users) and Gemini AI to auto-log expenses from scanned bills.',
        'Managed financial data with Neon PostgreSQL and deployed on Vercel for fast, secure global access.',
      ],
    },
    {
      id: '2',
      jobTitle: 'Document Management WebApp',
      company: 'CertVault',
      location: 'React Hooks, JavaScript, CSS, Open AI',
      startDate: '',
      endDate: 'July 2024',
      responsibilities: 'Built a secure, responsive platform to upload and manage 100+ documents with Firebase Auth & Firestore.',
      bulletPoints: [
        'Integrated Open AI-powered search and summary generator, boosting retrieval speed by 70%.',
        'Enabled PDF/JPEG exports, notes, and real-time updates, supporting mobile, tablet, and desktop users.',
      ],
    },
    {
        id: '3',
        jobTitle: 'AI Portfolio WebApp',
        company: 'AI Portfolio',
        location: 'Firebase, TypeScript, Tailwind CSS, Resend',
        startDate: '',
        endDate: 'July 2024',
        responsibilities: 'Built a high-performance portfolio with dynamic routing and responsive UI using ShadCN and Tailwind CSS.',
        bulletPoints: [
            'Integrated Gemini AI (Genkit) for generating smart skill descriptions with tone customisation.',
            'Showcased 4 projects, 6 certifications, and enabled real-time messaging via the Resend email service.'
        ],
    },
    {
        id: '4',
        jobTitle: 'Web Development Intern',
        company: 'Elite Software',
        location: 'Django, Python, cPanel',
        startDate: 'Oct 2024',
        endDate: 'Nov 2024',
        responsibilities: 'Developed secure, full-stack web applications using Django. Focusing on the admin dashboard and user role management.',
        bulletPoints: [
            'Authentication: Learned to implement user login and security using Django\'s built-in features.',
            'Learned end-to-end project deployment workflows, including environment setup, 2+ domain integrations.'
        ],
    },
    {
        id: '5',
        jobTitle: 'Web Development Intern',
        company: 'Social Digital Wings',
        location: 'React.js, JavaScript, HTML, CSS',
        startDate: 'Apr 2021',
        endDate: 'May 2021',
        responsibilities: 'Led a team of 4 students to build a fully responsive React.js dashboard for internal project tracking and analytics.',
        bulletPoints: [
            'Designed and developed 10+ reusable components using HTML, CSS, JavaScript, and React.js.',
            'Enhanced UI consistency, contributing to 20% faster load times and 100% mobile responsiveness.'
        ],
    }
  ],
  education: [
    {
      id: '1',
      degree: 'B.E. in Computer Engineering',
      institution: 'Savitribai Phule Pune University, Pune, India',
      graduationDate: 'Dec 2021 - May 2025',
    },
  ],
  skills: [
    { id: '1', name: 'Java' },
    { id: '2', name: 'C++' },
    { id: '3', name: 'Python' },
    { id: '4', name: 'React.js' },
    { id: '5', name: 'HTML5' },
    { id: '6', name: 'CSS3' },
    { id: '7', name: 'JavaScript' },
    { id: '8', name: 'Django' },
    { id: '9', name: 'Node.js' },
    { id: '10', name: 'Next.js' },
    { id: '11', name: 'Oracle SQL' },
    { id: '12', name: 'PostgreSQL' },
    { id: '13', name: 'MongoDB' },
    { id: '14', name: 'Git' },
    { id: '15', name: 'GitHub' },
    { id: '16', name: 'VS Code' },
    { id: '17', name: 'Eclipse' },
    { id: '18', name: 'Problem-solving' },
    { id: '19', name: 'Teamwork' },
    { id: '20', name: 'Adaptability' },
    { id: '21', name: 'Time Management' },
    { id: '22', name: 'Patience' },
  ],
  newSkill: '',
};
