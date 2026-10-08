import type { Fluid, Preset, Question, Badge } from './types';

export const G = 10;

export const FLUIDS: Record<string, Fluid> = {
  air:      { id: 'air',      name: 'Air',      rho: 1000, color: '#38bdf8', deep: '#0284c7' },
  airlaut:  { id: 'airlaut',  name: 'Air Laut', rho: 1025, color: '#0ea5e9', deep: '#0369a1' },
  minyak:   { id: 'minyak',   name: 'Minyak',   rho: 800,  color: '#fbbf24', deep: '#d97706' }
};

export const PRESETS: Record<string, Preset> = {
  kayu:      { name: 'Kubus Kayu',      color: '#b45309', mass: 0.60, volume: 0.0010 },
  plastik:   { name: 'Kubus Plastik',   color: '#6366f1', mass: 0.92, volume: 0.0010 },
  aluminium: { name: 'Kubus Aluminium', color: '#94a3b8', mass: 2.70, volume: 0.0010 },
  besi:      { name: 'Kubus Besi',      color: '#475569', mass: 7.87, volume: 0.0010 },
  custom:    { name: 'Benda Custom',    color: '#14b8a6', mass: 0.50, volume: 0.0010 }
};

export const MATERIALS: Record<string, { name: string; rho: number; color: string }> = {
  baja:      { name: 'Baja',      rho: 7870, color: '#475569' },
  aluminium: { name: 'Aluminium', rho: 2700, color: '#94a3b8' },
  plastik:   { name: 'Plastik',   rho: 920,  color: '#6366f1' },
  kayu:      { name: 'Kayu',      rho: 600,  color: '#b45309' }
};

export const BADGE_DEFS: Badge[] = [
  { id: 'observer',   ico: '🔎', name: 'Scientific Observer' },
  { id: 'experiment', ico: '🧪', name: 'Virtual Experimenter' },
  { id: 'detective',  ico: '📊', name: 'Data Detective' },
  { id: 'concept',    ico: '💡', name: 'Concept Builder' },
  { id: 'density',    ico: '🌊', name: 'Density Explorer' },
  { id: 'engineer',   ico: '🚢', name: 'Archimedes Engineer' },
  { id: 'thinker',    ico: '🧠', name: 'Science Thinker' },
  { id: 'master',     ico: '🏆', name: 'Archimedes Master' }
];

