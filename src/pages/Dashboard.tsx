import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import PageGuide from '../components/PageGuide';
import { useApp } from '../context/AppContext';
import { BADGE_DEFS } from '../constants';

export default function Dashboard() {
  const { data, progress, reset } = useApp();

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

  const stages = [
    { to: '/engage', ico: '🔎', title: 'Temukan Fenomena', desc: 'Misteri kapal baja yang tidak mau tenggelam.', key: 'engage' },
    { to: '/explore', ico: '🧪', title: 'Eksperimen Virtual', desc: 'Laboratorium Archimedes — uji benda di berbagai fluida.', key: 'explore' },
    { to: '/concept', ico: '💡', title: 'Bangun Konsep', desc: 'Mengapa gaya ke atas muncul? Temukan rumusnya.', key: 'concept' },
    { to: '/simulation', ico: '🌊', title: 'Simulasi Massa Jenis', desc: 'Geser massa jenis, lihat benda mengapung atau tenggelam.', key: 'simulation' },
    { to: '/challenge', ico: '🚢', title: 'Tantangan Kapal', desc: 'Rancang kapal yang mampu membawa muatan.', key: 'challenge' },
    { to: '/quiz', ico: '🧠', title: 'Evaluasi', desc: '15 soal untuk menguji pemahamanmu.', key: 'quiz' },
    { to: '/reflect', ico: '🔄', title: 'Refleksi', desc: 'Apa yang berubah dari cara berpikirmu?', key: 'reflect' },
    { to: '/mastery', ico: '🏆', title: 'Hasil & Sertifikat', desc: 'Lihat pencapaian dan unduh sertifikatmu.', key: 'certificate' }
  ];

  const statusOf = (key: string) => {
    if (key === 'explore') return data.experiments.length >= 3;
    if (key === 'certificate') return data.certificateUnlocked;
    return data.stages[key as keyof typeof data.stages];
  };

  return (
    <Layout>
      <div className="card" style={{ background: 'linear-gradient(135deg,#0369a1,#06b6d4)', border: 'none', color: '#fff' }}>
        <h1 style={{ fontSize: 'clamp(24px,4vw,32px)', color: '#fff' }}>Selamat datang, {data.student.name}! 👋</h1>
        <p style={{ color: '#e0f2fe', fontSize: 16, marginTop: 4 }}>Kelas {data.student.studentClass} · Misi: Rahasia Benda yang Mengapung</p>
        <div style={{ marginTop: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: 14, marginBottom: 7 }}>
            <span>Progress Misi</span><span>{progress}%</span>
          </div>
          <div className="pbar" style={{ background: 'rgba(255,255,255,.28)' }}>
            <i style={{ width: `${progress}%`, background: 'linear-gradient(90deg,#fde68a,#fbbf24)' }} />
          </div>
        </div>
        <div className="row" style={{ marginTop: 18, gap: 10 }}>
          {checks.map(c => (
            <span key={c.label} style={{ background: 'rgba(255,255,255,.16)', padding: '5px 13px', borderRadius: 99, fontSize: 13, fontWeight: 800 }}>
              {c.done ? '✓' : '○'} {c.label}
            </span>
          ))}
        </div>
      </div>

      <PageGuide title="Di halaman ini kamu melihat peta petualanganmu" lines={[
        'Ikuti tahapan dari atas ke bawah supaya pemahamanmu terbangun runtut.',
        'Kamu tetap boleh membuka halaman mana pun — tapi urutan yang disarankan akan terasa lebih mudah.',
        'Klik salah satu kartu di bawah untuk mulai.'
      ]} />

      <h2 style={{ fontSize: 22, marginTop: 8 }}>Tahapan Misi</h2>
      <div className="grid grid-2">
        {stages.map(s => {
          const done = statusOf(s.key);
          return (
            <Link to={s.to} key={s.to} className={`stage ${done ? 'done' : ''}`}>
              <div className="s-ico">{s.ico}</div>
              <div style={{ flex: 1 }}>
                <div className="s-t">{s.title}</div>
                <div className="s-d">{s.desc}</div>
              </div>
              <span className="s-status" style={{ color: done ? 'var(--green)' : 'var(--amber)' }}>
                {done ? 'Selesai ✓' : 'Buka →'}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="card">
        <h3 style={{ fontSize: 19 }}>Lencana Koleksimu</h3>
        <p style={{ fontSize: 15, marginTop: 4, marginBottom: 16 }}>Kumpulkan semuanya dengan menyelesaikan setiap tahap.</p>
        <div className="badge-row">
          {BADGE_DEFS.map(b => {
            const got = data.badges.some(x => x.id === b.id);
            return (
              <div key={b.id} className={`badge ${got ? 'earned' : ''}`}>
                <div className="b-ico">{b.ico}</div>
                <div>{b.name}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="card tight">
        <details>
          <summary style={{ cursor: 'pointer', fontWeight: 800, color: 'var(--muted)', fontSize: 15 }}>⚙️ Pengaturan &amp; data</summary>
          <div style={{ marginTop: 14 }}>
            <p style={{ fontSize: 14.5 }}>Data belajarmu tersimpan di browser ini. Kamu bisa menghapusnya jika ingin memulai dari awal.</p>
            <button className="btn btn-ghost btn-sm" style={{ marginTop: 12, color: 'var(--red)', borderColor: '#fecaca' }}
              onClick={() => { if (confirm('Semua progress dan hasil eksperimen akan dihapus. Lanjutkan?')) reset(); }}>
              🗑️ Reset Perjalanan Belajar
            </button>
          </div>
        </details>
      </div>

      <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--muted)', marginTop: 8 }}>
        <Link to="/developer">Tentang Pengembang</Link>
      </p>
    </Layout>
  );
}