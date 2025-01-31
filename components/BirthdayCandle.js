import { useState, useEffect } from 'react'; // Remove useEffect since it's not being used
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaFeather } from 'react-icons/fa';
import BirthdayCard from './BirthdayCard';
import AudioManager from './AudioManager';

export default function BirthdayCandle({ onComplete }) {
  const [blownCandles, setBlownCandles] = useState(new Array(3).fill(false));
  const [allBlown, setAllBlown] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [isAudioReady, setIsAudioReady] = useState(false);

  // Initialize audio as soon as component mounts
  useEffect(() => {
    // Small delay to ensure smooth mounting
    const timer = setTimeout(() => {
      setIsAudioReady(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleBlow = (index) => {
    const newBlownCandles = [...blownCandles];
    newBlownCandles[index] = true;
    setBlownCandles(newBlownCandles);

    if (newBlownCandles.every(candle => candle)) {
      setAllBlown(true);
      setTimeout(() => {
        setTimeout(() => setShowCard(true), 1000);
      }, 2000);
    }
  };

  const handleCardComplete = () => {
    onComplete?.();
  };

  const Candle = ({ index, isBlown }) => (
    <div className="absolute" style={{
      left: `${[20, 50, 80][index]}%`,  // Better spread across cake
      top: `${[-8, -12, -8][index]}px`, // Varied heights
      transform: `rotate(${[-3, 0, 3][index]}deg) translateX(-50%)`
    }}>
      {/* Ravenclaw-themed deluxe candle */}
      <div className="w-2 sm:w-3 h-16 sm:h-20 bg-gradient-to-b from-[#0A1E3F] via-[#2A4B8C] to-[#0A1E3F] 
                    rounded-full shadow-[0_0_15px_rgba(42,75,140,0.3)] relative overflow-hidden">
        {/* Candle pattern */}
        <div className="absolute inset-0 bg-[url('/textures/candle-pattern.png')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4B6CB7]/30 to-transparent" />
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#4B6CB7] rounded-full opacity-50 blur-sm" />
      </div>

      {/* Enhanced wax pool */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
        <div className="w-4 h-2 bg-gradient-to-r from-[#CD7F32] to-[#B87333] rounded-full opacity-90
                     shadow-lg transform-gpu scale-x-125" />
        <div className="w-3 h-1 bg-[#CD7F32]/50 rounded-full blur-sm -mt-1" />
      </div>

      {/* Improved flame animation */}
      <AnimatePresence>
        {!isBlown && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ 
              scale: [1, 1.2, 1],
              y: [-2, 1, -2],
              rotate: [-5, 5, -5]
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute -top-8 left-1/2 -translate-x-1/2"
          >
            <div className="relative">
              {/* Inner flame */}
              <div className="w-3 h-8 bg-gradient-to-t from-[#4B6CB7] to-white 
                          rounded-full animate-flicker">
                <div className="absolute inset-0 bg-gradient-to-t from-[#4B6CB7]/0 to-white/50 
                              rounded-full blur-sm" />
              </div>
              {/* Outer glow */}
              <div className="absolute inset-0 bg-[#4B6CB7] rounded-full blur-xl opacity-30 scale-150" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced magical smoke effect */}
      <AnimatePresence>
        {isBlown && (
          <div className="absolute -top-20 left-1/2 -translate-x-1/2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 0, scale: 0.5 }}
                animate={{ 
                  opacity: [0, 0.5, 0],
                  y: [-20 * i, -40 * (i + 1)],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{ duration: 2, delay: i * 0.3 }}
                className="absolute left-1/2 -translate-x-1/2"
              >
                <FaStar className="text-[#4B6CB7] opacity-50" size={16 - i * 2} />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Interactive area */}
      <button
        onClick={() => handleBlow(index)}
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-10 h-14 cursor-pointer z-10
                  hover:scale-110 transition-transform rounded-full"
        style={{ background: 'radial-gradient(circle, transparent 50%, rgba(75,108,183,0.1) 100%)' }}
      />
    </div>
  );

  return (
    <AnimatePresence mode="wait">
      {!showCard ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-gradient-to-b from-[#0A1E3F] to-[#1A1147] 
                    flex items-center justify-center z-50 p-4 sm:p-0"
        >
          {/* Audio manager with proper mounting */}
          {isAudioReady && (
            <AudioManager 
              audioUrl="/audio/happybirthday.mp3" 
              autoPlay={true}
              volume={0.4}
            />
          )}
          <motion.div className="w-full max-w-lg mx-auto">
            {/* Enhanced Ravenclaw Banner */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-center mb-8 sm:mb-12"
            >
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-magical text-[#4B6CB7] mb-4
                           drop-shadow-[0_0_10px_rgba(75,108,183,0.3)]
                           bg-clip-text bg-gradient-to-r from-[#4B6CB7] to-[#2A4B8C]">
                Happy Birthday!
              </h1>
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-xl sm:text-2xl text-[#CD7F32] font-magical italic"
              >
                A Magical Celebration
              </motion.div>
            </motion.div>

            {/* Add instruction message before the cake */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center mb-8"
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="bg-[#2A4B8C]/30 rounded-lg p-4 backdrop-blur-sm
                         border border-[#4B6CB7]/20 inline-block"
              >
                <p className="text-[#e4d5b7] font-magical text-lg sm:text-xl">
                  {allBlown 
                    ? "✨ Opening your magical birthday celebration... ✨"
                    : "🔮 Click the flames to blow out the candles and enter your birthday realm! 🔮"}
                </p>
                {!allBlown && (
                  <motion.p
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-[#CD7F32] text-sm mt-2 font-magical"
                  >
                    Blow all 3 candles to proceed
                  </motion.p>
                )}
              </motion.div>
            </motion.div>

            {/* Enhanced Cake Container */}
            <div className="relative mb-8 sm:mb-12 px-4">
              <div className="aspect-[4/3] relative">
                {/* Main cake with improved design */}
                <div className="h-full rounded-2xl relative overflow-hidden">
                  {/* Bottom tier */}
                  <div className="absolute bottom-0 left-0 right-0 h-2/3
                               bg-gradient-to-b from-[#0A1E3F] to-[#2A4B8C]
                               shadow-[0_0_30px_rgba(42,75,140,0.2)]">
                    {/* Decorative stripes */}
                    <div className="absolute inset-0 flex justify-between">
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ opacity: [0.3, 0.6, 0.3] }}
                          transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                          className="w-px h-full bg-[#CD7F32]/20"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Middle tier */}
                  <div className="absolute bottom-[30%] left-[10%] right-[10%] h-1/3
                               bg-gradient-to-b from-[#1A2F55] to-[#2A4B8C]
                               rounded-lg shadow-lg">
                    {/* Bronze trim */}
                    <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#CD7F32]/30" />
                  </div>

                  {/* Top tier with frosting */}
                  <div className="absolute bottom-[45%] left-[20%] right-[20%] h-1/4
                               bg-gradient-to-b from-[#2A4B8C] to-[#4B6CB7]
                               rounded-lg shadow-lg">
                    {/* Decorative swirls */}
                    <div className="absolute -top-2 left-0 right-0 flex justify-around">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, 0]
                          }}
                          transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
                          className="w-6 h-6 rounded-full bg-[#4B6CB7]/50"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Frosting details */}
                  {/* ...existing frosting code... */}
                </div>

                {/* Candles container */}
                <div className="absolute top-[15%] left-0 right-0 h-0">
                  <div className="relative">
                    {[...Array(3)].map((_, i) => (
                      <Candle key={i} index={i} isBlown={blownCandles[i]} />
                    ))}
                  </div>
                </div>

                {/* Platform/Plate */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-[120%] h-4 bg-gradient-to-b from-[#CD7F32]/20 to-transparent 
                               rounded-full blur-lg" />
                </div>
              </div>
            </div>

            {/* Progress indicator */}
            {!allBlown && (
              <div className="mt-6 flex justify-center gap-2">
                {blownCandles.map((isBlown, index) => (
                  <motion.div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      isBlown ? 'bg-[#CD7F32]' : 'bg-[#4B6CB7]/30'
                    }`}
                    animate={isBlown ? { scale: [1, 1.5, 1] } : {}}
                    transition={{ duration: 0.5 }}
                  />
                ))}
              </div>
            )}

            {/* Enhanced message section */}
            <motion.div
              animate={allBlown ? { 
                scale: [1, 1.1, 1],
                opacity: [1, 0.8, 0]
              } : { 
                scale: 1,
                opacity: 1
              }}
              className="text-center space-y-4"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-magical text-[#4B6CB7]">
                Charisma Husniati
              </h2>
              <p className="text-lg sm:text-xl text-[#e4d5b7] font-magical">
                {allBlown ? 
                  "✨ Your wish has been cast into the stars! ✨" : 
                  "Make a wish, dear Ravenclaw! 🦅"}
              </p>
            </motion.div>

            {/* Magical particles effect */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  animate={{
                    y: [0, -100],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`
                  }}
                >
                  {i % 2 === 0 ? <FaStar className="text-[#CD7F32] text-xs" /> : 
                                <FaFeather className="text-[#4B6CB7] text-xs" />}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <BirthdayCard onComplete={handleCardComplete} />
      )}
    </AnimatePresence>
  );
}