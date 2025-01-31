'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function CountdownTimer() {
  const [timeElapsed, setTimeElapsed] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isBirthday: false
  });

  // Update birthDate in useMemo
  const dates = useMemo(() => {
    const birthDate = new Date(2002, 1, 1); // February 1st, 2002
    const now = new Date();
    const currentYearBirthday = new Date(now.getFullYear(), 1, 1); // February 1st current year
    
    return { birthDate, currentYearBirthday };
  }, []);

  // Add confetti effect function
  const runBirthdayConfetti = () => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Burst confetti from both sides
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  useEffect(() => {
    const calculateTimeElapsed = () => {
      const now = new Date();
      
      // Check if today is birthday
      const isBirthday = now.getDate() === 1 && now.getMonth() === 1;
      
      // Calculate next birthday
      const currentYear = now.getFullYear();
      const nextBirthday = new Date(currentYear, 1, 1);
      if (now > nextBirthday) {
        nextBirthday.setFullYear(currentYear + 1);
      }

      // Time calculations
      let diff = nextBirthday - now;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      diff -= days * 1000 * 60 * 60 * 24;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      diff -= hours * 1000 * 60 * 60;
      const minutes = Math.floor(diff / (1000 * 60));
      diff -= minutes * 1000 * 60;
      const seconds = Math.floor(diff / 1000);

      // Calculate age
      let age = currentYear - dates.birthDate.getFullYear();
      if (now < new Date(currentYear, dates.birthDate.getMonth(), dates.birthDate.getDate())) {
        age--;
      }

      // Run confetti if it's birthday
      if (isBirthday) {
        runBirthdayConfetti();
      }

      setTimeElapsed({
        years: age,
        days,
        hours,
        minutes,
        seconds,
        isBirthday
      });
    };

    calculateTimeElapsed();
    const timer = setInterval(calculateTimeElapsed, 1000);

    return () => clearInterval(timer);
  }, [dates]);

  const formatMessage = (days, isBirthday) => {
    if (isBirthday) {
      return (
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            color: ['#ffd700', '#ff69b4', '#ffd700']
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="relative"
        >
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-magical 
                       bg-gradient-to-r from-[#ffd700] via-[#ff69b4] to-[#ffd700]
                       text-transparent bg-clip-text
                       filter drop-shadow-[0_2px_8px_rgba(255,215,0,0.3)]">
            🎉 Today is Your Birthday! 🎉
          </h3>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -inset-4 bg-gradient-to-r from-[#ffd700]/10 via-[#ff69b4]/10 to-[#ffd700]/10 
                     rounded-full blur-xl"
          />
        </motion.div>
      );
    }

    return (
      <motion.div className="relative">
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-magical 
                     bg-gradient-to-r from-[#4B6CB7] via-[#ffd700] to-[#4B6CB7]
                     text-transparent bg-clip-text
                     filter drop-shadow-[0_2px_8px_rgba(75,108,183,0.3)]">
          {`${days} Days Until Your Birthday`}
        </h3>
        <motion.span
          animate={{ width: ['0%', '100%', '0%'] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-[#ffd700]/50 to-transparent"
        />
      </motion.div>
    );
  };

  return (
    <div className="relative p-4">
      <div className="bg-gradient-to-br from-[#0A1E3F] to-[#192341] p-6 sm:p-8 rounded-2xl
                    shadow-[0_0_50px_-12px_rgba(42,75,140,0.25)] border border-[#2A4B8C]/30
                    backdrop-blur-sm relative overflow-hidden">
        {/* Birthday celebration effects */}
        {timeElapsed.isBirthday && (
          <motion.div className="absolute inset-0">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2"
                animate={{
                  y: [0, -100],
                  x: [-20, 20],
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: `radial-gradient(circle, ${
                    ['#ffd700', '#ff69b4', '#4B6CB7'][Math.floor(Math.random() * 3)]
                  } 0%, transparent 70%)`
                }}
              />
            ))}
          </motion.div>
        )}

        {/* Enhanced header message */}
        <div className="relative mb-8 text-center">
          {formatMessage(timeElapsed.days, timeElapsed.isBirthday)}
        </div>

        {/* Rest of the countdown display */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          {[
            { value: timeElapsed.years, label: 'Years Old' },
            { value: timeElapsed.days, label: timeElapsed.isBirthday ? 'Days Since' : 'Days Until' },
            { value: timeElapsed.hours, label: 'Hours' },
            { value: timeElapsed.minutes, label: 'Minutes' },
            { value: timeElapsed.seconds, label: 'Seconds' }
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="bg-[#1a2d4c] p-4 rounded-xl border border-[#2A4B8C]/50
                            transform transition-transform duration-300 group-hover:scale-105">
                <div className="relative">
                  <div className="font-magical text-3xl md:text-4xl text-[#ffd700]
                                animate-pulse-slow">
                    {item.value}
                  </div>
                  <div className="text-[#e4d5b7]/80 text-sm mt-2 font-light tracking-wider">
                    {item.label}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 sm:mt-8 text-[#e4d5b7] font-magical text-lg sm:text-xl text-center">
          {timeElapsed.isBirthday ? 
            `${timeElapsed.days} days since your ${timeElapsed.years}th birthday ✨` : 
            `${timeElapsed.days} days until your ${timeElapsed.years + 1}th birthday ✨`}
        </div>
      </div>
    </div>
  );
}