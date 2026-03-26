'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRestaurant } from '@/components/providers/restaurant-provider';
import { Card, Eyebrow, PrimaryButton, SecondaryButton, Section, Shell } from '@/components/ui/primitives';
import { faqItems, galleryItems, socialItems } from '@/lib/data';
import { formatCurrency, stars } from '@/lib/utils';

export default function HomePage() {
  const { addReview, hydrated, state } = useRestaurant();
  const [feedback, setFeedback] = useState('');
  const approvedReviews = state.reviews.filter((review) => review.approved).slice(0, 3);
  const featuredDishes = state.menuItems.filter((item) => item.popular).slice(0, 3);
  const chefSpecials = state.menuItems.filter((item) => item.tags.includes('Chef recommended') || item.category === 'Special Dishes').slice(0, 3);

  return (
    <main>
      <section className="relative overflow-hidden border-b border-white/10 bg-[linear-gradient(120deg,rgba(10,10,12,0.95)_12%,rgba(10,10,12,0.62)_48%,rgba(10,10,12,0.82)_100%),radial-gradient(circle_at_80%_18%,rgba(226,192,137,0.2),transparent_16%),linear-gradient(135deg,#1a140f_0%,#090a0f_45%,#12131a_100%)] py-28 md:py-36">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(10,10,12,0.45)_100%)]" />
        <Shell className="relative grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <Eyebrow>Waterfront dining. Curated evenings.</Eyebrow>
            <h1 className="max-w-[10ch] font-display text-5xl leading-none md:text-7xl">{state.content.heroTitle}</h1>
            <p className="max-w-2xl text-lg text-mist">Aurelio House blends open-fire cuisine, cellar-led pairings, and intimate service into a restaurant experience designed to feel timeless.</p>
            <div className="flex flex-wrap gap-4">
              <PrimaryButton href="/reservation">Reserve A Table</PrimaryButton>
              <SecondaryButton href="/menu">Explore The Menu</SecondaryButton>
              <SecondaryButton href="/contact">Online Order CTA</SecondaryButton>
            </div>
            <div className="grid gap-4 pt-6 md:grid-cols-3">
              {[
                ['4.9/5', 'Guest satisfaction'],
                ['12+', 'Seasonal tasting rotations'],
                ['Private', 'Dining & event suites']
              ].map(([stat, label]) => (
                <div key={label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div className="text-2xl font-semibold text-white">{stat}</div>
                  <div className="text-sm text-mist">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <Card className="p-7">
            <Eyebrow>Tonight&apos;s note</Eyebrow>
            <h2 className="mt-3 font-display text-4xl">{state.content.urgencyText}</h2>
            <p className="mt-4 text-mist">The chef&apos;s black truffle degustation and reserve pairing is nearly sold out for the 8:30 PM seating.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <span className="rounded-full border border-champagne/20 bg-champagne/10 px-4 py-2 text-sm">Chef&apos;s tasting</span>
              <span className="rounded-full border border-champagne/20 bg-champagne/10 px-4 py-2 text-sm">Live jazz at 9 PM</span>
            </div>
            <Link href="/reservation" className="mt-5 inline-block text-sm font-semibold text-champagne">Secure your table</Link>
          </Card>
        </Shell>
      </section>

      <Section>
        <Shell className="grid gap-6 rounded-[32px] border border-white/10 bg-white/5 p-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <Eyebrow>Seasonal indulgence</Eyebrow>
            <h2 className="mt-3 font-display text-4xl">{state.content.promoText}</h2>
          </div>
          <PrimaryButton href="/reservation">Request Invitation</PrimaryButton>
        </Shell>
      </Section>

      <Section>
        <Shell>
          <div className="mb-8 space-y-3"><Eyebrow>Featured dishes</Eyebrow><h2 className="font-display text-4xl">Signature plates composed with precision and restraint.</h2></div>
          <div className="grid gap-5 md:grid-cols-3">{featuredDishes.map((item) => <Card key={item.id} className="p-6"><Eyebrow>{item.category}</Eyebrow><div className="mt-4 flex items-start justify-between gap-4"><h3 className="text-xl font-semibold">{item.name}</h3><span className="text-champagne">{formatCurrency(item.price)}</span></div><p className="mt-3 text-sm text-mist">{item.description}</p><div className="mt-4 flex flex-wrap gap-2">{item.tags.map((tag) => <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-mist">{tag}</span>)}</div></Card>)}</div>
        </Shell>
      </Section>

      <Section className="bg-black/30">
        <Shell className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-5"><Eyebrow>The house</Eyebrow><h2 className="font-display text-4xl">A destination crafted for conversations, celebrations, and unhurried dining.</h2><p className="text-mist">From the bronze-lit bar to the oak-lined dining salon, every room is designed to feel warm, cinematic, and unmistakably premium.</p><div className="grid gap-4">{['Open-fire kitchen', 'Private dining suites'].map((title) => <Card key={title} className="p-5"><h3 className="text-xl font-semibold">{title}</h3><p className="mt-2 text-sm text-mist">{title === 'Open-fire kitchen' ? 'Charcoal, citrus smoke, and restrained technique shape the menu\'s signature flavor profile.' : 'Tailored tasting menus, sommelier service, and event curation for intimate occasions.'}</p></Card>)}</div></div>
          <div className="grid gap-4 md:grid-cols-2"><div className="min-h-[420px] rounded-[28px] border border-white/10 bg-[linear-gradient(145deg,rgba(226,192,137,0.14),transparent_45%),linear-gradient(135deg,#231913_0%,#11141a_100%)]" /><div className="grid gap-4"><div className="min-h-[200px] rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,#0f1218_0%,#2c2019_100%)]" /><div className="min-h-[200px] rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,#241c16_0%,#3d3026_100%)]" /></div></div>
        </Shell>
      </Section>

      <Section>
        <Shell className="grid gap-5 md:grid-cols-4">{[
          ['Season-led menus', 'Produce-forward plates refined weekly around market availability and pairing depth.'],
          ['Sommelier curation', 'Old-world classics and boutique finds selected to elevate each course.'],
          ['Private experiences', 'Chef\'s table, executive dinners, anniversaries, and celebratory hosting with tailored service.'],
          ['Attentive hospitality', 'Measured pacing, polished service, and discreet details that build trust.']
        ].map(([title, copy], index) => <Card key={title} className="p-6"><div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-champagne/10 text-champagne">0{index + 1}</div><h3 className="text-xl font-semibold">{title}</h3><p className="mt-2 text-sm text-mist">{copy}</p></Card>)}</Shell>
      </Section>

      <Section>
        <Shell>
          <Card className="grid gap-8 p-7 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div><Eyebrow>Aurelio story</Eyebrow><h2 className="mt-3 font-display text-4xl">See the rhythm of the kitchen, the room, and the evening unfold.</h2><p className="mt-4 text-mist">Take a short look at our tasting service, open-fire finishes, and private dining atmosphere.</p></div>
            <a href="https://www.youtube.com/watch?v=T4SimnaiktU" target="_blank" className="grid min-h-[320px] place-items-center rounded-[24px] border border-white/10 bg-[linear-gradient(145deg,rgba(226,192,137,0.16),transparent_45%),linear-gradient(135deg,#231913_0%,#11141a_100%)]" rel="noreferrer"><div className="grid place-items-center"><div className="grid h-24 w-24 place-items-center rounded-full border border-white/15 bg-white/10 text-3xl">?</div><span className="mt-4 text-sm font-semibold text-champagne">Play brand film</span></div></a>
          </Card>
        </Shell>
      </Section>

      <Section className="bg-white/5">
        <Shell>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div className="space-y-3"><Eyebrow>Guest reviews</Eyebrow><h2 className="font-display text-4xl">Trusted by celebratory diners, business hosts, and returning regulars.</h2></div>{!hydrated && <span className="text-sm text-mist">Loading reviews...</span>}</div>
          <div className="grid gap-5 md:grid-cols-3">{approvedReviews.map((review) => <Card key={review.id} className="p-6"><div className="text-champagne">{stars(review.rating)}</div><p className="mt-4 text-mist">{review.comment}</p><div className="mt-5 flex items-center gap-3"><div className="grid h-12 w-12 place-items-center rounded-full bg-champagne/10 text-sm font-semibold text-champagne">{review.avatar || review.name.slice(0, 2).toUpperCase()}</div><div><div className="font-semibold">{review.name}</div><div className="text-sm text-mist">Verified guest</div></div></div></Card>)}</div>
          <Card className="mt-8 p-6">
            <Eyebrow>Submit a review</Eyebrow>
            <ReviewForm onSubmit={(formData) => {
              addReview(formData);
              setFeedback('Review submitted for admin approval.');
            }} />
            <p className="mt-3 text-sm text-champagne">{feedback}</p>
          </Card>
        </Shell>
      </Section>

      <Section>
        <Shell>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div className="space-y-3"><Eyebrow>Gallery preview</Eyebrow><h2 className="font-display text-4xl">Designed to feel cinematic from every angle.</h2></div><Link href="/about" className="text-sm font-semibold text-champagne">Explore the brand story</Link></div>
          <div className="grid gap-5 md:grid-cols-4">{galleryItems.slice(0, 4).map((item) => <Card key={item} className="flex min-h-[250px] items-end p-5 bg-[linear-gradient(145deg,rgba(226,192,137,0.14),transparent_45%),linear-gradient(135deg,#101319_0%,#2a1d16_100%)]"><div><Eyebrow>Gallery</Eyebrow><div className="mt-2 font-display text-2xl">{item}</div></div></Card>)}</div>
        </Shell>
      </Section>

      <Section className="bg-black/30">
        <Shell className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-5"><Eyebrow>Chef highlight</Eyebrow><h2 className="font-display text-4xl">Led by chef-founder Luca Moretti.</h2><p className="text-mist">Known for translating European restraint into ingredient-led plates, Chef Luca&apos;s menus balance fire, acidity, and texture with precision.</p><SecondaryButton href="/about">Meet the team</SecondaryButton></div>
          <Card className="p-8"><Eyebrow>Featured in Gourmet Ledger</Eyebrow><h3 className="mt-4 text-2xl font-semibold">Chef&apos;s notes</h3><p className="mt-3 text-mist">Luxury should never feel loud. It should feel inevitable.</p></Card>
        </Shell>
      </Section>

      <Section>
        <Shell>
          <div className="mb-8 space-y-3"><Eyebrow>Chef specials</Eyebrow><h2 className="font-display text-4xl">Rotating favorites from the pass.</h2></div>
          <div className="grid gap-5 md:grid-cols-3">{chefSpecials.map((item) => <Card key={item.id} className="p-6"><Eyebrow>Chef special</Eyebrow><h3 className="mt-3 text-xl font-semibold">{item.name}</h3><p className="mt-3 text-sm text-mist">{item.description}</p><div className="mt-4 text-champagne">{formatCurrency(item.price)}</div></Card>)}</div>
        </Shell>
      </Section>

      <Section className="bg-white/5">
        <Shell className="grid gap-5 md:grid-cols-3">{[
          ['Private dining', 'Events with tailored hosting', 'For board dinners, anniversaries, or press tastings, our team curates memorable hospitality end to end.'],
          ['Loyalty circle', 'Membership for returning guests', 'Priority access to special menus, cellar nights, chef previews, and invitation-only seasonal events.'],
          ['Gift cards', 'Elegant dining, gifted well', 'Offer a refined evening out with digital gift cards suitable for celebrations and thoughtful thank-yous.']
        ].map(([eyebrow, title, copy]) => <Card key={title} className="p-6"><Eyebrow>{eyebrow}</Eyebrow><h3 className="mt-3 text-2xl font-semibold">{title}</h3><p className="mt-3 text-mist">{copy}</p></Card>)}</Shell>
      </Section>

      <Section>
        <Shell className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-5"><Eyebrow>Instagram moments</Eyebrow><h2 className="font-display text-4xl">An editorial-style social presence anchored in ambience.</h2><p className="text-mist">Discover candlelit tables, final plating touches, and private dining setups guests love to share.</p></div>
          <div className="grid gap-4 md:grid-cols-3">{socialItems.map((item) => <Card key={item.caption} className="min-h-[180px] p-5"><Eyebrow>{item.title}</Eyebrow><h3 className="mt-3 text-lg font-semibold">{item.caption}</h3></Card>)}</div>
        </Shell>
      </Section>

      <Section className="bg-black/30">
        <Shell className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4"><Eyebrow>FAQ</Eyebrow><h2 className="font-display text-4xl">Helpful answers before your visit.</h2><div className="grid gap-4">{faqItems.map((item) => <Card key={item.question} className="p-5"><h3 className="text-lg font-semibold">{item.question}</h3><p className="mt-2 text-sm text-mist">{item.answer}</p></Card>)}</div></div>
          <Card className="p-7"><Eyebrow>Reservation concierge</Eyebrow><h3 className="mt-3 text-3xl font-semibold">Need a private dining package or special arrangement?</h3><p className="mt-4 text-mist">Our guest team can coordinate birthdays, business hosting, dietary planning, and intimate event setups.</p><div className="mt-6 flex flex-wrap gap-4"><PrimaryButton href="/reservation">Book A Table</PrimaryButton><SecondaryButton href="/contact">Plan An Event</SecondaryButton></div></Card>
        </Shell>
      </Section>
    </main>
  );
}

function ReviewForm({ onSubmit }: { onSubmit: (payload: { name: string; rating: number; comment: string; avatar?: string; photo?: string }) => void }) {
  return (
    <form className="mt-5 grid gap-4 md:grid-cols-2" onSubmit={(event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      onSubmit({
        name: String(formData.get('name') || ''),
        rating: Number(formData.get('rating')),
        comment: String(formData.get('comment') || ''),
        avatar: String(formData.get('avatar') || '').toUpperCase(),
        photo: String(formData.get('photo') || '')
      });
      event.currentTarget.reset();
    }}>
      <label className="grid gap-2 text-sm text-mist">Name<input name="name" required className="min-h-12 rounded-2xl border border-white/10 bg-white/5 px-4 text-white" /></label>
      <label className="grid gap-2 text-sm text-mist">Rating<select name="rating" required className="min-h-12 rounded-2xl border border-white/10 bg-night px-4 text-white"><option value="">Select rating</option><option value="5">5 stars</option><option value="4">4 stars</option><option value="3">3 stars</option></select></label>
      <label className="grid gap-2 text-sm text-mist">Avatar initials<input name="avatar" maxLength={2} className="min-h-12 rounded-2xl border border-white/10 bg-white/5 px-4 text-white" /></label>
      <label className="grid gap-2 text-sm text-mist">Photo URL (optional)<input name="photo" type="url" className="min-h-12 rounded-2xl border border-white/10 bg-white/5 px-4 text-white" /></label>
      <label className="grid gap-2 text-sm text-mist md:col-span-2">Comment<textarea name="comment" required rows={4} className="rounded-[24px] border border-white/10 bg-white/5 px-4 py-3 text-white" /></label>
      <div className="md:col-span-2"><button className="inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-br from-[#f0cb86] to-bronze px-6 text-sm font-semibold text-obsidian">Submit Review</button></div>
    </form>
  );
}

