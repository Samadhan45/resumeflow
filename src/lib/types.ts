export interface PersonalInfo {
  name: string;
  lastName?: string;
  jobTitle?: string;
  jobTitle2?: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  github?: string;
  linkedin?: string;
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  responsibilities: string;
  bulletPoints: string[];
  techStack: string[];
}

export interface Project {
    id: string;
    name: string;
    endDate: string;
    link?: string;
    description: string;
    bulletPoints: string[];
    techStack: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  graduationDate: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface Certification {
    id: string;
    name: string;
}

export interface Achievement {
    id: string;
    name: string;
}

interface FontStyle {
    fontSize: number;
    color: string;
}

export interface Theme {
    fontFamily: string;
    lineHeight: number;
    heading: FontStyle;
    subheading: FontStyle;
    sectionHeading: FontStyle;
    body: FontStyle;
    link: FontStyle;
}

export interface Resume {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  projects: Project[];
  education: Education[];
  skills: Skill[];
  certifications: Certification[];
  achievements: Achievement[];
  newSkill: string;
  theme: Theme;
}

export type Action =
  | { type: 'SET_STATE'; payload: Resume }
  | { type: 'UPDATE_PERSONAL_INFO'; payload: Partial<PersonalInfo> }
  | { type: 'UPDATE_SUMMARY'; payload: string }
  | { type: 'ADD_EXPERIENCE' }
  | { type: 'UPDATE_EXPERIENCE'; payload: { index: number; key: string; value: string } }
  | { type: 'UPDATE_EXPERIENCE_BULLETS'; payload: { index: number; bullets: string[] } }
  | { type: 'UPDATE_EXPERIENCE_TECH_STACK'; payload: { index: number; techStack: string[] } }
  | { type: 'REMOVE_EXPERIENCE'; payload: number }
  | { type: 'ADD_PROJECT' }
  | { type: 'UPDATE_PROJECT'; payload: { index: number; key: string; value: string } }
  | { type: 'UPDATE_PROJECT_BULLETS'; payload: { index: number; bullets: string[] } }
  | { type: 'UPDATE_PROJECT_TECH_STACK'; payload: { index: number; techStack: string[] } }
  | { type: 'REMOVE_PROJECT'; payload: number }
  | { type: 'ADD_EDUCATION' }
  | { type: 'UPDATE_EDUCATION'; payload: { index: number; key: string; value: string } }
  | { type: 'REMOVE_EDUCATION'; payload: number }
  | { type: 'UPDATE_NEW_SKILL'; payload: string }
  | { type: 'ADD_SKILL' }
  | { type: 'UPDATE_SKILL'; payload: { index: number; value: string } }
  | { type: 'REMOVE_SKILL'; payload: number }
  | { type: 'ADD_CERTIFICATION' }
  | { type: 'UPDATE_CERTIFICATION'; payload: { index: number; key: string; value: string } }
  | { type: 'REMOVE_CERTIFICATION'; payload: number }
  | { type: 'ADD_ACHIEVEMENT' }
  | { type: 'UPDATE_ACHIEVEMENT'; payload: { index: number; key: string; value: string } }
  | { type: 'REMOVE_ACHIEVEMENT'; payload: number }
  | { type: 'UPDATE_THEME'; payload: Partial<Theme> };
