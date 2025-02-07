import { useState, useCallback, useEffect } from 'react';
import Head from 'next/head';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import { motion, AnimatePresence } from 'framer-motion';
import type { Engine } from "tsparticles-engine";
import Header from '../components/Header';
import SurpriseButton from '../components/SurpriseButton';
import Footer from '../components/Footer';
import MusicPlayer from '../components/MusicPlayer';
import CountdownTimer from '../components/CountdownTimer';
import SocialShare from '../components/SocialShare';
import Scrapbook from '../components/Scrapbook';
import RavenclawQuiz from '../components/RavenclawQuiz';
import MessagePopup from '../components/MessagePopup';
import BirthdayCandle from '../components/BirthdayCandle';
import FloatingHearts from '../components/FloatingHearts';
import LoveLetter from '../components/LoveLetter';
import AudioManager from '../components/AudioManager';
import FlyingGift from '../components/FlyingGift';
import BirthdayCard from '../components/BirthdayCard';
import CuteGame from '../components/CuteGame'; // New import for game

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [showCard, setShowCard] = useState(false); // New state for BirthdayCard
  const [showWebsite, setShowWebsite] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [mainAudioReady, setMainAudioReady] = useState(false);
  const [isGameOpen, setIsGameOpen] = useState(false); // New state for game modal

  // Ensure hydration is complete before rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  const particlesInit = useCallback(async (engine: Engine) => {
    try {
      await loadSlim(engine);
    } catch (error) {
      console.error('Particles initialization failed:', error);
    }
  }, []);

  // Update the reveal flow:
  // First, show BirthdayCandle. When it completes, set showCard to true.
  // Then, show BirthdayCard. Upon its completion, reveal the main website.
  const handleCandleComplete = () => {
    setShowCard(true);
  };

  const handleCardComplete = () => {
    setShowWebsite(true);
    setMainAudioReady(true);
  };

  const handleSurpriseReveal = () => {
    try {
      setIsQuizOpen(false);
      handleTransition();
    } catch (error) {
      console.error('Error in handleSurpriseReveal:', error);
    }
  };

  const handleTransition = () => {
    // Use the isExiting state for transition effects
    setTimeout(() => {
      // Handle transition completion
    }, 500);
  };

  // Don't render anything until client-side hydration is complete
  if (!mounted) return null;

  if (!showCard && !showWebsite) {
    return <BirthdayCandle onComplete={handleCandleComplete} />;
  }

  if (showCard && !showWebsite) {
    return <BirthdayCard onComplete={handleCardComplete} />;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen relative overflow-x-hidden"
      >
        {/* Enhanced animated background overlay */}
        <motion.div 
          className="absolute inset-0 -z-10"
          animate={{ background: ["linear-gradient(135deg, #222f5b, #1a1147)", "linear-gradient(135deg, #1a1147, #222f5b)"] }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
        />

        {/* Add FlyingGift component */}
        <FlyingGift />

        {mainAudioReady && (
          <AudioManager 
            audioUrl="/audio/delicate.mp3" 
            autoPlay={true}
            volume={0.6}
          />
        )}
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            particles: {
              number: { value: 50 },
              color: { value: "#b7b7b7" },
              shape: {
                type: ["circle"],
                options: {
                  circle: {
                    blur: 5,
                  }
                }
              },
              opacity: { value: 0.3 },
              size: { value: { min: 1, max: 3 } },
              move: { 
                enable: true,
                speed: 0.5,
                direction: "none",
                random: true,
                straight: false,
                outModes: "out"
              }
            },
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: "grab"
                }
              },
              modes: {
                grab: {
                  distance: 140,
                  links: {
                    opacity: 0.2
                  }
                }
              }
            }
          }}
        />

        <Head>
          <title>Happy Birthday Charisma! 🦅</title>
          <meta name="description" content="A magical birthday celebration for Charisma Husniati" />
        </Head>

        <Header name="Charisma Husniati" house="Ravenclaw" />
        
        <main className="relative">
          <div className="container mx-auto px-4 py-12">
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-24 pt-12"
            >
              <motion.h1 
                className="text-7xl md:text-9xl font-magical mb-6 text-transparent bg-clip-text 
                           bg-gradient-to-r from-[#ffd700] via-[#ff69b4] to-[#ffd700]"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Happy Birthday!
              </motion.h1>
              <motion.p 
                className="text-2xl md:text-3xl text-[#e4d5b7] font-light"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                To the most magical Ravenclaw ✨
              </motion.p>
              {/* Decorative animated underline */}
              <motion.div 
                className="mt-4 h-1 w-1/3 mx-auto rounded-full"
                animate={{ width: ["0%", "100%", "0%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ background: "linear-gradient(90deg, #ffd700, #ff69b4)" }}
              />
            </motion.section>

            <section className="mb-32">
              <CountdownTimer />
            </section>

            <motion.section 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-32"
            >
              <LoveLetter />
            </motion.section>

            <section className="mb-32 relative">
              <div className="absolute inset-0 bg-[#192341]/10 rounded-3xl blur-3xl"></div>
              <Scrapbook birthDate="2002-02-01" name="Charisma" />
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32">
              <motion.section
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <SurpriseButton onReveal={handleSurpriseReveal} />
              </motion.section>

              <motion.section
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <RavenclawQuiz isOpen={isQuizOpen} setIsOpen={setIsQuizOpen} />
              </motion.section>
            </div>

            {/* Floating Controls enhanced with subtle shadow and scaling */}
            <div className="fixed bottom-0 right-0 z-40 p-4 flex flex-col gap-4 items-end">
              <motion.div whileHover={{ scale: 1.1 }} className="relative">
                <MusicPlayer />
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} className="relative">
                <SocialShare />
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => setIsGameOpen(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 px-6 rounded-full shadow-xl border border-transparent transition transform hover:scale-105 focus:outline-none"
              >
                Play Flappy Magic
              </motion.button>
            </div>
          </div>
        </main>

        <div className="relative">
          <FloatingHearts count={12} />
          <Footer />
        </div>

        <MessagePopup />
      </motion.div>

      {/* Game Modal */}
      <AnimatePresence>
        {isGameOpen && (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/70 flex flex-col"
          >
            <div className="relative flex-1">
              <CuteGame />
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => setIsGameOpen(false)}
                className="absolute top-5 right-5 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-2 px-5 rounded-full shadow-lg border border-transparent transition transform hover:scale-105 focus:outline-none"
              >
                Close Game
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
}