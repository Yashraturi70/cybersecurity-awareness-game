'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Challenge {
  id: number;
  type: string;
  description: string;
  code: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  hint: string;
  learningResources?: {
    articles?: string[];
    videos?: string[];
  };
}

interface SearchResults {
  users: Array<{ id: number; name: string; }>;
}

interface CommentDB {
  comments: {
    save(comment: string): Promise<void>;
  };
}

declare const db: CommentDB;
declare const commentSection: HTMLElement;

export default function XSSDefenderPage() {
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
      type: "Reflected XSS",
      description: "A user search form is vulnerable to XSS. Which input would you sanitize to prevent an attack?",
      code: `
function searchUsers(query: string): void {
  const results = document.getElementById('results');
  if (!results) return;
  results.innerHTML = 'Search results for: ' + query;
  // ... perform search
}`,
      options: [
        "No need to sanitize, the code is secure",
        "Sanitize the query parameter before using it in innerHTML",
        "Sanitize the results after the search",
        "Remove the innerHTML property"
      ],
      correctAnswer: 1,
      explanation: "The query parameter should be sanitized before being used in innerHTML to prevent XSS attacks. Use methods like escapeHTML() or DOMPurify.sanitize().",
      hint: "Look at how user input is directly inserted into the DOM using innerHTML.",
      learningResources: {
        articles: [
          "https://owasp.org/www-community/attacks/xss/",
          "https://portswigger.net/web-security/cross-site-scripting/reflected"
        ],
        videos: [
          "https://www.youtube.com/watch?v=EoaDgUgS6QA",
          "https://www.youtube.com/watch?v=2GtbY1XWGlQ"
        ]
      }
    },
    {
      id: 2,
      type: "Stored XSS",
      description: "A comment system stores user input in a database. Identify the vulnerable code:",
      code: `
async function postComment(comment: string): Promise<void> {
  // Save to database
  await db.comments.save(comment);
  // Display comment
  commentSection.innerHTML += comment;
}`,
      options: [
        "The database save operation",
        "Both saving and displaying the comment",
        "The comment display using innerHTML",
        "The comment parameter"
      ],
      correctAnswer: 1,
      explanation: "Both storing and displaying unvalidated user input is dangerous. Sanitize input before storage and escape output when displaying.",
      hint: "Consider what happens if malicious code is stored in the database.",
      learningResources: {
        articles: [
          "https://portswigger.net/web-security/cross-site-scripting/stored",
          "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html"
        ],
        videos: [
          "https://www.youtube.com/watch?v=IuzU4y-UjLw",
          "https://www.youtube.com/watch?v=cs7EqbWAkzM"
        ]
      }
    },
    {
      id: 3,
      type: "DOM-based XSS",
      description: "This code processes URL parameters. Find the security issue:",
      code: `
const params = new URLSearchParams(window.location.search);
const theme = params.get('theme') || 'default';
document.body.innerHTML = '<div class="theme-' + theme + '">Welcome!</div>';`,
      options: [
        "Using URLSearchParams is unsafe",
        "The welcome message is vulnerable",
        "The theme parameter needs validation",
        "window.location is insecure"
      ],
      correctAnswer: 2,
      explanation: "URL parameters should be validated and sanitized before being used in DOM operations to prevent XSS attacks.",
      hint: "Think about what happens if the theme parameter contains malicious HTML or JavaScript.",
      learningResources: {
        articles: [
          "https://portswigger.net/web-security/cross-site-scripting/dom-based",
          "https://owasp.org/www-community/attacks/DOM_Based_XSS"
        ],
        videos: [
          "https://www.youtube.com/watch?v=IMyJ8sXrKZk",
          "https://www.youtube.com/watch?v=WDv5LlO1k1w"
        ]
      }
    },
    {
      id: 4,
      type: "Content Security Policy",
      description: "Which CSP header best prevents XSS attacks while allowing necessary functionality?",
      code: `
// Current headers:
Content-Security-Policy: default-src 'self';
script-src 'self' 'unsafe-inline';
style-src 'self' 'unsafe-inline';`,
      options: [
        "Keep the current configuration",
        "Remove all 'unsafe-inline' directives",
        "Add 'unsafe-eval' to script-src",
        "Remove the CSP header entirely"
      ],
      correctAnswer: 1,
      explanation: "Removing 'unsafe-inline' prevents inline scripts and styles, which are common XSS vectors. Use nonces or hashes for necessary inline code.",
      hint: "The 'unsafe-inline' directive allows potentially dangerous inline scripts.",
      learningResources: {
        articles: [
          "https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP",
          "https://content-security-policy.com/"
        ],
        videos: [
          "https://www.youtube.com/watch?v=L1nP8WGkn-4",
          "https://www.youtube.com/watch?v=txHc4zk9wYM"
        ]
      }
    },
    {
      id: 5,
      type: "Framework Protection",
      description: "Using React, which approach is most secure for rendering user content?",
      code: `
// Option A:
<div dangerouslySetInnerHTML={{__html: userContent}} />

// Option B:
<div>{userContent}</div>

// Option C:
<div ref={el => el.innerHTML = userContent} />`,
      options: [
        "Option A - dangerouslySetInnerHTML",
        "Option B - Direct text interpolation",
        "Option C - ref with innerHTML",
        "All options are equally secure"
      ],
      correctAnswer: 1,
      explanation: "React's text interpolation automatically escapes content, preventing XSS. dangerouslySetInnerHTML and innerHTML are unsafe for user content.",
      hint: "React provides built-in protection against XSS in one of these methods.",
      learningResources: {
        articles: [
          "https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml",
          "https://legacy.reactjs.org/docs/introducing-jsx.html#jsx-prevents-injection-attacks"
        ],
        videos: [
          "https://www.youtube.com/watch?v=rc7tBzOGzvs",
          "https://www.youtube.com/watch?v=9nZrJSe1qEk"
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
    
    const currentIndex = challengeOrder.indexOf('/games/xss-defender');
    if (currentIndex < challengeOrder.length - 1) {
      router.push(challengeOrder[currentIndex + 1]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">XSS Defender</h1>
        <p className="text-gray-600 dark:text-gray-400">Learn to identify and prevent Cross-Site Scripting vulnerabilities</p>
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
                {challenges[currentLevel].code}
              </pre>
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
            You scored {score}% on the XSS Defender challenge!
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