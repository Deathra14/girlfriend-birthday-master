import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AudioManager from './AudioManager';

// Add these loading animations
const loadingVariants = {
  animate: {
    background: [
      "linear-gradient(135deg, #192341, #1A1147)",
      "linear-gradient(135deg, #1A1147, #4B6CB7)",
      "linear-gradient(135deg, #4B6CB7, #192341)"
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
};

const candleVariants = {
  animate: {
    scale: [1, 1.1, 1],
    filter: [
      "drop-shadow(0 0 20px #ffd700)",
      "drop-shadow(0 0 40px #ffd700)",
      "drop-shadow(0 0 20px #ffd700)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
};

export default function BirthdayCandle({ onComplete }) {
  const [loading, setLoading] = useState(true);
  const [isAudioReady, setIsAudioReady] = useState(false);

  // Initialize audio as soon as component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAudioReady(true);
    }, 500);

    // Loader timeout: e.g. 3 seconds before showing full UI
    const loaderTimer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(loaderTimer);
    };
  }, []);

  // Wrap handleEndBirthdayScreen with useCallback to stabilize its reference
  const handleEndBirthdayScreen = useCallback(() => {
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    // Auto-navigate after 10 seconds if no interaction
    const autoNavigateTimer = setTimeout(() => {
      handleEndBirthdayScreen();
    }, 10000);

    return () => {
      clearTimeout(autoNavigateTimer);
    };
  }, [handleEndBirthdayScreen]);

  const handleSkip = () => {
    onComplete?.();
  };

  if (loading) {
    return (
      <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex flex-col items-center justify-center z-50"
        >
          {/* Animated gradient background */}
          <motion.div 
            className="absolute inset-0 -z-10"
            variants={loadingVariants}
            animate="animate"
          />

          {/* Magical particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-300/30 rounded-full"
                animate={{
                  y: [0, -200],
                  x: [-20, 20],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeOut"
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  bottom: "-10px"
                }}
              />
            ))}
          </div>

          {/* Enhanced loading content */}
          <div className="relative px-6 text-center">
            <motion.div
              variants={candleVariants}
              animate="animate"
              className="text-8xl sm:text-9xl mb-6 sm:mb-8"
            >
              🕯️
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-magical bg-gradient-to-r from-[#4B6CB7] to-[#ffd700] text-transparent bg-clip-text">
                Preparing Your Magical Celebration
              </h1>
              
              {/* Loading indicator */}
              <div className="flex justify-center gap-2">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-[#4B6CB7] rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}
              </div>

              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-sm sm:text-base text-blue-200/80 font-magical"
              >
                Enchanting moments await...
              </motion.p>
            </motion.div>
          </div>

          {/* Decorative bottom border */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-1"
            animate={{
              background: [
                "linear-gradient(90deg, transparent, #4B6CB7, transparent)",
                "linear-gradient(90deg, transparent, #ffd700, transparent)",
                "linear-gradient(90deg, transparent, #4B6CB7, transparent)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 bg-gradient-to-b from-[#0A1E3F] to-[#1A1147] flex items-center justify-center z-50 p-4 sm:p-0"
      >
        {/* Audio manager with proper mounting */}
        {isAudioReady && (
          <AudioManager 
            audioUrl="/audio/happybirthday.mp3" 
            autoPlay={true}
            volume={0.4}
          />
        )}
        <motion.div className="w-full max-w-lg mx-auto">
          {/* Top "Birthday Over" message */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h1 className="text-4xl font-magical text-[#4B6CB7]">
              Birthday Already Over
            </h1>
            <p className="text-[#e4d5b7] font-magical text-lg mt-2">
              The magic lingers, though the day has passed!
            </p>
          </motion.div>

          {/* Keep the main UI elements so your page remains accessible */}
          <motion.div className="w-full max-w-lg mx-auto">
            {/* Enhanced Ravenclaw Banner */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-center mb-8 sm:mb-12"
            >
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-magical text-[#4B6CB7] mb-4
                           drop-shadow-[0_0_10px_rgba(75,108,183,0.3)]
                           bg-clip-text bg-gradient-to-r from-[#4B6CB7] to-[#2A4B8C]">
                Happy Birthday!
              </h1>
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-xl sm:text-2xl text-[#CD7F32] font-magical italic"
              >
                A Magical Celebration
              </motion.div>
            </motion.div>

            {/* Add instruction message before the cake */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center mb-8"
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="bg-[#2A4B8C]/30 rounded-lg p-4 backdrop-blur-sm
                         border border-[#4B6CB7]/20 inline-block"
              >
                <p className="text-[#e4d5b7] font-magical text-lg sm:text-xl">
                  Looks like the birthday has passed, but the magic remains!
                </p>
              </motion.div>
            </motion.div>

            {/* Enhanced Cake Container */}
            <div className="relative mb-8 sm:mb-12 px-4">
              <div className="aspect-[4/3] relative">
                {/* Main cake with improved design */}
                <div className="h-full rounded-2xl relative overflow-hidden">
                  {/* Bottom tier */}
                  <div className="absolute bottom-0 left-0 right-0 h-2/3
                               bg-gradient-to-b from-[#0A1E3F] to-[#2A4B8C]
                               shadow-[0_0_30px_rgba(42,75,140,0.2)]">
                    {/* Decorative stripes */}
                    <div className="absolute inset-0 flex justify-between">
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ opacity: [0.3, 0.6, 0.3] }}
                          transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                          className="w-px h-full bg-[#CD7F32]/20"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Middle tier */}
                  <div className="absolute bottom-[30%] left-[10%] right-[10%] h-1/3
                               bg-gradient-to-b from-[#1A2F55] to-[#2A4B8C]
                               rounded-lg shadow-lg">
                    {/* Bronze trim */}
                    <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#CD7F32]/30" />
                  </div>

                  {/* Top tier with frosting */}
                  <div className="absolute bottom-[45%] left-[20%] right-[20%] h-1/4
                               bg-gradient-to-b from-[#2A4B8C] to-[#4B6CB7]
                               rounded-lg shadow-lg">
                    {/* Decorative swirls */}
                    <div className="absolute -top-2 left-0 right-0 flex justify-around">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, 0]
                          }}
                          transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
                          className="w-6 h-6 rounded-full bg-[#4B6CB7]/50"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Frosting details */}
                  {/* ...existing frosting code... */}
                </div>
              </div>
            </div>

            {/* Enhanced message section */}
            <motion.div className="text-center space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-magical text-[#4B6CB7]">
                Charisma Husniati
              </h2>
              <p className="text-lg sm:text-xl text-[#e4d5b7] font-magical">
                Make a wish, dear Ravenclaw! 🦅
              </p>
            </motion.div>

            {/* Existing continue button */}
            <motion.button 
              onClick={handleEndBirthdayScreen}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }} 
              className="mt-8 bg-gradient-to-r from-purple-600 to-pink-500 text-white
                       font-magical py-3 px-8 rounded-full shadow-lg
                       hover:shadow-[0_0_30px_rgba(219,112,147,0.5)]
                       transition-all duration-300"
            >
              Continue to Main Page
            </motion.button>
          </motion.div>
        </motion.div>
        {/* Static Floating Skip Button */}
        <motion.button 
          onClick={handleSkip}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed md:bottom-8 md:right-8 bottom-4 right-4 z-50 
                     group flex items-center gap-2 md:gap-3
                     bg-gradient-to-r from-[#4B6CB7] via-[#2A4B8C] to-[#192341]
                     text-white font-magical
                     md:py-4 md:px-8 py-3 px-6
                     rounded-full shadow-[0_0_20px_rgba(75,108,183,0.3)]
                     hover:shadow-[0_0_30px_rgba(75,108,183,0.5)]
                     transition-all duration-300 ease-out
                     backdrop-blur-sm bg-opacity-90
                     border border-white/10"
        >
          <div className="flex flex-col items-start">
            <span className="text-xs md:text-sm text-blue-200/80">Ready to explore?</span>
            <span className="relative text-sm md:text-base font-semibold">
              Skip to Main Page
              <motion.div 
                className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r 
                           from-pink-400 to-purple-400 w-0 group-hover:w-full 
                           transition-all duration-300"
              />
            </span>
          </div>
          <motion.div
            animate={{ 
              x: [0, 5, 0],
              opacity: [0.5, 1, 0.5] 
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="bg-white/20 rounded-full p-2"
          >
            <span className="text-lg md:text-xl">→</span>
          </motion.div>
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}