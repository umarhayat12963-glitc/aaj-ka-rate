import type { Metadata } from 'next';
import './globals.css';
import React from 'react';

export const metadata: Metadata = {
  title: 'Aaj Ka Rate Pakistan - Petrol, Dollar, Sona, Sabzi Rate Today',
  description: 'Aaj Ka Rate: Pakistan ke rozana petrol, diesel, sona, chandi, dollar, karyana aur Lahore sarkari sabzi aur phal ke rate. Asan Roman Urdu me, slow network par bhi tez.',
  openGraph: { title: 'Aaj Ka Rate Pakistan', description: 'Rozana petrol, dollar, sona, karyana aur Lahore sabzi/phal ke rate.' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // AdSense site-verification code: the script is rendered on every
  // page when NEXT_PUBLIC_ADSENSE_CLIENT_ID is set in Vercel env
  // vars. The ID itself is never hard-coded in the repo; it comes
  // only from the environment, and it becomes visible in page
  // source by design (that is how AdSense verification works).
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  return (
    <html lang="ur">
      <head>
        {adsenseClient ? (
          <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`} crossOrigin="anonymous" />
        ) : null}
      </head>
      <body>{children}</body>
    </html>
  );
}
