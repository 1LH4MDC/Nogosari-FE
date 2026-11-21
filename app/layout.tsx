import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar, Footer, SmoothScrollProvider } from "@/components";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://desanogosari.web.id";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Desa Nogosari Tanggap Bencana",
    template: "%s | Desa Nogosari",
  },
  description:
    "Mewujudkan desa cerdas berwawasan lingkungan melalui kolaborasi dan teknologi. Sistem Informasi dan Monitoring Ketinggian Air Sungai Desa Nogosari.",
  keywords: [
    "Desa Nogosari",
    "Nogosari Tanggap Bencana",
    "DESTANA Nogosari",
    "Monitoring Banjir Nogosari",
    "PPK Ormawa BEM FKM UNEJ",
    "Sistem Informasi Desa Nogosari",
  ],
  authors: [{ name: "PPK Ormawa BEM FKM Universitas Jember" }],
  openGraph: {
    title: "Desa Nogosari Tanggap Bencana",
    description:
      "Sistem Informasi Desa dan Monitoring Ketinggian Air Sungai Berbasis IoT Desa Nogosari.",
    url: siteUrl,
    siteName: "Desa Nogosari",
    locale: "id_ID",
    type: "website",
  },
  icons: {
    icon: "/logo.webp",
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col font-sans" suppressHydrationWarning>
        <SmoothScrollProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
