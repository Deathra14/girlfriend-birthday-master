import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMusic, FaTimes } from 'react-icons/fa';

// components/MusicPlayer.js
export default function MusicPlayer() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative">
      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-12 h-12 rounded-full bg-[#192341] border border-[#ffd700]/30
                 flex items-center justify-center text-[#ffd700] shadow-lg
                 hover:border-[#ffd700]/50 transition-all"
      >
        {isExpanded ? <FaTimes /> : <FaMusic />}
      </motion.button>

      {/* Expandable Player */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="absolute bottom-16 right-0 w-[300px] bg-[#192341] rounded-lg 
                     border border-[#ffd700]/20 shadow-2xl overflow-hidden"
          >
            <div className="p-4 border-b border-[#ffd700]/10">
              <h3 className="font-magical text-[#ffd700] text-lg text-center">
                Magical Melodies
              </h3>
            </div>
            
            <iframe 
              src="https://open.spotify.com/embed/track/6NFyWDv5CjfwuzoCkw47Xf?utm_source=generator&theme=0"
              width="100%" 
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-b-lg"
            ></iframe>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}