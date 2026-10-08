import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useApp } from '../context/AppContext';

export default function Certificate() {
  const { data } = useApp();

  // ---------- Belum terbuka ----------
  if (!data.certificateUnlocked) {
    return (
      <Layout>
        <h1 style={{ fontSize: 'clamp(26px,4vw,34px)' }}>🏅 Sertifikat</h1>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 52 }}>🔒</div>
          <h3 style={{ margin: '10px 0 6px' }}>Sertifikat masih terkunci</h3>
          <p style={{ maxWidth: 520, margin: '0 auto' }}>
            Untuk membuka sertifikat, kamu perlu menyelesaikan seluruh tahapan misi dan
            memperoleh nilai evaluasi minimal <strong>75</strong>.
          </p>
          <div
            className="row"
            style={{ justifyContent: 'center', marginTop: 20 }}
          >
            <Link to="/mastery" className="btn btn-primary">
              Lihat Progres 🏆
            </Link>
            <Link to="/quiz" className="btn btn-ghost">
              Ulangi Evaluasi 📝
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  // ---------- Sudah terbuka ----------
  const tgl = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <Layout>
      {/* Tombol aksi (tidak ikut tercetak) */}
      <div
        className="no-print"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12
        }}
      >
        <h1 style={{ fontSize: 'clamp(24px,4vw,32px)' }}>
          🏅 Sertifikat Penyelesaian
        </h1>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => window.print()}
        >
          🖨️ Cetak / Simpan PDF
        </button>
      </div>

      {/* ============ SERTIFIKAT ============ */}
      <div className="cert">
        {/* 1. Ikon trofi */}
        <div style={{ fontSize: 44, marginBottom: 6 }}>🏆</div>

        {/* 2. Subtitle */}
        <div
          style={{
            fontSize: 13,
            fontWeight: 900,
            letterSpacing: '.22em',
            color: 'var(--amber)',
            textTransform: 'uppercase'
          }}
        >
          Archimedes Learning Achievement
        </div>

        {/* 3. Judul */}
        <h2 style={{ marginTop: 10 }}>SERTIFIKAT PENYELESAIAN</h2>

        {/* 4. Divider emas */}
        <div
          style={{
            width: 80,
            height: 4,
            background: 'var(--amber)',
            margin: '16px auto',
            borderRadius: 99
          }}
        />

        {/* 5. Label */}
        <p style={{ fontSize: 15.5, color: 'var(--muted)' }}>
          Diberikan kepada
        </p>

        {/* 6. Nama siswa */}
        <div className="name">{data.student.name}</div>

        {/* 7. Deskripsi */}
        <p
          style={{
            fontSize: 16,
            marginTop: 14,
            maxWidth: 600,
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
        >
          karena telah menyelesaikan pembelajaran interaktif{' '}
          <strong>"Misi Archimedes: Rahasia Benda yang Mengapung"</strong>
        </p>

        {/* 8. Grid info */}
        <div className="cert-info">
          <div>
            <div
              style={{
                fontSize: 12.5,
                fontWeight: 800,
                color: 'var(--muted)',
                textTransform: 'uppercase',
                letterSpacing: '.05em'
              }}
            >
              Materi
            </div>
            <div style={{ fontWeight: 800, fontSize: 16 }}>
              Gaya Ke Atas &amp; Hukum Archimedes
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: 12.5,
                fontWeight: 800,
                color: 'var(--muted)',
                textTransform: 'uppercase',
                letterSpacing: '.05em'
              }}
            >
              Kelas
            </div>
            <div style={{ fontWeight: 800, fontSize: 16 }}>
              {data.student.studentClass}
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: 12.5,
                fontWeight: 800,
                color: 'var(--muted)',
                textTransform: 'uppercase',
                letterSpacing: '.05em'
              }}
            >
              Skor
            </div>
            <div className="score">{data.quiz.score}</div>
          </div>
        </div>

        {/* 9. Tanggal */}
        <div style={{ marginTop: 26 }}>
          <div
            style={{
              fontSize: 12.5,
              fontWeight: 800,
              color: 'var(--muted)',
              textTransform: 'uppercase',
              letterSpacing: '.05em'
            }}
          >
            Tanggal
          </div>
          <div style={{ fontWeight: 800, fontSize: 16 }}>{tgl}</div>
        </div>

        {/* 10. Badge row */}
        <div className="badge-row" style={{ marginTop: 26 }}>
          {data.badges.map(b => (
            <span
              key={b.id}
              style={{
                background: '#fef3c7',
                color: '#78350f',
                padding: '5px 13px',
                borderRadius: 99,
                fontSize: 12.5,
                fontWeight: 800
              }}
            >
              {b.ico} {b.name}
            </span>
          ))}
        </div>

        {/* 11. Footer */}
        <p
          style={{
            fontSize: 12.5,
            color: 'var(--muted)',
            marginTop: 28
          }}
        >
          Misi Archimedes · Media Pembelajaran IPA Kelas 9 Fase D
        </p>
      </div>
      {/* ============ /SERTIFIKAT ============ */}

      {/* Kartu ucapan (tidak ikut tercetak) */}
      <div className="card no-print" style={{ textAlign: 'center' }}>
        <p style={{ fontWeight: 800, fontSize: 17, color: 'var(--ink)' }}>
          Selamat! 🎉
        </p>
        <p style={{ fontSize: 15, marginTop: 4 }}>
          Kamu sudah menyelesaikan seluruh misi.
        </p>
        <div
          className="row"
          style={{ justifyContent: 'center', marginTop: 16 }}
        >
          <Link to="/dashboard" className="btn btn-primary">
            Kembali ke Beranda 🏠
          </Link>
          <Link to="/reflect" className="btn btn-ghost">
            Isi Refleksi 🔄
          </Link>
        </div>
      </div>
    </Layout>
  );
}