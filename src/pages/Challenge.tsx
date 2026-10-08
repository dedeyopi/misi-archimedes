import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import PageGuide from '../components/PageGuide';
import { useApp } from '../context/AppContext';
import { MATERIALS } from '../constants';

const fmt = (n: number, d = 0) =>
  Number(n).toLocaleString('id-ID', { minimumFractionDigits: d, maximumFractionDigits: d });

const RHO_WATER = 1000;
const G = 10;
const SHELL_FRACTION = 0.08;

const VOL_MIN = 50;
const VOL_MAX = 3000;
const VOL_STEP = 10;

type Material = 'baja' | 'aluminium' | 'plastik' | 'kayu';
type ScenarioId = 'A' | 'B' | 'C';
type Cond = 'MENGAPUNG' | 'MELAYANG' | 'TENGGELAM';

const SCENARIOS: { id: ScenarioId; cargoTon: number; ico: string; title: string; short: string; desc: string }[] = [
  { id: 'A', cargoTon: 10, ico: '📦', title: 'Skenario A', short: '10 ton', desc: 'Angkut 10 ton beras untuk korban banjir.' },
  { id: 'B', cargoTon: 30, ico: '🏥', title: 'Skenario B', short: '30 ton', desc: 'Angkut 30 ton alat medis ke pulau terpencil.' },
  { id: 'C', cargoTon: 50, ico: '🏗️', title: 'Skenario C', short: '50 ton', desc: 'Angkut 50 ton bahan bangunan ke desa terisolir.' }
];

function classify(avgDensity: number): Cond {
  const r = avgDensity / RHO_WATER;
  if (r < 0.95) return 'MENGAPUNG';
  if (r <= 1.05) return 'MELAYANG';
  return 'TENGGELAM';
}

function visualShift(r: number): number {
  if (r <= 0.5) return -15;
  if (r <= 1.0) return -15 + (r - 0.5) * 90;
  return Math.min(100, 30 + (r - 1.0) * 120);
}

