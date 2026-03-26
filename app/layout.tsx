import type { Metadata } from 'next';
import './globals.css';
import { RestaurantProvider } from '@/components/providers/restaurant-provider';
import { SiteHeader } from '@/components/site/site-header';
import { SiteFooter } from '@/components/site/site-footer';

export const metadata: Metadata = {
  title: 'Aurelio House | Premium Restaurant Demo',
  description: 'A luxury multi-page restaurant website and admin dashboard built as a polished client showcase.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <RestaurantProvider>
          <div className="relative min-h-screen">
            <SiteHeader />
            {children}
            <SiteFooter />
          </div>
        </RestaurantProvider>
      </body>
    </html>
  );
}

