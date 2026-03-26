import Link from 'next/link';
import { Section, Shell } from '@/components/ui/primitives';

export default function NotFound() {
  return (
    <main>
      <Section>
        <Shell className="grid gap-6 text-center">
          <p className="text-[11px] uppercase tracking-[0.28em] text-champagne">404</p>
          <h1 className="font-display text-5xl">The page you requested is not set for service.</h1>
          <p className="mx-auto max-w-2xl text-mist">The route may have moved or does not exist in this demo build.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/" className="inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-br from-[#f0cb86] to-bronze px-6 text-sm font-semibold text-obsidian">Return Home</Link>
            <Link href="/reservation" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/10 px-6 text-sm font-semibold text-white">Make A Reservation</Link>
          </div>
        </Shell>
      </Section>
    </main>
  );
}

