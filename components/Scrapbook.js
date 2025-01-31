import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';

export default function Scrapbook({ birthDate, name }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Pages array memoized to prevent recreation
  const pages = useMemo(() => [
    {
      title: "The Beginning",
      date: birthDate,
      description: "Where the magic began - A Ravenclaw was born",
      imageUrl: "/images/photo1.jpg",
      decoration: "eagle"
    },
    {
      title: "Growing Up",
      description: "Wit beyond measure is man's greatest treasure",
      imageUrl: "/images/photo2.jpg",
      decoration: "books"
    },
    {
      title: "Beautiful Moments",
      description: "Creating magical memories together",
      imageUrl: "/images/photo3.jpg",
      decoration: "stars"
    }
  ], [birthDate]);

  // Auto-slide effect
  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      setCurrentPage((prev) => 
        prev === pages.length - 1 ? 0 : prev + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [isPaused, pages.length]);

  const handlePageChange = (index) => {
    setCurrentPage(index);
    setIsPaused(true);
    // Resume auto-slide after 10 seconds of inactivity
    setTimeout(() => setIsPaused(false), 10000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8"> {/* Reduced max width */}
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-magical text-center text-[#b7b7b7] mb-12"
      >
        Magical Memories of {name}
      </motion.h2>

      <motion.div 
        className="relative bg-[#192341] p-4 md:p-8 rounded-xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 bg-[url('/pattern.svg')] bg-repeat"></div>

        {/* Page Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="relative z-10"
          >
            <div className="bg-[#0c1425] p-4 md:p-6 rounded-lg">
              {/* Date Stamp */}
              <motion.div 
                className="absolute -top-4 left-6 bg-[#b7b7b7] px-4 py-1.5 rounded-full shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <span className="font-magical text-base md:text-lg text-[#192341]">
                  {pages[currentPage].title}
                </span>
              </motion.div>

              {/* Image Container */}
              <div className="relative mt-4 group aspect-video overflow-hidden rounded-lg">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-[#b7b7b7]/20 via-transparent to-[#b7b7b7]/20"
                  animate={{ x: ['0%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
                <Image 
                  src={pages[currentPage].imageUrl}
                  alt={pages[currentPage].title}
                  fill
                  className="object-cover transform transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority={currentPage === 0}
                />
                
                {/* Decorative Corners */}
                {['tl', 'tr', 'bl', 'br'].map((corner) => (
                  <motion.div
                    key={corner}
                    className={`absolute w-8 md:w-10 h-8 md:h-10 border-2 border-[#b7b7b7]/50
                              ${corner.includes('t') ? 'top-2' : 'bottom-2'}
                              ${corner.includes('l') ? 'left-2' : 'right-2'}
                              rounded-${corner}-lg`}
                    whileHover={{ scale: 1.2, borderColor: '#b7b7b7' }}
                  />
                ))}
              </div>

              {/* Description */}
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[#b7b7b7] mt-6 text-center font-light italic text-lg md:text-xl"
              >
                {pages[currentPage].description}
              </motion.p>
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-between items-center mt-6">
              <motion.button
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
                className="px-6 py-3 bg-[#b7b7b7]/10 text-[#b7b7b7] rounded-lg 
                         hover:bg-[#b7b7b7]/20 disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all duration-300 text-lg"
              >
                ← Previous Memory
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePageChange(Math.min(pages.length - 1, currentPage + 1))}
                disabled={currentPage === pages.length - 1}
                className="px-6 py-3 bg-[#b7b7b7]/10 text-[#b7b7b7] rounded-lg 
                         hover:bg-[#b7b7b7]/20 disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all duration-300 text-lg"
              >
                Next Memory →
              </motion.button>
            </div>

            {/* Page Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {pages.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handlePageChange(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300
                            ${currentPage === index 
                              ? 'bg-[#b7b7b7] w-4' 
                              : 'bg-[#b7b7b7]/30'}`}
                />
              ))}
            </div>

            {/* Progress Bar */}
            {!isPaused && (
              <motion.div 
                className="absolute bottom-0 left-0 h-0.5 bg-[#b7b7b7]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 5, ease: "linear" }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
