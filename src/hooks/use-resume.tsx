'use client';

import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { Resume, Action } from '@/lib/types';
import { initialData } from '@/lib/initial-data';
import { nanoid } from 'nanoid';

const ResumeContext = createContext<{ state: Resume; dispatch: React.Dispatch<Action> } | undefined>(undefined);

const resumeReducer = (state: Resume, action: Action): Resume => {
  switch (action.type) {
    case 'SET_STATE':
        return action.payload;
    case 'UPDATE_PERSONAL_INFO':
      return { ...state, personalInfo: { ...state.personalInfo, ...action.payload } };
    case 'UPDATE_SUMMARY':
      return { ...state, summary: action.payload };
    case 'ADD_EXPERIENCE':
      return { ...state, experience: [...state.experience, { id: nanoid(), jobTitle: '', company: '', location: '', startDate: '', endDate: '', responsibilities: '', technologies: '', bulletPoints: [] }] };
    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        experience: state.experience.map((exp, i) =>
          i === action.payload.index ? { ...exp, [action.payload.key]: action.payload.value } : exp
        ),
      };
    case 'UPDATE_EXPERIENCE_BULLETS':
        return {
            ...state,
            experience: state.experience.map((exp, i) =>
                i === action.payload.index ? { ...exp, bulletPoints: action.payload.bullets } : exp
            )
        }
    case 'REMOVE_EXPERIENCE':
      return { ...state, experience: state.experience.filter((_, i) => i !== action.payload) };
    case 'ADD_PROJECT':
        return { ...state, projects: [...state.projects, { id: nanoid(), name: '', technologies: '', endDate: '', description: '', bulletPoints: [] }] };
    case 'UPDATE_PROJECT':
        return {
            ...state,
            projects: state.projects.map((proj, i) =>
            i === action.payload.index ? { ...proj, [action.payload.key]: action.payload.value } : proj
            ),
        };
    case 'UPDATE_PROJECT_BULLETS':
        return {
            ...state,
            projects: state.projects.map((proj, i) =>
                i === action.payload.index ? { ...proj, bulletPoints: action.payload.bullets } : proj
            )
        }
    case 'REMOVE_PROJECT':
        return { ...state, projects: state.projects.filter((_, i) => i !== action.payload) };
    case 'ADD_EDUCATION':
      return { ...state, education: [...state.education, { id: nanoid(), degree: '', institution: '', graduationDate: '' }] };
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        education: state.education.map((edu, i) =>
          i === action.payload.index ? { ...edu, [action.payload.key]: action.payload.value } : edu
        ),
      };
    case 'REMOVE_EDUCATION':
      return { ...state, education: state.education.filter((_, i) => i !== action.payload) };
    case 'UPDATE_NEW_SKILL':
        return { ...state, newSkill: action.payload };
    case 'ADD_SKILL':
        if (!state.newSkill.trim()) return state;
        return { ...state, skills: [...state.skills, { id: nanoid(), name: state.newSkill }], newSkill: '' };
    case 'UPDATE_SKILL':
        return {
            ...state,
            skills: state.skills.map((skill, i) =>
              i === action.payload.index ? { ...skill, name: action.payload.value } : skill
            ),
          };
    case 'REMOVE_SKILL':
      return { ...state, skills: state.skills.filter((_, i) => i !== action.payload) };
    case 'ADD_CERTIFICATION':
        return { ...state, certifications: [...state.certifications, { id: nanoid(), name: '' }] };
    case 'UPDATE_CERTIFICATION':
        return {
            ...state,
            certifications: state.certifications.map((cert, i) =>
            i === action.payload.index ? { ...cert, [action.payload.key]: action.payload.value } : cert
            ),
        };
    case 'REMOVE_CERTIFICATION':
        return { ...state, certifications: state.certifications.filter((_, i) => i !== action.payload) };
    case 'ADD_ACHIEVEMENT':
        return { ...state, achievements: [...state.achievements, { id: nanoid(), name: '' }] };
    case 'UPDATE_ACHIEVEMENT':
        return {
            ...state,
            achievements: state.achievements.map((ach, i) =>
            i === action.payload.index ? { ...ach, [action.payload.key]: action.payload.value } : ach
            ),
        };
    case 'REMOVE_ACHIEVEMENT':
        return { ...state, achievements: state.achievements.filter((_, i) => i !== action.payload) };
    case 'UPDATE_THEME':
      return { ...state, theme: { ...state.theme, ...action.payload } };
    default:
      return state;
  }
};


export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(resumeReducer, initialData);

  useEffect(() => {
    try {
      const storedState = localStorage.getItem('resumeState');
      if (storedState) {
        let parsedState = JSON.parse(storedState);
        // Deep merge theme to ensure new properties are added
        if (parsedState.theme) {
            parsedState.theme = {
                ...initialData.theme,
                ...parsedState.theme,
                heading: { ...initialData.theme.heading, ...parsedState.theme.heading },
                subheading: { ...initialData.theme.subheading, ...parsedState.theme.subheading },
                sectionHeading: { ...initialData.theme.sectionHeading, ...parsedState.theme.sectionHeading },
                body: { ...initialData.theme.body, ...parsedState.theme.body },
                link: { ...initialData.theme.link, ...parsedState.theme.link },
            };
        } else {
            parsedState.theme = initialData.theme;
        }

        dispatch({ type: 'SET_STATE', payload: parsedState });
      }
    } catch (error) {
      console.error("Failed to parse resume state from localStorage", error);
      dispatch({ type: 'SET_STATE', payload: initialData });
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('resumeState', JSON.stringify(state));
    } catch (error) {
       console.error("Failed to save resume state to localStorage", error);
    }
  }, [state]);

  return (
    <ResumeContext.Provider value={{ state, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
