import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useState, useEffect } from 'react';

export default function BirthdayCard({ isVisible, onComplete }) {
  const [timeLeft, setTimeLeft] = useState(8); // 8 seconds to read
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const colors = ['#4B6CB7', '#CD7F32', '#FFD700'];

      const frame = () => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return;

        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors: colors
        });

        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors: colors
        });

        requestAnimationFrame(frame);
      };

      frame();

      // Countdown timer
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1 && hasInteracted) {
            clearInterval(timer);
            onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isVisible, hasInteracted, onComplete]);

  const handleContinue = () => {
    setHasInteracted(true);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999]">
          {/* ...existing backdrop code... */}

          {/* Card Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="relative w-[90%] max-w-lg bg-[#192341] rounded-2xl p-8 text-center
                      border border-[#4B6CB7]/30 shadow-[0_0_50px_rgba(75,108,183,0.2)]"
          >
            {/* Timer Bar */}
            <motion.div 
              className="absolute top-0 left-0 h-1 bg-[#4B6CB7]"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 8, ease: "linear" }}
            />

            {/* Card Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-4xl sm:text-5xl font-magical text-[#CD7F32] mb-6">
                Dear Charisma
              </h2>

              <div className="space-y-4 text-[#e4d5b7]">
                <p className="text-lg sm:text-xl font-magical leading-relaxed">
                  As you blow out these magical candles,<br/>
                  may your wishes take flight and your dreams soar high.
                </p>
                <p className="text-base sm:text-lg leading-relaxed">
                  On this special day, let your Ravenclaw wisdom<br/>
                  guide you to another year of magical adventures.
                </p>
              </div>

              <div className="pt-6">
                <motion.p 
                  className="text-[#CD7F32] font-magical text-xl"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  With Love 💝
                </motion.p>
              </div>

              {/* Continue Button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                onClick={handleContinue}
                className="mt-8 px-8 py-3 bg-[#2A4B8C] text-[#e4d5b7] rounded-lg
                         hover:bg-[#3A5B9C] transition-all duration-300
                         border border-[#4B6CB7]/50 group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Continue to Celebration
                  <span className="text-sm opacity-70">
                    ({timeLeft}s)
                  </span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#4B6CB7] to-[#2A4B8C]
                              opacity-0 group-hover:opacity-20 transition-opacity rounded-lg" />
              </motion.button>
            </motion.div>

            {/* Floating Decorations */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                animate={{
                  y: [-20, 20],
                  opacity: [0.3, 0.7],
                }}
                transition={{
                  duration: 2 + i,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${10 + i * 20}%`,
                }}
              >
                {i % 2 === 0 ? '✨' : '🌟'}
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
