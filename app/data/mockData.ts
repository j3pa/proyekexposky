import { Material, UserProfile, Review, SubscriptionPackage } from '../types';

export const UNIVERSITIES = [
  'Semua Kampus',
  'Universitas Indonesia (UI)',
  'Institut Teknologi Bandung (ITB)',
  'Universitas Gadjah Mada (UGM)',
  'Institut Teknologi Sepuluh Nopember (ITS)',
  'Universitas Airlangga (UNAIR)',
  'Universitas Diponegoro (UNDIP)',
  'Universitas Brawijaya (UB)',
  'Universitas Pembangunan Nasional Veteran Yogyakarta (UPN Veteran Yogyakarta)',
];

export const CATEGORIES = [
  'Semua Kategori',
  'Rangkuman Kuliah',
  'Latihan Soal & UTS/UAS',
  'Slide Dosen Resmi',
  'Modul Praktikum',
  'Panduan Skripsi',
];

export const SUBSCRIPTION_PACKAGES: SubscriptionPackage[] = [
  {
    id: 'basic',
    name: 'Basic Access',
    badge: 'Akses Soal Latihan',
    price: 49000,
    period: 'per semester',
    tagline: 'Fokus Latihan Mandiri & Bank Soal',
    description: 'Hanya mengakses bank soal latihan ujian dan kisi-kisi UTS/UAS kampus se-Indonesia tanpa catatan materi teoritis.',
    colorScheme: 'emerald',
    features: [
      { text: 'Akses Penuh Bank Soal Latihan & Kisi-kisi UTS/UAS', included: true },
      { text: 'Kunci Jawaban & Poin Penting Soal', included: true },
      { text: 'Unduh Lembar Soal Ujian (PDF)', included: true },
      { text: 'Catatan Materi & Teori Konsep Mengenai Soal', included: false, platinumOnly: true },
      { text: 'Slide Dosen Resmi & Modul Teori Lengkap', included: false, platinumOnly: true },
      { text: 'Trik Cepat Ujian & Pembuktian Rumus', included: false, platinumOnly: true },
    ],
  },
  {
    id: 'platinum',
    name: 'Platinum Access',
    badge: 'Soal + Catatan Materi (Best Value)',
    price: 149000,
    period: 'per semester',
    tagline: 'Soal Ujian + Catatan Materi Pembahasan Lengkap',
    description: 'Akses terlengkap! Membuka seluruh bank soal latihan DAN catatan materi komprehensif, slide teori dosen, serta ringkasan materi seputar soal tersebut.',
    recommended: true,
    colorScheme: 'gold',
    features: [
      { text: 'Akses Penuh Bank Soal Latihan & Kisi-kisi UTS/UAS', included: true, highlight: true },
      { text: 'Catatan Materi Lengkap Mengenai Soal Tersebut', included: true, highlight: true },
      { text: 'Slide Dosen Resmi & Modul Praktikum Terkurasi', included: true, highlight: true },
      { text: 'Langkah Pembahasan & Tips Trik Ujian Cepat', included: true, highlight: true },
      { text: 'Bebas Unduh Seluruh Dokumen & Rangkuman HD (PDF)', included: true },
      { text: 'Akses Prioritas Update Bank Soal Semester Baru', included: true },
    ],
  },
];

export const INITIAL_DOSEN_USER: UserProfile = {
  id: 'usr_dosen_1',
  name: 'Dr. Eng. Wisnu Jatmiko, M.Kom',
  role: 'dosen',
  email: 'wisnu.jatmiko@ui.ac.id',
  campus: 'Universitas Indonesia (UI)',
  studyProgram: 'Fakultas Ilmu Komputer',
  nidnOrNim: 'NIDN 0023057801',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  isVerified: true,
  walletBalance: 3850000,
  materialsSold: 184,
  materialsShared: 8,
};

export const INITIAL_MAHASISWA_USER: UserProfile = {
  id: 'usr_mhs_1',
  name: 'Rian Pratama',
  role: 'mahasiswa',
  email: 'rian.pratama@mhs.ui.ac.id',
  campus: 'Universitas Indonesia (UI)',
  studyProgram: 'Ilmu Komputer',
  nidnOrNim: 'NPM 2206819230',
  avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
  isVerified: true,
  walletBalance: 125000,
  materialsSold: 12,
  materialsShared: 3,
  subscriptionTier: 'free',
};

