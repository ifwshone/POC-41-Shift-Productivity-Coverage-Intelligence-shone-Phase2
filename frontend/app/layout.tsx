import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, DM_Sans, DM_Mono } from 'next/font/google';

// Characterful display face for headings and big numbers
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
});

// Clean, friendly body face
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
});

// Mono for labels and telemetry
const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
});

export const metadata: Metadata = {
  title: 'Shift Productivity & Coverage | Real Rails',
  description: 'Real-Time Operational Intelligence',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#04100b',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${bricolage.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}