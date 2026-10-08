import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import PageGuide from '../components/PageGuide';
import { useApp } from '../context/AppContext';
import { G } from '../constants';

const fmt = (n: number, d = 2) => Number(n).toLocaleString('id-ID', { minimumFractionDigits: d, maximumFractionDigits: d });

const MYTHS = [
  { id: 'm1', q: '"Benda yang berat pasti tenggelam."', answer: 'Mitos',
    exp: 'Berat saja tidak menentukan. Yang menentukan adalah perbandingan massa jenis benda dengan massa jenis fluida. Kapal baja bisa berbobot ribuan ton tetapi tetap mengapung.' },
  { id: 'm2', q: '"Semua benda dari logam pasti tenggelam."', answer: 'Mitos',
    exp: 'Logam padat memang tenggelam, tetapi kalau logam dibentuk menjadi kapal berongga, massa jenis rata-ratanya bisa lebih kecil daripada air.' },
  { id: 'm3', q: '"Semakin besar ukuran benda, pasti semakin besar gaya ke atas yang dialaminya."', answer: 'Mitos',
    exp: 'Gaya ke atas bergantung pada volume fluida yang dipindahkan dan massa jenis fluida. Benda besar yang hanya tercelup sedikit bisa mendapat gaya ke atas lebih kecil daripada benda kecil yang tercelup seluruhnya.' }
];

