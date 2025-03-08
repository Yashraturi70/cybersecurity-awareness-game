'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Challenge {
  id: number;
  type: string;
  description: string;
  input: string;
  hints: string[];
  solution: string;
  explanation: string;
  learningResources?: {
    articles?: string[];
    videos?: string[];
  };
}

export default function CryptoChallengePage() {
  const router = useRouter();
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [feedback, setFeedback] = useState('');

  const challenges: Challenge[] = [
    {
      id: 1,
      type: "Caesar Cipher",
      description: "A message has been encrypted using a Caesar cipher with a shift of 3. Decrypt the message to reveal important security information.",
      input: "PHHW PH DW WKH VHFUHW ORFDWLRQ",
      hints: [
        "Each letter is shifted 3 positions in the alphabet",
        "A becomes X, B becomes Y, C becomes Z",
        "Try shifting each letter backwards by 3"
      ],
      solution: "MEET ME AT THE SECRET LOCATION",
      explanation: "The Caesar cipher is one of the simplest encryption methods. It shifts each letter in the alphabet by a fixed number of positions.",
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
      id: 2,
      type: "Base64 Encoding",
      description: "This sensitive data has been encoded in Base64. Decode it to reveal the message.",
      input: "SGVsbG8sIHRoaXMgaXMgYSBzZWNyZXQgbWVzc2FnZQ==",
      hints: [
        "Base64 uses A-Z, a-z, 0-9, +, and /",
        "Look for the padding character '=' at the end",
        "Use a Base64 decoding function"
      ],
      solution: "Hello, this is a secret message",
      explanation: "Base64 encoding is commonly used to transmit binary data over text-based protocols.",
      learningResources: {
        articles: [
          "https://www.base64decode.org/learn/",
          "https://developer.mozilla.org/en-US/docs/Glossary/Base64"
        ],
        videos: [
          "https://www.youtube.com/watch?v=7U-RbOKanYs",
          "https://www.youtube.com/watch?v=Q7153z9I1Zw"
        ]
      }
    },
    {
      id: 3,
      type: "Vigenère Cipher",
      description: "Decrypt this message encrypted with a Vigenère cipher. The key is 'CYBER'.",
      input: "XFGEV FWXKS MVXJI RWVZG",
      hints: [
        "The key 'CYBER' is repeated throughout the message",
        "Each letter in the key determines the shift for the corresponding letter in the message",
        "Create a grid with the alphabet shifted by each key letter"
      ],
      solution: "LEARN ABOUT CYBER SECURITY",
      explanation: "The Vigenère cipher is a polyalphabetic substitution cipher that uses a keyword to determine multiple shift values.",
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
      id: 4,
      type: "Hash Function",
      description: "Given this SHA-256 hash, find the original four-letter password that produces it: 8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
      input: "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
      hints: [
        "This is a common password",
        "The password contains only lowercase letters",
        "Think about what people commonly use as passwords"
      ],
      solution: "123456",
      explanation: "Hash functions are one-way functions that convert input data into a fixed-size string of characters. They are fundamental to password storage and digital signatures.",
      learningResources: {
        articles: [
          "https://www.thesslstore.com/blog/what-is-a-hash-function-in-cryptography/",
          "https://www.nist.gov/publications/hash-functions"
        ],
        videos: [
          "https://www.youtube.com/watch?v=h8PLDguZ4ME",
          "https://www.youtube.com/watch?v=4PZb0Vy8tIs"
        ]
      }
    },
    {
      id: 5,
      type: "Public Key Cryptography",
      description: "You need to send an encrypted message to Bob. Using his public key (n=33, e=7), encrypt the message 'HI' (Convert letters to numbers: A=1, B=2, etc).",
      input: "Public Key: (n=33, e=7)\nMessage: HI",
      hints: [
        "Convert H to 8 and I to 9",
        "Use the formula: ciphertext = (message^e) mod n",
        "Calculate separately for each letter"
      ],
      solution: "8,9",
      explanation: "Public key cryptography uses different keys for encryption and decryption, allowing secure communication over insecure channels.",
      learningResources: {
        articles: [
          "https://www.cloudflare.com/learning/ssl/what-is-public-key-cryptography/",
          "https://www.nist.gov/publications/public-key-cryptography"
        ],
        videos: [
          "https://www.youtube.com/watch?v=3NjQ9b3pgIg",
          "https://www.youtube.com/watch?v=PYJtRWEqhy0"
        ]
      }
    }
  ];

  const checkSolution = () => {
    const currentChallenge = challenges[currentLevel];
    const isCorrect = userInput.trim().toUpperCase() === currentChallenge.solution.toUpperCase();
    
    if (isCorrect) {
      setFeedback('Correct! ' + currentChallenge.explanation);
      setScore(score + 20);
      
      if (currentLevel < challenges.length - 1) {
        setTimeout(() => {
          setCurrentLevel(currentLevel + 1);
          setUserInput('');
          setShowHint(false);
          setCurrentHint(0);
          setFeedback('');
        }, 2000);
      } else {
        setGameComplete(true);
      }
    } else {
      setFeedback('Try again! The solution is not quite right.');
    }
  };

  const showNextHint = () => {
    const currentChallenge = challenges[currentLevel];
    if (currentHint < currentChallenge.hints.length - 1) {
      setCurrentHint(currentHint + 1);
    }
    setShowHint(true);
  };

  const resetGame = () => {
    setCurrentLevel(0);
    setScore(0);
    setUserInput('');
    setShowHint(false);
    setCurrentHint(0);
    setGameComplete(false);
    setFeedback('');
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
    
    const currentIndex = challengeOrder.indexOf('/games/crypto-challenge');
    if (currentIndex < challengeOrder.length - 1) {
      router.push(challengeOrder[currentIndex + 1]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Crypto Challenge</h1>
        <p className="text-gray-600 dark:text-gray-400">Test your cryptography skills with these challenges</p>
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
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Encrypted Text:</h3>
              <div className="font-mono text-sm text-gray-600 dark:text-gray-400">
                {challenges[currentLevel].input}
              </div>
            </div>
          </div>

          {/* User Input */}
          <div className="mb-6">
            <label htmlFor="solution" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Solution:
            </label>
            <input
              type="text"
              id="solution"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter your solution..."
            />
          </div>

          {/* Hints */}
          <div className="mb-6">
            {showHint && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg mb-4">
                <p className="text-yellow-800 dark:text-yellow-200">
                  Hint {currentHint + 1}: {challenges[currentLevel].hints[currentHint]}
                </p>
              </div>
            )}
            <button
              onClick={showNextHint}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Need a hint?
            </button>
          </div>

          {/* Feedback */}
          {feedback && (
            <div>
              <div className={`mb-6 p-4 rounded-lg ${
                feedback.startsWith('Correct')
                  ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                  : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
              }`}>
                {feedback}
              </div>

              {/* Learning Resources for Wrong Answers */}
              {!feedback.startsWith('Correct') && challenges[currentLevel].learningResources && (
                <div className="mt-6 bg-white dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-medium mb-3 text-gray-900 dark:text-white">Learning Resources:</h4>
                  
                  {challenges[currentLevel].learningResources.articles && challenges[currentLevel].learningResources.articles.length > 0 && (
                    <div className="mb-4">
                      <h5 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Articles:</h5>
                      <ul className="list-disc pl-5 space-y-2">
                        {challenges[currentLevel].learningResources.articles.map((article, index) => (
                          <li key={index}>
                            <a 
                              href={article}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                            >
                              {article.includes('khanacademy.org') ? 'Khan Academy Tutorial' :
                               article.includes('geeksforgeeks.org') ? 'GeeksForGeeks Guide' :
                               article.includes('base64decode.org') ? 'Base64 Guide' :
                               article.includes('mozilla.org') ? 'MDN Web Docs' :
                               article.includes('dcode.fr') ? 'dCode Tutorial' :
                               article.includes('thesslstore.com') ? 'SSL Store Guide' :
                               article.includes('nist.gov') ? 'NIST Guide' :
                               article.includes('cloudflare.com') ? 'Cloudflare Guide' :
                               'Learn More'}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {challenges[currentLevel].learningResources.videos && challenges[currentLevel].learningResources.videos.length > 0 && (
                    <div>
                      <h5 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Videos:</h5>
                      <ul className="list-disc pl-5 space-y-2">
                        {challenges[currentLevel].learningResources.videos.map((video, index) => (
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

          {/* Submit Button */}
          <button
            onClick={checkSolution}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Submit Answer
          </button>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Challenge Complete!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You scored {score}% on the Crypto Challenge!
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