export default function Challenge() {
  const { data, markStage, awardBadge, setPrediction: savePrediction } = useApp();

  // ----- Tracker skenario yang sudah berhasil -----
  const completedScenarios: Record<ScenarioId, boolean> = data.predictions.challenge_scenarios || {};
  const doneCount = (['A', 'B', 'C'] as ScenarioId[]).filter(k => completedScenarios[k]).length;

  // ----- Skenario aktif -----
  const [scenarioId, setScenarioId] = useState<ScenarioId>('A');
  const scenario = SCENARIOS.find(s => s.id === scenarioId)!;
  const cargoTon = scenario.cargoTon;

  // ----- Desain (input) -----
  const [mat, setMat] = useState<Material>('baja');
  const [inputVol, setInputVol] = useState(500);

  // ----- Status kunci & slider -----
  const [locked, setLocked] = useState(false);
  const [sliderVol, setSliderVol] = useState(500);

  const activeVol = locked ? sliderVol : inputVol;

  // ----- Perhitungan fisika -----
  const calc = useMemo(() => {
    const m = MATERIALS[mat];
    const shellVol     = activeVol * SHELL_FRACTION;
    const shellMassKg  = shellVol * m.rho;
    const shellMassTon = shellMassKg / 1000;
    const cargoMassKg  = cargoTon * 1000;
    const totalMassKg  = shellMassKg + cargoMassKg;
    const totalMassTon = totalMassKg / 1000;
    const avgDensity   = activeVol > 0 ? totalMassKg / activeVol : 0;
    const ratio        = avgDensity / RHO_WATER;
    const status       = classify(avgDensity);
    const yShift       = visualShift(ratio);
    const FaMax        = RHO_WATER * G * activeVol;
    const W            = totalMassKg * G;
    return { m, shellMassTon, totalMassTon, avgDensity, ratio, status, yShift, FaMax, W };
  }, [mat, activeVol, cargoTon]);

  const hullColor = calc.m.color;
  const boxCount = Math.min(10, Math.max(2, Math.round(cargoTon / 5)));

  // ----- Tandai skenario selesai kalau MENGAPUNG -----
  const markScenarioDone = (id: ScenarioId) => {
    if (completedScenarios[id]) return;
    const next = { ...completedScenarios, [id]: true };
    savePrediction('challenge_scenarios', next);
  };

  // ----- Aksi -----
  const handleLock = () => {
    if (inputVol < VOL_MIN || inputVol > VOL_MAX) {
      alert(`Volume harus antara ${VOL_MIN}–${VOL_MAX} m³`);
      return;
    }
    setSliderVol(inputVol);
    setLocked(true);
    if (!data.stages.challenge) {
      markStage('challenge');
      awardBadge({ id: 'engineer', ico: '🚢', name: 'Archimedes Engineer' });
    }
  };

  const handleReset = () => {
    setLocked(false);
    setSliderVol(inputVol);
  };

  const handleSwitchScenario = (id: ScenarioId) => {
    setScenarioId(id);
    setLocked(false);
    setSliderVol(inputVol);
  };

  // Auto-mark saat mengapung
  if (locked && calc.status === 'MENGAPUNG' && !completedScenarios[scenarioId]) {
    markScenarioDone(scenarioId);
  }

  const allDone = doneCount === 3;

  return (
    <Layout>
      <h1 style={{ fontSize: 'clamp(26px,4vw,34px)' }}>🚢 Tantangan: Selamatkan Kapal</h1>

      <PageGuide title="Di halaman ini kamu menjadi insinyur kapal" lines={[
        'Pilih <strong>skenario misi</strong> — muatan kapal sudah ditentukan (10, 30, atau 50 ton).',
        'Tentukan <strong>bahan</strong> dan <strong>perkiraan volume</strong> lambung kapalmu.',
        'Kunci rancanganmu → simulasi terbuka → atur slider untuk mencari volume yang tepat.',
        '<strong>Selesaikan ketiga skenario</strong> untuk menuntaskan misi ini.'
      ]} />

      {/* ============ TRACKER 3 SKENARIO ============ */}
      <div className="card" style={{
        background: allDone
          ? 'linear-gradient(135deg,#f0fdf4,#dcfce7)'
          : 'linear-gradient(135deg,#f0f9ff,#e0f2fe)',
        border: allDone ? '2px solid var(--green-l)' : '2px solid var(--aqua)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <div>
            <h3 style={{ fontSize: 18, margin: 0 }}>
              {allDone ? '🏆 Misi Tuntas!' : `🎯 Progres Misi · ${doneCount} dari 3 skenario selesai`}
            </h3>
            <p style={{ fontSize: 14, marginTop: 4, color: 'var(--muted)' }}>
              {allDone
                ? 'Kamu berhasil merancang kapal untuk semua skenario. Luar biasa!'
                : 'Selesaikan setiap skenario dengan membuat kapal yang MENGAPUNG.'}
            </p>
          </div>
          <div className="pbar" style={{ minWidth: 180, flex: 1, maxWidth: 260, height: 12 }}>
            <i style={{ width: `${(doneCount / 3) * 100}%`, background: allDone
              ? 'linear-gradient(90deg,#22c55e,#16a34a)'
              : undefined }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 16 }}>
          {SCENARIOS.map(s => {
            const done = !!completedScenarios[s.id];
            const active = scenarioId === s.id;
            return (
              <button
                key={s.id}
                onClick={() => handleSwitchScenario(s.id)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                  padding: '12px 8px', borderRadius: 14, cursor: 'pointer',
                  border: active ? '2.5px solid var(--ocean)' : '2px solid var(--line-2)',
                  background: done ? '#f0fdf4' : active ? '#e0f2fe' : '#fff',
                  fontFamily: 'inherit', fontSize: 13, textAlign: 'center',
                  transition: 'all .18s', position: 'relative'
                }}
              >
                {done && (
                  <span style={{
                    position: 'absolute', top: 6, right: 8,
                    background: 'var(--green)', color: '#fff',
                    width: 20, height: 20, borderRadius: '50%',
                    display: 'grid', placeItems: 'center',
                    fontSize: 13, fontWeight: 900
                  }}>✓</span>
                )}
                <span style={{ fontSize: 22 }}>{s.ico}</span>
                <strong style={{ color: active ? 'var(--ocean-d)' : 'var(--ink)', fontSize: 14 }}>
                  {s.title}
                </strong>
                <span style={{ color: 'var(--muted)', fontWeight: 700 }}>{s.short}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ============ GRID UTAMA ============ */}
      <div className="grid grid-2">
        {/* ============ PANEL KIRI: DESAIN ============ */}
        <div className="card">
          <h3 style={{ fontSize: 18, marginBottom: 14 }}>🛠️ Rancang Kapalmu</h3>

          {/* Info skenario aktif */}
          <div style={{
            background: '#f8fbff', border: '1px solid var(--line)',
            borderRadius: 12, padding: 12, marginBottom: 18
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 26 }}>{scenario.ico}</span>
              <div>
                <div style={{ fontWeight: 800, fontSize: 15 }}>
                  {scenario.title} · Muatan {scenario.short}
                </div>
                <div style={{ fontSize: 13.5, color: 'var(--muted)' }}>{scenario.desc}</div>
              </div>
            </div>
          </div>

          {/* 1. Bahan */}
          <div className="ctrl-group">
            <label>1️⃣ Pilih bahan lambung</label>
            <div className="pill-row">
              {Object.entries(MATERIALS).map(([k, v]) => (
                <button
                  key={k}
                  className={`pill ${mat === k ? 'on' : ''}`}
                  onClick={() => !locked && setMat(k as Material)}
                  disabled={locked}
                  style={locked && mat !== k ? { opacity: 0.4 } : undefined}
                >
                  {v.name}<br />
                  <small style={{ fontWeight: 600 }}>{v.rho} kg/m³</small>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Volume */}
          <div className="ctrl-group">
            <label>2️⃣ {locked ? 'Volume lambung (mode eksplorasi)' : 'Perkirakan volume lambung'}</label>

            {!locked ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <input
                    type="number"
                    min={VOL_MIN} max={VOL_MAX} step={VOL_STEP}
                    value={inputVol}
                    onChange={e => {
                      const v = parseInt(e.target.value);
                      if (isNaN(v)) { setInputVol(VOL_MIN); return; }
                      setInputVol(Math.max(VOL_MIN, Math.min(VOL_MAX, v)));
                    }}
                    style={{
                      flex: 1, padding: '12px 14px', fontSize: 17, fontWeight: 800,
                      border: '2px solid var(--line-2)', borderRadius: 12,
                      fontVariantNumeric: 'tabular-nums'
                    }}
                  />
                  <span style={{ fontWeight: 800, color: 'var(--muted)', fontSize: 16 }}>m³</span>
                </div>
                <p className="hint">
                  Rentang {VOL_MIN}–{VOL_MAX} m³. Semakin besar volume, semakin banyak udara yang "dibawa" kapal.
                </p>
              </>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, marginBottom: 8 }}>
                  <span style={{ color: 'var(--muted)' }}>
                    Volume = <strong style={{ color: 'var(--ocean-d)' }}>{fmt(sliderVol, 0)} m³</strong>
                  </span>
                  <span style={{ fontSize: 13.5, color: 'var(--muted)', fontWeight: 700 }}>
                    input awalmu: {fmt(inputVol, 0)} m³
                  </span>
                </div>
                <input
                  type="range"
                  min={VOL_MIN} max={VOL_MAX} step={VOL_STEP}
                  value={sliderVol}
                  onChange={e => setSliderVol(+e.target.value)}
                />
                <p className="hint">
                  🔍 Geser slider untuk mencari volume yang membuat kapal <strong>mengapung</strong> dengan aman.
                </p>
              </>
            )}
          </div>

          {/* Tombol aksi */}
          {!locked ? (
            <button
              className="btn btn-primary"
              style={{ width: '100%', marginTop: 8 }}
              onClick={handleLock}
            >
              🔒 Kunci Rancangan &amp; Lihat Simulasi
            </button>
          ) : (
            <button
              className="btn btn-ghost btn-sm"
              style={{ width: '100%', marginTop: 8 }}
              onClick={handleReset}
            >
              ↺ Ubah Desain dari Awal
            </button>
          )}

          {/* ==== RINGKASAN — hanya tampil SETELAH lock ==== */}
          {locked && (
            <div className="stat" style={{ marginTop: 16 }}>
              <div className="lbl">Ringkasan Rancanganmu</div>
              <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 14 }}>
                <div><span style={{ color: 'var(--muted)' }}>Bahan:</span> <strong>{calc.m.name}</strong></div>
                <div><span style={{ color: 'var(--muted)' }}>Muatan:</span> <strong>{fmt(cargoTon, 0)} ton</strong></div>
                <div><span style={{ color: 'var(--muted)' }}>Massa bahan:</span> <strong>{fmt(calc.shellMassTon, 0)} ton</strong></div>
                <div><span style={{ color: 'var(--muted)' }}>Massa total:</span> <strong>{fmt(calc.totalMassTon, 0)} ton</strong></div>
              </div>
              <div style={{
                marginTop: 10, padding: '10px 12px', background: '#fff',
                borderRadius: 10, border: '1px solid var(--line)'
              }}>
                <div style={{
                  fontSize: 12, fontWeight: 800, color: 'var(--muted)',
                  textTransform: 'uppercase', letterSpacing: '.04em'
                }}>
                  Massa jenis rata-rata kapal
                </div>
                <div style={{
                  fontSize: 22, fontWeight: 900, color: 'var(--ocean-d)',
                  fontVariantNumeric: 'tabular-nums', marginTop: 2
                }}>
                  {Math.round(calc.avgDensity)} kg/m³
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 2 }}>
                  Bandingkan dengan air: 1.000 kg/m³
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ============ PANEL KANAN: SIMULASI ============ */}
        <div className="card tight" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{
            borderRadius: 'var(--radius)', overflow: 'hidden',
            border: '2px solid var(--line)', background: '#f0f9ff'
          }}>
            <ShipSVG
              yShift={locked ? calc.yShift : 0}
              label={locked ? calc.status : '🔒 TERKUNCI'}
              hullColor={hullColor}
              boxCount={boxCount}
              locked={locked}
            />
          </div>

          {/* Sebelum lock */}
          {!locked && (
            <div style={{ marginTop: 14 }}>
              <div style={{
                background: '#f0f9ff', border: '2px solid var(--aqua)',
                borderRadius: 12, padding: 14
              }}>
                <p style={{ fontWeight: 800, color: 'var(--ocean-d)', margin: 0, fontSize: 15 }}>
                  📝 Rancang dulu di panel kiri
                </p>
                <p style={{ fontSize: 14, marginTop: 6, marginBottom: 0, color: 'var(--ink-2)', lineHeight: 1.55 }}>
                  Pilih bahan, perkirakan volume, lalu kunci rancanganmu.
                  Setelah itu simulasi akan muncul dan kamu bisa menggeser slider untuk melihat pengaruhnya.
                </p>
              </div>
            </div>
          )}

          {/* Setelah lock */}
          {locked && (
            <div style={{ marginTop: 14 }}>
              <div style={{
                background: calc.status === 'MENGAPUNG' ? '#f0fdf4'
                          : calc.status === 'MELAYANG' ? '#fffbeb' : '#fef2f2',
                border: `2px solid ${calc.status === 'MENGAPUNG' ? 'var(--green-l)'
                        : calc.status === 'MELAYANG' ? 'var(--amber-l)' : '#fecaca'}`,
                borderRadius: 12, padding: 14
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 24 }}>
                    {calc.status === 'MENGAPUNG' ? '🎉' : calc.status === 'MELAYANG' ? '⚠️' : '🔴'}
                  </span>
                  <strong style={{
                    color: calc.status === 'MENGAPUNG' ? '#166534'
                         : calc.status === 'MELAYANG' ? '#92400e' : '#991b1b',
                    fontSize: 16
                  }}>
                    {calc.status === 'MENGAPUNG' ? 'Desainmu mengapung!'
                     : calc.status === 'MELAYANG' ? 'Desainmu melayang — hampir tenggelam!'
                     : 'Desainmu tenggelam!'}
                  </strong>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-2)', margin: 0 }}>
                  Dengan volume <strong>{fmt(activeVol, 0)} m³</strong>, massa jenis rata-rata kapal{' '}
                  <strong>{Math.round(calc.avgDensity)} kg/m³</strong>{' '}
                  ({calc.ratio < 1 ? 'lebih kecil' : calc.ratio > 1 ? 'lebih besar' : 'sama dengan'} massa jenis air).
                </p>
                {calc.status === 'TENGGELAM' && (
                  <p style={{ fontSize: 13.5, marginTop: 8, color: '#991b1b', fontWeight: 700 }}>
                    💡 Geser slider ke kanan — perbesar volume lambung supaya kapal lebih ringan.
                  </p>
                )}
                {calc.status === 'MELAYANG' && (
                  <p style={{ fontSize: 13.5, marginTop: 8, color: '#92400e', fontWeight: 700 }}>
                    💡 Aman tapi kritis. Geser slider sedikit ke kanan supaya kapal lebih tinggi di air.
                  </p>
                )}
                {calc.status === 'MENGAPUNG' && !completedScenarios[scenarioId] && (
                  <p style={{ fontSize: 13.5, marginTop: 8, color: '#166534', fontWeight: 700 }}>
                    💡 Coba geser slider ke kiri — berapa volume minimum yang masih membuat kapal mengapung?
                  </p>
                )}
                {calc.status === 'MENGAPUNG' && completedScenarios[scenarioId] && (
                  <p style={{ fontSize: 13.5, marginTop: 8, color: '#166534', fontWeight: 700 }}>
                    ✓ Skenario {scenarioId} selesai!
                    {!allDone && ` Lanjut coba skenario lain di atas.`}
                    {allDone && ' Semua skenario sudah kamu tuntaskan. 🏆'}
                  </p>
                )}
              </div>

              <div className="stat" style={{ marginTop: 10, background: '#fff' }}>
                <div className="lbl">Angka Penting</div>
                <div style={{ marginTop: 6, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, fontSize: 13.5 }}>
                  <div>Berat total: <strong>{fmt(calc.W / 1000, 0)} kN</strong></div>
                  <div>Fₐ maks: <strong>{fmt(calc.FaMax / 1000, 0)} kN</strong></div>
                  <div>ρ kapal: <strong>{Math.round(calc.avgDensity)} kg/m³</strong></div>
                  <div>ρ air: <strong>1.000 kg/m³</strong></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ============ REFERENSI 3 KONDISI ============ */}
      <div className="card">
        <h3 style={{ fontSize: 20 }}>📌 Tiga Kemungkinan Hasil</h3>
        <div className="grid grid-3" style={{ marginTop: 16 }}>
          <div className="card card-green" style={{ boxShadow: 'none' }}>
            <div style={{ fontSize: 26 }}>🟢</div>
            <h4 style={{ margin: '6px 0', fontSize: 17 }}>MENGAPUNG</h4>
            <p style={{ fontSize: 15 }}>ρ kapal &lt; ρ air</p>
            <p style={{ fontSize: 14, marginTop: 6 }}>Dek dan muatan tetap di atas permukaan air.</p>
          </div>
          <div className="card card-amber" style={{ boxShadow: 'none' }}>
            <div style={{ fontSize: 26 }}>🟡</div>
            <h4 style={{ margin: '6px 0', fontSize: 17 }}>MELAYANG</h4>
            <p style={{ fontSize: 15 }}>ρ kapal ≈ ρ air</p>
            <p style={{ fontSize: 14, marginTop: 6 }}>Hampir seluruh badan tercelup — kondisi paling kritis.</p>
          </div>
          <div className="card" style={{ boxShadow: 'none', borderLeft: '5px solid var(--red)' }}>
            <div style={{ fontSize: 26 }}>🔴</div>
            <h4 style={{ margin: '6px 0', fontSize: 17 }}>TENGGELAM</h4>
            <p style={{ fontSize: 15 }}>ρ kapal &gt; ρ air</p>
            <p style={{ fontSize: 14, marginTop: 6 }}>Gaya apung tidak sanggup menahan berat kapal.</p>
          </div>
        </div>
      </div>

      {/* ============ CTA ============ */}
      <div className="card" style={{ textAlign: 'center' }}>
        {allDone ? (
          <>
            <p style={{ fontWeight: 800, fontSize: 18, color: '#166534' }}>🏆 Semua skenario berhasil!</p>
            <p style={{ fontSize: 15, marginTop: 6 }}>
              Kamu sudah membuktikan bahwa bahan berat pun bisa mengapung — asalkan dirancang dengan tepat.
            </p>
            <Link to="/quiz" className="btn btn-primary" style={{ marginTop: 16 }}>
              Lanjut ke Evaluasi 📝
            </Link>
          </>
        ) : (
          <>
            <p style={{ fontWeight: 800, fontSize: 17, color: 'var(--ink)' }}>
              Selesaikan {3 - doneCount} skenario lagi untuk menuntaskan misi
            </p>
            <p style={{ fontSize: 15, marginTop: 4, color: 'var(--muted)' }}>
              Setiap skenario punya muatan berbeda — tantangannya juga berbeda.
            </p>
            <Link
              to="/quiz"
              className="btn btn-ghost"
              style={{ marginTop: 16 }}
              onClick={e => {
                if (!confirm('Kamu belum menyelesaikan semua skenario. Yakin ingin lanjut ke evaluasi?')) {
                  e.preventDefault();
                }
              }}
            >
              Lewati dulu, lanjut ke Evaluasi →
            </Link>
          </>
        )}
      </div>
    </Layout>
  );
}

