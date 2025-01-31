import { motion } from 'framer-motion';

export default function MagicalCharacters() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Golden Snitch with more natural flying pattern */}
      <motion.img
        src="/images/snitch.png"
        className="absolute w-8 h-8"
        initial={{ x: -100, y: 0 }}
        animate={{
          x: [0, 200, 400, 200, 0],
          y: [0, -100, 0, 100, 0],
          rotate: [0, 45, 0, -45, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.25, 0.5, 0.75, 1]
        }}
        style={{ filter: "drop-shadow(0 0 10px rgba(255, 215, 0, 0.3))" }}
      />

      {/* Owl with smoother gliding motion */}
      <motion.img
        src="/images/owl.png"
        className="absolute w-16 h-16 right-0"
        initial={{ x: 100, y: -100 }}
        animate={{
          x: [-200, 0, 200],
          y: [-20, 40, -20],
          rotate: [5, -5, 5]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.5, 1]
        }}
        style={{ filter: "drop-shadow(0 0 15px rgba(255, 255, 255, 0.2))" }}
      />

      {/* Multiple Floating Wands */}
      {[...Array(3)].map((_, index) => (
        <motion.img
          key={index}
          src="/images/wand.png"
          className="absolute w-12 h-12"
          initial={{
            x: index * 200,
            y: 100 + index * 50,
            opacity: 0.7
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [-10, 10, -10],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 4 + index,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: index * 1.5
          }}
          style={{ filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.2))" }}
        />
      ))}

      {/* Add sparkle effects */}
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={`sparkle-${index}`}
          className="absolute w-2 h-2 bg-yellow-200 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: 0
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.8,
            ease: "easeInOut"
          }}
          style={{
            boxShadow: "0 0 10px rgba(255, 215, 0, 0.5)"
          }}
        />
      ))}
    </div>
  );
}
