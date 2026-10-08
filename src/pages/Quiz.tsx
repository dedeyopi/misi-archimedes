import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import PageGuide from '../components/PageGuide';
import { useApp } from '../context/AppContext';
import { QUESTIONS, type Question } from '../questions';

type AnswerValue = number | number[] | string | (number | null)[] | null;

const LETTERS = ['A', 'B', 'C', 'D', 'E'];
const TOTAL = QUESTIONS.length;

/** Normalisasi jawaban isian singkat */
function normalize(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[.,;:!?]/g, '')
    .replace(/\s+/g, ' ');
}

function checkShort(user: string, accepted: string[]): boolean {
  const u = normalize(user);
  return accepted.some(a => normalize(a) === u);
}

export default function Quiz() {
  const { data, setQuiz, markStage, awardBadge, setMasteryLevel } = useApp();
  const navigate = useNavigate();

  const [started, setStarted] = useState(false);
  const [order, setOrder] = useState<number[]>([]);
  const [idx, setIdx] = useState(0);
  const [answer, setAnswer] = useState<AnswerValue>(null);
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongTopics, setWrongTopics] = useState<string[]>([]);

  const start = () => {
    const o = QUESTIONS.map((_, i) => i);
    for (let i = o.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [o[i], o[j]] = [o[j], o[i]];
    }
    setOrder(o);
    setIdx(0);
    setAnswer(null);
    setChecked(false);
    setIsCorrect(false);
    setScore(0);
    setWrongTopics([]);
    setStarted(true);
  };

  const q: Question | null = started && idx < order.length ? QUESTIONS[order[idx]] : null;

  /* ------------ Evaluasi jawaban ------------- */
  const evaluate = (): boolean => {
    if (!q) return false;
    switch (q.type) {
      case 'pg':
      case 'hots':
        return typeof answer === 'number' && answer === q.answer;
      case 'pgk': {
        if (!Array.isArray(answer)) return false;
        const a = [...(answer as number[])].sort();
        const b = [...q.answers].sort();
        return a.length === b.length && a.every((v, i) => v === b[i]);
      }
      case 'match': {
        if (!Array.isArray(answer)) return false;
        const arr = answer as (number | null)[];
        if (arr.length !== q.answer.length) return false;
        return arr.every((v, i) => v === q.answer[i]);
      }
      case 'short':
        return typeof answer === 'string' && checkShort(answer, q.answers);
    }
  };

  const handleCheck = () => {
    if (!q) return;
    if (answer === null) {
      alert('Pilih/isi jawabanmu dulu ya 🙂');
      return;
    }
    const ok = evaluate();
    setIsCorrect(ok);
    setChecked(true);
    if (ok) setScore(s => s + 1);
    else setWrongTopics(w => [...w, q.topic]);
  };

  const handleNext = () => {
    if (idx + 1 >= order.length) { finish(); return; }
    setIdx(i => i + 1);
    setAnswer(null);
    setChecked(false);
    setIsCorrect(false);
  };

  const finish = () => {
    const pct = Math.round((score / TOTAL) * 100);

    setQuiz({
      score: pct,
      completed: true,
      correct: score,
      total: TOTAL,
      wrongTopics: [...new Set(wrongTopics)],
      finishedAt: new Date().toISOString()
    });

    markStage('quiz');
    awardBadge({ id: 'thinker', ico: '🧠', name: 'Science Thinker' });

    let level = '';
    if (pct >= 90) level = 'Mastery Achieved 🏆';
    else if (pct >= 75) level = 'Menguasai';
    else if (pct >= 60) level = 'Mulai Menguasai';
    else level = 'Perlu Belajar Lagi';
    setMasteryLevel(level);

    navigate('/mastery');
  };

  /* ================ RENDER ================ */
  return (
    <Layout>
      <h1 style={{ fontSize: 'clamp(26px,4vw,34px)' }}>📝 Evaluasi Pemahaman</h1>

      <PageGuide
        title="Di halaman ini kamu menguji seberapa dalam pemahamanmu"
        lines={[
          'Ada <strong>30 soal</strong> dengan tipe yang bervariasi: pilihan ganda, pilihan ganda kompleks, menjodohkan, isian singkat, dan soal HOTS.',
          'Setiap soal dikerjakan satu per satu. Klik <strong>Periksa Jawaban</strong> untuk melihat hasilnya.',
          'Nilai minimal untuk membuka sertifikat adalah <strong>75</strong>.'
        ]}
      />

      {!started && (
        <div className="card">
          <h3 style={{ fontSize: 20 }}>Siap mengerjakan?</h3>
          <p style={{ marginTop: 6 }}>
            Perkiraan waktu: 30–40 menit. Soal diacak setiap kali kamu mengulang.
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
            <span className="tag">PG</span>
            <span className="tag a">PG Kompleks</span>
            <span className="tag g">Menjodohkan</span>
            <span className="tag r">Isian Singkat</span>
            <span className="tag" style={{ background: '#ede9fe', color: '#6d28d9' }}>HOTS</span>
          </div>
          <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={start}>
            Mulai Evaluasi 🚀
          </button>
          {data.quiz.completed && (
            <p style={{ marginTop: 14, fontSize: 15 }}>
              Nilai terakhirmu: <strong className="big-num">{data.quiz.score}</strong>.{' '}
              <Link to="/mastery">Lihat hasil lengkap →</Link>
            </p>
          )}
        </div>
      )}

      {started && q && (
        <div className="card">
          {/* Bar atas: nomor, tipe, level */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span className="tag">Soal {idx + 1} / {TOTAL}</span>
            <div style={{ display: 'flex', gap: 6 }}>
              <span className={`tag ${q.type === 'pgk' ? 'a' : q.type === 'match' ? 'g' : q.type === 'short' ? 'r' : ''}`}
                style={q.type === 'hots' ? { background: '#ede9fe', color: '#6d28d9' } : undefined}>
                {q.type === 'pg' && 'Pilihan Ganda'}
                {q.type === 'pgk' && 'PG Kompleks'}
                {q.type === 'match' && 'Menjodohkan'}
                {q.type === 'short' && 'Isian Singkat'}
                {q.type === 'hots' && 'HOTS'}
              </span>
              <span style={{
                background: q.difficulty === 'mudah' ? '#dcfce7' : q.difficulty === 'sedang' ? '#fef3c7' : '#fee2e2',
                color: q.difficulty === 'mudah' ? '#166534' : q.difficulty === 'sedang' ? '#92400e' : '#991b1b',
                padding: '3px 12px', borderRadius: 99, fontSize: 12.5, fontWeight: 800, textTransform: 'capitalize'
              }}>
                {q.difficulty}
              </span>
            </div>
          </div>

          <div className="pbar" style={{ margin: '14px 0 20px', height: 8 }}>
            <i style={{ width: `${(idx / TOTAL) * 100}%` }} />
          </div>

          {/* Skenario (HOTS saja) */}
          {q.scenario && (
            <div style={{
              background: 'linear-gradient(135deg,#ede9fe,#f5f3ff)',
              border: '2px solid #c4b5fd',
              borderRadius: 12,
              padding: 14,
              marginBottom: 16
            }}>
              <div style={{ fontSize: 12, fontWeight: 900, color: '#6d28d9', letterSpacing: '.05em', textTransform: 'uppercase', marginBottom: 6 }}>
                📖 Skenario
              </div>
              <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.55, margin: 0 }}>
                {q.scenario}
              </p>
            </div>
          )}

          {/* Pertanyaan */}
          <p style={{ fontSize: 17.5, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.6 }}>
            {q.question}
          </p>

          {/* Widget jawaban sesuai tipe */}
          <div style={{ marginTop: 18 }}>
            {(q.type === 'pg' || q.type === 'hots') && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {q.options.map((opt, i) => {
                  let cls = 'opt';
                  if (checked) {
                    if (i === q.answer) cls += ' correct';
                    else if (i === answer) cls += ' wrong';
                  } else if (answer === i) {
                    cls += ' correct';
                  }
                  return (
                    <button key={i} className={cls}
                      onClick={() => !checked && setAnswer(i)}
                      disabled={checked}
                      style={!checked && answer === i ? { borderColor: 'var(--ocean)', background: '#f0f9ff' } : undefined}>
                      <span className="k">{LETTERS[i]}</span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {q.type === 'pgk' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <p style={{ fontSize: 13.5, color: 'var(--muted)', margin: 0, fontStyle: 'italic' }}>
                  Centang semua jawaban yang benar.
                </p>
                {q.options.map((opt, i) => {
                  const arr = Array.isArray(answer) ? (answer as number[]) : [];
                  const isSelected = arr.includes(i);
                  const isRight = checked && q.answers.includes(i);
                  const isWrong = checked && isSelected && !q.answers.includes(i);
                  let cls = 'opt';
                  if (isRight) cls += ' correct';
                  else if (isWrong) cls += ' wrong';
                  return (
                    <button key={i} className={cls}
                      onClick={() => {
                        if (checked) return;
                        const next = isSelected ? arr.filter(x => x !== i) : [...arr, i];
                        setAnswer(next.sort());
                      }}
                      disabled={checked}
                      style={!checked && isSelected ? { borderColor: 'var(--ocean)', background: '#f0f9ff' } : undefined}>
                      <span className="k" style={{
                        background: isSelected ? 'var(--ocean)' : '#e0f2fe',
                        color: isSelected ? '#fff' : 'var(--ocean-d)'
                      }}>
                        {isSelected ? '✓' : LETTERS[i]}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {q.type === 'match' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <p style={{ fontSize: 13.5, color: 'var(--muted)', margin: 0, fontStyle: 'italic' }}>
                  Untuk setiap istilah di kiri, pilih pasangan yang tepat dari menu di kanan.
                </p>
                {q.left.map((lft, i) => {
                  const arr = Array.isArray(answer) ? (answer as (number | null)[]) : q.left.map(() => null);
                  const val = arr[i];
                  const isRight = checked && val === q.answer[i];
                  const isWrong = checked && val !== null && val !== q.answer[i];
                  return (
                    <div key={i} style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1.2fr',
                      gap: 10,
                      alignItems: 'center',
                      padding: 12,
                      borderRadius: 12,
                      border: isRight ? '2px solid var(--green)' : isWrong ? '2px solid var(--red)' : '2px solid var(--line-2)',
                      background: isRight ? '#f0fdf4' : isWrong ? '#fef2f2' : '#fff'
                    }}>
                      <div style={{ fontWeight: 800, color: 'var(--ink)' }}>{lft}</div>
                      <select
                        value={val ?? ''}
                        onChange={e => {
                          if (checked) return;
                          const next = [...arr];
                          next[i] = e.target.value === '' ? null : Number(e.target.value);
                          setAnswer(next);
                        }}
                        disabled={checked}
                        style={{
                          padding: '10px 12px',
                          border: '2px solid var(--line-2)',
                          borderRadius: 10,
                          fontFamily: 'inherit',
                          fontSize: 15,
                          background: '#fff',
                          color: 'var(--ink-2)'
                        }}
                      >
                        <option value="">— Pilih pasangan —</option>
                        {q.right.map((r, j) => (
                          <option key={j} value={j}>{r}</option>
                        ))}
                      </select>
                    </div>
                  );
                })}
              </div>
            )}

            {q.type === 'short' && (
              <div>
                <p style={{ fontSize: 13.5, color: 'var(--muted)', margin: 0, marginBottom: 8, fontStyle: 'italic' }}>
                  Tulis jawabanmu di kotak di bawah. Hanya angka atau istilah singkat.
                </p>
                <input
                  type="text"
                  value={typeof answer === 'string' ? answer : ''}
                  onChange={e => !checked && setAnswer(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !checked) handleCheck(); }}
                  disabled={checked}
                  placeholder="Tulis jawabanmu..."
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    border: checked
                      ? `2px solid ${isCorrect ? 'var(--green)' : 'var(--red)'}`
                      : '2px solid var(--line-2)',
                    borderRadius: 12,
                    fontFamily: 'inherit',
                    fontSize: 17,
                    fontWeight: 700,
                    background: checked ? (isCorrect ? '#f0fdf4' : '#fef2f2') : '#fff',
                    color: 'var(--ink)'
                  }}
                />
                {checked && !isCorrect && (
                  <p style={{ fontSize: 13.5, marginTop: 6, color: '#991b1b', fontWeight: 700 }}>
                    Jawaban yang diterima: {q.answers[0]}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Tombol Periksa */}
          {!checked && (
            <button className="btn btn-primary" style={{ marginTop: 20, width: '100%' }} onClick={handleCheck}>
              ✅ Periksa Jawaban
            </button>
          )}

          {/* Feedback + Next */}
          {checked && (
            <div className="card" style={{
              boxShadow: 'none', marginTop: 16,
              background: isCorrect ? '#f0fdf4' : '#fffbeb',
              border: `2px solid ${isCorrect ? 'var(--green-l)' : 'var(--amber-l)'}`
            }}>
              <p style={{ fontWeight: 800, margin: 0, color: isCorrect ? '#166534' : '#92400e' }}>
                {isCorrect
                  ? '✅ Benar! Sekarang coba jelaskan dengan bahasamu sendiri mengapa demikian.'
                  : '🤔 Belum tepat. Coba pikirkan lagi hubungan antar besaran yang terlibat.'}
              </p>
              <button className="btn btn-primary btn-sm" style={{ marginTop: 12 }} onClick={handleNext}>
                {idx === TOTAL - 1 ? 'Lihat Hasil 🏁' : 'Soal Berikutnya →'}
              </button>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
}