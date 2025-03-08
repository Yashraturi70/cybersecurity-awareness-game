'use client';

import React from 'react';
import { useUser } from '../context/UserContext';
import { challenges } from '../data/challenges';

const achievements = [
  {
    id: 1,
    title: "Security Novice",
    description: "Complete your first challenge",
    icon: "🎯",
    requirement: (progress: any) => progress.completedChallenges.length >= 1
  },
  {
    id: 2,
    title: "Quick Learner",
    description: "Complete 5 quizzes",
    icon: "📚",
    requirement: (progress: any) => progress.quizzesCompleted >= 5
  },
  {
    id: 3,
    title: "Security Expert",
    description: "Reach Expert level",
    icon: "🏆",
    requirement: (progress: any) => progress.level === 'Expert'
  },
  {
    id: 4,
    title: "Perfect Score",
    description: "Complete all challenges with 100% accuracy",
    icon: "⭐",
    requirement: (progress: any) => 
      progress.completedChallenges.length === challenges.length &&
      progress.totalPoints === challenges.reduce((acc, c) => acc + c.points, 0)
  }
];

export default function AchievementsPage() {
  const { state } = useUser();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Your Achievements
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Track your progress and unlock achievements as you learn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map(achievement => {
            const isUnlocked = achievement.requirement(state.progress);
            
            return (
              <div
                key={achievement.id}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border ${
                  isUnlocked ? 'border-green-500' : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="text-4xl mb-4">{achievement.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {achievement.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {achievement.description}
                </p>
                {isUnlocked && (
                  <div className="mt-4">
                    <span className="inline-block px-3 py-1 bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                      Unlocked
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 