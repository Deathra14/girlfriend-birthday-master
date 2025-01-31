import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function MagicalCharacters() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Interactive Snitch */}
      <motion.img
        src="/images/snitch.png"
        className="absolute w-8 h-8 filter drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]"
        animate={{
          x: mousePosition.x + Math.sin(Date.now() * 0.01) * 50,
          y: mousePosition.y + Math.cos(Date.now() * 0.01) * 50,
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 10,
          rotate: { duration: 2, repeat: Infinity },
          scale: { duration: 1, repeat: Infinity }
        }}
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

      {/* Magical Sparkles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5],
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100]
          }}
          transition={{
            duration: 2 + Math.random(),
            repeat: Infinity,
            delay: i * 0.2
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, #FFD700 0%, transparent 70%)`,
            width: '8px',
            height: '8px',
            borderRadius: '50%'
          }}
        />
      ))}
    </div>
  );
}
