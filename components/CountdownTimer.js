'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

export default function CountdownTimer() {
  const [timeElapsed, setTimeElapsed] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isAfterBirthday: false
  });

  // Move date calculations into useMemo
  const dates = useMemo(() => {
    const birthDate = new Date(2002, 1, 1);
    const now = new Date();
    const currentYearBirthday = new Date(now.getFullYear(), 1, 1);
    
    if (now > currentYearBirthday) {
      currentYearBirthday.setFullYear(now.getFullYear() + 1);
    }

    return { birthDate, currentYearBirthday };
  }, []);

  useEffect(() => {
    const calculateTimeElapsed = () => {
      const now = new Date();
      const isAfterBirthday = now >= dates.currentYearBirthday;

      // Calculate age
      let years = now.getFullYear() - dates.birthDate.getFullYear();
      if (now < new Date(now.getFullYear(), dates.birthDate.getMonth(), dates.birthDate.getDate())) {
        years--;
      }

      // Calculate time difference
      const targetDate = isAfterBirthday ? 
        new Date(now.getFullYear() + 1, 1, 1) : 
        dates.currentYearBirthday;

      let diff = Math.abs(targetDate - now);
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      diff -= days * 1000 * 60 * 60 * 24;
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      diff -= hours * 1000 * 60 * 60;
      
      const minutes = Math.floor(diff / (1000 * 60));
      diff -= minutes * 1000 * 60;
      
      const seconds = Math.floor(diff / 1000);

      setTimeElapsed({
        years,
        days: isAfterBirthday ? days : days,
        hours,
        minutes,
        seconds,
        isAfterBirthday
      });
    };

    calculateTimeElapsed();
    const timer = setInterval(calculateTimeElapsed, 1000);

    return () => clearInterval(timer);
  }, [dates]); // Only depend on memoized dates

  return (
    <div className="relative p-4">
      <div className="bg-[#0A1E3F]/90 p-4 sm:p-8 rounded-2xl shadow-[0_0_50px_-12px_rgba(42,75,140,0.25)]
                    border border-[#2A4B8C]/30 backdrop-blur-sm">
        <div className="relative mb-6 sm:mb-8">
          <h3 className="font-magical text-2xl sm:text-3xl text-[#e4d5b7] text-center">
            {timeElapsed.isAfterBirthday ? 
              `H+${timeElapsed.days} Since Your Birthday` : 
              `H-${timeElapsed.days} Until Your Birthday`}
          </h3>
          <div className="absolute -left-8 -top-4 stars-animation"></div>
          <div className="absolute -right-8 -top-4 stars-animation delay-75"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          {[
            { value: timeElapsed.years, label: 'Years Old' },
            { value: timeElapsed.days, label: timeElapsed.isAfterBirthday ? 'Days Since' : 'Days Until' },
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
          {timeElapsed.isAfterBirthday ? 
            `${timeElapsed.days} days since your ${timeElapsed.years}th birthday ✨` : 
            `${timeElapsed.days} days until your ${timeElapsed.years + 1}th birthday ✨`}
        </div>
      </div>
    </div>
  );
}