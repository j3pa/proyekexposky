'use client';

import React, { useState } from 'react';
import { Material, Role, MaterialCategory, DifficultyLevel, UserProfile } from '../types';
import { 
  IconClose, 
  IconBadgeCheck, 
  IconUpload, 
  IconShield,
  IconCheck
} from './Icons';
import { UNIVERSITIES, CATEGORIES } from '../data/mockData';

interface UploadMaterialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newMaterial: Material) => void;
  currentUser: UserProfile;
}

export function UploadMaterialModal({
  isOpen,
  onClose,
  onSubmit,
  currentUser,
}: UploadMaterialModalProps) {
  const isDosen = currentUser.role === 'dosen';

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<MaterialCategory>(
    isDosen ? 'Slide Dosen Resmi' : 'Rangkuman Kuliah'
  );
  const [campus, setCampus] = useState(currentUser.campus);
  const [faculty, setFaculty] = useState(currentUser.studyProgram || 'Fakultas Ilmu Komputer');
  const [studyProgram, setStudyProgram] = useState('Teknik Informatika & Sains Data');
  const [courseName, setCourseName] = useState('');
  const [semester, setSemester] = useState<number>(3);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Menengah');
  
  // Pricing: Free vs Paid
  const [pricingType, setPricingType] = useState<'gratis' | 'berbayar'>(
    isDosen ? 'berbayar' : 'berbayar'
  );
  const [price, setPrice] = useState<number>(20000);
  const [pagesCount, setPagesCount] = useState<number>(35);
  const [sampleContent, setSampleContent] = useState('');
  const [fileName, setFileName] = useState('Modul_Kuliah_Lengkap.pdf');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !courseName.trim()) return;

    const newMat: Material = {
      id: `mat_${Date.now()}`,
      title: title.trim(),
      description: description.trim() || `Materi ${category} resmi untuk mata kuliah ${courseName} di ${campus}. Disusun rapi untuk persiapan ujian dan pemahaman konsep.`,
      category,
      campus,
      faculty,
      studyProgram,
      courseName: courseName.trim(),
      semester,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorRole: currentUser.role,
      authorTitle: isDosen 
        ? `${currentUser.name} • Dosen Terverifikasi (${currentUser.nidnOrNim})`
        : `Mahasiswa • ${currentUser.campus}`,
      authorAvatar: currentUser.avatar,
      isVerified: true,
      isOfficialDosen: isDosen,
      price: pricingType === 'gratis' ? 0 : Number(price) || 15000,
      rating: 5.0,
      reviewsCount: 1,
      difficulty,
      pagesCount: Number(pagesCount) || 20,
      downloadsCount: 0,
      previewPages: [
        sampleContent.trim() || `RINGKASAN MATERI ${courseName.toUpperCase()}\n\n1. Pendahuluan Konsep Pokok\n2. Teorema dan Rumus Kunci\n3. Contoh Soal Latihan dan Pembahasan Langkah demi Langkah\n4. Kisi-kisi Evaluasi Ujian`,
        `BAB 2: PENDALAMAN TOPIK & STUDI KASUS\n• Definisi Formal dan Batasan Teori\n• Analisis Permasalahan dan Solusi Optimasi\n• Catatan Kaki dan Tips Menghadapi Ujian Semester`
      ],
      tags: isDosen ? ['Materi Dosen', 'Terverifikasi NIDN', courseName] : ['Catatan Mahasiswa', courseName],
      createdAt: 'Baru saja',
      fileSize: `${(Math.random() * 15 + 4).toFixed(1)} MB (PDF)`,
    };

    setIsSuccess(true);
    setTimeout(() => {
      onSubmit(newMat);
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn">
      <div 
        className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-[#D5E6DC]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-[#D5E6DC] bg-white sticky top-0 z-10">
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#F4FBF7] text-[#5B6B62] transition-colors"
          >
            <IconClose className="w-5 h-5" />
          </button>
          
          <div className="text-center">
            <h3 className="text-xs font-bold text-[#14231B]">
              {isDosen ? 'Unggah / Jual Materi Dosen' : 'Jual / Bagikan Catatan Kuliah'}
            </h3>
            <p className="text-[10px] text-[#059669] font-bold">
              {isDosen ? 'Akun Dosen (Bisa Memberi atau Menjual Materi)' : 'Akun Mahasiswa (Monetisasi Catatan)'}
            </p>
          </div>

          <div className="w-8"></div>
        </div>

        {/* Form Body */}
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-[#D1FAE5] text-[#16A34A] flex items-center justify-center animate-bounce">
              <IconCheck className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-[#14231B]">Materi Berhasil Diterbitkan!</h3>
            <p className="text-xs text-[#5B6B62] max-w-xs">
              Materi Anda telah masuk ke kurasi CatatKampus dan siap diakses / dibeli oleh mahasiswa se-Indonesia.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {/* Lecturer Verification Notice */}
            {isDosen ? (
              <div className="p-3 bg-[#D1FAE5] rounded-2xl border border-[#059669]/30 flex items-start gap-2.5">
                <div className="p-1.5 bg-[#064E3B] text-white rounded-lg shrink-0 mt-0.5">
                  <IconBadgeCheck className="w-4 h-4 text-[#F59E0B]" />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-[#064E3B]">Mode Pengajar Resmi Dosen</p>
                  <p className="text-[11px] text-[#14231B] leading-tight mt-0.5">
                    Materi Anda otomatis berlabel <strong className="text-[#064E3B]">Dosen Resmi</strong> dengan NIDN terverifikasi. Anda dapat membagikannya <strong>Gratis</strong> untuk mahasiswa atau <strong>Menjualnya</strong> untuk mendapatkan royalti langsung.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-[#F4FBF7] rounded-2xl border border-[#D5E6DC] flex items-start gap-2.5 text-xs text-[#14231B]">
                <IconShield className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#064E3B]">Kurasi Mahasiswa Berprestasi:</span> Dapatkan penghasilan setiap kali catatan kuliah Anda dibeli oleh mahasiswa lain.
                </div>
              </div>
            )}

            {/* Opsi Akses: Gratis vs Menjual Berbayar */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#14231B] block">
                Pilih Tipe Publikasi Materi:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPricingType('gratis')}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    pricingType === 'gratis'
                      ? 'border-[#059669] bg-[#D1FAE5] ring-2 ring-[#059669]/20'
                      : 'border-[#D5E6DC] bg-[#F4FBF7] text-[#5B6B62]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#064E3B]">Materi Gratis</span>
                    {pricingType === 'gratis' && <IconCheck className="w-3.5 h-3.5 text-[#16A34A]" />}
                  </div>
                  <p className="text-[10px] text-[#5B6B62] mt-0.5 leading-tight">
                    {isDosen ? 'Berbagi bahan ajar kurikulum bebas untuk semua mahasiswa' : 'Berbagi catatan secara cuma-cuma'}
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPricingType('berbayar')}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    pricingType === 'berbayar'
                      ? 'border-[#059669] bg-[#D1FAE5] ring-2 ring-[#059669]/20'
                      : 'border-[#D5E6DC] bg-[#F4FBF7] text-[#5B6B62]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#064E3B]">Jual Materi (Berbayar)</span>
                    {pricingType === 'berbayar' && <IconCheck className="w-3.5 h-3.5 text-[#059669]" />}
                  </div>
                  <p className="text-[10px] text-[#5B6B62] mt-0.5 leading-tight">
                    {isDosen ? 'Dapatkan 100% royalti penjualan ke saldo Anda' : 'Jual catatan eksklusif Anda'}
                  </p>
                </button>
              </div>

              {/* Set Price if Berbayar */}
              {pricingType === 'berbayar' && (
                <div className="p-3 bg-[#FEF3C7]/60 rounded-2xl border border-[#F59E0B]/30 mt-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#92400E]">Tetapkan Harga Materi:</label>
                    <span className="text-xs font-black text-[#B45309]">
                      Rp {Number(price).toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {[10000, 15000, 20000, 25000, 35000, 50000].map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPrice(p)}
                        className={`px-2 py-1 text-[10px] font-bold rounded-lg transition-all ${
                          price === p
                            ? 'bg-[#059669] text-white shadow-xs'
                            : 'bg-white border border-[#D5E6DC] text-[#5B6B62] hover:bg-[#F4FBF7]'
                        }`}
                      >
                        {p / 1000}k
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Judul Materi */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#14231B]">
                Judul Materi / Rangkuman <span className="text-[#DC2626]">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={isDosen ? 'Contoh: Slide Resmi & Bank Soal Kalkulus II Lengkap' : 'Contoh: Catatan Aesthetic Algoritma & Soal Latihan'}
                className="w-full text-xs p-2.5 rounded-xl border border-[#D5E6DC] focus:outline-hidden focus:border-[#059669] text-[#14231B]"
                required
              />
            </div>

            {/* Mata Kuliah & Kategori */}
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#14231B]">
                  Mata Kuliah <span className="text-[#DC2626]">*</span>
                </label>
                <input
                  type="text"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  placeholder="e.g. Struktur Data"
                  className="w-full text-xs p-2.5 rounded-xl border border-[#D5E6DC] focus:outline-hidden focus:border-[#059669] text-[#14231B]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#14231B]">Kategori</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as MaterialCategory)}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#D5E6DC] bg-white focus:outline-hidden focus:border-[#059669] text-[#14231B]"
                >
                  {CATEGORIES.filter(c => c !== 'Semua Kategori').map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Kampus & Semester */}
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#14231B]">Kampus</label>
                <select
                  value={campus}
                  onChange={(e) => setCampus(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#D5E6DC] bg-white focus:outline-hidden focus:border-[#059669] text-[#14231B]"
                >
                  {UNIVERSITIES.filter(u => u !== 'Semua Kampus').map((u) => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#14231B]">Semester</label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(Number(e.target.value))}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#D5E6DC] bg-white focus:outline-hidden focus:border-[#059669] text-[#14231B]"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                    <option key={s} value={s}>Semester {s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tingkat Kesulitan */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#14231B]">Tingkat Kesulitan Materi</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Mudah', 'Menengah', 'Sulit'] as DifficultyLevel[]).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setDifficulty(level)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                      difficulty === level
                        ? 'border-[#059669] bg-[#D1FAE5] text-[#064E3B]'
                        : 'border-[#D5E6DC] text-[#5B6B62] hover:bg-[#F4FBF7]'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Deskripsi */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#14231B]">Deskripsi Lengkap</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Jelaskan silabus, topik bahasan, atau keunggulan materi ini..."
                className="w-full text-xs p-2.5 rounded-xl border border-[#D5E6DC] focus:outline-hidden focus:border-[#059669] h-16 text-[#14231B]"
              />
            </div>

            {/* File Upload Simulation */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#14231B]">Lampirkan Berkas Dokumen (PDF)</label>
              <div className="border-2 border-dashed border-[#059669]/40 rounded-2xl p-4 bg-[#F4FBF7] text-center hover:bg-[#D1FAE5]/40 transition-colors cursor-pointer">
                <IconUpload className="w-8 h-8 text-[#059669] mx-auto mb-1" />
                <span className="text-xs font-bold text-[#064E3B] block">
                  {fileName}
                </span>
                <span className="text-[10px] text-[#5B6B62] mt-0.5 block">
                  Format PDF, ZIP, PPTX • Maksimum 50 MB
                </span>
              </div>
            </div>

            {/* Preview Sample Text */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#14231B]">Teks Pratinjau Sample (Terbuka untuk calon pembeli)</label>
              <textarea
                value={sampleContent}
                onChange={(e) => setSampleContent(e.target.value)}
                placeholder="Kutipan halaman 1-2 agar mahasiswa dapat melihat kualitas sebelum membeli..."
                className="w-full text-xs font-mono p-2.5 rounded-xl border border-[#D5E6DC] focus:outline-hidden focus:border-[#059669] h-16 text-[#14231B]"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-2xl bg-[#059669] hover:bg-[#064E3B] text-white font-bold text-xs transition-all shadow-md shadow-[#059669]/30 active:scale-[0.99]"
              >
                {pricingType === 'gratis'
                  ? 'Terbitkan Materi Gratis Sekarang'
                  : `Terbitkan & Jual Materi (Rp ${Number(price).toLocaleString('id-ID')})`}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
