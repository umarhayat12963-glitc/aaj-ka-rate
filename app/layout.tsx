import type { Metadata } from 'next';
import './globals.css';
import React from 'react';

export const metadata: Metadata = {
  title: 'Aaj Ka Rate Pakistan - Petrol, Dollar, Sona, Sabzi Rate Today',
  description: 'Aaj Ka Rate: Pakistan ke rozana petrol, diesel, sona, chandi, dollar, karyana aur Lahore sarkari sabzi aur phal ke rate. Asan Roman Urdu me, slow network par bhi tez.',
  openGraph: { title: 'Aaj Ka Rate Pakistan', description: 'Rozana petrol, dollar, sona, karyana aur Lahore sabzi/phal ke rate.' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ur">
      <body>{children}</body>
    </html>
  );
}
