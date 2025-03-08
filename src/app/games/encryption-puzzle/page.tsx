'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Puzzle {
  id: string;
  title: string;
  description: string;
  type: 'Caesar' | 'Substitution' | 'Vigenere' | 'Base64' | 'Binary';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  encryptedText: string;
  solution: string;
  hint: string;
  points: number;
  learningResources?: {
    articles?: string[];
    videos?: string[];
  };
}

const puzzles: Puzzle[] = [
  {
    id: 'caesar-1',
    title: 'Caesar\'s Secret',
    description: 'Decrypt this message using the Caesar cipher. The shift key is 3 positions.',
    type: 'Caesar',
    difficulty: 'Easy',
    encryptedText: 'PHHW PH DW WKH SDUN',
    solution: 'MEET ME AT THE PARK',
    hint: 'Each letter is shifted 3 positions to the right in the alphabet.',
    points: 10,
    learningResources: {
      articles: [
        "https://www.khanacademy.org/computing/computer-science/cryptography/crypt/v/caesar-cipher",
        "https://www.geeksforgeeks.org/caesar-cipher-in-cryptography/"
      ],
      videos: [
        "https://www.youtube.com/watch?v=3NjQ9b3pgIg",
        "https://www.youtube.com/watch?v=PYJtRWEqhy0"
      ]
    }
  },
  {
    id: 'substitution-1',
    title: 'Symbol Swap',
    description: 'This message uses a simple substitution cipher. Look for patterns in common letters.',
    type: 'Substitution',
    difficulty: 'Medium',
    encryptedText: 'ZKLVK LV QEB PBZOBQ ZLAB?',
    solution: 'WHAT IS THE SECRET CODE?',
    hint: 'Common letters in English: E, T, A, O, I, N',
    points: 20,
    learningResources: {
      articles: [
        "https://www.cryptogram.org/resource-area/cipher-types/simple-substitution/",
        "https://www.dcode.fr/monoalphabetic-substitution"
      ],
      videos: [
        "https://www.youtube.com/watch?v=7U-RbOKanYs",
        "https://www.youtube.com/watch?v=Q7153z9I1Zw"
      ]
    }
  },
  {
    id: 'vigenere-1',
    title: 'Vigenère Challenge',
    description: 'Decrypt this message using the Vigenère cipher. The key is "KEY".',
    type: 'Vigenere',
    difficulty: 'Hard',
    encryptedText: 'TCAI KW XLI WIGIIX',
    solution: 'THIS IS THE SECRET',
    hint: 'Use the Vigenère square and repeat the key for the entire message.',
    points: 30,
    learningResources: {
      articles: [
        "https://www.geeksforgeeks.org/vigenere-cipher/",
        "https://www.dcode.fr/vigenere-cipher"
      ],
      videos: [
        "https://www.youtube.com/watch?v=opRMrEfAIiI",
        "https://www.youtube.com/watch?v=IgCHcuCw_RQ"
      ]
    }
  },
  {
    id: 'base64-1',
    title: 'Base64 Basics',
    description: 'This message is encoded in Base64. Decode it to reveal the hidden text.',
    type: 'Base64',
    difficulty: 'Easy',
    encryptedText: 'SGVsbG8gQ3liZXJzZWN1cml0eSE=',
    solution: 'Hello Cybersecurity!',
    hint: 'Base64 uses A-Z, a-z, 0-9, +, and / characters.',
    points: 15,
    learningResources: {
      articles: [
        "https://www.base64decode.org/learn/",
        "https://developer.mozilla.org/en-US/docs/Glossary/Base64"
      ],
      videos: [
        "https://www.youtube.com/watch?v=h8PLDguZ4ME",
        "https://www.youtube.com/watch?v=4PZb0Vy8tIs"
      ]
    }
  },
  {
    id: 'binary-1',
    title: 'Binary Code',
    description: 'Convert this binary message to text. Each character is 8 bits.',
    type: 'Binary',
    difficulty: 'Medium',
    encryptedText: '01001000 01101001 00100001',
    solution: 'Hi!',
    hint: 'Split the binary into 8-bit chunks and convert each to ASCII.',
    points: 25,
    learningResources: {
      articles: [
        "https://www.khanacademy.org/computing/computers-and-internet/xcae6f4a7ff015e7d:digital-information/xcae6f4a7ff015e7d:binary-numbers/a/bits-and-binary",
        "https://www.rapidtables.com/convert/number/binary-to-ascii.html"
      ],
      videos: [
        "https://www.youtube.com/watch?v=3NjQ9b3pgIg",
        "https://www.youtube.com/watch?v=PYJtRWEqhy0"
      ]
    }
  }
];

