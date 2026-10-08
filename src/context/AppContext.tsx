import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { AppData, Experiment, Badge, QuizResult, Stages, Student } from '../types';

const KEY = 'archimedesLearningData';

const defaultData = (): AppData => ({
  student: { name: '', studentClass: '' },
  stages: { engage: false, concept: false, simulation: false, challenge: false, quiz: false, reflect: false },
  predictions: {},
  experiments: [],
  quiz: { score: 0, completed: false, correct: 0, total: 0, wrongTopics: [] },
  reflections: {},
  badges: [],
  certificateUnlocked: false,
  masteryLevel: '',
  startedAt: new Date().toISOString()
});

interface Ctx {
  data: AppData;
  progress: number;
  setStudent: (s: Student) => void;
  markStage: (k: keyof Stages) => void;
  setPrediction: (k: string, v: any) => void;
  addExperiment: (e: Omit<Experiment, 'n'>) => void;
  clearExperiments: () => void;
  setQuiz: (q: QuizResult) => void;
  setReflection: (k: string, v: string) => void;
  awardBadge: (b: Badge) => void;
  unlockCertificate: (v: boolean) => void;
  setMasteryLevel: (v: string) => void;
  reset: () => void;
}

const AppCtx = createContext<Ctx | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData>(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return defaultData();
      const s = JSON.parse(raw);
      const d = defaultData();
      return {
        ...d, ...s,
        student: { ...d.student, ...(s.student || {}) },
        stages: { ...d.stages, ...(s.stages || {}) },
        quiz: { ...d.quiz, ...(s.quiz || {}) },
        experiments: Array.isArray(s.experiments) ? s.experiments : [],
        badges: Array.isArray(s.badges) ? s.badges : [],
        predictions: s.predictions || {},
        reflections: s.reflections || {}
      };
    } catch { return defaultData(); }
  });

  useEffect(() => {
  try { localStorage.setItem(KEY, JSON.stringify(data)); } catch {}
}, [data]);

// =========================================================
// AUTO-UNLOCK CERTIFICATE
// Cek setiap kali data berubah. Kalau semua syarat terpenuhi,
// buka sertifikat secara otomatis.
// =========================================================
useEffect(() => {
  if (data.certificateUnlocked) return;
  if (!data.quiz.completed) return;
  if (data.quiz.score < 75) return;

  const checks = [
    !!data.student.name,
    data.stages.engage,
    data.experiments.length >= 3,
    data.stages.concept,
    data.stages.simulation,
    data.stages.challenge,
    data.stages.quiz,
    data.stages.reflect
  ];
  const p = Math.round(checks.filter(Boolean).length / checks.length * 100);

  // Minimal 87% (7 dari 8 tahap) + skor kuis >= 75
  if (p >= 87) {
    setData(d => ({ ...d, certificateUnlocked: true }));
  }
}, [data]);

  const progress = (() => {
    const checks = [
      !!data.student.name,
      data.stages.engage,
      data.experiments.length >= 3,
      data.stages.concept,
      data.stages.simulation,
      data.stages.challenge,
      data.stages.quiz,
      data.stages.reflect
    ];
    return Math.round(checks.filter(Boolean).length / checks.length * 100);
  })();

  const api: Ctx = {
    data,
    progress,
    setStudent: (s) => setData(d => ({ ...d, student: s })),
    markStage: (k) => setData(d => d.stages[k] ? d : ({ ...d, stages: { ...d.stages, [k]: true } })),
    setPrediction: (k, v) => setData(d => ({ ...d, predictions: { ...d.predictions, [k]: v } })),
    addExperiment: (e) => setData(d => ({ ...d, experiments: [...d.experiments, { ...e, n: d.experiments.length + 1 }] })),
    clearExperiments: () => setData(d => ({ ...d, experiments: [] })),
    setQuiz: (q) => setData(d => ({ ...d, quiz: q })),
    setReflection: (k, v) => setData(d => ({ ...d, reflections: { ...d.reflections, [k]: v } })),
    awardBadge: (b) => setData(d => d.badges.some(x => x.id === b.id) ? d : ({ ...d, badges: [...d.badges, b] })),
    unlockCertificate: (v) => setData(d => ({ ...d, certificateUnlocked: v })),
    setMasteryLevel: (v) => setData(d => ({ ...d, masteryLevel: v })),
    reset: () => { try { localStorage.removeItem(KEY); } catch {} setData(defaultData()); }
  };

  return <AppCtx.Provider value={api}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const c = useContext(AppCtx);
  if (!c) throw new Error('useApp must be used inside AppProvider');
  return c;
}