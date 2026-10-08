export interface Student {
  name: string;
  studentClass: string;
}

export interface Stages {
  engage: boolean;
  concept: boolean;
  simulation: boolean;
  challenge: boolean;
  quiz: boolean;
  reflect: boolean;
}

export interface Experiment {
  n: number;
  material: string;
  mass: number;
  volume: number;
  rhoObj: number;
  fluid: string;
  rhoFluid: number;
  vSub: number;
  Fa: number;
  W: number;
  cond: 'Mengapung' | 'Melayang' | 'Tenggelam';
}

export interface QuizResult {
  score: number;
  completed: boolean;
  correct: number;
  total: number;
  wrongTopics: string[];
  finishedAt?: string;
}

export interface Badge {
  id: string;
  name: string;
  ico: string;
}

export interface AppData {
  student: Student;
  stages: Stages;
  predictions: Record<string, any>;
  experiments: Experiment[];
  quiz: QuizResult;
  reflections: Record<string, string>;
  badges: Badge[];
  certificateUnlocked: boolean;
  masteryLevel: string;
  startedAt: string;
}

export interface Fluid {
  id: string;
  name: string;
  rho: number;
  color: string;
  deep: string;
}

export interface Preset {
  name: string;
  color: string;
  mass: number;
  volume: number;
}

export interface Question {
  t: string;
  topic: string;
  o: string[];
  a: number;
}