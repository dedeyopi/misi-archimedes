import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import SubmarineArt from '../components/SubmarineArt';

const CLASSES = ['IX-A','IX-B','IX-C','IX-D','IX-E','IX-F','IX-G','IX-H','IX-I'];

export default function Login() {
  const { data, setStudent } = useApp();
  const navigate = useNavigate();
  const [name, setName] = useState(data.student.name);
  const [cls, setCls] = useState(data.student.studentClass);
  const [err, setErr] = useState('');

  const submit = () => {
    if (name.trim().length < 2) { setErr('Nama minimal 2 huruf ya.'); return; }
    if (!cls) { setErr('Jangan lupa pilih kelasmu dulu.'); return; }
    setErr('');
    setStudent({ name: name.trim(), studentClass: cls });
    navigate('/');
  };

  return (
    <div className="login-page">
      {/* ==== PANEL KIRI: Animasi Kapal Selam ==== */}
      <div className="login-ocean">
        <div className="login-ocean-rays" aria-hidden="true">
          <span /><span /><span /><span />
        </div>
        <SubmarineArt />
        <div className="login-ocean-caption">
          <div className="tag" style={{ background: 'rgba(255,255,255,.18)', color: '#e0f2fe' }}>
            🔬 Laboratorium IPA Digital
          </div>
          <h2 className="login-ocean-title">
            Selami rahasia<br />benda yang mengapung
          </h2>
          <p className="login-ocean-sub">
            Amati, bereksperimen, temukan polanya — lalu jelaskan mengapa kapal baja bisa mengapung.
          </p>
        </div>
      </div>

      {/* ==== PANEL KANAN: Form Login ==== */}
      <div className="login-card-wrap">
        <div className="login-card">
          <div className="login-brand">
            <svg width="42" height="42" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 17c2 1.5 4 1.5 6 0s4-1.5 6 0 4 1.5 6 0" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round"/>
              <path d="M12 3v9M12 3l5 3-5 3" stroke="#0369a1" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
            </svg>
            <div>
              <div className="login-brand-title">Misi Archimedes</div>
              <div className="login-brand-sub">IPA Kelas 9 · Fase D</div>
            </div>
          </div>

          <h1 className="login-title">
            {data.student.name ? `Halo lagi, ${data.student.name.split(' ')[0]}! 👋` : 'Selamat datang, Penyelidik! 🌊'}
          </h1>
          <p className="login-sub">
            {data.student.name
              ? 'Kamu bisa lanjutkan misi dari tempat terakhir berhenti.'
              : 'Sebelum menyelam lebih dalam, kenalan dulu yuk. Isi nama dan kelasmu untuk memulai misi.'}
          </p>

          <div className="field">
            <label htmlFor="inpNama">Nama lengkap</label>
            <input
              id="inpNama"
              type="text"
              placeholder="Contoh: Raka Pratama"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') submit(); }}
              autoComplete="name"
              autoFocus
            />
          </div>

          <div className="field">
            <label htmlFor="inpKelas">Kelas</label>
            <select id="inpKelas" value={cls} onChange={e => setCls(e.target.value)}>
              <option value="">— Pilih kelasmu —</option>
              {CLASSES.map(k => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>

          {err && <p className="login-err">{err}</p>}

          <button className="btn btn-primary login-btn" onClick={submit}>
            {data.student.name ? 'Lanjutkan Misi 🚀' : 'MULAI MISI 🚀'}
          </button>

          <p className="login-note">
            🔒 Datamu hanya tersimpan di perangkat ini, tidak dikirim ke mana pun.
          </p>
        </div>
      </div>
    </div>
  );
}