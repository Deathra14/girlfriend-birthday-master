import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShare, FaInstagram, FaWhatsapp, FaTimes } from 'react-icons/fa';

export default function SocialShare() {
  const [isExpanded, setIsExpanded] = useState(false);
  const shareMessage = "Check out this amazing birthday website my love made for me! 💖";

  const handleInstagramShare = () => {
    // Instagram doesn't allow direct sharing, so we'll open the app
    if (navigator.share) {
      navigator.share({
        title: 'Happy Birthday!',
        text: shareMessage,
        url: window.location.href,
      });
    } else {
      window.open(`https://www.instagram.com/`, '_blank');
    }
  };

  const handleWhatsAppShare = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareMessage + '\n' + window.location.href)}`,
      '_blank'
    );
  };

  return (
    <div className="relative">
      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-12 h-12 rounded-full bg-[#192341] border border-[#ffd700]/30
                 flex items-center justify-center text-[#ffd700] shadow-lg
                 hover:border-[#ffd700]/50 transition-all"
      >
        {isExpanded ? <FaTimes /> : <FaShare />}
      </motion.button>

      {/* Share Menu */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="absolute bottom-16 right-0 bg-[#192341] rounded-lg 
                     border border-[#ffd700]/20 shadow-2xl overflow-hidden
                     w-[200px]"
          >
            <div className="p-3 border-b border-[#ffd700]/10">
              <h3 className="font-magical text-[#ffd700] text-sm text-center">
                Share The Magic
              </h3>
            </div>

            <div className="p-2">
              {[
                { icon: <FaInstagram />, text: "Instagram", onClick: handleInstagramShare },
                { icon: <FaWhatsapp />, text: "WhatsApp", onClick: handleWhatsAppShare }
              ].map((btn, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={btn.onClick}
                  className="w-full p-3 flex items-center gap-3 text-[#e4d5b7]
                           hover:bg-[#ffd700]/10 rounded-lg transition-all"
                >
                  {btn.icon}
                  <span className="text-sm">{btn.text}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}