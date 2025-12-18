import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Box, CircleDot, RefreshCw } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import { Project } from '../types';

const projects: Project[] = [
  {
    id: 1,
    title: 'FitCheck',
    category: 'AI Fashion Tech',
    filterCategory: 'ai-ml',
    description: 'Myntra Hackerramp Runner-up. AI styling platform analyzing body shape for personalized outfits with virtual try-on.',
    techStack: ['React 19', 'AWS', 'Gemini Nano', 'Python'],
    githubUrl: '#',
    image: '/assets/project-1.jpg'
  },
  {
    id: 2,
    title: 'Research Collab',
    category: 'Distributed Systems',
    filterCategory: 'full-stack',
    description: 'Production-grade platform for managing research grants and RBAC. Scalable architecture for university-wide adoption.',
    techStack: ['TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
    githubUrl: 'https://github.com/GodMakesMe/ResearchCollab',
    image: '/assets/project-2.jpg'
  },
  {
    id: 3,
    title: 'Credit Card Fraud',
    category: 'FinTech ML',
    filterCategory: 'ai-ml',
    description: 'End-to-end ML pipeline achieving 99% accuracy. Benchmarked multiple classifiers on large transaction datasets.',
    techStack: ['Python', 'Scikit-Learn', 'Pandas'],
    githubUrl: 'https://github.com/diyanarula15/Credit-Cart',
    image: '/assets/project-3.jpg'
  },
  {
    id: 4,
    title: 'ResQpet',
    category: 'Social Impact',
    filterCategory: 'full-stack',
    description: 'Offline-first rescue coordination app. Features NGO dashboards and AI first-aid chatbot.',
    techStack: ['Flutter', 'Firebase', 'Gemini API'],
    githubUrl: 'https://github.com/diyanarula15/ResQpet',
    image: '/assets/project-4.jpg'
  },
  {
    id: 5,
    title: 'Angry Birds Clone',
    category: 'Game Dev',
    filterCategory: 'creative',
    description: 'Physics-based game engine implementing projectile motion, collision detection, and destructible environments.',
    techStack: ['Java', 'LibGDX'],
    githubUrl: 'https://github.com/diyanarula15/angry-birds-clone',
    image: '/assets/project-5.jpg'
  },
  {
    id: 6,
    title: 'TempStat',
    category: 'Data Engineering',
    filterCategory: 'systems',
    description: 'High-performance system analyzing 50M+ weather records using memory-mapped I/O.',
    techStack: ['C', 'Systems Programming'],
    githubUrl: 'https://github.com/diyanarula15/tempstat',
    image: '/assets/project-6.jpg'
  },
  {
    id: 7,
    title: 'Byte Me App',
    category: 'Backend Systems',
    filterCategory: 'full-stack',
    description: 'Comprehensive food ordering system with dynamic menu browsing and robust inventory management.',
    techStack: ['Java', 'Java Swing'],
    githubUrl: 'https://github.com/diyanarula15/byteme',
    image: '/assets/project-7.jpg'
  },
  {
    id: 8,
    title: 'Yahtzee',
    category: 'Algorithm Design',
    filterCategory: 'creative',
    description: 'Digital implementation of the classic dice game focused on efficient scoring algorithms.',
    techStack: ['Python'],
    githubUrl: 'https://github.com/diyanarula15/yahtzee',
    image: '/assets/project-8.jpg'
  },
  {
    id: 9,
    title: 'KUSH Shell',
    category: 'OS Dev',
    filterCategory: 'systems',
    description: 'Custom Unix shell supporting piping, redirection, and signal handling to emulate bash.',
    techStack: ['C', 'Linux'],
    githubUrl: 'https://github.com/diyanarula15/Kush',
    image: '/assets/project-9.jpg'
  },
  {
    id: 10,
    title: 'ProofPath',
    category: 'FinTech',
    filterCategory: 'ai-ml',
    description: 'White-box decisioning platform converting ML scores into auditable "reason receipts".',
    techStack: ['Python', 'TypeScript', 'PostgreSQL'],
    githubUrl: '#',
    image: '/assets/project-10.jpg'
  }
];

type FilterType = 'all' | 'full-stack' | 'ai-ml' | 'creative';

export const Projects = () => {
  const [filter, setFilter] = useState<FilterType>('all');

  // Map filters to Tire Compound Colors
  const filters = [
    { id: 'all', label: 'ALL SESSIONS', color: 'text-white', border: 'border-white', bg: 'bg-white' },
    { id: 'full-stack', label: 'FULL STACK (SOFT)', color: 'text-red-500', border: 'border-red-500', bg: 'bg-red-500' },
    { id: 'ai-ml', label: 'AI / ML (MEDIUM)', color: 'text-yellow-400', border: 'border-yellow-400', bg: 'bg-yellow-400' },
    { id: 'creative', label: 'CREATIVE (HARD)', color: 'text-white', border: 'border-white', bg: 'bg-white' }, // Using White for Hard
  ];

  const filteredProjects = projects.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'full-stack') return p.filterCategory === 'full-stack' || p.filterCategory === 'systems';
    return p.filterCategory === filter;
  });

  return (
    <div>
      {/* Tire Compound Selector */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {filters.map((f) => {
          const isActive = filter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as FilterType)}
              className={`relative px-6 py-2 rounded-full border-2 font-display uppercase tracking-widest text-sm transition-all duration-300 ${
                isActive 
                  ? `${f.border} ${f.color} bg-black shadow-[0_0_15px_currentColor]` 
                  : 'border-white/10 text-gray-500 hover:border-white/30 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <CircleDot className={`w-4 h-4 ${isActive ? f.color : 'text-gray-600'}`} />
                {f.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="h-[400px] perspective-1000"
    >
      <Tilt
        tiltMaxAngleX={isFlipped ? 0 : 5}
        tiltMaxAngleY={isFlipped ? 0 : 5}
        scale={1.02}
        transitionSpeed={2000}
        className="w-full h-full preserve-3d"
      >
        <motion.div
            className="relative w-full h-full preserve-3d cursor-pointer"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => setIsFlipped(!isFlipped)}
        >
            {/* FRONT FACE */}
            <div className="absolute inset-0 backface-hidden">
                <div className="w-full h-full bg-[#0f0c29]/60 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 flex flex-col group hover:border-neon-pink/50 transition-colors shadow-[0_0_20px_rgba(0,0,0,0.3)]">
                    
                    {/* Image Area */}
                    <div className="h-3/5 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0c29] to-transparent z-10 opacity-90"></div>
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                        
                        {/* Overlay Hint */}
                        <div className="absolute top-2 right-2 z-20 flex gap-1">
                             <div className="text-[8px] font-mono text-cyan-ice border border-cyan-ice/50 bg-black/50 px-1 rounded flex items-center gap-1">
                                <RefreshCw className="w-2 h-2" /> FLIP
                             </div>
                        </div>
                        
                        {/* Tech Stack Badge (Compact) */}
                        <div className="absolute bottom-2 left-2 z-20 flex flex-wrap gap-1">
                             {project.techStack.slice(0, 2).map(t => (
                                 <span key={t} className="text-[8px] font-mono text-white bg-black/60 border border-white/10 px-1.5 py-0.5 rounded backdrop-blur-sm">{t}</span>
                             ))}
                             {project.techStack.length > 2 && <span className="text-[8px] font-mono text-gray-400 bg-black/60 px-1.5 py-0.5 rounded">+{project.techStack.length - 2}</span>}
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="h-2/5 p-5 flex flex-col justify-between relative z-20">
                        <div>
                             <h3 className="font-display text-xl font-bold text-white mb-1 truncate group-hover:text-neon-pink transition-colors">{project.title}</h3>
                             <p className="font-mono text-[10px] text-rose-gold uppercase tracking-wider mb-2">{project.category}</p>
                             <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">
                                {project.description}
                             </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* BACK FACE */}
            <div className="absolute inset-0 backface-hidden rotate-y-180">
                <div className="w-full h-full bg-[#121212] rounded-xl border border-neon-pink/50 p-6 flex flex-col shadow-[0_0_30px_rgba(255,0,204,0.15)] overflow-hidden relative">
                    {/* Grid Background */}
                    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                    
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-4 border-b border-white/10 pb-3">
                            <div>
                                <h3 className="font-display text-xl font-bold text-white">{project.title}</h3>
                                <span className="font-mono text-[9px] text-cyan-ice bg-cyan-ice/10 px-1 rounded">SYSTEM_DETAILS</span>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 mb-4">
                            <p className="text-sm text-gray-300 leading-relaxed font-light mb-6">
                                {project.description}
                            </p>

                            <div className="mb-2">
                                <h4 className="font-mono text-[10px] text-gray-500 mb-2 uppercase tracking-widest">FULL STACK</h4>
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map(t => (
                                        <span key={t} className="text-[10px] font-mono text-white bg-white/5 border border-white/10 px-2 py-1 rounded hover:bg-neon-pink/10 hover:border-neon-pink/50 transition-colors cursor-default">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Footer Links */}
                         <div className="pt-3 mt-auto border-t border-white/10 flex gap-3">
                            <a 
                              href={project.githubUrl} 
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 py-2.5 rounded border border-white/10 hover:border-white/30 transition-all text-[10px] font-mono text-white group"
                            >
                                <Github className="w-3 h-3 group-hover:scale-110 transition-transform" /> REPO
                            </a>
                            {project.demoUrl && (
                              <a 
                                href={project.demoUrl}
                                target="_blank"
                                rel="noreferrer" 
                                onClick={(e) => e.stopPropagation()}
                                className="flex-1 flex items-center justify-center gap-2 bg-neon-pink/10 hover:bg-neon-pink/20 py-2.5 rounded border border-neon-pink/30 hover:border-neon-pink/60 transition-all text-[10px] font-mono text-neon-pink group"
                              >
                                  <ExternalLink className="w-3 h-3 group-hover:scale-110 transition-transform" /> DEPLOY
                              </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
      </Tilt>
    </motion.div>
  );
};