/* =========================================================
   SVG KAPAL
   ========================================================= */
function ShipSVG({
  yShift, label, hullColor, boxCount, locked
}: {
  yShift: number;
  label: string;
  hullColor: string;
  boxCount: number;
  locked: boolean;
}) {
  return (
    <svg viewBox="0 0 480 380" style={{ width: '100%', display: 'block' }} role="img" aria-label="Simulasi kapal">
      <defs>
        <linearGradient id="chSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e0f2fe" />
          <stop offset="100%" stopColor="#f0f9ff" />
        </linearGradient>
        <linearGradient id="chSea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="100%" stopColor="#0c4a6e" />
        </linearGradient>
        <linearGradient id="chHull" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={hullColor} />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      <rect width="480" height="380" fill="url(#chSky)" />
      <circle cx="420" cy="58" r="26" fill="#fde68a" opacity="0.9" />
      <circle cx="420" cy="58" r="38" fill="#fde68a" opacity="0.22" />

      <ellipse cx="90" cy="62" rx="32" ry="13" fill="#fff" opacity="0.78" />
      <ellipse cx="122" cy="54" rx="22" ry="16" fill="#fff" opacity="0.78" />
      <ellipse cx="300" cy="42" rx="26" ry="10" fill="#fff" opacity="0.6" />

      <rect x="0" y="200" width="480" height="180" fill="url(#chSea)" />
      <path d="M0 200 Q60 194 120 200 T240 200 T360 200 T480 200 L480 210 L0 210 Z" fill="rgba(255,255,255,0.28)" />
      <line x1="0" y1="200" x2="480" y2="200" stroke="#fff" strokeWidth="2.5" opacity="0.85" />

      <text x="12" y="192" fontSize="11.5" fontWeight="800" fill="#0369a1">permukaan air</text>

      <g style={{
        transition: 'transform 0.7s cubic-bezier(.34, 1.2, .64, 1)',
        transform: `translateY(${yShift}px)`
      }}>
        {Array.from({ length: boxCount }).map((_, i) => {
          const col = i % 4;
          const row = Math.floor(i / 4);
          const x = 118 + col * 26;
          const y = 152 - row * 20;
          return (
            <g key={i}>
              <rect x={x} y={y} width="22" height="18" rx="2"
                fill="#f59e0b" stroke="#92400e" strokeWidth="1.5" />
              <line x1={x + 3} y1={y + 6}  x2={x + 19} y2={y + 6}  stroke="#92400e" strokeWidth="0.8" opacity="0.55" />
              <line x1={x + 3} y1={y + 12} x2={x + 19} y2={y + 12} stroke="#92400e" strokeWidth="0.8" opacity="0.55" />
            </g>
          );
        })}

        <line x1="322" y1="120" x2="322" y2="66" stroke="#475569" strokeWidth="2.5" />
        <path d="M322 70 L348 80 L322 90 Z" fill="#ef4444" />

        <rect x="288" y="120" width="66" height="50" rx="3" fill="#e2e8f0" stroke="#475569" strokeWidth="2" />
        <rect x="298" y="130" width="14" height="12" fill="#7dd3fc" stroke="#0369a1" strokeWidth="1" />
        <rect x="328" y="130" width="14" height="12" fill="#7dd3fc" stroke="#0369a1" strokeWidth="1" />
        <rect x="312" y="150" width="16" height="20" fill="#94a3b8" stroke="#475569" strokeWidth="1" />

        <rect x="88" y="170" width="304" height="8" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />

        <path d="M98 178 L382 178 L340 230 L140 230 Z"
          fill="url(#chHull)" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />

        <path d="M98 178 L382 178 L374 190 L106 190 Z" fill="rgba(255,255,255,0.18)" />

        <circle cx="185" cy="205" r="7" fill="#7dd3fc" stroke="#0369a1" strokeWidth="1.6" />
        <circle cx="240" cy="205" r="7" fill="#7dd3fc" stroke="#0369a1" strokeWidth="1.6" />
        <circle cx="295" cy="205" r="7" fill="#7dd3fc" stroke="#0369a1" strokeWidth="1.6" />
      </g>

      <rect x="0" y="344" width="480" height="36" fill="rgba(15,23,42,0.8)" />
      <text x="240" y="368" textAnchor="middle" fontSize="17" fontWeight="900" fill="#fff">{label}</text>

      {!locked && (
        <g>
          <rect x="0" y="0" width="480" height="380" fill="rgba(15,23,42,0.3)" />
          <text x="240" y="176" textAnchor="middle" fontSize="56" opacity="0.95">🔒</text>
          <text x="240" y="216" textAnchor="middle" fontSize="14" fontWeight="800" fill="#fff">
            Simulasi tersembunyi
          </text>
          <text x="240" y="236" textAnchor="middle" fontSize="12.5" fill="#e0f2fe">
            Kunci rancanganmu dulu untuk membuka
          </text>
        </g>
      )}
    </svg>
  );
}