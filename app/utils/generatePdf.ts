import { Material, UserProfile } from '../types';

export function downloadRealMaterialPdf(material: Material, currentUser: UserProfile) {
  const transactionId = `CK-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const dateStr = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const jsPDFClass = typeof window !== 'undefined' ? (window as any).jspdf?.jsPDF : null;

  if (jsPDFClass) {
    try {
      const doc = new jsPDFClass({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 15;
      const contentWidth = pageWidth - margin * 2;

      // --- HALAMAN 1: COVER & LEMBAR RESMI ---
      // Header Green Ribbon
      doc.setFillColor(5, 150, 105); // Hijau Emerald #059669
      doc.rect(0, 0, pageWidth, 28, 'F');

      doc.setFillColor(6, 78, 59); // Hijau Hutan #064E3B
      doc.rect(0, 26, pageWidth, 4, 'F');

      // Header Text
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text('CATATKAMPUS', margin, 12);

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text('Pasar Materi Belajar & Modul Kuliah Terverifikasi', margin, 18);

      doc.setFillColor(209, 250, 229); // Hijau Mint
      doc.roundedRect(pageWidth - margin - 35, 7, 35, 12, 2, 2, 'F');
      doc.setTextColor(6, 78, 59);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.text('TERVERIFIKASI', pageWidth - margin - 31, 14.5);

      // Metadata Box
      let y = 42;
      doc.setTextColor(20, 35, 27); // #14231B
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      
      const splitTitle = doc.splitTextToSize(material.title, contentWidth);
      doc.text(splitTitle, margin, y);
      y += splitTitle.length * 7 + 4;

      // Meta Details Pill
      doc.setFillColor(244, 251, 247); // #F4FBF7
      doc.setDrawColor(213, 230, 220); // #D5E6DC
      doc.roundedRect(margin, y, contentWidth, 34, 3, 3, 'FD');

      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(5, 150, 105);
      doc.text(`MATA KULIAH: ${material.courseName.toUpperCase()}`, margin + 5, y + 8);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(91, 107, 98); // #5B6B62
      doc.text(`Kampus: ${material.campus}`, margin + 5, y + 14);
      doc.text(`Fakultas / Prodi: ${material.faculty} • ${material.studyProgram}`, margin + 5, y + 20);
      doc.text(`Semester: ${material.semester}  |  Kategori: ${material.category}  |  Total: ${material.pagesCount} Halaman`, margin + 5, y + 26);
      doc.text(`Tingkat Kesulitan: ${material.difficulty} (Review Mahasiswa ⭐ ${material.rating.toFixed(1)}/5.0)`, margin + 5, y + 31);

      y += 44;

      // Lisensi Pembeli & Penulis Box
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(5, 150, 105);
      doc.roundedRect(margin, y, contentWidth, 26, 2, 2, 'D');

      doc.setFontSize(8.5);
      doc.setTextColor(6, 78, 59);
      doc.setFont('helvetica', 'bold');
      doc.text('BUKTI KEPEMILIKAN & LISENSI RESMI:', margin + 4, y + 6);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(20, 35, 27);
      doc.text(`Penulis / Pengunggah : ${material.authorName} (${material.authorTitle || material.campus})`, margin + 4, y + 12);
      doc.text(`Lisensi Pengunduh   : ${currentUser.name} (${currentUser.nidnOrNim} - ${currentUser.campus})`, margin + 4, y + 17);
      doc.text(`ID Transaksi / Hash : ${transactionId}  |  Tanggal Unduh: ${dateStr}`, margin + 4, y + 22);

      y += 36;

      // Deskripsi Materi
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(6, 78, 59);
      doc.text('RINGKASAN & SILABUS MATERI:', margin, y);
      y += 6;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(20, 35, 27);
      const splitDesc = doc.splitTextToSize(material.description, contentWidth);
      doc.text(splitDesc, margin, y);
      y += splitDesc.length * 5 + 8;

      // Sample Content / Bab 1
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(6, 78, 59);
      doc.text('BAGIAN 1: RANGKUMAN INTI & TEORI DASAR', margin, y);
      y += 6;

      doc.setFont('courier', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(20, 35, 27);
      const page1Text = material.previewPages[0] || '1. Konsep Utama\n2. Teorema dan Rumus Pokok\n3. Latihan Soal Ujian';
      const splitP1 = doc.splitTextToSize(page1Text, contentWidth);
      doc.text(splitP1, margin, y);

      // Footer Page 1
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8);
      doc.setTextColor(91, 107, 98);
      doc.text(`CatatKampus Verified Document • ${material.title} • Halaman 1 dari 2`, margin, pageHeight - 10);

      // --- HALAMAN 2: PEMBAHASAN MENDALAM & SOAL LATIHAN ---
      doc.addPage();

      // Mini Header
      doc.setFillColor(5, 150, 105);
      doc.rect(0, 0, pageWidth, 12, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.text(`CATATKAMPUS MODUL — ${material.courseName.toUpperCase()}`, margin, 8);

      y = 22;
      doc.setTextColor(6, 78, 59);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('BAGIAN 2: STUDI KASUS, CONTOH SOAL & PEMBAHASAN LENGKAP', margin, y);
      y += 8;

      doc.setFont('courier', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(20, 35, 27);
      const page2Text = material.previewPages[1] || (
        'STUDI KASUS & LATIHAN SOAL UTS / UAS:\n\n' +
        'Soal 1: Analisis Kebutuhan Sistem & Kompleksitas Solusi\n' +
        '• Penjelasan langkah pengerjaan sistematis sesuai kurikulum universitas.\n' +
        '• Kunci jawaban dan rumus optimasi.\n\n' +
        'Soal 2: Implementasi Praktis & Penerapan Lapangan\n' +
        '• Studi kasus industri dan panduan interpretasi hasil evaluasi.\n' +
        '• Tips menghadapi ujian: perhatikan pembuktian teorema kunci.'
      );
      const splitP2 = doc.splitTextToSize(page2Text, contentWidth);
      doc.text(splitP2, margin, y);
      y += splitP2.length * 5 + 12;

      // Panduan Belajar Mandiri
      doc.setFillColor(244, 251, 247);
      doc.setDrawColor(213, 230, 220);
      doc.roundedRect(margin, y, contentWidth, 32, 2, 2, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(6, 78, 59);
      doc.text('TIPS BELAJAR DARI PENULIS:', margin + 5, y + 7);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(91, 107, 98);
      doc.text('1. Pahami konsep dasar sebelum mengerjakan variasi soal tingkat menengah.', margin + 5, y + 14);
      doc.text('2. Catat formula dan mnemonik kunci pada lembar ringkasan mandiri.', margin + 5, y + 20);
      doc.text('3. Gunakan bank soal di modul ini untuk simulasi ujian berbatas waktu.', margin + 5, y + 26);

      // Verification Watermark Box
      y += 42;
      doc.setFillColor(209, 250, 229);
      doc.setDrawColor(5, 150, 105);
      doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(5, 150, 105);
      doc.text('STATUS DOKUMEN: RESMI & TERKURASI (100% BEBAS PLAGIASI)', margin + 5, y + 8);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(6, 78, 59);
      doc.text(`Dokumen ini diverifikasi oleh sistem CatatKampus untuk keperluan belajar akademik.`, margin + 5, y + 14);
      doc.text(`Kode Keamanan Berkas: ${transactionId} • Diunduh secara sah oleh ${currentUser.name}`, margin + 5, y + 19);

      // Footer Page 2
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8);
      doc.setTextColor(91, 107, 98);
      doc.text(`CatatKampus Verified Document • ${material.title} • Halaman 2 dari 2`, margin, pageHeight - 10);

      // Save PDF file
      const safeFilename = `CatatKampus_${material.courseName.replace(/[^a-zA-Z0-9]/g, '_')}_${material.id}.pdf`;
      doc.save(safeFilename);
      return true;
    } catch (err) {
      console.error('jsPDF generation error:', err);
    }
  }

  // Fallback: Generate real PDF Blob directly if jsPDF is unavailable
  generateNativePdfBlob(material, currentUser, transactionId, dateStr);
  return true;
}

// Native valid PDF 1.4 minimal binary generator (guaranteed real .pdf download)
function generateNativePdfBlob(material: Material, currentUser: UserProfile, txId: string, dateStr: string) {
  const content = 
`%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length 500 >>
stream
BT
/F1 18 Tf
50 780 Td
(CATATKAMPUS - MODUL BELAJAR TERVERIFIKASI) Tj
/F1 12 Tf
0 -30 Td
(${material.title.replace(/[()]/g, '')}) Tj
0 -20 Td
(Mata Kuliah: ${material.courseName.replace(/[()]/g, '')}) Tj
0 -18 Td
(Kampus: ${material.campus.replace(/[()]/g, '')}) Tj
0 -18 Td
(Penulis: ${material.authorName.replace(/[()]/g, '')}) Tj
0 -18 Td
(Pembeli: ${currentUser.name.replace(/[()]/g, '')} - ${currentUser.nidnOrNim}) Tj
0 -18 Td
(ID Transaksi: ${txId} | Tanggal: ${dateStr}) Tj
0 -35 Td
(ISI RINGKASAN MODUL:) Tj
/F1 10 Tf
0 -20 Td
(${((material.previewPages[0] || '').slice(0, 100)).replace(/[\r\n]/g, ' ').replace(/[()]/g, '')}) Tj
0 -30 Td
(Status: 100% Terverifikasi Kurasi Kampus) Tj
ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000060 00000 n 
0000000120 00000 n 
0000000240 00000 n 
0000000790 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
860
%%EOF`;

  const blob = new Blob([content], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `CatatKampus_${material.courseName.replace(/[^a-zA-Z0-9]/g, '_')}_${material.id}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
