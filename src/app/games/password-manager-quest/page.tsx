'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Scenario {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  learningResources?: {
    articles?: string[];
    videos?: string[];
  };
}

export default function PasswordManagerQuestPage() {
  const router = useRouter();
  const [currentScenario, setCurrentScenario] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [gameComplete, setGameComplete] = useState(false);

  const scenarios: Scenario[] = [
    {
      id: 1,
      question: "You want to create a master password for your password manager. Which of these would be the most secure?",
      options: [
        "A single word with special characters (P@ssw0rd!)",
        "Your birth date and name (John1990!)",
        "A long passphrase with random words (correct-horse-battery-staple)",
        "Your favorite movie title (Avatar2009)"
      ],
      correctAnswer: 2,
      explanation: "A long passphrase with random words is more secure and easier to remember than complex but short passwords. It provides better entropy while being memorable.",
      learningResources: {
        articles: [
          "https://www.lastpass.com/features/password-generator",
          "https://bitwarden.com/blog/how-to-create-a-strong-master-password/"
        ],
        videos: [
          "https://www.youtube.com/watch?v=3NjQ9b3pgIg",
          "https://www.youtube.com/watch?v=opRMrEfAIiI"
        ]
      }
    },
    {
      id: 2,
      question: "What should you do if a website where you have an account reports a data breach?",
      options: [
        "Wait and see if your account is affected",
        "Immediately change only that website's password",
        "Change your password manager's master password",
        "Change the breached site's password and any other sites where you used similar passwords"
      ],
      correctAnswer: 3,
      explanation: "In case of a breach, you should change the affected password and any similar passwords used elsewhere. This prevents credential stuffing attacks.",
      learningResources: {
        articles: [
          "https://haveibeenpwned.com/",
          "https://www.cisa.gov/news-events/news/what-do-after-data-breach"
        ],
        videos: [
          "https://www.youtube.com/watch?v=PYJtRWEqhy0",
          "https://www.youtube.com/watch?v=IgCHcuCw_RQ"
        ]
      }
    },
    {
      id: 3,
      question: "Which feature should you look for in a password manager to enhance security?",
      options: [
        "Ability to share passwords with anyone",
        "Two-factor authentication support",
        "Automatic password saving",
        "Cloud synchronization"
      ],
      correctAnswer: 1,
      explanation: "Two-factor authentication adds an extra layer of security to your password manager, protecting your passwords even if your master password is compromised.",
      learningResources: {
        articles: [
          "https://www.nist.gov/blogs/cybersecurity-insights/back-basics-multi-factor-authentication",
          "https://www.sans.org/blog/2fa-mfa-difference/"
        ],
        videos: [
          "https://www.youtube.com/watch?v=Q7153z9I1Zw",
          "https://www.youtube.com/watch?v=0mvCeNsTa1g"
        ]
      }
    },
    {
      id: 4,
      question: "How often should you update your password manager's master password?",
      options: [
        "Every week",
        "Only when there's a security breach",
        "Every 3-6 months",
        "Never, if it's strong enough"
      ],
      correctAnswer: 2,
      explanation: "Regular password updates (every 3-6 months) help maintain security. However, don't change it so frequently that you're tempted to use a weaker, more memorable password.",
      learningResources: {
        articles: [
          "https://www.microsoft.com/security/blog/2019/08/20/evolving-password-policy/",
          "https://pages.nist.gov/800-63-3/sp800-63b.html"
        ],
        videos: [
          "https://www.youtube.com/watch?v=7U-RbOKanYs",
          "https://www.youtube.com/watch?v=3NjQ9b3pgIg"
        ]
      }
    },
    {
      id: 5,
      question: "What should you do with your old password manager when switching to a new one?",
      options: [
        "Keep both active for convenience",
        "Delete it immediately",
        "Export passwords, verify the transfer, then securely delete the old manager",
        "Leave it installed but unused"
      ],
      correctAnswer: 2,
      explanation: "When switching password managers, ensure all passwords are properly transferred and verified in the new manager before securely removing the old one to prevent unauthorized access.",
      learningResources: {
        articles: [
          "https://bitwarden.com/help/import-from-lastpass/",
          "https://support.1password.com/migrate-1password-account/"
        ],
        videos: [
          "https://www.youtube.com/watch?v=h8PLDguZ4ME",
          "https://www.youtube.com/watch?v=4PZb0Vy8tIs"
        ]
      }
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    if (answerIndex === scenarios[currentScenario].correctAnswer) {
      setScore(score + 20);
    }
  };

  const nextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setGameComplete(true);
    }
  };

  const resetGame = () => {
    setCurrentScenario(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setGameComplete(false);
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
    
    const currentIndex = challengeOrder.indexOf('/games/password-manager-quest');
    if (currentIndex < challengeOrder.length - 1) {
      router.push(challengeOrder[currentIndex + 1]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Password Manager Quest</h1>
        <p className="text-gray-600 dark:text-gray-400">Master the art of using password managers securely</p>
      </div>

      {!gameComplete ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {currentScenario + 1} of {scenarios.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${((currentScenario + 1) / scenarios.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Score */}
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Score</span>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{score}%</span>
            </div>
          </div>

          {/* Question */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {scenarios[currentScenario].question}
            </h2>
            <div className="space-y-3">
              {scenarios[currentScenario].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full text-left p-4 rounded-lg transition-colors ${
                    selectedAnswer === null
                      ? 'hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                      : selectedAnswer === index
                        ? index === scenarios[currentScenario].correctAnswer
                          ? 'bg-green-100 dark:bg-green-900 border border-green-500'
                          : 'bg-red-100 dark:bg-red-900 border border-red-500'
                        : index === scenarios[currentScenario].correctAnswer
                          ? 'bg-green-100 dark:bg-green-900 border border-green-500'
                          : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <span className={`text-sm ${
                    selectedAnswer === null
                      ? 'text-gray-900 dark:text-white'
                      : selectedAnswer === index
                        ? index === scenarios[currentScenario].correctAnswer
                          ? 'text-green-700 dark:text-green-300'
                          : 'text-red-700 dark:text-red-300'
                        : index === scenarios[currentScenario].correctAnswer
                          ? 'text-green-700 dark:text-green-300'
                          : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {option}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="mb-6">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  {scenarios[currentScenario].explanation}
                </p>
              </div>

              {/* Learning Resources for Wrong Answers */}
              {selectedAnswer !== scenarios[currentScenario].correctAnswer && scenarios[currentScenario].learningResources && (
                <div className="mt-6 bg-white dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-medium mb-3 text-gray-900 dark:text-white">Learning Resources:</h4>
                  
                  {scenarios[currentScenario].learningResources.articles && scenarios[currentScenario].learningResources.articles.length > 0 && (
                    <div className="mb-4">
                      <h5 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Articles:</h5>
                      <ul className="list-disc pl-5 space-y-2">
                        {scenarios[currentScenario].learningResources.articles.map((article, index) => (
                          <li key={index}>
                            <a 
                              href={article}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                            >
                              {article.includes('lastpass.com') ? 'LastPass Password Guide' :
                               article.includes('bitwarden.com') ? 'Bitwarden Security Guide' :
                               article.includes('haveibeenpwned.com') ? 'Check if Your Data Was Breached' :
                               article.includes('cisa.gov') ? 'CISA Data Breach Guide' :
                               article.includes('nist.gov') ? 'NIST Security Guidelines' :
                               article.includes('sans.org') ? 'SANS Security Guide' :
                               article.includes('microsoft.com') ? 'Microsoft Password Policy' :
                               'Learn More'}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {scenarios[currentScenario].learningResources.videos && scenarios[currentScenario].learningResources.videos.length > 0 && (
                    <div>
                      <h5 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Videos:</h5>
                      <ul className="list-disc pl-5 space-y-2">
                        {scenarios[currentScenario].learningResources.videos.map((video, index) => (
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

          {/* Next Button */}
          {showExplanation && (
            <button
              onClick={nextScenario}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              {currentScenario < scenarios.length - 1 ? 'Next Question' : 'Complete Challenge'}
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Challenge Complete!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You scored {score}% on the Password Manager Quest!
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
            <button
              onClick={() => router.push('/games')}
              className="bg-gray-600 text-white py-2 px-6 rounded-md hover:bg-gray-700 transition-colors"
            >
              Back to Challenges
            </button>
            <button
              onClick={resetGame}
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
  );
} 