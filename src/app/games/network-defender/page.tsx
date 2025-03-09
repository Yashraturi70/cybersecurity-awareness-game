'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Attack {
  id: string;
  type: string;
  description: string;
  source: string;
  target: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  requiredDefenses: string[];
  solution?: string;
  learningResources?: {
    articles?: string[];
    videos?: string[];
  };
}

interface Defense {
  id: string;
  name: string;
  description: string;
  type: 'Firewall' | 'IDS' | 'Authentication' | 'Encryption';
  cost: number;
  effectiveness: number;
  maintenanceCost?: number;
  incompatibleWith?: string[];
}

const availableDefenses: Defense[] = [
  {
    id: 'fw-basic',
    name: 'Basic Firewall',
    description: 'Blocks unauthorized incoming connections',
    type: 'Firewall',
    cost: 15,
    effectiveness: 70,
    maintenanceCost: 5
  },
  {
    id: 'fw-advanced',
    name: 'Advanced Firewall',
    description: 'Deep packet inspection and traffic analysis',
    type: 'Firewall',
    cost: 30,
    effectiveness: 90,
    maintenanceCost: 10,
    incompatibleWith: ['fw-basic']
  },
  {
    id: 'ids-basic',
    name: 'Network IDS',
    description: 'Detects suspicious network activity',
    type: 'IDS',
    cost: 20,
    effectiveness: 80,
    maintenanceCost: 8
  },
  {
    id: 'auth-2fa',
    name: '2FA System',
    description: 'Two-factor authentication for all users',
    type: 'Authentication',
    cost: 20,
    effectiveness: 85,
    maintenanceCost: 5
  },
  {
    id: 'enc-data',
    name: 'Data Encryption',
    description: 'Encrypts sensitive data in transit',
    type: 'Encryption',
    cost: 25,
    effectiveness: 95,
    maintenanceCost: 8
  }
];

const networkAttacks: Attack[] = [
  {
    id: 'ddos-1',
    type: 'DDoS Attack',
    description: 'Distributed Denial of Service attack from multiple sources',
    source: 'Multiple IPs',
    target: 'Web Server',
    severity: 'High',
    requiredDefenses: ['fw-advanced', 'ids-basic'],
    solution: 'Deploy an Advanced Firewall with Network IDS to detect and mitigate distributed attacks.',
    learningResources: {
      articles: [
        "https://www.cisa.gov/news-events/news/understanding-and-responding-distributed-denial-service-attacks",
        "https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/"
      ],
      videos: [
        "https://www.youtube.com/watch?v=3NjQ9b3pgIg",
        "https://www.youtube.com/watch?v=PYJtRWEqhy0"
      ]
    }
  },
  {
    id: 'brute-1',
    type: 'Brute Force',
    description: 'Attempting to crack user passwords',
    source: '192.168.1.100',
    target: 'Authentication Server',
    severity: 'Medium',
    requiredDefenses: ['auth-2fa', 'fw-basic'],
    solution: 'Implement 2FA and a Basic Firewall to prevent repeated login attempts.',
    learningResources: {
      articles: [
        "https://www.nist.gov/itl/applied-cybersecurity/tig/back-basics-multi-factor-authentication",
        "https://www.cisa.gov/news-events/news/implementing-strong-authentication"
      ],
      videos: [
        "https://www.youtube.com/watch?v=ZXFYT-BG2So",
        "https://www.youtube.com/watch?v=UBUNrFtufWo"
      ]
    }
  },
  {
    id: 'mitm-1',
    type: 'Man-in-the-Middle',
    description: 'Intercepting unencrypted data between client and server',
    source: 'Network',
    target: 'Data Transmission',
    severity: 'High',
    requiredDefenses: ['enc-data', 'fw-basic'],
    solution: 'Use Data Encryption with a Basic Firewall to protect data in transit.',
    learningResources: {
      articles: [
        "https://www.owasp.org/index.php/Man-in-the-middle_attack",
        "https://www.cloudflare.com/learning/ssl/what-is-a-man-in-the-middle-attack/"
      ],
      videos: [
        "https://www.youtube.com/watch?v=DgqID9k83oQ",
        "https://www.youtube.com/watch?v=q3aXnxqHeTc"
      ]
    }
  },
  {
    id: 'scan-1',
    type: 'Port Scanning',
    description: 'Scanning for open ports and services',
    source: '10.0.0.5',
    target: 'Network Infrastructure',
    severity: 'Low',
    requiredDefenses: ['fw-basic', 'ids-basic'],
    solution: 'Use a Basic Firewall with Network IDS to detect and block port scanning attempts.',
    learningResources: {
      articles: [
        "https://www.sans.org/security-resources/sec560/port_scanning_basics_pdf",
        "https://nmap.org/book/port-scanning-basics.html"
      ],
      videos: [
        "https://www.youtube.com/watch?v=GJ55rcKSlnE",
        "https://www.youtube.com/watch?v=3Od2vDL-0Mo"
      ]
    }
  }
];

