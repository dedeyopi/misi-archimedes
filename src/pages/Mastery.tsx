import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import PageGuide from '../components/PageGuide';
import { useApp } from '../context/AppContext';
import { BADGE_DEFS } from '../constants';

const REMEDIAL: Record<string, { ico: string; text: string; link: string; label: string }> = {
  konsep: { ico: '💡', text: 'Baca ulang bagian "Mengapa gaya ke atas bisa muncul?" dan perhatikan animasi tekanan atas vs bawah.', link: '/concept', label: 'Buka Konsep' },
  rumus: { ico: '📐', text: 'Coba lagi visualisasi interaktif Fₐ = ρgV, geser nilainya pelan-pelan sambil memperhatikan angkanya.', link: '/concept', label: 'Buka Visualisasi' },
  density: { ico: '🌊', text: 'Mainkan Density Comparator untuk melihat kapan benda mengapung, melayang, dan tenggelam.', link: '/simulation', label: 'Buka Density Meter' },
  data: { ico: '📊', text: 'Kembali ke laboratorium, kumpulkan minimal 3 data, lalu amati grafik gaya ke atas.', link: '/explore', label: 'Buka Laboratorium' },
  aplikasi: { ico: '🚢', text: 'Coba tantangan desain kapal untuk melihat penerapan konsep dalam situasi nyata.', link: '/challenge', label: 'Buka Tantangan' },
  reasoning: { ico: '🧠', text: 'Diskusikan dengan teman atau gurumu: mengapa dua benda dari bahan yang sama bisa berperilaku berbeda?', link: '/concept', label: 'Baca Konsep' }
};

