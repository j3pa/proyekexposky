'use client';

import React, { useState } from 'react';
import { Material, UserProfile } from '../types';
import { 
  IconWallet, 
  IconBadgeCheck, 
  IconTrendingUp, 
  IconStar, 
  IconUpload, 
  IconCheck, 
  IconLockOpen,
  IconLock,
  IconClose
} from './Icons';

interface LecturerDashboardProps {
  currentUser: UserProfile;
  materials: Material[];
  onOpenUpload: () => void;
  onSelectMaterial: (material: Material) => void;
  onPayout: (amount: number) => void;
}

export function LecturerDashboard({
  currentUser,
  materials,
  onOpenUpload,
  onSelectMaterial,
  onPayout,
}: LecturerDashboardProps) {
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [payoutBank, setPayoutBank] = useState('Bank Mandiri');
  const [accountNumber, setAccountNumber] = useState('137-00-1928374-1');
  const [accountName, setAccountName] = useState(currentUser.name);
  const [payoutSuccess, setPayoutSuccess] = useState(false);

  // Filter materials authored by this lecturer
  const myMaterials = materials.filter(m => m.authorId === currentUser.id || m.isOfficialDosen);

  const totalEarnings = currentUser.walletBalance;
  const totalDownloads = myMaterials.reduce((acc, m) => acc + m.downloadsCount, 0);

  const handleExecutePayout = (e: React.FormEvent) => {
    e.preventDefault();
    setPayoutSuccess(true);
    setTimeout(() => {
      onPayout(totalEarnings);
      setPayoutSuccess(false);
      setShowPayoutModal(false);
    }, 1200);
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Lecturer Profile Hero Card */}
      <div className="bg-gradient-to-br from-[#064E3B] via-[#059669] to-[#0D9488] rounded-3xl p-5 text-white shadow-xl relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-[#D1FAE5] shadow-md"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-white">{currentUser.name}</h3>
                <IconBadgeCheck className="w-4 h-4 text-[#F59E0B]" />
              </div>
              <p className="text-xs text-[#D1FAE5] mt-0.5">{currentUser.studyProgram}</p>
              <div className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold bg-[#064E3B]/80 text-[#D1FAE5] px-2 py-0.5 rounded-md border border-[#D1FAE5]/30">
                <span>{currentUser.nidnOrNim}</span>
                <span>• Kurator Terverifikasi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Wallet Balance & Payout */}
        <div className="mt-5 p-4 bg-white/15 backdrop-blur-md rounded-2xl border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#D1FAE5] font-semibold flex items-center gap-1.5">
              <IconWallet className="w-4 h-4 text-[#F59E0B]" />
              Total Saldo Penjualan Materi Dosen
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#D1FAE5] bg-[#064E3B]/60 px-2 py-0.5 rounded-full border border-[#D1FAE5]/30">
              Aktif
            </span>
          </div>

          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-black tracking-tight text-white">
              Rp {totalEarnings.toLocaleString('id-ID')}
            </div>
            <button
              type="button"
              onClick={() => setShowPayoutModal(true)}
              className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#D1FAE5] text-[#064E3B] font-bold text-xs shadow-md shadow-black/10 transition-all active:scale-95"
            >
              Tarik Saldo
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-2 mt-3 pt-2 text-center text-xs">
          <div className="p-2 bg-white/10 rounded-xl border border-white/10">
            <span className="text-[10px] text-[#D1FAE5] block">Materi Terjual</span>
            <span className="text-sm font-black text-white">{currentUser.materialsSold}x</span>
          </div>
          <div className="p-2 bg-white/10 rounded-xl border border-white/10">
            <span className="text-[10px] text-[#D1FAE5] block">Total Unduhan</span>
            <span className="text-sm font-black text-white">{totalDownloads}</span>
          </div>
          <div className="p-2 bg-white/10 rounded-xl border border-white/10">
            <span className="text-[10px] text-[#D1FAE5] block">Rating Pengajar</span>
            <span className="text-sm font-black text-[#FEF3C7] flex items-center justify-center gap-0.5">
              <IconStar className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" /> 4.95
            </span>
          </div>
        </div>
      </div>

      {/* Action Banner to Publish Material */}
      <div className="p-4 bg-gradient-to-r from-[#059669] to-[#064E3B] rounded-3xl text-white shadow-md flex items-center justify-between gap-3">
        <div>
          <h4 className="text-xs font-bold">Unggah Materi Dosen Baru</h4>
          <p className="text-[11px] text-[#D1FAE5] mt-0.5">
            Bisa dibagikan Gratis atau Dijual untuk royalti Anda.
          </p>
        </div>
        <button
          type="button"
          onClick={onOpenUpload}
          className="px-3.5 py-2 rounded-xl bg-white text-[#064E3B] font-bold text-xs hover:bg-[#D1FAE5] shadow-xs shrink-0 flex items-center gap-1 active:scale-95 transition-all"
        >
          <IconUpload className="w-3.5 h-3.5" />
          <span>Upload Materi</span>
        </button>
      </div>

      {/* Materials List Managed by Lecturer */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h4 className="text-xs font-bold text-[#14231B]">
            Daftar Materi Dosen ({myMaterials.length})
          </h4>
          <span className="text-[11px] text-[#5B6B62]">
            Status: Publik
          </span>
        </div>

        <div className="space-y-2.5">
          {myMaterials.map((mat) => {
            const isFree = mat.price === 0;
            return (
              <div
                key={mat.id}
                onClick={() => onSelectMaterial(mat)}
                className="p-3 bg-white rounded-2xl border border-[#D5E6DC] shadow-xs hover:border-[#059669] transition-all cursor-pointer flex gap-3 items-center justify-between"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-10 h-12 rounded-xl bg-[#D1FAE5] border border-[#059669]/30 flex items-center justify-center font-bold text-[11px] text-[#064E3B] shrink-0">
                    PDF
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] font-bold text-[#059669] uppercase">
                      {mat.category}
                    </span>
                    <h5 className="text-xs font-bold text-[#14231B] truncate">
                      {mat.title}
                    </h5>
                    <div className="flex items-center gap-2 text-[10px] text-[#5B6B62] mt-0.5">
                      <span>{mat.downloadsCount} diunduh</span>
                      <span>•</span>
                      <span>{mat.pagesCount} hal</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  {isFree ? (
                    <span className="text-[11px] font-bold text-[#064E3B] bg-[#D1FAE5] px-2 py-0.5 rounded-full border border-[#059669]/30">
                      Gratis
                    </span>
                  ) : (
                    <span className="text-xs font-black text-[#B45309] bg-[#FEF3C7] px-2 py-0.5 rounded-full border border-[#F59E0B]/30">
                      Rp {mat.price.toLocaleString('id-ID')}
                    </span>
                  )}
                  <span className="text-[9px] text-[#16A34A] font-bold block mt-1">Terverifikasi ✓</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Payout Modal */}
      {showPayoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-[#D5E6DC] space-y-4">
            <div className="flex items-center justify-between border-b border-[#D5E6DC] pb-2">
              <h4 className="text-xs font-bold text-[#14231B]">Tarik Saldo Royalti Materi</h4>
              <button
                type="button"
                onClick={() => setShowPayoutModal(false)}
                className="p-1 rounded-full text-[#5B6B62] hover:text-[#14231B]"
              >
                <IconClose className="w-4 h-4" />
              </button>
            </div>

            {payoutSuccess ? (
              <div className="py-8 text-center space-y-2">
                <div className="w-12 h-12 bg-[#D1FAE5] text-[#16A34A] rounded-full flex items-center justify-center mx-auto">
                  <IconCheck className="w-6 h-6" />
                </div>
                <h5 className="text-sm font-bold text-[#14231B]">Permintaan Penarikan Berhasil!</h5>
                <p className="text-xs text-[#5B6B62]">
                  Dana sebesar Rp {totalEarnings.toLocaleString('id-ID')} sedang ditransfer ke rekening bank Anda.
                </p>
              </div>
            ) : (
              <form onSubmit={handleExecutePayout} className="space-y-3">
                <div className="p-3 bg-[#D1FAE5] rounded-2xl border border-[#059669]/30">
                  <span className="text-[10px] text-[#064E3B] font-semibold">Jumlah Penarikan (Semua Saldo):</span>
                  <div className="text-lg font-black text-[#064E3B]">
                    Rp {totalEarnings.toLocaleString('id-ID')}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#14231B]">Pilih Rekening Bank:</label>
                  <select
                    value={payoutBank}
                    onChange={(e) => setPayoutBank(e.target.value)}
                    className="w-full text-xs p-2 rounded-xl border border-[#D5E6DC] bg-white text-[#14231B]"
                  >
                    <option value="Bank Mandiri">Bank Mandiri (137-xxx-1)</option>
                    <option value="Bank BCA">Bank Central Asia (BCA)</option>
                    <option value="Bank BNI">Bank BNI</option>
                    <option value="Bank BRI">Bank BRI</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#14231B]">Nomor Rekening:</label>
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="w-full text-xs p-2 rounded-xl border border-[#D5E6DC] text-[#14231B]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#14231B]">Nama Pemilik Rekening:</label>
                  <input
                    type="text"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    className="w-full text-xs p-2 rounded-xl border border-[#D5E6DC] text-[#14231B]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-[#059669] hover:bg-[#064E3B] text-white font-bold text-xs shadow-md shadow-[#059669]/30 active:scale-95 mt-2 transition-colors"
                >
                  Konfirmasi Tarik Dana
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
