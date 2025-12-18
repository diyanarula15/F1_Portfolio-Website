import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState('hero');

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Garage' },
    { id: 'experience', label: 'Track Record' },
    { id: 'contact', label: 'Pit Wall' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% of section is visible
    );

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
    >
      <div className="bg-[#0f0c29]/60 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex items-center gap-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        
        {/* Logo / Home */}
        <button 
           onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
           className="w-8 h-8 bg-neon-pink rounded-full flex items-center justify-center font-display font-bold text-black text-sm italic shadow-[0_0_10px_#ff00cc] hover:scale-110 transition-transform"
        >
          D
        </button>

        <div className="h-6 w-[1px] bg-white/10"></div>

        {/* Links */}
        <div className="flex items-center gap-1 md:gap-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleScrollTo(item.id)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
                  isActive 
                    ? 'text-white bg-white/10 shadow-[0_0_15px_rgba(255,0,204,0.3)] border border-neon-pink/50' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label.toUpperCase()}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-neon-pink shadow-[0_0_5px_#ff00cc]"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};