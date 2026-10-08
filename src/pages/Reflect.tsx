import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import PageGuide from '../components/PageGuide';
import { useApp } from '../context/AppContext';

const FIELDS: [string, string][] = [
  ['f1', 'Hal paling menarik yang saya temukan adalah...'],
  ['f2', 'Sekarang saya memahami bahwa...'],
  ['f3', 'Sebelumnya saya mengira..., tetapi sekarang...'],
  ['f4', 'Contoh Hukum Archimedes yang saya temui dalam kehidupan sehari-hari adalah...'],
  ['f5', 'Pertanyaan yang masih saya miliki adalah...']
];

export default function Reflect() {
  const { data, setReflection, markStage } = useApp();
  const [values, setValues] = useState<Record<string, string>>(data.reflections || {});
  const [saved, setSaved] = useState(false);

  const onChange = (k: string, v: string) => {
    setValues(s => ({ ...s, [k]: v }));
    setReflection(k, v);
  };

  const save = () => {
    const filled = FIELDS.filter(([id]) => (values[id] || '').trim().length > 3).length;
    if (filled < 3) { alert('Isi minimal tiga kotak dulu ya 🙂'); return; }
    markStage('reflect');
    setSaved(true);
  };

  return (
    <Layout>
      <h1 style={{ fontSize: 'clamp(26px,4vw,34px)' }}>🔄 Refleksi</h1>

      <PageGuide title="Di halaman ini kamu menuliskan apa yang berubah dari cara berpikirmu" lines={[
        'Tulis dengan bahasamu sendiri — tidak ada jawaban yang salah.',
        'Isi minimal tiga kotak, lalu tekan Simpan.',
        'Jawabanmu hanya tersimpan di perangkat ini.'
      ]} />

      <div className="card">
        <h3 style={{ fontSize: 20, marginBottom: 6 }}>Apa yang kamu temukan?</h3>
        <p style={{ fontSize: 15, marginBottom: 18 }}>Luangkan waktu sebentar. Coba ingat kembali apa yang kamu pikirkan sebelum dan sesudah eksperimen.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {FIELDS.map(([id, ph]) => (
            <div className="field" key={id} style={{ margin: 0 }}>
              <label htmlFor={id}>{ph}</label>
              <textarea id={id} value={values[id] || ''} onChange={e => onChange(id, e.target.value)} placeholder="Tulis di sini..." />
            </div>
          ))}
        </div>
        <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={save}>Simpan Refleksi 💾</button>
        {saved && <p style={{ marginTop: 12, fontWeight: 800, color: 'var(--green)' }}>✓ Refleksimu tersimpan. Terima kasih sudah berpikir mendalam!</p>}
      </div>

      <div className="card card-accent">
        <h3 style={{ fontSize: 19 }}>💭 Pertanyaan penutup</h3>
        <p style={{ marginTop: 8, fontSize: 16, fontWeight: 600 }}>
          "Jika kamu melihat kapal besar di laut setelah menyelesaikan misi ini, apa yang sekarang kamu pikirkan?"
        </p>
        <p style={{ marginTop: 8, fontSize: 15 }}>Pertanyaan ini untukmu sendiri. Coba renungkan sebelum melanjutkan.</p>
      </div>

      <div className="card" style={{ textAlign: 'center' }}>
        <Link to="/mastery" className="btn btn-primary">Lihat Hasil Akhir 🏆</Link>
      </div>
    </Layout>
  );
}