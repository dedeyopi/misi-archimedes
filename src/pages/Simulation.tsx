import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import PageGuide from '../components/PageGuide';
import { useApp } from '../context/AppContext';

export default function Simulation() {
  const { markStage, awardBadge } = useApp();
  const [rhoObj, setRhoObj] = useState(700);
  const [rhoFlu, setRhoFlu] = useState(1000);

  const diff = rhoObj - rhoFlu;
  let topY = 0, color = '#22c55e', verdict = 'Benda MENGAPUNG', desc = 'Massa jenis benda lebih kecil daripada fluida, jadi benda hanya tercelup sebagian.';
  let sign = '＜', vColor = 'var(--green)';

  if (Math.abs(diff) < 8) {
    topY = 130; color = '#f59e0b'; verdict = 'Benda MELAYANG'; sign = '≈';
    desc = 'Massa jenis benda hampir sama dengan fluida, jadi benda melayang di dalam air.';
    vColor = 'var(--amber)';
  } else if (diff < 0) {
    const fracAbove = Math.max(0.12, Math.min(0.72, Math.abs(diff) / 500));
    topY = 70 - 100 * fracAbove + 8;
    color = '#22c55e'; verdict = 'Benda MENGAPUNG';
    desc = 'Massa jenis benda lebih kecil daripada fluida, jadi benda hanya tercelup sebagian.';
    vColor = 'var(--green)';
  } else {
    topY = 226; color = '#ef4444'; verdict = 'Benda TENGGELAM'; sign = '＞';
    desc = 'Massa jenis benda lebih besar daripada fluida, jadi benda turun sampai dasar.';
    vColor = 'var(--red)';
  }

  const onInteract = () => {
    markStage('simulation');
    awardBadge({ id: 'density', ico: '🌊', name: 'Density Explorer' });
  };

  return (
    <Layout>
      <h1 style={{ fontSize: 'clamp(26px,4vw,34px)' }}>🌊 Simulasi Massa Jenis</h1>

      <PageGuide title="Di halaman ini kamu menguji satu ide besar: benda mengapung atau tenggelam ditentukan oleh perbandingan massa jenis" lines={[
        'Geser massa jenis benda dan massa jenis fluida.',
        'Perhatikan perubahan posisi benda secara langsung.',
        'Cari tahu pada kondisi apa benda mengapung, melayang, dan tenggelam.'
      ]} />

      <div className="grid grid-2">
        <div className="card">
          <div className="ctrl-group">
            <label>Massa jenis BENDA (ρ benda) <span className="val">{rhoObj} kg/m³</span></label>
            <input type="range" min={300} max={1500} step={10} value={rhoObj}
              onChange={e => { setRhoObj(+e.target.value); onInteract(); }} />
          </div>
          <div className="ctrl-group">
            <label>Massa jenis FLUIDA (ρ fluida) <span className="val">{rhoFlu} kg/m³</span></label>
            <input type="range" min={800} max={1200} step={5} value={rhoFlu}
              onChange={e => { setRhoFlu(+e.target.value); onInteract(); }} />
          </div>

          <div className="card tight" style={{ marginTop: 6, background: '#f8fbff', boxShadow: 'none' }}>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.04em' }}>Density Meter</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
              <span className="big-num" style={{ fontSize: 26 }}>{rhoObj}</span>
              <span style={{ fontWeight: 900, color: 'var(--muted)', fontSize: 20 }}>{sign}</span>
              <span className="big-num" style={{ fontSize: 26 }}>{rhoFlu}</span>
              <span style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 700 }}>kg/m³</span>
            </div>
            <div style={{ marginTop: 10, fontWeight: 900, fontSize: 18, color: vColor }}>{verdict}</div>
            <p style={{ fontSize: 14.5, marginTop: 6, color: 'var(--ink-2)' }}>{desc}</p>
          </div>
        </div>

        <div className="card tight" style={{ padding: 14 }}>
          <div style={{ borderRadius: 'var(--radius)', overflow: 'hidden', border: '2px solid var(--line)', background: '#f0f9ff' }}>
            <svg viewBox="0 0 400 340" style={{ width: '100%', display: 'block' }}>
              <defs>
                <linearGradient id="sg3" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7dd3fc" stopOpacity=".95" />
                  <stop offset="100%" stopColor="#0369a1" />
                </linearGradient>
              </defs>
              <rect width="400" height="340" fill="#f8fbff" />
              <rect x="0" y="70" width="400" height="270" fill="url(#sg3)" />
              <line x1="0" y1="70" x2="400" y2="70" stroke="#fff" strokeWidth="3" opacity=".85" />
              <text x="14" y="58" fontSize="13" fontWeight="800" fill="#0369a1">Permukaan fluida</text>
              <g style={{ transition: 'transform .55s cubic-bezier(.34,1.3,.64,1)', transform: `translateY(${topY}px)` }}>
                <rect x="150" y="0" width="100" height="100" rx="10" fill={color} stroke="#fff" strokeWidth="3" />
                <text x="200" y="58" textAnchor="middle" fontSize="15" fontWeight="900" fill="#fff">BENDA</text>
              </g>
            </svg>
          </div>
          <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--muted)', marginTop: 10 }}>
            Model sederhana: posisi benda mengikuti perbandingan massa jenis.
          </p>
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontSize: 20 }}>📌 Tiga Kondisi Benda dalam Fluida</h3>
        <div className="grid grid-3" style={{ marginTop: 16 }}>
          <div className="card card-green" style={{ boxShadow: 'none' }}>
            <div style={{ fontSize: 26 }}>🟢</div>
            <h4 style={{ margin: '6px 0', fontSize: 17 }}>MENGAPUNG</h4>
            <p style={{ fontSize: 15 }}>ρ benda <strong>&lt;</strong> ρ fluida</p>
            <p style={{ fontSize: 14.5, marginTop: 6 }}>Benda hanya tercelup sebagian. Bagian yang tercelup tepat menghasilkan gaya ke atas sebesar berat benda.</p>
          </div>
          <div className="card card-amber" style={{ boxShadow: 'none' }}>
            <div style={{ fontSize: 26 }}>🟡</div>
            <h4 style={{ margin: '6px 0', fontSize: 17 }}>MELAYANG</h4>
            <p style={{ fontSize: 15 }}>ρ benda <strong>=</strong> ρ fluida</p>
            <p style={{ fontSize: 14.5, marginTop: 6 }}>Benda tercelup seluruhnya tetapi tidak naik dan tidak turun.</p>
          </div>
          <div className="card" style={{ boxShadow: 'none', borderLeft: '5px solid var(--red)' }}>
            <div style={{ fontSize: 26 }}>🔴</div>
            <h4 style={{ margin: '6px 0', fontSize: 17 }}>TENGGELAM</h4>
            <p style={{ fontSize: 15 }}>ρ benda <strong>&gt;</strong> ρ fluida</p>
            <p style={{ fontSize: 14.5, marginTop: 6 }}>Berat benda lebih besar daripada gaya ke atas maksimum.</p>
          </div>
        </div>
      </div>

      <div className="card" style={{ textAlign: 'center' }}>
        <p style={{ fontWeight: 800, fontSize: 17, color: 'var(--ink)' }}>Sudah paham tiga kondisinya?</p>
        <p style={{ fontSize: 15, marginTop: 4 }}>Sekarang saatnya jadi insinyur kapal.</p>
        <Link to="/challenge" className="btn btn-primary" style={{ marginTop: 16 }}>Lanjut ke Tantangan 🚢</Link>
      </div>
    </Layout>
  );
}