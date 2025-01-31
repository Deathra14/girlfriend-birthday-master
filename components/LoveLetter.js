import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

export default function LoveLetter() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-2xl mx-auto px-4 py-8"
    >
      <motion.div
        className="relative bg-gradient-to-br from-white to-[#fff5e6] p-8 rounded-xl shadow-2xl
                   border border-[#FFD700]/20 overflow-hidden"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-[#FFD700]/10 to-transparent rounded-br-3xl" />
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-[#FFD700]/10 to-transparent rounded-tl-3xl" />

        {/* Content */}
        <div className="relative">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-3xl font-magical text-[#CD7F32] text-center mb-8"
          >
            A Letter of Love ✨
          </motion.h2>

          <div className="space-y-6">
            <TypeAnimation
              sequence={[
                'To my dearest love...',
                1000,
                'Every moment with you feels like magic...',
                1000,
                'You\'re my sunshine, my joy, my everything...', // Fixed apostrophe
                1000,
                'Happy Birthday, my forever person! 🥰',
                5000,
              ]}
              wrapper="p"
              speed={50}
              className="text-xl sm:text-2xl text-[#4B6CB7] font-serif leading-relaxed"
              repeat={Infinity}
              style={{ minHeight: '6rem' }}
            />
          </div>

          {/* Floating hearts */}
          <motion.div
            animate={{
              y: [-5, 5, -5],
              rotate: [-5, 5, -5]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -right-2 -top-2 text-2xl"
          >
            💝
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}