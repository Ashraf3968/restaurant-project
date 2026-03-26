'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRestaurant } from '@/components/providers/restaurant-provider';

export function SiteFooter() {
  const { addMessage, state } = useRestaurant();
  const [feedback, setFeedback] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    addMessage({
      type: 'Newsletter',
      name: 'Newsletter Lead',
      email: String(formData.get('email') || ''),
      phone: '-',
      subject: 'Newsletter signup',
      message: 'Requested to receive seasonal menus and event updates.'
    });
    event.currentTarget.reset();
    setFeedback('Subscribed to seasonal menus and event updates.');
  };

  return (
    <footer className="border-t border-white/10 bg-black/40 py-16">
      <div className="mx-auto grid w-[min(1180px,calc(100vw-1.5rem))] gap-10 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <div className="grid gap-0.5">
            <span className="font-display text-xl tracking-[0.08em] text-white">Aurelio House</span>
            <span className="text-[10px] uppercase tracking-[0.28em] text-champagne">Waterfront dining</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-mist">{state.content.footerNote}</p>
          <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
            <input name="email" type="email" required placeholder="Join the guest list" className="min-h-12 flex-1 rounded-full border border-white/10 bg-white/5 px-4 text-sm text-white outline-none" />
            <button className="min-h-12 rounded-full bg-gradient-to-br from-[#f0cb86] to-bronze px-5 text-sm font-semibold text-obsidian">Subscribe</button>
          </form>
          <p className="mt-2 text-sm text-champagne">{feedback}</p>
        </div>
        <div className="grid gap-2 text-sm text-mist">
          <span className="text-[11px] uppercase tracking-[0.28em] text-champagne">Quick links</span>
          <Link href="/menu">Seasonal menu</Link>
          <Link href="/reservation">Reservations</Link>
          <Link href="/contact">Private dining</Link>
          <Link href="/privacy">Privacy policy</Link>
          <Link href="/terms">Terms & conditions</Link>
        </div>
        <div className="space-y-2 text-sm text-mist">
          <span className="text-[11px] uppercase tracking-[0.28em] text-champagne">Contact</span>
          <p>48 Harbour Crescent, Marine District, Mumbai</p>
          <p>+91 22 6800 2148</p>
          <p>{state.content.supportEmail}</p>
          <p>Online orders available soon.</p>
        </div>
        <div className="space-y-2 text-sm text-mist">
          <span className="text-[11px] uppercase tracking-[0.28em] text-champagne">Opening hours</span>
          <p>Mon - Thu: 5:30 PM - 11:00 PM</p>
          <p>Fri - Sat: 12:30 PM - 3:00 PM, 5:30 PM - 12:00 AM</p>
          <p>Sun: 12:30 PM - 10:30 PM</p>
        </div>
      </div>
      <div className="mx-auto mt-8 w-[min(1180px,calc(100vw-1.5rem))] text-sm text-mist">© 2026 Aurelio House. Crafted as a premium portfolio demo.</div>
    </footer>
  );
}

