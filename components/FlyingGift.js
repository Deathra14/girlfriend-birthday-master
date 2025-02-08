import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Image from 'next/image';

export default function FlyingGift() {
  const [showGiftReveal, setShowGiftReveal] = useState(true);
  const [isDelivered] = useState(true); // Add this near other state declarations

  return (
    <>
      {/* Enhanced Gift Reveal Modal */}
      <AnimatePresence>
        {showGiftReveal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
          >
            {/* Backdrop with magical particles */}
            <motion.div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowGiftReveal(false)}
            >
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-pink-400/50 rounded-full"
                  animate={{
                    y: [-10, -30],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </motion.div>

            {/* Gift Card Content */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-[95%] sm:w-full max-w-md mx-auto bg-gradient-to-br from-[#192341] to-[#151C3B] 
                       rounded-2xl overflow-hidden border border-pink-400/20 shadow-[0_0_50px_rgba(219,112,147,0.1)]"
            >
              {/* Delivered Status Banner */}
              {isDelivered && (
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="absolute top-2 sm:top-4 left-0 bg-gradient-to-r from-green-400/90 to-green-500/90 
                             py-1 px-3 sm:px-4 rounded-r-full shadow-lg z-20"
                >
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"
                    />
                    <span className="text-white text-xs sm:text-sm font-magical">Gift Delivered!</span>
                  </div>
                </motion.div>
              )}

              {/* Top decorative pattern */}
              <div className="absolute top-0 inset-x-0 h-32 opacity-10"
                   style={{
                     backgroundImage: 'radial-gradient(circle at center, #FFB6C1 1px, transparent 1px)',
                     backgroundSize: '20px 20px'
                   }}
              />

              <div className="relative p-4 sm:p-6 md:p-8">
                {/* Close button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowGiftReveal(false)}
                  className="absolute top-2 right-2 sm:top-4 sm:right-4 text-pink-400/70 hover:text-pink-400 z-10 
                           p-2 sm:p-1" // Added padding for better touch target
                >
                  <FaTimes size={20} />
                </motion.button>

                {/* Header */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-center mb-4 sm:mb-6"
                >
                  <h3 className="text-2xl sm:text-3xl font-magical bg-gradient-to-r from-pink-400 to-[#ffd700] 
                               text-transparent bg-clip-text">
                    Your Magical Gift 🎁
                  </h3>
                </motion.div>

                {/* Updated Gift Image Container */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="relative aspect-[4/3] rounded-lg overflow-hidden 
                           border border-pink-400/20 shadow-lg"
                >
                  <Image
                    src="/images/photogift.jpg"
                    alt="Special Gift for You"
                    fill
                    className="object-cover transform transition-transform duration-700 hover:scale-110"
                  />
                  {isDelivered && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="bg-black/40 backdrop-blur-sm w-full h-full absolute" />
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", bounce: 0.5 }}
                        className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 z-10"
                      >
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="text-4xl mb-2"
                        >
                          🎉
                        </motion.div>
                        <p className="text-white font-magical text-center">Unwrapped & Loved!</p>
                      </motion.div>
                    </motion.div>
                  )}
                </motion.div>

                {/* Updated Message Section */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-4 sm:mt-6 text-center space-y-3 sm:space-y-4"
                >
                  <p className="text-[#e4d5b7] font-magical text-base sm:text-lg leading-relaxed">
                    My dearest Charisma,
                  </p>
                  {isDelivered ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="space-y-3"
                    >
                      <p className="text-pink-300/90 font-light text-sm sm:text-base px-2 sm:px-0">
                        Your special gift has been delivered and unwrapped! 🎁✨
                        I hope it brought as much joy to your heart as you bring to mine.
                        Thank you for making every moment magical. 💝
                      </p>
                      <motion.div
                        animate={{ 
                          y: [0, -5, 0],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                        className="mt-4 sm:mt-6 inline-block bg-gradient-to-r from-pink-400/20 to-purple-400/20 
                                   rounded-lg p-2 sm:p-3 backdrop-blur-sm w-full sm:w-auto"
                      >
                        <span className="text-pink-300 text-sm sm:text-base">Gift Status:</span>
                        <span className="text-green-400 ml-2 text-sm sm:text-base">Successfully Delivered! 🌟</span>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <p className="text-pink-300/90 font-light">
                      Your special gift is being crafted with love and magic. ✨
                      Just like how Ravenclaw values patience and wisdom, 
                      I promise it will be worth the wait. 💝
                    </p>
                  )}
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-[#ffd700] font-magical text-sm mt-4"
                  >
                    ~ With endless love and magical moments ~
                  </motion.div>
                </motion.div>
              </div>

              {/* Celebration Effects */}
              {isDelivered && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-[#ffd700]"
                      animate={{
                        y: [0, -60],
                        x: [-20, 20],
                        opacity: [1, 0],
                        scale: [0, 1.5]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.1,
                        ease: "easeOut"
                      }}
                      style={{
                        left: `${Math.random() * 100}%`,
                        bottom: "0"
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Bottom decorative border */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 
                           bg-gradient-to-r from-transparent via-pink-400/30 to-transparent" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
