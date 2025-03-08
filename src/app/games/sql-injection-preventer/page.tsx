'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Challenge {
  id: number;
  type: string;
  description: string;
  code: string;
  vulnerableQuery: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  hint: string;
  learningResources?: {
    articles?: string[];
    videos?: string[];
  };
}

interface DBResponse {
  success: boolean;
  data?: any;
  error?: string;
}

interface DB {
  execute(query: string): Promise<DBResponse>;
}

declare const db: DB;

export default function SQLInjectionPreventerPage() {
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
      type: "Basic SQL Injection",
      description: "A login form is vulnerable to SQL injection. Identify the secure way to handle user input:",
      code: `
function loginUser(username: string, password: string): Promise<DBResponse> {
  const query = "SELECT * FROM users WHERE username='" + 
    username + "' AND password='" + password + "'";
  return db.execute(query);
}`,
      vulnerableQuery: "' OR '1'='1",
      options: [
        "Keep the current implementation",
        "Use parameterized queries with placeholders",
        "Escape special characters manually",
        "Remove quotes from the query"
      ],
      correctAnswer: 1,
      explanation: "Always use parameterized queries to prevent SQL injection. This lets the database handle proper escaping and maintains query structure.",
      hint: "Think about how the database should handle user input separately from the query structure.",
      learningResources: {
        articles: [
          "https://owasp.org/www-community/attacks/SQL_Injection",
          "https://www.w3schools.com/sql/sql_injection.asp"
        ],
        videos: [
          "https://www.youtube.com/watch?v=ciNHn38EyRc",
          "https://www.youtube.com/watch?v=cx6Xs3F_1Uc"
        ]
      }
    },
    {
      id: 2,
      type: "UNION Attack Prevention",
      description: "This query is vulnerable to UNION-based SQL injection. How would you fix it?",
      code: `
function getProducts(category: string | number): Promise<DBResponse> {
  const query = "SELECT name, price FROM products WHERE category = " + category;
  return db.execute(query);
}`,
      vulnerableQuery: "1 UNION SELECT username, password FROM users",
      options: [
        "Add quotes around the category parameter",
        "Use an ORM (Object-Relational Mapping)",
        "Validate that category is a number",
        "All of the above"
      ],
      correctAnswer: 3,
      explanation: "A comprehensive approach using input validation, parameterized queries through an ORM, and proper data typing provides the best protection.",
      hint: "Multiple layers of protection are better than a single approach.",
      learningResources: {
        articles: [
          "https://portswigger.net/web-security/sql-injection/union-attacks",
          "https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Input_Validation_Testing/05-Testing_for_SQL_Injection"
        ],
        videos: [
          "https://www.youtube.com/watch?v=Gx5rzNZvSbg",
          "https://www.youtube.com/watch?v=WqP6IqJxzTo"
        ]
      }
    },
    {
      id: 3,
      type: "Blind SQL Injection",
      description: "This search function is vulnerable to blind SQL injection. Select the best fix:",
      code: String.raw`
function searchUsers(searchTerm: string): Promise<DBResponse> {
  const query = \`SELECT * FROM users WHERE 
    name LIKE '%\${searchTerm}%' OR 
    email LIKE '%\${searchTerm}%'\`;
  return db.execute(query);
}`,
      vulnerableQuery: "x%' OR SLEEP(5) OR '%",
      options: [
        "Use LIKE with ESCAPE clause",
        "Remove the wildcard characters",
        "Use parameterized queries with explicit LIKE patterns",
        "Switch to full-text search"
      ],
      correctAnswer: 2,
      explanation: "Use parameterized queries with explicit LIKE patterns. The pattern should be a parameter, keeping the wildcards in the query structure.",
      hint: "Consider how to separate the LIKE pattern structure from the user input.",
      learningResources: {
        articles: [
          "https://portswigger.net/web-security/sql-injection/blind",
          "https://owasp.org/www-community/attacks/Blind_SQL_Injection"
        ],
        videos: [
          "https://www.youtube.com/watch?v=9Rrrm0JsLVw",
          "https://www.youtube.com/watch?v=VDVcG8gFzxU"
        ]
      }
    },
    {
      id: 4,
      type: "Mass Assignment",
      description: "This update function is vulnerable to mass assignment. Choose the secure implementation:",
      code: String.raw`
function updateUser(userId: number, userData: Record<string, any>): Promise<DBResponse> {
  const query = "UPDATE users SET " + 
    Object.keys(userData).map(field => 
      "\${field}='\${userData[field]}'").join(',') + 
    " WHERE id = " + userId;
  return db.execute(query);
}`,
      vulnerableQuery: "{'admin': true, 'role': 'superuser'}",
      options: [
        "Filter allowed fields manually",
        "Use an allowlist of updatable fields",
        "Validate each field's type",
        "All of the above"
      ],
      correctAnswer: 3,
      explanation: "Implement multiple layers of protection: define allowed fields, validate data types, and use parameterized queries for updates.",
      hint: "Think about controlling both which fields can be updated and how they're updated.",
      learningResources: {
        articles: [
          "https://cheatsheetseries.owasp.org/cheatsheets/Mass_Assignment_Cheat_Sheet.html",
          "https://owasp.org/www-project-proactive-controls/v3/en/c5-validate-inputs"
        ],
        videos: [
          "https://www.youtube.com/watch?v=WYh4qhXB5JI",
          "https://www.youtube.com/watch?v=3aKvXHx-yJc"
        ]
      }
    },
    {
      id: 5,
      type: "Error-Based Injection",
      description: "This query is vulnerable to error-based SQL injection. How would you prevent information leakage?",
      code: `
function getUserById(id: number): Promise<DBResponse> {
  try {
    const query = "SELECT * FROM users WHERE id = " + id;
    return db.execute(query);
  } catch (error) {
    throw new Error("Database error: " + (error as Error).message);
  }
}`,
      vulnerableQuery: "1 AND EXTRACTVALUE(0,CONCAT(0x7e,VERSION()))",
      options: [
        "Remove error messages completely",
        "Use generic error messages and log details",
        "Validate input is numeric",
        "B and C together"
      ],
      correctAnswer: 3,
      explanation: "Combine input validation with proper error handling. Log detailed errors for debugging but return generic messages to users.",
      hint: "Consider both preventing the injection and handling potential errors securely.",
      learningResources: {
        articles: [
          "https://portswigger.net/web-security/sql-injection/examining-the-database",
          "https://owasp.org/www-community/Improper_Error_Handling"
        ],
        videos: [
          "https://www.youtube.com/watch?v=N7Mec51K5Sg",
          "https://www.youtube.com/watch?v=UQzgXpgJqyY"
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
    
    const currentIndex = challengeOrder.indexOf('/games/sql-injection-preventer');
    if (currentIndex < challengeOrder.length - 1) {
      router.push(challengeOrder[currentIndex + 1]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">SQL Injection Preventer</h1>
        <p className="text-gray-600 dark:text-gray-400">Learn to identify and prevent SQL injection vulnerabilities</p>
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
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 mb-4">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-300 mb-2">
                Example Malicious Input:
              </h3>
              <code className="font-mono text-sm text-red-600 dark:text-red-400">
                {challenges[currentLevel].vulnerableQuery}
              </code>
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
            You scored {score}% on the SQL Injection Preventer challenge!
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