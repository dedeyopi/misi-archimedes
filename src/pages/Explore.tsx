import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import PageGuide from '../components/PageGuide';
import LabCanvas, { type LabReadout } from '../components/LabCanvas';
import BarChart from '../components/BarChart';
import { useApp } from '../context/AppContext';
import { FLUIDS, PRESETS, G } from '../constants';

const fmt = (n: number, d = 2) => Number(n).toLocaleString('id-ID', { minimumFractionDigits: d, maximumFractionDigits: d });

export default function Explore() {
  const { data, addExperiment, clearExperiments, markStage, awardBadge, setPrediction } = useApp();
  const [preset, setPreset] = useState('kayu');
  const [fluidId, setFluidId] = useState('air');
  const [mass, setMass] = useState(PRESETS.kayu.mass);
  const [volume, setVolume] = useState(PRESETS.kayu.volume);
  const [runId, setRunId] = useState(0);
  const [readout, setReadout] = useState<LabReadout>({ rhoObj: 600, vSub: 0, Fa: 0, W: 6, cond: 'Mengapung' });
  const [q1, setQ1] = useState(data.predictions.q1 || '');
  const [q2, setQ2] = useState(data.predictions.q2 || '');
  const [q3, setQ3] = useState(data.predictions.q3 || '');

  const fluid = FLUIDS[fluidId];
  const objColor = PRESETS[preset]?.color || '#14b8a6';

  const onPreset = (k: string) => {
    setPreset(k);
    setMass(PRESETS[k].mass);
    setVolume(PRESETS[k].volume);
  };

  const handleRecord = () => {
    if (readout.vSub < 1e-9) { alert('Masukkan dulu bendanya ke dalam fluida ya 🙂'); return; }
    addExperiment({
      material: PRESETS[preset].name,
      mass: +mass.toFixed(3),
      volume: +volume.toFixed(5),
      rhoObj: Math.round(readout.rhoObj),
      fluid: fluid.name,
      rhoFluid: fluid.rho,
      vSub: +readout.vSub.toFixed(6),
      Fa: +readout.Fa.toFixed(2),
      W: +readout.W.toFixed(2),
      cond: readout.cond
    });
    if (data.experiments.length === 0) awardBadge({ id: 'experiment', ico: '🧪', name: 'Virtual Experimenter' });
    if (data.experiments.length + 1 >= 3) awardBadge({ id: 'detective', ico: '📊', name: 'Data Detective' });
  };

  const handleQ = (key: 'q1' | 'q2', val: string) => {
    setPrediction(key, val);
    if (key === 'q1') setQ1(val); else setQ2(val);
  };

  const inquiryFeedback = useMemo(() => {
    if (!q1 || !q2) return null;
    if (q1 === 'bertambah' && q2 === 'bertambah') {
      return { ok: true, text: 'Bagus! Kamu menemukan polanya. Gaya ke atas bertambah ketika volume fluida yang dipindahkan bertambah, dan juga bertambah ketika massa jenis fluidanya bertambah.' };
    }
    return { ok: false, text: 'Belum tepat. Bandingkan percobaanmu: pada percobaan mana benda tercelup lebih banyak? Apakah angka gaya ke atas di tabel naik atau turun?' };
  }, [q1, q2]);

  const handleToConcept = () => {
    if (data.experiments.length >= 3) markStage('concept');
  };

  return (
    <Layout>
      <h1 style={{ fontSize: 'clamp(26px,4vw,34px)' }}>🧪 Laboratorium Virtual Archimedes</h1>

      <PageGuide title="Di halaman ini kamu melakukan eksperimen sendiri" lines={[
        'Pilih benda dan jenis fluida, lalu atur massa serta volumenya.',
        'Tekan <strong>Masukkan Benda</strong> dan amati apa yang terjadi.',
        'Catat hasilnya dengan tombol <strong>+ Simpan Data</strong>. Kumpulkan minimal 3 data.',
        'Ubah satu variabel saja setiap kali — supaya kamu tahu apa yang menyebabkan perubahannya.'
      ]} />

      <div className="lab-grid">
        <div>
          <LabCanvas
            mass={mass} volume={volume} color={objColor} fluid={fluid}
            runId={runId} onReadout={setReadout}
          />
          <div className="row" style={{ marginTop: 12, justifyContent: 'center' }}>
            <button className="btn btn-primary" onClick={() => setRunId(x => x + 1)}>⬇️ Masukkan Benda</button>
            <button className="btn btn-ghost btn-sm" onClick={() => { setMass(PRESETS[preset].mass); setVolume(PRESETS[preset].volume); setRunId(0); }}>↺ Ulangi</button>
            <button className="btn btn-green btn-sm" onClick={handleRecord}>＋ Simpan Data</button>
          </div>
          <p style={{ textAlign: 'center', fontSize: 12.5, color: 'var(--muted)', marginTop: 10 }}>
            Simulasi menggunakan model fisika yang disederhanakan untuk tujuan pembelajaran.
          </p>
        </div>

        <div>
          <div className="card tight">
            <div className="ctrl-group">
              <label>1️⃣ Pilih benda</label>
              <div className="pill-row">
                {Object.entries(PRESETS).map(([k, v]) => (
                  <button key={k} className={`pill ${preset === k ? 'on' : ''}`} onClick={() => onPreset(k)}>
                    {v.name.replace('Kubus ', '')}
                  </button>
                ))}
              </div>
            </div>

            <div className="ctrl-group">
              <label>2️⃣ Pilih fluida</label>
              <div className="pill-row">
                {Object.values(FLUIDS).map(f => (
                  <button key={f.id} className={`pill ${fluidId === f.id ? 'on' : ''}`} onClick={() => setFluidId(f.id)}>
                    {f.name}<br /><small style={{ fontWeight: 600 }}>{f.rho} kg/m³</small>
                  </button>
                ))}
              </div>
            </div>

            <div className="ctrl-group">
              <label>Massa benda <span className="val">{fmt(mass, 2)} kg</span></label>
              <input type="range" min={0.05} max={10} step={0.05} value={mass}
                onChange={e => { setMass(parseFloat(e.target.value)); setPreset('custom'); }} />
            </div>

            <div className="ctrl-group">
              <label>Volume benda <span className="val">{fmt(volume, 5)} m³</span></label>
              <input type="range" min={0.0002} max={0.003} step={0.0001} value={volume}
                onChange={e => { setVolume(parseFloat(e.target.value)); setPreset('custom'); }} />
            </div>

            <div className="stat" style={{ marginTop: 6 }}>
              <div className="lbl">Massa jenis benda</div>
              <div className="val2">{Math.round(readout.rhoObj)} kg/m³</div>
            </div>
          </div>

          <div className="card tight" style={{ marginTop: 14 }}>
            <h4 style={{ fontSize: 15, color: 'var(--ocean-d)', marginBottom: 10 }}>📋 Data Pengamatan Sekarang</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9, fontSize: 14 }}>
              {[
                ['Massa', fmt(mass, 2) + ' kg'],
                ['Volume', fmt(volume, 5) + ' m³'],
                ['ρ benda', Math.round(readout.rhoObj) + ' kg/m³'],
                ['ρ fluida', fluid.rho + ' kg/m³'],
                ['Volume tercelup', fmt(readout.vSub, 6) + ' m³'],
                ['Gaya ke atas', fmt(readout.Fa, 2) + ' N'],
                ['Berat benda', fmt(readout.W, 2) + ' N'],
                ['Kondisi', readout.cond]
              ].map(([l, v]) => (
                <div key={l} style={{ background: '#f8fbff', borderRadius: 9, padding: '8px 10px' }}>
                  <div style={{ fontSize: 11.5, fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase' }}>{l}</div>
                  <div style={{ fontWeight: 800, color: 'var(--ocean-d)', fontVariantNumeric: 'tabular-nums' }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <h3 style={{ fontSize: 20 }}>📊 Tabel Pengamatanmu</h3>
          <span className="tag">{data.experiments.length} data</span>
        </div>
        <div style={{ marginTop: 14 }}>
          {data.experiments.length === 0 ? (
            <div className="empty"><span className="e-ico">🧪</span>Belum ada hasil eksperimen.<br />Yuk lakukan percobaan pertamamu!</div>
          ) : (
            <>
              <div className="tbl-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>No</th><th>Benda</th><th>Fluida</th><th>ρ benda</th><th>ρ fluida</th>
                      <th>V tercelup</th><th>Fₐ (N)</th><th>Berat (N)</th><th>Kondisi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.experiments.map(e => (
                      <tr key={e.n}>
                        <td>{e.n}</td><td>{e.material.replace('Kubus ', '')}</td><td>{e.fluid}</td>
                        <td>{e.rhoObj}</td><td>{e.rhoFluid}</td><td>{fmt(e.vSub, 6)}</td>
                        <td><strong style={{ color: 'var(--ocean-d)' }}>{fmt(e.Fa, 2)}</strong></td>
                        <td>{fmt(e.W, 2)}</td>
                        <td>
                          <span className={`tag ${e.cond === 'Mengapung' ? 'g' : e.cond === 'Tenggelam' ? 'r' : 'a'}`}>{e.cond}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className="btn btn-ghost btn-sm" style={{ marginTop: 12 }}
                onClick={() => { if (confirm('Hapus semua data eksperimen?')) clearExperiments(); }}>
                Hapus semua data
              </button>
            </>
          )}
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontSize: 20 }}>📈 Grafik Gaya ke Atas</h3>
        <p style={{ fontSize: 15, marginTop: 4 }}>Setelah kamu punya minimal 3 data, grafik ini akan muncul. Perhatikan: apakah ada pola?</p>
        <div style={{ marginTop: 14 }}>
          {data.experiments.length < 3
            ? <div className="empty"><span className="e-ico">📈</span>Kumpulkan minimal 3 data dulu, lalu grafiknya akan muncul di sini.</div>
            : <BarChart data={data.experiments.map(e => ({ label: `P${e.n}`, value: e.Fa }))} />}
        </div>
      </div>

      <div className="card card-amber">
        <h3 style={{ fontSize: 20 }}>🔍 Pertanyaan Penyelidikan</h3>
        <p style={{ fontSize: 15, marginTop: 4, marginBottom: 18 }}>Jawab berdasarkan data yang benar-benar kamu kumpulkan.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <p style={{ fontWeight: 800, color: 'var(--ink)', marginBottom: 10 }}>1. Ketika volume bagian benda yang tercelup bertambah, apa yang terjadi pada gaya ke atas?</p>
            <div className="pill-row">
              {['bertambah', 'berkurang', 'tetap'].map(v => (
                <button key={v} className={`pill ${q1 === v ? 'on' : ''}`} onClick={() => handleQ('q1', v)}>
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontWeight: 800, color: 'var(--ink)', marginBottom: 10 }}>2. Ketika massa jenis fluida bertambah (volume tercelup tetap), bagaimana gaya ke atasnya?</p>
            <div className="pill-row">
              {['bertambah', 'berkurang', 'tetap'].map(v => (
                <button key={v} className={`pill ${q2 === v ? 'on' : ''}`} onClick={() => handleQ('q2', v)}>
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontWeight: 800, color: 'var(--ink)', marginBottom: 10 }}>3. Menurutmu, apa pola yang menghubungkan massa jenis fluida, volume tercelup, dan gaya ke atas?</p>
            <textarea value={q3} onChange={e => { setQ3(e.target.value); setPrediction('q3', e.target.value); }}
              placeholder="Tuliskan pola yang kamu temukan dengan bahasamu sendiri..."
              style={{ width: '100%', padding: 13, border: '2px solid var(--line-2)', borderRadius: 'var(--radius-s)', minHeight: 92, resize: 'vertical', fontFamily: 'inherit', fontSize: 'inherit' }} />
          </div>
        </div>

        {inquiryFeedback && (
          <div className="card" style={{
            boxShadow: 'none', marginTop: 16,
            background: inquiryFeedback.ok ? '#f0fdf4' : '#fffbeb',
            border: `2px solid ${inquiryFeedback.ok ? 'var(--green-l)' : 'var(--amber-l)'}`
          }}>
            <p style={{ fontWeight: 800, margin: 0, color: inquiryFeedback.ok ? '#166534' : '#92400e' }}>
              {inquiryFeedback.ok ? '✅ ' : '🤔 '}{inquiryFeedback.text}
            </p>
          </div>
        )}
      </div>

      <div className="card" style={{ textAlign: 'center' }}>
        <p style={{ fontWeight: 800, fontSize: 17, color: 'var(--ink)' }}>Sudah menemukan polanya?</p>
        <Link to="/concept" className="btn btn-primary" style={{ marginTop: 16 }} onClick={handleToConcept}>
          Lanjut ke Konsep 💡
        </Link>
      </div>
    </Layout>
  );
}