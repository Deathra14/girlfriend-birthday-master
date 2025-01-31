import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Scrapbook({ birthDate, name }) {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
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
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl font-magical text-center text-[#b7b7b7] mb-12">
        Magical Memories of {name}
      </h2>

      <motion.div 
        className="relative bg-[#192341] p-8 rounded-xl shadow-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Ravenclaw Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMTUiIHN0cm9rZT0iI2I3YjdiNyIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==')] opacity-20"></div>
        </div>

        {/* Page Content */}
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          className="relative z-10"
        >
          <div className="bg-[#0c1425] p-6 rounded-lg">
            {/* Date Stamp */}
            <div className="absolute -top-4 left-6 bg-[#b7b7b7] px-4 py-1 rounded-full">
              <span className="font-magical text-[#192341]">{pages[currentPage].title}</span>
            </div>

            {/* Image with Magical Border */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#b7b7b7]/20 via-transparent to-[#b7b7b7]/20 animate-shine"></div>
              <img 
                src={pages[currentPage].imageUrl}
                alt={pages[currentPage].title}
                className="w-full h-[400px] object-cover rounded-lg"
              />
              {/* Magical Corners */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#b7b7b7] rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#b7b7b7] rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#b7b7b7] rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#b7b7b7] rounded-br-lg"></div>
            </div>

            {/* Description */}
            <p className="text-[#b7b7b7] mt-6 text-center font-light italic">
              {pages[currentPage].description}
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="px-4 py-2 bg-[#b7b7b7]/10 text-[#b7b7b7] rounded-lg 
                       hover:bg-[#b7b7b7]/20 disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-300"
            >
              ← Previous Page
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(pages.length - 1, currentPage + 1))}
              disabled={currentPage === pages.length - 1}
              className="px-4 py-2 bg-[#b7b7b7]/10 text-[#b7b7b7] rounded-lg 
                       hover:bg-[#b7b7b7]/20 disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-300"
            >
              Next Page →
            </button>
          </div>
        </motion.div>

        {/* Page Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {pages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 
                        ${currentPage === index ? 'bg-[#b7b7b7]' : 'bg-[#b7b7b7]/30'}`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
