import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { FaGift, FaTimes } from 'react-icons/fa';
import Image from 'next/image';

export default function FlyingGift() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isGiftCaught, setIsGiftCaught] = useState(false);
  const [showGiftReveal, setShowGiftReveal] = useState(false);
  const [showNotification, setShowNotification] = useState(true);

  const getRandomPosition = useCallback(() => {
    const padding = 100; // Keep gift away from edges
    return {
      x: Math.random() * (window.innerWidth - 2 * padding) + padding,
      y: Math.random() * (window.innerHeight - 2 * padding) + padding,
    };
  }, []);

  useEffect(() => {
    if (isGiftCaught) return;

    // Update position every 3 seconds
    const interval = setInterval(() => {
      setPosition(getRandomPosition());
      // Show notification briefly
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
    }, 3000);

    return () => clearInterval(interval);
  }, [isGiftCaught, getRandomPosition]);

  const handleGiftClick = () => {
    setIsGiftCaught(true);
    setShowGiftReveal(true);
    setShowNotification(false);
  };

  return (
    <>
      {/* Enhanced Mobile-Friendly Notification */}
      <AnimatePresence>
        {showNotification && !isGiftCaught && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="fixed left-4 right-4 md:left-auto md:right-4 top-24 md:top-20 
                     md:w-auto z-[60] mx-auto md:mx-0
                     max-w-[320px] md:min-w-[280px]"
          >
            <motion.div
              className="bg-gradient-to-r from-[#192341] to-[#1a1147]
                       border border-pink-400/30 rounded-2xl
                       shadow-lg backdrop-blur-md
                       p-4 relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {/* Sparkle Effects */}
              <div className="absolute inset-0">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-pink-400/50 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${20 + i * 20}%`,
                    }}
                  />
                ))}
              </div>

              {/* Content */}
              <div className="flex items-center justify-center gap-3">
                <motion.div
                  animate={{ 
                    rotate: [0, -10, 10, 0],
                    scale: [1, 1.1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="relative"
                >
                  <span className="text-2xl filter drop-shadow-[0_0_8px_rgba(255,192,203,0.5)]">
                    🎁
                  </span>
                  <motion.div
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute -inset-2 bg-pink-400/20 rounded-full blur-xl"
                  />
                </motion.div>
                
                <div className="flex-1">
                  <p className="text-pink-400 font-magical text-base md:text-lg
                             leading-snug tracking-wide text-center md:text-left">
                    Catch your magical birthday gift! 
                    <span className="inline-block ml-1 animate-bounce">✨</span>
                  </p>
                </div>
              </div>

              {/* Decorative bottom border */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[2px]"
                style={{
                  background: 'linear-gradient(90deg, transparent, #FDA4AF, transparent)'
                }}
                animate={{
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flying Gift */}
      <AnimatePresence>
        {!isGiftCaught && (
          <motion.div
            initial={position}
            animate={{
              x: position.x,
              y: position.y,
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
              rotate: {
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              },
              scale: {
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="fixed z-50 cursor-pointer"
            onClick={handleGiftClick}
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="relative"
            >
              <FaGift className="text-4xl text-pink-400" />
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(255,192,203,0.5)",
                    "0 0 10px rgba(255,192,203,0.2)",
                    "0 0 20px rgba(255,192,203,0.5)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Gift Reveal Modal */}
      <AnimatePresence>
        {showGiftReveal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
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
              className="relative max-w-md w-full bg-gradient-to-br from-[#192341] to-[#151C3B] 
                       rounded-2xl overflow-hidden border border-pink-400/20 shadow-[0_0_50px_rgba(219,112,147,0.1)]"
            >
              {/* Top decorative pattern */}
              <div className="absolute top-0 inset-x-0 h-32 opacity-10"
                   style={{
                     backgroundImage: 'radial-gradient(circle at center, #FFB6C1 1px, transparent 1px)',
                     backgroundSize: '20px 20px'
                   }}
              />

              <div className="relative p-6 sm:p-8">
                {/* Close button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowGiftReveal(false)}
                  className="absolute top-4 right-4 text-pink-400/70 hover:text-pink-400 z-10"
                >
                  <FaTimes size={20} />
                </motion.button>

                {/* Header */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-center mb-6"
                >
                  <h3 className="text-3xl font-magical bg-gradient-to-r from-pink-400 to-[#ffd700] 
                               text-transparent bg-clip-text">
                    Your Magical Gift 🎁
                  </h3>
                </motion.div>

                {/* Gift Image Container */}
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
                  {/* Magical overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#192341] via-transparent to-transparent" />
                </motion.div>

                {/* Message */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-6 text-center space-y-4"
                >
                  <p className="text-[#e4d5b7] font-magical text-lg leading-relaxed">
                    My dearest Charisma,
                  </p>
                  <p className="text-pink-300/90 font-light">
                    Your special gift is being crafted with love and magic. ✨
                    Just like how Ravenclaw values patience and wisdom, 
                    I promise it will be worth the wait. 💝
                  </p>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-[#ffd700] font-magical text-sm mt-4"
                  >
                    ~ With endless love and magical moments ~
                  </motion.div>
                </motion.div>
              </div>

              {/* Bottom decorative border */}
              <div className="absolute bottom-0 left-0 right-0 h-1 
                           bg-gradient-to-r from-transparent via-pink-400/30 to-transparent" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
