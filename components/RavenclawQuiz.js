import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFeather, FaCrown } from 'react-icons/fa';

export default function RavenclawQuiz({ isOpen, setIsOpen }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const questions = [
    {
      question: "When was your lovely Charisma born?",
      answers: ["1 February 2002", "2 February 2002", "1 January 2002", "2 January 2002"],
      correct: 0,
      fact: "A special day when a future Ravenclaw was born! 🦅"
    },
    {
      question: "What&apos;s Charisma&apos;s favorite Harry Potter character?",
      answers: ["Luna Lovegood", "Hermione Granger", "Cho Chang", "Rowena Ravenclaw"],
      correct: 0,
      fact: "Witty and unique, just like Luna! ✨"
    },
    {
      question: "What are Ravenclaw&apos;s house colors?",
      answers: ["Blue and Bronze", "Blue and Silver", "Purple and Silver", "Purple and Gold"],
      correct: 0,
      fact: "The colors of wisdom and elegance! 💫"
    }
  ];

  const handleAnswer = (answerIndex) => {
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsComplete(true);
    }
  };

  return (
    <div className="relative my-20"> {/* Added relative positioning */}
      {/* Quiz Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 bg-[#192341] rounded-xl border border-[#2A4B8C]/30
                 hover:border-[#ffd700]/30 transition-all duration-300"
      >
        <h3 className="font-magical text-2xl text-[#ffd700] mb-2">
          Ravenclaw&apos;s Challenge
        </h3>
        <p className="text-[#e4d5b7] text-sm">
          Test your knowledge about your love
        </p>
      </motion.button>

      {/* Quiz Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 mt-4 bg-[#192341] rounded-xl
                     border border-[#2A4B8C]/30 p-6 shadow-xl z-20"
          >
            {!showQuiz ? (
              <motion.div
                className="text-center relative z-10" // Added z-index
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="relative inline-block">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-[#0A1E3F] via-[#2A4B8C] to-[#0A1E3F] rounded-xl opacity-50 blur-xl"
                  />
                  <button
                    onClick={() => setShowQuiz(true)}
                    className="relative px-12 py-6 bg-[#0A1E3F] text-[#b7b7b7] rounded-xl
                             border border-[#2A4B8C] shadow-xl hover:shadow-[#2A4B8C]/50
                             transition-all duration-300 group overflow-hidden
                             cursor-pointer" // Added cursor-pointer
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#2A4B8C] to-[#0A1E3F] opacity-0 
                                  group-hover:opacity-20 transition-opacity duration-300"/>
                    <div className="flex flex-col items-center gap-4">
                      <FaFeather className="text-3xl text-[#b7b7b7] animate-float" />
                      <h3 className="text-2xl font-magical">Test Your Knowledge</h3>
                      <p className="text-sm text-[#b7b7b7]/80">
                        It&apos;s time to test your knowledge!
                      </p>
                      <p className="text-center text-[#e4d5b7]/70 text-sm">
                        &ldquo;Knowledge isn&apos;t just power - it&apos;s wonder and delight!&rdquo;
                      </p>
                    </div>
                  </button>
                </div>
              </motion.div>
            ) : (
              <AnimatePresence mode='wait'>
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="max-w-3xl mx-auto relative z-20" // Added z-index
                >
                  <div className="bg-[#0A1E3F] p-8 rounded-xl border border-[#2A4B8C] shadow-2xl">
                    {!isComplete ? (
                      <>
                        <div className="text-center mb-8">
                          <div className="flex justify-center gap-2 mb-4">
                            {questions.map((_, index) => (
                              <div
                                key={index}
                                className={`h-2 w-12 rounded-full transition-all duration-300 ${
                                  index === currentQuestion ? 'bg-[#2A4B8C]' : 'bg-[#b7b7b7]/20'
                                }`}
                              />
                            ))}
                          </div>
                          <h3 className="text-3xl font-magical text-[#b7b7b7] mb-2">
                            {questions[currentQuestion].question}
                          </h3>
                        </div>

                        <div className="grid gap-4">
                          {questions[currentQuestion].answers.map((answer, index) => (
                            <motion.button
                              key={index}
                              onClick={() => handleAnswer(index)}
                              className="p-4 bg-[#162B50] rounded-lg text-left text-[#b7b7b7] 
                                       hover:bg-[#2A4B8C] transition-all duration-300
                                       border border-[#2A4B8C]/50 group relative overflow-hidden"
                              whileHover={{ scale: 1.02 }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-[#2A4B8C] to-transparent 
                                            opacity-0 group-hover:opacity-20 transition-opacity duration-300"/>
                              <span className="relative z-10">{answer}</span>
                            </motion.button>
                          ))}
                        </div>
                      </>
                    ) : (
                      <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="text-center py-8"
                      >
                        <FaCrown className="text-5xl text-[#ffd700] mx-auto mb-6" />
                        <h3 className="text-3xl font-magical text-[#b7b7b7] mb-4">
                          Your Magical Score
                        </h3>
                        <div className="text-6xl font-magical text-[#2A4B8C] mb-6">
                          {score}/{questions.length}
                        </div>
                        {score === questions.length ? (
                          <p className="text-[#ffd700] text-xl font-magical">
                            &ldquo;Wit beyond measure is man&apos;s greatest treasure!&rdquo;
                          </p>
                        ) : (
                          <p className="text-[#b7b7b7] italic">
                            Keep learning about your special one!
                          </p>
                        )}
                        <motion.button
                          onClick={() => {
                            setShowQuiz(false);
                            setCurrentQuestion(0);
                            setScore(0);
                            setIsComplete(false);
                          }}
                          className="mt-8 px-8 py-3 bg-[#2A4B8C] text-[#b7b7b7] rounded-lg
                                   hover:bg-[#3A5B9C] transition-colors"
                          whileHover={{ scale: 1.05 }}
                        >
                          Try Again
                        </motion.button>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
