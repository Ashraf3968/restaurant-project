'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { useRestaurant } from '@/components/providers/restaurant-provider';
import { Card, Eyebrow, Section, Shell } from '@/components/ui/primitives';

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useRestaurant();
  const [feedback, setFeedback] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main>
      <Section className="pt-24"><Shell className="grid gap-8 lg:grid-cols-2"><Card className="min-h-[620px] bg-[linear-gradient(145deg,rgba(226,192,137,0.16),transparent_45%),linear-gradient(135deg,#231913_0%,#11141a_100%)] p-10"><Eyebrow>Membership</Eyebrow><h1 className="mt-4 max-w-md font-display text-5xl leading-none">Create your Aurelio House profile.</h1><p className="mt-5 max-w-md text-lg text-mist">Members receive faster booking, early access to seasonal experiences, and a cleaner reservation flow for returning visits.</p><div className="mt-10 grid gap-4">{['Priority reservation alerts','Private dining updates','Seasonal menu and cellar previews'].map((item) => <Card key={item} className="p-5"><p className="text-sm text-mist">{item}</p></Card>)}</div></Card><Card className="p-8"><Eyebrow>Sign up</Eyebrow><h2 className="mt-3 font-display text-4xl">Join the guest list.</h2><form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={(event) => { event.preventDefault(); const formData = new FormData(event.currentTarget); const result = signup({ firstName: String(formData.get('firstName') || ''), lastName: String(formData.get('lastName') || ''), email: String(formData.get('email') || ''), phone: String(formData.get('phone') || ''), password: String(formData.get('password') || '') }); setFeedback(result.message); if (result.ok) window.setTimeout(() => router.push('/reservation'), 700); }}><label className="grid gap-2 text-sm text-mist">First name<input name="firstName" required className="min-h-12 rounded-2xl border border-white/10 bg-white/5 px-4 text-white" /></label><label className="grid gap-2 text-sm text-mist">Last name<input name="lastName" required className="min-h-12 rounded-2xl border border-white/10 bg-white/5 px-4 text-white" /></label><label className="grid gap-2 text-sm text-mist md:col-span-2">Email<input type="email" name="email" required className="min-h-12 rounded-2xl border border-white/10 bg-white/5 px-4 text-white" /></label><label className="grid gap-2 text-sm text-mist md:col-span-2">Phone<input name="phone" required className="min-h-12 rounded-2xl border border-white/10 bg-white/5 px-4 text-white" /></label><label className="grid gap-2 text-sm text-mist md:col-span-2">Password<div className="relative"><input type={showPassword ? 'text' : 'password'} name="password" minLength={8} required className="min-h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 pr-16 text-white" /><button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-4 top-3 text-sm text-champagne">{showPassword ? 'Hide' : 'Show'}</button></div></label><div className="md:col-span-2"><button className="inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-br from-[#f0cb86] to-bronze px-6 text-sm font-semibold text-obsidian">Create Account</button></div></form><p className="mt-4 text-sm text-champagne">{feedback}</p><Link href="/login" className="mt-4 inline-block text-sm text-mist">Already registered? <span className="text-champagne">Log in</span></Link></Card></Shell></Section>
    </main>
  );
}

