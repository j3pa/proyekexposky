export type Role = 'mahasiswa' | 'dosen';

export type DifficultyLevel = 'Mudah' | 'Menengah' | 'Sulit';

export type MaterialCategory = 
  | 'Rangkuman Kuliah'
  | 'Latihan Soal & UTS/UAS'
  | 'Slide Dosen Resmi'
  | 'Modul Praktikum'
  | 'Panduan Skripsi';

export interface Review {
  id: string;
  userName: string;
  userRole: Role;
  campus: string;
  rating: number;
  comment: string;
  date: string;
  difficultyVote: DifficultyLevel;
}

export interface Material {
  id: string;
  title: string;
  description: string;
  category: MaterialCategory;
  campus: string;
  faculty: string;
  studyProgram: string;
  courseName: string; // Mata Kuliah
  semester: number;
  authorId: string;
  authorName: string;
  authorRole: Role;
  authorTitle?: string; // e.g. "Dosen Fasilkom UI (NIDN Terverifikasi)"
  authorAvatar: string;
  isVerified: boolean; // Terverifikasi kurasi / NIDN Dosen
  isOfficialDosen: boolean; // Materi resmi dosen
  price: number; // 0 = Gratis, >0 = Berbayar (e.g. 15000, 25000)
  rating: number;
  reviewsCount: number;
  difficulty: DifficultyLevel;
  pagesCount: number;
  downloadsCount: number;
  previewPages: string[]; // text or sample preview content
  tags: string[];
  createdAt: string;
  fileSize: string;
}

export interface UserProfile {
  id: string;
  name: string;
  role: Role;
  email: string;
  campus: string;
  studyProgram: string;
  nidnOrNim: string;
  avatar: string;
  isVerified: boolean;
  walletBalance: number; // Saldo pendapatan dari jualan materi
  materialsSold: number;
  materialsShared: number;
}
