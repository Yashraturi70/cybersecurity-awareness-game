'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Permission {
  name: string;
  description: string;
  risk: string;
}

interface Challenge {
  id: number;
  type: string;
  description: string;
  appDescription: string;
  permissions: Permission[];
  requiredPermissions: string[];
  options: string[];
  correctAnswer: number;
  explanation: string;
  hint: string;
  learningResources?: {
    articles?: string[];
    videos?: string[];
  };
}

export default function AppPermissionMastersPage() {
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
      type: "Social Media App",
      description: "You're reviewing a social media app's permission requests. Which combination of permissions is appropriate?",
      appDescription: `
Features:
- Photo sharing
- Location tagging
- Contact sync
- Push notifications`,
      permissions: [
        {
          name: "Camera",
          description: "Access device camera for taking photos",
          risk: "Can capture photos/videos without user awareness"
        },
        {
          name: "Location",
          description: "Access device location for tagging posts",
          risk: "Can track user movement patterns"
        },
        {
          name: "Contacts",
          description: "Access contact list for friend suggestions",
          risk: "Can read and export contact information"
        },
        {
          name: "Storage",
          description: "Access device storage for saving media",
          risk: "Can access all files on device"
        }
      ],
      requiredPermissions: ["Camera", "Storage"],
      options: [
        "Grant all permissions at installation",
        "Grant no permissions, request when needed",
        "Grant only Camera and Storage, request others when used",
        "Grant all permissions except Location"
      ],
      correctAnswer: 2,
      explanation: "Only grant essential permissions (Camera and Storage) at first, then request additional permissions like Location and Contacts when specific features are used. This follows the principle of least privilege.",
      hint: "Think about which permissions are essential for core functionality versus optional features.",
      learningResources: {
        articles: [
          "https://developer.android.com/guide/topics/permissions/overview",
          "https://owasp.org/www-project-mobile-top-10/2016-risks/m1-improper-platform-usage"
        ],
        videos: [
          "https://www.youtube.com/watch?v=iZqDdvhTZj0",
          "https://www.youtube.com/watch?v=C3lySJBn0gw"
        ]
      }
    },
    {
      id: 2,
      type: "Fitness Tracking App",
      description: "A fitness app requests multiple permissions. Which approach is most secure?",
      appDescription: `
Features:
- Activity tracking
- Heart rate monitoring
- Route mapping
- Social sharing`,
      permissions: [
        {
          name: "Physical Activity",
          description: "Access activity and fitness data",
          risk: "Can collect sensitive health information"
        },
        {
          name: "Location",
          description: "Track running/cycling routes",
          risk: "Can monitor user location continuously"
        },
        {
          name: "Bluetooth",
          description: "Connect to fitness devices",
          risk: "Can interact with nearby devices"
        },
        {
          name: "Contacts",
          description: "Share achievements with friends",
          risk: "Can access contact information"
        }
      ],
      requiredPermissions: ["Physical Activity", "Location"],
      options: [
        "Grant all permissions permanently",
        "Grant permissions with 'while using app' restriction",
        "Deny location permission for privacy",
        "Use app without any permissions"
      ],
      correctAnswer: 1,
      explanation: "Grant permissions with 'while using app' restriction to allow necessary functionality while protecting privacy when the app is not actively being used.",
      hint: "Consider how to balance functionality with privacy protection.",
      learningResources: {
        articles: [
          "https://developer.android.com/training/location",
          "https://developer.apple.com/documentation/corelocation/requesting_authorization_to_use_location_services"
        ],
        videos: [
          "https://www.youtube.com/watch?v=4Y4dC3ahqoQ",
          "https://www.youtube.com/watch?v=_xUcYfbtfsI"
        ]
      }
    },
    {
      id: 3,
      type: "Banking App",
      description: "A banking app requests permissions. Which combination ensures security and functionality?",
      appDescription: `
Features:
- Mobile check deposit
- Transaction notifications
- Biometric login
- Location-based fraud detection`,
      permissions: [
        {
          name: "Camera",
          description: "Capture check images",
          risk: "Can take photos without user awareness"
        },
        {
          name: "Biometric",
          description: "Fingerprint/Face authentication",
          risk: "Can access biometric authentication system"
        },
        {
          name: "Location",
          description: "Detect suspicious transactions",
          risk: "Can track user location"
        },
        {
          name: "Notifications",
          description: "Send transaction alerts",
          risk: "Can send notifications anytime"
        }
      ],
      requiredPermissions: ["Biometric", "Notifications"],
      options: [
        "Grant all permissions for full functionality",
        "Grant only Biometric and Notifications",
        "Grant all except Location",
        "Grant permissions only when using specific features"
      ],
      correctAnswer: 3,
      explanation: "Grant essential permissions (Biometric, Notifications) for core functionality, and request Camera and Location only when specific features like check deposit or fraud detection are used.",
      hint: "Think about the security implications of each permission and when they're actually needed.",
      learningResources: {
        articles: [
          "https://developer.android.com/training/sign-in/biometric-auth",
          "https://owasp.org/www-project-mobile-top-10/2016-risks/m5-insufficient-cryptography"
        ],
        videos: [
          "https://www.youtube.com/watch?v=kYhsLMYwYqQ",
          "https://www.youtube.com/watch?v=2dY6aBU6pAM"
        ]
      }
    },
    {
      id: 4,
      type: "Messaging App",
      description: "A messaging app requests various permissions. What's the best permission strategy?",
      appDescription: `
Features:
- Text messaging
- Voice/video calls
- File sharing
- Contact sync`,
      permissions: [
        {
          name: "Microphone",
          description: "Voice call functionality",
          risk: "Can record audio without user awareness"
        },
        {
          name: "Camera",
          description: "Video call functionality",
          risk: "Can capture video without user awareness"
        },
        {
          name: "Contacts",
          description: "Access contact list",
          risk: "Can read and export contacts"
        },
        {
          name: "Storage",
          description: "Save shared files",
          risk: "Can access all files on device"
        }
      ],
      requiredPermissions: ["Storage"],
      options: [
        "Grant all permissions at once",
        "Grant only Storage, request others per feature",
        "Deny all permissions initially",
        "Grant all except Camera and Microphone"
      ],
      correctAnswer: 1,
      explanation: "Grant Storage permission for basic functionality, then request Microphone, Camera, and Contacts permissions when using specific features like calls or contact sync.",
      hint: "Consider which permissions are needed for basic messaging versus additional features.",
      learningResources: {
        articles: [
          "https://developer.android.com/training/permissions/requesting",
          "https://developer.apple.com/documentation/avfoundation/cameras_and_media_capture/requesting_authorization_for_media_capture_on_ios"
        ],
        videos: [
          "https://www.youtube.com/watch?v=5xVh-7ywKpE",
          "https://www.youtube.com/watch?v=iZqDdvhTZj0"
        ]
      }
    },
    {
      id: 5,
      type: "Weather App",
      description: "A weather app asks for multiple permissions. Which ones should be granted?",
      appDescription: `
Features:
- Current weather
- Weather alerts
- Location-based forecast
- Photo sharing of weather conditions`,
      permissions: [
        {
          name: "Location",
          description: "Get local weather data",
          risk: "Can track user location"
        },
        {
          name: "Notifications",
          description: "Send weather alerts",
          risk: "Can send notifications anytime"
        },
        {
          name: "Camera",
          description: "Share weather photos",
          risk: "Can take photos without user awareness"
        },
        {
          name: "Storage",
          description: "Save weather data offline",
          risk: "Can access device storage"
        }
      ],
      requiredPermissions: ["Location", "Notifications"],
      options: [
        "Grant all permissions requested",
        "Grant only Location permission",
        "Grant Location and Notifications with restrictions",
        "Deny all permissions"
      ],
      correctAnswer: 2,
      explanation: "Grant Location (with 'while using app' restriction) and Notifications for core weather functionality. Camera and Storage are optional and should only be requested if the user wants to use photo sharing features.",
      hint: "Consider which permissions are essential for the app's primary purpose versus additional features.",
      learningResources: {
        articles: [
          "https://developer.android.com/training/location/permissions",
          "https://developer.apple.com/documentation/usernotifications"
        ],
        videos: [
          "https://www.youtube.com/watch?v=J8dBe3Dz2Vs",
          "https://www.youtube.com/watch?v=4Y4dC3ahqoQ"
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

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">App Permission Masters</h1>
        <p className="text-gray-600 dark:text-gray-400">Learn to manage app permissions securely</p>
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
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">App Details:</h3>
              <pre className="font-mono text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                {challenges[currentLevel].appDescription}
              </pre>
            </div>
            
            {/* Permissions List */}
            <div className="space-y-4 mb-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Requested Permissions:</h3>
              {challenges[currentLevel].permissions.map((permission, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-gray-900 dark:text-white">{permission.name}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      challenges[currentLevel].requiredPermissions.includes(permission.name)
                        ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                    }`}>
                      {challenges[currentLevel].requiredPermissions.includes(permission.name)
                        ? 'Required'
                        : 'Optional'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{permission.description}</p>
                  <p className="text-xs text-red-600 dark:text-red-400">Risk: {permission.risk}</p>
                </div>
              ))}
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
            You scored {score}% on the App Permission Masters challenge!
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
          </div>
        </div>
      )}
    </div>
  );
} 