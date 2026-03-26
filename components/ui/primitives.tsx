import Link from 'next/link';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Section({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={cn('py-20 md:py-24', className)}>{children}</section>;
}

export function Shell({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={cn('mx-auto w-[min(1180px,calc(100vw-1.5rem))]', className)}>{children}</div>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="text-[11px] uppercase tracking-[0.28em] text-champagne">{children}</span>;
}

export function PrimaryButton({ href, children, type = 'button', onClick }: { href?: string; children: ReactNode; type?: 'button' | 'submit'; onClick?: () => void }) {
  const classes = 'inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-br from-[#f0cb86] to-bronze px-6 text-sm font-semibold text-obsidian transition hover:-translate-y-0.5';
  if (href) return <Link href={href} className={classes}>{children}</Link>;
  return <button type={type} onClick={onClick} className={classes}>{children}</button>;
}

export function SecondaryButton({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/10 px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-champagne/40">{children}</Link>;
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={cn('rounded-[28px] border border-white/10 bg-white/5 shadow-luxe backdrop-blur', className)}>{children}</div>;
}

