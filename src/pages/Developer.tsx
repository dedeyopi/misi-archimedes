import { Link } from 'react-router-dom';

export default function Developer() {
  return (
    <div className="dev-page">
      <div className="wrap" style={{ maxWidth: 1080, margin: '0 auto', padding: '40px 20px 80px' }}>

        {/* ============ HEADER ============ */}
        <div style={{ marginBottom: 28 }}>
          <span style={{
            fontSize: 12,
            fontWeight: 900,
            letterSpacing: '.18em',
            color: 'var(--aqua)',
            textTransform: 'uppercase'
          }}>
            Tentang
          </span>
          <h1 style={{
            fontSize: 'clamp(28px, 4.5vw, 40px)',
            color: 'var(--ocean-d)',
            marginTop: 8,
            lineHeight: 1.15
          }}>
            Tentang Misi Archimedes
          </h1>
          <p style={{
            fontSize: 16.5,
            color: 'var(--ink-2)',
            marginTop: 8,
            maxWidth: 620
          }}>
            Media pembelajaran interaktif untuk materi Hukum Archimedes pada IPA Kelas 9 / Fase D.
          </p>
        </div>

        {/* ============ KARTU PROFIL UTAMA ============ */}
        <div className="dev-card">

          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 14px',
            borderRadius: 99,
            background: '#e0f2fe',
            color: 'var(--ocean-d)',
            fontSize: 13,
            fontWeight: 800,
            marginBottom: 22
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 2 L4 6 V12 C4 16.5 7.5 20.5 12 22 C16.5 20.5 20 16.5 20 12 V6 Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M9 12 L11 14 L15 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
            Penulis Naskah &amp; Pengembang MPI
          </div>

          {/* Grid: foto + info */}
          <div className="dev-profile-grid">

            {/* Foto / Avatar */}
            <div className="dev-photo-wrap">
              <div className="dev-photo">
                <img
  src="/foto-dede.jpg"
  alt="Foto Dede Yopi"
  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 15 }}
/>
              </div>
              <div className="dev-online" title="Aktif">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="4" fill="#fff" />
                </svg>
              </div>
            </div>

            {/* Info kanan */}
            <div className="dev-info">
              <h2 className="dev-name">Dede Yopi, M.Pd.</h2>

              <div className="dev-meta">
                <div className="dev-meta-row">
                  <span className="dev-meta-ico">🏫</span>
                  <span>SMP Negeri 49 Jakarta</span>
                </div>
                <div className="dev-meta-row">
                  <span className="dev-meta-ico">🔬</span>
                  <span>Guru IPA · Fase D</span>
                </div>
                <div className="dev-meta-row">
                  <span className="dev-meta-ico">✨</span>
                  <span>Pengembang Media Pembelajaran Interaktif</span>
                </div>
              </div>

              <div className="dev-tags">
                <span className="dev-tag dev-tag-blue">IPA Terpadu</span>
                <span className="dev-tag dev-tag-blue">MPI Interaktif</span>
                <span className="dev-tag dev-tag-amber">Pembelajaran Berbasis Inkuiri</span>
              </div>
            </div>
          </div>

          {/* Quote */}
          <div className="dev-quote">
            <p>
              "Media ini dikembangkan untuk membantu siswa memahami konsep IPA
              melalui eksplorasi, simulasi, analisis data, dan penerapan dalam
              kehidupan sehari-hari."
            </p>
          </div>
        </div>

        {/* ============ GRID DETAIL ============ */}
        <div className="dev-detail-grid">

          {/* Profil */}
          <div className="dev-detail-card">
            <div className="dev-detail-head">
              <span className="dev-detail-ico">📋</span>
              <h3>Profil</h3>
            </div>
            <ul className="dev-detail-list">
              <li>
                <span className="lbl">Institusi</span>
                <span className="val">SMP Negeri 49 Jakarta</span>
              </li>
              <li>
                <span className="lbl">Bidang</span>
                <span className="val">Ilmu Pengetahuan Alam (IPA)</span>
              </li>
              <li>
                <span className="lbl">Peran</span>
                <span className="val">Guru &amp; Pengembang Media</span>
              </li>
              <li>
                <span className="lbl">Tahun</span>
                <span className="val">2026</span>
              </li>
            </ul>
          </div>

          {/* Teknologi */}
          <div className="dev-detail-card">
            <div className="dev-detail-head">
              <span className="dev-detail-ico">🛠️</span>
              <h3>Teknologi</h3>
            </div>
            <div className="dev-chip-row">
              <span className="dev-chip">Vite</span>
              <span className="dev-chip">React</span>
              <span className="dev-chip">TypeScript</span>
              <span className="dev-chip">Canvas API</span>
              <span className="dev-chip">SVG</span>
              <span className="dev-chip">LocalStorage</span>
            </div>
          </div>

          {/* Pendekatan */}
          <div className="dev-detail-card">
            <div className="dev-detail-head">
              <span className="dev-detail-ico">🧭</span>
              <h3>Pendekatan Pembelajaran</h3>
            </div>
            <div className="dev-chip-row">
              <span className="dev-chip dev-chip-amber">5E Learning Cycle</span>
              <span className="dev-chip dev-chip-amber">Guided Inquiry</span>
              <span className="dev-chip dev-chip-amber">Contextual Learning</span>
              <span className="dev-chip dev-chip-amber">Mastery Learning</span>
            </div>
          </div>

          {/* Catatan Ilmiah */}
          <div className="dev-detail-card">
            <div className="dev-detail-head">
              <span className="dev-detail-ico">📐</span>
              <h3>Catatan Ilmiah</h3>
            </div>
            <p className="dev-detail-text">
              Simulasi menggunakan model fisika sederhana dengan nilai
              g = 10 m/s² dan massa jenis sebagai pendekatan pembelajaran.
              Model ini bertujuan membantu siswa memahami hubungan antar
              besaran, bukan menggantikan pengukuran laboratorium sesungguhnya.
            </p>
          </div>
        </div>

        {/* ============ FOOTER ============ */}
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link to="/dashboard" className="btn btn-ghost">← Kembali ke Beranda</Link>
        </div>

      </div>
    </div>
  );
}