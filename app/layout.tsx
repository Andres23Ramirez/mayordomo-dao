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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
