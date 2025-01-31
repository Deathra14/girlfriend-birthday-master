import { motion } from 'framer-motion';

export default function Header() {
  return (
    <header className="relative py-20 overflow-hidden">
      {/* Magical background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1147]/90 via-[#2a1810]/80 to-[#1a1147]/90 backdrop-blur-sm"></div>
      
      <div className="container mx-auto px-6 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* CSS Magical Seal */}
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            className="mb-8 w-24 h-24 mx-auto relative"
          >
            {/* Inner circles and decorative elements */}
            <div className="absolute inset-0 border-4 border-[#ffd700]/30 rounded-full"></div>
            <div className="absolute inset-2 border-2 border-[#ffd700]/40 rounded-full"></div>
            <div className="absolute inset-4 border border-[#ffd700]/50 rounded-full"></div>
            {/* Star pattern */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full h-full origin-center"
                style={{
                  transform: `rotate(${i * 45}deg)`,
                }}
              >
                <div className="absolute top-0 left-1/2 w-1 h-1 bg-[#ffd700]/60 rounded-full -translate-x-1/2"></div>
              </div>
            ))}
          </motion.div>

          {/* Main heading */}
          <h1 className="font-magical text-6xl md:text-7xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] via-[#fff4b0] to-[#ffd700]">
            Happy Birthday!
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-[#e4d5b7] max-w-2xl mx-auto font-light tracking-wide">
            Let the magic of this special day surround you ⚡
          </p>

          {/* CSS Deathly Hallows Symbol */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-[2px] w-20 bg-gradient-to-r from-transparent via-[#ffd700]/50 to-transparent"></div>
            <div className="relative w-6 h-6">
              {/* Triangle */}
              <div className="absolute inset-0 border-[1.5px] border-[#ffd700]/70"
                   style={{
                     clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
                   }}></div>
              {/* Line */}
              <div className="absolute h-full w-[1.5px] left-1/2 -translate-x-1/2 bg-[#ffd700]/70"></div>
              {/* Circle */}
              <div className="absolute w-[6px] h-[6px] rounded-full border-[1.5px] border-[#ffd700]/70 
                            left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            <div className="h-[2px] w-20 bg-gradient-to-r from-transparent via-[#ffd700]/50 to-transparent"></div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}