import { Card, Eyebrow, Section, Shell } from '@/components/ui/primitives';

export default function TermsPage() {
  return (
    <main>
      <Section className="pt-24"><Shell className="space-y-6"><Eyebrow>Terms</Eyebrow><h1 className="font-display text-5xl">Reservation and guest service terms placeholder for the showcase project.</h1><p className="max-w-3xl text-lg text-mist">This page is included to present a complete, agency-ready website structure and can be replaced with final legal copy later.</p><Card className="space-y-6 p-7"><div><h2 className="font-display text-3xl">Reservations</h2><p className="mt-3 text-mist">Confirmed reservations may be subject to seating windows, cancellation policies, and late arrival handling.</p></div><div><h2 className="font-display text-3xl">Private events</h2><p className="mt-3 text-mist">Private dining proposals, deposits, and event service terms are confirmed individually with the guest team.</p></div><div><h2 className="font-display text-3xl">Website usage</h2><p className="mt-3 text-mist">Content on this demo site is presented for portfolio and showcase purposes and can be adapted for live deployment.</p></div></Card></Shell></Section>
    </main>
  );
}

