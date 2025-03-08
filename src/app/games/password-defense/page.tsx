'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface PasswordCriteria {
  minLength: boolean;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

interface Attack {
  type: string;
  description: string;
  requirement: (criteria: PasswordCriteria) => boolean;
  learningResources?: {
    articles?: string[];
    videos?: string[];
  };
}

export default function PasswordDefensePage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [currentAttack, setCurrentAttack] = useState<Attack | null>(null);
  const [feedback, setFeedback] = useState('');

  const attacks: Attack[] = [
    {
      type: 'Brute Force',
      description: 'Attempting to crack your password by trying every possible combination',
      requirement: (criteria) => criteria.minLength && criteria.hasNumber,
      learningResources: {
        articles: [
          "https://www.nist.gov/blogs/cybersecurity-insights/password-guidance-how-keep-your-passwords-strong",
          "https://www.cisa.gov/news-events/news/password-security"
        ],
        videos: [
          "https://www.youtube.com/watch?v=3NjQ9b3pgIg",
          "https://www.youtube.com/watch?v=PYJtRWEqhy0"
        ]
      }
    },
    {
      type: 'Dictionary Attack',
      description: 'Using common words and passwords to guess your password',
      requirement: (criteria) => criteria.hasSpecialChar && criteria.hasUpperCase,
      learningResources: {
        articles: [
          "https://www.sans.org/blog/password-complexity-vs-length/",
          "https://www.ncsc.gov.uk/collection/passwords/updating-your-approach"
        ],
        videos: [
          "https://www.youtube.com/watch?v=7U-RbOKanYs"
        ]
      }
    },
    {
      type: 'Pattern Analysis',
      description: 'Looking for common patterns in your password',
      requirement: (criteria) => criteria.hasLowerCase && criteria.hasUpperCase && criteria.hasNumber,
      learningResources: {
        articles: [
          "https://www.microsoft.com/security/blog/2020/07/08/10-password-best-practices/",
          "https://security.harvard.edu/use-strong-passwords"
        ],
        videos: [
          "https://www.youtube.com/watch?v=opRMrEfAIiI",
          "https://www.youtube.com/watch?v=IgCHcuCw_RQ"
        ]
      }
    }
  ];

  const checkPasswordStrength = (password: string): PasswordCriteria => {
    return {
      minLength: password.length >= 12,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
  };

  const calculateScore = (criteria: PasswordCriteria): number => {
    let score = 0;
    if (criteria.minLength) score += 20;
    if (criteria.hasUpperCase) score += 20;
    if (criteria.hasLowerCase) score += 20;
    if (criteria.hasNumber) score += 20;
    if (criteria.hasSpecialChar) score += 20;
    return score;
  };

  const launchAttack = () => {
    if (gameOver) return;

    const criteria = checkPasswordStrength(password);
    const availableAttacks = attacks.filter(attack => !attack.requirement(criteria));
    
    if (availableAttacks.length === 0) {
      setGameOver(true);
      setFeedback('Congratulations! Your password successfully defended against all attacks!');
      return;
    }

    const attack = availableAttacks[Math.floor(Math.random() * availableAttacks.length)];
    setCurrentAttack(attack);
    setFeedback(`Warning: ${attack.type} detected! ${attack.description}`);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const criteria = checkPasswordStrength(newPassword);
    setScore(calculateScore(criteria));
  };

  const getScoreColor = () => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const goToNextChallenge = () => {
    const challengeOrder = [
      '/games/password-defense',
      '/games/password-manager-quest',
      '/games/phishing-detective',
      '/games/social-engineering-defender',
      '/games/impersonation-spotter',
      '/games/network-defender',
      '/games/firewall-master',
      '/games/encryption-puzzle',
      '/games/crypto-challenge',
      '/games/xss-defender',
      '/games/sql-injection-preventer',
      '/games/mobile-security-guardian',
      '/games/app-permission-masters'
    ];
    
    const currentIndex = challengeOrder.indexOf('/games/password-defense');
    if (currentIndex < challengeOrder.length - 1) {
      router.push(challengeOrder[currentIndex + 1]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Password Defense Challenge</h1>
        <p className="text-gray-600 dark:text-gray-400">Create a strong password to defend against cyber attacks</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Enter Password
          </label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter a strong password"
            disabled={gameOver}
          />
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Password Strength</span>
            <span className={`text-sm font-bold ${getScoreColor()}`}>{score}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${
                score >= 80 ? 'bg-green-600' : score >= 60 ? 'bg-yellow-600' : 'bg-red-600'
              }`}
              style={{ width: `${score}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <div className={`w-4 h-4 rounded-full mr-2 ${password.length >= 12 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">At least 12 characters long</span>
          </div>
          <div className="flex items-center">
            <div className={`w-4 h-4 rounded-full mr-2 ${/[A-Z]/.test(password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Contains uppercase letters</span>
          </div>
          <div className="flex items-center">
            <div className={`w-4 h-4 rounded-full mr-2 ${/[a-z]/.test(password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Contains lowercase letters</span>
          </div>
          <div className="flex items-center">
            <div className={`w-4 h-4 rounded-full mr-2 ${/[0-9]/.test(password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Contains numbers</span>
          </div>
          <div className="flex items-center">
            <div className={`w-4 h-4 rounded-full mr-2 ${/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Contains special characters</span>
          </div>
        </div>

        {!gameOver && (
          <button
            onClick={launchAttack}
            className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            disabled={!password}
          >
            Test Password Against Attacks
          </button>
        )}

        {feedback && (
          <div className={`mt-6 p-4 rounded-md ${gameOver ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
            <p className={`text-sm ${gameOver ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
              {feedback}
            </p>

            {/* Learning Resources for Failed Attacks */}
            {!gameOver && currentAttack?.learningResources && (
              <div className="mt-6 bg-white dark:bg-gray-700 p-4 rounded-lg">
                <h4 className="font-medium mb-3 text-gray-900 dark:text-white">Learning Resources:</h4>
                
                {currentAttack.learningResources.articles && currentAttack.learningResources.articles.length > 0 && (
                  <div className="mb-4">
                    <h5 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Articles:</h5>
                    <ul className="list-disc pl-5 space-y-2">
                      {currentAttack.learningResources.articles.map((article, index) => (
                        <li key={index}>
                          <a 
                            href={article}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                          >
                            {article.includes('nist.gov') ? 'NIST Password Guidelines' :
                             article.includes('cisa.gov') ? 'CISA Security Guide' :
                             article.includes('sans.org') ? 'SANS Password Guide' :
                             article.includes('microsoft.com') ? 'Microsoft Security Best Practices' :
                             article.includes('harvard.edu') ? 'Harvard Security Guidelines' :
                             'Learn More'}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {currentAttack.learningResources.videos && currentAttack.learningResources.videos.length > 0 && (
                  <div>
                    <h5 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Videos:</h5>
                    <ul className="list-disc pl-5 space-y-2">
                      {currentAttack.learningResources.videos.map((video, index) => (
                        <li key={index}>
                          <a 
                            href={video}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                          >
                            Watch Tutorial {index + 1}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {gameOver && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Challenge Complete!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You scored {score}% on the Password Defense challenge!
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
              <button
                onClick={() => router.push('/games')}
                className="bg-gray-600 text-white py-2 px-6 rounded-md hover:bg-gray-700 transition-colors"
              >
                Back to Challenges
              </button>
              <button
                onClick={() => {
                  setPassword('');
                  setScore(0);
                  setGameOver(false);
                  setCurrentAttack(null);
                  setFeedback('');
                }}
                className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={goToNextChallenge}
                className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition-colors"
              >
                Next Challenge
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 