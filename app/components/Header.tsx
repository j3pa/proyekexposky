'use client';

import React from 'react';
import { Role, SubscriptionTier } from '../types';
import { IconBell, IconBadgeCheck, IconGraduationCap, IconCrown, IconZap, IconSparkles } from './Icons';

interface HeaderProps {
  currentRole: Role;
  onRoleChange: (role: Role) => void;
  selectedCampus: string;
  onCampusClick: () => void;
  walletBalance: number;
  subscriptionTier?: SubscriptionTier;
  onOpenSubscriptionModal?: (tier?: SubscriptionTier) => void;
}

export function Header({
  currentRole,
  onRoleChange,
  selectedCampus,
  onCampusClick,
  walletBalance,
  subscriptionTier = 'free',
  onOpenSubscriptionModal,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#D5E6DC] shadow-xs">
      {/* Real Phone Status Bar */}
      <div className="flex justify-between items-center px-6 pt-3 pb-1 text-xs font-semibold text-[#14231B] select-none">
        <span>09:41</span>
        <div className="w-20 h-4 bg-[#064E3B] rounded-full flex items-center justify-center">
          <span className="w-2 h-2 rounded-full bg-[#16A34A] mr-1.5 animate-pulse"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#059669]"></span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-[#5B6B62]">5G</span>
          <div className="w-5 h-2.5 border border-[#14231B] rounded-xs p-0.5 flex items-center">
            <div className="h-full w-3/4 bg-[#064E3B] rounded-xs"></div>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="px-4 py-2.5">
        <div className="flex items-center justify-between gap-2">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#059669] to-[#064E3B] flex items-center justify-center text-white shadow-sm shadow-[#059669]/30">
              <IconGraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-base font-extrabold tracking-tight text-[#14231B]">
                  Catat<span className="text-[#059669]">Kampus</span>
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-md bg-[#D1FAE5] text-[#064E3B] border border-[#16A34A]/30">
                  TERVERIFIKASI
                </span>
              </div>
              <button 
                onClick={onCampusClick}
                className="flex items-center gap-1 text-[11px] text-[#5B6B62] font-medium hover:text-[#059669] transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span>
                <span className="max-w-[150px] truncate">{selectedCampus}</span>
                <span className="text-[9px] text-[#5B6B62]">▼</span>
              </button>
            </div>
          </div>

          {/* Role Pill Switcher */}
          <div className="flex items-center bg-[#F4FBF7] p-0.5 rounded-xl border border-[#D5E6DC]">
            <button
              type="button"
              onClick={() => onRoleChange('mahasiswa')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                currentRole === 'mahasiswa'
                  ? 'bg-[#059669] text-white shadow-xs'
                  : 'text-[#5B6B62] hover:text-[#14231B]'
              }`}
            >
              Mahasiswa
            </button>
            <button
              type="button"
              onClick={() => onRoleChange('dosen')}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                currentRole === 'dosen'
                  ? 'bg-[#064E3B] text-white shadow-xs'
                  : 'text-[#5B6B62] hover:text-[#14231B]'
              }`}
            >
              <span>Dosen</span>
              <IconBadgeCheck className={`w-3.5 h-3.5 ${currentRole === 'dosen' ? 'text-[#F59E0B]' : 'text-[#16A34A]'}`} />
            </button>
          </div>
        </div>

        {/* Dynamic Role Sub-Banner */}
        {currentRole === 'dosen' ? (
          <div className="mt-2.5 px-3 py-1.5 bg-[#D1FAE5] rounded-xl border border-[#059669]/30 flex items-center justify-between text-xs animate-fadeIn">
            <div className="flex items-center gap-1.5 text-[#064E3B] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#059669]"></span>
              <span>Mode Dosen / Kurator (NIDN Terverifikasi)</span>
            </div>
            <div className="text-[11px] font-bold text-[#064E3B] bg-white px-2 py-0.5 rounded-md border border-[#D5E6DC]">
              Saldo: Rp {walletBalance.toLocaleString('id-ID')}
            </div>
          </div>
        ) : (
          <div className="mt-2 text-[11px] text-[#5B6B62] flex items-center justify-between px-0.5">
            <button
              type="button"
              onClick={() => onOpenSubscriptionModal?.()}
              className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold transition-all shadow-2xs active:scale-95 ${
                subscriptionTier === 'platinum'
                  ? 'bg-gradient-to-r from-[#FEF3C7] to-[#FFFBEB] text-[#92400E] border border-[#F59E0B]/60'
                  : subscriptionTier === 'basic'
                  ? 'bg-[#D1FAE5] text-[#064E3B] border border-[#059669]/40'
                  : 'bg-[#F4FBF7] text-[#059669] border border-[#D5E6DC] hover:bg-[#D1FAE5]'
              }`}
            >
              {subscriptionTier === 'platinum' ? (
                <>
                  <IconCrown className="w-3 h-3 fill-[#F59E0B]" />
                  <span>👑 Platinum Access Aktif (Soal + Catatan)</span>
                </>
              ) : subscriptionTier === 'basic' ? (
                <>
                  <IconZap className="w-3 h-3 text-[#059669]" />
                  <span>⚡ Paket Basic Aktif (Akses Soal 49rb)</span>
                </>
              ) : (
                <>
                  <IconSparkles className="w-3 h-3 text-[#F59E0B]" />
                  <span>Paket Ujian: Basic (49rb) & Platinum (149rb)</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => onOpenSubscriptionModal?.()}
              className="text-[10px] font-extrabold text-[#059669] hover:underline flex items-center gap-0.5"
            >
              <span>{subscriptionTier === 'free' ? 'Buka Paket' : 'Upgrade'}</span>
              <span>→</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
