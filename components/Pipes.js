import React from 'react';
import { motion } from 'framer-motion';

// Update pipe constants for better spacing
const PIPE_WIDTH = 70; // Slightly thinner pipes
const MIN_GAP_HEIGHT = 160; // Consistent gap size
const MAX_GAP_HEIGHT = 160; // Same as MIN for consistency
const MIN_GAP_Y = 100;
const PIPE_SPACING = 300; // Minimum space between pipes

export default function Pipes({ pipes, GAME_HEIGHT }) {
  // Helper function to calculate the safe gap zone
  const getSafeZone = (gapY, gapSize) => ({
    top: gapY - gapSize / 2,
    bottom: gapY + gapSize / 2
  });

  return (
    <>
      {pipes.map((pipe, index) => {
        const safeZone = getSafeZone(pipe.gapY, pipe.gapSize);
        
        return (
          <React.Fragment key={index}>
            {/* Top pipe */}
            <motion.div
              className="absolute"
              style={{
                left: pipe.x,
                top: 0,
                width: PIPE_WIDTH,
                height: safeZone.top,
                zIndex: 20
              }}
            >
              {/* Main pipe structure */}
              <div className="relative w-full h-full">
                {/* Pipe body */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#1a4d4d] via-[#2a8b8b] to-[#1a4d4d] 
                              border-l-2 border-r-2 border-[#3fcccc]/30" />
                
                {/* Bottom rim */}
                <div className="absolute bottom-0 left-0 right-0">
                  <div className="h-6 bg-[#2a8b8b] rounded-b-lg border-2 border-[#3fcccc]/30
                                shadow-[0_0_10px_rgba(63,204,204,0.3)]" />
                </div>
              </div>
            </motion.div>

            {/* Bottom pipe */}
            <motion.div
              className="absolute"
              style={{
                left: pipe.x,
                top: safeZone.bottom,
                width: PIPE_WIDTH,
                height: GAME_HEIGHT - safeZone.bottom,
                zIndex: 20
              }}
            >
              {/* Main pipe structure */}
              <div className="relative w-full h-full">
                {/* Pipe body */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#1a4d4d] via-[#2a8b8b] to-[#1a4d4d] 
                              border-l-2 border-r-2 border-[#3fcccc]/30" />
                
                {/* Top rim */}
                <div className="absolute top-0 left-0 right-0">
                  <div className="h-6 bg-[#2a8b8b] rounded-t-lg border-2 border-[#3fcccc]/30
                                shadow-[0_0_10px_rgba(63,204,204,0.3)]" />
                </div>
              </div>
            </motion.div>

            {/* Gap indicator (optional, for debugging) */}
            {/* <div 
              className="absolute bg-white/10"
              style={{
                left: pipe.x,
                top: safeZone.top,
                width: PIPE_WIDTH,
                height: pipe.gapSize,
                zIndex: 15
              }}
            /> */}
          </React.Fragment>
        );
      })}
    </>
  );
}

// Export updated constants
export const PIPE_CONSTANTS = {
  WIDTH: PIPE_WIDTH,
  MIN_GAP_HEIGHT,
  MAX_GAP_HEIGHT,
  MIN_GAP_Y,
  PIPE_SPACING
};
