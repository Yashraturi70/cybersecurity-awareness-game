'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Course {
  id: string;
  title: string;
  description: string;
  modules: Module[];
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  icon: string;
}

interface Module {
  id: string;
  title: string;
  topics: Topic[];
}

interface Topic {
  id: string;
  title: string;
  description: string;
  content: {
    type: 'video' | 'article' | 'interactive';
    url?: string;
    duration?: string;
    thumbnail?: string;
  }[];
}

const courses: Course[] = [
  {
    id: 'cybersecurity-fundamentals',
    title: 'Cybersecurity Fundamentals',
    description: 'Master the basics of cybersecurity and build a strong foundation for advanced concepts.',
    level: 'Beginner',
    duration: '4-6 hours',
    icon: '🛡️',
    modules: [
      {
        id: 'intro-to-security',
        title: 'Introduction to Cybersecurity',
        topics: [
          {
            id: 'what-is-cybersecurity',
            title: 'What is Cybersecurity?',
            description: 'Understanding the basics of cybersecurity and its importance in today\'s digital world.',
            content: [
              {
                type: 'video',
                url: 'https://www.youtube.com/embed/sdpxddDzXfE',
                duration: '10:25',
                thumbnail: '/thumbnails/intro-cybersecurity.jpg'
              },
              {
                type: 'article',
                url: 'https://www.nist.gov/cybersecurity',
                duration: '15 min read'
              }
            ]
          },
          {
            id: 'common-threats',
            title: 'Common Security Threats',
            description: 'Overview of various cybersecurity threats and their potential impact.',
            content: [
              {
                type: 'video',
                url: 'https://www.youtube.com/embed/Dk-ZqQ-bfy4',
                duration: '15:30',
                thumbnail: '/thumbnails/security-threats.jpg'
              },
              {
                type: 'article',
                url: 'https://www.cisa.gov/topics/cyber-threats',
                duration: '20 min read'
              }
            ]
          },
          {
            id: 'security-principles',
            title: 'Basic Security Principles',
            description: 'Core principles of information security: Confidentiality, Integrity, and Availability.'
          }
        ]
      },
      {
        id: 'password-security',
        title: 'Password Security',
        topics: [
          {
            id: 'password-basics',
            title: 'Password Fundamentals',
            description: 'Learn about password strength, common vulnerabilities, and best practices.',
            content: [
              {
                type: 'video',
                url: 'https://www.youtube.com/embed/3NjQ9b3pgIg',
                duration: '8:45',
                thumbnail: '/thumbnails/password-basics.jpg'
              },
              {
                type: 'interactive',
                url: '/interactive/password-strength-checker'
              }
            ]
          },
          {
            id: 'password-management',
            title: 'Password Management',
            description: 'Tools and techniques for secure password management and storage.'
          }
        ]
      }
    ]
  },
  {
    id: 'social-engineering',
    title: 'Social Engineering Defense',
    description: 'Learn to identify and protect against social engineering attacks.',
    level: 'Intermediate',
    duration: '3-4 hours',
    icon: '🎭',
    modules: [
      {
        id: 'social-engineering-basics',
        title: 'Understanding Social Engineering',
        topics: [
          {
            id: 'what-is-social-engineering',
            title: 'What is Social Engineering?',
            description: 'Understanding how attackers exploit human psychology.',
            content: [
              {
                type: 'video',
                url: 'https://www.youtube.com/embed/lc7scxvKQOo',
                duration: '12:30',
                thumbnail: '/thumbnails/social-engineering.jpg'
              },
              {
                type: 'article',
                url: 'https://www.cisa.gov/topics/social-engineering',
                duration: '15 min read'
              }
            ]
          },
          {
            id: 'common-techniques',
            title: 'Common Attack Techniques',
            description: 'Learn about phishing, pretexting, baiting, and other social engineering methods.',
            content: [
              {
                type: 'video',
                url: 'https://www.youtube.com/embed/FrKmQYBr6EI',
                duration: '15:45',
                thumbnail: '/thumbnails/attack-techniques.jpg'
              },
              {
                type: 'interactive',
                url: '/interactive/identify-attack-type'
              }
            ]
          }
        ]
      },
      {
        id: 'phishing-defense',
        title: 'Phishing Prevention',
        topics: [
          {
            id: 'identifying-phishing',
            title: 'Identifying Phishing Attempts',
            description: 'Learn to spot the signs of phishing emails and messages.',
            content: [
              {
                type: 'video',
                url: 'https://www.youtube.com/embed/XBkzBrXlle0',
                duration: '10:15',
                thumbnail: '/thumbnails/phishing-detection.jpg'
              },
              {
                type: 'interactive',
                url: '/interactive/spot-phishing-email'
              }
            ]
          },
          {
            id: 'prevention-strategies',
            title: 'Prevention Strategies',
            description: 'Best practices and tools for preventing phishing attacks.',
            content: [
              {
                type: 'article',
                url: 'https://www.ftc.gov/tips-advice/business-center/small-businesses/cybersecurity/phishing',
                duration: '20 min read'
              },
              {
                type: 'video',
                url: 'https://www.youtube.com/embed/jK7EMqDCqZk',
                duration: '8:45',
                thumbnail: '/thumbnails/prevention.jpg'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'advanced-security',
    title: 'Advanced Security Concepts',
    description: 'Deep dive into advanced cybersecurity concepts and protection strategies.',
    level: 'Advanced',
    duration: '6-8 hours',
    icon: '🔐',
    modules: [
      {
        id: 'encryption',
        title: 'Encryption and Privacy',
        topics: [
          {
            id: 'encryption-basics',
            title: 'Understanding Encryption',
            description: 'Learn about different types of encryption and their applications.',
            content: [
              {
                type: 'video',
                url: 'https://www.youtube.com/embed/4zahvcJ9glg',
                duration: '14:20',
                thumbnail: '/thumbnails/encryption.jpg'
              },
              {
                type: 'article',
                url: 'https://www.nist.gov/privacy-framework/encryption-basics',
                duration: '25 min read'
              },
              {
                type: 'interactive',
                url: '/interactive/encryption-simulator'
              }
            ]
          },
          {
            id: 'privacy-tools',
            title: 'Privacy Tools and Techniques',
            description: 'Advanced tools and methods for maintaining digital privacy.',
            content: [
              {
                type: 'video',
                url: 'https://www.youtube.com/embed/WVDQEoe6ZWY',
                duration: '18:30',
                thumbnail: '/thumbnails/privacy-tools.jpg'
              },
              {
                type: 'article',
                url: 'https://www.privacytools.io/',
                duration: '30 min read'
              }
            ]
          }
        ]
      },
      {
        id: 'network-security',
        title: 'Network Security',
        topics: [
          {
            id: 'network-threats',
            title: 'Network Security Threats',
            description: 'Understanding common network attacks and vulnerabilities.',
            content: [
              {
                type: 'video',
                url: 'https://www.youtube.com/embed/E03gh1huvW4',
                duration: '20:15',
                thumbnail: '/thumbnails/network-threats.jpg'
              },
              {
                type: 'interactive',
                url: '/interactive/network-attack-simulation'
              }
            ]
          },
          {
            id: 'protection-strategies',
            title: 'Protection Strategies',
            description: 'Advanced techniques for securing networks and preventing attacks.',
            content: [
              {
                type: 'video',
                url: 'https://www.youtube.com/embed/sdpxddDzXfE',
                duration: '16:45',
                thumbnail: '/thumbnails/network-protection.jpg'
              },
              {
                type: 'article',
                url: 'https://www.cisa.gov/topics/cybersecurity-best-practices',
                duration: '25 min read'
              }
            ]
          }
        ]
      }
    ]
  }
];

export default function LearnPage() {
  const router = useRouter();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Advanced':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Cybersecurity Learning Hub
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Master cybersecurity through our structured learning paths. Complete these courses to prepare for the challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{course.icon}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(course.level)}`}>
                    {course.level}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{course.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{course.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span>Duration: {course.duration}</span>
                  <span>{course.modules.length} Modules</span>
                </div>
                <button
                  onClick={() => setSelectedCourse(selectedCourse?.id === course.id ? null : course)}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  {selectedCourse?.id === course.id ? 'Hide Content' : 'View Content'}
                </button>
              </div>

              {selectedCourse?.id === course.id && (
                <div className="border-t border-gray-100 dark:border-gray-700">
                  {course.modules.map((module) => (
                    <div key={module.id} className="border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                      <button
                        onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                        className="w-full px-6 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900 dark:text-white">{module.title}</span>
                          <span className="ml-6 text-gray-400">
                            {expandedModule === module.id ? '−' : '+'}
                          </span>
                        </div>
                      </button>

                      {expandedModule === module.id && (
                        <div className="px-6 pb-4">
                          {module.topics.map((topic) => (
                            <div key={topic.id} className="py-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                              <h4 className="font-medium text-gray-900 dark:text-white mb-2">{topic.title}</h4>
                              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{topic.description}</p>
                              
                              {/* Content Section */}
                              <div className="space-y-4">
                                {topic.content?.map((content, idx) => (
                                  <div key={idx} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                    {content.type === 'video' && (
                                      <div className="space-y-2">
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                          </svg>
                                          <span>Video • {content.duration}</span>
                                        </div>
                                        <a 
                                          href={content.url} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="block text-blue-600 dark:text-blue-400 hover:opacity-75 transition-opacity"
                                        >
                                          Watch Video →
                                        </a>
                                      </div>
                                    )}
                                    
                                    {content.type === 'article' && (
                                      <div className="space-y-2">
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                          </svg>
                                          <span>Article • {content.duration}</span>
                                        </div>
                                        <a 
                                          href={content.url} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="block text-blue-600 dark:text-blue-400 hover:opacity-75 transition-opacity"
                                        >
                                          Read Article →
                                        </a>
                                      </div>
                                    )}

                                    {content.type === 'interactive' && (
                                      <div className="space-y-2">
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                          </svg>
                                          <span>Interactive Exercise</span>
                                        </div>
                                        <a 
                                          href={content.url}
                                          className="block text-blue-600 dark:text-blue-400 hover:opacity-75 transition-opacity"
                                        >
                                          Start Exercise →
                                        </a>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Progress to Challenges CTA */}
        <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ready to Test Your Knowledge?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Once you've completed the courses, put your skills to the test with our interactive challenges.
          </p>
          <button
            onClick={() => router.push('/games')}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Go to Challenges
          </button>
        </div>
      </div>
    </div>
  );
} 