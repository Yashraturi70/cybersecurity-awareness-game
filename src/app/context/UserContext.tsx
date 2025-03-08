'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Challenge, UserState, UserProgress, LearningProgress } from '../types';
import { challenges } from '../data/challenges';

const initialUserProgress: UserProgress = {
  completedChallenges: [],
  totalPoints: 0,
  quizzesCompleted: 0,
  totalQuizzes: challenges.reduce((acc, challenge) => acc + challenge.quizzes.length, 0),
  level: 'Beginner',
  levelProgress: 0,
};

const initialLearningProgress: LearningProgress = {
  completedTopics: [],
  timeSpent: 0,
  currentLevel: 'Beginner',
  lastActivity: new Date().toISOString(),
  certificates: []
};

const initialState: UserState = {
  progress: initialUserProgress,
  learning: initialLearningProgress,
  currentChallenge: null,
  currentQuizIndex: 0,
};

const UserContext = createContext<{
  state: UserState;
  startChallenge: (challenge: Challenge) => void;
  completeQuiz: (correct: boolean) => void;
  resetChallenge: () => void;
  completeTopic: (topicId: number, duration: number) => void;
  updateLearningProgress: (timeSpent: number) => void;
} | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<UserState>(initialState);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('userState');
    if (savedState) {
      setState(JSON.parse(savedState));
    }
  }, []);

  // Save state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('userState', JSON.stringify(state));
  }, [state]);

  const startChallenge = (challenge: Challenge) => {
    setState(prev => ({
      ...prev,
      currentChallenge: challenge,
      currentQuizIndex: 0,
    }));
  };

  const completeQuiz = (correct: boolean) => {
    if (!state.currentChallenge) return;

    const newState = { ...state };
    const challengeId = state.currentChallenge.id;
    
    // Update progress
    if (correct) {
      newState.progress.totalPoints += state.currentChallenge.points / state.currentChallenge.quizzes.length;
      newState.progress.quizzesCompleted += 1;
    }

    // Check if challenge is completed
    if (state.currentQuizIndex === state.currentChallenge.quizzes.length - 1) {
      if (!newState.progress.completedChallenges.includes(challengeId)) {
        newState.progress.completedChallenges.push(challengeId);
      }
    }

    // Update level
    const totalPossiblePoints = challenges.reduce((acc, c) => acc + c.points, 0);
    const progressPercent = (newState.progress.totalPoints / totalPossiblePoints) * 100;
    newState.progress.levelProgress = progressPercent;

    if (progressPercent >= 80) newState.progress.level = 'Expert';
    else if (progressPercent >= 40) newState.progress.level = 'Intermediate';
    else newState.progress.level = 'Beginner';

    // Move to next quiz
    newState.currentQuizIndex += 1;

    setState(newState);
  };

  const resetChallenge = () => {
    setState(prev => ({
      ...prev,
      currentChallenge: null,
      currentQuizIndex: 0,
    }));
  };

  const completeTopic = (topicId: number, duration: number) => {
    setState(prev => ({
      ...prev,
      learning: {
        ...prev.learning,
        completedTopics: [...prev.learning.completedTopics, topicId],
        timeSpent: prev.learning.timeSpent + duration,
        lastActivity: new Date().toISOString()
      }
    }));
  };

  const updateLearningProgress = (timeSpent: number) => {
    setState(prev => {
      const totalTime = prev.learning.timeSpent + timeSpent;
      let newLevel = prev.learning.currentLevel;

      // Update level based on time spent
      if (totalTime >= 600) { // 10 hours
        newLevel = 'Expert';
      } else if (totalTime >= 300) { // 5 hours
        newLevel = 'Intermediate';
      }

      return {
        ...prev,
        learning: {
          ...prev.learning,
          timeSpent: totalTime,
          currentLevel: newLevel,
          lastActivity: new Date().toISOString()
        }
      };
    });
  };

  return (
    <UserContext.Provider 
      value={{ 
        state, 
        startChallenge, 
        completeQuiz, 
        resetChallenge,
        completeTopic,
        updateLearningProgress
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 