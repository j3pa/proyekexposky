'use client';

import React, { useState, useMemo } from 'react';
import { Role, Material, UserProfile, Review, DifficultyLevel, MaterialCategory, SubscriptionTier } from './types';
import { 
  UNIVERSITIES, 
  CATEGORIES, 
  INITIAL_DOSEN_USER, 
  INITIAL_MAHASISWA_USER, 
  INITIAL_MATERIALS, 
  MOCK_REVIEWS,
  SUBSCRIPTION_PACKAGES
} from './data/mockData';
import { Header } from './components/Header';
import { BottomNav, TabKey } from './components/BottomNav';
import { MaterialCard } from './components/MaterialCard';
import { MaterialDetailModal } from './components/MaterialDetailModal';
import { UploadMaterialModal } from './components/UploadMaterialModal';
import { CheckoutModal } from './components/CheckoutModal';
import { LecturerDashboard } from './components/LecturerDashboard';
import { SubscriptionModal } from './components/SubscriptionModal';
import { downloadRealMaterialPdf } from './utils/generatePdf';
import { 
  IconSearch, 
  IconFilter, 
  IconBadgeCheck, 
  IconStar, 
  IconGraduationCap, 
  IconFileText, 
  IconShield,
  IconClose,
  IconCheck,
  IconDownload,
  IconBookmark,
  IconWallet,
  IconLockOpen,
  IconCrown,
  IconZap,
  IconSparkles,
  IconBookOpen,
  IconLightBulb
} from './components/Icons';