export default function Concept() {
  const { markStage, awardBadge } = useApp();
  const [rho, setRho] = useState(1000);
  const [vol, setVol] = useState(0.002);
  const [answered, setAnswered] = useState<Record<string, string>>({});

  const Fa = rho * G * vol;
  const arrowLen = Math.max(12, Math.min(96, Fa / 60 * 96));

  const onInteract = () => {
    markStage('concept');
    awardBadge({ id: 'concept', ico: '💡', name: 'Concept Builder' });
  };

  const handleMyth = (id: string, val: string) => {
    setAnswered(a => ({ ...a, [id]: val }));
    onInteract();
  };

  return (
    <Layout>
      <h1 style={{ fontSize: 'clamp(26px,4vw,34px)' }}>💡 Membangun Konsep</h1>

      <PageGuide title="Di halaman ini kita menyusun penjelasan dari hasil eksperimenmu" lines={[
        'Baca dulu bagian "Mengapa gaya ke atas bisa muncul?".',
        'Coba geser-geser nilai pada persamaan interaktif untuk melihat pengaruhnya.',
        'Uji juga mitos-mitos yang sering beredar tentang benda mengapung.'
      ]} />

      <div className="card">
        <span className="tag">Langkah 1</span>
        <h2 style={{ margin: '12px 0 8px', fontSize: 24 }}>Mengapa gaya ke atas bisa muncul?</h2>
        <p>Pernahkah kamu berenang dan merasakan telingamu "tertekan" saat menyelam lebih dalam? Itu tandanya <strong>tekanan air bertambah seiring kedalaman</strong>.</p>
        <p style={{ marginTop: 10 }}>Sekarang bayangkan sebuah balok yang tercelup di air. Bagian <strong>bawah</strong> balok berada lebih dalam daripada bagian <strong>atasnya</strong>. Akibatnya, tekanan yang mendorong ke atas lebih besar daripada tekanan yang mendorong ke bawah.</p>

        <div style={{ margin: '22px 0', borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--line)' }}>
          <PressureSVG />
        </div>

        <div className="card card-green" style={{ boxShadow: 'none', background: '#f0fdf4' }}>
          <p style={{ fontWeight: 800, color: '#166534', margin: 0 }}>Kesimpulannya:</p>
          <p style={{ marginTop: 6 }}>Selisih tekanan itulah yang menghasilkan <strong>gaya resultan ke atas</strong>. Gaya inilah yang kita sebut <strong>gaya ke atas</strong> (gaya apung).</p>
        </div>
      </div>

      <div className="card">
        <span className="tag">Langkah 2</span>
        <h2 style={{ margin: '12px 0 8px', fontSize: 24 }}>Hukum Archimedes</h2>
        <div style={{ background: 'linear-gradient(135deg,#e0f2fe,#f0fdfa)', borderRadius: 'var(--radius)', padding: 22, borderLeft: '5px solid var(--aqua)' }}>
          <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--ocean-d)', lineHeight: 1.6, margin: 0 }}>
            "Benda yang dicelupkan sebagian atau seluruhnya ke dalam fluida akan mengalami gaya ke atas yang besarnya sama dengan berat fluida yang dipindahkan oleh benda tersebut."
          </p>
        </div>
        <p style={{ marginTop: 14, fontSize: 15.5 }}>Dari eksperimenmu tadi, kamu sudah melihat bahwa gaya ke atas bertambah ketika volume fluida yang dipindahkan bertambah, dan bertambah juga ketika massa jenis fluidanya bertambah.</p>
      </div>

      <div className="card">
        <span className="tag">Langkah 3</span>
        <h2 style={{ margin: '12px 0 8px', fontSize: 24 }}>Persamaan Gaya ke Atas</h2>
        <p>Pola yang kamu temukan bisa dituliskan dalam satu persamaan:</p>

        <div className="formula" style={{ margin: '18px 0' }}>
          Fₐ = ρ × g × V
          <small>Fₐ = gaya ke atas (N) · ρ = massa jenis fluida (kg/m³) · g = 10 m/s² · V = volume fluida yang dipindahkan (m³)</small>
        </div>

        <h4 style={{ fontSize: 17, marginBottom: 14 }}>🎛️ Coba geser dan lihat apa yang terjadi</h4>
        <div className="grid grid-2">
          <div>
            <div className="ctrl-group">
              <label>Massa jenis fluida (ρ) <span className="val">{rho} kg/m³</span></label>
              <input type="range" min={700} max={1400} step={10} value={rho}
                onChange={e => { setRho(+e.target.value); onInteract(); }} />
            </div>
            <div className="ctrl-group">
              <label>Volume tercelup (V) <span className="val">{fmt(vol, 4)} m³</span></label>
              <input type="range" min={0.0002} max={0.005} step={0.0001} value={vol}
                onChange={e => { setVol(+e.target.value); onInteract(); }} />
            </div>
            <div className="stat">
              <div className="lbl">Gaya ke atas (Fₐ)</div>
              <div className="val2" style={{ fontSize: 28 }}>{fmt(Fa, 2)} N</div>
            </div>
            <p style={{ fontSize: 14, color: 'var(--muted)', marginTop: 10 }}>Fₐ = {rho} × 10 × {fmt(vol, 4)}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fbff', borderRadius: 'var(--radius)', padding: 16 }}>
            <svg viewBox="0 0 240 260" style={{ width: '100%', maxWidth: 230 }}>
              <rect x="20" y="200" width="200" height="46" rx="8" fill="#38bdf8" opacity=".35" />
              <text x="120" y="230" textAnchor="middle" fontSize="13" fontWeight="800" fill="#0369a1">fluida</text>
              <line x1="120" y1="196" x2="120" y2={196 - arrowLen} stroke="#f59e0b" strokeWidth="12" strokeLinecap="round" />
              <polygon points={`120,${196 - arrowLen - 20} 104,${196 - arrowLen + 12} 136,${196 - arrowLen + 12}`} fill="#f59e0b" />
              <text x="120" y="72" textAnchor="middle" fontSize="15" fontWeight="900" fill="#b45309">Fₐ</text>
              <rect x="80" y="150" width="80" height="46" rx="6" fill="#94a3b8" opacity=".7" />
            </svg>
          </div>
        </div>
      </div>

      <div className="card">
        <span className="tag">Langkah 4</span>
        <h2 style={{ margin: '12px 0 8px', fontSize: 24 }}>Benar atau Mitos?</h2>
        <p style={{ marginBottom: 18 }}>Banyak orang percaya hal-hal ini. Menurutmu benar atau mitos?</p>
        <div className="grid" style={{ gap: 16 }}>
          {MYTHS.map(m => (
            <div key={m.id} className="myth">
              <div className="q">{m.q}</div>
              <div className="pill-row">
                {['Benar', 'Mitos'].map(o => {
                  const chosen = answered[m.id] === o;
                  const isCorrect = o === m.answer;
                  return (
                    <button key={o} className="pill"
                      disabled={!!answered[m.id]}
                      onClick={() => handleMyth(m.id, o)}
                      style={chosen ? { background: isCorrect ? 'var(--green)' : 'var(--red)', borderColor: isCorrect ? 'var(--green)' : 'var(--red)', color: '#fff' } : undefined}>
                      {o}
                    </button>
                  );
                })}
              </div>
              {answered[m.id] && (
                <div className="card" style={{
                  boxShadow: 'none', marginTop: 12,
                  background: answered[m.id] === m.answer ? '#f0fdf4' : '#fffbeb',
                  border: `2px solid ${answered[m.id] === m.answer ? 'var(--green-l)' : 'var(--amber-l)'}`
                }}>
                  <p style={{ fontWeight: 800, margin: 0, color: answered[m.id] === m.answer ? '#166534' : '#92400e' }}>
                    {answered[m.id] === m.answer ? '✅ Tepat sekali!' : '🤔 Sebenarnya bukan begitu.'}
                  </p>
                  <p style={{ marginTop: 6, fontSize: 15.5 }}>{m.exp}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ textAlign: 'center' }}>
        <p style={{ fontWeight: 800, fontSize: 17, color: 'var(--ink)' }}>Konsepnya sudah terbangun!</p>
        <p style={{ fontSize: 15, marginTop: 4 }}>Sekarang kita uji lagi dengan cara lain: membandingkan massa jenis.</p>
        <div className="row" style={{ justifyContent: 'center', marginTop: 16 }}>
          <Link to="/simulation" className="btn btn-primary">Lanjut ke Simulasi 🌊</Link>
          <Link to="/explore" className="btn btn-ghost">Kembali ke Laboratorium</Link>
        </div>
      </div>
    </Layout>
  );
}

function PressureSVG() {
  return (
    <svg
      viewBox="0 0 700 400"
      style={{ width: '100%', display: 'block' }}
      role="img"
      aria-label="Diagram tekanan fluida pada balok"
    >
      <defs>
        <linearGradient id="wg2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="100%" stopColor="#075985" />
        </linearGradient>
        <linearGradient id="blk" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
      </defs>

      {/* Latar langit */}
      <rect width="700" height="400" fill="#f0f9ff" />

      {/* Air — dari y=70 sampai bawah */}
      <rect x="0" y="70" width="700" height="330" fill="url(#wg2)" />
      <line x1="0" y1="70" x2="700" y2="70" stroke="#fff" strokeWidth="3" opacity="0.8" />

      {/* Label permukaan air */}
      <g>
        <rect x="14" y="44" width="110" height="22" rx="11" fill="#fff" opacity="0.92" />
        <text
          x="69" y="60"
          textAnchor="middle"
          fontSize="12"
          fontWeight="800"
          fill="#0369a1"
        >
          Permukaan air
        </text>
      </g>

      {/* Balok */}
      <rect
        x="280" y="130"
        width="160" height="120" rx="10"
        fill="url(#blk)"
        stroke="#fff"
        strokeWidth="2"
      />

      {/* ============ PANAH ATAS (KECIL) ============ */}
      <g stroke="#dc2626" fill="#dc2626">
        <line x1="320" y1="96" x2="320" y2="124" strokeWidth="7" strokeLinecap="round" />
        <polygon points="320,128 311,112 329,112" />
        <line x1="360" y1="102" x2="360" y2="124" strokeWidth="7" strokeLinecap="round" />
        <polygon points="360,128 351,112 369,112" />
        <line x1="400" y1="96" x2="400" y2="124" strokeWidth="7" strokeLinecap="round" />
        <polygon points="400,128 391,112 409,112" />
      </g>

      {/* Label atas */}
      <g>
        <rect x="228" y="76" width="232" height="30" rx="15"
          fill="#fff" stroke="#dc2626" strokeWidth="2" />
        <text
          x="344" y="96"
          textAnchor="middle"
          fontSize="15"
          fontWeight="900"
          fill="#b91c1c"
        >
          Tekanan atas — lebih KECIL
        </text>
      </g>

      {/* ============ PANAH BAWAH (BESAR) ============ */}
      <g stroke="#16a34a" fill="#16a34a">
        <line x1="320" y1="308" x2="320" y2="258" strokeWidth="7" strokeLinecap="round" />
        <polygon points="320,252 311,272 329,272" />
        <line x1="360" y1="316" x2="360" y2="258" strokeWidth="7" strokeLinecap="round" />
        <polygon points="360,252 351,272 369,272" />
        <line x1="400" y1="308" x2="400" y2="258" strokeWidth="7" strokeLinecap="round" />
        <polygon points="400,252 391,272 409,272" />
      </g>

      {/* Label bawah — sekarang ada ruang di bawahnya */}
      <g>
        <rect x="222" y="328" width="244" height="30" rx="15"
          fill="#fff" stroke="#16a34a" strokeWidth="2" />
        <text
          x="344" y="348"
          textAnchor="middle"
          fontSize="15"
          fontWeight="900"
          fill="#15803d"
        >
          Tekanan bawah — lebih BESAR
        </text>
      </g>

      {/* ============ RESULTAN KE ATAS ============ */}
      <g>
        {/* Panah */}
        <line x1="600" y1="238" x2="600" y2="160" stroke="#f59e0b" strokeWidth="12" strokeLinecap="round" />
        <polygon points="600,142 580,178 620,178" fill="#f59e0b" />

        {/* Label "Resultan → ke atas" */}
        <g>
          <rect x="516" y="252" width="168" height="30" rx="15"
            fill="#fff" stroke="#f59e0b" strokeWidth="2" />
          <text
            x="600" y="272"
            textAnchor="middle"
            fontSize="13.5"
            fontWeight="900"
            fill="#b45309"
          >
            Resultan → ke atas
          </text>
        </g>

        {/* Label Fₐ */}
        <g>
          <rect x="574" y="118" width="52" height="24" rx="12"
            fill="#fff" stroke="#f59e0b" strokeWidth="2" />
          <text
            x="600" y="135"
            textAnchor="middle"
            fontSize="14"
            fontWeight="900"
            fill="#b45309"
          >
            Fₐ
          </text>
        </g>
      </g>
    </svg>
  );
}