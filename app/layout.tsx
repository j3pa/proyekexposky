import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CatatKampus — Pasar Materi Belajar Terverifikasi",
  description: "Platform berbagi dan menjual materi belajar, rangkuman, latihan soal, dan slide dosen resmi terverifikasi kampus se-Indonesia.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="h-full antialiased">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script src="https://cdn.tailwindcss.com"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                theme: {
                  extend: {
                    colors: {
                      brand: {
                        primary: '#059669',     // Hijau Emerald
                        dark: '#064E3B',        // Hijau Hutan
                        light: '#D1FAE5',       // Hijau Mint
                        bg: '#F4FBF7',          // Hijau Pucat
                        surface: '#FFFFFF',     // Putih
                        border: '#D5E6DC',      // Garis border
                        accent: '#F59E0B',      // Kuning Amber
                        teal: '#0D9488',        // Teal aksen sekunder
                        success: '#16A34A',     // Hijau verifikasi
                        warning: '#D97706',     // Peringatan / pending
                        error: '#DC2626',       // Error / ditolak
                        info: '#0284C7',        // Info
                        text: '#14231B',        // Teks utama
                        muted: '#5B6B62',       // Teks sekunder
                      }
                    },
                    fontFamily: {
                      sans: ['"Plus Jakarta Sans"', 'sans-serif'],
                      mono: ['"JetBrains Mono"', 'monospace'],
                    }
                  }
                }
              }
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#064E3B] m-0 p-0 text-[#14231B]">
        {children}
      </body>
    </html>
  );
}
