'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'Password Security' | 'Social Engineering' | 'Network Security' | 'Encryption' | 'Web Security' | 'Mobile Security';
  points: number;
  estimatedTime: string;
  path: string;
}

const challenges: Challenge[] = [
  // Password Security Challenges
  {
    id: 'password-defense',
    title: 'Password Defense',
    description: 'Test your password strength and learn to create unbreakable passwords.',
    difficulty: 'Beginner',
    category: 'Password Security',
    points: 100,
    estimatedTime: '10-15 min',
    path: '/games/password-defense'
  },
  {
    id: 'password-manager-quest',
    title: 'Password Manager Quest',
    description: 'Learn to effectively use password managers to secure your accounts.',
    difficulty: 'Beginner',
    category: 'Password Security',
    points: 150,
    estimatedTime: '15-20 min',
    path: '/games/password-manager-quest'
  },

  // Social Engineering Challenges
  {
    id: 'phishing-detective',
    title: 'Phishing Detective',
    description: 'Analyze emails and identify potential phishing attempts.',
    difficulty: 'Intermediate',
    category: 'Social Engineering',
    points: 200,
    estimatedTime: '20-25 min',
    path: '/games/phishing-detective'
  },
  {
    id: 'social-engineering-defender',
    title: 'Social Engineering Defender',
    description: 'Protect against various social engineering attacks in real-world scenarios.',
    difficulty: 'Intermediate',
    category: 'Social Engineering',
    points: 250,
    estimatedTime: '25-30 min',
    path: '/games/social-engineering-defender'
  },
  {
    id: 'impersonation-spotter',
    title: 'Impersonation Spotter',
    description: 'Learn to identify and prevent impersonation attacks.',
    difficulty: 'Intermediate',
    category: 'Social Engineering',
    points: 200,
    estimatedTime: '15-20 min',
    path: '/games/impersonation-spotter'
  },

  // Network Security Challenges
  {
    id: 'network-defender',
    title: 'Network Defender',
    description: 'Protect a network from common cyber attacks.',
    difficulty: 'Advanced',
    category: 'Network Security',
    points: 300,
    estimatedTime: '30-35 min',
    path: '/games/network-defender'
  },
  {
    id: 'firewall-master',
    title: 'Firewall Master',
    description: 'Configure firewalls to protect against network threats.',
    difficulty: 'Advanced',
    category: 'Network Security',
    points: 350,
    estimatedTime: '25-30 min',
    path: '/games/firewall-master'
  },

  // Encryption Challenges
  {
    id: 'encryption-puzzle',
    title: 'Encryption Puzzle',
    description: 'Solve puzzles using various encryption techniques.',
    difficulty: 'Advanced',
    category: 'Encryption',
    points: 400,
    estimatedTime: '35-40 min',
    path: '/games/encryption-puzzle'
  },
  {
    id: 'crypto-challenge',
    title: 'Crypto Challenge',
    description: 'Master cryptographic principles through interactive challenges.',
    difficulty: 'Advanced',
    category: 'Encryption',
    points: 450,
    estimatedTime: '40-45 min',
    path: '/games/crypto-challenge'
  },

  // Web Security Challenges
  {
    id: 'xss-defender',
    title: 'XSS Defender',
    description: 'Learn to identify and prevent cross-site scripting attacks.',
    difficulty: 'Intermediate',
    category: 'Web Security',
    points: 250,
    estimatedTime: '25-30 min',
    path: '/games/xss-defender'
  },
  {
    id: 'sql-injection-preventer',
    title: 'SQL Injection Preventer',
    description: 'Protect web applications from SQL injection attacks.',
    difficulty: 'Advanced',
    category: 'Web Security',
    points: 350,
    estimatedTime: '30-35 min',
    path: '/games/sql-injection-preventer'
  },

  // Mobile Security Challenges
  {
    id: 'mobile-security-guardian',
    title: 'Mobile Security Guardian',
    description: 'Learn to secure your mobile devices and apps.',
    difficulty: 'Beginner',
    category: 'Mobile Security',
    points: 150,
    estimatedTime: '15-20 min',
    path: '/games/mobile-security-guardian'
  },
  {
    id: 'app-permission-masters',
    title: 'App Permission Masters',
    description: 'Master the art of managing app permissions and privacy settings.',
    difficulty: 'Intermediate',
    category: 'Mobile Security',
    points: 200,
    estimatedTime: '20-25 min',
    path: '/games/app-permission-masters'
  }
];

export default function GamesPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredChallenges = selectedCategory
    ? challenges.filter(challenge => challenge.category === selectedCategory)
    : challenges;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Advanced':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Password Security':
        return selectedCategory === category 
          ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
          : 'border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20';
      case 'Social Engineering':
        return selectedCategory === category 
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
          : 'border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20';
      case 'Network Security':
        return selectedCategory === category 
          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
          : 'border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20';
      case 'Encryption':
        return selectedCategory === category 
          ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' 
          : 'border-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20';
      case 'Web Security':
        return selectedCategory === category 
          ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
          : 'border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20';
      case 'Mobile Security':
        return selectedCategory === category 
          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
          : 'border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20';
      default:
        return 'border-gray-500';
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Cybersecurity Challenges</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Test your skills with interactive cybersecurity challenges</p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Categories</h2>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                Clear Filter
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-4">
            {Array.from(new Set(challenges.map(c => c.category))).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                className={`px-4 py-2 rounded-full border-2 transition-colors duration-200 ${getCategoryColor(category)} text-gray-700 dark:text-gray-300`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Challenge Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredChallenges.map((challenge) => (
            <div
              key={challenge.id}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 border-t-4 ${getCategoryColor(challenge.category)}`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{challenge.estimatedTime}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{challenge.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{challenge.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{challenge.points} points</span>
                  <button
                    onClick={() => router.push(challenge.path)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                  >
                    Start Challenge
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredChallenges.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">No challenges found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
} 