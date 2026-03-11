import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'VoxCenter AI - The AI Call Center That Actually Works',
    description: 'Built from 2,000+ competitor complaints. Sub-300ms latency, zero hallucinations, transparent pricing.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
          <html lang="en">
                <body className={inter.className}>{children}</body>body>
          </html>html>
        );
}</html>
