import { Card, Eyebrow, Section, Shell } from '@/components/ui/primitives';

export default function PrivacyPage() {
  return (
    <main>
      <Section className="pt-24"><Shell className="space-y-6"><Eyebrow>Privacy policy</Eyebrow><h1 className="font-display text-5xl">Privacy terms placeholder for client demo purposes.</h1><p className="max-w-3xl text-lg text-mist">This page demonstrates a production-style legal layout and can be replaced with the final restaurant policy before launch.</p><Card className="space-y-6 p-7"><div><h2 className="font-display text-3xl">Information we collect</h2><p className="mt-3 text-mist">Reservation details, contact submissions, newsletter signups, and account profile information are collected to support the guest experience.</p></div><div><h2 className="font-display text-3xl">How we use information</h2><p className="mt-3 text-mist">Data is used for booking confirmations, guest communication, service planning, and client relationship management.</p></div><div><h2 className="font-display text-3xl">Retention and rights</h2><p className="mt-3 text-mist">Guests may request updates or deletion of personal data, subject to operational record-keeping needs.</p></div></Card></Shell></Section>
    </main>
  );
}

