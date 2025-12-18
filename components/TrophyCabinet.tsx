import React from 'react';
import Tilt from 'react-parallax-tilt';
import { Award, Star, Trophy, Medal } from 'lucide-react';
import { Achievement } from '../types';

const achievements: Achievement[] = [
  {
    id: 1,
    title: 'Goldman Sachs',
    event: 'Engineering Campus Hiring',
    level: 'gold',
    description: 'Ranked 1st in CS Domain out of 9000+ applicants. Demonstrated exceptional problem solving.',
    date: '2025'
  },
  {
    id: 2,
    title: 'Myntra Hackerramp',
    event: 'WeForShe Hackathon',
    level: 'silver',
    description: 'Runner Up among 56k+ participants. Built AI-driven fashion tech solution.',
    date: '2025'
  },
  {
    id: 3,
    title: 'Flipkart GRID 7.0',
    event: 'Robotics Challenge',
    level: 'bronze',
    description: 'National Semi-Finalist. Top 1000 out of 1.46 Lakh participants.',
    date: '2025'
  },
  {
    id: 4,
    title: 'IIWCPC Prelims',
    event: 'Competitive Programming',
    level: 'gold',
    description: 'Ranked 1st. Solved complex algorithmic challenges under time pressure.',
    date: '2025'
  }
];

const borderColor = {
  gold: 'border-[#ffd700] shadow-[0_0_15px_rgba(255,215,0,0.1)]',
  silver: 'border-[#c0c0c0] shadow-[0_0_15px_rgba(192,192,192,0.1)]',
  bronze: 'border-[#cd7f32] shadow-[0_0_15px_rgba(205,127,50,0.1)]'
};

const iconColor = {
  gold: 'text-[#ffd700]',
  silver: 'text-[#c0c0c0]',
  bronze: 'text-[#cd7f32]'
};

export const TrophyCabinet = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {achievements.map((item) => (
        <Tilt 
          key={item.id} 
          tiltMaxAngleX={10} 
          tiltMaxAngleY={10} 
          scale={1.05} 
          className="preserve-3d"
        >
          <div className={`glass-panel p-6 rounded-xl relative overflow-hidden group border-t-4 ${borderColor[item.level]} h-full flex flex-col justify-between min-h-[280px]`}>
            {/* Background Sheen */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div>
              <div className={`mb-4 ${iconColor[item.level]} drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] flex justify-between items-start`}>
                {item.level === 'gold' && <Trophy className="w-8 h-8" />}
                {item.level === 'silver' && <Award className="w-8 h-8" />}
                {item.level === 'bronze' && <Medal className="w-8 h-8" />}
                <span className="font-mono text-[10px] text-white/30 border border-white/10 px-1 rounded">
                    #0{item.id}
                </span>
              </div>
              
              <h3 className="font-display text-lg font-bold mb-1 leading-tight">{item.title}</h3>
              <p className="font-mono text-xs text-rose-gold mb-3 uppercase tracking-wider">{item.event}</p>
              <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
            </div>

            <div className="mt-6 flex justify-between items-end border-t border-white/10 pt-4">
              <span className="font-mono text-xs text-silver">{item.date}</span>
              <span className={`font-mono text-[10px] px-2 py-1 rounded border bg-white/5 ${item.level === 'gold' ? 'border-[#ffd700] text-[#ffd700]' : item.level === 'silver' ? 'border-[#c0c0c0] text-[#c0c0c0]' : 'border-[#cd7f32] text-[#cd7f32]'}`}>
                {item.level.toUpperCase()}
              </span>
            </div>
          </div>
        </Tilt>
      ))}
    </div>
  );
};