export default function NetworkDefenderPage() {
  const router = useRouter();
  const [gameStarted, setGameStarted] = useState(false);
  const [budget, setBudget] = useState(100);
  const [activeDefenses, setActiveDefenses] = useState<string[]>([]);
  const [currentAttack, setCurrentAttack] = useState<Attack | null>(null);
  const [attackHistory, setAttackHistory] = useState<{
    attack: Attack;
    success: boolean;
  }[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [totalPossibleScore, setTotalPossibleScore] = useState(networkAttacks.length * 25);
  const [showLastAttackResult, setShowLastAttackResult] = useState(false);
  const [attackOrder, setAttackOrder] = useState<Attack[]>([]);
  const [maxActiveDefenses] = useState(3);
  const [maintenanceCosts, setMaintenanceCosts] = useState(0);

  const startGame = () => {
    setGameStarted(true);
    setBudget(100);
    setActiveDefenses([]);
    setAttackHistory([]);
    setGameOver(false);
    setScore(0);
    setRound(1);
    setShowLastAttackResult(false);
    setMaintenanceCosts(0);
    
    const orderedAttacks = [...networkAttacks].sort((a, b) => {
      const costA = a.requiredDefenses.reduce((total, defId) => {
        const defense = availableDefenses.find(d => d.id === defId);
        return total + (defense ? defense.cost : 0);
      }, 0);
      
      const costB = b.requiredDefenses.reduce((total, defId) => {
        const defense = availableDefenses.find(d => d.id === defId);
        return total + (defense ? defense.cost : 0);
      }, 0);
      
      return costA - costB;
    });
    
    setAttackOrder(orderedAttacks);
    setCurrentAttack(orderedAttacks[0]);
  };

  const launchAttack = () => {
    if (round > networkAttacks.length) {
      setGameOver(true);
      return;
    }
    
    const totalMaintenance = activeDefenses.reduce((total, defId) => {
      const defense = availableDefenses.find(d => d.id === defId);
      return total + (defense?.maintenanceCost || 0);
    }, 0);
    
    setBudget(prev => Math.max(0, prev - totalMaintenance));
    setMaintenanceCosts(totalMaintenance);
    
    setCurrentAttack(attackOrder[round - 1]);
  };

  const isDefenseCompatible = (defenseId: string) => {
    const defense = availableDefenses.find(d => d.id === defenseId);
    if (!defense || !defense.incompatibleWith) return true;
    
    return !defense.incompatibleWith.some(incompatibleId => 
      activeDefenses.includes(incompatibleId)
    );
  };

  const purchaseDefense = (defense: Defense) => {
    if (activeDefenses.length >= maxActiveDefenses && !activeDefenses.includes(defense.id)) {
      alert("You've reached the maximum number of active defenses. Deactivate one before adding another.");
      return;
    }
    
    if (!isDefenseCompatible(defense.id)) {
      alert(`${defense.name} is not compatible with your current defenses.`);
      return;
    }
    
    if (budget >= defense.cost && !activeDefenses.includes(defense.id)) {
      setBudget(prev => prev - defense.cost);
      setActiveDefenses(prev => [...prev, defense.id]);
    }
  };

  const removeDefense = (defenseId: string) => {
    setActiveDefenses(prev => prev.filter(id => id !== defenseId));
    const defense = availableDefenses.find(d => d.id === defenseId);
    if (defense) {
      setBudget(prev => prev + Math.floor(defense.cost / 2));
    }
  };

  const handleAttack = () => {
    if (!currentAttack) return;

    const requiredDefenses = new Set(currentAttack.requiredDefenses);
    const activeDefensesSet = new Set(activeDefenses);
    const hasAllDefenses = currentAttack.requiredDefenses.every(defense => 
      activeDefensesSet.has(defense)
    );

    const attackResult = {
      attack: currentAttack,
      success: hasAllDefenses
    };

    setAttackHistory(prev => [...prev, attackResult]);
    
    if (hasAllDefenses) {
      setScore(prev => prev + 25);
      setBudget(prev => prev + 25);
    }
    
    if (round >= networkAttacks.length) {
      setShowLastAttackResult(true);
    } else {
      setRound(prev => prev + 1);
      launchAttack();
    }
  };

  const finishGame = () => {
    setGameOver(true);
    setShowLastAttackResult(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Low':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Medium':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'High':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'Critical':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
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
    
    const currentIndex = challengeOrder.indexOf('/games/network-defender');
    if (currentIndex < challengeOrder.length - 1) {
      router.push(challengeOrder[currentIndex + 1]);
    }
  };

  const calculatePercentageScore = () => {
    return Math.round((score / totalPossibleScore) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Network Defender Challenge</h1>
          <p className="text-gray-600 dark:text-gray-400">Protect your network from cyber attacks</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          {!gameStarted ? (
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Your mission is to defend a corporate network from various cyber attacks.
                Purchase and deploy security measures within your budget to protect against incoming threats.
                <br /><br />
                <strong>Strategic considerations:</strong>
                <ul className="list-disc text-left max-w-md mx-auto mt-2 space-y-1">
                  <li>You can only have {maxActiveDefenses} active defenses at a time</li>
                  <li>Some defenses are incompatible with each other</li>
                  <li>Each defense has a maintenance cost per round</li>
                  <li>Successfully defending against attacks earns budget rewards</li>
                  <li>You can deactivate defenses to recover some of their cost</li>
                </ul>
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
              {!gameOver && !showLastAttackResult ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-gray-600 dark:text-gray-300">Budget: ${budget}</span>
                    <span className="text-gray-600 dark:text-gray-300">Score: {score} points</span>
                    <span className="text-gray-600 dark:text-gray-300">Round: {round}/{networkAttacks.length}</span>
                  </div>

                  {maintenanceCosts > 0 && (
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded-lg text-sm">
                      Maintenance costs: ${maintenanceCosts} per round for active defenses
                    </div>
                  )}

                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Active Defenses ({activeDefenses.length}/{maxActiveDefenses})</h3>
                    </div>
                    
                    {activeDefenses.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                        {activeDefenses.map(defenseId => {
                          const defense = availableDefenses.find(d => d.id === defenseId);
                          if (!defense) return null;
                          
                          return (
                            <div key={defense.id} className="p-4 border border-green-500 bg-green-50 dark:bg-green-900/20 rounded-lg">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium text-gray-900 dark:text-white">{defense.name}</h4>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  Maintenance: ${defense.maintenanceCost}/round
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{defense.description}</p>
                              <button
                                onClick={() => removeDefense(defense.id)}
                                className="w-full px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
                              >
                                Deactivate (Refund ${Math.floor(defense.cost / 2)})
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 mb-6">No active defenses. Purchase defenses below.</p>
                    )}

                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Available Defenses</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {availableDefenses.map(defense => {
                        const isActive = activeDefenses.includes(defense.id);
                        const canAfford = budget >= defense.cost;
                        const isCompatible = isDefenseCompatible(defense.id);
                        const hasSpace = activeDefenses.length < maxActiveDefenses || isActive;
                        
                        return (
                          <div
                            key={defense.id}
                            className={`p-4 border rounded-lg ${
                              isActive
                                ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                                : !isCompatible
                                ? 'border-red-200 bg-red-50 dark:bg-red-900/10'
                                : !hasSpace
                                ? 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/10'
                                : 'border-gray-200 dark:border-gray-700'
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium text-gray-900 dark:text-white">{defense.name}</h4>
                              <div className="text-right">
                                <span className="text-sm text-gray-500 dark:text-gray-400">Cost: ${defense.cost}</span>
                                <br />
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  Maintenance: ${defense.maintenanceCost}/round
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{defense.description}</p>
                            {defense.incompatibleWith && defense.incompatibleWith.length > 0 && (
                              <p className="text-xs text-red-600 dark:text-red-400 mb-4">
                                Not compatible with: {defense.incompatibleWith.map(id => {
                                  const incompatibleDefense = availableDefenses.find(d => d.id === id);
                                  return incompatibleDefense ? incompatibleDefense.name : id;
                                }).join(', ')}
                              </p>
                            )}
                            <button
                              onClick={() => purchaseDefense(defense)}
                              disabled={isActive || !canAfford || !isCompatible || !hasSpace}
                              className={`w-full px-4 py-2 rounded-md ${
                                isActive
                                  ? 'bg-green-500 text-white'
                                  : !canAfford || !isCompatible || !hasSpace
                                  ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                                  : 'bg-blue-600 text-white hover:bg-blue-700'
                              }`}
                            >
                              {isActive
                                ? 'Deployed'
                                : !canAfford
                                ? 'Insufficient Budget'
                                : !isCompatible
                                ? 'Incompatible with Active Defenses'
                                : !hasSpace
                                ? 'Maximum Defenses Reached'
                                : 'Purchase & Deploy'}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {currentAttack && (
                    <div className="border dark:border-gray-700 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Incoming Attack</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(currentAttack.severity)}`}>
                          {currentAttack.severity}
                        </span>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Type: {currentAttack.type}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Source: {currentAttack.source}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Target: {currentAttack.target}</p>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">{currentAttack.description}</p>
                        <button
                          onClick={handleAttack}
                          className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                        >
                          Attempt to Defend
                        </button>
                      </div>
                    </div>
                  )}

                  {attackHistory.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Attack History</h3>
                      <div className="space-y-4">
                        {attackHistory.map((entry, index) => (
                          <div
                            key={index}
                            className={`p-4 rounded-lg ${
                              entry.success
                                ? 'bg-green-50 dark:bg-green-900/20'
                                : 'bg-red-50 dark:bg-red-900/20'
                            }`}
                          >
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium text-gray-900 dark:text-white">
                                {entry.attack.type}
                              </span>
                              <span className={
                                entry.success
                                  ? 'text-green-600 dark:text-green-400'
                                  : 'text-red-600 dark:text-red-400'
                              }>
                                {entry.success ? 'Defended' : 'Breach'}
                              </span>
                            </div>

                            {!entry.success && entry.attack.solution && (
                              <div className="mt-2 mb-4">
                                <h4 className="font-medium text-gray-800 dark:text-gray-200">Solution:</h4>
                                <p className="text-gray-600 dark:text-gray-400">{entry.attack.solution}</p>
                              </div>
                            )}

                            {!entry.success && entry.attack.learningResources && (
                              <div className="mt-4 bg-white dark:bg-gray-700 p-4 rounded-lg">
                                <h4 className="font-medium mb-3 text-gray-900 dark:text-white">Learning Resources:</h4>
                                
                                {entry.attack.learningResources.articles && entry.attack.learningResources.articles.length > 0 && (
                                  <div className="mb-4">
                                    <h5 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Articles:</h5>
                                    <ul className="list-disc pl-5 space-y-2">
                                      {entry.attack.learningResources.articles.map((article, index) => (
                                        <li key={index}>
                                          <a 
                                            href={article}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                                          >
                                            {article.includes('cisa.gov') ? 'CISA Security Guide' :
                                             article.includes('cloudflare.com') ? 'Cloudflare DDoS Guide' :
                                             article.includes('nist.gov') ? 'NIST Security Guide' :
                                             article.includes('owasp.org') ? 'OWASP Security Guide' :
                                             article.includes('sans.org') ? 'SANS Security Guide' :
                                             article.includes('microsoft.com') ? 'Microsoft Security Guide' :
                                             'Learn More'}
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {entry.attack.learningResources.videos && entry.attack.learningResources.videos.length > 0 && (
                                  <div>
                                    <h5 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Videos:</h5>
                                    <ul className="list-disc pl-5 space-y-2">
                                      {entry.attack.learningResources.videos.map((video, index) => (
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
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : showLastAttackResult ? (
                <div className="space-y-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Final Attack Result</h3>
                    {attackHistory.length > 0 && (
                      <div className={`p-4 rounded-lg ${
                        attackHistory[attackHistory.length - 1].success
                          ? 'bg-green-50 dark:bg-green-900/20'
                          : 'bg-red-50 dark:bg-red-900/20'
                      }`}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {attackHistory[attackHistory.length - 1].attack.type}
                          </span>
                          <span className={
                            attackHistory[attackHistory.length - 1].success
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-red-600 dark:text-red-400'
                          }>
                            {attackHistory[attackHistory.length - 1].success ? 'Defended' : 'Breach'}
                          </span>
                        </div>
                        
                        {!attackHistory[attackHistory.length - 1].success && attackHistory[attackHistory.length - 1].attack.solution && (
                          <div className="mt-2 mb-4">
                            <h4 className="font-medium text-gray-800 dark:text-gray-200">Solution:</h4>
                            <p className="text-gray-600 dark:text-gray-400">{attackHistory[attackHistory.length - 1].attack.solution}</p>
                          </div>
                        )}

                        {!attackHistory[attackHistory.length - 1].success && attackHistory[attackHistory.length - 1].attack.learningResources && (
                          <div className="mt-4 bg-white dark:bg-gray-700 p-4 rounded-lg">
                            <h4 className="font-medium mb-3 text-gray-900 dark:text-white">Learning Resources:</h4>
                            
                            {attackHistory[attackHistory.length - 1].attack.learningResources.articles && 
                             attackHistory[attackHistory.length - 1].attack.learningResources.articles.length > 0 && (
                              <div className="mb-4">
                                <h5 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Articles:</h5>
                                <ul className="list-disc pl-5 space-y-2">
                                  {attackHistory[attackHistory.length - 1].attack.learningResources.articles.map((article, index) => (
                                    <li key={index}>
                                      <a 
                                        href={article}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                                      >
                                        {article.includes('cisa.gov') ? 'CISA Security Guide' :
                                         article.includes('cloudflare.com') ? 'Cloudflare DDoS Guide' :
                                         article.includes('nist.gov') ? 'NIST Security Guide' :
                                         article.includes('owasp.org') ? 'OWASP Security Guide' :
                                         article.includes('sans.org') ? 'SANS Security Guide' :
                                         article.includes('microsoft.com') ? 'Microsoft Security Guide' :
                                         'Learn More'}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {attackHistory[attackHistory.length - 1].attack.learningResources.videos && 
                             attackHistory[attackHistory.length - 1].attack.learningResources.videos.length > 0 && (
                              <div>
                                <h5 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Videos:</h5>
                                <ul className="list-disc pl-5 space-y-2">
                                  {attackHistory[attackHistory.length - 1].attack.learningResources.videos.map((video, index) => (
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
                    <button
                      onClick={finishGame}
                      className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      See Final Results
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Challenge Complete!</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    You scored {calculatePercentageScore()}% on the Network Defender challenge!
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
      </div>
    </div>
  );
} 