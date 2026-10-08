export type QuestionType = 'pg' | 'pgk' | 'match' | 'short' | 'hots';
export type Difficulty = 'mudah' | 'sedang' | 'sulit';

interface BaseQ {
  id: number;
  type: QuestionType;
  topic: string;
  difficulty: Difficulty;
  question: string;
  scenario?: string;
}

export interface PGQ extends BaseQ {
  type: 'pg' | 'hots';
  options: string[];
  answer: number;
}

export interface PGKQ extends BaseQ {
  type: 'pgk';
  options: string[];
  answers: number[];
}

export interface MatchQ extends BaseQ {
  type: 'match';
  left: string[];
  right: string[];
  answer: number[];
}

export interface ShortQ extends BaseQ {
  type: 'short';
  answers: string[];
}

export type Question = PGQ | PGKQ | MatchQ | ShortQ;

export const QUESTIONS: Question[] = [
  /* ====================== PG MUDAH ====================== */
  {
    id: 1, type: 'pg', topic: 'konsep', difficulty: 'mudah',
    question: 'Gaya ke atas adalah gaya yang...',
    options: [
      'diberikan oleh benda kepada fluida',
      'selalu sama besar dengan berat benda',
      'hanya bekerja pada benda yang tenggelam',
      'diberikan oleh fluida kepada benda, arahnya ke atas'
    ],
    answer: 3
  },
  {
    id: 2, type: 'pg', topic: 'konsep', difficulty: 'mudah',
    question: 'Perhatikan pernyataan berikut tentang gaya apung. Pernyataan yang benar adalah...',
    options: [
      'gaya apung searah dengan berat benda',
      'gaya apung tidak dipengaruhi oleh fluida',
      'gaya apung berlawanan arah dengan berat benda',
      'gaya apung hanya muncul di air tawar'
    ],
    answer: 2
  },
  {
    id: 3, type: 'pg', topic: 'konsep', difficulty: 'mudah',
    question: 'Satuan Sistem Internasional (SI) untuk massa jenis adalah...',
    options: ['kg', 'N', 'kg/m³', 'm/s²'],
    answer: 2
  },
  {
    id: 4, type: 'pg', topic: 'density', difficulty: 'mudah',
    question: 'Sebuah benda dikatakan mengapung jika...',
    options: [
      'massa jenis benda lebih besar daripada massa jenis fluida',
      'massa jenis benda sama dengan massa jenis fluida',
      'massa jenis benda lebih kecil daripada massa jenis fluida',
      'massa jenis benda tidak dipengaruhi fluida'
    ],
    answer: 2
  },
  {
    id: 5, type: 'pg', topic: 'aplikasi', difficulty: 'mudah',
    question: 'Peristiwa berikut yang menunjukkan penerapan Hukum Archimedes adalah...',
    options: [
      'buah kelapa jatuh dari pohon',
      'air mendidih di dalam panci',
      'besi memuai saat dipanaskan',
      'kapal laut mengapung di permukaan air'
    ],
    answer: 3
  },
  {
    id: 6, type: 'pg', topic: 'rumus', difficulty: 'sedang',
    question: 'Sebuah balok tercelup seluruhnya dalam air. Jika ρ air = 1.000 kg/m³, g = 10 m/s², dan volume balok 0,003 m³, gaya ke atas yang dialami balok adalah...',
    options: ['3 N', '30 N', '300 N', '0,3 N'],
    answer: 1
  },
  {
    id: 7, type: 'pg', topic: 'rumus', difficulty: 'sedang',
    question: 'Sebuah benda bermassa 0,8 kg dan bervolume 0,0004 m³. Massa jenis benda tersebut adalah...',
    options: ['200 kg/m³', '500 kg/m³', '1.000 kg/m³', '2.000 kg/m³'],
    answer: 3
  },
  {
    id: 8, type: 'pg', topic: 'rumus', difficulty: 'sedang',
    question: 'Sebuah benda tercelup sebagian di air. Volume bagian yang tercelup 0,0005 m³ dan ρ air = 1.000 kg/m³ (g = 10 m/s²). Gaya apung yang dialami benda adalah...',
    options: ['5 N', '0,5 N', '50 N', '500 N'],
    answer: 0
  },
  {
    id: 9, type: 'pg', topic: 'rumus', difficulty: 'sedang',
    question: 'Berat sebuah benda di udara 20 N. Saat tercelup seluruhnya di dalam air, beratnya menjadi 12 N. Gaya ke atas yang dialami benda adalah...',
    options: ['4 N', '8 N', '12 N', '32 N'],
    answer: 1
  },
  {
    id: 10, type: 'pg', topic: 'aplikasi', difficulty: 'sedang',
    question: 'Sebuah benda dipindahkan dari air tawar ke air laut (massa jenis air laut lebih besar). Gaya apung yang dialami benda akan...',
    options: [
      'bertambah karena massa jenis fluida bertambah',
      'berkurang karena benda lebih dalam tercelup',
      'tetap karena benda tidak berubah',
      'tidak dapat ditentukan'
    ],
    answer: 0
  },
  {
    id: 11, type: 'pg', topic: 'konsep', difficulty: 'sedang',
    question: 'Hukum Archimedes menyatakan bahwa besar gaya apung sama dengan...',
    options: [
      'berat benda di udara',
      'berat benda di dalam fluida',
      'berat fluida yang dipindahkan oleh benda',
      'volume fluida yang dipindahkan oleh benda'
    ],
    answer: 2
  },
  {
    id: 12, type: 'pg', topic: 'reasoning', difficulty: 'sulit',
    question: 'Benda P bermassa 2 kg volume 0,001 m³, dan benda Q bermassa 0,5 kg volume 0,001 m³ dimasukkan ke dalam air (ρ = 1.000 kg/m³). Pernyataan yang benar adalah...',
    options: [
      'P tenggelam, Q mengapung',
      'P mengapung, Q tenggelam',
      'keduanya mengapung',
      'keduanya tenggelam'
    ],
    answer: 0
  },
  {
    id: 13, type: 'pg', topic: 'rumus', difficulty: 'sulit',
    question: 'Sebuah benda tercelup seluruhnya dalam minyak (ρ = 800 kg/m³). Volume benda 0,005 m³, g = 10 m/s². Jika berat benda di udara 50 N, benda akan...',
    options: [
      'terapung di permukaan minyak',
      'melayang di dalam minyak',
      'tenggelam ke dasar wadah',
      'naik ke atas minyak'
    ],
    answer: 2
  },

  /* ====================== PGK (Pilihan Ganda Kompleks) ====================== */
  {
    id: 14, type: 'pgk', topic: 'konsep', difficulty: 'sedang',
    question: 'Manakah pernyataan yang BENAR tentang gaya ke atas? (Pilih SEMUA yang benar)',
    options: [
      'gaya ke atas arahnya berlawanan dengan berat benda',
      'gaya ke atas hanya bekerja pada benda yang tenggelam',
      'gaya ke atas bergantung pada massa jenis fluida',
      'gaya ke atas bergantung pada volume benda yang tercelup',
      'gaya ke atas selalu sama dengan berat benda'
    ],
    answers: [0, 2, 3]
  },
  {
    id: 15, type: 'pgk', topic: 'density', difficulty: 'sedang',
    question: 'Manakah kondisi berikut yang membuat benda TENGGELAM di air? (Pilih SEMUA yang benar)',
    options: [
      'massa jenis benda 1.200 kg/m³',
      'massa jenis benda 900 kg/m³',
      'massa jenis benda 1.000 kg/m³',
      'massa jenis benda 2.700 kg/m³',
      'massa jenis benda 500 kg/m³'
    ],
    answers: [0, 3]
  },
  {
    id: 16, type: 'pgk', topic: 'konsep', difficulty: 'sedang',
    question: 'Faktor-faktor yang mempengaruhi besar gaya apung adalah... (Pilih SEMUA yang benar)',
    options: [
      'massa jenis fluida',
      'massa benda',
      'volume fluida yang dipindahkan',
      'bentuk benda',
      'percepatan gravitasi'
    ],
    answers: [0, 2, 4]
  },
  {
    id: 17, type: 'pgk', topic: 'aplikasi', difficulty: 'sedang',
    question: 'Manakah yang termasuk penerapan Hukum Archimedes? (Pilih SEMUA yang benar)',
    options: [
      'kapal laut mengapung di permukaan air',
      'balon udara naik ke langit',
      'termometer mengukur suhu tubuh',
      'hidrometer mengukur massa jenis cairan',
      'pesawat terbang lepas landas'
    ],
    answers: [0, 1, 3]
  },
  {
    id: 18, type: 'pgk', topic: 'rumus', difficulty: 'sulit',
    question: 'Jika volume benda yang tercelup diperbesar (massa jenis fluida tetap), maka... (Pilih SEMUA yang benar)',
    options: [
      'volume fluida yang dipindahkan bertambah',
      'gaya ke atas bertambah',
      'berat benda bertambah',
      'gaya ke atas berkurang',
      'massa jenis benda berubah'
    ],
    answers: [0, 1]
  },

  /* ====================== MENJODOHKAN ====================== */
  {
    id: 19, type: 'match', topic: 'konsep', difficulty: 'sedang',
    question: 'Jodohkan istilah berikut dengan pengertian yang tepat!',
    left: ['Massa jenis', 'Gaya apung', 'Mengapung'],
    right: [
      'gaya yang diberikan fluida kepada benda yang tercelup',
      'kondisi benda saat massa jenisnya lebih kecil dari fluida',
      'besaran yang menyatakan massa per satuan volume'
    ],
    answer: [2, 0, 1]
  },
  {
    id: 20, type: 'match', topic: 'rumus', difficulty: 'sedang',
    question: 'Jodohkan rumus berikut dengan besaran yang dihitung!',
    left: ['ρ = m / V', 'Fₐ = ρ × g × V', 'w = m × g'],
    right: ['berat benda', 'massa jenis', 'gaya apung'],
    answer: [1, 2, 0]
  },
  {
    id: 21, type: 'match', topic: 'density', difficulty: 'sulit',
    question: 'Jodohkan kondisi benda berikut dengan perbandingan massa jenisnya!',
    left: ['Mengapung', 'Melayang', 'Tenggelam'],
    right: [
      'ρ benda = ρ fluida',
      'ρ benda > ρ fluida',
      'ρ benda < ρ fluida'
    ],
    answer: [2, 0, 1]
  },

  /* ====================== ISIAN SINGKAT ====================== */
  {
    id: 22, type: 'short', topic: 'rumus', difficulty: 'sedang',
    question: 'Sebuah benda bermassa 0,5 kg memiliki volume 0,0005 m³. Massa jenis benda tersebut adalah ... kg/m³.',
    answers: ['1000', '1.000', '1,000', '1 000']
  },
  {
    id: 23, type: 'short', topic: 'rumus', difficulty: 'sedang',
    question: 'Gaya apung yang dialami benda yang tercelup seluruhnya di air (ρ = 1.000 kg/m³, g = 10 m/s²) dengan volume 0,002 m³ adalah ... N.',
    answers: ['20']
  },
  {
    id: 24, type: 'short', topic: 'density', difficulty: 'sedang',
    question: 'Jika sebuah benda mengapung, massa jenis benda tersebut ... daripada massa jenis fluida.',
    answers: ['lebih kecil', 'lebihkecil', 'kecil']
  },
  {
    id: 25, type: 'short', topic: 'rumus', difficulty: 'sulit',
    question: 'Sebuah kapal memiliki massa 5.000 ton dan volume lambung 10.000 m³. Massa jenis rata-rata kapal adalah ... kg/m³.',
    answers: ['500']
  },
  {
    id: 26, type: 'short', topic: 'rumus', difficulty: 'sulit',
    question: 'Berat benda di udara 30 N. Saat tercelup di air, beratnya menjadi 22 N. Gaya apung yang dialami benda adalah ... N.',
    answers: ['8']
  },

  /* ====================== HOTS ====================== */
  {
    id: 27, type: 'hots', topic: 'reasoning', difficulty: 'sulit',
    scenario: 'Pak Andi memasukkan telur ayam ke dalam air tawar. Telur itu tenggelam. Ketika Pak Andi menambahkan banyak garam ke dalam air tersebut dan mengaduknya, telur yang sama justru melayang di dalam air.',
    question: 'Penjelasan paling tepat untuk fenomena ini adalah...',
    options: [
      'telur menjadi lebih ringan setelah air dicampur garam',
      'massa jenis air garam bertambah sehingga gaya apung pada telur bertambah',
      'garam menyerap sebagian berat telur',
      'telur berubah bentuk di dalam air garam'
    ],
    answer: 1
  },
  {
    id: 28, type: 'hots', topic: 'reasoning', difficulty: 'sulit',
    scenario: 'Seorang siswa meniup balon dengan gas helium hingga mengembang, lalu melepaskannya. Balon tersebut naik ke langit dan terus naik sampai akhirnya pecah di ketinggian tertentu.',
    question: 'Kesimpulan yang PALING tepat dari fenomena tersebut adalah...',
    options: [
      'helium lebih ringan dari udara sehingga balon terdorong ke atas',
      'helium bereaksi dengan udara dan menimbulkan gaya dorong',
      'balon kehilangan berat karena heliumnya keluar',
      'gravitasi tidak bekerja pada gas'
    ],
    answer: 0
  },
  {
    id: 29, type: 'hots', topic: 'reasoning', difficulty: 'sulit',
    scenario: 'Dua kubus identik A dan B dimasukkan ke dalam dua wadah berisi fluida berbeda. Kubus A tercelup 3/4 bagian, sedangkan kubus B tercelup 1/2 bagian. Keduanya mengapung.',
    question: 'Pernyataan yang PALING tepat adalah...',
    options: [
      'fluida di wadah B lebih rapat daripada di wadah A',
      'fluida di wadah A lebih rapat daripada di wadah B',
      'kedua fluida sama rapatnya',
      'tidak bisa dibandingkan'
    ],
    answer: 0
  },
  {
    id: 30, type: 'hots', topic: 'reasoning', difficulty: 'sulit',
    scenario: 'Seorang insinyur diminta merancang ulang kapal agar mampu mengangkut muatan yang lebih banyak, tanpa mengganti jenis bahan lambungnya.',
    question: 'Manakah perubahan desain yang PALING efektif untuk meningkatkan daya angkut kapal?',
    options: [
      'menggunakan bahan yang lebih ringan tetapi volume lambung tetap',
      'memperkecil volume lambung agar kapal lebih ringan',
      'memperbesar volume lambung agar massa jenis rata-rata kapal turun',
      'memindahkan mesin kapal ke posisi yang lebih tinggi'
    ],
    answer: 2
  }
];