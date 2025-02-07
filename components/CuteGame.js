import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import ParallaxBackground from './ParallaxBackground';
import Pipes from './Pipes';
import { PIPE_CONSTANTS } from './Pipes';

const GAME_WIDTH = typeof window !== 'undefined' ? Math.min(1000, window.innerWidth - 20) : 1000;
const GAME_HEIGHT = typeof window !== 'undefined' ? Math.min(600, window.innerHeight - 100) : 600;
const BIRD_SIZE = 30;
const BIRD_X = 200; // constant bird horizontal position
const GRAVITY = 0.6;
const FLAP_STRENGTH = -8;
const PIPE_SPEED = 3;
const PIPE_SPACING = Math.max(300, GAME_WIDTH * 0.4);
const PIPE_WIDTH = PIPE_CONSTANTS.WIDTH; // from imported Pipes

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

  const birdYRef = useRef(birdY);
  const birdVelocityRef = useRef(birdVelocity);

  const updateBirdPosition = useCallback(() => {
    if (gameState !== "playing") return;
    
    const newVelocity = birdVelocityRef.current + GRAVITY;
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
      birdVelocityRef.current = FLAP_STRENGTH;
      setBirdVelocity(FLAP_STRENGTH);
      setIsFlapping(true);
      setTimeout(() => setIsFlapping(false), 150);
    } else if (gameState === "start") {
      startGame();
    }
  }, [gameState, startGame]);

  const generateNewPipe = useCallback(() => {
    const gapSize = 150;
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

  const gameTick = useCallback(() => {
    if (gameState !== "playing") return;
    
    updateBirdPosition();
    
    // Update pipes atomically (fresh state each frame)
    setPipes(prev => {
      let collision = false;
      const newPipes = prev.map(pipe => {
        const newX = pipe.x - PIPE_SPEED;
        
        // Check collision if bird overlaps horizontally with the pipe
        if (newX < BIRD_X + BIRD_SIZE && newX + PIPE_WIDTH > BIRD_X) {
          const topGap = pipe.gapY - pipe.gapSize / 2;
          const bottomGap = pipe.gapY + pipe.gapSize / 2;
          if (birdYRef.current < topGap || birdYRef.current + BIRD_SIZE > bottomGap) {
            collision = true;
          }
        }
        
        // Mark score if passed
        if (!pipe.scored && newX + PIPE_WIDTH < BIRD_X) {
          pipe.scored = true;
          setScore(s => s + 1);
        }
        
        return { ...pipe, x: newX };
      }).filter(pipe => pipe.x > -PIPE_WIDTH);
      
      if (newPipes.length === 0 || newPipes[newPipes.length - 1].x < GAME_WIDTH - PIPE_SPACING) {
        newPipes.push(generateNewPipe());
      }
      
      if (collision) {
        setGameState("gameover");
      }
      return newPipes;
    });
    
    animationFrameRef.current = requestAnimationFrame(gameTick);
  }, [gameState, updateBirdPosition, generateNewPipe]);

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

  const [scoreAnimation] = useState(false);

  return (
    <div
      className="relative mx-auto select-none overflow-hidden rounded-xl shadow-2xl touch-none"
      style={{
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
        maxWidth: '100vw',
        maxHeight: '80vh',
        background: 'linear-gradient(to bottom right, #2C5364, #203A43, #0F2027)'
      }}
      onClick={handleFlap}
    >
      <ParallaxBackground />
      
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, transparent 30%, rgba(15,32,39,0.4) 100%)'
        }} 
      />
      
      {gameState === "start" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black/40 backdrop-blur-sm">
          <h1 className="text-3xl md:text-5xl text-white mb-4 font-magical">Flappy Magic</h1>
          <p className="text-sm md:text-lg text-white/90 mb-6">
            {window.innerWidth <= 768 ? "Tap screen to flap" : "Press SPACE to flap"}
          </p>
          <button 
            onClick={startGame} 
            className="px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-pink-500 to-purple-500 
                     text-white rounded-full shadow-lg hover:shadow-xl 
                     transition-all transform hover:scale-105"
          >
            Start Game
          </button>
        </div>
      )}
      
      {gameState === "playing" && (
        <>
          <div className="absolute top-0 left-0 right-0 z-10 p-4">
            <div className="flex justify-between items-center max-w-xs mx-auto">
              <motion.div
                animate={scoreAnimation ? {
                  scale: [1, 1.2, 1],
                  color: ['#ffffff', '#ffd700', '#ffffff']
                } : {}}
                className="relative"
              >
                <div className="absolute -inset-4 bg-black/20 backdrop-blur-sm rounded-xl" />
                <div className="relative flex items-center gap-2 px-4 py-2">
                  <span className="text-xs font-magical text-white/80">Score</span>
                  <span className="text-2xl font-bold font-magical bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
                    {score}
                  </span>
                </div>
              </motion.div>

              <div className="relative">
                <div className="absolute -inset-4 bg-black/20 backdrop-blur-sm rounded-xl" />
                <div className="relative flex items-center gap-2 px-4 py-2">
                  <span className="text-xs font-magical text-white/80">Best</span>
                  <span className="text-2xl font-bold font-magical bg-gradient-to-r from-[#ffd700] to-[#ff69b4] bg-clip-text text-transparent">
                    {Math.max(score, localStorage.getItem('highScore') || 0)}
                  </span>
                </div>
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
              transform: `rotate(${Math.min(Math.max(birdVelocity * 4, -30), 30)}deg)`,
              zIndex: 30
            }}
            animate={{ scale: isFlapping ? [1.2, 0.8, 1] : 1 }} // Added bounce animation here
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
          </motion.div>
          <Pipes pipes={pipes} GAME_HEIGHT={GAME_HEIGHT} />
        </>
      )}

      {gameState === "gameover" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/10 p-8 rounded-2xl backdrop-blur-md"
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

            <div className="space-y-3">
              <button 
                onClick={startGame} 
                className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 
                         text-white rounded-full shadow-lg hover:shadow-xl 
                         transition-all transform hover:scale-105"
              >
                Try Again
              </button>
              <button 
                onClick={() => window.location.href = "/"} 
                className="w-full px-6 py-3 bg-white/10 text-white rounded-full 
                         hover:bg-white/20 transition-all"
              >
                Exit
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
