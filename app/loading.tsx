import { Shell, Section } from '@/components/ui/primitives';

export default function Loading() {
  return (
    <main>
      <Section>
        <Shell>
          <div className="grid gap-6">
            <div className="h-6 w-36 animate-pulse rounded-full bg-white/10" />
            <div className="h-20 w-full max-w-3xl animate-pulse rounded-[28px] bg-white/10" />
            <div className="grid gap-5 md:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-72 animate-pulse rounded-[28px] border border-white/10 bg-white/5" />
              ))}
            </div>
          </div>
        </Shell>
      </Section>
    </main>
  );
}

