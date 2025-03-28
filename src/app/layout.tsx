import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Народне иницијативе - Упутство за подношење',
  icons: {
    icon: "/favicon.svg",
  },
  description: 'Веб апликација за помоћ грађанима у подношењу националних иницијатива. Укључује генератор докумената, упутство за дигитално потписивање и помоћ у подношењу иницијативе општини.',
  keywords: 'народне иницијативе, грађанске иницијативе, дигитално потписивање, општина, документи, Србија',
  authors: [{ name: 'Грађанске иницијативе' }],
  openGraph: {
    title: 'Народне иницијативе - Упутство за подношење',
    description: 'Веб апликација за помоћ грађанима у подношењу националних иницијатива. Укључује генератор докумената, упутство за дигитално потписивање и помоћ у подношењу иницијативе општини.',
    type: 'website',
    locale: 'sr_RS',
    siteName: 'Народне иницијативе',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Народне иницијативе - Упутство за подношење',
    description: 'Веб апликација за помоћ грађанима у подношењу националних иницијатива. Укључује генератор докумената, упутство за дигитално потписивање и помоћ у подношењу иницијативе општини.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification', // Add your Google site verification code
  },
  alternates: {
    canonical: 'https://narodne-inicijative.rs', // Add your actual domain
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
