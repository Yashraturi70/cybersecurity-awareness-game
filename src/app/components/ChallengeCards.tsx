'use client';

import React, { useState } from 'react';
import { Challenge } from '../types';
import { useUser } from '../context/UserContext';
import QuizView from './QuizView';

interface ChallengeCardsProps {
  challenges: Challenge[];
}

const ChallengeCards: React.FC<ChallengeCardsProps> = ({ challenges }) => {
  const { state, startChallenge, completeQuiz, resetChallenge } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'available' | 'completed' | 'locked'>('all');

  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' ? true :
                         filter === 'completed' ? state.progress.completedChallenges.includes(challenge.id) :
                         filter === 'available' ? !state.progress.completedChallenges.includes(challenge.id) :
                         false;

    return matchesSearch && matchesFilter;
  });

  if (state.currentChallenge) {
    const currentQuiz = state.currentChallenge.quizzes[state.currentQuizIndex];
    
    if (state.currentQuizIndex >= state.currentChallenge.quizzes.length) {
      return (
        <div className="max-w-2xl mx-auto text-center p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Challenge Completed! 🎉</h2>
          <p className="text-gray-900 mb-6">
            You've completed the {state.currentChallenge.title} challenge.
          </p>
          <button
            onClick={resetChallenge}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Return to Challenges
          </button>
        </div>
      );
    }

    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{state.currentChallenge.title}</h2>
          <p className="text-gray-900">Question {state.currentQuizIndex + 1} of {state.currentChallenge.quizzes.length}</p>
        </div>
        <QuizView quiz={currentQuiz} onComplete={completeQuiz} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Security Challenges</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search challenges..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute left-3 top-2.5">🔍</span>
        </div>
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium ${
            filter === 'all' ? 'bg-gray-100 text-gray-900' : 'text-gray-900'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('available')}
          className={`px-4 py-2 rounded-lg font-medium ${
            filter === 'available' ? 'bg-gray-100 text-gray-900' : 'text-gray-900'
          }`}
        >
          Available
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded-lg font-medium ${
            filter === 'completed' ? 'bg-gray-100 text-gray-900' : 'text-gray-900'
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter('locked')}
          className={`px-4 py-2 rounded-lg font-medium ${
            filter === 'locked' ? 'bg-gray-100 text-gray-900' : 'text-gray-900'
          }`}
        >
          Locked
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChallenges.map((challenge) => {
          const isCompleted = state.progress.completedChallenges.includes(challenge.id);
          const progress = isCompleted ? 100 : 0;

          return (
            <div
              key={challenge.id}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">{challenge.icon}</span>
                <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                  {challenge.difficulty}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{challenge.title}</h3>
              <p className="text-gray-900 mb-4">{challenge.description}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium text-blue-700">{challenge.points} points</span>
                {isCompleted && <span className="text-green-700 font-medium">✓ Completed</span>}
              </div>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <button
                  onClick={() => startChallenge(challenge)}
                  className={`w-full py-2 px-4 rounded-lg font-medium ${
                    isCompleted
                      ? 'bg-gray-100 text-gray-600'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isCompleted ? 'Review Challenge' : 'Start Challenge'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChallengeCards; 