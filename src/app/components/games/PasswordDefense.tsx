'use client';

import React, { useState, useEffect } from 'react';
import GameBase from './GameBase';

interface PasswordChallenge {
  password: string;
  attackType: 'dictionary' | 'brute-force' | 'social-engineering';
  hint: string;
  explanation: string;
  strengthRequired: number;
}

const challenges: PasswordChallenge[] = [
  {
    password: "password123",
    attackType: "dictionary",
    hint: "This password is very common and easily guessable",
    explanation: "Common passwords are the first ones attackers try. Always use unique passwords.",
    strengthRequired: 0
  },
  {
    password: "mybirthday1990",
    attackType: "social-engineering",
    hint: "Personal information shouldn't be used in passwords",
    explanation: "Avoid using personal information that others might know or find out.",
    strengthRequired: 30
  },
  {
    password: "Tr0ub4dour&3",
    attackType: "brute-force",
    hint: "Complex but short passwords can be cracked",
    explanation: "While complex, short passwords can still be brute-forced. Length is important.",
    strengthRequired: 60
  }
];

const PasswordDefense: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [userPassword, setUserPassword] = useState('');
  const [feedback, setFeedback] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    
    // Length check
    if (password.length >= 12) strength += 25;
    else if (password.length >= 8) strength += 15;
    
    // Complexity checks
    if (/[A-Z]/.test(password)) strength += 15;
    if (/[a-z]/.test(password)) strength += 15;
    if (/[0-9]/.test(password)) strength += 15;
    if (/[^A-Za-z0-9]/.test(password)) strength += 15;
    
    // Common patterns check
    if (/password|123|abc|qwerty/i.test(password)) strength -= 20;
    
    // Ensure strength is between 0 and 100
    return Math.max(0, Math.min(100, strength));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setUserPassword(newPassword);
    setPasswordStrength(calculatePasswordStrength(newPassword));
  };

  const handleSubmit = () => {
    const currentChallenge = challenges[currentLevel];
    setAttempts(prev => prev + 1);

    if (passwordStrength >= currentChallenge.strengthRequired) {
      setFeedback(`Success! ${currentChallenge.explanation}`);
      setScore(prev => prev + Math.max(0, 100 - attempts * 10));
      
      if (currentLevel < challenges.length - 1) {
        setTimeout(() => {
          setCurrentLevel(prev => prev + 1);
          setUserPassword('');
          setFeedback('');
          setAttempts(0);
        }, 2000);
      } else {
        // Game completed
        const finalScore = Math.floor((score + Math.max(0, 100 - attempts * 10)) / challenges.length);
        onGameComplete(finalScore);
      }
    } else {
      setFeedback(`Try again! ${currentChallenge.hint}`);
    }
  };

  const onGameComplete = (finalScore: number) => {
    // This will be passed to GameBase
  };

  return (
    <GameBase
      id={1}
      title="Password Defense Game"
      description="Defend against password attacks by creating strong passwords that meet security requirements."
      difficulty="Beginner"
      duration="20 min"
      onComplete={onGameComplete}
    >
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Level {currentLevel + 1}: Defend against {challenges[currentLevel].attackType} attack
          </h3>
          <p className="text-gray-900 mb-4">
            Create a strong password that can resist this type of attack.
          </p>
        </div>

        <div className="space-y-6">
          {/* Password Input */}
          <div>
            <label className="block text-gray-900 font-medium mb-2">
              Enter Password
            </label>
            <input
              type="text"
              value={userPassword}
              onChange={handlePasswordChange}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your password..."
            />
          </div>

          {/* Strength Meter */}
          <div>
            <div className="flex justify-between text-sm text-gray-900 mb-2">
              <span>Password Strength</span>
              <span>{passwordStrength}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  passwordStrength >= 80 ? 'bg-green-500' :
                  passwordStrength >= 60 ? 'bg-blue-500' :
                  passwordStrength >= 40 ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}
                style={{ width: `${passwordStrength}%` }}
              />
            </div>
          </div>

          {/* Feedback */}
          {feedback && (
            <div className={`p-4 rounded-lg ${
              feedback.startsWith('Success') ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {feedback}
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Test Password
          </button>

          {/* Score Display */}
          <div className="text-center text-gray-900">
            <p>Current Score: {score}</p>
            <p>Attempts: {attempts}</p>
          </div>
        </div>
      </div>
    </GameBase>
  );
};

export default PasswordDefense; 