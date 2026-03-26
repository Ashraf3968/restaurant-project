'use client';

import { useMemo, useState } from 'react';
import { useRestaurant } from '@/components/providers/restaurant-provider';
import { Card, Eyebrow, Section, Shell } from '@/components/ui/primitives';
import { formatCurrency } from '@/lib/utils';

export default function MenuPage() {
  const { hydrated, state } = useRestaurant();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const categories = ['All', ...new Set(state.menuItems.map((item) => item.category))];
  const items = useMemo(() => state.menuItems.filter((item) => {
    const categoryMatch = category === 'All' || item.category === category;
    const haystack = `${item.name} ${item.description} ${item.tags.join(' ')} ${item.dietary.join(' ')}`.toLowerCase();
    const queryMatch = !query || haystack.includes(query.toLowerCase());
    return categoryMatch && queryMatch;
  }), [category, query, state.menuItems]);

  return (
    <main>
      <Section className="border-b border-white/10 bg-black/30 pt-24"><Shell className="space-y-5"><Eyebrow>Seasonal Menu</Eyebrow><h1 className="max-w-4xl font-display text-5xl leading-none md:text-7xl">Refined plates built around fire, acidity, and market-led produce.</h1><p className="max-w-3xl text-lg text-mist">Search the menu, browse by course, and discover chef-recommended dishes curated for elegant dining.</p></Shell></Section>
      <Section><Shell><div className="grid gap-4"><div className="grid gap-4 lg:grid-cols-[1fr_auto]"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search dishes, ingredients, or tags" className="min-h-14 rounded-[20px] border border-white/10 bg-white/5 px-5 text-white" /><div className="flex flex-wrap gap-3">{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`rounded-full border px-4 py-3 text-sm ${category === item ? 'border-champagne bg-champagne text-obsidian' : 'border-white/10 bg-white/5 text-white'}`}>{item}</button>)}</div></div>{!hydrated ? <div className="grid gap-5 md:grid-cols-3">{Array.from({ length: 6 }).map((_, index) => <div key={index} className="h-72 animate-pulse rounded-[28px] border border-white/10 bg-white/5" />)}</div> : <div className="grid gap-5 md:grid-cols-3">{items.map((item) => <Card key={item.id} className="p-6"><div className="flex items-start justify-between gap-4"><div><Eyebrow>{item.category}</Eyebrow><h3 className="mt-3 text-xl font-semibold">{item.name}</h3></div><span className="text-champagne">{formatCurrency(item.price)}</span></div><p className="mt-3 text-sm text-mist">{item.description}</p><div className="mt-4 flex flex-wrap gap-2">{item.popular && <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs text-emerald-300">Popular</span>}{item.tags.map((tag) => <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-mist">{tag}</span>)}{item.dietary.map((tag) => <span key={tag} className="rounded-full border border-champagne/15 bg-champagne/10 px-3 py-1 text-xs text-champagne">{tag}</span>)}</div></Card>)}</div>}</div></Shell></Section>
    </main>
  );
}

