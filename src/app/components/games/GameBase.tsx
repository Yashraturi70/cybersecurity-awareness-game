'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import Link from 'next/link';

interface GameBaseProps {
  id: number;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  children: React.ReactNode;
  onComplete: (score: number) => void;
}

const GameBase: React.FC<GameBaseProps> = ({
  id,
  title,
  description,
  difficulty,
  duration,
  children,
  onComplete
}) => {
  const { state, completeTopic, updateLearningProgress } = useUser();
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);

  const handleStart = () => {
    setGameStarted(true);
    setStartTime(new Date());
  };

  const handleComplete = (finalScore: number) => {
    setScore(finalScore);
    setGameCompleted(true);
    
    if (startTime) {
      const endTime = new Date();
      const timeSpent = Math.floor((endTime.getTime() - startTime.getTime()) / 60000); // minutes
      updateLearningProgress(timeSpent);
      completeTopic(id, timeSpent);
    }

    onComplete(finalScore);
  };

  const isCompleted = state.learning.completedTopics.includes(id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <div className="text-xl font-semibold text-gray-900 flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-2">
                  <span className="text-white">C</span>
                </div>
                CyberGuard
              </div>
            </Link>
            <Link
              href="/learn"
              className="text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors"
            >
              Return to Learning
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Game Header */}
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-4
            ${difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
              difficulty === 'Intermediate' ? 'bg-blue-100 text-blue-800' :
              'bg-purple-100 text-purple-800'}"
          >
            {difficulty} • {duration}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-xl text-gray-900 max-w-3xl mx-auto mb-8">{description}</p>
        </div>

        {/* Game Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {!gameStarted ? (
            <div className="text-center">
              <button
                onClick={handleStart}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {isCompleted ? 'Play Again' : 'Start Game'}
              </button>
              {isCompleted && (
                <p className="mt-4 text-green-600">
                  ✓ You've completed this game before
                </p>
              )}
            </div>
          ) : gameCompleted ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Game Completed! 🎉
              </h2>
              <p className="text-xl text-gray-900 mb-4">
                Your Score: {score}%
              </p>
              <button
                onClick={() => {
                  setGameStarted(false);
                  setGameCompleted(false);
                  setScore(0);
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Play Again
              </button>
            </div>
          ) : (
            <div className="game-container">
              {children}
            </div>
          )}
        </div>

        {/* Game Tips */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Game Tips</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-900">
            <li>Take your time to learn and understand each concept</li>
            <li>Pay attention to the feedback provided after each action</li>
            <li>Try different approaches to solve challenges</li>
            <li>Review the explanations when you make mistakes</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GameBase; 