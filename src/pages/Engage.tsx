import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import PageGuide from '../components/PageGuide';
import { useApp } from '../context/AppContext';

const OBJS = [
  ['batu', '🪨', 'Batu'],
  ['bola', '⚽', 'Bola plastik'],
  ['kayu', '🪵', 'Potongan kayu'],
  ['logam', '🔩', 'Paku logam'],
  ['kapal', '🚢', 'Kapal baja']
];

export default function Engage() {
  const { data, setPrediction, markStage, awardBadge } = useApp();
  const [shipFb, setShipFb] = useState(!!data.predictions.ship);
  const p = data.predictions;

  const handleShip = (v: string) => {
    if (p.ship) return;
    setPrediction('ship', v);
    setShipFb(true);
  };

  const handleObj = (id: string, v: string) => {
    setPrediction(id, v);
    const ids = ['batu','bola','kayu','logam','kapal'];
    const updated = { ...p, [id]: v };
    if (ids.every(k => updated[k])) {
      markStage('engage');
      awardBadge({ id: 'observer', ico: '🔎', name: 'Scientific Observer' });
    }
  };

  const allPredicted = ['batu','bola','kayu','logam','kapal'].every(k => p[k]);

  return (
    <Layout>
      <h1 style={{ fontSize: 'clamp(26px,4vw,34px)' }}>🔎 Misteri Kapal Baja</h1>

      <PageGuide title="Di halaman ini kamu mengamati dan menebak — belum ada jawaban benar atau salah" lines={[
        'Amati fenomena yang ditampilkan.',
        'Tuliskan tebakanmu (hipotesis) pada dua pertanyaan di bawah.',
        'Jangan takut salah — tebakan yang salah justru membantu kita belajar.'
      ]} />

      <div className="card">
        <span className="tag">Fenomena 1</span>
        <h3 style={{ margin: '12px 0 8px' }}>Pernahkah kamu melihat kapal besar di laut?</h3>
        <p>Kapal itu terbuat dari <strong>baja</strong>. Beratnya bisa mencapai ribuan ton. Sementara itu, massa jenis baja sekitar <strong>7.870 kg/m³</strong>, sedangkan air laut hanya sekitar <strong>1.025 kg/m³</strong>.</p>
        <p style={{ marginTop: 10 }}>Kalau baja jauh lebih "padat" daripada air, seharusnya kapal langsung tenggelam. Tapi kenyataannya tidak.</p>

        <div style={{ margin: '22px 0', borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--line)' }}>
          <ShipSeaSVG />
        </div>

        <div className="card card-amber" style={{ boxShadow: 'none', background: '#fffbeb' }}>
          <h4 style={{ fontSize: 17 }}>🤔 Menurutmu, mengapa kapal baja tidak tenggelam?</h4>
          <p style={{ fontSize: 14.5, marginTop: 4, marginBottom: 14 }}>Pilih satu jawaban yang paling kamu yakini.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              ['A', 'Air mendorong kapal ke atas.'],
              ['B', 'Sebenarnya kapal itu tidak berat.'],
              ['C', 'Baja berubah menjadi ringan ketika berada di dalam air.'],
              ['D', 'Air tidak memiliki gaya sama sekali.']
            ].map(([k, t]) => (
              <button key={k} className="opt" onClick={() => handleShip(k)} disabled={!!p.ship}
                style={p.ship === k ? { borderColor: 'var(--ocean)', background: '#f0f9ff' } : undefined}>
                <span className="k">{k}</span><span>{t}</span>
              </button>
            ))}
          </div>
          {shipFb && (
            <div className="card" style={{ boxShadow: 'none', background: '#f0f9ff', border: '2px solid var(--aqua)', marginTop: 16 }}>
              <p style={{ fontWeight: 800, color: 'var(--ocean-d)', margin: 0 }}>📌 Hipotesismu sudah dicatat!</p>
              <p style={{ marginTop: 6, fontSize: 15.5 }}>Kita belum akan membahas benar atau salah sekarang. Mari kita buktikan lewat eksperimen di laboratorium.</p>
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <span className="tag">Fenomena 2</span>
        <h3 style={{ margin: '12px 0 8px' }}>Sekarang, bagaimana dengan benda-benda ini?</h3>
        <p>Kalau benda-benda berikut dimasukkan ke dalam air, apa yang akan terjadi? Tebak dulu sebelum mencoba di laboratorium.</p>

        <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {OBJS.map(([id, ico, nm]) => (
            <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', padding: 12, border: '2px solid var(--line)', borderRadius: 'var(--radius-s)' }}>
              <div style={{ fontSize: 26 }}>{ico}</div>
              <div style={{ flex: 1, minWidth: 120, fontWeight: 800 }}>{nm}</div>
              <div className="pill-row">
                {['Mengapung', 'Melayang', 'Tenggelam'].map(v => (
                  <button key={v} className={`pill ${p[id] === v ? 'on' : ''}`} onClick={() => handleObj(id, v)}>{v}</button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {allPredicted && (
          <div className="card" style={{ boxShadow: 'none', background: '#f0fdf4', border: '2px solid var(--green-l)', marginTop: 18 }}>
            <p style={{ fontWeight: 800, color: '#166534', margin: 0 }}>✅ Semua tebakanmu tersimpan.</p>
            <p style={{ marginTop: 6, fontSize: 15.5 }}>Sekarang kita punya sesuatu untuk dibuktikan. Di laboratorium nanti, bandingkan tebakanmu dengan hasil sebenarnya.</p>
          </div>
        )}
      </div>

      <div className="card" style={{ textAlign: 'center' }}>
        <p style={{ fontWeight: 800, fontSize: 17, color: 'var(--ink)' }}>Sudah siap membuktikan tebakanmu?</p>
        <p style={{ fontSize: 15, marginTop: 4 }}>Saatnya masuk ke laboratorium dan menguji sendiri.</p>
        <Link to="/explore" className="btn btn-primary" style={{ marginTop: 16 }}>Masuk Laboratorium 🧪</Link>
      </div>
    </Layout>
  );
}

function ShipSeaSVG() {
  return (
    <svg viewBox="0 0 700 260" style={{ width: '100%', display: 'block' }} role="img" aria-label="Kapal baja mengapung di laut">
      <defs>
        <linearGradient id="seag" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38bdf8" /><stop offset="100%" stopColor="#075985" />
        </linearGradient>
        <linearGradient id="skyg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e0f2fe" /><stop offset="100%" stopColor="#f0f9ff" />
        </linearGradient>
        <linearGradient id="hullg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#64748b" /><stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
      </defs>
      <rect width="700" height="260" fill="url(#skyg)" />
      <path d="M0 130 H700 V260 H0 Z" fill="url(#seag)" />
      <g className="wave" opacity=".45" fill="#7dd3fc">
        <path d="M-30 134 q35 -13 70 0 t70 0 t70 0 t70 0 t70 0 t70 0 t70 0 t70 0 t70 0 t70 0 v16 H-30 Z" />
      </g>
      <g className="bob">
        <path d="M230 120 h250 l-32 62 H262 Z" fill="url(#hullg)" />
        <rect x="268" y="84" width="175" height="38" rx="6" fill="#e2e8f0" />
        <rect x="300" y="52" width="112" height="32" rx="6" fill="#f8fafc" />
        <g fill="#f59e0b"><rect x="316" y="60" width="16" height="16" rx="2" /><rect x="340" y="60" width="16" height="16" rx="2" /><rect x="364" y="60" width="16" height="16" rx="2" /></g>
        <rect x="392" y="14" width="8" height="40" fill="#475569" />
        <path d="M400 16 l34 18 -34 18 Z" fill="#ef4444" />
      </g>
      <g className="floaty">
        <path d="M170 190 V126" stroke="#fbbf24" strokeWidth="10" strokeLinecap="round" />
        <path d="M170 110 l-18 30 h36 Z" fill="#fbbf24" />
        <text x="170" y="224" textAnchor="middle" fontFamily="Nunito Sans,sans-serif" fontSize="17" fontWeight="900" fill="#fff">Gaya ke atas (Fₐ)</text>
      </g>
      <g>
        <path d="M540 126 V192" stroke="#ef4444" strokeWidth="10" strokeLinecap="round" opacity=".9" />
        <path d="M540 208 l-18 -30 h36 Z" fill="#ef4444" opacity=".9" />
        <text x="540" y="110" textAnchor="middle" fontFamily="Nunito Sans,sans-serif" fontSize="17" fontWeight="900" fill="#0369a1">Berat (w)</text>
      </g>
    </svg>
  );
}