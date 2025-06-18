import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import '@rainbow-me/rainbowkit/styles.css';

export const metadata: Metadata = {
  title: 'Mayordomo DAO',
  description: 'Conectando agricultores con inversionistas para un futuro más sostenible',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div className="w-full bg-yellow-300 text-[#2C2A29] font-bold text-center py-3 px-4 border-b-2 border-yellow-500 shadow-md z-50">
          ⚠️ This is a test project on Base Sepolia. Do not invest real funds—funds may be lost. Use only test ETH.
        </div>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
