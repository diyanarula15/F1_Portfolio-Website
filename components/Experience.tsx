import React from 'react';
import { motion } from 'framer-motion';
import { ExperienceItem } from '../types';
import { User, FileText, Radio, MapPin } from 'lucide-react';

const experiences: ExperienceItem[] = [
  {
    id: 1,
    role: 'Research Engineer Intern',
    company: 'IIIT Delhi',
    duration: 'May 2025 – Present',
    description: 'Engineered real-time rendering pipelines (60 FPS) using TouchDesigner & Stable Diffusion. Built OSC controllers for live audio-reactive visuals used in production environments.',
    type: 'work',
    docsUrl: '#',
    poc: {
      name: 'Dr. Aman Parnami',
      title: 'Professor, Weave Lab'
    }
  },
  {
    id: 2,
    role: 'SDE Intern',
    company: 'CRIS (Ministry of Railways)',
    duration: 'Dec 2023 – Jan 2024',
    description: 'Built a Django project management platform for 1100+ active users. Optimized PostgreSQL schemas for high-scale queries, reducing report generation time by 40%.',
    type: 'work',
    docsUrl: '#',
    poc: {
      name: 'Mr. R.K. Singh',
      title: 'Lead Engineer'
    }
  }
];

export const Experience = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto pl-4 md:pl-0">
      {/* Central "Track" Line */}
      <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-2 bg-[#1a1a1a] border-x border-white/10 -translate-x-1/2 md:translate-x-0 rounded-full"></div>
      <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[1px] bg-dashed bg-white/20 -translate-x-1/2 md:translate-x-0"></div>
      
      <div className="space-y-24 py-10">
        {experiences.map((exp, index) => {
          const isEven = index % 2 === 0;
          return (
            <div key={exp.id} className={`flex flex-col md:flex-row items-start ${isEven ? 'md:flex-row-reverse' : ''} gap-8 relative group`}>
              
              {/* Timeline Node (Pit Stop) */}
              <div className="absolute left-[28px] md:left-1/2 -translate-x-1/2 w-8 h-8 bg-[#0f0c29] border-2 border-neon-pink rounded-full z-20 shadow-[0_0_15px_rgba(255,0,204,0.6)] mt-6 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>

              {/* Connecting Line */}
              <div className={`hidden md:block absolute top-[36px] h-[1px] bg-neon-pink/50 w-12 ${isEven ? 'right-1/2' : 'left-1/2'}`}></div>

              {/* Content Card */}
              <motion.div 
                initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`ml-16 md:ml-0 md:w-[calc(50%-60px)] ${isEven ? 'text-left' : 'md:text-right'} relative`}
              >
                {/* FIA Steward / Avatar - Positioned absolutely based on side */}
                <div className={`hidden md:flex absolute -top-8 ${isEven ? '-left-12' : '-right-12'} flex-col items-center opacity-80 group-hover:opacity-100 transition-opacity`}>
                   <div className="w-10 h-10 rounded-full border border-rose-gold bg-rose-gold/10 flex items-center justify-center text-rose-gold shadow-[0_0_10px_rgba(183,110,121,0.2)]">
                      <User className="w-5 h-5" />
                   </div>
                   <span className="text-[9px] font-mono text-rose-gold mt-1 bg-black/50 px-1 rounded">STEWARD</span>
                </div>

                <div className="glass-panel p-6 rounded-xl border border-white/10 hover:border-neon-pink/50 transition-all duration-300 relative overflow-hidden">
                  
                  {/* Card Header */}
                  <div className={`flex flex-col ${isEven ? 'items-start' : 'md:items-end'} mb-4 relative z-10`}>
                    <span className="font-mono text-[10px] text-cyan-ice px-2 py-0.5 rounded border border-cyan-ice/30 bg-cyan-ice/10 mb-2 inline-flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {exp.duration}
                    </span>
                    <h3 className="font-display text-2xl font-bold text-white leading-tight group-hover:text-neon-pink transition-colors">{exp.role}</h3>
                    <h4 className="text-silver font-mono text-sm tracking-wide mt-1">@ {exp.company}</h4>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed font-light mb-6 relative z-10">
                    {exp.description}
                  </p>

                  {/* Actions / Meta */}
                  <div className={`flex items-center gap-4 relative z-10 ${isEven ? 'justify-start' : 'md:justify-end'}`}>
                    
                    {/* View Docs Button */}
                    {exp.docsUrl && (
                        <a href={exp.docsUrl} className="flex items-center gap-2 text-xs font-mono text-white bg-white/5 hover:bg-white/10 border border-white/20 px-3 py-2 rounded transition-colors">
                            <FileText className="w-3 h-3 text-cyan-ice" />
                            DOCS_V1
                        </a>
                    )}

                    {/* POC Hover Reveal */}
                    {exp.poc && (
                        <div className="relative group/poc cursor-help">
                            <div className="flex items-center gap-2 text-xs font-mono text-rose-gold border border-rose-gold/20 px-3 py-2 rounded bg-rose-gold/5 group-hover/poc:bg-rose-gold/20 transition-colors">
                                <Radio className="w-3 h-3 animate-pulse" />
                                POC_LINK
                            </div>
                            {/* Hover Tooltip */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-[#0f0c29] border border-rose-gold text-white text-xs p-2 rounded shadow-xl opacity-0 group-hover/poc:opacity-100 pointer-events-none transition-opacity z-50 text-center">
                                <div className="font-bold text-rose-gold">{exp.poc.name}</div>
                                <div className="text-[10px] text-gray-400">{exp.poc.title}</div>
                            </div>
                        </div>
                    )}
                  </div>
                  
                  {/* Background Accents */}
                  <div className="absolute top-0 right-0 p-3 opacity-5">
                     <User className="w-24 h-24" />
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};