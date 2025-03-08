'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Email {
  id: number;
  subject: string;
  sender: string;
  content: string;
  indicators: string[];
  isPhishing: boolean;
  learningResources?: {
    articles?: string[];
    videos?: string[];
  };
}

const phishingEmails: Email[] = [
  {
    id: 1,
    subject: "Urgent: Your Account Security at Risk",
    sender: "security@arnaz0n.com",
    content: `Dear Valued Customer,

We detected unusual activity on your account. Your account will be suspended within 24 hours unless you verify your information immediately.

Click here to verify: http://amaz0n-security-verify.com/login

Best regards,
Amazon Security Team`,
    indicators: [
      "Suspicious sender domain (arnaz0n.com)",
      "Creates urgency with account suspension threat",
      "Suspicious link domain",
      "Generic greeting",
      "Poor grammar and formatting"
    ],
    isPhishing: true,
    learningResources: {
      articles: [
        "https://www.amazon.com/gp/help/customer/display.html?nodeId=GX7XFHQ3FUZ3L72K",
        "https://www.ftc.gov/news-events/topics/identity-theft/phishing-scams"
      ],
      videos: [
        "https://www.youtube.com/watch?v=XBkzBrXlle0",
        "https://www.youtube.com/watch?v=U3rqaeBPUq4"
      ]
    }
  },
  {
    id: 2,
    subject: "Your Recent Amazon Order #8742931",
    sender: "no-reply@amazon.com",
    content: `Hello,

Thank you for your recent order. Your package will arrive on Tuesday, March 15.

Track your package: https://amazon.com/track/8742931

Amazon.com`,
    indicators: [
      "Legitimate amazon.com domain",
      "No urgent action required",
      "Specific order number",
      "Clean formatting",
      "Standard tracking link"
    ],
    isPhishing: false,
    learningResources: {
      articles: [
        "https://www.amazon.com/gp/help/customer/display.html?nodeId=201909120",
        "https://www.consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams"
      ],
      videos: [
        "https://www.youtube.com/watch?v=u9-g7v2Zy5Q"
      ]
    }
  },
  {
    id: 3,
    subject: "Congratulations! You've Won an iPhone 15",
    sender: "prizes@winnerslottery.net",
    content: `CONGRATULATIONS!!!

You've been randomly selected to receive a FREE iPhone 15!

To claim your prize, click here: http://claim-your-prize-now.net/iphone15

You must claim within 24 hours or forfeit your prize!

Lucky Winners Team`,
    indicators: [
      "Unrealistic prize offer",
      "Unknown sender domain",
      "Excessive punctuation",
      "Urgent deadline",
      "Too good to be true"
    ],
    isPhishing: true
  },
  {
    id: 4,
    subject: "Invoice for Your Recent Purchase",
    sender: "billing@paypa1.com",
    content: `Dear User,

We noticed a charge of $499.99 on your account for a PlayStation 5.
If you didn't make this purchase, click here immediately:
http://paypa1-secure-billing.com/dispute

You have 24 hours to dispute this charge.

PayPal Billing Department`,
    indicators: [
      "Lookalike domain (paypa1 instead of paypal)",
      "Creates panic about unauthorized charge",
      "Suspicious external link",
      "Time pressure tactic",
      "Generic greeting"
    ],
    isPhishing: true
  },
  {
    id: 5,
    subject: "Your Netflix Subscription Update",
    sender: "info@netflix.com",
    content: `Hi there,

We're writing to let you know that we've updated our privacy policy. No action is required from you.

You can review the changes here: https://netflix.com/privacy

Thanks for being a Netflix member!

Netflix Team`,
    indicators: [
      "Legitimate netflix.com domain",
      "No urgent action required",
      "Professional formatting",
      "Official netflix.com link",
      "Standard notification"
    ],
    isPhishing: false
  }
];

