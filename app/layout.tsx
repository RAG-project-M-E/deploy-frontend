import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import '../styles/globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from 'sonner';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { ChatWidget } from '@/components/chat-widget';
import { ScrollToTopButton } from '@/components/scroll-to-top';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'LexDanisman | Yapay Zeka Hukuk Asistanı',
  description: 'Hukuki sorularınız için 7/24 Türkçe AI Danışman.',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://lexdanisman.com',
    title: 'LexDanisman | Yapay Zeka Hukuk Asistanı',
    description: 'Hukuki sorularınız için güncel mevzuatla eğitilmiş Türkçe AI Danışman.',
    siteName: 'LexDanisman',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LexDanisman | Yapay Zeka Hukuk Asistanı',
    description: 'Hukuki sorularınız için 7/24 Türkçe AI Danışman.',
  },
  icons: {
    icon: '/logo/lexailogo1.png',
    shortcut: '/logo/lexailogo1.png',
    apple: '/logo/lexailogo1.png',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="dark" suppressHydrationWarning>
      <body className={cn(inter.variable, playfair.variable, "font-sans min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-primary selection:text-primary-foreground")} suppressHydrationWarning>
        <SiteHeader />
        <main className="flex-1 w-full flex flex-col">{children}</main>
        <SiteFooter />
        <ChatWidget />
        <ScrollToTopButton />
        <Toaster position="top-center" richColors theme="dark" />
        <Analytics />
      </body>
    </html>
  );
}
