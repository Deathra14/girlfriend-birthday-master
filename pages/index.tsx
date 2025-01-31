import Head from 'next/head';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import Header from '../components/Header';
import SurpriseButton from '../components/SurpriseButton';
import Footer from '../components/Footer';
import MusicPlayer from '../components/MusicPlayer';
import CountdownTimer from '../components/CountdownTimer';
import SocialShare from '../components/SocialShare';
import { motion } from 'framer-motion';
import Scrapbook from '../components/Scrapbook';
import RavenclawQuiz from '../components/RavenclawQuiz';
import MessagePopup from '../components/MessagePopup';
import { useState } from 'react';
import BirthdayCandle from '../components/BirthdayCandle';
import FloatingHearts from '../components/FloatingHearts'; // Add this import
import LoveLetter from '../components/LoveLetter';

export default function Home() {
  const [showWebsite, setShowWebsite] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  const handleSurpriseReveal = () => {
    // Close quiz when surprise is revealed
    setIsQuizOpen(false);
  };

  if (!showWebsite) {
    return <BirthdayCandle onComplete={() => setShowWebsite(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#222f5b] to-[#1a1147] overflow-x-hidden">
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
        <div className="container mx-auto px-4 py-8">
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-24 pt-12"
          >
            <motion.h1 className="text-7xl md:text-9xl font-magical mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] via-[#ff69b4] to-[#ffd700]">
              Happy Birthday!
            </motion.h1>
            <motion.p className="text-2xl md:text-3xl text-[#e4d5b7] font-light">
              To the most magical Ravenclaw ✨
            </motion.p>
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

          {/* Floating Controls Container */}
          <div className="fixed bottom-0 right-0 z-40 p-4 flex flex-col gap-4 items-end">
            {/* Music Player Toggle */}
            <div className="relative group">
              <MusicPlayer />
            </div>

            {/* Social Share Toggle */}
            <div className="relative group">
              <SocialShare />
            </div>
          </div>
        </div>
      </main>

      <div className="relative">
        <FloatingHearts count={12} />
        <Footer />
      </div>

      <MessagePopup />
    </div>
  );
}