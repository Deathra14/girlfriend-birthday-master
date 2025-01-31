import { FaHeart, FaInstagram } from 'react-icons/fa'; // Remove FaGithub since it's not being used
import RavenclawLogo from './RavenclawLogo';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20">
      {/* Magical wave decoration */}
      <div className="absolute bottom-full left-0 right-0">
        <div className="relative h-20">
          <svg className="absolute bottom-0 w-full fill-[#0A1E3F]" viewBox="0 0 1440 120">
            <path d="M0,64L60,58.7C120,53,240,43,360,48C480,53,600,75,720,80C840,85,960,75,1080,64C1200,53,1320,43,1380,37.3L1440,32L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
          </svg>
          
          {/* Magical sparkles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#ffd700] rounded-full"
                animate={{
                  y: [-10, -30],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
                style={{
                  left: `${15 + i * 15}%`,
                  top: '80%',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer content */}
      <div className="bg-[#0A1E3F] text-[#e4d5b7] py-12 relative">
        <div className="container mx-auto px-6">
          {/* Logo section */}
          <div className="flex justify-center mb-12">
            <RavenclawLogo />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Left column */}
            <div className="text-center md:text-left">
              <h3 className="font-magical text-2xl mb-4 text-[#ffd700]">
                Thank you for visiting!
              </h3>
              <p className="text-[#e4d5b7]/80 font-light italic">
                &ldquo;Wit beyond measure is man&apos;s greatest treasure&rdquo;
              </p>
            </div>

            {/* Right column */}
            <div className="text-center md:text-right">
              <h3 className="font-magical text-2xl mb-4 text-[#ffd700]">
                Stay Connected
              </h3>
              <div className="flex justify-center md:justify-end gap-4">
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="https://instagram.com/charisma.nia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#e4d5b7] hover:text-[#ffd700] transition-colors"
                >
                  <FaInstagram size={24} />
                </motion.a>
              </div>
            </div>
          </div>

          {/* Bottom credits - Fixed structure */}
          <div className="text-center mt-12 pt-8 border-t border-[#ffd700]/10">
            <div className="flex items-center justify-center gap-2 text-sm font-light">
              <span>Made with</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <FaHeart className="text-[#ffd700]" />
              </motion.span>
              <span>for</span>
              <span className="font-magical text-[#ffd700]">Charisma</span>
              <span className="mx-2">|</span>
              <span>{currentYear}</span>
            </div>
            <p className="text-[#e4d5b7]/70 text-sm">
              Made with &ldquo;love&rdquo; and &ldquo;magic&rdquo;
            </p>
          </div>
        </div>

        {/* Decorative bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ffd700]/20 to-transparent" />
      </div>
    </footer>
  );
}