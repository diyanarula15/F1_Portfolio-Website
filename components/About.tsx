import React from 'react';
import { motion } from 'framer-motion';
import { Code, Coffee, Bug, Zap } from 'lucide-react';
import { Stat } from '../types';

// Fun Stats for the Right Side
const funStats: Stat[] = [
  { label: 'LANGUAGES', value: '5+', icon: <Code className="w-5 h-5 text-neon-pink" /> },
  { label: 'COFFEE', value: '∞', icon: <Coffee className="w-5 h-5 text-cyan-ice" /> },
  { label: 'BUGS', value: '404', icon: <Bug className="w-5 h-5 text-rose-gold" /> },
  { label: 'WPM', value: '102', icon: <Zap className="w-5 h-5 text-yellow-400" /> },
];

export const About = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      
      {/* LEFT: Driver Profile Card (Trading Card Style) */}
      <motion.div 
        initial={{ x: -50, opacity: 0, rotateY: 15 }}
        whileInView={{ x: 0, opacity: 1, rotateY: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        className="lg:col-span-5 relative group perspective-1000"
      >
        {/* Holographic Glow Behind */}
        <div className="absolute -inset-1 bg-gradient-to-br from-rose-gold via-neon-pink to-cyan-ice rounded-2xl opacity-40 blur-xl group-hover:opacity-60 transition duration-500 animate-pulse"></div>
        
        {/* Card Chassis */}
        <div className="relative h-[600px] bg-[#0f0c29] rounded-2xl overflow-hidden border border-white/20 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col transform transition-transform duration-500 group-hover:scale-[1.01]">
           
           {/* Top: Image Section */}
           <div className="relative h-[70%] w-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0c29] via-transparent to-transparent z-10 opacity-80"></div>
              
              {/* Image - Updated to use local asset 'diyanarula.jpg' */}
              <img 
                src="/assets/diyanarula.jpg" 
                alt="Diya Narula" 
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-110 object-top"
              />

              {/* Driver Number */}
              <div className="absolute top-6 right-6 z-20">
                 <span className="font-display text-7xl text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 italic drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>
                    15
                 </span>
              </div>

              {/* Name & Team Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 flex flex-col items-start">
                 <div className="px-3 py-1 bg-neon-pink text-black font-display text-sm italic transform -skew-x-12 mb-2 inline-block shadow-[0_0_10px_#ff00cc]">
                    THE DRIVER
                 </div>
                 <h2 className="font-display text-5xl text-white uppercase leading-[0.85] drop-shadow-lg">
                    DIYA<br/><span className="text-cyan-ice">NARULA</span>
                 </h2>
                 <div className="mt-3 flex items-center gap-2">
                    <span className="h-[1px] w-8 bg-rose-gold"></span>
                    <p className="font-mono text-xs text-rose-gold tracking-widest">
                       IIIT DELHI (CS & DESIGN)
                    </p>
                 </div>
              </div>
           </div>

           {/* Bottom: Season Stats Panel */}
           <div className="h-[30%] bg-[#121212] backdrop-blur-xl border-t border-white/10 p-5 flex flex-col justify-between relative overflow-hidden">
              {/* Subtle Tech Grid Background */}
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 relative z-10 h-full">
                 <div className="flex flex-col items-center justify-center p-2 bg-white/5 rounded border border-white/5 hover:border-gold/50 transition-colors group/stat">
                    <span className="font-display text-2xl font-bold text-gold group-hover/stat:scale-110 transition-transform">1771</span>
                    <span className="font-mono text-[9px] text-gray-400 mt-1 text-center">RATING</span>
                    <span className="font-mono text-[8px] text-gold/60 uppercase tracking-wider">EXPERT</span>
                 </div>
                 <div className="flex flex-col items-center justify-center p-2 bg-white/5 rounded border border-white/5 hover:border-silver/50 transition-colors group/stat">
                    <span className="font-display text-2xl font-bold text-silver group-hover/stat:scale-110 transition-transform">03</span>
                    <span className="font-mono text-[9px] text-gray-400 mt-1 text-center">PODIUMS</span>
                    <span className="font-mono text-[8px] text-silver/60 uppercase tracking-wider">WINS</span>
                 </div>
                 <div className="flex flex-col items-center justify-center p-2 bg-white/5 rounded border border-white/5 hover:border-rose-gold/50 transition-colors group/stat">
                    <span className="font-display text-2xl font-bold text-rose-gold group-hover/stat:scale-110 transition-transform">1K+</span>
                    <span className="font-mono text-[9px] text-gray-400 mt-1 text-center">DSA Qs</span>
                    <span className="font-mono text-[8px] text-rose-gold/60 uppercase tracking-wider">SOLVED</span>
                 </div>
              </div>
           </div>
        </div>
      </motion.div>

      {/* RIGHT: Bio & Fun Stats */}
      <div className="lg:col-span-7 space-y-8 relative z-20 pl-0 lg:pl-4">
        <motion.div
           initial={{ opacity: 0, x: 50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           className="glass-panel p-8 rounded-xl relative overflow-hidden"
        >
          {/* Decorative Grid Background */}
          <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

          <p className="text-xl text-slate-100 relative z-10 leading-relaxed font-medium">
             <span className="text-cyan-ice font-bold">CS & Design Undergrad</span> at IIIT Delhi. Specializing in <span className="text-white font-bold">Distributed Systems</span> and <span className="text-white font-bold">Creative Technology</span>. I blend high-performance engineering with aesthetic perfection. Just like an F1 car, my code is optimized for speed, reliability, and visual impact. I build digital experiences that don't just function—they <span className="text-neon-pink italic font-black">perform</span>.
          </p>
        </motion.div>

        {/* Fun Stats Grid (Secondary Telemetry) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {funStats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-black/40 border border-white/20 p-3 rounded-lg hover:border-neon-pink/80 transition-colors group backdrop-blur-md flex flex-col items-center justify-center text-center"
            >
              <div className="flex items-center gap-2 mb-1 opacity-80 group-hover:opacity-100">
                {stat.icon}
              </div>
              <div className="font-display text-xl font-bold text-white group-hover:text-neon-pink transition-colors">
                {stat.value}
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Technical Specs / Core Stack */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-4">
             <span className="font-mono text-slate-400 text-xs">CORE_ENGINE_SPECS</span>
             <div className="h-[1px] bg-white/10 flex-grow"></div>
          </div>
          <div className="flex flex-wrap gap-3">
            {['Python', 'C++', 'Java', 'C', 'TypeScript', 'Three.js', 'Figma', 'React', 'Next.js'].map((tech) => (
              <span key={tech} className="px-3 py-1 text-xs font-mono border border-cyan-ice/30 text-cyan-ice rounded bg-cyan-ice/5 hover:bg-cyan-ice/20 hover:text-white transition-colors cursor-crosshair font-bold uppercase">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};