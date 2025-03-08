'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Scenario {
  id: number;
  title: string;
  description: string;
  type: 'email' | 'call' | 'message';
  content: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  indicators: string[];
  learningResources?: {
    articles?: string[];
    videos?: string[];
  };
}

export default function SocialEngineeringDefenderPage() {
  const router = useRouter();
  const [currentScenario, setCurrentScenario] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [gameComplete, setGameComplete] = useState(false);
  const [showIndicators, setShowIndicators] = useState(false);

  const scenarios: Scenario[] = [
    {
      id: 1,
      title: "Urgent Bank Notice",
      type: "email",
      description: "You receive the following email from your bank:",
      content: `From: security@bankofamerica.security.com
Subject: URGENT: Unusual Activity Detected

Dear Valued Customer,

We have detected unusual activity in your account. To prevent unauthorized access, please verify your identity immediately by clicking the link below:

[Verify Account Now]

If you do not verify within 24 hours, your account will be suspended.

Best regards,
Bank Security Team`,
      options: [
        "Click the link to verify your account",
        "Forward the email to a friend for advice",
        "Contact your bank directly using the number on your card",
        "Reply to the email asking for more details"
      ],
      correctAnswer: 2,
      explanation: "Always contact your bank using official channels (like the phone number on your card) rather than clicking links in emails. Legitimate banks won't ask you to verify account details through email links.",
      indicators: [
        "Suspicious sender email domain (.security.com)",
        "Creates urgency with threats",
        "Generic greeting ('Valued Customer')",
        "Requests clicking on an external link",
        "Poor grammar and formatting"
      ],
      learningResources: {
        articles: [
          "https://www.fdic.gov/resources/consumers/consumer-assistance-resources/bank-scams.html",
          "https://www.consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams"
        ],
        videos: [
          "https://www.youtube.com/watch?v=XBkzBrXlle0",
          "https://www.youtube.com/watch?v=U3rqaeBPUq4"
        ]
      }
    },
    {
      id: 2,
      title: "Tech Support Call",
      type: "call",
      description: "You receive a phone call:",
      content: `Caller: "Hello, I'm calling from Microsoft Technical Support. We've detected viruses on your computer that are sending out spam. We need to fix this immediately to prevent your computer from being blocked from the internet. I can help you remove these viruses if you give me remote access to your computer."`,
      options: [
        "Provide remote access to fix the issue quickly",
        "Ask for their employee ID and callback number",
        "Hang up immediately",
        "Download the software they recommend"
      ],
      correctAnswer: 2,
      explanation: "Microsoft and other tech companies don't make unsolicited calls about computer problems. These are scammers trying to gain access to your computer for malicious purposes.",
      indicators: [
        "Unsolicited tech support call",
        "Claims to be from Microsoft",
        "Creates urgency about computer issues",
        "Requests remote access",
        "Uses fear tactics about internet access"
      ],
      learningResources: {
        articles: [
          "https://www.microsoft.com/security/blog/2018/12/03/tech-support-scams-a-guide-to-spotting-and-avoiding-them/",
          "https://www.fbi.gov/scams-and-safety/common-scams-and-crimes/tech-support-scams"
        ],
        videos: [
          "https://www.youtube.com/watch?v=7U-RbOKanYs",
          "https://www.youtube.com/watch?v=PYJtRWEqhy0"
        ]
      }
    },
    {
      id: 3,
      title: "LinkedIn Connection",
      type: "message",
      description: "You receive this LinkedIn message:",
      content: `Hi [Your Name],

I noticed you work in cybersecurity. I'm a recruiter for a major tech company and have an immediate opening that matches your profile perfectly. The salary is $200k+. 

To expedite the process, please fill out your details in this form: [External Link]

Looking forward to your response!

Best,
Sarah Johnson
Senior Tech Recruiter`,
      options: [
        "Fill out the form to apply quickly",
        "Share the opportunity with colleagues",
        "Research the recruiter and company first",
        "Send your resume directly in a message"
      ],
      correctAnswer: 2,
      explanation: "Always verify recruiters and job opportunities before sharing personal information. Legitimate recruiters will have verifiable profiles and won't rush you to click external links.",
      indicators: [
        "Too-good-to-be-true salary offer",
        "Urgency to act quickly",
        "External link for personal details",
        "Vague company details",
        "Uses job search urgency as pressure"
      ],
      learningResources: {
        articles: [
          "https://www.linkedin.com/help/linkedin/answer/a554019",
          "https://www.sans.org/blog/linkedin-social-engineering-attacks/"
        ],
        videos: [
          "https://www.youtube.com/watch?v=opRMrEfAIiI",
          "https://www.youtube.com/watch?v=IgCHcuCw_RQ"
        ]
      }
    },
    {
      id: 4,
      title: "CEO Email Request",
      type: "email",
      description: "You receive this email at work:",
      content: `From: ceo.john.smith@company-corp.net
Subject: Urgent Wire Transfer Needed

Hi,

I'm in a confidential meeting and need you to help with an urgent wire transfer to a new supplier. Please keep this confidential due to the sensitive nature of the deal.

Amount: $28,750
Account details attached.

Need this done ASAP. Will explain later.

Regards,
John`,
      options: [
        "Process the transfer immediately",
        "Ask a colleague what to do",
        "Follow company financial procedures",
        "Reply asking for more details"
      ],
      correctAnswer: 2,
      explanation: "This is a classic CEO fraud attempt. Always follow established company procedures for financial transactions, regardless of who seems to be requesting them.",
      indicators: [
        "Suspicious email domain",
        "Requests urgent wire transfer",
        "Demands confidentiality",
        "Prevents verification ('in a meeting')",
        "Unusual tone for CEO communication"
      ],
      learningResources: {
        articles: [
          "https://www.ic3.gov/Media/Y2019/PSA190910",
          "https://www.cisa.gov/news-events/news/business-email-compromise-scam"
        ],
        videos: [
          "https://www.youtube.com/watch?v=3NjQ9b3pgIg",
          "https://www.youtube.com/watch?v=Q7153z9I1Zw"
        ]
      }
    },
    {
      id: 5,
      title: "Package Delivery SMS",
      type: "message",
      description: "You receive this SMS message:",
      content: `FEDEX: Your package is held at our facility due to incorrect delivery address. Update your delivery preferences here to receive your package: [Shortened URL]
Msg&data rates may apply`,
      options: [
        "Click the link to update delivery",
        "Ignore the message completely",
        "Check tracking on official FedEx website",
        "Reply with your address"
      ],
      correctAnswer: 2,
      explanation: "Always verify delivery issues through the official carrier's website by manually typing the URL. Don't click shortened URLs in text messages.",
      indicators: [
        "Shortened URL",
        "Creates urgency",
        "Generic message",
        "Requests clicking external link",
        "Poor grammar/formatting"
      ],
      learningResources: {
        articles: [
          "https://www.fedex.com/en-us/trust-center/fraud-prevention.html",
          "https://www.consumer.ftc.gov/articles/package-delivery-scams"
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
      setShowIndicators(false);
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
    setShowIndicators(false);
  };

  const getScenarioIcon = (type: string) => {
    switch (type) {
      case 'email':
        return '📧';
      case 'call':
        return '📞';
      case 'message':
        return '💬';
      default:
        return '❓';
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
    
    const currentIndex = challengeOrder.indexOf('/games/social-engineering-defender');
    if (currentIndex < challengeOrder.length - 1) {
      router.push(challengeOrder[currentIndex + 1]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Social Engineering Defender</h1>
        <p className="text-gray-600 dark:text-gray-400">Identify and defend against social engineering attacks</p>
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
              <span className="text-2xl">{getScenarioIcon(scenarios[currentScenario].type)}</span>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {scenarios[currentScenario].title}
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {scenarios[currentScenario].description}
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6 font-mono text-sm">
              <pre className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">
                {scenarios[currentScenario].content}
              </pre>
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

          {/* Explanation and Indicators */}
          {showExplanation && (
            <>
              <div className="mb-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
                    {scenarios[currentScenario].explanation}
                  </p>
                  <button
                    onClick={() => setShowIndicators(!showIndicators)}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {showIndicators ? 'Hide' : 'Show'} Attack Indicators
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
                                {article.includes('fdic.gov') ? 'FDIC Bank Scam Guide' :
                                 article.includes('ftc.gov') ? 'FTC Scam Prevention Guide' :
                                 article.includes('microsoft.com') ? 'Microsoft Security Guide' :
                                 article.includes('fbi.gov') ? 'FBI Scam Prevention' :
                                 article.includes('linkedin.com') ? 'LinkedIn Security Guide' :
                                 article.includes('sans.org') ? 'SANS Security Guide' :
                                 article.includes('ic3.gov') ? 'IC3 Fraud Alert' :
                                 article.includes('cisa.gov') ? 'CISA Security Alert' :
                                 article.includes('fedex.com') ? 'FedEx Fraud Prevention' :
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

                {showIndicators && (
                  <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300 mb-2">
                      Attack Indicators:
                    </h3>
                    <ul className="list-disc list-inside space-y-1">
                      {scenarios[currentScenario].indicators.map((indicator, index) => (
                        <li key={index} className="text-sm text-yellow-700 dark:text-yellow-400">
                          {indicator}
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
            You scored {score}% on the Social Engineering Defender challenge!
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