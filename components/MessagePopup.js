import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

export default function MessagePopup({ isOpen = false, onClose = () => {}, messages = [] }) {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !messages?.length || !isOpen || isAnimating || isClosing) return;

    try {
      const timer = setInterval(() => {
        setCurrentMessage((prev) => {
          if (prev + 1 >= messages.length) {
            setIsAnimating(true);
            clearInterval(timer);
            return prev;
          }
          return prev + 1;
        });
      }, 3000);

      return () => clearInterval(timer);
    } catch (error) {
      console.error('Error in message timer:', error);
    }
  }, [mounted, isOpen, isAnimating, isClosing, messages]);

  // Don't render until mounted
  if (!mounted) return null;
  if (!messages?.length) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setCurrentMessage(0);
      setIsAnimating(false);
      setIsClosing(false);
      onClose();
    }, 300);
  };

  const variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.95 }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-[9999]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            className="relative w-[90%] max-w-lg max-h-[85vh] overflow-auto bg-[#192341] 
                      rounded-xl shadow-2xl border border-[#ffd700]/20"
            style={{
              boxShadow: '0 0 50px rgba(255,215,0,0.1)',
            }}
          >
            {/* Progress bar */}
            <div className="sticky top-0 h-1 bg-[#ffd700]/20">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: `${((currentMessage + 1) / messages.length) * 100}%` }}
                className="h-full bg-[#ffd700]"
                style={{
                  backgroundImage: 'linear-gradient(45deg, rgba(255,215,0,0.5) 25%, transparent 25%, transparent 50%, rgba(255,215,0,0.5) 50%, rgba(255,215,0,0.5) 75%, transparent 75%, transparent)',
                  backgroundSize: '20px 20px',
                  animation: 'progress-animation 1s linear infinite'
                }}
              />
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8">
              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center 
                         bg-[#0A1E3F] rounded-full border border-[#ffd700]/30
                         text-[#e4d5b7] hover:text-[#ffd700] transition-all"
              >
                <FaTimes size={14} />
              </motion.button>

              {/* Message */}
              <div className="mt-4 min-h-[200px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentMessage}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={variants}
                    className="text-center"
                  >
                    <p className="font-magical text-xl sm:text-2xl text-[#e4d5b7] leading-relaxed">
                      {messages[currentMessage]}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className="mt-8 space-y-4">
                <div className="flex justify-center gap-2">
                  {messages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentMessage(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 
                                ${index === currentMessage ? 'bg-[#ffd700] w-4' : 'bg-[#2A4B8C]/50'}`}
                    />
                  ))}
                </div>

                <div className="flex justify-between">
                  <motion.button
                    whileHover={{ x: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setCurrentMessage(Math.max(0, currentMessage - 1))}
                    className={`px-4 py-2 rounded-lg text-sm ${
                      currentMessage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#2A4B8C]/20'
                    }`}
                    disabled={currentMessage === 0}
                  >
                    Previous
                  </motion.button>

                  <motion.button
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setCurrentMessage(Math.min(messages.length - 1, currentMessage + 1))}
                    className={`px-4 py-2 rounded-lg text-sm ${
                      currentMessage === messages.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#2A4B8C]/20'
                    }`}
                    disabled={currentMessage === messages.length - 1}
                  >
                    Next
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
