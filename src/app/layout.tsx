import { Montserrat } from 'next/font/google';
import Script from 'next/script';

import type { Metadata } from 'next';

import './globals.css';

const inter = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Smart app',
  description: 'Landing and smart form',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <Script async src="https://js.stripe.com/v3/pricing-table.js" />
    </html>
  );
}
