'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { PrimaryButton, SecondaryButton, Section, Shell } from '@/components/ui/primitives';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main>
      <Section>
        <Shell className="grid gap-6 text-center">
          <p className="text-[11px] uppercase tracking-[0.28em] text-champagne">Something went wrong</p>
          <h1 className="font-display text-5xl">We hit an unexpected issue while preparing the experience.</h1>
          <p className="mx-auto max-w-2xl text-mist">Use the fallback actions below to continue browsing the demo or retry the current page.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={reset} className="inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-br from-[#f0cb86] to-bronze px-6 text-sm font-semibold text-obsidian">Try Again</button>
            <Link href="/" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/10 px-6 text-sm font-semibold text-white">Back Home</Link>
          </div>
        </Shell>
      </Section>
    </main>
  );
}

