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
      return { ...state, experience: [...state.experience, { id: nanoid(), jobTitle: '', company: '', location: '', startDate: '', endDate: '', responsibilities: '', bulletPoints: [] }] };
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
    case 'MOVE_EXPERIENCE': {
      const { from, to } = action.payload;
      if (to < 0 || to >= state.experience.length) return state;
      const newExperience = [...state.experience];
      const [item] = newExperience.splice(from, 1);
      newExperience.splice(to, 0, item);
      return { ...state, experience: newExperience };
    }
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
    case 'MOVE_EDUCATION': {
      const { from, to } = action.payload;
      if (to < 0 || to >= state.education.length) return state;
      const newEducation = [...state.education];
      const [item] = newEducation.splice(from, 1);
      newEducation.splice(to, 0, item);
      return { ...state, education: newEducation };
    }
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
        dispatch({ type: 'SET_STATE', payload: JSON.parse(storedState) });
      }
    } catch (error) {
      console.error("Failed to parse resume state from localStorage", error);
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
