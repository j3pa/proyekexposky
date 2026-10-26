'use client';

import React, { useState } from 'react';
import { Material, Review, Role } from '../types';
import { 
  IconClose, 
  IconStar, 
  IconBadgeCheck, 
  IconBookmark, 
  IconDownload, 
  IconLock, 
  IconLockOpen,
  IconShield,
  IconShare,
  IconCheck
} from './Icons';

interface MaterialDetailModalProps {
  material: Material | null;
  onClose: () => void;
  isBookmarked: boolean;
  isPurchased: boolean;
  onToggleBookmark: (materialId: string, e: React.MouseEvent) => void;
  onBuyClick: (material: Material) => void;
  onDownloadClick: (material: Material) => void;
  reviews: Review[];
  onAddReview: (materialId: string, rating: number, comment: string, difficulty: 'Mudah' | 'Menengah' | 'Sulit') => void;
  userRole: Role;
}

export function MaterialDetailModal({
  material,
  onClose,
  isBookmarked,
  isPurchased,
  onToggleBookmark,
  onBuyClick,
  onDownloadClick,
  reviews,
  onAddReview,
  userRole,
}: MaterialDetailModalProps) {
  const [activePreviewPage, setActivePreviewPage] = useState<number>(0);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newDifficulty, setNewDifficulty] = useState<'Mudah' | 'Menengah' | 'Sulit'>('Menengah');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  if (!material) return null;

  const isFree = material.price === 0;
  const canAccessFull = isFree || isPurchased;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddReview(material.id, newRating, newComment.trim(), newDifficulty);
    setNewComment('');
    setShowReviewForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn">
      <div 
        className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-[#D5E6DC]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#D5E6DC] bg-white sticky top-0 z-10">
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#F4FBF7] text-[#5B6B62] transition-colors"
          >
            <IconClose className="w-5 h-5" />
          </button>
          
          <div className="text-center">
            <span className="text-xs font-bold text-[#14231B]">Detail Materi Belajar</span>
            <div className="flex items-center justify-center gap-1 text-[10px] text-[#16A34A] font-bold">
              <IconBadgeCheck className="w-3.5 h-3.5" />
              <span>Sistem Kurasi Terverifikasi</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleShare}
              className="p-1.5 rounded-full hover:bg-[#F4FBF7] text-[#5B6B62] transition-colors relative"
              title="Bagikan"
            >
              <IconShare className="w-4 h-4" />
              {copySuccess && (
                <span className="absolute -top-7 right-0 text-[10px] bg-[#064E3B] text-white px-2 py-0.5 rounded shadow-sm whitespace-nowrap">
                  Link disalin!
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={(e) => onToggleBookmark(material.id, e)}
              className={`p-1.5 rounded-full transition-colors ${
                isBookmarked ? 'text-[#059669] bg-[#D1FAE5]' : 'text-[#5B6B62] hover:bg-[#F4FBF7]'
              }`}
            >
              <IconBookmark className="w-4 h-4" filled={isBookmarked} />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {/* Author Header */}
          <div className="flex items-center justify-between p-3 bg-[#F4FBF7] rounded-2xl border border-[#D5E6DC]">
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={material.authorAvatar}
                alt={material.authorName}
                className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-xs"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-[#14231B]">{material.authorName}</h4>
                  {material.isOfficialDosen && (
                    <IconBadgeCheck className="w-4 h-4 text-[#16A34A]" />
                  )}
                </div>
                <p className="text-[11px] text-[#5B6B62] font-medium">
                  {material.authorTitle || `${material.authorRole === 'dosen' ? 'Dosen' : 'Mahasiswa'} • ${material.campus}`}
                </p>
                <div className="flex items-center gap-2 mt-0.5 text-[10px] text-[#5B6B62]">
                  <span className="font-semibold text-[#064E3B]">
                    {material.authorRole === 'dosen' ? 'Dosen Terverifikasi' : 'Penulis Mahasiswa Terkurasi'}
                  </span>
                  <span>•</span>
                  <span>{material.downloadsCount}x Diunduh</span>
                </div>
              </div>
            </div>
          </div>

          {/* Title & Metadata */}
          <div>
            <div className="flex flex-wrap items-center gap-1.5 mb-2">
              <span className="text-[10px] font-bold text-[#064E3B] bg-[#D1FAE5] px-2 py-0.5 rounded-md border border-[#059669]/30">
                {material.category}
              </span>
              <span className="text-[10px] font-medium text-[#5B6B62] bg-[#F4FBF7] px-2 py-0.5 rounded-md border border-[#D5E6DC]">
                Semester {material.semester}
              </span>
              <span className="text-[10px] font-medium text-[#5B6B62] bg-[#F4FBF7] px-2 py-0.5 rounded-md border border-[#D5E6DC]">
                {material.fileSize}
              </span>
            </div>
            
            <h2 className="text-base font-extrabold text-[#14231B] leading-snug">
              {material.title}
            </h2>

            <div className="mt-2 text-xs text-[#5B6B62] font-medium">
              <p className="flex items-center gap-1.5 text-[#14231B]">
                <span className="text-[#059669] font-bold">Mata Kuliah:</span> {material.courseName}
              </p>
              <p className="text-[11px] text-[#5B6B62] mt-0.5">
                {material.faculty} • {material.studyProgram} ({material.campus})
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="p-3 bg-[#F4FBF7] rounded-xl border border-[#D5E6DC] text-xs text-[#14231B] leading-relaxed">
            <h5 className="font-bold text-[#064E3B] mb-1">Deskripsi Materi</h5>
            <p className="text-[#5B6B62]">{material.description}</p>
          </div>

          {/* Document Preview Box */}
          <div className="border border-[#D5E6DC] rounded-2xl overflow-hidden shadow-2xs">
            {/* Document Bar */}
            <div className="bg-[#064E3B] text-white px-3 py-2 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[11px] text-[#D1FAE5]">Pratinjau Dokumen (Sample)</span>
                <span className="bg-[#059669] text-[10px] px-1.5 py-0.5 rounded font-semibold">
                  Hal. {activePreviewPage + 1} dari {material.pagesCount}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[11px]">
                {canAccessFull ? (
                  <span className="text-[#D1FAE5] font-bold flex items-center gap-1">
                    <IconLockOpen className="w-3 h-3 text-[#16A34A]" /> Akses Penuh
                  </span>
                ) : (
                  <span className="text-[#FEF3C7] font-bold flex items-center gap-1">
                    <IconLock className="w-3 h-3 text-[#F59E0B]" /> Sample Terbatas
                  </span>
                )}
              </div>
            </div>

            {/* Document Content Page */}
            <div className="p-4 bg-white font-serif min-h-[170px] relative">
              {activePreviewPage < material.previewPages.length ? (
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-[#064E3B] border-b border-[#D5E6DC] pb-1.5">
                    CATATKAMPUS CURATED NOTE #{material.id} — {material.courseName}
                  </div>
                  <pre className="text-xs font-mono text-[#14231B] whitespace-pre-wrap leading-relaxed">
                    {material.previewPages[activePreviewPage]}
                  </pre>
                </div>
              ) : (
                /* Locked page preview */
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <div className="w-10 h-10 rounded-full bg-[#FEF3C7] border border-[#F59E0B]/30 flex items-center justify-center text-[#B45309] mb-2">
                    <IconLock className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold text-[#14231B]">
                    Halaman {activePreviewPage + 1} - {material.pagesCount} Terkunci
                  </h4>
                  <p className="text-[11px] text-[#5B6B62] max-w-xs mt-1">
                    {canAccessFull
                      ? 'Silakan klik Unduh Berkas di bawah untuk membaca seluruh dokumen PDF.'
                      : 'Beli materi ini untuk membuka seluruh halaman, file PDF resolusi tinggi, dan pembahasan lengkap.'}
                  </p>
                </div>
              )}
            </div>

            {/* Page Selector Tabs */}
            <div className="bg-[#F4FBF7] px-3 py-2 flex items-center justify-between border-t border-[#D5E6DC]">
              <div className="flex items-center gap-1.5">
                {material.previewPages.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActivePreviewPage(idx)}
                    className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                      activePreviewPage === idx
                        ? 'bg-[#059669] text-white'
                        : 'bg-white text-[#5B6B62] border border-[#D5E6DC]'
                    }`}
                  >
                    Hal {idx + 1}
                  </button>
                ))}
                {!canAccessFull && (
                  <button
                    type="button"
                    onClick={() => setActivePreviewPage(material.previewPages.length)}
                    className={`px-2 py-0.5 text-[10px] font-bold rounded flex items-center gap-1 ${
                      activePreviewPage === material.previewPages.length
                        ? 'bg-[#064E3B] text-white'
                        : 'bg-white text-[#5B6B62] border border-[#D5E6DC]'
                    }`}
                  >
                    <IconLock className="w-2.5 h-2.5" /> Hal {material.previewPages.length + 1}+
                  </button>
                )}
              </div>
              <span className="text-[10px] text-[#5B6B62] font-mono">
                {material.pagesCount} Halaman Total
              </span>
            </div>
          </div>

          {/* Difficulty & Quality Feedback */}
          <div className="p-3.5 bg-[#F4FBF7] rounded-2xl border border-[#D5E6DC]">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-[#14231B]">Tingkat Kesulitan & Kualitas</h4>
              <span className="text-[11px] font-bold text-[#B45309] flex items-center gap-1">
                <IconStar className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                {material.rating.toFixed(1)} / 5.0 ({material.reviewsCount} review)
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
              <div className={`p-2 rounded-xl border ${material.difficulty === 'Mudah' ? 'bg-[#D1FAE5] border-[#059669] font-bold text-[#064E3B]' : 'bg-white border-[#D5E6DC] text-[#5B6B62]'}`}>
                <div>Mudah</div>
                <div className="text-[9px] text-[#5B6B62] mt-0.5">Konsep Dasar</div>
              </div>
              <div className={`p-2 rounded-xl border ${material.difficulty === 'Menengah' ? 'bg-[#FEF3C7] border-[#F59E0B] font-bold text-[#92400E]' : 'bg-white border-[#D5E6DC] text-[#5B6B62]'}`}>
                <div>Menengah</div>
                <div className="text-[9px] text-[#5B6B62] mt-0.5">Ujian Kampus</div>
              </div>
              <div className={`p-2 rounded-xl border ${material.difficulty === 'Sulit' ? 'bg-[#FEE2E2] border-[#DC2626] font-bold text-[#991B1B]' : 'bg-white border-[#D5E6DC] text-[#5B6B62]'}`}>
                <div>Sulit</div>
                <div className="text-[9px] text-[#5B6B62] mt-0.5">Komprehensif</div>
              </div>
            </div>
          </div>

          {/* Student Reviews & Comments */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-[#14231B]">Ulasan Mahasiswa ({reviews.length})</h4>
              <button
                type="button"
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="text-xs text-[#059669] font-bold hover:underline"
              >
                {showReviewForm ? 'Tutup Form' : '+ Tulis Ulasan'}
              </button>
            </div>

            {/* Review Form */}
            {showReviewForm && (
              <form onSubmit={handleReviewSubmit} className="p-3 bg-[#F4FBF7] rounded-2xl border border-[#D5E6DC] space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#14231B]">Rating Bintang:</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        className={`p-1 ${star <= newRating ? 'text-[#F59E0B]' : 'text-[#D5E6DC]'}`}
                      >
                        <IconStar className="w-5 h-5 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#14231B]">Tingkat Kesulitan:</span>
                  <select
                    value={newDifficulty}
                    onChange={(e) => setNewDifficulty(e.target.value as any)}
                    className="text-xs bg-white border border-[#D5E6DC] rounded-lg px-2 py-1 text-[#14231B]"
                  >
                    <option value="Mudah">Mudah</option>
                    <option value="Menengah">Menengah</option>
                    <option value="Sulit">Sulit</option>
                  </select>
                </div>

                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Tulis ulasan Anda tentang kualitas materi atau penjelasan ini..."
                  className="w-full text-xs p-2.5 rounded-xl border border-[#D5E6DC] bg-white focus:outline-hidden focus:border-[#059669] h-20 text-[#14231B]"
                  required
                />

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="px-3 py-1.5 text-xs text-[#5B6B62] rounded-lg hover:bg-slate-200"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-bold text-white bg-[#059669] hover:bg-[#064E3B] rounded-lg shadow-xs transition-colors"
                  >
                    Kirim Ulasan
                  </button>
                </div>
              </form>
            )}

            {/* Reviews List */}
            <div className="space-y-2.5">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-3 bg-white rounded-xl border border-[#D5E6DC] shadow-2xs space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-[#14231B]">
                      <span>{rev.userName}</span>
                      <span className="text-[10px] font-medium text-[#5B6B62]">({rev.campus})</span>
                    </div>
                    <div className="flex items-center gap-0.5 text-[#F59E0B]">
                      <IconStar className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />
                      <span className="text-[10px] font-bold text-[#14231B]">{rev.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#5B6B62]">{rev.comment}</p>
                  <div className="flex items-center justify-between text-[10px] text-[#5B6B62] pt-1">
                    <span>Vote kesulitan: <strong className="text-[#064E3B]">{rev.difficultyVote}</strong></span>
                    <span>{rev.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="p-4 bg-white border-t border-[#D5E6DC] flex items-center justify-between gap-3 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
          <div>
            <span className="text-[10px] text-[#5B6B62] uppercase tracking-wider font-bold block">
              {canAccessFull ? 'Status Akses' : 'Harga Materi'}
            </span>
            <div className="text-base font-extrabold">
              {canAccessFull ? (
                <span className="text-[#16A34A] flex items-center gap-1">
                  <IconCheck className="w-4 h-4" /> Siap Unduh
                </span>
              ) : isFree ? (
                <span className="text-[#064E3B] font-extrabold">GRATIS</span>
              ) : (
                <span className="text-[#B45309] font-black">Rp {material.price.toLocaleString('id-ID')}</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {canAccessFull ? (
              <button
                type="button"
                onClick={() => onDownloadClick(material)}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#059669] hover:bg-[#064E3B] text-white font-bold text-xs transition-all shadow-md shadow-[#059669]/30 active:scale-95"
              >
                <IconDownload className="w-4 h-4" />
                <span>Unduh Berkas ({material.fileSize})</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onBuyClick(material)}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#059669] hover:bg-[#064E3B] text-white font-bold text-xs transition-all shadow-md shadow-[#059669]/30 active:scale-95"
              >
                <IconLockOpen className="w-4 h-4" />
                <span>Beli & Akses Sekarang</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
