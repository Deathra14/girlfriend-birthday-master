import { useState } from 'react';
import Confetti from 'react-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFeather, FaTimes } from 'react-icons/fa';
import MessagePopup from './MessagePopup';

export default function SurpriseButton({ onReveal }) {
  const [isConfettiActive, setIsConfettiActive] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  const handleSurprise = () => {
    setIsConfettiActive(true);
    setShowMessage(true);
    new Audio('/audio/surprise-sound.mp3').play().catch(e => console.log('Audio play failed:', e));
    setTimeout(() => setIsConfettiActive(false), 5000);
  };

  const handleReveal = () => {
    setIsRevealed(true);
    onReveal?.(); // Call the onReveal callback to close the quiz
    handleSurprise();
  };

  return (
    <div className="relative text-center py-12" style={{ zIndex: 1 }}> {/* Lower z-index for base component */}
      {isConfettiActive && (
        <Confetti 
          recycle={false} 
          numberOfPieces={200}
          colors={['#2A4B8C', '#0A1E3F', '#ffd700', '#e4d5b7']}
        />
      )}

      {/* Magical Button */}
      <motion.div className="relative inline-block cursor-pointer">
        {/* Animated background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2A4B8C] via-[#ffd700] to-[#2A4B8C] 
                      opacity-50 blur-xl animate-pulse-slow rounded-xl pointer-events-none"></div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReveal}
          className="relative px-12 py-6 bg-[#0A1E3F] text-[#e4d5b7] rounded-xl
                   border border-[#ffd700]/30 shadow-lg overflow-hidden
                   transform transition-all duration-300 group
                   hover:shadow-[#ffd700]/20 hover:shadow-xl z-20"
        >
          {/* Background shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ffd700]/10 to-transparent
                        translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
          
          {/* Button content */}
          <div className="flex flex-col items-center gap-4">
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="relative w-12 h-12"
            >
              <FaFeather className="text-4xl text-[#ffd700] absolute inset-0 animate-float" />
            </motion.div>
            <div>
              <h3 className="text-2xl font-magical mb-2">Reveal Your Magical Surprise</h3>
              <p className="text-sm text-[#e4d5b7]/80 tracking-wide">Click to unfold your special message</p>
            </div>
          </div>
        </motion.button>
      </motion.div>

      {/* Message Popup */}
      <AnimatePresence>
        {showMessage && (
          <MessagePopup 
            isOpen={showMessage} 
            onClose={() => setShowMessage(false)}
            messages={[
              "Dear Charisma... 💙",
              "My beautiful Ravenclaw... ✨",
              "You're the magic in my life! 🌟",
              "Happy Birthday! 🎂",
              "I love you! 💝"
            ]}
          />
        )}
      </AnimatePresence>
    </div>
  );
}