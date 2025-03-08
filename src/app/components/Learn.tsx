'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface LearningPath {
  id: number;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  topics: LearningTopic[];
}

interface LearningTopic {
  id: number;
  title: string;
  type: 'video' | 'article' | 'interactive';
  duration: string;
  description: string;
  url?: string;
  thumbnail?: string;
}

const learningPaths: LearningPath[] = [
  {
    id: 1,
    title: "Cybersecurity Fundamentals",
    description: "Start your cybersecurity journey with essential concepts and best practices.",
    level: "Beginner",
    duration: "2-3 hours",
    topics: [
      {
        id: 1,
        title: "Introduction to Cybersecurity",
        type: "video",
        duration: "15 min",
        description: "Learn the basics of cybersecurity and why it matters.",
        url: "https://www.youtube.com/watch?v=sdpxddDzXfE",
        thumbnail: "https://img.youtube.com/vi/sdpxddDzXfE/maxresdefault.jpg"
      },
      {
        id: 2,
        title: "Password Defense Game",
        type: "interactive",
        duration: "20 min",
        description: "Play an interactive game where you defend against password attacks and learn password best practices.",
        url: "/games/password-defense"
      },
      {
        id: 3,
        title: "Phishing Email Detective",
        type: "interactive",
        duration: "25 min",
        description: "Become a detective and spot phishing emails in this interactive game. Learn common phishing tactics.",
        url: "/games/phishing-detective"
      },
      {
        id: 4,
        title: "Security Habits Quest",
        type: "interactive",
        duration: "30 min",
        description: "An adventure game teaching good security habits through daily scenarios.",
        url: "/games/security-quest"
      }
    ]
  },
  {
    id: 2,
    title: "Digital Privacy & Protection",
    description: "Learn how to protect your personal information and maintain privacy online.",
    level: "Intermediate",
    duration: "3-4 hours",
    topics: [
      {
        id: 1,
        title: "Network Defense Simulator",
        type: "interactive",
        duration: "45 min",
        description: "Protect a virtual network from various cyber attacks in this strategy game.",
        url: "/games/network-defense"
      },
      {
        id: 2,
        title: "Encryption Challenge",
        type: "interactive",
        duration: "30 min",
        description: "Learn encryption concepts through puzzles and challenges.",
        url: "/games/encryption-challenge"
      },
      {
        id: 3,
        title: "Privacy Protector",
        type: "interactive",
        duration: "40 min",
        description: "Manage data privacy settings and protect user information in this simulation game.",
        url: "/games/privacy-protector"
      },
      {
        id: 4,
        title: "Secure Code Game",
        type: "interactive",
        duration: "35 min",
        description: "Find and fix security vulnerabilities in code through an interactive puzzle game.",
        url: "/games/secure-code"
      }
    ]
  },
  {
    id: 3,
    title: "Advanced Security Measures",
    description: "Master advanced cybersecurity concepts and protection strategies.",
    level: "Advanced",
    duration: "4-5 hours",
    topics: [
      {
        id: 1,
        title: "Cyber Incident Response",
        type: "interactive",
        duration: "60 min",
        description: "Handle real-world cyber incidents in this advanced simulation game.",
        url: "/games/incident-response"
      },
      {
        id: 2,
        title: "Penetration Testing Simulator",
        type: "interactive",
        duration: "90 min",
        description: "Learn ethical hacking through guided penetration testing challenges.",
        url: "/games/pentest-sim"
      },
      {
        id: 3,
        title: "Forensics Investigation",
        type: "interactive",
        duration: "75 min",
        description: "Investigate cyber crimes and collect digital evidence in this detective game.",
        url: "/games/cyber-forensics"
      },
      {
        id: 4,
        title: "Zero-Day Defense",
        type: "interactive",
        duration: "60 min",
        description: "Protect systems against unknown threats in this advanced defense game.",
        url: "/games/zero-day"
      }
    ]
  }
];

const Learn: React.FC = () => {
  const [selectedPath, setSelectedPath] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'Beginner' | 'Intermediate' | 'Advanced'>('all');

  const filteredPaths = learningPaths.filter(path => {
    const matchesSearch = path.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         path.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || path.level === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <div className="text-xl font-semibold text-gray-900 flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-2">
                  <span className="text-white">C</span>
                </div>
                CyberGuard
              </div>
            </Link>
            <Link
              href="/"
              className="text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors"
            >
              Return to Challenges
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cybersecurity Learning Center
          </h1>
          <p className="text-xl text-gray-900 max-w-3xl mx-auto">
            Structured learning paths to help you master cybersecurity concepts and practices.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search learning paths..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute left-3 top-2.5">🔍</span>
            </div>
            <div className="flex space-x-2">
              {(['all', 'Beginner', 'Intermediate', 'Advanced'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setFilter(level)}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    filter === level
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {level === 'all' ? 'All Levels' : level}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Learning Paths */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPaths.map(path => (
            <div
              key={path.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    path.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                    path.level === 'Intermediate' ? 'bg-blue-100 text-blue-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {path.level}
                  </span>
                  <span className="text-gray-900">{path.duration}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{path.title}</h3>
                <p className="text-gray-900 mb-4">{path.description}</p>
                <button
                  onClick={() => setSelectedPath(selectedPath === path.id ? null : path.id)}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {selectedPath === path.id ? 'Hide Content' : 'View Content'}
                </button>
              </div>
              
              {selectedPath === path.id && (
                <div className="border-t border-gray-200 p-6 bg-gray-50">
                  <h4 className="font-semibold text-gray-900 mb-4">Learning Topics</h4>
                  <div className="space-y-4">
                    {path.topics.map(topic => (
                      <div key={topic.id} className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`flex items-center text-sm font-medium ${
                            topic.type === 'video' ? 'text-red-600' :
                            topic.type === 'article' ? 'text-blue-600' :
                            'text-green-600'
                          }`}>
                            {topic.type === 'video' ? '🎥 Video' :
                             topic.type === 'article' ? '📄 Article' :
                             '🎮 Interactive'}
                          </span>
                          <span className="text-gray-900 text-sm">{topic.duration}</span>
                        </div>
                        <h5 className="font-medium text-gray-900 mb-2">{topic.title}</h5>
                        <p className="text-gray-900 text-sm mb-3">{topic.description}</p>
                        {topic.url && (
                          <a
                            href={topic.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-600 hover:text-blue-700"
                          >
                            Start Learning →
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Progress Tracking */}
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Learning Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Completed Topics</h3>
              <p className="text-3xl font-bold text-gray-900">0/8</p>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }} />
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Time Invested</h3>
              <p className="text-3xl font-bold text-gray-900">0h</p>
              <p className="text-gray-900">Out of 9-12 hours</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Current Level</h3>
              <p className="text-3xl font-bold text-gray-900">Beginner</p>
              <p className="text-gray-900">Keep learning!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn; 