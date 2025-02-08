import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import ParallaxBackground from './ParallaxBackground';
import Pipes from './Pipes';
import { PIPE_CONSTANTS } from './Pipes';

const GAME_WIDTH = typeof window !== 'undefined' ? Math.min(1000, window.innerWidth - 20) : 1000;
const GAME_HEIGHT = typeof window !== 'undefined' ? Math.min(600, window.innerHeight - 100) : 600;
const BIRD_SIZE = 30;
const BIRD_X = 200; // constant bird horizontal position

const PIPE_WIDTH = PIPE_CONSTANTS.WIDTH; // from imported Pipes

const GAME_CONFIG = {
  physics: {
    gravity: 0.6,
    flapStrength: -8,
    maxVelocity: {
      up: -8,
      down: 10
    }
  },
  pipes: {
    speed: 3,
    gapSize: 150,
    spacing: Math.max(300, GAME_WIDTH * 0.4), // Added pipe spacing config
    minDistance: 150,
    spawnInterval: 1500
  },
  visuals: {
    colors: {
      primary: '#4B6CB7',
      secondary: '#2A4B8C',
      accent: '#ffd700',
      danger: '#ef4444'
    },
    effects: {
      glowStrong: '0 0 20px rgba(75,108,183,0.5)',
      glowWeak: '0 0 10px rgba(75,108,183,0.3)'
    }
  }
};

const THEME = {
  colors: {
    primary: '#4B6CB7', // Ravenclaw blue
    secondary: '#2A4B8C', // Darker blue
    accent: '#ffd700', // Gold
    background: 'linear-gradient(135deg, #192341 0%, #1A1147 100%)',
  },
  shadows: {
    glow: '0 0 20px rgba(75,108,183,0.3)',
  }
};

