'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Rule {
  id: number;
  protocol: 'TCP' | 'UDP' | 'ICMP';
  source: string;
  destination: string;
  port: string;
  action: 'ALLOW' | 'DENY';
}

interface Attack {
  id: number;
  type: string;
  description: string;
  traffic: {
    protocol: 'TCP' | 'UDP' | 'ICMP';
    source: string;
    destination: string;
    port: string;
  };
  solution: Rule[];
  learningResources?: {
    articles?: string[];
    videos?: string[];
  };
}

export default function FirewallMasterPage() {
  const router = useRouter();
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [rules, setRules] = useState<Rule[]>([]);
  const [gameComplete, setGameComplete] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [attackBlocked, setAttackBlocked] = useState(false);

  const levels: Attack[] = [
    {
      id: 1,
      type: "Port Scan Attack",
      description: "An attacker is attempting to scan your network for open ports. Block suspicious port scanning traffic while maintaining legitimate service access.",
      traffic: {
        protocol: 'TCP',
        source: '192.168.1.100',
        destination: '*',
        port: '1-1024'
      },
      solution: [
        {
          id: 1,
          protocol: 'TCP',
          source: '192.168.1.100',
          destination: '*',
          port: '1-1024',
          action: 'DENY'
        },
        {
          id: 2,
          protocol: 'TCP',
          source: '*',
          destination: '*',
          port: '80,443',
          action: 'ALLOW'
        }
      ],
      learningResources: {
        articles: [
          "https://www.cisa.gov/news-events/news/detecting-and-preventing-port-scanning-attacks",
          "https://www.sans.org/blog/understanding-port-scanning/"
        ],
        videos: [
          "https://www.youtube.com/watch?v=3NjQ9b3pgIg",
          "https://www.youtube.com/watch?v=PYJtRWEqhy0"
        ]
      }
    },
    {
      id: 2,
      type: "DDoS Attack",
      description: "Your network is under a DDoS attack from multiple sources. Configure rules to mitigate the attack while ensuring legitimate traffic can still pass.",
      traffic: {
        protocol: 'UDP',
        source: '10.0.0.0/24',
        destination: '192.168.1.10',
        port: '53'
      },
      solution: [
        {
          id: 1,
          protocol: 'UDP',
          source: '10.0.0.0/24',
          destination: '192.168.1.10',
          port: '53',
          action: 'DENY'
        },
        {
          id: 2,
          protocol: 'UDP',
          source: 'TRUSTED_DNS',
          destination: '*',
          port: '53',
          action: 'ALLOW'
        }
      ],
      learningResources: {
        articles: [
          "https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/",
          "https://www.cisa.gov/news-events/news/understanding-and-responding-distributed-denial-service-attacks"
        ],
        videos: [
          "https://www.youtube.com/watch?v=7U-RbOKanYs",
          "https://www.youtube.com/watch?v=Q7153z9I1Zw"
        ]
      }
    },
    {
      id: 3,
      type: "SQL Injection Prevention",
      description: "Configure the firewall to protect your database server from SQL injection attempts while allowing legitimate database connections.",
      traffic: {
        protocol: 'TCP',
        source: '*',
        destination: 'DB_SERVER',
        port: '3306'
      },
      solution: [
        {
          id: 1,
          protocol: 'TCP',
          source: 'APP_SERVERS',
          destination: 'DB_SERVER',
          port: '3306',
          action: 'ALLOW'
        },
        {
          id: 2,
          protocol: 'TCP',
          source: '*',
          destination: 'DB_SERVER',
          port: '*',
          action: 'DENY'
        }
      ],
      learningResources: {
        articles: [
          "https://owasp.org/www-community/attacks/SQL_Injection",
          "https://www.sans.org/blog/protecting-databases-from-sql-injection/"
        ],
        videos: [
          "https://www.youtube.com/watch?v=opRMrEfAIiI",
          "https://www.youtube.com/watch?v=IgCHcuCw_RQ"
        ]
      }
    },
    {
      id: 4,
      type: "Brute Force Protection",
      description: "Implement rules to prevent brute force attacks on your SSH service while maintaining admin access.",
      traffic: {
        protocol: 'TCP',
        source: 'UNKNOWN',
        destination: 'ADMIN_SERVER',
        port: '22'
      },
      solution: [
        {
          id: 1,
          protocol: 'TCP',
          source: 'ADMIN_IPS',
          destination: 'ADMIN_SERVER',
          port: '22',
          action: 'ALLOW'
        },
        {
          id: 2,
          protocol: 'TCP',
          source: '*',
          destination: 'ADMIN_SERVER',
          port: '22',
          action: 'DENY'
        }
      ],
      learningResources: {
        articles: [
          "https://www.nist.gov/blogs/cybersecurity-insights/preventing-brute-force-attacks",
          "https://www.sans.org/blog/securing-ssh-access/"
        ],
        videos: [
          "https://www.youtube.com/watch?v=h8PLDguZ4ME",
          "https://www.youtube.com/watch?v=4PZb0Vy8tIs"
        ]
      }
    },
    {
      id: 5,
      type: "Zero-Day Attack Defense",
      description: "Configure advanced firewall rules to protect against unknown threats while maintaining essential services.",
      traffic: {
        protocol: 'TCP',
        source: '*',
        destination: '*',
        port: '*'
      },
      solution: [
        {
          id: 1,
          protocol: 'TCP',
          source: 'TRUSTED_NETWORKS',
          destination: 'INTERNAL_SERVICES',
          port: 'REQUIRED_PORTS',
          action: 'ALLOW'
        },
        {
          id: 2,
          protocol: 'TCP',
          source: '*',
          destination: '*',
          port: '*',
          action: 'DENY'
        }
      ],
      learningResources: {
        articles: [
          "https://www.cisa.gov/news-events/news/zero-day-vulnerability-protection",
          "https://www.sans.org/blog/defense-in-depth-strategies/"
        ],
        videos: [
          "https://www.youtube.com/watch?v=3NjQ9b3pgIg",
          "https://www.youtube.com/watch?v=PYJtRWEqhy0"
        ]
      }
    }
  ];

  const addRule = () => {
    const newRule: Rule = {
      id: rules.length + 1,
      protocol: 'TCP',
      source: '*',
      destination: '*',
      port: '*',
      action: 'ALLOW'
    };
    setRules([...rules, newRule]);
  };

  const updateRule = (id: number, field: keyof Rule, value: string) => {
    setRules(rules.map(rule => 
      rule.id === id 
        ? { ...rule, [field]: value }
        : rule
    ));
  };

  const deleteRule = (id: number) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  const checkSolution = () => {
    const currentAttack = levels[currentLevel];
    const requiredRules = currentAttack.solution;
    
    // Simple check - ensure all required rules are present
    const hasAllRules = requiredRules.every(required => 
      rules.some(rule =>
        rule.protocol === required.protocol &&
        rule.action === required.action &&
        (rule.source === required.source || rule.source === '*') &&
        (rule.destination === required.destination || rule.destination === '*') &&
        (rule.port === required.port || rule.port === '*')
      )
    );

    setAttackBlocked(hasAllRules);
    setShowSolution(true);

    if (hasAllRules) {
      setScore(score + 20);
    }
  };

  const nextLevel = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(currentLevel + 1);
      setRules([]);
      setShowSolution(false);
      setAttackBlocked(false);
    } else {
      setGameComplete(true);
    }
  };

  const resetGame = () => {
    setCurrentLevel(0);
    setScore(0);
    setRules([]);
    setShowSolution(false);
    setAttackBlocked(false);
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
    
    const currentIndex = challengeOrder.indexOf('/games/firewall-master');
    if (currentIndex < challengeOrder.length - 1) {
      router.push(challengeOrder[currentIndex + 1]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Firewall Master</h1>
        <p className="text-gray-600 dark:text-gray-400">Configure firewall rules to protect against network attacks</p>
      </div>

      {!gameComplete ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          {/* Progress and Score */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Level</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {currentLevel + 1} of {levels.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${((currentLevel + 1) / levels.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Score</span>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{score}%</span>
            </div>
          </div>

          {/* Attack Description */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {levels[currentLevel].type}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {levels[currentLevel].description}
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Detected Traffic:</h3>
              <div className="font-mono text-sm text-gray-600 dark:text-gray-400">
                <div>Protocol: {levels[currentLevel].traffic.protocol}</div>
                <div>Source: {levels[currentLevel].traffic.source}</div>
                <div>Destination: {levels[currentLevel].traffic.destination}</div>
                <div>Port: {levels[currentLevel].traffic.port}</div>
              </div>
            </div>
          </div>

          {/* Firewall Rules */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Firewall Rules</h3>
              <button
                onClick={addRule}
                className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Rule
              </button>
            </div>
            <div className="space-y-4">
              {rules.map(rule => (
                <div key={rule.id} className="flex items-center gap-2 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <select
                    value={rule.protocol}
                    onChange={(e) => updateRule(rule.id, 'protocol', e.target.value as 'TCP' | 'UDP' | 'ICMP')}
                    className="bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded px-2 py-1 text-sm"
                  >
                    <option value="TCP">TCP</option>
                    <option value="UDP">UDP</option>
                    <option value="ICMP">ICMP</option>
                  </select>
                  <input
                    type="text"
                    value={rule.source}
                    onChange={(e) => updateRule(rule.id, 'source', e.target.value)}
                    placeholder="Source"
                    className="bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded px-2 py-1 text-sm flex-1"
                  />
                  <input
                    type="text"
                    value={rule.destination}
                    onChange={(e) => updateRule(rule.id, 'destination', e.target.value)}
                    placeholder="Destination"
                    className="bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded px-2 py-1 text-sm flex-1"
                  />
                  <input
                    type="text"
                    value={rule.port}
                    onChange={(e) => updateRule(rule.id, 'port', e.target.value)}
                    placeholder="Port"
                    className="bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded px-2 py-1 text-sm w-24"
                  />
                  <select
                    value={rule.action}
                    onChange={(e) => updateRule(rule.id, 'action', e.target.value as 'ALLOW' | 'DENY')}
                    className="bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded px-2 py-1 text-sm"
                  >
                    <option value="ALLOW">ALLOW</option>
                    <option value="DENY">DENY</option>
                  </select>
                  <button
                    onClick={() => deleteRule(rule.id)}
                    className="p-1 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          {!showSolution ? (
            <button
              onClick={checkSolution}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Test Configuration
            </button>
          ) : (
            <div>
              <div className={`mb-6 p-4 rounded-lg ${
                attackBlocked 
                  ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                  : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
              }`}>
                {attackBlocked 
                  ? 'Success! Your firewall rules successfully blocked the attack.'
                  : 'Your configuration did not fully protect against the attack. Try again or view the solution.'}
              </div>

              {/* Learning Resources for Failed Configuration */}
              {!attackBlocked && levels[currentLevel].learningResources && (
                <div className="mt-6 bg-white dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-medium mb-3 text-gray-900 dark:text-white">Learning Resources:</h4>
                  
                  {levels[currentLevel].learningResources.articles && levels[currentLevel].learningResources.articles.length > 0 && (
                    <div className="mb-4">
                      <h5 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Articles:</h5>
                      <ul className="list-disc pl-5 space-y-2">
                        {levels[currentLevel].learningResources.articles.map((article, index) => (
                          <li key={index}>
                            <a 
                              href={article}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                            >
                              {article.includes('cisa.gov') ? 'CISA Security Guide' :
                               article.includes('cloudflare.com') ? 'Cloudflare DDoS Guide' :
                               article.includes('owasp.org') ? 'OWASP Security Guide' :
                               article.includes('sans.org') ? 'SANS Security Guide' :
                               article.includes('nist.gov') ? 'NIST Security Guide' :
                               'Learn More'}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {levels[currentLevel].learningResources.videos && levels[currentLevel].learningResources.videos.length > 0 && (
                    <div>
                      <h5 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Videos:</h5>
                      <ul className="list-disc pl-5 space-y-2">
                        {levels[currentLevel].learningResources.videos.map((video, index) => (
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

              {attackBlocked && (
                <button
                  onClick={nextLevel}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  {currentLevel < levels.length - 1 ? 'Next Level' : 'Complete Challenge'}
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Challenge Complete!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You scored {score}% on the Firewall Master challenge!
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