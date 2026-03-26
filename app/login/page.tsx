'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { useRestaurant } from '@/components/providers/restaurant-provider';
import { ADMIN_CREDENTIALS } from '@/lib/data';
import { Card, Eyebrow, Section, Shell } from '@/components/ui/primitives';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useRestaurant();
  const [feedback, setFeedback] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main>
      <Section className="pt-24"><Shell className="grid gap-8 lg:grid-cols-2"><Card className="min-h-[620px] bg-[linear-gradient(145deg,rgba(226,192,137,0.16),transparent_45%),linear-gradient(135deg,#231913_0%,#11141a_100%)] p-10"><Eyebrow>Guest access</Eyebrow><h1 className="mt-4 max-w-md font-display text-5xl leading-none">Join the house list for reservations, offers, and priority nights.</h1><p className="mt-5 max-w-md text-lg text-mist">Create an account to manage upcoming bookings, review your dining history, and access members-only experiences.</p><Card className="mt-10 p-6"><Eyebrow>Admin demo login</Eyebrow><div className="mt-4 space-y-2 text-sm text-mist"><p>Email: {ADMIN_CREDENTIALS.email}</p><p>Password: {ADMIN_CREDENTIALS.password}</p></div><Link href="/admin" className="mt-4 inline-block text-sm font-semibold text-champagne">Open admin panel</Link></Card></Card><Card className="p-8"><Eyebrow>Login</Eyebrow><h2 className="mt-3 font-display text-4xl">Welcome back.</h2><form className="mt-6 grid gap-4" onSubmit={(event) => { event.preventDefault(); const formData = new FormData(event.currentTarget); const result = login(String(formData.get('email') || ''), String(formData.get('password') || ''), Boolean(formData.get('remember'))); setFeedback(result.message); if (result.ok) window.setTimeout(() => router.push(result.user?.role === 'admin' ? '/admin' : '/reservation'), 600); }}><label className="grid gap-2 text-sm text-mist">Email<input type="email" name="email" required className="min-h-12 rounded-2xl border border-white/10 bg-white/5 px-4 text-white" /></label><label className="grid gap-2 text-sm text-mist">Password<div className="relative"><input type={showPassword ? 'text' : 'password'} name="password" required className="min-h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 pr-16 text-white" /><button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-4 top-3 text-sm text-champagne">{showPassword ? 'Hide' : 'Show'}</button></div></label><label className="flex items-center gap-3 text-sm text-mist"><input type="checkbox" name="remember" className="h-4 w-4" />Remember me</label><button className="inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-br from-[#f0cb86] to-bronze px-6 text-sm font-semibold text-obsidian">Login</button><button type="button" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/10 px-6 text-sm text-white">Continue with Google</button><button type="button" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/10 px-6 text-sm text-white">Continue with Apple</button><Link href="/signup" className="text-sm text-mist">Need an account? <span className="text-champagne">Sign up</span></Link><button type="button" onClick={() => setFeedback('Demo reset link sent. In production, this would trigger email recovery.')} className="text-left text-sm text-mist">Forgot password?</button></form><p className="mt-4 text-sm text-champagne">{feedback}</p></Card></Shell></Section>
    </main>
  );
}

