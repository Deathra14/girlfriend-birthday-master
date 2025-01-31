import { motion } from 'framer-motion';

export default function RavenclawLogo() {
  return (
    <div className="relative w-24 h-24">
      {/* Eagle silhouette */}
      <motion.div
        animate={{ 
          scale: [1, 1.05, 1],
          rotateY: [0, 5, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0"
      >
        <div className="w-full h-full relative">
          {/* Eagle head */}
          <div className="absolute top-1/4 left-1/2 w-8 h-12 -translate-x-1/2
                         border-t-[3px] border-l-[3px] border-r-[3px] border-[#ffd700]/70
                         rounded-t-full"></div>
          {/* Eagle wings */}
          <div className="absolute top-1/2 left-0 w-full flex justify-between">
            <div className="w-8 h-12 border-b-[3px] border-l-[3px] border-[#ffd700]/70
                          rounded-bl-full transform -rotate-12"></div>
            <div className="w-8 h-12 border-b-[3px] border-r-[3px] border-[#ffd700]/70
                          rounded-br-full transform rotate-12"></div>
          </div>
        </div>
      </motion.div>

      {/* Outer circle */}
      <div className="absolute inset-0 border-[3px] border-[#2A4B8C] rounded-full"></div>
      
      {/* Rotating stars */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute inset-0"
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#ffd700]"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${i * 45}deg) translateX(2.5rem) translateY(-50%)`,
              borderRadius: '50%'
            }}
          ></div>
        ))}
      </motion.div>
    </div>
  );
}
