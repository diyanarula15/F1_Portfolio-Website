import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Linkedin, Github, Copy, Check } from 'lucide-react';

export const Contact = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('naruladiya15@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Pit Wall Dashboard */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="bg-[#0f0c29]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-pink via-cyan-ice to-neon-pink"></div>
        
        <h3 className="font-display text-3xl mb-8 flex items-center gap-3">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_red]"></div>
          PIT WALL COMMS
        </h3>

        <div className="space-y-6">
          
          {/* Email Radio Channel */}
          <div className="bg-black/40 p-4 rounded-lg border border-white/10 flex items-center justify-between group">
             <div>
               <div className="font-mono text-[10px] text-gray-500 mb-1">FREQUENCY (EMAIL)</div>
               <div className="font-mono text-lg text-white group-hover:text-cyan-ice transition-colors">naruladiya15@gmail.com</div>
             </div>
             <button 
               onClick={handleCopyEmail}
               className="h-10 px-4 bg-white/5 border border-white/20 hover:bg-neon-pink/20 hover:border-neon-pink hover:text-neon-pink rounded flex items-center gap-2 transition-all font-mono text-xs"
             >
               {copied ? <><Check className="w-4 h-4" /> COPIED</> : <><Copy className="w-4 h-4" /> RADIO CHECK</>}
             </button>
          </div>

          {/* Phone */}
          <div className="bg-black/40 p-4 rounded-lg border border-white/10">
             <div className="font-mono text-[10px] text-gray-500 mb-1">SECURE_LINE (PHONE)</div>
             <div className="font-mono text-lg text-white">+91 82873 47923</div>
          </div>

          {/* Location */}
          <div className="bg-black/40 p-4 rounded-lg border border-white/10 flex items-center justify-between">
             <div>
               <div className="font-mono text-[10px] text-gray-500 mb-1">CURRENT_LOC</div>
               <div className="font-mono text-lg text-white">NEW DELHI, INDIA</div>
             </div>
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          </div>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <a href="https://linkedin.com/in/diya-narula-b33700256" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 py-4 rounded bg-[#0077b5]/10 border border-[#0077b5]/30 hover:bg-[#0077b5]/20 hover:border-[#0077b5] text-[#0077b5] transition-all font-display tracking-widest hover:scale-[1.02]">
            <Linkedin className="w-5 h-5" /> LINKEDIN
          </a>
          <a href="https://github.com/diyanarula15" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 py-4 rounded bg-[#333]/30 border border-white/10 hover:border-white hover:bg-white/10 text-white transition-all font-display tracking-widest hover:scale-[1.02]">
            <Github className="w-5 h-5" /> GITHUB
          </a>
        </div>
      </motion.div>

      {/* Decorative Map / Graphic */}
      <motion.div 
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="hidden lg:flex flex-col items-center justify-center relative min-h-[400px]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/10 to-cyan-ice/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 border border-white/10 bg-black/50 backdrop-blur-md p-8 rounded-full w-64 h-64 flex items-center justify-center animate-spin-slow">
           <div className="border border-dashed border-white/20 rounded-full w-48 h-48"></div>
        </div>
        <div className="absolute z-20 text-center">
           <h4 className="font-display text-4xl text-white mb-2">THANK YOU</h4>
           <p className="font-mono text-cyan-ice text-sm">FOR VISITING THE PADDOCK</p>
        </div>
      </motion.div>
    </div>
  );
};