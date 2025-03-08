'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Challenge {
  id: number;
  type: string;
  description: string;
  scenario: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  hint: string;
  securityRisk: string;
  learningResources?: {
    articles?: string[];
    videos?: string[];
  };
}

export default function MobileSecurityGuardianPage() {
  const router = useRouter();
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [gameComplete, setGameComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const challenges: Challenge[] = [
    {
      id: 1,
      type: "Data Storage Security",
      description: "A mobile banking app needs to store sensitive user data. Which storage method is most secure?",
      scenario: `
The app needs to store:
- User authentication tokens
- Account numbers
- Transaction history
- User preferences`,
      securityRisk: "Insecure data storage can lead to unauthorized access to sensitive information",
      options: [
        "Store everything in SharedPreferences/UserDefaults",
        "Use SQLite database with encryption",
        "Store in plain text files",
        "Use secure keychain/keystore for sensitive data, encrypted database for others"
      ],
      correctAnswer: 3,
      explanation: "Use the platform's secure storage (Keychain/Keystore) for sensitive data like tokens and account numbers. Other data can be stored in an encrypted database.",
      hint: "Different types of data require different levels of security.",
      learningResources: {
        articles: [
          "https://owasp.org/www-project-mobile-top-10/2016-risks/m2-insecure-data-storage",
          "https://developer.android.com/training/articles/keystore"
        ],
        videos: [
          "https://www.youtube.com/watch?v=sJ2yHdvQXrM",
          "https://www.youtube.com/watch?v=3VKf2T7ZFZM"
        ]
      }
    },
    {
      id: 2,
      type: "Network Communication",
      description: "Your app communicates with a backend server. How would you secure the communication?",
      scenario: `
Current implementation:
- HTTP connection
- JSON data transfer
- Plain text credentials
- No certificate pinning`,
      securityRisk: "Man-in-the-middle attacks can intercept sensitive data",
      options: [
        "Switch to HTTPS",
        "Implement certificate pinning",
        "Use request signing",
        "All of the above"
      ],
      correctAnswer: 3,
      explanation: "Implement multiple layers of security: HTTPS for encryption, certificate pinning to prevent MITM attacks, and request signing for authenticity.",
      hint: "Think about protecting both the connection and the data being transmitted.",
      learningResources: {
        articles: [
          "https://owasp.org/www-project-mobile-top-10/2016-risks/m3-insecure-communication",
          "https://developer.android.com/training/articles/security-ssl"
        ],
        videos: [
          "https://www.youtube.com/watch?v=heqnQX6Qc3Q",
          "https://www.youtube.com/watch?v=73Do3HSkZEk"
        ]
      }
    },
    {
      id: 3,
      type: "Authentication & Session Management",
      description: "How would you implement secure user authentication in a mobile app?",
      scenario: `
Requirements:
- User login with biometrics
- Remember me functionality
- Password reset
- Session management`,
      securityRisk: "Weak authentication can lead to unauthorized account access",
      options: [
        "Store passwords locally for offline login",
        "Use plain JWT tokens for sessions",
        "Implement biometric auth, secure token storage, and token refresh",
        "Save login state in SharedPreferences"
      ],
      correctAnswer: 2,
      explanation: "Use biometric authentication when available, store tokens securely, implement proper token refresh mechanisms, and never store passwords locally.",
      hint: "Consider both security and user convenience in the authentication process.",
      learningResources: {
        articles: [
          "https://owasp.org/www-project-mobile-top-10/2016-risks/m4-insecure-authentication",
          "https://developer.android.com/training/sign-in/biometric-auth"
        ],
        videos: [
          "https://www.youtube.com/watch?v=WN9kgdSVhDo",
          "https://www.youtube.com/watch?v=Di5T4fHVDxI"
        ]
      }
    },
    {
      id: 4,
      type: "Code Protection",
      description: "How would you protect your app's code from reverse engineering?",
      scenario: `
App contains:
- Proprietary algorithms
- API keys
- Business logic
- User data processing`,
      securityRisk: "Reverse engineering can expose sensitive logic and security measures",
      options: [
        "Basic code obfuscation",
        "Root/jailbreak detection",
        "Anti-tampering measures",
        "All of the above plus code hardening"
      ],
      correctAnswer: 3,
      explanation: "Implement multiple protection layers: code obfuscation, root detection, anti-tampering, and code hardening to protect sensitive app components.",
      hint: "Different aspects of the app require different protection mechanisms.",
      learningResources: {
        articles: [
          "https://owasp.org/www-project-mobile-top-10/2016-risks/m9-reverse-engineering",
          "https://developer.android.com/studio/build/shrink-code"
        ],
        videos: [
          "https://www.youtube.com/watch?v=2aB_C8CRJow",
          "https://www.youtube.com/watch?v=pzRF8kR-fD8"
        ]
      }
    },
    {
      id: 5,
      type: "Runtime Security",
      description: "How would you protect your app from runtime attacks and debugging?",
      scenario: `
Security concerns:
- Debugger attachment
- Memory manipulation
- Runtime injection
- Screen recording`,
      securityRisk: "Runtime manipulation can bypass security controls and extract sensitive data",
      options: [
        "Disable developer options",
        "Implement anti-debugging",
        "Use encrypted memory",
        "Combine all measures with integrity checks"
      ],
      correctAnswer: 3,
      explanation: "Implement comprehensive runtime protection: anti-debugging, memory encryption, integrity checks, and detection of runtime manipulation attempts.",
      hint: "Runtime protection requires multiple layers of security working together.",
      learningResources: {
        articles: [
          "https://owasp.org/www-project-mobile-top-10/2016-risks/m10-extraneous-functionality",
          "https://developer.android.com/training/articles/security-tips"
        ],
        videos: [
          "https://www.youtube.com/watch?v=3H1XBWiZcKg",
          "https://www.youtube.com/watch?v=DEv8L9DxbhM"
        ]
      }
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    if (answerIndex === challenges[currentLevel].correctAnswer) {
      setScore(score + 20);
    }
  };

  const nextChallenge = () => {
    if (currentLevel < challenges.length - 1) {
      setCurrentLevel(currentLevel + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setShowHint(false);
    } else {
      setGameComplete(true);
    }
  };

  const resetGame = () => {
    setCurrentLevel(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setGameComplete(false);
    setShowHint(false);
  };

  const goToNextChallenge = () => {
    const challengeOrder = [
      '/games/xss-defender',
      '/games/sql-injection-preventer',
      '/games/mobile-security-guardian',
      '/games/app-permission-masters'
    ];
    
    const currentIndex = challengeOrder.indexOf('/games/mobile-security-guardian');
    if (currentIndex < challengeOrder.length - 1) {
      router.push(challengeOrder[currentIndex + 1]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Mobile Security Guardian</h1>
        <p className="text-gray-600 dark:text-gray-400">Learn to implement and maintain mobile app security</p>
      </div>

      {!gameComplete ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          {/* Progress and Score */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Level</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {currentLevel + 1} of {challenges.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${((currentLevel + 1) / challenges.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Score</span>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{score}%</span>
            </div>
          </div>

          {/* Challenge Content */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {challenges[currentLevel].type}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {challenges[currentLevel].description}
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
              <pre className="font-mono text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                {challenges[currentLevel].scenario}
              </pre>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 mb-4">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-300 mb-2">
                Security Risk:
              </h3>
              <p className="text-sm text-red-600 dark:text-red-400">
                {challenges[currentLevel].securityRisk}
              </p>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {challenges[currentLevel].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
                className={`w-full text-left p-4 rounded-lg transition-colors ${
                  selectedAnswer === null
                    ? 'hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                    : selectedAnswer === index
                      ? index === challenges[currentLevel].correctAnswer
                        ? 'bg-green-100 dark:bg-green-900 border border-green-500'
                        : 'bg-red-100 dark:bg-red-900 border border-red-500'
                      : index === challenges[currentLevel].correctAnswer
                        ? 'bg-green-100 dark:bg-green-900 border border-green-500'
                        : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Hint */}
          <div className="mb-6">
            {!showHint && (
              <button
                onClick={() => setShowHint(true)}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Need a hint?
              </button>
            )}
            {showHint && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                <p className="text-yellow-800 dark:text-yellow-200">
                  {challenges[currentLevel].hint}
                </p>
              </div>
            )}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="mb-6">
              <div className={`p-4 rounded-lg ${
                selectedAnswer === challenges[currentLevel].correctAnswer
                  ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                  : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
              }`}>
                <p className="mb-2">
                  {selectedAnswer === challenges[currentLevel].correctAnswer
                    ? 'Correct!'
                    : 'Incorrect!'}
                </p>
                <p className="mb-4">{challenges[currentLevel].explanation}</p>
                {selectedAnswer !== challenges[currentLevel].correctAnswer && challenges[currentLevel].learningResources && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Learning Resources:</h3>
                    {challenges[currentLevel].learningResources.articles && (
                      <div className="mb-2">
                        <h4 className="font-medium">Articles:</h4>
                        <ul className="list-disc list-inside">
                          {challenges[currentLevel].learningResources.articles.map((article, index) => (
                            <li key={index}>
                              <a href={article} target="_blank" rel="noopener noreferrer" 
                                 className="text-blue-600 dark:text-blue-400 hover:underline">
                                Article {index + 1}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {challenges[currentLevel].learningResources.videos && (
                      <div>
                        <h4 className="font-medium">Videos:</h4>
                        <ul className="list-disc list-inside">
                          {challenges[currentLevel].learningResources.videos.map((video, index) => (
                            <li key={index}>
                              <a href={video} target="_blank" rel="noopener noreferrer"
                                 className="text-blue-600 dark:text-blue-400 hover:underline">
                                Video {index + 1}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <button
                onClick={nextChallenge}
                className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                {currentLevel < challenges.length - 1 ? 'Next Challenge' : 'Complete Game'}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Challenge Complete!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You scored {score}% on the Mobile Security Guardian challenge!
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