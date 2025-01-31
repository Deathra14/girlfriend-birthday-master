import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

export default function FloatingHearts({ count = 8 }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0,
            scale: 0,
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 + 50
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            x: Math.random() * 200 - 100,
            y: [-100, -200 - Math.random() * 100],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeOut"
          }}
          className="absolute left-1/2 bottom-0"
        >
          <FaHeart className={`text-${['pink', 'purple', 'indigo'][Math.floor(Math.random() * 3)]}-400/30 text-2xl`} />
        </motion.div>
      ))}
    </div>
  );
}
