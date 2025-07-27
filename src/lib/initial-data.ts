import type { Resume } from './types';

export const initialData: Resume = {
  personalInfo: {
    name: 'SAMADHAN',
    lastName: 'KADAM',
    jobTitle: 'Java Developer',
    jobTitle2: 'Full Stack Developer',
    email: 'samadhankadam002@gmail.com',
    phone: '8010792529',
    location: 'Pune, India',
    github: 'github.com/Samadhan45',
    linkedin: 'linkedin.com/in/samadhan1',
    website: 'samadhan-zeta.vercel.app',
  },
  summary: 'Java Developer with expertise in building scalable full-stack applications using React.js and Next.js. Possesses strong problem-solving and debugging skills and is a quick learner.',
  projects: [
    {
      id: '1',
      name: 'HisabKitab – Full Stack Finance WebApp',
      technologies: 'Next.js, Tailwind CSS, Clerk, Gemini AI, PostgreSQL',
      endDate: 'May 2025',
      link: '#',
      description: 'Helps users track income, expenses, and current balance with real-time financial insights.',
      bulletPoints: [
        'Integrated Clerk for Google login (100+ users) and Gemini AI to auto-log expenses from scanned bills.',
        'Managed financial data with Neon PostgreSQL and deployed on Vercel for fast, secure global access.',
      ],
    },
    {
      id: '2',
      name: 'CertVault – Document Management WebApp',
      technologies: 'React Hooks, JavaScript, CSS, Open AI',
      endDate: 'July 2024',
      link: '#',
      description: 'Built a secure, responsive platform to upload and manage 100+ documents with Firebase Auth & Firestore.',
      bulletPoints: [
        'Integrated Open AI-powered search and summary generator, boosting retrieval speed by 70%.',
        'Enabled PDF/JPEG exports, notes, and real-time updates, supporting mobile, tablet, and desktop users.',
      ],
    },
    {
        id: '3',
        name: 'AI Portfolio WebApp',
        technologies: 'Firebase, TypeScript, Tailwind CSS, Resend',
        endDate: 'July 2024',
        link: '#',
        description: 'Built a high-performance portfolio with dynamic routing and responsive UI using ShadCN and Tailwind CSS.',
        bulletPoints: [
            'Integrated Gemini AI (Genkit) for generating smart skill descriptions with tone customisation.',
            'Showcased 4 projects, 6 certifications, and enabled real-time messaging via the Resend email service.'
        ],
    },
  ],
  experience: [
    {
        id: '1',
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
        id: '2',
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
    { id: '1', name: 'Programming Languages: Java, C++, Python' },
    { id: '2', name: 'Frontend Technologies: React.js, HTML5, CSS3, JavaScript' },
    { id: '3', name: 'Backend Technologies: Django, Node.js, Next.js' },
    { id: '4', name: 'Databases: Oracle SQL, PostgreSQL, MongoDB' },
    { id: '5', name: 'Developer Tools: Git, GitHub, VS Code, Eclipse' },
    { id: '6', name: 'Soft Skills: Problem-solving, Teamwork, Adaptability, Time Management, Patience' },
  ],
  certifications: [
      { id: '1', name: 'Java: Core Java & Advanced Java – QSpiders' },
      { id: '2', name: 'C++: C++ Introduction & Advanced C++ – Simplilearn' },
      { id: '3', name: 'Full Stack: Java Full Stack Development Course – QSpiders' },
      { id: '4', name: 'SQL: Oracle SQL – QSpiders' },
      { id: '5', name: 'IT Support: Google IT Support Professional Certificate – Coursera' },
      { id: '6', name: 'ChatGPT: ChatGPT Advanced Course – Simplilearn' },
  ],
  achievements: [
      { id: '1', name: 'TCS NQT: Qualified National Qualifier Test – Tata Consultancy Services – 2025' },
      { id: '2', name: 'Research paper: Published a research paper as part of a final-year project.' },
      { id: '3', name: 'Project Management: Assigned tasks to 3 teammates and tracked weekly progress via GitHub.' },
  ],
  newSkill: '',
  theme: {
    fontFamily: 'Inter',
    lineHeight: 1.5,
    heading: {
        fontSize: 32,
        color: '#000000',
    },
    subheading: {
        fontSize: 16,
        color: '#4a5568',
    },
    sectionHeading: {
        fontSize: 14,
        color: '#2d3748',
    },
    body: {
        fontSize: 12,
        color: '#2d3748',
    },
    link: {
        fontSize: 12,
        color: '#2b6cb0',
    }
  }
};