export default function Home() {
  // Current Active Role & Users
  const [currentRole, setCurrentRole] = useState<Role>('mahasiswa');
  const [dosenUser, setDosenUser] = useState<UserProfile>(INITIAL_DOSEN_USER);
  const [mahasiswaUser, setMahasiswaUser] = useState<UserProfile>(INITIAL_MAHASISWA_USER);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<TabKey>('beranda');

  // Materials & Reviews State
  const [materials, setMaterials] = useState<Material[]>(INITIAL_MATERIALS);
  const [reviewsMap, setReviewsMap] = useState<Record<string, Review[]>>(MOCK_REVIEWS);

  // User Actions: Bookmarks & Purchases
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['mat_1', 'mat_3']);
  const [purchasedIds, setPurchasedIds] = useState<string[]>(['mat_4']); // mat_4 is free default

  // Filtering & Search
  const [selectedCampus, setSelectedCampus] = useState<string>('Semua Kampus');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua Kategori');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyDosenOfficial, setOnlyDosenOfficial] = useState<boolean>(false);
  const [onlyFree, setOnlyFree] = useState<boolean>(false);

  // Modals State
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [checkoutMaterial, setCheckoutMaterial] = useState<Material | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [isCampusModalOpen, setIsCampusModalOpen] = useState<boolean>(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState<boolean>(false);
  const [subscriptionPreselectedTier, setSubscriptionPreselectedTier] = useState<SubscriptionTier>('platinum');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleOpenSubscriptionModal = (tier: SubscriptionTier = 'platinum') => {
    setSubscriptionPreselectedTier(tier);
    setIsSubscriptionOpen(true);
  };

  const handleSelectSubscriptionPlan = (tier: SubscriptionTier) => {
    setMahasiswaUser((prev) => ({
      ...prev,
      subscriptionTier: tier,
      subscriptionActiveUntil: tier === 'free' ? undefined : '1 Semester (6 Bulan)',
    }));
    if (tier === 'basic') {
      showToast('⚡ Paket Basic (Rp 49.000) Aktif: Seluruh Bank Soal Latihan & UTS/UAS terbuka!');
    } else if (tier === 'platinum') {
      showToast('👑 Platinum Access (Rp 149.000) Aktif: Soal & Seluruh Catatan Materi Teori terbuka!');
    } else {
      showToast('Beralih ke Akun Gratis.');
    }
  };

  // Frame mode toggle for desktop preview
  const [isPhoneFrame, setIsPhoneFrame] = useState<boolean>(true);

  const currentUser = currentRole === 'dosen' ? dosenUser : mahasiswaUser;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Switch role handler
  const handleRoleChange = (newRole: Role) => {
    setCurrentRole(newRole);
    showToast(newRole === 'dosen' 
      ? 'Beralih ke Mode Dosen: Beri modul kurikulum & jual materi.' 
      : 'Beralih ke Mode Mahasiswa: Cari materi kuliah & rangkuman.');
  };

  // Bookmark toggle
  const handleToggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      showToast(exists ? 'Materi dihapus dari bookmark' : 'Materi disimpan ke bookmark!');
      return next;
    });
  };

  // Buy material click
  const handleBuyClick = (mat: Material) => {
    setCheckoutMaterial(mat);
  };

  // Purchase success
  const handlePurchaseSuccess = (mat: Material) => {
    setPurchasedIds((prev) => Array.from(new Set([...prev, mat.id])));
    showToast(`Berhasil membeli ${mat.title}! Berkas PDF siap diunduh.`);

    // If author is the current dosen, credit the author
    if (mat.authorRole === 'dosen') {
      setDosenUser((prev) => ({
        ...prev,
        walletBalance: prev.walletBalance + mat.price,
        materialsSold: prev.materialsSold + 1,
      }));
    }
  };

  // Real PDF download handler
  const handleDownloadClick = (mat: Material) => {
    downloadRealMaterialPdf(mat, currentUser);
    showToast(`Mengunduh berkas PDF resmi: ${mat.title}...`);
    setMaterials((prev) =>
      prev.map((m) => (m.id === mat.id ? { ...m, downloadsCount: m.downloadsCount + 1 } : m))
    );
  };

  // Add review
  const handleAddReview = (
    matId: string, 
    rating: number, 
    comment: string, 
    difficulty: DifficultyLevel
  ) => {
    const newRev: Review = {
      id: `rev_${Date.now()}`,
      userName: currentUser.name,
      userRole: currentUser.role,
      campus: currentUser.campus.split(' ')[0],
      rating,
      comment,
      date: 'Baru saja',
      difficultyVote: difficulty,
    };

    setReviewsMap((prev) => ({
      ...prev,
      [matId]: [newRev, ...(prev[matId] || [])],
    }));

    setMaterials((prev) =>
      prev.map((m) => {
        if (m.id === matId) {
          const currentReviews = reviewsMap[matId] || [];
          const allRatings = [rating, ...currentReviews.map((r) => r.rating)];
          const newAvg = allRatings.reduce((a, b) => a + b, 0) / allRatings.length;
          return {
            ...m,
            rating: Number(newAvg.toFixed(1)),
            reviewsCount: m.reviewsCount + 1,
          };
        }
        return m;
      })
    );

    showToast('Terima kasih! Ulasan Anda berhasil diterbitkan.');
  };

  // Upload new material submit
  const handleUploadSubmit = (newMat: Material) => {
    setMaterials((prev) => [newMat, ...prev]);
    if (newMat.authorRole === 'dosen') {
      setDosenUser((prev) => ({
        ...prev,
        materialsShared: prev.materialsShared + 1,
      }));
    } else {
      setMahasiswaUser((prev) => ({
        ...prev,
        materialsShared: prev.materialsShared + 1,
      }));
    }
    showToast(newMat.price === 0 
      ? 'Materi Gratis berhasil dibagikan untuk mahasiswa!' 
      : `Materi berhasil dipasang dijual seharga Rp ${newMat.price.toLocaleString('id-ID')}!`
    );
    setSelectedMaterial(newMat);
  };

  // Lecturer payout
  const handleLecturerPayout = (amount: number) => {
    setDosenUser((prev) => ({
      ...prev,
      walletBalance: 0,
    }));
    showToast(`Penarikan dana Rp ${amount.toLocaleString('id-ID')} berhasil diproses!`);
  };

  // Filtered materials
  const filteredMaterials = useMemo(() => {
    return materials.filter((item) => {
      if (selectedCampus !== 'Semua Kampus' && item.campus !== selectedCampus) {
        return false;
      }
      if (selectedCategory !== 'Semua Kategori' && item.category !== selectedCategory) {
        return false;
      }
      if (selectedDifficulty !== 'Semua' && item.difficulty !== selectedDifficulty) {
        return false;
      }
      if (onlyDosenOfficial && !item.isOfficialDosen) {
        return false;
      }
      if (onlyFree && item.price !== 0) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchCourse = item.courseName.toLowerCase().includes(q);
        const matchAuthor = item.authorName.toLowerCase().includes(q);
        const matchCampus = item.campus.toLowerCase().includes(q);
        const matchTags = item.tags.some(t => t.toLowerCase().includes(q));
        if (!matchTitle && !matchCourse && !matchAuthor && !matchCampus && !matchTags) {
          return false;
        }
      }
      return true;
    });
  }, [materials, selectedCampus, selectedCategory, selectedDifficulty, onlyDosenOfficial, onlyFree, searchQuery]);

  // Featured Dosen Materials
  const featuredDosenMaterials = useMemo(() => {
    return materials.filter(m => m.isOfficialDosen);
  }, [materials]);

  // Purchased Materials for Koleksi
  const purchasedMaterials = useMemo(() => {
    return materials.filter(m => purchasedIds.includes(m.id) || m.price === 0);
  }, [materials, purchasedIds]);

  // Bookmarked Materials
  const bookmarkedMaterials = useMemo(() => {
    return materials.filter(m => bookmarkedIds.includes(m.id));
  }, [materials, bookmarkedIds]);

  return (
    <div className="min-h-screen bg-[#064E3B] flex flex-col items-center justify-start p-0 sm:p-4 text-[#14231B]">
      {/* Desktop Mode Toggle Bar */}
      <div className="w-full max-w-md hidden sm:flex items-center justify-between text-xs text-[#D1FAE5] py-2 px-1">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse"></span>
          <span className="font-bold text-white">CatatKampus (Tema Hijau)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#D1FAE5]/80">Tampilan:</span>
          <button
            onClick={() => setIsPhoneFrame(!isPhoneFrame)}
            className="px-2.5 py-1 bg-[#059669] hover:bg-[#047857] text-white rounded-lg border border-[#D1FAE5]/30 font-bold transition-colors"
          >
            {isPhoneFrame ? '📱 Smartphone Frame' : '🖥️ Layar Penuh'}
          </button>
        </div>
      </div>

      {/* Main Container / Mobile Device Simulation */}
      <div 
        className={`w-full bg-[#F4FBF7] min-h-screen flex flex-col transition-all relative ${
          isPhoneFrame 
            ? 'sm:max-w-md sm:min-h-[850px] sm:max-h-[92vh] sm:rounded-[44px] sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] sm:border-[10px] sm:border-[#022c22] overflow-hidden sm:my-auto' 
            : 'max-w-2xl'
        }`}
      >
        {/* App Header */}
        <Header
          currentRole={currentRole}
          onRoleChange={handleRoleChange}
          selectedCampus={selectedCampus}
          onCampusClick={() => setIsCampusModalOpen(true)}
          walletBalance={currentUser.walletBalance}
          subscriptionTier={mahasiswaUser.subscriptionTier}
          onOpenSubscriptionModal={handleOpenSubscriptionModal}
        />

        {/* Screen Content */}
        <main className="flex-1 overflow-y-auto pb-24 px-4 pt-3">
          
          {/* TAB 1: BERANDA */}
          {activeTab === 'beranda' && (
            <div className="space-y-4 animate-fadeIn">
              {/* Search Bar */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5B6B62]">
                  <IconSearch className="w-4 h-4 text-[#059669]" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari matkul, rangkuman, dosen..."
                  className="w-full pl-10 pr-10 py-2.5 text-xs bg-white rounded-2xl border border-[#D5E6DC] shadow-2xs focus:outline-hidden focus:border-[#059669] text-[#14231B] placeholder:text-[#5B6B62] transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#5B6B62] hover:text-[#14231B]"
                  >
                    <IconClose className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Quick Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('Semua Kategori');
                    setOnlyDosenOfficial(false);
                    setOnlyFree(false);
                  }}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                    selectedCategory === 'Semua Kategori' && !onlyDosenOfficial && !onlyFree
                      ? 'bg-[#059669] text-white shadow-xs'
                      : 'bg-white text-[#5B6B62] border border-[#D5E6DC] hover:bg-[#D1FAE5]/40'
                  }`}
                >
                  Semua
                </button>

                <button
                  type="button"
                  onClick={() => setOnlyDosenOfficial(!onlyDosenOfficial)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                    onlyDosenOfficial
                      ? 'bg-[#064E3B] text-white shadow-xs'
                      : 'bg-white text-[#064E3B] border border-[#D5E6DC] hover:bg-[#D1FAE5]/40'
                  }`}
                >
                  <IconBadgeCheck className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Materi Resmi Dosen</span>
                </button>

                <button
                  type="button"
                  onClick={() => setOnlyFree(!onlyFree)}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                    onlyFree
                      ? 'bg-[#16A34A] text-white shadow-xs'
                      : 'bg-white text-[#16A34A] border border-[#D5E6DC] hover:bg-[#D1FAE5]/40'
                  }`}
                >
                  Gratis
                </button>

                {CATEGORIES.filter(c => c !== 'Semua Kategori').map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat);
                      setOnlyDosenOfficial(false);
                    }}
                    className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? 'bg-[#059669] text-white font-bold shadow-xs'
                        : 'bg-white text-[#5B6B62] border border-[#D5E6DC] hover:bg-[#D1FAE5]/40'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Problem & Solution Feature Card (Tema Hijau Palette) */}
              <div className="bg-gradient-to-r from-[#059669] via-[#064E3B] to-[#0D9488] rounded-3xl p-4 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10 space-y-1.5">
                  <div className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider bg-white/20 text-[#D1FAE5] px-2 py-0.5 rounded-md backdrop-blur-xs">
                    <IconBadgeCheck className="w-3 h-3 text-[#F59E0B]" />
                    <span>Pasar Materi Terverifikasi</span>
                  </div>
                  <h2 className="text-sm font-extrabold leading-snug">
                    Rangkuman & Soal Ujian Kurasi Kampus
                  </h2>
                  <p className="text-[11px] text-[#D1FAE5] leading-relaxed">
                    Dapatkan catatan kuliah, kisi-kisi UTS/UAS, dan slide resmi dari dosen & mahasiswa berprestasi se-Indonesia.
                  </p>
                  
                  {/* Action button */}
                  <div className="pt-1 flex items-center gap-2">
                    {currentRole === 'dosen' ? (
                      <button
                        onClick={() => setIsUploadOpen(true)}
                        className="px-3.5 py-1.5 bg-white text-[#064E3B] font-bold text-xs rounded-xl shadow-xs hover:bg-[#D1FAE5] active:scale-95 transition-all"
                      >
                        + Beri atau Jual Materi Dosen
                      </button>
                    ) : (
                      <button
                        onClick={() => setActiveTab('jelajah')}
                        className="px-3.5 py-1.5 bg-white text-[#064E3B] font-bold text-xs rounded-xl shadow-xs hover:bg-[#D1FAE5] active:scale-95 transition-all"
                      >
                        Jelajahi Berdasarkan Matkul
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Subscription Access Showcase Banner (Basic vs Platinum) */}
              {currentRole === 'mahasiswa' && (
                <div className="bg-gradient-to-br from-[#064E3B] via-[#059669] to-[#047857] rounded-3xl p-4 text-white shadow-lg border border-[#D1FAE5]/30 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="p-1 rounded-lg bg-white/20 text-[#FEF3C7]">
                        <IconSparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#D1FAE5]">
                        Paket Akses Ujian Kampus
                      </span>
                    </div>
                    <span className="text-[10px] font-extrabold bg-[#FEF3C7] text-[#92400E] px-2 py-0.5 rounded-full shadow-2xs">
                      Mulai Rp 49.000
                    </span>
                  </div>

                  <h3 className="text-sm font-extrabold text-white leading-snug">
                    Pilih Paket Belajar: Basic vs Platinum
                  </h3>
                  <p className="text-[11px] text-[#D1FAE5] mt-1 leading-relaxed">
                    Akses bank soal dan catatan materi terlengkap untuk persiapan UTS, UAS, dan tugas kuliah:
                  </p>

                  {/* Side-by-side comparison cards */}
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {/* Basic Card */}
                    <div 
                      onClick={() => handleOpenSubscriptionModal('basic')}
                      className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl border border-white/20 cursor-pointer transition-all active:scale-95 text-left flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-1 text-[10px] font-bold text-[#D1FAE5]">
                          <IconZap className="w-3 h-3 text-[#F59E0B]" />
                          <span>Paket Basic</span>
                        </div>
                        <div className="text-sm font-black text-white mt-0.5">Rp 49.000</div>
                        <p className="text-[10px] text-[#D1FAE5]/90 mt-1 leading-tight">
                          Hanya mengakses bank soal latihan & kisi-kisi UTS/UAS.
                        </p>
                      </div>
                      <span className="mt-2 text-[10px] font-bold text-[#D1FAE5] underline">
                        Pilih Basic →
                      </span>
                    </div>

                    {/* Platinum Card */}
                    <div 
                      onClick={() => handleOpenSubscriptionModal('platinum')}
                      className="p-3 bg-gradient-to-br from-[#FEF3C7]/20 to-[#F59E0B]/25 hover:brightness-110 rounded-2xl border-2 border-[#F59E0B]/60 cursor-pointer transition-all active:scale-95 text-left flex flex-col justify-between relative shadow-xs"
                    >
                      <div>
                        <div className="flex items-center gap-1 text-[10px] font-bold text-[#FEF3C7]">
                          <IconCrown className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />
                          <span>Platinum Access</span>
                        </div>
                        <div className="text-sm font-black text-white mt-0.5">Rp 149.000</div>
                        <p className="text-[10px] text-[#D1FAE5]/90 mt-1 leading-tight">
                          Akses soal latihan + catatan materi & teori pembahasan lengkap.
                        </p>
                      </div>
                      <span className="mt-2 text-[10px] font-black text-[#FEF3C7] underline">
                        Paling Lengkap →
                      </span>
                    </div>
                  </div>

                  {/* Footer status */}
                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/15 text-[11px]">
                    <span className="text-[#D1FAE5]">
                      Status Anda: <strong className="text-white uppercase">{mahasiswaUser.subscriptionTier === 'platinum' ? '👑 Platinum VIP' : mahasiswaUser.subscriptionTier === 'basic' ? '⚡ Basic' : 'Gratis'}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleOpenSubscriptionModal('platinum')}
                      className="px-3 py-1 bg-white text-[#064E3B] font-extrabold text-[11px] rounded-xl hover:bg-[#D1FAE5] transition-all shadow-xs"
                    >
                      Bandingkan Benefit →
                    </button>
                  </div>
                </div>
              )}

              {/* Dosen Section Carousel */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs font-bold text-[#14231B]">
                      Materi Unggulan Dosen Terverifikasi
                    </h3>
                    <span className="p-0.5 bg-[#D1FAE5] text-[#064E3B] rounded-full">
                      <IconBadgeCheck className="w-3.5 h-3.5 text-[#16A34A]" />
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setOnlyDosenOfficial(true);
                      setActiveTab('jelajah');
                    }}
                    className="text-[11px] text-[#059669] font-bold hover:underline"
                  >
                    Lihat Semua
                  </button>
                </div>

                <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                  {featuredDosenMaterials.map((mat) => (
                    <div
                      key={mat.id}
                      onClick={() => setSelectedMaterial(mat)}
                      className="w-56 shrink-0 bg-white rounded-2xl p-3 border border-[#D5E6DC] shadow-xs hover:border-[#059669] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[9px] font-bold text-[#064E3B] bg-[#D1FAE5] px-1.5 py-0.5 rounded border border-[#059669]/30">
                            {mat.category}
                          </span>
                          <span className="text-[10px] font-bold text-[#F59E0B] flex items-center gap-0.5">
                            <IconStar className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" /> {mat.rating}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-[#14231B] line-clamp-2 leading-tight">
                          {mat.title}
                        </h4>
                        <p className="text-[10px] text-[#5B6B62] mt-1 truncate">
                          {mat.authorName}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 mt-2 border-t border-[#D5E6DC]">
                        <span className="text-[10px] text-[#5B6B62] font-medium">
                          {mat.pagesCount} Halaman
                        </span>
                        <span className="text-xs font-black text-[#B45309]">
                          {mat.price === 0 ? 'GRATIS' : `Rp ${mat.price.toLocaleString('id-ID')}`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Feed: All Notes List */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-[#14231B]">
                    Katalog Materi Belajar ({filteredMaterials.length})
                  </h3>
                  <span className="text-[11px] text-[#5B6B62] font-medium">
                    Tingkat Kesulitan Terverifikasi
                  </span>
                </div>

                {filteredMaterials.length === 0 ? (
                  <div className="p-8 text-center bg-white rounded-2xl border border-[#D5E6DC] space-y-2">
                    <IconFileText className="w-8 h-8 text-[#5B6B62] mx-auto opacity-40" />
                    <p className="text-xs font-bold text-[#14231B]">Tidak ada materi yang cocok</p>
                    <p className="text-[11px] text-[#5B6B62]">
                      Coba ganti kata kunci pencarian atau ubah filter kampus Anda.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {filteredMaterials.map((material) => (
                      <MaterialCard
                        key={material.id}
                        material={material}
                        isBookmarked={bookmarkedIds.includes(material.id)}
                        isPurchased={purchasedIds.includes(material.id)}
                        onSelect={setSelectedMaterial}
                        onToggleBookmark={handleToggleBookmark}
                        userSubscription={mahasiswaUser.subscriptionTier}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: JELAJAH */}
          {activeTab === 'jelajah' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-white p-3.5 rounded-2xl border border-[#D5E6DC] space-y-3">
                <h3 className="text-xs font-bold text-[#14231B] flex items-center gap-1.5">
                  <IconFilter className="w-4 h-4 text-[#059669]" />
                  <span>Filter Materi Berdasarkan Kampus & Matkul</span>
                </h3>

                {/* Kampus Selector */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#14231B]">Pilih Kampus / Universitas:</label>
                  <select
                    value={selectedCampus}
                    onChange={(e) => setSelectedCampus(e.target.value)}
                    className="w-full text-xs p-2 rounded-xl border border-[#D5E6DC] bg-[#F4FBF7] text-[#14231B] focus:outline-hidden focus:border-[#059669]"
                  >
                    {UNIVERSITIES.map((u) => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>

                {/* Kategori Selector */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#14231B]">Kategori Materi:</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full text-xs p-2 rounded-xl border border-[#D5E6DC] bg-[#F4FBF7] text-[#14231B] focus:outline-hidden focus:border-[#059669]"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Tingkat Kesulitan */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#14231B]">Tingkat Kesulitan Review:</label>
                  <div className="grid grid-cols-4 gap-1.5 text-xs">
                    {['Semua', 'Mudah', 'Menengah', 'Sulit'].map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setSelectedDifficulty(lvl)}
                        className={`py-1.5 font-bold rounded-lg border text-[11px] transition-all ${
                          selectedDifficulty === lvl
                            ? 'bg-[#059669] text-white border-[#059669]'
                            : 'bg-[#F4FBF7] text-[#5B6B62] border-[#D5E6DC]'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Toggles */}
                <div className="flex items-center justify-between pt-1">
                  <label className="text-xs font-semibold text-[#14231B] flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={onlyDosenOfficial}
                      onChange={(e) => setOnlyDosenOfficial(e.target.checked)}
                      className="rounded text-[#059669]"
                    />
                    <span>Khusus Materi Resmi Dosen</span>
                  </label>

                  <label className="text-xs font-semibold text-[#14231B] flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={onlyFree}
                      onChange={(e) => setOnlyFree(e.target.checked)}
                      className="rounded text-[#059669]"
                    />
                    <span>Hanya yang Gratis</span>
                  </label>
                </div>
              </div>

              {/* Results List */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-bold text-[#14231B]">
                    Hasil Pencarian ({filteredMaterials.length})
                  </span>
                  {(selectedCampus !== 'Semua Kampus' || selectedCategory !== 'Semua Kategori' || selectedDifficulty !== 'Semua') && (
                    <button
                      onClick={() => {
                        setSelectedCampus('Semua Kampus');
                        setSelectedCategory('Semua Kategori');
                        setSelectedDifficulty('Semua');
                        setOnlyDosenOfficial(false);
                        setOnlyFree(false);
                      }}
                      className="text-[11px] text-[#059669] font-bold hover:underline"
                    >
                      Reset Filter
                    </button>
                  )}
                </div>

                {filteredMaterials.map((material) => (
                  <MaterialCard
                    key={material.id}
                    material={material}
                    isBookmarked={bookmarkedIds.includes(material.id)}
                    isPurchased={purchasedIds.includes(material.id)}
                    onSelect={setSelectedMaterial}
                    onToggleBookmark={handleToggleBookmark}
                    userSubscription={mahasiswaUser.subscriptionTier}
                  />
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: UPLOAD */}
          {activeTab === 'upload' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 bg-white rounded-3xl border border-[#D5E6DC] text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-[#D1FAE5] text-[#064E3B] flex items-center justify-center mx-auto border border-[#059669]/30">
                  <IconFileText className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#14231B]">
                    {currentRole === 'dosen' ? 'Pusat Materi Pengajar Dosen' : 'Pasar Catatan Mahasiswa'}
                  </h3>
                  <p className="text-xs text-[#5B6B62] max-w-xs mx-auto mt-1">
                    {currentRole === 'dosen' 
                      ? 'Sebagai Dosen, Anda dapat membagikan materi pengajaran gratis atau menjual bahan ajar eksklusif kepada mahasiswa.'
                      : 'Unggah catatan tulisan tangan atau rangkuman ujian Anda untuk membantu mahasiswa lain dan peroleh royalti penjualan.'}
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setIsUploadOpen(true)}
                    className="w-full py-3.5 px-4 rounded-2xl bg-[#059669] hover:bg-[#064E3B] text-white font-bold text-xs transition-all shadow-md shadow-[#059669]/30 active:scale-95"
                  >
                    {currentRole === 'dosen' ? '+ Unggah Materi Resmi Dosen' : '+ Jual / Bagikan Catatan Kuliah'}
                  </button>
                </div>
              </div>

              {/* Role Tips Box */}
              <div className="p-4 bg-[#D1FAE5]/60 rounded-3xl border border-[#059669]/30 text-xs space-y-2">
                <h4 className="font-bold text-[#064E3B] flex items-center gap-1.5">
                  <IconBadgeCheck className="w-4 h-4 text-[#16A34A]" />
                  <span>Ketentuan Kurasi CatatKampus</span>
                </h4>
                <ul className="list-disc list-inside space-y-1 text-[#14231B] text-[11px] leading-relaxed">
                  <li><strong>Dosen:</strong> Materi langsung berstatus <em>Terverifikasi NIDN</em>. Pendapatan penjualan 100% masuk ke dompet Anda.</li>
                  <li><strong>Mahasiswa:</strong> Catatan diperiksa tim kurasi agar rapi, terbaca jelas, dan sesuai silabus.</li>
                  <li><strong>Transparansi:</strong> Review kualitas dan voting tingkat kesulitan dinilai secara langsung oleh pembaca.</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 4: KOLEKSI SAYA */}
          {activeTab === 'koleksi' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-[#14231B]">
                  Materi Saya & Disimpan
                </h3>
                <span className="text-[11px] text-[#059669] font-bold">
                  {purchasedMaterials.length} Materi Terbuka
                </span>
              </div>

              {/* Sub tabs inside Koleksi */}
              <div className="space-y-3">
                <h4 className="text-[11px] font-bold text-[#5B6B62] uppercase tracking-wider px-1">
                  Materi Terbeli & Terunduh
                </h4>
                {purchasedMaterials.length === 0 ? (
                  <div className="p-6 text-center bg-white rounded-2xl border border-[#D5E6DC] text-xs text-[#5B6B62]">
                    Belum ada materi yang dibeli.
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {purchasedMaterials.map((mat) => (
                      <MaterialCard
                        key={mat.id}
                        material={mat}
                        isBookmarked={bookmarkedIds.includes(mat.id)}
                        isPurchased={true}
                        onSelect={setSelectedMaterial}
                        onToggleBookmark={handleToggleBookmark}
                        userSubscription={mahasiswaUser.subscriptionTier}
                      />
                    ))}
                  </div>
                )}

                <h4 className="text-[11px] font-bold text-[#5B6B62] uppercase tracking-wider px-1 pt-2">
                  Bookmark Tersimpan ({bookmarkedMaterials.length})
                </h4>
                {bookmarkedMaterials.length === 0 ? (
                  <div className="p-6 text-center bg-white rounded-2xl border border-[#D5E6DC] text-xs text-[#5B6B62]">
                    Belum ada bookmark.
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {bookmarkedMaterials.map((mat) => (
                      <MaterialCard
                        key={mat.id}
                        material={mat}
                        isBookmarked={true}
                        isPurchased={purchasedIds.includes(mat.id)}
                        onSelect={setSelectedMaterial}
                        onToggleBookmark={handleToggleBookmark}
                        userSubscription={mahasiswaUser.subscriptionTier}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: PROFIL */}
          {activeTab === 'profil' && (
            <div className="space-y-4 animate-fadeIn">
              {currentRole === 'dosen' ? (
                <LecturerDashboard
                  currentUser={dosenUser}
                  materials={materials}
                  onOpenUpload={() => setIsUploadOpen(true)}
                  onSelectMaterial={setSelectedMaterial}
                  onPayout={handleLecturerPayout}
                />
              ) : (
                <div className="space-y-4 pb-20">
                  <div className="bg-white rounded-3xl p-5 border border-[#D5E6DC] shadow-sm flex items-center gap-3.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={mahasiswaUser.avatar}
                      alt={mahasiswaUser.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-[#D5E6DC]"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-[#14231B]">{mahasiswaUser.name}</h3>
                      <p className="text-xs text-[#5B6B62]">{mahasiswaUser.studyProgram}</p>
                      <p className="text-[11px] text-[#059669] font-bold">{mahasiswaUser.campus}</p>
                      <span className="inline-block mt-1 text-[10px] font-bold text-[#064E3B] bg-[#D1FAE5] px-2 py-0.5 rounded border border-[#059669]/30">
                        {mahasiswaUser.nidnOrNim} (Mahasiswa Aktif)
                      </span>
                    </div>
                  </div>

                  {/* Student Subscription Plan Status Card */}
                  <div className={`rounded-3xl p-4 border transition-all ${
                    mahasiswaUser.subscriptionTier === 'platinum'
                      ? 'bg-gradient-to-br from-[#FEF3C7]/80 via-white to-[#FEF3C7]/40 border-[#F59E0B] shadow-md ring-2 ring-[#F59E0B]/20'
                      : mahasiswaUser.subscriptionTier === 'basic'
                      ? 'bg-gradient-to-br from-[#D1FAE5]/70 via-white to-[#D1FAE5]/30 border-[#059669] shadow-sm'
                      : 'bg-white border-[#D5E6DC] shadow-xs'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        {mahasiswaUser.subscriptionTier === 'platinum' ? (
                          <div className="p-1 rounded-lg bg-[#FEF3C7] text-[#B45309]">
                            <IconCrown className="w-4 h-4 fill-[#F59E0B]" />
                          </div>
                        ) : mahasiswaUser.subscriptionTier === 'basic' ? (
                          <div className="p-1 rounded-lg bg-[#D1FAE5] text-[#064E3B]">
                            <IconZap className="w-4 h-4 text-[#059669]" />
                          </div>
                        ) : (
                          <div className="p-1 rounded-lg bg-gray-100 text-[#5B6B62]">
                            <IconSparkles className="w-4 h-4 text-[#F59E0B]" />
                          </div>
                        )}
                        <span className="text-xs font-extrabold text-[#14231B]">
                          Paket Akses Ujian Anda
                        </span>
                      </div>

                      <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        mahasiswaUser.subscriptionTier === 'platinum'
                          ? 'bg-[#FEF3C7] text-[#92400E] border border-[#F59E0B]/40'
                          : mahasiswaUser.subscriptionTier === 'basic'
                          ? 'bg-[#D1FAE5] text-[#064E3B] border border-[#059669]/40'
                          : 'bg-gray-100 text-[#5B6B62]'
                      }`}>
                        {mahasiswaUser.subscriptionTier === 'platinum' ? '👑 Platinum VIP' : mahasiswaUser.subscriptionTier === 'basic' ? '⚡ Basic (49rb)' : 'Gratis'}
                      </span>
                    </div>

                    <p className="text-xs text-[#5B6B62] leading-relaxed">
                      {mahasiswaUser.subscriptionTier === 'platinum' && 'Akses Tanpa Batas ke seluruh Bank Soal Latihan BESERTA Catatan Materi & Teori Dosen resmi.'}
                      {mahasiswaUser.subscriptionTier === 'basic' && 'Akses Penuh ke seluruh Bank Soal Latihan & UTS/UAS. (Catatan materi teori butuh Platinum Access).'}
                      {(!mahasiswaUser.subscriptionTier || mahasiswaUser.subscriptionTier === 'free') && 'Saat ini Anda berada di akun Standar (Gratis). Pilih paket Basic atau Platinum untuk membuka materi ujian.'}
                    </p>

                    {/* Features checklist pill */}
                    <div className="mt-3 p-2.5 bg-[#F4FBF7] rounded-2xl border border-[#D5E6DC] text-[11px] space-y-1">
                      <div className="flex items-center justify-between text-[#14231B]">
                        <span>Akses Bank Soal Latihan & UTS/UAS:</span>
                        <strong className={mahasiswaUser.subscriptionTier === 'free' ? 'text-[#DC2626]' : 'text-[#16A34A]'}>
                          {mahasiswaUser.subscriptionTier === 'free' ? 'Terbatas (Sample)' : 'Aktif (Full) ✓'}
                        </strong>
                      </div>
                      <div className="flex items-center justify-between text-[#14231B]">
                        <span>Catatan Materi & Teori Konsep Soal:</span>
                        <strong className={mahasiswaUser.subscriptionTier === 'platinum' ? 'text-[#16A34A]' : 'text-[#DC2626]'}>
                          {mahasiswaUser.subscriptionTier === 'platinum' ? 'Aktif (Full) ✓' : 'Terkunci 🔒'}
                        </strong>
                      </div>
                    </div>

                    {/* Quick Upgrade/Change button */}
                    <div className="mt-3 pt-2 border-t border-black/5 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenSubscriptionModal('platinum')}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-[#064E3B] hover:bg-[#059669] text-white font-extrabold text-xs transition-all shadow-xs flex items-center justify-center gap-1.5 active:scale-95"
                      >
                        <IconCrown className="w-3.5 h-3.5 fill-[#F59E0B]" />
                        <span>{mahasiswaUser.subscriptionTier === 'free' ? 'Buka Paket Belajar (49rb / 149rb)' : 'Ganti / Upgrade Paket'}</span>
                      </button>
                    </div>

                    {/* Tester pill quick switcher */}
                    <div className="mt-2.5 pt-2 border-t border-dashed border-[#D5E6DC] flex items-center justify-between text-[10px]">
                      <span className="text-[#5B6B62] font-semibold">Simulasi Akun:</span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleSelectSubscriptionPlan('free')}
                          className={`px-2 py-0.5 rounded font-bold border transition-colors ${
                            mahasiswaUser.subscriptionTier === 'free' ? 'bg-[#14231B] text-white' : 'bg-white text-[#5B6B62]'
                          }`}
                        >
                          Gratis
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSelectSubscriptionPlan('basic')}
                          className={`px-2 py-0.5 rounded font-bold border transition-colors ${
                            mahasiswaUser.subscriptionTier === 'basic' ? 'bg-[#059669] text-white' : 'bg-white text-[#064E3B]'
                          }`}
                        >
                          ⚡ Basic
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSelectSubscriptionPlan('platinum')}
                          className={`px-2 py-0.5 rounded font-bold border transition-colors ${
                            mahasiswaUser.subscriptionTier === 'platinum' ? 'bg-[#B45309] text-white' : 'bg-white text-[#92400E]'
                          }`}
                        >
                          👑 Platinum
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Student Wallet */}
                  <div className="bg-gradient-to-r from-[#059669] to-[#064E3B] rounded-3xl p-4 text-white shadow-md flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-[#D1FAE5] flex items-center gap-1">
                        <IconWallet className="w-3.5 h-3.5 text-[#F59E0B]" /> Saldo CatatKampus
                      </span>
                      <div className="text-xl font-black mt-0.5">
                        Rp {mahasiswaUser.walletBalance.toLocaleString('id-ID')}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setMahasiswaUser(prev => ({ ...prev, walletBalance: prev.walletBalance + 50000 }));
                        showToast('Top Up Saldo Mahasiswa Rp 50.000 Berhasil!');
                      }}
                      className="px-3 py-1.5 bg-white text-[#064E3B] font-bold text-xs rounded-xl shadow-xs hover:bg-[#D1FAE5] active:scale-95 transition-all"
                    >
                      + Top Up
                    </button>
                  </div>

                  {/* Role Switcher prompt */}
                  <div className="p-4 bg-[#F4FBF7] rounded-3xl border border-[#D5E6DC] space-y-2">
                    <h4 className="text-xs font-bold text-[#064E3B]">
                      Apakah Anda Pengajar / Dosen?
                    </h4>
                    <p className="text-[11px] text-[#5B6B62] leading-relaxed">
                      Beralih ke akun Dosen untuk mengunggah modul kuliah resmi, membagikan silabus gratis, atau menjual latihan soal ujian.
                    </p>
                    <button
                      onClick={() => handleRoleChange('dosen')}
                      className="w-full py-2.5 px-3 bg-[#064E3B] hover:bg-[#059669] text-white rounded-xl text-xs font-bold transition-colors"
                    >
                      Beralih ke Mode Dosen
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </main>

        {/* Bottom Navigation */}
        <BottomNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          currentRole={currentRole}
          savedCount={bookmarkedIds.length}
        />

        {/* Detail Modal */}
        <MaterialDetailModal
          material={selectedMaterial}
          onClose={() => setSelectedMaterial(null)}
          isBookmarked={selectedMaterial ? bookmarkedIds.includes(selectedMaterial.id) : false}
          isPurchased={selectedMaterial ? purchasedIds.includes(selectedMaterial.id) : false}
          onToggleBookmark={handleToggleBookmark}
          onBuyClick={handleBuyClick}
          onDownloadClick={handleDownloadClick}
          reviews={selectedMaterial ? (reviewsMap[selectedMaterial.id] || []) : []}
          onAddReview={handleAddReview}
          userRole={currentRole}
          userSubscription={mahasiswaUser.subscriptionTier}
          onOpenSubscriptionModal={handleOpenSubscriptionModal}
        />

        {/* Upload Material Modal */}
        <UploadMaterialModal
          isOpen={isUploadOpen}
          onClose={() => setIsUploadOpen(false)}
          onSubmit={handleUploadSubmit}
          currentUser={currentUser}
        />

        {/* Checkout Modal */}
        <CheckoutModal
          material={checkoutMaterial}
          currentUser={currentUser}
          onClose={() => setCheckoutMaterial(null)}
          onSuccess={handlePurchaseSuccess}
          onDownloadRealPdf={handleDownloadClick}
        />

        {/* Subscription Packages Modal */}
        <SubscriptionModal
          isOpen={isSubscriptionOpen}
          onClose={() => setIsSubscriptionOpen(false)}
          currentUser={currentUser}
          onSelectPlan={handleSelectSubscriptionPlan}
          preselectedTier={subscriptionPreselectedTier}
        />

        {/* Campus Selector Quick Dialog */}
        {isCampusModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
            <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-[#D5E6DC] space-y-3">
              <div className="flex items-center justify-between border-b border-[#D5E6DC] pb-2">
                <h4 className="text-xs font-bold text-[#14231B]">Pilih Kampus Anda</h4>
                <button
                  onClick={() => setIsCampusModalOpen(false)}
                  className="p-1 rounded-full text-[#5B6B62] hover:text-[#14231B]"
                >
                  <IconClose className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1.5 max-h-60 overflow-y-auto">
                {UNIVERSITIES.map((uni) => (
                  <button
                    key={uni}
                    onClick={() => {
                      setSelectedCampus(uni);
                      setIsCampusModalOpen(false);
                      showToast(`Kampus diubah ke: ${uni}`);
                    }}
                    className={`w-full p-2.5 text-xs text-left rounded-xl transition-all flex items-center justify-between ${
                      selectedCampus === uni
                        ? 'bg-[#D1FAE5] text-[#064E3B] font-bold border border-[#059669]/40'
                        : 'hover:bg-[#F4FBF7] text-[#5B6B62]'
                    }`}
                  >
                    <span>{uni}</span>
                    {selectedCampus === uni && <IconCheck className="w-4 h-4 text-[#16A34A]" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Toast Feedback */}
        {toastMessage && (
          <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 max-w-xs px-4 py-2 bg-[#064E3B] text-white text-xs font-bold rounded-2xl shadow-lg backdrop-blur-sm border border-[#D1FAE5]/30 animate-fadeIn text-center">
            {toastMessage}
          </div>
        )}
      </div>
    </div>
  );
}
