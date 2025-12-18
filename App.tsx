import React from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll } from '@react-three/drei';
import { motion } from 'framer-motion';

import { Navbar } from './components/Navbar';
import { BackgroundScene } from './components/BackgroundScene';
import { SectionWrapper } from './components/SectionWrapper';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { TrophyCabinet } from './components/TrophyCabinet';
import { TrackRecords } from './components/TrackRecords';
import { PitStop } from './components/PitStop';
import { Terminal } from './components/Terminal';

export default function App() {
  const handleLaunch = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="h-screen w-full bg-[#0f0c29] text-white selection:bg-neon-pink selection:text-white overflow-hidden">
      
      {/* 3D Background & Scroll Container */}
      <Canvas className="w-full h-full" shadows>
        <ScrollControls pages={9} damping={0.2}>
          
          {/* The Active Track Scene */}
          <BackgroundScene />
          
          {/* HTML Overlay Content */}
          <Scroll html style={{ width: '100%' }}>
            
            {/* Page 1: Hero */}
            <section id="hero" className="h-screen w-full flex items-center justify-center relative">
              <div className="text-center px-4 z-10">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                >
                  <h2 className="font-mono text-neon-pink mb-4 tracking-[0.2em] text-sm md:text-base font-bold">
                    DIYA NARULA | CS & DESIGN @ IIIT DELHI
                  </h2>
                  <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight italic bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] leading-tight">
                    ENGINEERING<br/>SPEED & DESIGN
                  </h1>
                  
                  <motion.button
                    onClick={handleLaunch}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-12 group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-display font-bold tracking-tighter text-white transition-all duration-300 bg-neon-pink/10 border-2 border-neon-pink rounded-full hover:bg-neon-pink hover:text-black hover:shadow-[0_0_20px_#ff00cc]"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      LAUNCH CONTROL <span className="text-xl">→</span>
                    </span>
                  </motion.button>
                </motion.div>
              </div>
            </section>

            {/* Page 2: About (Driver Profile) */}
            <SectionWrapper id="about" title="Driver Profile" subtitle="Bio & Identity" sector="1">
              <About />
            </SectionWrapper>

            {/* Page 3: Telemetry (Stats) */}
            <SectionWrapper id="stats" title="Telemetry" subtitle="Performance Data" sector="2">
              <TrackRecords />
            </SectionWrapper>

            {/* Page 4: Achievements */}
            <SectionWrapper id="achievements" title="Trophy Cabinet" subtitle="Race Results" sector="3">
               <TrophyCabinet />
            </SectionWrapper>

            {/* Page 5: Projects */}
            <SectionWrapper id="projects" title="Starting Grid" subtitle="Featured Projects" sector="4">
              <Projects />
            </SectionWrapper>

            {/* Page 6: Experience */}
            <SectionWrapper id="experience" title="Circuit Map" subtitle="Career Track" sector="5">
              <Experience />
            </SectionWrapper>

            {/* Page 7: Pit Stop (Hobbies) */}
            <SectionWrapper id="pitstop" title="The Pit Stop" subtitle="Personality & Interests" sector="6">
              <PitStop />
            </SectionWrapper>

            {/* Page 8: Contact */}
            <SectionWrapper id="contact" title="Pit Wall" subtitle="Comms Channel" sector="7">
              <Contact />
              <footer className="mt-20 py-8 border-t border-white/10 text-center">
                <p className="font-mono text-xs text-gray-500">
                  © {new Date().getFullYear()} DIYA NARULA. BUILT WITH REACT & THREE.JS.
                </p>
              </footer>
            </SectionWrapper>

          </Scroll>
        </ScrollControls>
      </Canvas>

      {/* UI Overlays (Outside Canvas) */}
      <Navbar />
      <Terminal />
      
    </div>
  );
}