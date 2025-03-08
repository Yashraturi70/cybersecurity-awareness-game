import { Challenge } from '../types';

export const challenges: Challenge[] = [
  {
    id: 1,
    title: "Password Security Mastery",
    description: "Learn how to create and manage strong, unique passwords to protect your accounts.",
    points: 100,
    difficulty: "Beginner",
    icon: "🔑",
    completed: false,
    progress: 0,
    quizzes: [
      {
        id: 1,
        type: "matching",
        question: "Match the password characteristics with their security level:",
        options: [
          "P@ssw0rd123",
          "correct-horse-battery-staple",
          "password123",
          "Tr0ub4dour&3",
          "MyP@ssw0rd!"
        ],
        matches: [
          "Weak - Common pattern",
          "Strong - Long passphrase",
          "Very weak - Common password",
          "Medium - Complex but short",
          "Weak - Predictable pattern"
        ],
        correctAnswer: [2, 0, 4, 3, 1],
        explanation: "Long passphrases are more secure than complex short passwords. Common patterns and dictionary words should be avoided."
      },
      {
        id: 2,
        type: "interactive",
        question: "Build a Strong Password",
        activity: "password_builder",
        requirements: [
          "Minimum 12 characters",
          "Mix of uppercase and lowercase",
          "Numbers",
          "Special characters"
        ],
        correctAnswer: "criteria_match",
        explanation: "A strong password should meet all these criteria while being memorable to you."
      },
      {
        id: 3,
        type: "mcq",
        question: "What is the best way to store passwords?",
        options: [
          "Write them in a notebook",
          "Use a password manager",
          "Save them in a text file",
          "Use the same password everywhere"
        ],
        correctAnswer: 1,
        explanation: "Password managers securely encrypt and store unique passwords for each account."
      },
      {
        id: 4,
        type: "scenario",
        question: "You receive a password reset email you didn't request. What should you do?",
        options: [
          "Click the reset link to check",
          "Ignore it if you didn't request it",
          "Forward it to friends to check",
          "Reply to the email asking why"
        ],
        correctAnswer: 1,
        explanation: "Unexpected password reset emails could be phishing attempts. Ignore them if you didn't request the reset."
      },
      {
        id: 5,
        type: "drag_drop",
        question: "Arrange these password practices from most to least secure:",
        options: [
          "Using a password manager",
          "Writing passwords on sticky notes",
          "Using biometric authentication",
          "Reusing passwords across accounts",
          "Using two-factor authentication"
        ],
        correctAnswer: [4, 2, 0, 1, 3],
        explanation: "2FA and biometrics add extra security layers, while password reuse is very risky."
      }
    ]
  },
  {
    id: 2,
    title: "Phishing Detection Pro",
    description: "Master the art of identifying and avoiding sophisticated phishing attempts.",
    points: 150,
    difficulty: "Intermediate",
    icon: "🎣",
    completed: false,
    progress: 0,
    quizzes: [
      {
        id: 1,
        type: "spot_difference",
        question: "Spot the differences between legitimate and phishing emails:",
        imageSet: {
          legitimate: "/images/real_email.png",
          phishing: "/images/fake_email.png"
        },
        hotspots: [
          { x: 120, y: 80, label: "Sender address" },
          { x: 200, y: 150, label: "Grammar errors" },
          { x: 300, y: 220, label: "Urgent language" }
        ],
        correctAnswer: "all_hotspots",
        explanation: "Pay attention to sender addresses, language quality, and pressure tactics."
      },
      {
        id: 2,
        type: "url_analyzer",
        question: "Analyze these URLs for signs of phishing:",
        urls: [
          "paypal-secure.com.phish.net",
          "www.paypal.com/login",
          "secure.paypal.com.verify.net",
          "accounts.google.com"
        ],
        correctAnswer: [0, 2],
        explanation: "Legitimate sites use their own domains, not subdomains of other sites."
      },
      {
        id: 3,
        type: "scenario",
        question: "Your bank emails about unusual activity, asking you to verify your account. What's your first action?",
        options: [
          "Click the link in the email",
          "Call your bank's official number",
          "Reply with your details",
          "Forward to a friend for advice"
        ],
        correctAnswer: 1,
        explanation: "Always verify through official channels, not email links."
      },
      {
        id: 4,
        type: "interactive",
        question: "Email Header Analysis",
        activity: "header_inspector",
        elements: [
          "Return-Path",
          "DKIM Signature",
          "Sender IP",
          "Reply-To"
        ],
        correctAnswer: "identify_mismatch",
        explanation: "Email headers can reveal spoofing attempts and true sender information."
      },
      {
        id: 5,
        type: "red_flags",
        question: "Identify all phishing red flags in this email:",
        emailContent: {
          subject: "Urgent: Account Suspension",
          body: "Dear Valued Customer, Your account will be suspended in 24 hours. Click here to verify: http://bit.ly/12345"
        },
        flags: [
          "Generic greeting",
          "Urgency",
          "Shortened URL",
          "Threat of consequences"
        ],
        correctAnswer: "all_flags",
        explanation: "Phishing emails often combine multiple pressure tactics and suspicious elements."
      }
    ]
  },
  {
    id: 3,
    title: "Social Engineering Defense",
    description: "Learn to recognize and counter social engineering tactics.",
    points: 125,
    difficulty: "Beginner",
    icon: "🎭",
    completed: false,
    progress: 0,
    quizzes: [/* Similar structure with 5 varied questions */]
  },
  {
    id: 4,
    title: "Mobile Security Guardian",
    description: "Protect your mobile devices from modern threats.",
    points: 175,
    difficulty: "Intermediate",
    icon: "📱",
    completed: false,
    progress: 0,
    quizzes: [/* Similar structure with 5 varied questions */]
  },
  {
    id: 5,
    title: "Safe Browsing Expert",
    description: "Master secure browsing practices and identify web threats.",
    points: 150,
    difficulty: "Beginner",
    icon: "🌐",
    completed: false,
    progress: 0,
    quizzes: [/* Similar structure with 5 varied questions */]
  },
  {
    id: 6,
    title: "Public WiFi Warrior",
    description: "Stay secure when using public networks and hotspots.",
    points: 200,
    difficulty: "Intermediate",
    icon: "📶",
    completed: false,
    progress: 0,
    quizzes: [/* Similar structure with 5 varied questions */]
  },
  {
    id: 7,
    title: "Data Privacy Master",
    description: "Protect your personal information in the digital age.",
    points: 175,
    difficulty: "Advanced",
    icon: "🔒",
    completed: false,
    progress: 0,
    quizzes: [/* Similar structure with 5 varied questions */]
  },
  {
    id: 8,
    title: "Malware Defense Specialist",
    description: "Identify and protect against various types of malware.",
    points: 225,
    difficulty: "Advanced",
    icon: "🦠",
    completed: false,
    progress: 0,
    quizzes: [/* Similar structure with 5 varied questions */]
  },
  {
    id: 9,
    title: "Secure File Sharing Pro",
    description: "Learn best practices for secure file sharing and storage.",
    points: 150,
    difficulty: "Intermediate",
    icon: "📂",
    completed: false,
    progress: 0,
    quizzes: [/* Similar structure with 5 varied questions */]
  },
  {
    id: 10,
    title: "IoT Security Expert",
    description: "Secure your smart home and IoT devices.",
    points: 200,
    difficulty: "Advanced",
    icon: "🏠",
    completed: false,
    progress: 0,
    quizzes: [/* Similar structure with 5 varied questions */]
  }
]; 