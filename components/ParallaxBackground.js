import React from 'react';
import { motion } from 'framer-motion';

export default function ParallaxBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient background with animation */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(to right bottom, #2C5364, #203A43, #0F2027)",
            "linear-gradient(to right bottom, #203A43, #0F2027, #2C5364)",
            "linear-gradient(to right bottom, #0F2027, #2C5364, #203A43)",
          ],
        }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Animated clouds layer */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`cloud-${i}`}
            className="absolute h-24 blur-xl"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)',
              width: '200px',
              top: `${20 + i * 30}%`,
            }}
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 15 + i * 5,
              repeat: Infinity,
              ease: 'linear',
              delay: -i * 5,
            }}
          />
        ))}
      </div>

      {/* Parallax star layers */}
      {[...Array(3)].map((_, layerIndex) => (
        <div key={`star-layer-${layerIndex}`} className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={`star-${layerIndex}-${i}`}
              className="absolute rounded-full"
              style={{
                width: 2 + layerIndex,
                height: 2 + layerIndex,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: 'white',
                filter: `blur(${layerIndex * 0.5}px)`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3 + layerIndex,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      ))}

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Moving particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20],
              x: [-20, 20],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Color overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F2027]/50 to-transparent" />
    </div>
  );
}
