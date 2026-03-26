'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { navLinks } from '@/lib/data';
import { cn } from '@/lib/utils';

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#09090c]/80 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[78px] w-[min(1180px,calc(100vw-1.5rem))] items-center justify-between gap-6">
        <Link href="/" className="grid gap-0.5">
          <span className="font-display text-xl tracking-[0.08em] text-white">Aurelio House</span>
          <span className="text-[10px] uppercase tracking-[0.28em] text-champagne">Fine Dining & Private Rooms</span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={cn('text-sm text-mist transition hover:text-champagne', pathname === link.href && 'text-white')}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/login" className="rounded-full border border-white/10 px-5 py-3 text-sm text-white">Guest Access</Link>
          <Link href="/reservation" className="rounded-full bg-gradient-to-br from-[#f0cb86] to-bronze px-5 py-3 text-sm font-semibold text-obsidian">Reserve</Link>
        </div>

        <button onClick={() => setOpen((value) => !value)} className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 lg:hidden">
          Menu
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 lg:hidden">
          <div className="mx-auto grid w-[min(1180px,calc(100vw-1.5rem))] gap-4 py-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-sm text-mist transition hover:text-champagne">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

