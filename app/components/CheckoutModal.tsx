'use client';

import React, { useState } from 'react';
import { Material, UserProfile } from '../types';
import { IconClose, IconCheck, IconBadgeCheck, IconShield, IconWallet } from './Icons';

interface CheckoutModalProps {
  material: Material | null;
  currentUser: UserProfile;
  onClose: () => void;
  onSuccess: (material: Material) => void;
}

export function CheckoutModal({
  material,
  currentUser,
  onClose,
  onSuccess,
}: CheckoutModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'saldo' | 'qris' | 'gopay'>('saldo');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!material) return null;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onSuccess(material);
      }, 1400);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn">
      <div 
        className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-[#D5E6DC]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-[#D5E6DC]">
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#F4FBF7] text-[#5B6B62] transition-colors"
          >
            <IconClose className="w-5 h-5" />
          </button>
          <div className="text-center">
            <h3 className="text-xs font-bold text-[#14231B]">Konfirmasi Pembelian Materi</h3>
            <p className="text-[10px] text-[#059669] font-bold">Transaksi Aman & Terverifikasi</p>
          </div>
          <div className="w-8"></div>
        </div>

        {/* Content */}
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-12 px-6 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-[#D1FAE5] text-[#16A34A] flex items-center justify-center animate-bounce">
              <IconCheck className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-[#14231B]">Pembayaran Berhasil!</h4>
            <p className="text-xs text-[#5B6B62] max-w-xs">
              Materi <strong>{material.title}</strong> telah ditambahkan ke Koleksi Anda dan siap diunduh.
            </p>
          </div>
        ) : (
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
              </div>
            </div>

            {/* Price Detail */}
            <div className="p-3 bg-white rounded-2xl border border-[#D5E6DC] space-y-1.5 text-xs">
              <div className="flex justify-between text-[#5B6B62]">
                <span>Harga Materi</span>
                <span className="font-semibold text-[#14231B]">Rp {material.price.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-[#5B6B62]">
                <span>Biaya Layanan Platform</span>
                <span className="font-bold text-[#16A34A]">Rp 0 (Gratis)</span>
              </div>
              <div className="border-t border-[#D5E6DC] pt-1.5 flex justify-between font-extrabold text-sm text-[#14231B]">
                <span>Total Bayar</span>
                <span className="text-[#B45309] font-black">Rp {material.price.toLocaleString('id-ID')}</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#14231B] block">Pilih Metode Pembayaran:</label>

              {/* Saldo CatatKampus */}
              <button
                type="button"
                onClick={() => setPaymentMethod('saldo')}
                className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  paymentMethod === 'saldo'
                    ? 'border-[#059669] bg-[#D1FAE5] ring-2 ring-[#059669]/20'
                    : 'border-[#D5E6DC] bg-[#F4FBF7] text-[#5B6B62]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#059669] text-white flex items-center justify-center">
                    <IconWallet className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#14231B] block">Saldo Akun Kampus</span>
                    <span className="text-[10px] text-[#5B6B62]">
                      Saldo Tersedia: Rp {currentUser.walletBalance.toLocaleString('id-ID')}
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
                    ? 'border-[#059669] bg-[#D1FAE5] ring-2 ring-[#059669]/20'
                    : 'border-[#D5E6DC] bg-[#F4FBF7] text-[#5B6B62]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#064E3B] text-white flex items-center justify-center font-bold text-[10px]">
                    QRIS
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#14231B] block">QRIS Instan</span>
                    <span className="text-[10px] text-[#5B6B62]">BCA, Mandiri, BRI, BNI, Dana, OVO, ShopeePay</span>
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
                    ? 'border-[#059669] bg-[#D1FAE5] ring-2 ring-[#059669]/20'
                    : 'border-[#D5E6DC] bg-[#F4FBF7] text-[#5B6B62]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#0D9488] text-white flex items-center justify-center font-bold text-[10px]">
                    GPay
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#14231B] block">GoPay / E-Wallet</span>
                    <span className="text-[10px] text-[#5B6B62]">Bayar cepat sekali klik</span>
                  </div>
                </div>
                {paymentMethod === 'gopay' && <IconCheck className="w-4 h-4 text-[#059669]" />}
              </button>
            </div>

            {/* Safety Guarantee */}
            <div className="flex items-center gap-2 text-[10px] text-[#5B6B62] bg-[#F4FBF7] p-2.5 rounded-xl border border-[#D5E6DC]">
              <IconShield className="w-4 h-4 text-[#059669] shrink-0" />
              <span>Garansi 100% uang kembali bila materi tidak sesuai silabus atau terjadi kerusakan berkas.</span>
            </div>

            {/* Pay Button */}
            <button
              type="button"
              disabled={isProcessing}
              onClick={handlePay}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#059669] hover:bg-[#064E3B] text-white font-bold text-xs transition-all shadow-md shadow-[#059669]/30 active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Memproses Pembayaran...</span>
                </>
              ) : (
                <span>Bayar Rp {material.price.toLocaleString('id-ID')} & Buka Akses</span>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
