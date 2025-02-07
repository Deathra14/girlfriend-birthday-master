import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AudioManager from './AudioManager';

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
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }} // Removed rotate animation
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#0A1E3F] to-[#1A1147] z-50 p-4 sm:p-0"
        >
          {/* Static loading icon */}
          <div className="text-6xl sm:text-8xl mb-4">🕯️</div>
          <div className="text-xl text-[#e4d5b7] font-magical">
            Preparing your magical celebration...
          </div>
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
            <button 
              onClick={handleEndBirthdayScreen} 
              className="text-[#4B6CB7] bg-[#e4d5b7] px-4 py-2 rounded-lg"
            >
              Continue to Main Page
            </button>
          </motion.div>
        </motion.div>
        {/* Static Floating Skip Button */}
        <button 
          onClick={handleSkip}
          className="fixed bottom-5 right-5 z-50 inline-flex items-center justify-center 
                     bg-white text-[#4B6CB7] font-bold py-2 px-4 rounded-full shadow-md 
                     border border-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 
                     focus:ring-offset-2 focus:ring-[#4B6CB7] transition"
        >
          Skip to Main Page
        </button>
      </motion.div>
    </AnimatePresence>
  );
}