import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';

export default function Scrapbook({ birthDate, name }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Enhanced pages array with more photos
  const pages = useMemo(() => [
    {
      title: "The Beginning",
      date: birthDate,
      description: "Where the magic began - A Ravenclaw was born ✨",
      imageUrl: "/images/photo1.jpg",
      animation: "fade-right"
    },
    {
      title: "Precious Moments",
      description: "Every smile, every laugh, a treasure to behold",
      imageUrl: "/images/photo2.jpg",
      animation: "fade-up"
    },
    {
      title: "Growing Beauty",
      description: "Like a flower blooming in the spring",
      imageUrl: "/images/photo3.jpg",
      animation: "fade-left"
    },
    {
      title: "Magical Journey",
      description: "Each day brings new wonders with you",
      imageUrl: "/images/photo4.jpg",
      animation: "fade-down"
    },
    {
      title: "Enchanting Grace",
      description: "Your presence lights up every room",
      imageUrl: "/images/photo5.jpg",
      animation: "fade-right"
    },
    {
      title: "Ravenclaw's Pride",
      description: "Intelligence and beauty combined",
      imageUrl: "/images/photo6.jpg",
      animation: "fade-up"
    },
    {
      title: "Wonderful You",
      description: "A heart of gold, a mind so bright",
      imageUrl: "/images/photo7.jpg",
      animation: "fade-left"
    },
    {
      title: "Forever Special",
      description: "Here's to many more magical years",
      imageUrl: "/images/photo8.jpg",
      animation: "fade-up"
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
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Enhanced title with magical effects */}
      <motion.div className="text-center mb-12 relative">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-magical text-center 
                     bg-gradient-to-r from-[#b7b7b7] via-[#ffd700] to-[#b7b7b7]
                     text-transparent bg-clip-text"
        >
          Magical Memories of {name}
        </motion.h2>
        {/* Decorative elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-32 opacity-10
                     border-2 border-[#ffd700] rounded-full"
        />
      </motion.div>

      {/* Enhanced scrapbook container */}
      <motion.div 
        className="relative bg-[#192341] p-4 md:p-8 rounded-xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Enhanced background pattern */}
        <div className="absolute inset-0 opacity-5"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='%23b7b7b7' fill-opacity='0.4'/%3E%3C/svg%3E")`,
               backgroundSize: '30px 30px'
             }}
        />

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
            {/* Enhanced page content */}
            <div className="bg-[#0c1425] p-4 md:p-6 rounded-lg">
              {/* Enhanced date stamp */}
              <motion.div 
                className="absolute -top-4 left-6 bg-gradient-to-r from-[#b7b7b7] to-[#ffd700]
                          px-6 py-2 rounded-full shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <span className="font-magical text-base md:text-lg text-[#192341]">
                  {pages[currentPage].title}
                </span>
              </motion.div>

              {/* Enhanced image container */}
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

              {/* Enhanced description */}
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[#b7b7b7] mt-6 text-center font-magical 
                         text-lg md:text-xl leading-relaxed"
              >
                {pages[currentPage].description}
              </motion.p>

              {/* Page number indicator */}
              <div className="absolute bottom-2 right-4 text-[#b7b7b7]/50 font-magical text-sm">
                {currentPage + 1} / {pages.length}
              </div>
            </div>

            {/* Enhanced navigation controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
                className={`w-full sm:w-auto px-6 py-3 rounded-lg transition-all duration-300
                         flex items-center justify-center gap-2 group
                         ${currentPage === 0 
                           ? 'opacity-50 cursor-not-allowed bg-[#b7b7b7]/5' 
                           : 'bg-[#b7b7b7]/10 hover:bg-[#b7b7b7]/20'}`}
              >
                <motion.span
                  animate={{ x: currentPage === 0 ? 0 : [-5, 0, -5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-[#b7b7b7]"
                >
                  ←
                </motion.span>
                <span className="text-[#b7b7b7] font-magical">Previous Memory</span>
              </motion.button>

              {/* Mobile-friendly page indicator */}
              <div className="order-first sm:order-none w-full sm:w-auto flex justify-center items-center gap-2">
                {pages.map((_, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handlePageChange(index)}
                    className={`relative h-2 transition-all duration-300
                              ${currentPage === index ? 'w-6' : 'w-2'}`}
                  >
                    <span className={`absolute inset-0 rounded-full
                                  ${currentPage === index 
                                    ? 'bg-gradient-to-r from-[#b7b7b7] to-[#d4d4d4]' 
                                    : 'bg-[#b7b7b7]/30'}`} 
                    />
                  </motion.button>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePageChange(Math.min(pages.length - 1, currentPage + 1))}
                disabled={currentPage === pages.length - 1}
                className={`w-full sm:w-auto px-6 py-3 rounded-lg transition-all duration-300
                         flex items-center justify-center gap-2 group
                         ${currentPage === pages.length - 1 
                           ? 'opacity-50 cursor-not-allowed bg-[#b7b7b7]/5' 
                           : 'bg-[#b7b7b7]/10 hover:bg-[#b7b7b7]/20'}`}
              >
                <span className="text-[#b7b7b7] font-magical">Next Memory</span>
                <motion.span
                  animate={{ x: currentPage === pages.length - 1 ? 0 : [5, 0, 5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-[#b7b7b7]"
                >
                  →
                </motion.span>
              </motion.button>
            </div>

            {/* Enhanced progress bar */}
            {!isPaused && (
              <motion.div 
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r 
                         from-[#b7b7b7]/30 via-[#ffd700] to-[#b7b7b7]/30"
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