export const QUESTIONS: Question[] = [
  { t: 'Apa sebenarnya yang dimaksud dengan gaya ke atas?', topic: 'konsep',
    o: ['Gaya yang diberikan fluida kepada benda yang berada di dalamnya, arahnya ke atas',
        'Gaya yang menarik benda ke dasar fluida',
        'Gaya berat benda yang diukur di dalam air',
        'Gaya yang dimiliki benda saat jatuh bebas'], a: 0 },
  { t: 'Sebuah kapal besar terbuat dari baja. Massa jenis baja jauh lebih besar daripada air. Mengapa kapal tetap bisa mengapung?', topic: 'konsep',
    o: ['Karena bentuk kapal membuat volume totalnya besar, sehingga massa jenis rata-rata kapal lebih kecil daripada air',
        'Karena baja berubah menjadi ringan saat terkena air',
        'Karena air laut tidak memiliki massa jenis',
        'Karena kapal didorong oleh angin laut'], a: 0 },
  { t: 'Sebuah benda melayang di dalam air. Pernyataan yang benar adalah...', topic: 'density',
    o: ['Massa jenis benda sama dengan massa jenis air',
        'Massa jenis benda lebih besar daripada air',
        'Massa jenis benda lebih kecil daripada air',
        'Benda tidak memiliki berat sama sekali'], a: 0 },
  { t: 'Ke arah manakah gaya ke atas bekerja pada benda?', topic: 'konsep',
    o: ['Ke atas, berlawanan dengan arah berat benda',
        'Ke bawah, searah dengan berat benda',
        'Ke samping mengikuti arus fluida',
        'Tergantung bentuk benda'], a: 0 },
  { t: 'Mengapa gaya ke atas bisa muncul pada benda yang tercelup di air?', topic: 'konsep',
    o: ['Karena tekanan fluida di bagian bawah benda lebih besar daripada tekanan di bagian atasnya',
        'Karena air menolak semua benda asing',
        'Karena benda menjadi lebih ringan saat berada di air',
        'Karena gaya gravitasi hilang di dalam air'], a: 0 },
  { t: 'Sebuah benda tercelup seluruhnya dalam air. ρ air = 1.000 kg/m³, g = 10 m/s², volume benda 0,002 m³. Berapa gaya ke atas yang dialami benda?', topic: 'rumus',
    o: ['20 N', '2 N', '200 N', '0,02 N'], a: 0 },
  { t: 'Sebuah benda bermassa 0,6 kg dan bervolume 0,0006 m³. Berapa massa jenis benda tersebut?', topic: 'rumus',
    o: ['1.000 kg/m³', '600 kg/m³', '360 kg/m³', '0,00036 kg/m³'], a: 0 },
  { t: 'Kubus kayu bermassa 0,5 kg mengapung di air (ρ = 1.000 kg/m³). Berapa volume kayu yang tercelup?', topic: 'rumus',
    o: ['0,0005 m³', '0,001 m³', '0,0001 m³', '0,005 m³'], a: 0 },
  { t: 'Perhatikan data berikut: percobaan 1 (V=0,001 m³ → Fₐ=10 N), percobaan 2 (V=0,002 m³ → Fₐ=20 N), percobaan 3 (V=0,003 m³ → Fₐ=30 N). Kesimpulan yang paling tepat adalah...', topic: 'data',
    o: ['Semakin besar volume fluida yang dipindahkan, semakin besar gaya ke atas',
        'Semakin besar volume fluida yang dipindahkan, semakin kecil gaya ke atas',
        'Gaya ke atas tidak dipengaruhi volume fluida yang dipindahkan',
        'Gaya ke atas hanya bergantung pada berat benda'], a: 0 },
  { t: 'Dua percobaan dilakukan dengan benda yang sama (volume tercelup tetap), tetapi fluidanya berbeda. Percobaan A memakai minyak (ρ = 800 kg/m³) menghasilkan Fₐ = 8 N. Percobaan B memakai air (ρ = 1.000 kg/m³). Berapa Fₐ pada percobaan B?', topic: 'data',
    o: ['10 N', '8 N', '6,4 N', '12,5 N'], a: 0 },
  { t: 'Kapal selam dapat menyelam ke dasar laut dan kembali naik ke permukaan. Bagaimana caranya?', topic: 'aplikasi',
    o: ['Dengan mengisi atau mengosongkan tangki pemberat sehingga massa totalnya berubah',
        'Dengan mengubah warna lambungnya',
        'Dengan memanaskan air laut di sekitarnya',
        'Dengan memperbesar gaya gravitasi di dalam kapal'], a: 0 },
  { t: 'Sebuah benda dipindahkan dari air tawar (ρ = 1.000 kg/m³) ke air laut (ρ = 1.025 kg/m³). Apa yang paling mungkin terjadi?', topic: 'aplikasi',
    o: ['Gaya ke atas bertambah, sehingga benda lebih banyak muncul di permukaan',
        'Gaya ke atas berkurang, sehingga benda lebih banyak tercelup',
        'Gaya ke atas tetap sama karena benda tidak berubah',
        'Benda pasti langsung tenggelam'], a: 0 },
  { t: 'Apakah benda yang lebih berat selalu mengalami gaya ke atas yang lebih besar?', topic: 'reasoning',
    o: ['Tidak, karena gaya ke atas bergantung pada volume fluida yang dipindahkan dan massa jenis fluida, bukan pada berat benda',
        'Ya, karena berat selalu sebanding dengan gaya ke atas',
        'Ya, karena benda berat pasti memindahkan lebih banyak fluida',
        'Tidak, karena gaya ke atas tidak pernah dipengaruhi apa pun'], a: 0 },
  { t: 'Sebuah balok besi kecil tenggelam di air, tetapi kapal besar yang terbuat dari baja justru mengapung. Penjelasan yang paling tepat adalah...', topic: 'reasoning',
    o: ['Massa jenis rata-rata kapal (massa total ÷ volume total termasuk rongga udara) lebih kecil daripada massa jenis air',
        'Kapal lebih ringan daripada balok besi',
        'Baja kapal berbeda jenis dengan baja balok',
        'Air laut menolak balok besi tetapi menerima kapal'], a: 0 },
  { t: 'Jika volume bagian benda yang tercelup diperbesar menjadi dua kali lipat (massa jenis fluida tetap), maka gaya ke atas menjadi...', topic: 'rumus',
    o: ['dua kali lebih besar', 'dua kali lebih kecil', 'tetap sama', 'empat kali lebih besar'], a: 0 }
];