export default function Mastery() {
  const { data, progress } = useApp();
  const q = data.quiz;

  let level = 'Belum Dikerjakan', color = 'var(--muted)', desc = 'Kamu belum mengerjakan evaluasi. Yuk coba dulu!';
  if (q.completed) {
    if (q.score >= 90) { level = 'Mastery Achieved 🏆'; color = 'var(--green)'; desc = 'Luar biasa! Kamu tidak hanya menghafal, tetapi sudah bisa menjelaskan dan menerapkan konsep ini.'; }
    else if (q.score >= 75) { level = 'Menguasai'; color = '#16a34a'; desc = 'Bagus! Pemahamanmu sudah kuat. Beberapa bagian kecil masih bisa diperbaiki.'; }
    else if (q.score >= 60) { level = 'Mulai Menguasai'; color = 'var(--amber)'; desc = 'Kamu sudah menangkap sebagian besar idenya. Mari perkuat bagian yang masih goyah.'; }
    else { level = 'Perlu Belajar Lagi'; color = 'var(--red)'; desc = 'Tidak apa-apa! Ini artinya kamu punya kesempatan bagus untuk memahami ulang dengan cara yang berbeda.'; }
  }

  const wrong = q.wrongTopics || [];

  const checks = [
    { label: 'Masuk misi', done: !!data.student.name },
    { label: 'Menemukan fenomena', done: data.stages.engage },
    { label: 'Eksperimen virtual', done: data.experiments.length >= 3 },
    { label: 'Membangun konsep', done: data.stages.concept },
    { label: 'Simulasi massa jenis', done: data.stages.simulation },
    { label: 'Tantangan kapal', done: data.stages.challenge },
    { label: 'Evaluasi', done: data.stages.quiz },
    { label: 'Refleksi', done: data.stages.reflect }
  ];

  return (
    <Layout>
      <h1 style={{ fontSize: 'clamp(26px,4vw,34px)' }}>🏆 Hasil Perjalananmu</h1>

      <PageGuide title="Di halaman ini kamu melihat pencapaian dan langkah selanjutnya" lines={[
        'Lihat nilaimu dan level penguasaan yang kamu capai.',
        'Kalau ada bagian yang masih kurang, ikuti rekomendasi belajarnya.',
        'Kalau sudah memenuhi syarat, sertifikatmu bisa dibuka di halaman berikutnya.'
      ]} />

      <div className="card" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.05em' }}>Nilai Evaluasi</div>
        <div style={{ fontSize: 'clamp(56px,12vw,88px)', fontWeight: 900, lineHeight: 1, color, fontVariantNumeric: 'tabular-nums' }}>
          {q.completed ? q.score : '—'}
        </div>
        <div style={{ fontSize: 20, fontWeight: 900, color, marginTop: 6 }}>{level}</div>
        <p style={{ maxWidth: 560, margin: '12px auto 0' }}>{desc}</p>
        {q.completed && <p style={{ fontSize: 14, color: 'var(--muted)', marginTop: 10 }}>Benar {q.correct} dari {q.total} soal</p>}
      </div>

      <div className="card">
        <h3 style={{ fontSize: 20 }}>🗺️ Perjalanan Belajarmu</h3>
        <div className="grid grid-2" style={{ marginTop: 14 }}>
          {checks.map(c => (
            <div key={c.label} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
              borderRadius: 12, background: c.done ? '#f0fdf4' : '#f8fafc',
              border: `1px solid ${c.done ? '#bbf7d0' : 'var(--line)'}`
            }}>
              <span style={{ fontSize: 18 }}>{c.done ? '✓' : '○'}</span>
              <span style={{ fontWeight: 700, fontSize: 15, color: c.done ? '#166534' : 'var(--muted)' }}>{c.label}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: 14, marginBottom: 6 }}>
            <span>Progress keseluruhan</span><span>{progress}%</span>
          </div>
          <div className="pbar"><i style={{ width: `${progress}%` }} /></div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontSize: 20 }}>📊 Ringkasan Aktivitas</h3>
        <div className="grid grid-3" style={{ marginTop: 14 }}>
          <div className="stat"><div className="lbl">Eksperimen</div><div className="val2">{data.experiments.length}</div></div>
          <div className="stat"><div className="lbl">Lencana</div><div className="val2">{data.badges.length} / {BADGE_DEFS.length}</div></div>
          <div className="stat"><div className="lbl">Tantangan</div><div className="val2">{data.stages.challenge ? '1' : '0'}</div></div>
        </div>
        <div className="badge-row" style={{ marginTop: 18 }}>
          {BADGE_DEFS.map(b => {
            const got = data.badges.some(x => x.id === b.id);
            return (
              <div key={b.id} className={`badge ${got ? 'earned' : ''}`}>
                <div className="b-ico">{b.ico}</div><div>{b.name}</div>
              </div>
            );
          })}
        </div>
      </div>

      {wrong.length > 0 ? (
        <div className="card card-amber">
          <h3 style={{ fontSize: 20 }}>🎯 Rekomendasi Belajar Untukmu</h3>
          <p style={{ fontSize: 15, marginTop: 4 }}>Berdasarkan soal yang belum tepat, ini yang sebaiknya kamu ulangi:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
            {wrong.map(t => {
              const r = REMEDIAL[t]; if (!r) return null;
              return (
                <div key={t} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--radius-s)', padding: 14 }}>
                  <div style={{ fontSize: 24, flex: 'none' }}>{r.ico}</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 15.5, color: 'var(--ink-2)', margin: 0 }}>{r.text}</p>
                    <Link to={r.link} className="btn btn-ghost btn-sm" style={{ marginTop: 10 }}>{r.label}</Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : q.completed ? (
        <div className="card card-green">
          <h3 style={{ fontSize: 20, color: '#166534' }}>🎉 Tidak ada rekomendasi remedial!</h3>
          <p style={{ marginTop: 6 }}>Semua soalmu tepat. Pemahamanmu tentang Hukum Archimedes sudah sangat baik.</p>
        </div>
      ) : null}

      <div className="card" style={{ textAlign: 'center' }}>
        {data.certificateUnlocked ? (
          <>
            <p style={{ fontWeight: 800, fontSize: 17, color: 'var(--ink)' }}>🎓 Sertifikatmu sudah terbuka!</p>
            <Link to="/certificate" className="btn btn-primary" style={{ marginTop: 14 }}>Lihat Sertifikat 🏅</Link>
          </>
        ) : (
          <>
            <p style={{ fontWeight: 800, fontSize: 17, color: 'var(--ink)' }}>Sertifikat masih terkunci 🔒</p>
            <p style={{ fontSize: 15, marginTop: 4 }}>Syaratnya: menyelesaikan semua tahapan dan mendapat nilai minimal 75.</p>
            <div className="row" style={{ justifyContent: 'center', marginTop: 14 }}>
              <Link to="/quiz" className="btn btn-primary">Ulangi Evaluasi 📝</Link>
              <Link to="/explore" className="btn btn-ghost">Kembali ke Lab 🧪</Link>
            </div>
          </>
        )}
        <div className="row" style={{ justifyContent: 'center', marginTop: 14 }}>
          <Link to="/reflect" className="btn btn-ghost btn-sm">Isi Refleksi 🔄</Link>
        </div>
      </div>
    </Layout>
  );
}