export const MOCK_REVIEWS: Record<string, Review[]> = {
  'mat_1': [
    {
      id: 'rev_1',
      userName: 'Ahmad Fauzi',
      userRole: 'mahasiswa',
      campus: 'UI',
      rating: 5,
      comment: 'Penjelasan tree dan graf di materi Pak Wisnu sangat runut, langsung lulus UTS dapat A!',
      date: '2 hari lalu',
      difficultyVote: 'Menengah',
    },
    {
      id: 'rev_2',
      userName: 'Nadia Salsabila',
      userRole: 'mahasiswa',
      campus: 'ITB',
      rating: 5,
      comment: 'Sangat recommended untuk yang persiapan ujian komprehensif. Slide resmi sangat jelas.',
      date: '1 minggu lalu',
      difficultyVote: 'Menengah',
    }
  ],
  'mat_2': [
    {
      id: 'rev_3',
      userName: 'Dimas Kurnia',
      userRole: 'mahasiswa',
      campus: 'UGM',
      rating: 5,
      comment: 'Catatan tulisan tangan rapi banget! Ada diagram metabolic pathway warna-warni.',
      date: '3 hari lalu',
      difficultyVote: 'Sulit',
    }
  ]
};

export const INITIAL_MATERIALS: Material[] = [
  {
    id: 'mat_1',
    title: 'Slide Kuliah & Modul Resmi: Algoritma & Struktur Data (Full Semester)',
    description: 'Modul pengajaran resmi terakreditasi mencakup Asymptotic Notation, Binary Search Trees, AVL Tree, Graph Traversal (DFS/BFS), Dynamic Programming, hingga Analisis Kompleksitas. Dilengkapi studi kasus industri.',
    category: 'Slide Dosen Resmi',
    campus: 'Universitas Indonesia (UI)',
    faculty: 'Fakultas Ilmu Komputer',
    studyProgram: 'Ilmu Komputer & Sistem Informasi',
    courseName: 'Struktur Data & Algoritma',
    semester: 3,
    authorId: 'usr_dosen_1',
    authorName: 'Dr. Eng. Wisnu Jatmiko, M.Kom',
    authorRole: 'dosen',
    authorTitle: 'Dosen Utama Fasilkom UI • NIDN Terverifikasi',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    isVerified: true,
    isOfficialDosen: true,
    price: 25000,
    rating: 4.95,
    reviewsCount: 168,
    difficulty: 'Menengah',
    pagesCount: 84,
    downloadsCount: 1240,
    tags: ['Dosen Resmi', 'Slide Lengkap', 'Ujian A+', 'Kurasi Kampus'],
    createdAt: '3 hari lalu',
    fileSize: '18.4 MB (PDF)',
    previewPages: [
      'BAB 1: Pengantar Struktur Data & Big-O Notation\n• Konsep abstraksi data (ADT)\n• Analisis efisiensi waktu & ruang\n• Best, Average, Worst case complexity',
      'BAB 2: Balanced Trees & Self-Balancing BST\n• Rotasi Left-Right pada AVL Tree\n• Red-Black Tree invariant rules\n• Contoh implementasi kode C++ & Java',
      'BAB 3: Dynamic Programming Strategy\n• Top-down memoization vs Bottom-up tabulation\n• Klasik Knapsack 0/1 Problem\n• Longest Common Subsequence (LCS)'
    ],
    practiceQuestions: [
      {
        id: 'q_algo_1',
        number: 1,
        topic: 'Binary Search Tree & AVL Self-Balancing',
        difficulty: 'Menengah',
        questionText: 'Diberikan AVL Tree kosong. Masukkan elemen secara berurutan: [10, 20, 30, 25]. Tentukan jenis rotasi yang terjadi saat node 25 dimasukkan!',
        sampleAnswer: 'Terjadi pelanggaran balance factor pada node 20 (Left-Right Case), sehingga dilakukan Double Rotation: Rotasi Kiri pada node 20 dilanjutkan Rotasi Kanan pada node 30.',
        keyPoints: [
          'Setelah insert 10, 20, 30: terjadi single left rotation pada 10 (Root baru: 20)',
          'Setelah insert 25: subpohon kanan (node 30) memiliki Left Child 25 (Left-Heavy subchild)',
          'Rotasi Left-Right (LR) mengembalikan balance factor ke rentang {-1, 0, 1}'
        ],
        theoryNotes: {
          conceptTitle: 'Catatan Teori: Invariant AVL Tree, Balance Factor & 4 Pola Rotasi',
          summaryExplanation: 'AVL Tree adalah self-balancing Binary Search Tree di mana selisih tinggi antara subpohon kiri dan subpohon kanan (Balance Factor = Height(Left) - Height(Right)) pada setiap node maksimal bernilai -1, 0, atau +1.\n\n4 Kasus Rotasi:\n1. Left-Left (LL) -> Single Right Rotation\n2. Right-Right (RR) -> Single Left Rotation\n3. Left-Right (LR) -> Rotasi Kiri pada anak kiri, lalu Rotasi Kanan pada root\n4. Right-Left (RL) -> Rotasi Kanan pada anak kanan, lalu Rotasi Kiri pada root',
          formulaOrSnippet: 'Balance Factor (BF) = Height(LeftNode) - Height(RightNode)\nKondisi Seimbang: BF ∈ {-1, 0, 1}\nKompleksitas Pencarian & Penyisipan AVL: O(log N)',
          examTips: 'Pada lembar jawaban ujian UTS, gambar pohon per langkah dan tuliskan angka Balance Factor di samping setiap node untuk mendapatkan nilai maksimal.',
          relatedTopics: ['Red-Black Tree', 'B-Tree & B+ Tree', 'Analisis Asimptotik Big-O']
        }
      },
      {
        id: 'q_algo_2',
        number: 2,
        topic: 'Dynamic Programming: 0/1 Knapsack Problem',
        difficulty: 'Sulit',
        questionText: 'Terdapat 3 barang dengan bobot w = [2, 3, 4] dan nilai v = [3, 4, 5]. Kapasitas tas W = 5. Tentukan nilai maksimum menggunakan tabel DP!',
        sampleAnswer: 'Nilai maksimum yang dapat dimasukkan adalah 7 (mengambil barang ke-1 seberat 2 bernilai 3 dan barang ke-2 seberat 3 bernilai 4).',
        keyPoints: [
          'Definisikan DP[i][w] = nilai maksimum dengan i barang pertama dan kapasitas w',
          'Relasi Rekurensi: DP[i][w] = max(DP[i-1][w], DP[i-1][w - w_i] + v_i)',
          'Barang ke-3 (bobot 4, nilai 5) tidak diambil karena kombinasi barang 1 dan 2 bernilai 7'
        ],
        theoryNotes: {
          conceptTitle: 'Catatan Teori: Optimal Substructure & Overlapping Subproblems pada DP',
          summaryExplanation: 'Dynamic programming memecahkan persoalan optimasi dengan menyimpan solusi subproblem ke dalam tabel memoization/tabulasi. Pada 0/1 Knapsack, setiap barang hanya boleh diambil 0 atau 1 kali (berbeda dengan Fractional Knapsack yang bisa diselesaikan dengan algoritma Greedy).',
          formulaOrSnippet: 'Relasi Rekurensi:\nDP[i][w] = DP[i-1][w]                           jika w_i > w\nDP[i][w] = max(DP[i-1][w], DP[i-1][w-w_i] + v_i)  jika w_i <= w\nKompleksitas Waktu: O(N * W) (Pseudo-polynomial)',
          examTips: 'Selalu inisialisasi baris 0 dan kolom 0 tabel dengan angka 0 sebagai base case sebelum mengisi sel-sel berikutnya.',
          relatedTopics: ['Longest Common Subsequence (LCS)', 'Greedy Algorithms', 'Subset Sum Problem']
        }
      }
    ]
  },
  {
    id: 'mat_2',
    title: 'Bank Soal UTS & UAS Kalkulus II + Pembahasan Langkah Demi Langkah',
    description: 'Kumpulan 50+ latihan soal integrasi parsial, deret Taylor-Maclaurin, fungsi multivariabel, turunan parsial, dan integral lipat dua beserta kunci jawaban sistematis dan tips trik menjawab cepat.',
    category: 'Latihan Soal & UTS/UAS',
    campus: 'Institut Teknologi Bandung (ITB)',
    faculty: 'Fakultas Matematika & Ilmu Pengetahuan Alam',
    studyProgram: 'Matematika & Aktuaria',
    courseName: 'Kalkulus II (MA1201)',
    semester: 2,
    authorId: 'usr_dosen_2',
    authorName: 'Dr. Indah Tri Murti, M.Si',
    authorRole: 'dosen',
    authorTitle: 'Dosen Matematika ITB • Kurator Soal Ujian',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    isVerified: true,
    isOfficialDosen: true,
    price: 20000,
    rating: 4.9,
    reviewsCount: 112,
    difficulty: 'Sulit',
    pagesCount: 62,
    downloadsCount: 950,
    tags: ['Dosen Resmi', 'Kalkulus ITB', 'Solusi Lengkap', 'UTS & UAS'],
    createdAt: '1 minggu lalu',
    fileSize: '12.1 MB (PDF)',
    previewPages: [
      'BAGIAN I: Teknik Pengintegralan Mahir\n• Substitusi Trigonometri\n• Integral Fungsi Rasional via Pecahan Parsial\n• Integral Tak Wajar (Improper Integral)',
      'BAGIAN II: Deret Tak Hingga\n• Uji Konvergensi (Rasio, Integral, Perbandingan)\n• Jari-jari & Interval Konvergensi Deret Kuasa\n• Ekspansi Deret Taylor seputar x = 0',
      'BAGIAN III: Soal Prediksi UAS 2026\n• Model Persoalan Penerapan Fisika dan Geometri'
    ],
    practiceQuestions: [
      {
        id: 'q_kalkulus_1',
        number: 1,
        topic: 'Teknik Pengintegralan Parsial Tentu',
        difficulty: 'Menengah',
        questionText: 'Tentukan hasil integral tentu berikut:\n∫ (dari 0 sampai 1) x * e^(2x) dx',
        sampleAnswer: 'Hasil akhir adalah: (1/4) * (e^2 + 1) ≈ 2.097',
        keyPoints: [
          'Gunakan rumus parsial: ∫ u dv = u*v - ∫ v du',
          'Misalkan u = x sehingga du = dx',
          'Misalkan dv = e^(2x) dx sehingga v = (1/2) * e^(2x)',
          'Evaluasi batas [0, 1] dengan teliti pada suku -(1/4)e^(2x)'
        ],
        theoryNotes: {
          conceptTitle: 'Catatan Teori: Kaidah Prioritas LIATE & Metode Tabular (DI Method)',
          summaryExplanation: 'Untuk pengintegralan parsial f(x) * g(x), pemilihan u didasarkan pada urutan LIATE (Logarithmic, Inverse trig, Algebraic, Trigonometric, Exponential). Karena x adalah Aljabar dan e^(2x) adalah Eksponensial, x mutlak dipilih sebagai u agar turunannya berakhir di nol.\n\nMetode Tabular D-I juga dapat digunakan jika u merupakan suku banyak berderajat n untuk memotong waktu pengerjaan 50%.',
          formulaOrSnippet: 'Rumus Dasar: ∫ u dv = u*v - ∫ v du\nMetode Tabular D-I:\n  Turunan D (+)       Integral I\n       x       \\ (+)    e^(2x)\n       1       \\ (-)    (1/2)e^(2x)\n       0                (1/4)e^(2x)\n=> Hasil: [ (1/2)x*e^(2x) - (1/4)e^(2x) ] |_0^1 = 1/4(e^2 + 1)',
          examTips: 'Kesalahan paling sering terjadi pada evaluasi batas bawah 0: suku -(1/4)e^0 bernilai -(1/4), jangan diasumsikan bernilai 0!',
          relatedTopics: ['Kalkulus Integral II', 'Substitusi Trigonometri', 'Integral Tak Wajar']
        }
      },
      {
        id: 'q_kalkulus_2',
        number: 2,
        topic: 'Uji Konvergensi Deret Tak Hingga (D\'Alembert Ratio Test)',
        difficulty: 'Sulit',
        questionText: 'Ujilah apakah deret tak hingga berikut konvergen atau divergen:\n∑ (n=1 sampai ∞) [ (2n)! / ( (n!)^2 * 3^n ) ]',
        sampleAnswer: 'Deret DIVERGEN berdasarkan Uji Rasio Mutlak (Limit Ratio Test) karena rasio L = 4/3 > 1.',
        keyPoints: [
          'Hitung a_(n+1) dan tentukan limit rasio |a_(n+1) / a_n| saat n -> ∞',
          'Faktorial (2n+2)! disederhanakan menjadi (2n+2)(2n+1)(2n)!',
          'Suku (n!)^2 saling meniadakan dengan ((n+1)!)^2 menyisakan (n+1)^2',
          'Limit rasio menghasilkan L = 4/3 > 1 => Deret Divergen'
        ],
        theoryNotes: {
          conceptTitle: 'Catatan Teori: Prinsip Uji Rasio D\'Alembert & Pola Faktorial Ganda',
          summaryExplanation: 'Uji Rasio D\'Alembert paling ampuh diaplikasikan pada deret yang memuat suku faktorial n! atau bentuk perpangkatan eksponensial k^n.\n- Jika L < 1: Konvergen mutlak\n- Jika L > 1: Divergen\n- Jika L = 1: Uji tidak memberi kesimpulan (harus beralih ke uji lain seperti Uji Raabe atau Uji Integral)',
          formulaOrSnippet: 'L = lim (n->∞) | a_(n+1) / a_n |\n= lim [ (2n+2)(2n+1) / ((n+1)^2 * 3) ]\n= lim [ (4n^2 + 6n + 2) / (3n^2 + 6n + 3) ] = 4/3 > 1',
          examTips: 'Jika menjumpai faktorial (2n)!, hati-hati saat n diganti (n+1), hasilnya adalah (2(n+1))! = (2n+2)!, BUKAN (2n+1)! yang sering memicu pengurangan nilai.',
          relatedTopics: ['Deret Kuasa & Taylor', 'Radius Konvergensi', 'Limit Asimptotik']
        }
      },
      {
        id: 'q_kalkulus_3',
        number: 3,
        topic: 'Integral Lipat Dua Koordinat Polar',
        difficulty: 'Menengah',
        questionText: 'Hitunglah nilai volume benda pejal di bawah permukaan paraboloida z = 4 - x^2 - y^2 dan di atas bidang xy!',
        sampleAnswer: 'Volume benda pejal adalah: 8π satuan volume (≈ 25.132).',
        keyPoints: [
          'Perpotongan dengan bidang xy (z=0): x^2 + y^2 = 4 (lingkaran r = 2)',
          'Konversi ke polar: x^2 + y^2 = r^2, Jacobian dA = r dr dθ',
          'Batas integral: r dari 0 sampai 2, θ dari 0 sampai 2π',
          'V = ∫ (0..2π) ∫ (0..2) (4 - r^2) * r dr dθ'
        ],
        theoryNotes: {
          conceptTitle: 'Catatan Teori: Transformasi Koordinat Polar & Faktor Jacobian r dr dθ',
          summaryExplanation: 'Dalam integral lipat dua, ketika daerah integrasi berupa lingkaran, sektor lingkaran, atau fungsi memuat suku (x^2 + y^2), beralih ke koordinat polar memudahkan kalkulasi secara signifikan.\n\nJangan lupa menyertakan faktor pengali luas Jacobian r dalam elemen differensial dA = r dr dθ.',
          formulaOrSnippet: 'x = r cos θ, y = r sin θ, x^2 + y^2 = r^2\ndA = r dr dθ\nV = ∫_0^(2π) dθ ∫_0^2 (4r - r^3) dr = 2π * [ 2r^2 - r^4/4 ]_0^2 = 2π * (8 - 4) = 8π',
          examTips: 'Kerap lupa memasukkan "r" di sebelah dr (Jacobian), sehingga hanya mengintegralkan (4 - r^2) dr. Hal tersebut berakibat fatal pada hasil ujian!',
          relatedTopics: ['Integral Lipat Tiga Tabung', 'Aplikasi Fisika Massa & Pusat Gravitasi']
        }
      }
    ]
  },
  {
    id: 'mat_3',
    title: 'Catatan Visual Estetis: Biokimia Kedokteran Blok Metabolisme Karbohidrat',
    description: 'Rangkuman lengkap dengan ilustrasi warna-warni siklus glikolisis, siklus Krebs, fosforilasi oksidatif, regulasi hormon insulin & glukagon, disertai mnemonik memori cepat untuk ujian blok.',
    category: 'Rangkuman Kuliah',
    campus: 'Universitas Indonesia (UI)',
    faculty: 'Fakultas Kedokteran',
    studyProgram: 'Pendidikan Dokter',
    courseName: 'Biokimia Kedokteran',
    semester: 3,
    authorId: 'usr_mhs_2',
    authorName: 'Jessica Aurelia, S.Ked',
    authorRole: 'mahasiswa',
    authorTitle: 'Mahasiswi Berprestasi FK UI • IPK 3.94',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    isVerified: true,
    isOfficialDosen: false,
    price: 15000,
    rating: 4.98,
    reviewsCount: 230,
    difficulty: 'Menengah',
    pagesCount: 45,
    downloadsCount: 1820,
    tags: ['Aesthetic Notes', 'Kedokteran', 'Mnemonik Mudah', 'Diagram Warna'],
    createdAt: '5 hari lalu',
    fileSize: '24.6 MB (PDF HD)',
    previewPages: [
      'HALAMAN 1: Skema Jalur Glikolisis Aerob vs Anaerob\n• 10 Reaksi Enzimatik Kunci\n• Rate-limiting enzyme: Phosphofructokinase-1 (PFK-1)\n• Neraca Energi: 2 ATP + 2 NADH net gain',
      'HALAMAN 2: Siklus Asam Sitrat (Krebs Cycle)\n• Mnemonik: "Citrate Is Krebs Starting Substrate For Making Oxaloacetate"\n• Titik Regulasi Allosterik & Penghambat Enzim'
    ]
  },
  {
    id: 'mat_4',
    title: 'Modul Kuliah Gratis: Pengantar Hukum Bisnis & Kontrak Elektronik',
    description: 'Disediakan gratis oleh Dosen untuk mahasiswa se-Indonesia. Membahas asas hukum perikatan, keabsahan tanda tangan digital, UU ITE, perlindungan data pribadi (UU PDP), dan draf klausul arbitrase.',
    category: 'Slide Dosen Resmi',
    campus: 'Universitas Gadjah Mada (UGM)',
    faculty: 'Fakultas Hukum',
    studyProgram: 'Ilmu Hukum',
    courseName: 'Hukum Bisnis Digital',
    semester: 4,
    authorId: 'usr_dosen_3',
    authorName: 'Prof. Dr. Ariyanto, S.H., M.Hum',
    authorRole: 'dosen',
    authorTitle: 'Guru Besar Hukum Perdata UGM • Kuliah Terbuka',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
    isVerified: true,
    isOfficialDosen: true,
    price: 0, // GRATIS
    rating: 4.88,
    reviewsCount: 89,
    difficulty: 'Mudah',
    pagesCount: 70,
    downloadsCount: 3410,
    tags: ['Gratis', 'Dosen Resmi', 'Hukum Bisnis', 'Open Access'],
    createdAt: '1 minggu lalu',
    fileSize: '9.8 MB (PDF)',
    previewPages: [
      'BAB I: Hubungan Hukum dalam Transaksi Elektronik\n• Syarat Sah Perjanjian Pasal 1320 KUHPerdata\n• Aspek Keabsahan Click-wrap dan Browse-wrap Agreements\n• Yurisdiksi Hukum Lintas Batas',
      'BAB II: Penerapan UU PDP No. 27 Tahun 2022 dalam Perjanjian Komersial'
    ]
  },
  {
    id: 'mat_5',
    title: 'Rangkuman Ujian Manajemen Keuangan: Analisis Rasio & Capital Budgeting',
    description: 'Formula ringkas NPV, IRR, Payback Period, WACC, Capital Asset Pricing Model (CAPM), disertai tabel amortisasi dan contoh analisis laporan keuangan emiten BEI.',
    category: 'Rangkuman Kuliah',
    campus: 'Universitas Diponegoro (UNDIP)',
    faculty: 'Fakultas Ekonomika dan Bisnis',
    studyProgram: 'Manajemen Keuangan',
    courseName: 'Manajemen Keuangan II',
    semester: 5,
    authorId: 'usr_mhs_3',
    authorName: 'Bagas Wicaksono',
    authorRole: 'mahasiswa',
    authorTitle: 'Mahasiswa FEB Undip • Tutor Sebaya FEB',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    isVerified: true,
    isOfficialDosen: false,
    price: 15000,
    rating: 4.85,
    reviewsCount: 74,
    difficulty: 'Menengah',
    pagesCount: 38,
    downloadsCount: 710,
    tags: ['Manajemen', 'Rumus Lengkap', 'Studi Kasus BEI', 'UTS Ready'],
    createdAt: '2 minggu lalu',
    fileSize: '8.4 MB (PDF)',
    previewPages: [
      'FORMULA UTAMA: Penilaian Investasi Proyek\n• Net Present Value (NPV) = CFt / (1+r)^t - C0\n• Internal Rate of Return (IRR) Interpolation Rule\n• Profitability Index & Discounted Payback Period',
      'ANALISIS RISIKO: Pendekatan CAPM dan Beta Saham'
    ]
  },
  {
    id: 'mat_6',
    title: 'Panduan Praktikum: Jaringan Komputer, Subnetting VLSM & Cisco Packet Tracer',
    description: 'Panduan step-by-step konfigurasi Router Cisco, RIP, OSPF, VLAN, Access Control List (ACL), dan studi kasus topologi kampus modular.',
    category: 'Modul Praktikum',
    campus: 'Institut Teknologi Sepuluh Nopember (ITS)',
    faculty: 'Fakultas Teknologi Elektro dan Informatika Cerdas',
    studyProgram: 'Teknik Informatika',
    courseName: 'Jaringan Komputer',
    semester: 4,
    authorId: 'usr_dosen_4',
    authorName: 'Ir. Danang Prasetyo, M.T.',
    authorRole: 'dosen',
    authorTitle: 'Kepala Lab Jaringan ITS • CCNA Certified',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    isVerified: true,
    isOfficialDosen: true,
    price: 25000,
    rating: 4.92,
    reviewsCount: 96,
    difficulty: 'Menengah',
    pagesCount: 92,
    downloadsCount: 1100,
    tags: ['Dosen Resmi', 'Praktikum', 'Cisco Packet Tracer', 'File PKT'],
    createdAt: '4 hari lalu',
    fileSize: '31.2 MB (ZIP+PDF)',
    previewPages: [
      'MODUL 1: Desain Subnetting CIDR & VLSM Praktis\n• Pembagian Blok IP /24 menjadi beberapa Subnet Departmental\n• Perhitungan Network ID, Usable Host, Broadcast ID',
      'MODUL 2: Konfigurasi VLAN & Inter-VLAN Routing (Router-on-a-stick)'
    ]
  },
  {
    id: 'mat_7',
    title: 'Modul Praktikum & Diktat Lengkap: Rekayasa Perangkat Lunak & Sistem Basis Data',
    description: 'Modul ajar kurikulum resmi UPN Veteran Yogyakarta. Mencakup perancangan ERD, Normalisasi 1NF-3NF, Query SQL Kompleks, Desain Arsitektur MVC, dan Studi Kasus Proyek Skala Menengah.',
    category: 'Modul Praktikum',
    campus: 'Universitas Pembangunan Nasional Veteran Yogyakarta (UPN Veteran Yogyakarta)',
    faculty: 'Fakultas Teknik Industri',
    studyProgram: 'Teknik Informatika',
    courseName: 'Rekayasa Perangkat Lunak',
    semester: 4,
    authorId: 'usr_dosen_5',
    authorName: 'Ir. Hendra Saputra, M.T.',
    authorRole: 'dosen',
    authorTitle: 'Dosen FTI UPN Veteran Yogyakarta • NIDN Terverifikasi',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    isVerified: true,
    isOfficialDosen: true,
    price: 20000,
    rating: 4.96,
    reviewsCount: 88,
    difficulty: 'Menengah',
    pagesCount: 76,
    downloadsCount: 840,
    tags: ['UPN Veteran', 'Dosen Resmi', 'Basis Data', 'RPL'],
    createdAt: '1 hari lalu',
    fileSize: '16.5 MB (PDF)',
    previewPages: [
      'BAB 1: Pengantar Rekayasa Kebutuhan Perangkat Lunak\n• SDLC: Waterfall vs Agile Scrum Model\n• Identifikasi Functional & Non-Functional Requirements\n• Use Case Diagram & Activity Modeling Terstruktur',
      'BAB 2: Pemodelan Basis Data Relasional\n• Entity Relationship Diagram (ERD)\n• Normalisasi Tabel Relasional (1NF hingga BCNF)\n• Optimasi Indeks dan Stored Procedure pada MySQL'
    ]
  }
];
