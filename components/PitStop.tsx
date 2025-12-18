import React from 'react';
import { motion } from 'framer-motion';
import { Flag, Palette, Dribbble, BookOpen } from 'lucide-react';
import { Hobby } from '../types';

const hobbies: Hobby[] = [
  {
    title: 'F1 Fanatic',
    type: 'Passion',
    description: 'Analyzing race strategies and telemetry. Team Mercedes (for now).',
    gridArea: 'col-span-2 row-span-2',
    icon: <Flag className="w-6 h-6" />,
    color: 'bg-teal-500/20 border-teal-500',
    image: '/assets/hobby-f1.jpg'
  },
  {
    title: 'Painting',
    type: 'Art',
    description: 'Digital & Canvas. Finding the balance between precision and chaos.',
    gridArea: 'col-span-1 row-span-1',
    icon: <Palette className="w-6 h-6" />,
    color: 'bg-rose-500/20 border-rose-500',
    image: '/assets/hobby-painting.jpg'
  },
  {
    title: 'Basketball',
    type: 'Sport',
    description: "Point Guard. It's all about team strategy and spacing.",
    gridArea: 'col-span-1 row-span-1',
    icon: <Dribbble className="w-6 h-6" />,
    color: 'bg-orange-500/20 border-orange-500',
    image: '/assets/hobby-basketball.jpg'
  },
  {
    title: 'Reading',
    type: 'Leisure',
    description: 'Exploring new worlds through pages. Currently reading sci-fi.',
    gridArea: 'col-span-2 row-span-1',
    icon: <BookOpen className="w-6 h-6" />,
    color: 'bg-yellow-500/20 border-yellow-500',
    image: '/assets/hobby-reading.jpg'
  }
];

export const PitStop = () => {
  return (
    <div className="relative p-8 rounded-2xl bg-gradient-to-br from-rose-gold/10 to-deep-purple/20 border border-rose-gold/20">
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[400px]">
        {hobbies.map((hobby, index) => (
          <motion.div
            key={index}
            className={`${hobby.gridArea} glass-panel rounded-xl p-6 relative overflow-hidden group hover:bg-white/10 transition-colors border-l-4 ${hobby.color.split(' ')[1]}`}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
               <img 
                 src={hobby.image} 
                 alt={hobby.title} 
                 className="w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-500 grayscale group-hover:grayscale-0" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0f0c29] via-[#0f0c29]/70 to-transparent" />
            </div>

            {/* Icon */}
            <div className={`absolute top-4 right-4 p-2 rounded-full ${hobby.color.split(' ')[0]} z-10 backdrop-blur-sm`}>
              {hobby.icon}
            </div>
            
            {/* Text Content */}
            <div className="h-full flex flex-col justify-end relative z-10">
              <span className="font-mono text-[10px] text-white/70 mb-1 uppercase tracking-wider">{hobby.type}</span>
              <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-rose-gold transition-colors drop-shadow-md">{hobby.title}</h3>
              <p className="text-sm text-gray-200 font-light drop-shadow-sm">{hobby.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};