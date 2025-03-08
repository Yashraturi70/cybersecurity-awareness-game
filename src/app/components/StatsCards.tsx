'use client';

import React from 'react';
import { useUser } from '../context/UserContext';
import { challenges } from '../data/challenges';

const StatsCards: React.FC = () => {
  const { state } = useUser();
  const { progress } = state;

  const totalChallenges = challenges.length;
  const totalQuizzes = challenges.reduce((acc, challenge) => acc + challenge.quizzes.length, 0);
  const totalPoints = challenges.reduce((acc, challenge) => acc + challenge.points, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      {/* Challenges Completed Card */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">Challenges Completed</span>
          <span className="text-gray-600">🏆</span>
        </div>
        <div className="flex items-end justify-between">
          <div className="text-2xl font-semibold">{progress.completedChallenges.length}/{totalChallenges}</div>
          <div className="text-gray-500 text-sm">
            {((progress.completedChallenges.length / totalChallenges) * 100).toFixed(0)}%
          </div>
        </div>
        <div className="mt-4 bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(progress.completedChallenges.length / totalChallenges) * 100}%` }}
          />
        </div>
      </div>

      {/* Knowledge Level Card */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">Knowledge Level</span>
          <span className="text-gray-600">📚</span>
        </div>
        <div className="flex items-end justify-between">
          <div className="text-2xl font-semibold">{progress.level}</div>
          <div className="text-gray-500 text-sm">{progress.levelProgress.toFixed(0)}%</div>
        </div>
        <div className="mt-4 bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress.levelProgress}%` }}
          />
        </div>
        <div className="mt-2 text-sm text-gray-500">
          {progress.quizzesCompleted} of {totalQuizzes} quizzes completed
        </div>
      </div>

      {/* Points Earned Card */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">Points Earned</span>
          <span className="text-gray-600">⭐</span>
        </div>
        <div className="flex items-end justify-between">
          <div className="text-2xl font-semibold">{Math.round(progress.totalPoints)} pts</div>
          <div className="text-gray-500 text-sm">
            {((progress.totalPoints / totalPoints) * 100).toFixed(0)}%
          </div>
        </div>
        <div className="mt-4 bg-gray-200 rounded-full h-2">
          <div 
            className="bg-purple-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(progress.totalPoints / totalPoints) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default StatsCards; 