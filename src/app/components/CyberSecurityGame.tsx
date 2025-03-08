'use client';

import React, { useState, useEffect } from 'react';
import { questions, Question } from '../data/questions';

const CyberSecurityGame: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStarted && !showExplanation && !gameCompleted) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleAnswer(-1); // Time's up
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, currentQuestionIndex, showExplanation, gameCompleted]);

  const handleStartGame = () => {
    setGameStarted(true);
    setScore(0);
    setCurrentQuestionIndex(0);
    setGameCompleted(false);
    setTimeLeft(30);
  };

  const handleAnswer = (selectedIndex: number) => {
    const currentQuestion = questions[currentQuestionIndex];
    setSelectedAnswer(selectedIndex);
    setShowExplanation(true);
    setTimeLeft(30);

    if (selectedIndex === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setShowExplanation(false);
      setSelectedAnswer(null);
    } else {
      setGameCompleted(true);
    }
  };

  if (!gameStarted || gameCompleted) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
          {gameCompleted ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Game Completed!</h2>
              <p className="text-xl mb-4">Your Score: {score}/{questions.length}</p>
              <p className="mb-4">
                {score === questions.length
                  ? "Perfect score! You're a cybersecurity expert! 🏆"
                  : score >= questions.length * 0.7
                  ? "Great job! You have good cybersecurity awareness! 🌟"
                  : "Keep learning about cybersecurity! Try again to improve your score. 📚"}
              </p>
              <button
                onClick={handleStartGame}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Play Again
              </button>
            </div>
          ) : (
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">Cybersecurity Awareness Game</h1>
              <p className="mb-6">Test your knowledge about cybersecurity with 20 interactive questions!</p>
              <button
                onClick={handleStartGame}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Start Game
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
        <div className="mb-4 flex justify-between items-center">
          <span className="text-lg font-semibold">
            Question {currentQuestionIndex + 1}/{questions.length}
          </span>
          <span className="text-lg font-semibold">Score: {score}</span>
        </div>
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${(timeLeft / 30) * 100}%` }}
            ></div>
          </div>
          <p className="text-center mt-2">Time left: {timeLeft}s</p>
        </div>
        <h2 className="text-xl font-bold mb-4">{currentQuestion.question}</h2>
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showExplanation && handleAnswer(index)}
              className={`w-full p-3 text-left rounded-lg transition-colors ${
                showExplanation
                  ? index === currentQuestion.correctAnswer
                    ? 'bg-green-100 border-green-500'
                    : index === selectedAnswer
                    ? 'bg-red-100 border-red-500'
                    : 'bg-gray-100'
                  : 'bg-gray-100 hover:bg-gray-200'
              } border ${
                showExplanation &&
                (index === currentQuestion.correctAnswer || index === selectedAnswer)
                  ? 'border-2'
                  : 'border'
              }`}
              disabled={showExplanation}
            >
              {option}
            </button>
          ))}
        </div>
        {showExplanation && (
          <div className="mt-4">
            <p className="text-gray-700 bg-blue-50 p-4 rounded-lg">
              {currentQuestion.explanation}
            </p>
            <button
              onClick={handleNext}
              className="mt-4 w-full bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              {currentQuestionIndex === questions.length - 1 ? "Finish Game" : "Next Question"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CyberSecurityGame; 