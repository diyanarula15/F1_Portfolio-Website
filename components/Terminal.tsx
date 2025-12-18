import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Terminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>(['> SYSTEM.INIT...', '> USER: GUEST_RECRUITER', '> TYPE "help" FOR COMMANDS']);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, `> ${input}`];

    switch (cmd) {
      case 'help':
        newHistory.push('AVAILABLE COMMANDS:', '  whoami  - Driver profile', '  contact - Direct line', '  resume  - Download data', '  clear   - Reset HUD');
        break;
      case 'whoami':
        newHistory.push(
          'NAME: DIYA NARULA',
          'ROLE: CS & DESIGN STUDENT @ IIIT DELHI',
          'STATUS: SEEKING INTERNSHIPS/OPPORTUNITIES',
          'BIO: ENGINEERING SPEED, DESIGNING EXPERIENCES.'
        );
        break;
      case 'contact':
        newHistory.push('INITIATING COMM LINK...', 'EMAIL: naruladiya15@gmail.com', 'PHONE: +91-8287347923', 'STATUS: CONNECTED');
        break;
      case 'resume':
        newHistory.push('DOWNLOADING ASSET: resume_v2.pdf...', '[SUCCESS] FILE TRANSFERRED.');
        break;
      case 'clear':
        setHistory(['> CONSOLE CLEARED']);
        setInput('');
        return; 
      case 'sudo':
        newHistory.push('PERMISSION DENIED. ADMIN ACCESS REQUIRED.');
        break;
      default:
        newHistory.push(`ERR: UNKNOWN COMMAND "${cmd}".`);
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-black/80 text-neon-pink p-3 rounded-full border border-neon-pink/50 shadow-[0_0_15px_rgba(255,0,204,0.3)] hover:bg-neon-pink hover:text-black transition-colors"
      >
        <TerminalIcon className="w-6 h-6" />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-20 right-6 w-80 md:w-96 h-96 bg-[#0f0c29]/95 backdrop-blur-xl border border-white/20 rounded-lg shadow-2xl z-50 flex flex-col overflow-hidden font-mono text-sm"
          >
            {/* Header */}
            <div className="bg-white/10 p-2 flex justify-between items-center border-b border-white/10">
              <span className="text-xs text-gray-400 ml-2">RECRUITER_TERMINAL</span>
              <div className="flex gap-2">
                <button onClick={() => setIsOpen(false)} className="hover:text-white text-gray-400"><Minus className="w-4 h-4" /></button>
                <button onClick={() => setIsOpen(false)} className="hover:text-red-500 text-gray-400"><X className="w-4 h-4" /></button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-1 text-green-400 scrollbar-hide">
              {history.map((line, i) => (
                <div key={i} className="whitespace-pre-wrap">{line}</div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleCommand} className="p-2 bg-black/50 border-t border-white/10 flex items-center gap-2">
              <span className="text-neon-pink">{'>'}</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="bg-transparent border-none outline-none text-white w-full font-mono placeholder-gray-600"
                placeholder="Type 'help'..."
                autoComplete="off"
                autoFocus
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};