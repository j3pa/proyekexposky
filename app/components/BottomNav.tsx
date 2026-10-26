'use client';

import React from 'react';
import { Role } from '../types';
import { 
  IconHome, 
  IconSearch, 
  IconUpload, 
  IconBookmark, 
  IconUser,
  IconBadgeCheck
} from './Icons';

export type TabKey = 'beranda' | 'jelajah' | 'upload' | 'koleksi' | 'profil';

interface BottomNavProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  currentRole: Role;
  savedCount: number;
}

export function BottomNav({
  activeTab,
  onTabChange,
  currentRole,
  savedCount,
}: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-lg border-t border-[#D5E6DC] shadow-[0_-4px_16px_rgba(0,0,0,0.04)] max-w-md mx-auto">
      <div className="flex items-center justify-around px-2 py-2">
        {/* Beranda */}
        <button
          type="button"
          onClick={() => onTabChange('beranda')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
            activeTab === 'beranda'
              ? 'text-[#059669] font-bold scale-105'
              : 'text-[#5B6B62] hover:text-[#14231B] font-medium'
          }`}
        >
          <IconHome className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Beranda</span>
        </button>

        {/* Jelajah */}
        <button
          type="button"
          onClick={() => onTabChange('jelajah')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
            activeTab === 'jelajah'
              ? 'text-[#059669] font-bold scale-105'
              : 'text-[#5B6B62] hover:text-[#14231B] font-medium'
          }`}
        >
          <IconSearch className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Jelajah</span>
        </button>

        {/* Upload / Jual Center Action Button */}
        <button
          type="button"
          onClick={() => onTabChange('upload')}
          className="relative -top-3 flex flex-col items-center focus:outline-hidden group"
        >
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-transform active:scale-95 ${
            currentRole === 'dosen'
              ? 'bg-gradient-to-tr from-[#064E3B] to-[#059669] shadow-[#064E3B]/40'
              : 'bg-gradient-to-tr from-[#059669] to-[#0D9488] shadow-[#059669]/40'
          }`}>
            <IconUpload className="w-6 h-6 stroke-[2.5]" />
          </div>
          <span className="text-[10px] font-bold text-[#14231B] mt-0.5">
            {currentRole === 'dosen' ? 'Jual/Unggah' : 'Jual Catatan'}
          </span>
        </button>

        {/* Koleksi Saya */}
        <button
          type="button"
          onClick={() => onTabChange('koleksi')}
          className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
            activeTab === 'koleksi'
              ? 'text-[#059669] font-bold scale-105'
              : 'text-[#5B6B62] hover:text-[#14231B] font-medium'
          }`}
        >
          <IconBookmark className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Koleksi</span>
          {savedCount > 0 && (
            <span className="absolute 1 top-0.5 right-2 w-4 h-4 bg-[#DC2626] text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">
              {savedCount}
            </span>
          )}
        </button>

        {/* Profil / Dompet */}
        <button
          type="button"
          onClick={() => onTabChange('profil')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
            activeTab === 'profil'
              ? 'text-[#059669] font-bold scale-105'
              : 'text-[#5B6B62] hover:text-[#14231B] font-medium'
          }`}
        >
          <div className="relative">
            <IconUser className="w-5 h-5 mb-0.5" />
            {currentRole === 'dosen' && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#059669] rounded-full border-2 border-white"></span>
            )}
          </div>
          <span className="text-[10px] tracking-tight">
            {currentRole === 'dosen' ? 'Dosen' : 'Akun'}
          </span>
        </button>
      </div>

      {/* iPhone Home Indicator bar */}
      <div className="w-32 h-1 bg-[#D5E6DC] rounded-full mx-auto mb-1 mt-0.5"></div>
    </nav>
  );
}
