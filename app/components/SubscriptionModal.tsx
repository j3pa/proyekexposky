'use client';

import React, { useState } from 'react';
import { SubscriptionTier, SubscriptionPackage, UserProfile } from '../types';
import { SUBSCRIPTION_PACKAGES } from '../data/mockData';
import { 
  IconClose, 
  IconCheck, 
  IconBadgeCheck, 
  IconCrown, 
  IconZap, 
  IconSparkles, 
  IconBookOpen, 
  IconLock, 
  IconWallet, 
  IconShield 
} from './Icons';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onSelectPlan: (tier: SubscriptionTier) => void;
  preselectedTier?: SubscriptionTier;
}

export function SubscriptionModal({
  isOpen,
  onClose,
  currentUser,
  onSelectPlan,
  preselectedTier = 'platinum',
}: SubscriptionModalProps) {
  const [selectedPlanId, setSelectedPlanId] = useState<SubscriptionTier>(preselectedTier);
  const [paymentMethod, setPaymentMethod] = useState<'saldo' | 'qris' | 'gopay' | 'bca'>('qris');
  const [checkoutStep, setCheckoutStep] = useState<'plans' | 'payment' | 'success'>('plans');

  if (!isOpen) return null;

  const currentTier = currentUser.subscriptionTier || 'free';
  const chosenPackage = SUBSCRIPTION_PACKAGES.find((pkg) => pkg.id === selectedPlanId) || SUBSCRIPTION_PACKAGES[1];

  const handleStartCheckout = (tier: SubscriptionTier) => {
    setSelectedPlanId(tier);
    setCheckoutStep('payment');
  };

  const handleConfirmPayment = () => {
    setCheckoutStep('success');
    setTimeout(() => {
      onSelectPlan(selectedPlanId);
    }, 400);
  };

  const handleReset = () => {
    setCheckoutStep('plans');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/65 backdrop-blur-xs transition-opacity animate-fadeIn">
      <div 
        className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-[#D5E6DC]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-[#D5E6DC] bg-white sticky top-0 z-10">
          <button
            type="button"
            onClick={handleReset}
            className="p-1.5 rounded-full hover:bg-[#F4FBF7] text-[#5B6B62] transition-colors"
          >
            <IconClose className="w-5 h-5" />
          </button>
          
          <div className="text-center">
            <h3 className="text-xs font-bold text-[#14231B]">
              {checkoutStep === 'plans' && 'Pilihan Paket Akses Belajar'}
              {checkoutStep === 'payment' && 'Konfirmasi Pembayaran Paket'}
              {checkoutStep === 'success' && 'Paket Berhasil Diaktifkan!'}
            </h3>
            <p className="text-[10px] text-[#059669] font-bold">
              CatatKampus Pro & Exam Pass
            </p>
          </div>

          <div className="w-8"></div>
        </div>

        {/* STEP 1: PLANS COMPARISON */}
        {checkoutStep === 'plans' && (
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {/* Quick Demo Simulator Banner */}
            <div className="p-3 bg-gradient-to-r from-[#D1FAE5] via-[#E6F4ED] to-[#FEF3C7] rounded-2xl border border-[#059669]/30 text-xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#064E3B] flex items-center gap-1">
                  <IconSparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                  Simulasi Status Akun Anda:
                </span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-white text-[#064E3B] border border-[#D5E6DC]">
                  {currentTier === 'free' ? 'Akun Gratis' : currentTier === 'basic' ? 'Paket Basic' : 'Platinum VIP'}
                </span>
              </div>
              <p className="text-[11px] text-[#14231B] leading-tight">
                Pilih paket di bawah untuk menguji akses ke soal latihan maupun catatan materi teorinya:
              </p>
              <div className="flex items-center gap-1.5 mt-2">
                <button
                  type="button"
                  onClick={() => onSelectPlan('free')}
                  className={`flex-1 py-1 text-[10px] font-bold rounded-lg border transition-all ${
                    currentTier === 'free'
                      ? 'bg-[#14231B] text-white border-[#14231B]'
                      : 'bg-white text-[#5B6B62] border-[#D5E6DC] hover:bg-[#F4FBF7]'
                  }`}
                >
                  Mode Gratis
                </button>
                <button
                  type="button"
                  onClick={() => onSelectPlan('basic')}
                  className={`flex-1 py-1 text-[10px] font-bold rounded-lg border transition-all ${
                    currentTier === 'basic'
                      ? 'bg-[#059669] text-white border-[#059669]'
                      : 'bg-white text-[#064E3B] border-[#059669]/40 hover:bg-[#D1FAE5]'
                  }`}
                >
                  ⚡ Tes Basic (49rb)
                </button>
                <button
                  type="button"
                  onClick={() => onSelectPlan('platinum')}
                  className={`flex-1 py-1 text-[10px] font-bold rounded-lg border transition-all ${
                    currentTier === 'platinum'
                      ? 'bg-[#B45309] text-white border-[#B45309]'
                      : 'bg-white text-[#92400E] border-[#F59E0B]/50 hover:bg-[#FEF3C7]'
                  }`}
                >
                  👑 Tes Platinum (149rb)
                </button>
              </div>
            </div>

            {/* Comparison Highlights Header */}
            <div className="text-center px-1">
              <h2 className="text-sm font-extrabold text-[#14231B]">
                Pilih Akses Sesuai Target Ujianmu
              </h2>
              <p className="text-xs text-[#5B6B62] mt-0.5">
                Bandingkan benefit antara <strong>Paket Basic</strong> vs <strong>Platinum Access</strong>
              </p>
            </div>

            {/* Plan Cards */}
            <div className="space-y-3.5">
              {SUBSCRIPTION_PACKAGES.map((pkg) => {
                const isPlatinum = pkg.id === 'platinum';
                const isCurrent = currentTier === pkg.id;

                return (
                  <div
                    key={pkg.id}
                    className={`relative rounded-3xl p-4 transition-all duration-200 border-2 ${
                      isPlatinum
                        ? 'bg-gradient-to-br from-white via-[#FFFDF5] to-[#FEF3C7]/40 border-[#F59E0B] shadow-md shadow-[#F59E0B]/15 ring-2 ring-[#F59E0B]/20'
                        : 'bg-white border-[#059669]/60 shadow-xs hover:border-[#059669]'
                    }`}
                  >
                    {/* Badge top */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        {isPlatinum ? (
                          <div className="p-1 rounded-lg bg-[#FEF3C7] text-[#B45309]">
                            <IconCrown className="w-4 h-4 fill-[#F59E0B]" />
                          </div>
                        ) : (
                          <div className="p-1 rounded-lg bg-[#D1FAE5] text-[#064E3B]">
                            <IconZap className="w-4 h-4 text-[#059669]" />
                          </div>
                        )}
                        <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          isPlatinum ? 'bg-[#FEF3C7] text-[#92400E]' : 'bg-[#D1FAE5] text-[#064E3B]'
                        }`}>
                          {pkg.badge}
                        </span>
                      </div>

                      {pkg.recommended && (
                        <span className="text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white px-2.5 py-0.5 rounded-full shadow-xs animate-pulse">
                          ⭐ PALING LENGKAP
                        </span>
                      )}
                    </div>

                    {/* Name & Pricing */}
                    <div className="flex items-baseline justify-between">
                      <div>
                        <h3 className="text-base font-extrabold text-[#14231B]">{pkg.name}</h3>
                        <p className="text-[11px] text-[#5B6B62] font-medium">{pkg.tagline}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-black text-[#14231B]">
                          Rp {pkg.price.toLocaleString('id-ID')}
                        </div>
                        <span className="text-[10px] text-[#5B6B62]">/{pkg.period}</span>
                      </div>
                    </div>

                    {/* Core Notice (Specific to user requirement) */}
                    <div className={`mt-3 p-2.5 rounded-2xl text-xs ${
                      isPlatinum ? 'bg-[#FEF3C7]/70 text-[#92400E] border border-[#F59E0B]/40' : 'bg-[#F4FBF7] text-[#064E3B] border border-[#D5E6DC]'
                    }`}>
                      <p className="text-[11px] font-semibold leading-relaxed">
                        {isPlatinum ? (
                          <>
                            <strong>Akses Platinum:</strong> Membuka <em>soal latihan ujian</em> <strong>DAN seluruh catatan materi teorinya</strong> secara mendalam, lengkap dengan tips & pembuktian rumus.
                          </>
                        ) : (
                          <>
                            <strong>Akses Basic:</strong> Hanya membuka <em>soal latihan</em> dan kunci jawaban. <em>(Catatan materi teori seputar soal tidak disertakan)</em>.
                          </>
                        )}
                      </p>
                    </div>

                    {/* Features checklist */}
                    <div className="mt-3 space-y-1.5 text-xs">
                      {pkg.features.map((feat, idx) => (
                        <div 
                          key={idx} 
                          className={`flex items-start gap-2 text-[11px] leading-tight ${
                            feat.included ? 'text-[#14231B]' : 'text-[#9CA3AF]'
                          }`}
                        >
                          {feat.included ? (
                            <span className={`p-0.5 rounded-full mt-0.5 shrink-0 ${
                              isPlatinum ? 'bg-[#FEF3C7] text-[#D97706]' : 'bg-[#D1FAE5] text-[#059669]'
                            }`}>
                              <IconCheck className="w-3 h-3" />
                            </span>
                          ) : (
                            <span className="p-0.5 rounded-full mt-0.5 shrink-0 bg-gray-100 text-gray-400">
                              <IconLock className="w-3 h-3" />
                            </span>
                          )}
                          <span className={feat.highlight ? 'font-bold text-[#064E3B]' : ''}>
                            {feat.text}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Action button */}
                    <div className="mt-4 pt-2 border-t border-gray-100">
                      {isCurrent ? (
                        <div className="w-full py-2.5 rounded-xl bg-[#D1FAE5] text-[#064E3B] font-extrabold text-xs text-center flex items-center justify-center gap-1.5 border border-[#059669]/30">
                          <IconCheck className="w-4 h-4 text-[#16A34A]" />
                          <span>Paket Anda Saat Ini Sedang Aktif</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleStartCheckout(pkg.id)}
                          className={`w-full py-3 rounded-2xl font-extrabold text-xs transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 ${
                            isPlatinum
                              ? 'bg-gradient-to-r from-[#F59E0B] via-[#D97706] to-[#B45309] hover:brightness-105 text-white shadow-[#F59E0B]/30'
                              : 'bg-[#059669] hover:bg-[#064E3B] text-white shadow-[#059669]/30'
                          }`}
                        >
                          {isPlatinum ? (
                            <>
                              <IconCrown className="w-4 h-4 fill-white" />
                              <span>Langganan Platinum Access (Rp 149.000)</span>
                            </>
                          ) : (
                            <>
                              <IconZap className="w-4 h-4 text-white" />
                              <span>Langganan Paket Basic (Rp 49.000)</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Satisfaction Guarantee */}
            <div className="flex items-center justify-center gap-2 text-center text-[10px] text-[#5B6B62] pt-1">
              <IconShield className="w-3.5 h-3.5 text-[#059669]" />
              <span>Garansi 100% Kurasi Terverifikasi Dosen & NIDN Kampus</span>
            </div>
          </div>
        )}

        {/* STEP 2: PAYMENT METHOD SELECTION */}
        {checkoutStep === 'payment' && (
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {/* Summary card */}
            <div className={`p-4 rounded-2xl border ${
              chosenPackage.id === 'platinum' ? 'bg-[#FEF3C7]/60 border-[#F59E0B]/40' : 'bg-[#F4FBF7] border-[#059669]/30'
            }`}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#064E3B]">
                  Ringkasan Paket
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  chosenPackage.id === 'platinum' ? 'bg-[#FEF3C7] text-[#92400E]' : 'bg-[#D1FAE5] text-[#064E3B]'
                }`}>
                  {chosenPackage.name}
                </span>
              </div>
              <h4 className="text-sm font-extrabold text-[#14231B]">{chosenPackage.tagline}</h4>
              <p className="text-[11px] text-[#5B6B62] mt-1">{chosenPackage.description}</p>
              
              <div className="mt-3 pt-2 border-t border-black/10 flex justify-between items-center">
                <span className="text-xs text-[#5B6B62]">Biaya Langganan:</span>
                <span className="text-base font-black text-[#14231B]">
                  Rp {chosenPackage.price.toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            {/* Payment Options */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#14231B]">Pilih Metode Pembayaran</h4>

              {/* Saldo CatatKampus */}
              <label 
                className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'saldo' ? 'border-[#059669] bg-[#D1FAE5]/30 shadow-xs' : 'border-[#D5E6DC] bg-white hover:bg-[#F4FBF7]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="pay_method"
                    checked={paymentMethod === 'saldo'}
                    onChange={() => setPaymentMethod('saldo')}
                    className="accent-[#059669]"
                  />
                  <div>
                    <div className="text-xs font-bold text-[#14231B] flex items-center gap-1.5">
                      <IconWallet className="w-4 h-4 text-[#059669]" />
                      <span>Saldo Akun Mahasiswa</span>
                    </div>
                    <span className="text-[10px] text-[#5B6B62]">
                      Sisa Saldo: Rp {currentUser.walletBalance.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#059669]">Instan</span>
              </label>

              {/* QRIS */}
              <label 
                className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'qris' ? 'border-[#059669] bg-[#D1FAE5]/30 shadow-xs' : 'border-[#D5E6DC] bg-white hover:bg-[#F4FBF7]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="pay_method"
                    checked={paymentMethod === 'qris'}
                    onChange={() => setPaymentMethod('qris')}
                    className="accent-[#059669]"
                  />
                  <div>
                    <div className="text-xs font-bold text-[#14231B]">QRIS (GoPay, OVO, ShopeePay, DANA)</div>
                    <span className="text-[10px] text-[#5B6B62]">Scan langsung dari aplikasi bank & e-wallet</span>
                  </div>
                </div>
                <span className="text-[10px] font-extrabold text-[#D97706] bg-[#FEF3C7] px-2 py-0.5 rounded">
                  Paling Praktis
                </span>
              </label>

              {/* BCA Virtual Account */}
              <label 
                className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'bca' ? 'border-[#059669] bg-[#D1FAE5]/30 shadow-xs' : 'border-[#D5E6DC] bg-white hover:bg-[#F4FBF7]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="pay_method"
                    checked={paymentMethod === 'bca'}
                    onChange={() => setPaymentMethod('bca')}
                    className="accent-[#059669]"
                  />
                  <div>
                    <div className="text-xs font-bold text-[#14231B]">BCA / Mandiri Virtual Account</div>
                    <span className="text-[10px] text-[#5B6B62]">Verifikasi otomatis 24 jam</span>
                  </div>
                </div>
              </label>
            </div>

            {/* Back button & Pay action */}
            <div className="pt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCheckoutStep('plans')}
                className="py-3 px-4 rounded-2xl border border-[#D5E6DC] text-xs font-bold text-[#5B6B62] hover:bg-[#F4FBF7]"
              >
                Kembali
              </button>
              <button
                type="button"
                onClick={handleConfirmPayment}
                className="flex-1 py-3 px-4 rounded-2xl bg-[#059669] hover:bg-[#064E3B] text-white font-extrabold text-xs transition-all shadow-md shadow-[#059669]/30 active:scale-95"
              >
                Bayar Rp {chosenPackage.price.toLocaleString('id-ID')}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SUCCESS STATE */}
        {checkoutStep === 'success' && (
          <div className="p-6 flex flex-col items-center justify-center text-center space-y-4 overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-[#D1FAE5] text-[#16A34A] flex items-center justify-center animate-bounce shadow-md shadow-[#16A34A]/20">
              <IconCheck className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#059669] bg-[#D1FAE5] px-2.5 py-0.5 rounded-full">
                Aktivasi Berhasil
              </span>
              <h4 className="text-base font-extrabold text-[#14231B] pt-1">
                Selamat! {chosenPackage.name} Aktif
              </h4>
              <p className="text-xs text-[#5B6B62] max-w-xs mx-auto leading-relaxed">
                {chosenPackage.id === 'platinum' ? (
                  <>Seluruh <strong>Soal Latihan</strong> dan <strong>Catatan Materi Teori</strong> kini telah terbuka tanpa batas!</>
                ) : (
                  <>Seluruh <strong>Bank Soal Latihan & UTS/UAS</strong> siap kamu akses untuk latihan mandiri.</>
                )}
              </p>
            </div>

            <div className="w-full p-3.5 bg-[#F4FBF7] rounded-2xl border border-[#D5E6DC] text-left text-xs space-y-2">
              <div className="flex justify-between text-[#5B6B62]">
                <span>Status Akses:</span>
                <span className="font-bold text-[#064E3B]">{chosenPackage.name}</span>
              </div>
              <div className="flex justify-between text-[#5B6B62]">
                <span>Akses Materi:</span>
                <span className="font-semibold text-[#14231B]">
                  {chosenPackage.id === 'platinum' ? 'Soal + Catatan Teori Lengkap' : 'Hanya Soal Latihan'}
                </span>
              </div>
              <div className="flex justify-between text-[#5B6B62]">
                <span>Masa Aktif:</span>
                <span className="font-semibold text-[#14231B]">1 Semester (6 Bulan)</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#059669] hover:bg-[#064E3B] text-white font-extrabold text-xs transition-all shadow-md shadow-[#059669]/30 active:scale-95"
            >
              Mulai Belajar Sekarang
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