export default function PhishingDetectivePage() {
  const router = useRouter();
  const [currentEmailIndex, setCurrentEmailIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);

  const currentEmail = phishingEmails[currentEmailIndex];

  const handleAnswer = (isPhishingGuess: boolean) => {
    setSelectedAnswer(isPhishingGuess);
    setShowFeedback(true);

    if (isPhishingGuess === currentEmail.isPhishing) {
      setScore(score + 20);
    }

    if (isPhishingGuess === currentEmail.isPhishing) {
      setTimeout(() => {
        setShowFeedback(false);
        setSelectedAnswer(null);
        
        if (currentEmailIndex < phishingEmails.length - 1) {
          setCurrentEmailIndex(currentEmailIndex + 1);
        } else {
          setGameOver(true);
        }
      }, 3000);
    }
  };

  const proceedToNext = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    
    if (currentEmailIndex < phishingEmails.length - 1) {
      setCurrentEmailIndex(currentEmailIndex + 1);
    } else {
      setGameOver(true);
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setCurrentEmailIndex(0);
    setGameOver(false);
    setShowFeedback(false);
    setSelectedAnswer(null);
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
    
    const currentIndex = challengeOrder.indexOf('/games/phishing-detective');
    if (currentIndex < challengeOrder.length - 1) {
      router.push(challengeOrder[currentIndex + 1]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Phishing Detective Challenge</h1>
        <p className="text-gray-600 dark:text-gray-400">Can you spot the phishing attempts?</p>
      </div>

      {!gameStarted ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Your mission is to analyze emails and identify potential phishing attempts. 
            Pay attention to sender addresses, links, and content to spot the red flags.
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
            <>
              {/* Score Display */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-600 dark:text-gray-400">Score: {score}/100</span>
                <span className="text-gray-600 dark:text-gray-400">Email {currentEmailIndex + 1} of {phishingEmails.length}</span>
              </div>

              {/* Email Display */}
              <div className="border dark:border-gray-700 rounded-lg p-4 mb-6">
                <div className="mb-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">From: {currentEmail.sender}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Subject: {currentEmail.subject}</p>
                </div>
                <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">
                  {currentEmail.content}
                </div>
              </div>

              {/* Decision Buttons */}
              {!showFeedback && (
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => handleAnswer(false)}
                    className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
                  >
                    Legitimate Email
                  </button>
                  <button
                    onClick={() => handleAnswer(true)}
                    className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
                  >
                    Phishing Attempt
                  </button>
                </div>
              )}

              {/* Feedback Display */}
              {showFeedback && (
                <div className={`p-4 rounded-lg ${
                  selectedAnswer === currentEmail.isPhishing
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200'
                    : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200'
                }`}>
                  <h3 className="font-medium mb-2">
                    {selectedAnswer === currentEmail.isPhishing
                      ? 'Correct! '
                      : 'Incorrect! '}
                    This is {currentEmail.isPhishing ? 'a phishing email' : 'a legitimate email'}.
                  </h3>
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Key Indicators:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {currentEmail.indicators.map((indicator, index) => (
                        <li key={index} className="text-sm">{indicator}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Learning Resources for Wrong Answers */}
                  {selectedAnswer !== currentEmail.isPhishing && currentEmail.learningResources && (
                    <div className="mt-6 bg-white dark:bg-gray-700 p-4 rounded-lg">
                      <h4 className="font-medium mb-3 text-gray-900 dark:text-white">Learning Resources:</h4>
                      
                      {currentEmail.learningResources.articles && currentEmail.learningResources.articles.length > 0 && (
                        <div className="mb-4">
                          <h5 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Articles:</h5>
                          <ul className="list-disc pl-5 space-y-2">
                            {currentEmail.learningResources.articles.map((article, index) => (
                              <li key={index}>
                                <a 
                                  href={article}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                                >
                                  {article.includes('amazon.com') ? 'Amazon Security Guide' :
                                   article.includes('ftc.gov') ? 'FTC Guide on Phishing' :
                                   'Learn More'}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {currentEmail.learningResources.videos && currentEmail.learningResources.videos.length > 0 && (
                        <div>
                          <h5 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Videos:</h5>
                          <ul className="list-disc pl-5 space-y-2">
                            {currentEmail.learningResources.videos.map((video, index) => (
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

                  {/* Next Button (only show if correct or after viewing resources) */}
                  <div className="mt-4">
                    <button
                      onClick={proceedToNext}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Next Email
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Challenge Complete!</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                You scored {score}% on the Phishing Detective challenge!
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