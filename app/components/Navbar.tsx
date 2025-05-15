'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { address } = useAccount();

  // Get user initials from address if available
  const userInitials = address ? `${address.slice(2, 4)}` : '';

  return (
    <nav className="bg-colombia-green shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold">
              <span className="text-colombia-yellow">Mayor</span>
              <span className="text-background">domo</span>
            </span>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-background hover:text-colombia-yellow focus:outline-none focus:text-colombia-yellow"
            >
              <span className="sr-only">Open menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-background hover:text-colombia-yellow transition-colors duration-300"
            >
              Inicio
            </Link>
            <Link
              href="/proyectos"
              className="text-background hover:text-colombia-yellow transition-colors duration-300"
            >
              Proyectos
            </Link>
            <Link
              href="/nosotros"
              className="text-background hover:text-colombia-yellow transition-colors duration-300"
            >
              Nosotros
            </Link>
            <Link
              href="/contacto"
              className="text-background hover:text-colombia-yellow transition-colors duration-300"
            >
              Contacto
            </Link>
          </div>

          {/* User controls */}
          <div className="hidden md:flex items-center space-x-4">
            {address ? (
              <div className="bg-colombia-yellow text-colombia-green w-8 h-8 rounded-full flex items-center justify-center font-semibold">
                {userInitials}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <span className="text-background text-base">
                  Conecta tu wallet para crear un proyecto
                </span>
                <ConnectButton />
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-background hover:text-colombia-yellow transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                href="/proyectos"
                className="text-background hover:text-colombia-yellow transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Proyectos
              </Link>
              <Link
                href="/nosotros"
                className="text-background hover:text-colombia-yellow transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Nosotros
              </Link>
              <Link
                href="/contacto"
                className="text-background hover:text-colombia-yellow transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
              <div className="pt-4">
                {address ? (
                  <div className="bg-colombia-yellow text-colombia-green w-8 h-8 rounded-full flex items-center justify-center font-semibold">
                    {userInitials}
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <span className="text-background text-base">
                      Conecta tu wallet para crear un proyecto
                    </span>
                    <ConnectButton />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 