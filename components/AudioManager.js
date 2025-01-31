import { useEffect, useRef } from 'react';

export default function AudioManager({ audioUrl, autoPlay = false, volume = 0.5 }) {
  const audioRef = useRef(null);

  useEffect(() => {
    // Create audio element
    const audioElement = new Audio(audioUrl);
    audioElement.volume = volume;
    audioElement.loop = true;
    audioRef.current = audioElement;

    // Handle autoplay
    if (autoPlay) {
      const playAudio = async () => {
        try {
          await audioElement.play();
        } catch (error) {
          console.log("Audio autoplay failed, trying with user interaction:", error);
          // Add a fallback method or user interaction requirement here if needed
        }
      };
      playAudio();
    }

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, [audioUrl, autoPlay, volume]);

  // Add user interaction handler if needed
  useEffect(() => {
    const handleUserInteraction = () => {
      if (audioRef.current && autoPlay) {
        audioRef.current.play().catch(console.log);
      }
    };

    window.addEventListener('click', handleUserInteraction, { once: true });
    return () => window.removeEventListener('click', handleUserInteraction);
  }, [autoPlay]);

  return null;
}