export default function CuteGame() {
  const [gameState, setGameState] = useState("start");

  const [birdY, setBirdY] = useState(GAME_HEIGHT / 2);
  const [birdVelocity, setBirdVelocity] = useState(0);
  const [score, setScore] = useState(0);
  const [pipes, setPipes] = useState([]);
  
  const animationFrameRef = useRef();
  const lastTimeRef = useRef(0);
  const pipeTimerRef = useRef(0);
  
  const [isFlapping, setIsFlapping] = useState(false);
  const [scoreAnimation] = useState(false); // Added scoreAnimation state

  const birdYRef = useRef(birdY);
  const birdVelocityRef = useRef(birdVelocity);

  const updateBirdPosition = useCallback((gravity) => {
    if (gameState !== "playing") return;
    
    const newVelocity = birdVelocityRef.current + gravity;
    const newPosition = birdYRef.current + newVelocity;
    
    birdVelocityRef.current = newVelocity;
    birdYRef.current = newPosition;
    
    setBirdY(newPosition);
    setBirdVelocity(newVelocity);

    if (newPosition < 0 || newPosition > GAME_HEIGHT - BIRD_SIZE) {
      setGameState("gameover");
    }
  }, [gameState]);

  const startGame = useCallback(() => {
    birdYRef.current = GAME_HEIGHT / 2;
    birdVelocityRef.current = 0;
    setBirdY(GAME_HEIGHT / 2);
    setBirdVelocity(0);
    setPipes([]);
    setScore(0);
    setGameState("playing");
  }, []);

  const handleFlap = useCallback(() => {
    if (gameState === "playing") {
      birdVelocityRef.current = GAME_CONFIG.physics.flapStrength;
      setBirdVelocity(GAME_CONFIG.physics.flapStrength);
      setIsFlapping(true);
      setTimeout(() => setIsFlapping(false), 150);
    } else if (gameState === "start") {
      startGame();
    }
  }, [gameState, startGame]);

  const generateNewPipe = useCallback(() => {
    const gapSize = GAME_CONFIG.pipes.gapSize;
    const minGapY = gapSize;
    const maxGapY = GAME_HEIGHT - gapSize;
    const gapY = Math.random() * (maxGapY - minGapY) + minGapY;
    
    return {
      x: GAME_WIDTH,
      gapY,
      gapSize,
      scored: false
    };
  }, []);

  const updatePipesWithCollision = useCallback((pipes, speed) => {
    let collision = false;
    const newPipes = pipes.map(pipe => {
      const newX = pipe.x - speed;
      
      // Optimized collision check
      if (!collision &&
          newX < BIRD_X + BIRD_SIZE &&
          newX + PIPE_WIDTH > BIRD_X) {
        const birdY = birdYRef.current;
        const topGap = pipe.gapY - pipe.gapSize / 2;
        const bottomGap = pipe.gapY + pipe.gapSize / 2;
        if (birdY < topGap || birdY + BIRD_SIZE > bottomGap) {
          collision = true;
          setHitEffect(true);
          setTimeout(() => setHitEffect(false), 300);
        }
      }
      
      // Score update with visual feedback
      if (!pipe.scored && newX + PIPE_WIDTH < BIRD_X) {
        setScore(s => s + 1);
      }
      
      return { ...pipe, x: newX, scored: newX + PIPE_WIDTH < BIRD_X };
    }).filter(pipe => pipe.x > -PIPE_WIDTH);
  
    if (newPipes.length === 0 ||
        newPipes[newPipes.length - 1].x < GAME_WIDTH - GAME_CONFIG.pipes.spacing) {
      newPipes.push(generateNewPipe());
    }
    if (collision) {
      setGameState("gameover");
    }
    return newPipes;
  }, [generateNewPipe]);

  const gameTick = useCallback((time) => {
    if (gameState !== "playing") return;
    const delta = time - (lastTimeRef.current || time);
    lastTimeRef.current = time;

    // Update bird with delta time
    const gravity = GAME_CONFIG.physics.gravity * (delta / 16.667);
    updateBirdPosition(gravity);

    // Update pipes with interpolation
    setPipes(prev => {
      const pipeSpeed = GAME_CONFIG.pipes.speed * (delta / 16.667);
      return updatePipesWithCollision(prev, pipeSpeed);
    });

    animationFrameRef.current = requestAnimationFrame(gameTick);
  }, [gameState, updateBirdPosition, updatePipesWithCollision]);

  const [hitEffect, setHitEffect] = useState(false);

  useEffect(() => {
    if (gameState === "playing") {
      birdYRef.current = GAME_HEIGHT / 2;
      birdVelocityRef.current = 0;
      lastTimeRef.current = 0;
      pipeTimerRef.current = 0;
      setScore(0);
      animationFrameRef.current = requestAnimationFrame(gameTick);
    } else {
      cancelAnimationFrame(animationFrameRef.current);
    }
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [gameState, gameTick]);

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === "Space") {
        e.preventDefault();
        handleFlap();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState, handleFlap]);

  useEffect(() => {
    const handleTouch = (e) => {
      e.preventDefault();
      handleFlap();
    };

    window.addEventListener('touchstart', handleTouch);
    return () => window.removeEventListener('touchstart', handleTouch);
  }, [gameState, handleFlap]);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = Math.min(1000, window.innerWidth - 20);
      
      setPipes(prev => prev.map(pipe => ({
        ...pipe,
        x: (pipe.x / GAME_WIDTH) * newWidth,
      })));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className="relative mx-auto select-none overflow-hidden rounded-xl shadow-2xl touch-none"
      style={{
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
        maxWidth: '100vw',
        maxHeight: '80vh',
        background: THEME.colors.background,
      }}
      onClick={handleFlap}
    >
      <motion.div
        animate={{
          backgroundColor: hitEffect ? GAME_CONFIG.visuals.colors.danger : 'transparent'
        }}
        className="absolute inset-0 pointer-events-none"
      />
      <ParallaxBackground />
      
      <div 
        className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30 to-transparent"
      />
      
      {gameState === "start" && (
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center text-center 
                     bg-gradient-to-b from-black/60 to-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-300/30 rounded-full"
              animate={{
                y: [0, -200],
                x: [-20, 20],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                bottom: "-10px"
              }}
            />
          ))}

          <motion.h1 
            className="text-4xl md:text-6xl text-white mb-4 font-magical"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Flappy Magic
          </motion.h1>
          
          <motion.p 
            className="text-sm md:text-lg text-white/90 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {window.innerWidth <= 768 ? "Tap screen to flap" : "Press SPACE to flap"}
          </motion.p>
          
          <motion.button 
            onClick={startGame}
            className="px-8 py-4 bg-gradient-to-r from-[#4B6CB7] to-[#2A4B8C] 
                     text-white font-magical rounded-full shadow-lg
                     border border-white/10 backdrop-blur-sm
                     hover:shadow-[0_0_30px_rgba(75,108,183,0.5)]
                     transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Flying
          </motion.button>
        </motion.div>
      )}
      
      {gameState === "playing" && (
        <>
          <div className="absolute top-4 left-0 right-0 z-10">
            <div className="flex justify-center gap-8 max-w-xs mx-auto">
              <motion.div
                animate={scoreAnimation ? {
                  scale: [1, 1.2, 1],
                  y: [0, -10, 0]
                } : {}}
                className="relative px-6 py-3 bg-white/10 rounded-xl backdrop-blur-md
                         border border-white/20 shadow-lg"
              >
                <p className="text-sm text-white/80 font-magical">Score</p>
                <p className="text-3xl font-bold font-magical bg-gradient-to-r 
                          from-white to-[#ffd700] bg-clip-text text-transparent">
                  {score}
                </p>
              </motion.div>

              <div className="relative px-6 py-3 bg-white/10 rounded-xl backdrop-blur-md
                          border border-white/20 shadow-lg">
                <p className="text-sm text-white/80 font-magical">Best</p>
                <p className="text-3xl font-bold font-magical bg-gradient-to-r 
                          from-[#ffd700] to-[#ff69b4] bg-clip-text text-transparent">
                  {Math.max(score, localStorage.getItem('highScore') || 0)}
                </p>
              </div>
            </div>
          </div>

          <motion.div
            className="absolute"
            style={{
              width: 34,
              height: 24,
              left: BIRD_X,
              top: birdY,
              filter: `drop-shadow(${GAME_CONFIG.visuals.effects.glowWeak})`,
              transform: `rotate(${Math.min(Math.max(birdVelocity * 4, -30), 30)}deg)`,
              zIndex: 30
            }}
            animate={{ 
              scale: isFlapping ? [1.2, 0.8, 1] : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-yellow-400 rounded-full" />
              
              <motion.div
                className="absolute left-1 top-1/2 w-6 h-4 bg-white rounded-full"
                animate={{ scaleY: isFlapping ? [1, 0.7, 1] : 1 }}
                transition={{ duration: 0.2 }}
              />
              
              <div className="absolute right-2 top-1/3 w-3 h-3 bg-white rounded-full">
                <div className="absolute right-0 top-1/2 w-1.5 h-1.5 bg-black rounded-full" />
              </div>
              
              <div className="absolute right-0 top-1/2 w-4 h-3 bg-orange-500"
                   style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }} />
            </div>
            {isFlapping && (
              <motion.div
                className="bird-trail"
                initial={{ opacity: 0.5, scale: 1 }}
                animate={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </motion.div>
          <Pipes pipes={pipes} GAME_HEIGHT={GAME_HEIGHT} />
        </>
      )}

      {gameState === "gameover" && (
        <motion.div 
          className="absolute inset-0 flex items-center justify-center 
                     bg-gradient-to-b from-black/60 to-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-br from-[#192341]/80 to-[#1A1147]/80 p-8 rounded-2xl 
                     backdrop-blur-md border border-white/10 shadow-2xl"
          >
            <h1 className="text-4xl text-white mb-6 font-magical drop-shadow-glow">Game Over!</h1>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-center gap-8">
                <div className="text-center">
                  <div className="text-sm text-white/80 mb-1">Final Score</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
                    {score}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-white/80 mb-1">Best Score</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#ffd700] to-[#ff69b4] bg-clip-text text-transparent">
                    {Math.max(score, localStorage.getItem('highScore') || 0)}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button 
                onClick={startGame} 
                className="w-full px-6 py-3 bg-gradient-to-r from-[#4B6CB7] to-[#2A4B8C] 
                         text-white font-magical rounded-full shadow-lg
                         border border-white/10 backdrop-blur-sm
                         hover:shadow-[0_0_30px_rgba(75,108,183,0.5)]
                         transition-all duration-300"
              >
                Try Again
              </button>
              <button 
                onClick={() => window.location.href = "/"} 
                className="w-full px-6 py-3 bg-white/10 text-white font-magical 
                         rounded-full hover:bg-white/20 transition-all
                         border border-white/10 backdrop-blur-sm"
              >
                Exit Game
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
