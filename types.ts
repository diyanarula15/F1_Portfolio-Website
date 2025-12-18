import React from 'react';

export interface Project {
  id: number;
  title: string;
  category: string; // Display string
  filterCategory: 'full-stack' | 'ai-ml' | 'creative' | 'systems'; // For filtering
  description: string;
  techStack: string[];
  githubUrl: string;
  demoUrl?: string; // Optional now
  image: string;
}

export interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  duration: string;
  description: string;
  type: 'education' | 'work' | 'hackathon';
  docsUrl?: string;
  poc?: {
    name: string;
    title: string;
  };
}

export interface Stat {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export interface Achievement {
  id: number;
  title: string;
  event: string;
  level: 'gold' | 'silver' | 'bronze';
  description: string;
  date: string;
}

export interface Hobby {
  title: string;
  type: string;
  description: string;
  gridArea: string; // for bento layout
  icon: React.ReactNode;
  color: string;
  image: string;
}