import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { HeroArt } from '../components/HeroArt';

export default function Landing() {
  const { data, progress } = useApp();

  return (
    <>
      <section className="hero">
        <div className="hero-in">
          <div>
            <span className="tag" style={{ marginBottom: 14, display: 'inline-block' }}>
              Pengantar Misi · IPA Kelas 9 · Fase D
            </span>
            <h1>MENGUNGKAP RAHASIA<br />GAYA KE ATAS</h1>
            <p className="sub">
              Pernahkah kamu berdiri di pelabuhan dan melihat kapal baja raksasa mengapung tenang di atas air?
              Padahal baja itu jauh lebih "berat" daripada air. Aneh, bukan?
            </p>
            <p className="sub" style={{ marginTop: 10 }}>
              <strong>Halo {data.student.name || 'Penyelidik'} 👋</strong> — misi kita kali ini adalah mencari tahu
              jawabannya lewat eksperimen, bukan lewat hafalan.
            </p>
            <div className="row" style={{ marginTop: 24 }}>
              <Link to="/dashboard" className="btn btn-primary">Masuk Beranda Misi 🚀</Link>
              <a href="#cara-belajar" className="btn btn-ghost">Lihat Cara Belajar</a>
            </div>
          </div>
          <div><HeroArt /></div>
        </div>
      </section>

      <div className="wrap stack" style={{ paddingBottom: 80, marginTop: 34 }}>

        {/* Kartu ringkasan siswa */}
        {data.student.name && (
          <div className="card card-accent" style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
            <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg,#0369a1,#06b6d4)',
              display: 'grid', placeItems: 'center', fontSize: 26, color: '#fff', flex: 'none' }}>
              🧑‍🔬
            </div>
            <div style={{ flex: 1, minWidth: 220 }}>
              <div style={{ fontWeight: 900, fontSize: 18, color: 'var(--ink)' }}>{data.student.name}</div>
              <div style={{ fontSize: 14.5, color: 'var(--muted)', fontWeight: 700 }}>
                Kelas {data.student.studentClass} · Progres {progress}%
              </div>
              <div className="pbar" style={{ marginTop: 8 }}>
                <i style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>
        )}

        {/* Fitur unggulan */}
        <div className="grid grid-3">
          <div className="card">
            <div style={{ fontSize: 32 }}>🧪</div>
            <h3 style={{ margin: '8px 0 6px', fontSize: 19 }}>Laboratorium Virtual</h3>
            <p style={{ fontSize: 15.5 }}>Ubah massa, volume, dan jenis fluida. Lihat sendiri benda itu mengapung, melayang, atau tenggelam.</p>
          </div>
          <div className="card">
            <div style={{ fontSize: 32 }}>📊</div>
            <h3 style={{ margin: '8px 0 6px', fontSize: 19 }}>Eksperimen &amp; Data</h3>
            <p style={{ fontSize: 15.5 }}>Catat hasil percobaanmu, lalu temukan polanya sendiri dari tabel dan grafik.</p>
          </div>
          <div className="card">
            <div style={{ fontSize: 32 }}>🚢</div>
            <h3 style={{ margin: '8px 0 6px', fontSize: 19 }}>Tantangan Dunia Nyata</h3>
            <p style={{ fontSize: 15.5 }}>Jadi insinyur kapal muda. Rancang kapal yang tidak tenggelam saat diberi muatan.</p>
          </div>
        </div>

        {/* Cara belajar */}
        <div className="card" id="cara-belajar" style={{ scrollMarginTop: 90 }}>
          <h2 style={{ fontSize: 24 }}>Bagaimana cara belajar di sini?</h2>
          <p style={{ marginTop: 8 }}>Kamu tidak akan langsung diberi rumus. Ikuti alurnya, dan kamu akan menemukan rumusnya sendiri.</p>
          <div className="grid grid-2" style={{ marginTop: 18 }}>
            {[
              ['🔎', 'Amati', 'Kamu melihat fenomena aneh, lalu menebak penyebabnya.'],
              ['🧪', 'Coba', 'Kamu bereksperimen di laboratorium virtual.'],
              ['📊', 'Analisis', 'Kamu mencatat data dan mencari pola.'],
              ['💡', 'Simpulkan', 'Kamu merumuskan sendiri hubungan antar besaran.'],
              ['🚢', 'Terapkan', 'Kamu memakai konsep itu untuk merancang kapal.'],
              ['🧠', 'Uji', 'Kamu membuktikan pemahamanmu lewat soal penalaran.']
            ].map(([i, t, d]) => (
              <div key={t} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ fontSize: 24, flex: 'none' }}>{i}</div>
                <div>
                  <strong style={{ fontSize: 16 }}>{t}</strong>
                  <p style={{ fontSize: 15, marginTop: 2 }}>{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA akhir */}
        <div className="card" style={{ textAlign: 'center', background: 'linear-gradient(135deg,#0369a1,#06b6d4)', border: 'none', color: '#fff' }}>
          <h2 style={{ color: '#fff', fontSize: 24 }}>Siap memulai petualangan?</h2>
          <p style={{ color: '#e0f2fe', marginTop: 6 }}>
            Semua alat eksperimen sudah disiapkan di dalam. Tinggal kamu yang menggerakkan.
          </p>
          <Link to="/dashboard" className="btn btn-amber" style={{ marginTop: 18 }}>
            Mulai Misi Pertama →
          </Link>
        </div>

        <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--muted)' }}>
          Simulasi menggunakan model fisika yang disederhanakan untuk tujuan pembelajaran.
        </p>
      </div>
    </>
  );
}