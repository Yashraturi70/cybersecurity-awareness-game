'use client';

import React, { useState } from 'react';
import { Quiz } from '../types';

interface QuizViewProps {
  quiz: Quiz;
  onComplete: (correct: boolean) => void;
}

const QuizView: React.FC<QuizViewProps> = ({ quiz, onComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | number[] | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [dragItems, setDragItems] = useState<string[]>([]);
  const [matches, setMatches] = useState<{ [key: number]: number }>({});

  const handleAnswer = (answer: number | number[]) => {
    setSelectedAnswer(answer);
    setShowExplanation(true);
    let isCorrect = false;

    switch (quiz.type) {
      case 'mcq':
      case 'scenario':
        isCorrect = answer === quiz.correctAnswer;
        break;
      case 'matching':
        isCorrect = JSON.stringify(answer) === JSON.stringify(quiz.correctAnswer);
        break;
      case 'drag_drop':
        isCorrect = JSON.stringify(answer) === JSON.stringify(quiz.correctAnswer);
        break;
      case 'spot_difference':
      case 'url_analyzer':
      case 'red_flags':
        isCorrect = JSON.stringify(answer) === JSON.stringify(quiz.correctAnswer);
        break;
      case 'interactive':
        isCorrect = typeof answer === 'boolean' ? answer : false;
        break;
    }

    setTimeout(() => {
      onComplete(isCorrect);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setShowHint(false);
      setMatches({});
      setDragItems([]);
    }, 2500);
  };

  const renderQuestion = () => {
    switch (quiz.type) {
      case 'mcq':
      case 'scenario':
        return (
          <div className="space-y-3">
            {quiz.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showExplanation && handleAnswer(index)}
                className={`w-full p-4 text-left rounded-lg transition-all transform hover:scale-[1.01] ${
                  showExplanation
                    ? index === quiz.correctAnswer
                      ? 'bg-green-100 border-green-500 text-gray-900'
                      : index === selectedAnswer
                      ? 'bg-red-100 border-red-500 text-gray-900'
                      : 'bg-gray-100 text-gray-900'
                    : 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200'
                }`}
                disabled={showExplanation}
              >
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 text-gray-900">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-lg">{option}</span>
                </div>
              </button>
            ))}
          </div>
        );

      case 'matching':
        return (
          <div className="space-y-6">
            {quiz.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="flex-1 p-4 bg-white border border-gray-200 rounded-lg text-gray-900">
                  {option}
                </div>
                <div className="w-8 text-center">→</div>
                <select
                  className="flex-1 p-4 bg-white border border-gray-200 rounded-lg text-gray-900"
                  value={matches[index] || ''}
                  onChange={(e) => {
                    const newMatches = { ...matches, [index]: parseInt(e.target.value) };
                    setMatches(newMatches);
                    if (Object.keys(newMatches).length === quiz.options.length) {
                      handleAnswer(Object.values(newMatches));
                    }
                  }}
                  disabled={showExplanation}
                >
                  <option value="">Select match...</option>
                  {quiz.matches.map((match, mIndex) => (
                    <option key={mIndex} value={mIndex}>
                      {match}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        );

      case 'drag_drop':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Available Items</h4>
                {quiz.options
                  .filter(item => !dragItems.includes(item))
                  .map((item, index) => (
                    <div
                      key={index}
                      className="p-3 bg-white border border-gray-200 rounded-lg text-gray-900 cursor-move"
                      draggable
                      onDragStart={(e) => e.dataTransfer.setData('text/plain', item)}
                    >
                      {item}
                    </div>
                  ))}
              </div>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-[200px]"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const item = e.dataTransfer.getData('text/plain');
                  if (!dragItems.includes(item)) {
                    const newItems = [...dragItems, item];
                    setDragItems(newItems);
                    if (newItems.length === quiz.options.length) {
                      handleAnswer(newItems.map(i => quiz.options.indexOf(i)));
                    }
                  }
                }}
              >
                <h4 className="font-medium text-gray-900 mb-2">Drop Items Here</h4>
                {dragItems.map((item, index) => (
                  <div key={index} className="p-3 bg-white border border-gray-200 rounded-lg mb-2 text-gray-900">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'interactive':
        if (quiz.activity === 'password_builder') {
          return (
            <div className="space-y-4">
              <input
                type="text"
                className="w-full p-4 border border-gray-200 rounded-lg text-gray-900"
                placeholder="Type your password..."
                onChange={(e) => {
                  const password = e.target.value;
                  const meetsAll = quiz.requirements.every(req => {
                    switch (req) {
                      case 'Minimum 12 characters':
                        return password.length >= 12;
                      case 'Mix of uppercase and lowercase':
                        return /[a-z]/.test(password) && /[A-Z]/.test(password);
                      case 'Numbers':
                        return /\d/.test(password);
                      case 'Special characters':
                        return /[!@#$%^&*(),.?":{}|<>]/.test(password);
                      default:
                        return false;
                    }
                  });
                  if (meetsAll) {
                    handleAnswer(true);
                  }
                }}
              />
              <div className="space-y-2">
                {quiz.requirements.map((req, index) => (
                  <div key={index} className="flex items-center text-gray-900">
                    <span className="mr-2">⚪</span>
                    {req}
                  </div>
                ))}
              </div>
            </div>
          );
        }
        return null;

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Interactive Question Card */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-gray-900">{quiz.question}</h3>
          <button
            onClick={() => setShowHint(!showHint)}
            className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center"
          >
            <span className="mr-2">💡</span>
            Need a hint?
          </button>
        </div>

        {showHint && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-gray-900">
              Think about: {quiz.explanation.split('.')[0]}.
            </p>
          </div>
        )}

        {renderQuestion()}
      </div>

      {/* Explanation Card */}
      {showExplanation && (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center mb-4">
            <span className="text-2xl mr-3">
              {Array.isArray(selectedAnswer) 
                ? JSON.stringify(selectedAnswer) === JSON.stringify(quiz.correctAnswer)
                  ? '🎉'
                  : '💡'
                : selectedAnswer === quiz.correctAnswer
                  ? '🎉'
                  : '💡'
              }
            </span>
            <h4 className="text-xl font-semibold text-gray-900">
              {Array.isArray(selectedAnswer)
                ? JSON.stringify(selectedAnswer) === JSON.stringify(quiz.correctAnswer)
                  ? 'Great job!'
                  : 'Learning Opportunity'
                : selectedAnswer === quiz.correctAnswer
                  ? 'Great job!'
                  : 'Learning Opportunity'
              }
            </h4>
          </div>
          <p className="text-gray-900 text-lg leading-relaxed">
            {quiz.explanation}
          </p>
          <div className="mt-4 flex items-center text-gray-900">
            <span className="mr-2">💪</span>
            Keep going! You're making progress in cybersecurity.
          </div>
        </div>
      )}

      {/* Progress Indicator */}
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
        <div className="flex items-center justify-between text-gray-900">
          <span>Time remaining</span>
          <span className="font-medium">5 seconds</span>
        </div>
        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full transition-all duration-1000" style={{ width: '100%' }} />
        </div>
      </div>
    </div>
  );
};

export default QuizView; 