export default function EncryptionPuzzlePage() {
  const router = useRouter();
  const [gameStarted, setGameStarted] = useState(false);
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<string>('');
  const [gameOver, setGameOver] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const currentPuzzle = puzzles[currentPuzzleIndex];

  const startGame = () => {
    setGameStarted(true);
    setCurrentPuzzleIndex(0);
    setScore(0);
    setUserAnswer('');
    setShowHint(false);
    setFeedback('');
    setGameOver(false);
    setAttempts(0);
  };

  const handleSubmit = () => {
    const isCorrect = userAnswer.toUpperCase() === currentPuzzle.solution.toUpperCase();
    
    if (isCorrect) {
      const pointsEarned = Math.max(
        Math.ceil(currentPuzzle.points * (1 - attempts * 0.2)),
        Math.floor(currentPuzzle.points * 0.2)
      );
      
      setScore(prev => prev + pointsEarned);
      setFeedback(`Correct! You earned ${pointsEarned} points.`);
      
      setTimeout(() => {
        if (currentPuzzleIndex < puzzles.length - 1) {
          setCurrentPuzzleIndex(prev => prev + 1);
          setUserAnswer('');
          setShowHint(false);
          setFeedback('');
          setAttempts(0);
        } else {
          setGameOver(true);
        }
      }, 2000);
    } else {
      setAttempts(prev => prev + 1);
      setFeedback('Incorrect. Try again!');
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
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
    
    const currentIndex = challengeOrder.indexOf('/games/encryption-puzzle');
    if (currentIndex < challengeOrder.length - 1) {
      router.push(challengeOrder[currentIndex + 1]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Encryption Puzzle Challenge</h1>
        <p className="text-gray-600 dark:text-gray-400">Test your encryption and decryption skills</p>
      </div>

      {!gameStarted ? (
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Your mission is to solve various encryption puzzles. Each puzzle will test your knowledge
            of different encryption methods and ciphers. The faster you solve them, the more points you earn!
          </p>
          <button
            onClick={startGame}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Start Challenge
          </button>
        </div>
      ) : (
        <div>
          {!gameOver ? (
            <div className="space-y-6">
              {/* Status Bar */}
              <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-gray-600 dark:text-gray-300">Score: {score}</span>
                <span className="text-gray-600 dark:text-gray-300">
                  Puzzle {currentPuzzleIndex + 1} of {puzzles.length}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  getDifficultyColor(currentPuzzle.difficulty)
                }`}>
                  {currentPuzzle.difficulty}
                </span>
              </div>

              {/* Current Puzzle */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {currentPuzzle.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{currentPuzzle.description}</p>
                
                {/* Encrypted Text Display */}
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg font-mono text-lg text-center">
                  {currentPuzzle.encryptedText}
                </div>

                {/* Answer Input */}
                <div className="space-y-4">
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Enter your solution"
                    className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <div className="flex justify-between">
                    <button
                      onClick={() => setShowHint(!showHint)}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {showHint ? 'Hide Hint' : 'Show Hint'}
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                    >
                      Submit Answer
                    </button>
                  </div>
                </div>

                {/* Hint Display */}
                {showHint && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-blue-800 dark:text-blue-200">{currentPuzzle.hint}</p>
                  </div>
                )}

                {/* Feedback Display */}
                {feedback && (
                  <div className={`p-4 rounded-lg ${
                    feedback.includes('Correct')
                      ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200'
                      : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200'
                  }`}>
                    {feedback}
                  </div>
                )}

                {/* Learning Resources for Wrong Answers */}
                {feedback && !feedback.includes('Correct') && currentPuzzle.learningResources && (
                  <div className="mt-6 bg-white dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-medium mb-3 text-gray-900 dark:text-white">Learning Resources:</h4>
                    
                    {currentPuzzle.learningResources.articles && currentPuzzle.learningResources.articles.length > 0 && (
                      <div className="mb-4">
                        <h5 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Articles:</h5>
                        <ul className="list-disc pl-5 space-y-2">
                          {currentPuzzle.learningResources.articles.map((article, index) => (
                            <li key={index}>
                              <a 
                                href={article}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                              >
                                {article.includes('khanacademy.org') ? 'Khan Academy Tutorial' :
                                 article.includes('geeksforgeeks.org') ? 'GeeksForGeeks Guide' :
                                 article.includes('cryptogram.org') ? 'Cryptogram Guide' :
                                 article.includes('dcode.fr') ? 'dCode Tutorial' :
                                 article.includes('base64decode.org') ? 'Base64 Guide' :
                                 article.includes('mozilla.org') ? 'MDN Web Docs' :
                                 article.includes('rapidtables.com') ? 'Binary Conversion Guide' :
                                 'Learn More'}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {currentPuzzle.learningResources.videos && currentPuzzle.learningResources.videos.length > 0 && (
                      <div>
                        <h5 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Videos:</h5>
                        <ul className="list-disc pl-5 space-y-2">
                          {currentPuzzle.learningResources.videos.map((video, index) => (
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
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Challenge Complete!</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Final Score: {score}/{puzzles.reduce((sum, puzzle) => sum + puzzle.points, 0)}
                {score >= 80 && " - Excellent! You're a master of encryption!"}
                {score >= 50 && score < 80 && " - Good job! Keep practicing your cryptography skills."}
                {score < 50 && " - Keep learning! Encryption takes time to master."}
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
                <button
                  onClick={() => router.push('/games')}
                  className="bg-gray-600 text-white py-2 px-6 rounded-md hover:bg-gray-700 transition-colors"
                >
                  Back to Challenges
                </button>
                <button
                  onClick={startGame}
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
      )}
    </div>
  );
} 