import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  id: string;
  title?: string;
  subtitle?: string;
  sector: string;
}

export const SectionWrapper: React.FC<Props> = ({ children, id, title, subtitle, sector }) => {
  return (
    <section id={id} className="relative w-full min-h-screen py-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-center z-10 pointer-events-auto">
      {/* Telemetry Markers */}
      <div className="absolute top-10 left-6 md:left-0 font-mono text-xs text-slate-400 flex items-center gap-2">
        <span className="w-2 h-2 bg-neon-pink rounded-full animate-pulse"></span>
        SECTOR // {sector}
      </div>
      <div className="absolute top-10 right-6 md:right-0 font-mono text-xs text-slate-400 border border-white/20 px-2 py-1 bg-black/30 backdrop-blur-sm">
        SYS.NORMAL
      </div>

      {/* Header */}
      {(title) && (
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12 border-l-4 border-neon-pink pl-6 bg-gradient-to-r from-black/50 to-transparent py-2 backdrop-blur-sm rounded-r-lg"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-wider text-white drop-shadow-md">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-lg md:text-xl font-mono text-cyan-ice font-medium">
              {subtitle}
            </p>
          )}
        </motion.div>
      )}

      <div className="relative z-20">
        {children}
      </div>
    </section>
  );
};