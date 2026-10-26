'use client';

import React from 'react';
import { Material } from '../types';
import { 
  IconStar, 
  IconLock, 
  IconLockOpen, 
  IconBadgeCheck, 
  IconBookmark
} from './Icons';

interface MaterialCardProps {
  material: Material;
  isBookmarked: boolean;
  isPurchased: boolean;
  onSelect: (material: Material) => void;
  onToggleBookmark: (materialId: string, e: React.MouseEvent) => void;
}

export function MaterialCard({
  material,
  isBookmarked,
  isPurchased,
  onSelect,
  onToggleBookmark,
}: MaterialCardProps) {
  // Difficulty color badges matching color palette
  const getDifficultyBadge = (level: string) => {
    switch (level) {
      case 'Mudah':
        return 'bg-[#D1FAE5] text-[#064E3B] border-[#059669]/30';
      case 'Menengah':
        return 'bg-[#FEF3C7] text-[#92400E] border-[#F59E0B]/30';
      case 'Sulit':
        return 'bg-[#FEE2E2] text-[#991B1B] border-[#DC2626]/30';
      default:
        return 'bg-[#F4FBF7] text-[#5B6B62] border-[#D5E6DC]';
    }
  };

  const isFree = material.price === 0;

  return (
    <div
      onClick={() => onSelect(material)}
      className="group relative bg-white rounded-2xl p-3 border border-[#D5E6DC] shadow-xs hover:border-[#059669] hover:shadow-md transition-all duration-200 cursor-pointer active:scale-[0.99] flex gap-3"
    >
      {/* Left Thumbnail (Document note mockup styling matching reference photo) */}
      <div className="relative w-20 h-28 shrink-0 rounded-xl bg-gradient-to-b from-[#F4FBF7] to-[#E6F4ED] border border-[#D5E6DC] overflow-hidden flex flex-col justify-between p-1.5 shadow-2xs group-hover:border-[#059669] transition-colors">
        {/* Note Header Simulation */}
        <div className="flex items-center justify-between border-b border-[#D5E6DC] pb-1">
          <span className="text-[7px] font-bold text-[#064E3B] uppercase tracking-tighter truncate max-w-[50px]">
            {material.category.split(' ')[0]}
          </span>
          <span className="text-[7px] font-bold text-[#059669]">
            {material.pagesCount}p
          </span>
        </div>

        {/* Paper lines simulation */}
        <div className="space-y-1 my-auto px-0.5">
          <div className="h-1 bg-[#D5E6DC] rounded-full w-full"></div>
          <div className="h-1 bg-[#D5E6DC] rounded-full w-4/5"></div>
          <div className="h-1 bg-[#059669]/40 rounded-full w-2/3"></div>
          <div className="h-1 bg-[#D5E6DC] rounded-full w-full"></div>
          <div className="h-1 bg-[#D5E6DC] rounded-full w-3/4"></div>
        </div>

        {/* Bottom thumbnail tag */}
        <div className="flex items-center justify-between pt-1 border-t border-[#D5E6DC]">
          <span className="text-[8px] font-bold text-[#14231B] truncate">
            {material.courseName.split(' ')[0]}
          </span>
          {isFree || isPurchased ? (
            <IconLockOpen className="w-2.5 h-2.5 text-[#16A34A]" />
          ) : (
            <IconLock className="w-2.5 h-2.5 text-[#5B6B62]" />
          )}
        </div>

        {/* Verified Badge Overlay if Official Dosen */}
        {material.isOfficialDosen && (
          <div className="absolute top-0 right-0 bg-[#064E3B] text-white p-0.5 rounded-bl-lg shadow-2xs">
            <IconBadgeCheck className="w-3 h-3 text-[#F59E0B]" />
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          {/* Author Row */}
          <div className="flex items-center justify-between gap-1 mb-1">
            <div className="flex items-center gap-1.5 min-w-0">
              {/* Avatar */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={material.authorAvatar}
                alt={material.authorName}
                className="w-5 h-5 rounded-full object-cover border border-[#D5E6DC] shrink-0"
              />
              <span className="text-xs font-bold text-[#14231B] truncate">
                {material.authorName}
              </span>
              {material.isOfficialDosen ? (
                <span className="shrink-0 inline-flex items-center gap-0.5 text-[9px] font-bold text-[#064E3B] bg-[#D1FAE5] px-1 py-0.2 rounded border border-[#059669]/30">
                  Dosen
                </span>
              ) : (
                <span className="shrink-0 text-[9px] font-semibold text-[#5B6B62] bg-[#F4FBF7] px-1 py-0.2 rounded border border-[#D5E6DC]">
                  Mhs
                </span>
              )}
            </div>

            {/* Bookmark button */}
            <button
              type="button"
              onClick={(e) => onToggleBookmark(material.id, e)}
              className={`p-1 rounded-full transition-colors ${
                isBookmarked
                  ? 'text-[#059669] bg-[#D1FAE5]'
                  : 'text-[#5B6B62] hover:text-[#14231B] hover:bg-[#F4FBF7]'
              }`}
              title="Simpan Catatan"
            >
              <IconBookmark className="w-4 h-4" filled={isBookmarked} />
            </button>
          </div>

          {/* Title */}
          <h3 className="text-xs font-bold text-[#14231B] leading-snug line-clamp-2 group-hover:text-[#059669] transition-colors">
            {material.title}
          </h3>

          {/* Campus & Course Info */}
          <div className="flex flex-wrap items-center gap-1.5 mt-1">
            <span className="text-[10px] text-[#5B6B62] font-medium truncate max-w-[140px]">
              {material.campus.split('(')[0].trim()}
            </span>
            <span className="text-[9px] text-[#D5E6DC]">•</span>
            <span className="text-[10px] text-[#059669] font-semibold truncate max-w-[120px]">
              {material.courseName}
            </span>
          </div>
        </div>

        {/* Footer Meta & Price */}
        <div className="flex items-center justify-between pt-2 mt-1 border-t border-[#D5E6DC]/60">
          {/* Rating & Difficulty */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5 text-[#F59E0B]">
              <IconStar className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
              <span className="text-[11px] font-bold text-[#14231B]">
                {material.rating.toFixed(1)}
              </span>
              <span className="text-[10px] text-[#5B6B62]">
                ({material.reviewsCount})
              </span>
            </div>

            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${getDifficultyBadge(material.difficulty)}`}>
              {material.difficulty}
            </span>
          </div>

          {/* Price Tag (Using Yellow Amber #F59E0B / #D97706 as stated in rules) */}
          <div className="text-right">
            {isPurchased ? (
              <span className="text-[11px] font-bold text-[#16A34A] bg-[#D1FAE5] px-2 py-0.5 rounded-full border border-[#16A34A]/30">
                Terbeli ✓
              </span>
            ) : isFree ? (
              <span className="text-[11px] font-bold text-[#064E3B] bg-[#D1FAE5] px-2 py-0.5 rounded-full border border-[#059669]/40">
                GRATIS
              </span>
            ) : (
              <span className="text-xs font-extrabold text-[#B45309] bg-[#FEF3C7] px-2 py-0.5 rounded-full border border-[#F59E0B]/40">
                Rp {material.price.toLocaleString('id-ID')}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
