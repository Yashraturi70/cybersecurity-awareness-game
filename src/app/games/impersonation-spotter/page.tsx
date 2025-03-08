'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Scenario {
  id: number;
  title: string;
  platform: string;
  content: {
    profileName: string;
    profileImage: string;
    handle: string;
    message: string;
    additionalInfo?: string;
  };
  suspiciousElements: string[];
  options: string[];
  correctAnswer: number;
  explanation: string;
  learningResources?: {
    articles?: string[];
    videos?: string[];
  };
}

export default function ImpersonationSpotterPage() {
  const router = useRouter();
  const [currentScenario, setCurrentScenario] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [gameComplete, setGameComplete] = useState(false);
  const [showElements, setShowElements] = useState(false);

  const scenarios: Scenario[] = [
    {
      id: 1,
      title: "Celebrity Impersonation",
      platform: "Twitter",
      content: {
        profileName: "Elon Musk Official",
        profileImage: "🤖",
        handle: "@el0n_musk_giveaway",
        message: "I'm giving away 1000 Bitcoin to my loyal followers! Just send 0.1 BTC to verify your wallet and receive 10x back! Limited time offer!"
      },
      suspiciousElements: [
        "Suspicious handle with numbers and additional words",
        "Unrealistic giveaway offer",
        "Requests cryptocurrency transfer",
        "Creates urgency with 'Limited time offer'",
        "Poor grammar and excessive punctuation"
      ],
      options: [
        "Participate in the giveaway",
        "Share with friends to help them earn Bitcoin",
        "Report the account for impersonation",
        "Ask for more details about the offer"
      ],
      correctAnswer: 2,
      explanation: "Celebrity impersonation scams often use cryptocurrency giveaways as bait. Verified celebrities won't ask you to send cryptocurrency to receive more in return.",
      learningResources: {
        articles: [
          "https://www.ftc.gov/news-events/data-visualizations/data-spotlight/2022/06/reports-show-scammers-cashing-crypto-craze",
          "https://help.twitter.com/en/safety-and-security/report-impersonation"
        ],
        videos: [
          "https://www.youtube.com/watch?v=3NjQ9b3pgIg",
          "https://www.youtube.com/watch?v=PYJtRWEqhy0"
        ]
      }
    },
    {
      id: 2,
      title: "Company Support Impersonation",
      platform: "Email",
      content: {
        profileName: "Amazon Support Team",
        profileImage: "📦",
        handle: "support@amazon.secure-helpdesk.com",
        message: "Your account has been locked due to suspicious activity. Click here to verify your identity and restore access to your Prime benefits.",
        additionalInfo: "Reply within 24 hours to prevent account deletion."
      },
      suspiciousElements: [
        "Suspicious domain name (secure-helpdesk.com)",
        "Urgency through threat of account deletion",
        "Request to click external link",
        "Generic greeting",
        "Pressure tactics using time limit"
      ],
      options: [
        "Click the verification link",
        "Reply with account details",
        "Check Amazon account directly through official website",
        "Forward to other Amazon users"
      ],
      correctAnswer: 2,
      explanation: "Always access your accounts directly through official websites or apps, not through email links. Legitimate companies won't threaten account deletion through email.",
      learningResources: {
        articles: [
          "https://www.amazon.com/gp/help/customer/display.html?nodeId=GX7XFHQ3FUZ3L72K",
          "https://www.consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams"
        ],
        videos: [
          "https://www.youtube.com/watch?v=XBkzBrXlle0",
          "https://www.youtube.com/watch?v=U3rqaeBPUq4"
        ]
      }
    },
    {
      id: 3,
      title: "Executive Impersonation",
      platform: "LinkedIn",
      content: {
        profileName: "Mark Thompson",
        profileImage: "👔",
        handle: "CEO at Global Tech Solutions",
        message: "Hi, I'm looking for ambitious professionals for a confidential project. $500/hour for part-time work. Interested?",
        additionalInfo: "Account created 2 days ago"
      },
      suspiciousElements: [
        "New account",
        "Too-good-to-be-true salary",
        "Vague job description",
        "Emphasis on confidentiality",
        "Generic company name"
      ],
      options: [
        "Accept the offer immediately",
        "Share personal details to apply",
        "Research the company and CEO",
        "Share with professional network"
      ],
      correctAnswer: 2,
      explanation: "Executive impersonators often create fake profiles with lucrative job offers. Always verify the company and person through multiple sources before engaging.",
      learningResources: {
        articles: [
          "https://www.linkedin.com/help/linkedin/answer/69557",
          "https://www.ic3.gov/Media/Y2019/PSA190910"
        ],
        videos: [
          "https://www.youtube.com/watch?v=opRMrEfAIiI",
          "https://www.youtube.com/watch?v=IgCHcuCw_RQ"
        ]
      }
    },
    {
      id: 4,
      title: "Friend Account Takeover",
      platform: "Facebook",
      content: {
        profileName: "Sarah Johnson",
        profileImage: "👩",
        handle: "sarah.johnson.94583",
        message: "Hey! I'm stranded abroad and lost my wallet. Can you send me $500 through Western Union? I'll pay you back as soon as I get home!",
        additionalInfo: "Message sent at 3:24 AM"
      },
      suspiciousElements: [
        "Unusual time of message",
        "Request for immediate financial help",
        "Specific payment method (Western Union)",
        "Emergency situation abroad",
        "Promise of repayment"
      ],
      options: [
        "Send the money immediately",
        "Ask for more details about the situation",
        "Contact friend through alternate means",
        "Share their situation with mutual friends"
      ],
      correctAnswer: 2,
      explanation: "Account takeover scams often involve emergency situations and requests for money. Always verify the person's identity through another communication channel.",
      learningResources: {
        articles: [
          "https://www.facebook.com/help/1216349518398524",
          "https://www.consumer.ftc.gov/articles/facebook-friends-and-fraud"
        ],
        videos: [
          "https://www.youtube.com/watch?v=7U-RbOKanYs",
          "https://www.youtube.com/watch?v=Q7153z9I1Zw"
        ]
      }
    },
    {
      id: 5,
      title: "Government Official Impersonation",
      platform: "Phone",
      content: {
        profileName: "IRS Officer Johnson",
        profileImage: "📞",
        handle: "+1 (555) 0123-4567",
        message: "This is Officer Johnson from the IRS. You have unpaid taxes and a warrant has been issued for your arrest. To resolve this, you must pay immediately using gift cards.",
        additionalInfo: "Caller ID shows different state than claimed office"
      },
      suspiciousElements: [
        "Request for gift card payment",
        "Threatens arrest",
        "Creates immediate urgency",
        "Inconsistent location information",
        "Claims to be from IRS (which doesn't make such calls)"
      ],
      options: [
        "Purchase gift cards to avoid arrest",
        "Provide personal information to verify identity",
        "Hang up and contact IRS directly",
        "Negotiate a payment plan"
      ],
      correctAnswer: 2,
      explanation: "Government agencies never request payment through gift cards or make threatening phone calls. Always verify by contacting the agency through official channels.",
      learningResources: {
        articles: [
          "https://www.irs.gov/newsroom/tax-scams-consumer-alerts",
          "https://www.usa.gov/common-scams-frauds#item-37207"
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
      setShowElements(false);
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
    setShowElements(false);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Twitter':
        return '🐦';
      case 'Email':
        return '📧';
      case 'LinkedIn':
        return '💼';
      case 'Facebook':
        return '👥';
      case 'Phone':
        return '📱';
      default:
        return '💻';
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
    
    const currentIndex = challengeOrder.indexOf('/games/impersonation-spotter');
    if (currentIndex < challengeOrder.length - 1) {
      router.push(challengeOrder[currentIndex + 1]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Impersonation Spotter</h1>
        <p className="text-gray-600 dark:text-gray-400">Learn to identify and avoid impersonation attacks</p>
      </div>

      {!gameComplete ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          {/* Progress and Score */}
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

          <div className="mb-6">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Score</span>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{score}%</span>
            </div>
          </div>

          {/* Scenario */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{getPlatformIcon(scenarios[currentScenario].platform)}</span>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {scenarios[currentScenario].title}
              </h2>
            </div>

            {/* Profile Card */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{scenarios[currentScenario].content.profileImage}</span>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {scenarios[currentScenario].content.profileName}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {scenarios[currentScenario].content.handle}
                  </div>
                </div>
              </div>
              <p className="text-gray-800 dark:text-gray-200 mb-2">
                {scenarios[currentScenario].content.message}
              </p>
              {scenarios[currentScenario].content.additionalInfo && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {scenarios[currentScenario].content.additionalInfo}
                </p>
              )}
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
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

          {/* Explanation and Suspicious Elements */}
          {showExplanation && (
            <>
              <div className="mb-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
                    {scenarios[currentScenario].explanation}
                  </p>
                  <button
                    onClick={() => setShowElements(!showElements)}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {showElements ? 'Hide' : 'Show'} Suspicious Elements
                  </button>
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
                                {article.includes('ftc.gov') ? 'FTC Scam Prevention Guide' :
                                 article.includes('twitter.com') ? 'Twitter Security Guide' :
                                 article.includes('amazon.com') ? 'Amazon Security Guide' :
                                 article.includes('linkedin.com') ? 'LinkedIn Security Guide' :
                                 article.includes('ic3.gov') ? 'IC3 Fraud Alert' :
                                 article.includes('facebook.com') ? 'Facebook Security Guide' :
                                 article.includes('irs.gov') ? 'IRS Scam Alert' :
                                 article.includes('usa.gov') ? 'USA.gov Fraud Guide' :
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

                {showElements && (
                  <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300 mb-2">
                      Suspicious Elements:
                    </h3>
                    <ul className="list-disc list-inside space-y-1">
                      {scenarios[currentScenario].suspiciousElements.map((element, index) => (
                        <li key={index} className="text-sm text-yellow-700 dark:text-yellow-400">
                          {element}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <button
                onClick={nextScenario}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                {currentScenario < scenarios.length - 1 ? 'Next Scenario' : 'Complete Challenge'}
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Challenge Complete!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You scored {score}% on the Impersonation Spotter challenge!
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