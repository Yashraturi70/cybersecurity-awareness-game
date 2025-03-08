export type QuestionType = 
  | 'mcq'
  | 'matching'
  | 'drag_drop'
  | 'scenario'
  | 'interactive'
  | 'spot_difference'
  | 'url_analyzer'
  | 'red_flags';

export interface BaseQuiz {
  id: number;
  type: QuestionType;
  question: string;
  explanation: string;
}

export interface MCQQuiz extends BaseQuiz {
  type: 'mcq' | 'scenario';
  options: string[];
  correctAnswer: number;
}

export interface MatchingQuiz extends BaseQuiz {
  type: 'matching';
  options: string[];
  matches: string[];
  correctAnswer: number[];
}

export interface DragDropQuiz extends BaseQuiz {
  type: 'drag_drop';
  options: string[];
  correctAnswer: number[];
}

export interface InteractiveQuiz extends BaseQuiz {
  type: 'interactive';
  activity: string;
  requirements?: string[];
  elements?: string[];
  correctAnswer: any;
}

export interface SpotDifferenceQuiz extends BaseQuiz {
  type: 'spot_difference';
  imageSet: {
    legitimate: string;
    phishing: string;
  };
  hotspots: Array<{
    x: number;
    y: number;
    label: string;
  }>;
  correctAnswer: string;
}

export interface URLAnalyzerQuiz extends BaseQuiz {
  type: 'url_analyzer';
  urls: string[];
  correctAnswer: number[];
}

export interface RedFlagsQuiz extends BaseQuiz {
  type: 'red_flags';
  emailContent: {
    subject: string;
    body: string;
  };
  flags: string[];
  correctAnswer: string;
}

export type Quiz = 
  | MCQQuiz 
  | MatchingQuiz 
  | DragDropQuiz 
  | InteractiveQuiz 
  | SpotDifferenceQuiz 
  | URLAnalyzerQuiz 
  | RedFlagsQuiz;

export interface Challenge {
  id: number;
  title: string;
  description: string;
  points: number;
  difficulty: string;
  icon: string;
  quizzes: Quiz[];
  completed: boolean;
  progress: number;
}

export interface UserProgress {
  completedChallenges: number[];
  totalPoints: number;
  quizzesCompleted: number;
  totalQuizzes: number;
  level: string;
  levelProgress: number;
}

export interface LearningProgress {
  completedTopics: number[];
  timeSpent: number;
  currentLevel: string;
  lastActivity: string;
  certificates: string[];
}

export interface UserState {
  progress: UserProgress;
  learning: LearningProgress;
  currentChallenge: Challenge | null;
  currentQuizIndex: number;
} 