'use client';

import React, { useState, useEffect } from 'react';
import { Material, UserProfile } from '../types';
import { IconClose, IconCheck, IconBadgeCheck, IconShield, IconWallet, IconDownload } from './Icons';

interface CheckoutModalProps {
  material: Material | null;
  currentUser: UserProfile;
  onClose: () => void;
  onSuccess: (material: Material) => void;
  onDownloadRealPdf: (material: Material) => void;
}

export function CheckoutModal({
  material,
  currentUser,
  onClose,
  onSuccess,
  onDownloadRealPdf,
}: CheckoutModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'saldo' | 'qris' | 'gopay' | 'bca'>('saldo');
  const [step, setStep] = useState<'select' | 'processing' | 'success'>('select');
  const [hasDownloaded, setHasDownloaded] = useState(false);

  // CRITICAL FIX: Reset every time a new material is opened so it NEVER jumps straight to success!
  useEffect(() => {
    if (material) {
      setStep('select');
      setHasDownloaded(false);
      setPaymentMethod('saldo');
    }
  }, [material?.id]);

  if (!material) return null;

  const handlePay = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
      onSuccess(material);
    }, 1200);
  };

  const handleDownloadAndFinish = () => {
    onDownloadRealPdf(material);
    setHasDownloaded(true);
  };

  const handleCloseModal = () => {
    setStep('select');
    setHasDownloaded(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn">
      <div 
        className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-[#D5E6DC]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-[#D5E6DC] bg-white sticky top-0 z-10">
          <button
            type="button"
            onClick={handleCloseModal}
            className="p-1.5 rounded-full hover:bg-[#F4FBF7] text-[#5B6B62] transition-colors"
          >
            <IconClose className="w-5 h-5" />
          </button>
          <div className="text-center">
            <h3 className="text-xs font-bold text-[#14231B]">
              {step === 'success' ? 'Transaksi Selesai' : 'Pilih Metode Pembayaran'}
            </h3>
            <p className="text-[10px] text-[#059669] font-bold">
              {step === 'success' ? 'Materi Terbuka Sepenuhnya' : 'Beli Materi Kuliah'}
            </p>
          </div>
          <div className="w-8"></div>
        </div>

        {/* STEP: PEMBAYARAN BERHASIL (SUCCESS SCREEN) */}
        {step === 'success' ? (
          <div className="p-6 flex flex-col items-center justify-center text-center space-y-4 overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-[#D1FAE5] text-[#16A34A] flex items-center justify-center animate-bounce shadow-md shadow-[#16A34A]/20">
              <IconCheck className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#059669] bg-[#D1FAE5] px-2.5 py-0.5 rounded-full">
                Pembayaran Berhasil
              </span>
              <h4 className="text-base font-extrabold text-[#14231B] pt-1">
                Materi Berhasil Anda Beli!
              </h4>
              <p className="text-xs text-[#5B6B62] max-w-xs mx-auto leading-relaxed">
                Modul <strong>{material.title}</strong> kini telah tersimpan di Koleksi Anda dan berkas PDF aslinya siap diunduh.
              </p>
            </div>

            {/* Invoice card */}
            <div className="w-full p-3.5 bg-[#F4FBF7] rounded-2xl border border-[#D5E6DC] text-left text-xs space-y-2">
              <div className="flex justify-between text-[#5B6B62]">
                <span>Mata Kuliah:</span>
                <span className="font-bold text-[#14231B]">{material.courseName}</span>
              </div>
              <div className="flex justify-between text-[#5B6B62]">
                <span>Penulis / Dosen:</span>
                <span className="font-semibold text-[#14231B]">{material.authorName}</span>
              </div>
              <div className="flex justify-between text-[#5B6B62]">
                <span>Metode Bayar:</span>
                <span className="font-semibold text-[#064E3B] uppercase">{paymentMethod}</span>
              </div>
              <div className="border-t border-[#D5E6DC] pt-1.5 flex justify-between font-extrabold text-[#14231B]">
                <span>Total Dibayar:</span>
                <span className="text-[#B45309]">Rp {material.price.toLocaleString('id-ID')}</span>
              </div>
            </div>

            {/* Real PDF Download Action Button */}
            <div className="w-full space-y-2 pt-2">
              <button
                type="button"
                onClick={handleDownloadAndFinish}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#059669] hover:bg-[#064E3B] text-white font-extrabold text-xs transition-all shadow-md shadow-[#059669]/30 active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <IconDownload className="w-4 h-4" />
                <span>{hasDownloaded ? '✓ Berkas PDF Telah Diunduh (Unduh Lagi)' : '📥 Unduh Berkas PDF Resmi Sekarang'}</span>
              </button>

              <button
                type="button"
                onClick={handleCloseModal}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-[#5B6B62] hover:bg-[#F4FBF7] transition-colors"
              >
                Selesai & Buka Materi
              </button>
            </div>
          </div>
        ) : (
          /* STEP: PILIH METODE & KONFIRMASI */
          <div className="p-4 space-y-4 overflow-y-auto">
            {/* Note Summary Card */}
            <div className="p-3 bg-[#F4FBF7] rounded-2xl border border-[#D5E6DC] flex gap-3 items-center">
              <div className="w-12 h-14 bg-[#D1FAE5] text-[#064E3B] rounded-xl flex items-center justify-center font-bold text-xs shrink-0 border border-[#059669]/30">
                PDF
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold text-[#059669] uppercase">
                  {material.category}
                </span>
                <h4 className="text-xs font-bold text-[#14231B] truncate">
                  {material.title}
                </h4>
                <p className="text-[11px] text-[#5B6B62] truncate">
                  Penulis: {material.authorName} {material.isOfficialDosen && '✓'}
                </p>
                <p className="text-[10px] text-[#059669] font-medium truncate">
                  {material.campus}
                </p>
              </div>
            </div>

            {/* Price Detail */}
            <div className="p-3 bg-white rounded-2xl border border-[#D5E6DC] space-y-1.5 text-xs">
              <div className="flex justify-between text-[#5B6B62]">
                <span>Harga Materi</span>
                <span className="font-semibold text-[#14231B]">Rp {material.price.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-[#5B6B62]">
                <span>Biaya Platform Mahasiswa</span>
                <span className="font-bold text-[#16A34A]">Rp 0 (Gratis)</span>
              </div>
              <div className="border-t border-[#D5E6DC] pt-1.5 flex justify-between font-extrabold text-sm text-[#14231B]">
                <span>Total Pembayaran</span>
                <span className="text-[#B45309] font-black">Rp {material.price.toLocaleString('id-ID')}</span>
              </div>
            </div>

            {/* Payment Methods Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#14231B] block">
                Pilih Metode Pembayaran:
              </label>

              {/* Saldo CatatKampus */}
              <button
                type="button"
                onClick={() => setPaymentMethod('saldo')}
                className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  paymentMethod === 'saldo'
                    ? 'border-[#059669] bg-[#D1FAE5] ring-2 ring-[#059669]/30'
                    : 'border-[#D5E6DC] bg-[#F4FBF7] text-[#5B6B62]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#059669] text-white flex items-center justify-center">
                    <IconWallet className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#14231B] block">Saldo Dompet Kampus</span>
                    <span className="text-[10px] text-[#5B6B62]">
                      Saldo: Rp {currentUser.walletBalance.toLocaleString('id-ID')} (Cukup)
                    </span>
                  </div>
                </div>
                {paymentMethod === 'saldo' && <IconCheck className="w-4 h-4 text-[#059669]" />}
              </button>

              {/* QRIS */}
              <button
                type="button"
                onClick={() => setPaymentMethod('qris')}
                className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  paymentMethod === 'qris'
                    ? 'border-[#059669] bg-[#D1FAE5] ring-2 ring-[#059669]/30'
                    : 'border-[#D5E6DC] bg-[#F4FBF7] text-[#5B6B62]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#064E3B] text-white flex items-center justify-center font-bold text-[10px]">
                    QRIS
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#14231B] block">QRIS (Semua Bank & E-Wallet)</span>
                    <span className="text-[10px] text-[#5B6B62]">BCA, Mandiri, BRI, Dana, OVO, ShopeePay</span>
                  </div>
                </div>
                {paymentMethod === 'qris' && <IconCheck className="w-4 h-4 text-[#059669]" />}
              </button>

              {/* GoPay */}
              <button
                type="button"
                onClick={() => setPaymentMethod('gopay')}
                className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  paymentMethod === 'gopay'
                    ? 'border-[#059669] bg-[#D1FAE5] ring-2 ring-[#059669]/30'
                    : 'border-[#D5E6DC] bg-[#F4FBF7] text-[#5B6B62]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#0D9488] text-white flex items-center justify-center font-bold text-[10px]">
                    GPay
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#14231B] block">GoPay / E-Wallet</span>
                    <span className="text-[10px] text-[#5B6B62]">Bayar instan sekali klik</span>
                  </div>
                </div>
                {paymentMethod === 'gopay' && <IconCheck className="w-4 h-4 text-[#059669]" />}
              </button>

              {/* Transfer Bank Virtual Account */}
              <button
                type="button"
                onClick={() => setPaymentMethod('bca')}
                className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  paymentMethod === 'bca'
                    ? 'border-[#059669] bg-[#D1FAE5] ring-2 ring-[#059669]/30'
                    : 'border-[#D5E6DC] bg-[#F4FBF7] text-[#5B6B62]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#14231B] text-white flex items-center justify-center font-bold text-[10px]">
                    VA
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#14231B] block">Virtual Account (BCA / Mandiri / BNI)</span>
                    <span className="text-[10px] text-[#5B6B62]">Verifikasi otomatis 24 jam</span>
                  </div>
                </div>
                {paymentMethod === 'bca' && <IconCheck className="w-4 h-4 text-[#059669]" />}
              </button>
            </div>

            {/* QRIS preview if selected */}
            {paymentMethod === 'qris' && (
              <div className="p-3 bg-[#F4FBF7] rounded-2xl border border-[#D5E6DC] text-center space-y-1.5 animate-fadeIn">
                <span className="text-[10px] font-bold text-[#064E3B] block">Kode QRIS Pembayaran:</span>
                <div className="w-32 h-32 bg-white p-2 border-2 border-[#064E3B] rounded-xl mx-auto flex items-center justify-center shadow-xs">
                  <div className="grid grid-cols-5 gap-1.5 w-full h-full p-1 bg-slate-900 rounded">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div key={i} className={`rounded-xs ${i % 2 === 0 ? 'bg-white' : 'bg-transparent'}`}></div>
                    ))}
                  </div>
                </div>
                <span className="text-[10px] text-[#5B6B62] block">
                  Scan dengan aplikasi m-Banking atau E-Wallet apa saja
                </span>
              </div>
            )}

            {/* Safety Guarantee */}
            <div className="flex items-center gap-2 text-[10px] text-[#5B6B62] bg-[#F4FBF7] p-2.5 rounded-xl border border-[#D5E6DC]">
              <IconShield className="w-4 h-4 text-[#059669] shrink-0" />
              <span>Garansi 100% materi resmi terverifikasi dan unduhan PDF langsung aktif.</span>
            </div>

            {/* Pay Button */}
            <button
              type="button"
              disabled={step === 'processing'}
              onClick={handlePay}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#059669] hover:bg-[#064E3B] text-white font-extrabold text-xs transition-all shadow-md shadow-[#059669]/30 active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {step === 'processing' ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Memproses Transaksi...</span>
                </>
              ) : (
                <span>Bayar Rp {material.price.toLocaleString('id-ID')} Sekarang</span>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
