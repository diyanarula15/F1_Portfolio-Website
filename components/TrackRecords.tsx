import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Trophy, Bug, Database, RotateCw, ChevronRight } from 'lucide-react';

// Data types
type ContentItem = {
  category?: string;
  text: string[]; // Always an array for pill rendering
};

type Gauge = {
  id: string;
  label: string;
  subtext: string;
  icon: React.ReactNode;
  content: ContentItem[];
  color: string;
  borderColor: string;
  bgGradient: string;
};

const gauges: Gauge[] = [
  {
    id: 'languages',
    label: 'CODE SYNTAX',
    subtext: '10+ LANGUAGES',
    icon: <Code className="w-8 h-8" />,
    color: 'text-cyan-ice',
    borderColor: 'border-cyan-ice',
    bgGradient: 'from-cyan-ice/20 to-transparent',
    content: [
      { category: 'Core', text: ['C++', 'Java', 'Python', 'C'] },
      { category: 'Web', text: ['JavaScript', 'TypeScript', 'HTML/CSS'] },
      { category: 'Tools', text: ['Bash', 'SQL', 'Assembly'] }
    ]
  },
  {
    id: 'arsenal',
    label: 'TECH STACK',
    subtext: 'FULL ARSENAL',
    icon: <Database className="w-8 h-8" />,
    color: 'text-neon-pink',
    borderColor: 'border-neon-pink',
    bgGradient: 'from-neon-pink/20 to-transparent',
    content: [
      { category: 'Frameworks', text: ['React', 'Node.js', 'Django'] },
      { category: 'Mobile', text: ['Flutter', 'ARKit', 'Native'] },
      { category: 'Creative', text: ['Three.js', 'WebGL', 'Framer'] },
      { category: 'Cloud', text: ['AWS', 'Firebase', 'Postgres'] }
    ]
  },
  {
    id: 'track-record',
    label: 'RANKINGS',
    subtext: 'GLOBAL ELITE',
    icon: <Trophy className="w-8 h-8" />,
    color: 'text-gold',
    borderColor: 'border-gold',
    bgGradient: 'from-gold/20 to-transparent',
    content: [
      { category: 'Codeforces', text: ['Expert', 'Rating: 1771'] },
      { category: 'Volume', text: ['1000+ Problems Solved'] },
      { category: 'Wins', text: ['Goldman Sachs #1', 'Myntra Runner-Up'] }
    ]
  },
  {
    id: 'bugs',
    label: 'DEBUG LOG',
    subtext: 'INFINITE',
    icon: <Bug className="w-8 h-8" />,
    color: 'text-rose-gold',
    borderColor: 'border-rose-gold',
    bgGradient: 'from-rose-gold/20 to-transparent',
    content: [
      { category: 'Status', text: ['404 Bugs Found', '405 Fixed'] },
      { category: 'Specialty', text: ['Distributed Systems', 'Race Conditions'] }
    ]
  }
];

export const TrackRecords = () => {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {gauges.map((gauge) => (
          <FlipCard 
            key={gauge.id} 
            gauge={gauge} 
            isFlipped={!!flippedCards[gauge.id]} 
            onFlip={() => toggleFlip(gauge.id)} 
          />
        ))}
      </div>
    </div>
  );
};

const FlipCard = ({ gauge, isFlipped, onFlip }: { gauge: Gauge; isFlipped: boolean; onFlip: () => void }) => {
  return (
    <div 
      className="h-[420px] w-full perspective-1000 cursor-pointer group" 
      onClick={onFlip}
    >
      <motion.div
        className="relative w-full h-full transition-all duration-500 preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* === FRONT FACE === */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <div className={`w-full h-full glass-panel rounded-2xl p-6 flex flex-col items-center justify-between border border-white/10 group-hover:border-white/30 transition-colors relative overflow-hidden shadow-lg`}>
            
            {/* Top Glow */}
            <div className={`absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b ${gauge.bgGradient} opacity-30 blur-2xl`}></div>
            
            {/* Header Badge */}
            <div className="w-full flex justify-between items-start z-10">
              <span className="font-mono text-[10px] text-white/40 border border-white/10 px-2 py-1 rounded-full bg-black/20">
                SYS.ID // {gauge.id.toUpperCase()}
              </span>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse box-shadow-glow"></div>
            </div>

            {/* Central Icon */}
            <div className="relative z-10 flex flex-col items-center gap-6">
              <div className={`w-24 h-24 rounded-full border-2 ${gauge.borderColor} flex items-center justify-center bg-black/40 shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_40px_currentColor] transition-all duration-500 ${gauge.color} relative`}>
                {/* Rotating ring */}
                <div className={`absolute inset-0 rounded-full border border-dashed border-white/20 animate-spin-slow`}></div>
                {gauge.icon}
              </div>
              
              <div className="text-center">
                <h3 className="font-display text-2xl font-bold text-white tracking-wide group-hover:scale-105 transition-transform duration-300">
                  {gauge.label}
                </h3>
                <div className="h-1 w-12 bg-white/10 mx-auto my-3 rounded-full"></div>
                <p className="font-mono text-xs text-cyan-ice tracking-wider uppercase opacity-80">
                  {gauge.subtext}
                </p>
              </div>
            </div>

            {/* Bottom Action Hint */}
            <div className="z-10 w-full pt-4 border-t border-white/5 flex justify-center">
               <div className="flex items-center gap-2 text-xs font-mono text-gray-500 group-hover:text-white transition-colors">
                  <span>VIEW DATA</span>
                  <RotateCw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
               </div>
            </div>
          </div>
        </div>

        {/* === BACK FACE === */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
           <div className="w-full h-full bg-[#0f0c29] rounded-2xl border border-white/20 p-6 relative overflow-hidden flex flex-col shadow-2xl">
              
              {/* Internal Grid Lines */}
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

              {/* Header */}
              <div className="flex items-center gap-3 mb-6 z-10 border-b border-white/10 pb-4">
                 <div className={`${gauge.color}`}>{gauge.icon}</div>
                 <h3 className="font-display text-xl font-bold text-white">{gauge.label}</h3>
              </div>

              {/* Data Content */}
              <div className="flex-1 overflow-y-auto custom-scrollbar z-10 space-y-5">
                 {gauge.content.map((section, idx) => (
                    <div key={idx}>
                       {section.category && (
                          <h4 className="font-mono text-[10px] text-gray-500 mb-2 uppercase tracking-widest font-bold flex items-center gap-2">
                             <span className={`w-1 h-1 rounded-full ${gauge.color.replace('text-', 'bg-')}`}></span>
                             {section.category}
                          </h4>
                       )}
                       <div className="flex flex-wrap gap-2">
                          {section.text.map((tag, tIdx) => (
                             <span 
                               key={tIdx} 
                               className="font-mono text-[11px] bg-white/5 border border-white/10 px-2 py-1 rounded text-slate-300 hover:bg-white/10 hover:border-neon-pink hover:text-white transition-colors cursor-default"
                             >
                                {tag}
                             </span>
                          ))}
                       </div>
                    </div>
                 ))}
              </div>

              {/* Footer */}
              <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center z-10">
                 <span className="font-mono text-[9px] text-gray-600">SYNCED: 12ms</span>
                 <button className="text-[10px] font-mono text-neon-pink hover:underline flex items-center gap-1">
                    CLOSE <ChevronRight className="w-3 h-3" />
                 </button>
              </div>

           </div>
        </div>
      </motion.div>
    </div>
  );
};
