import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PublicBottomNav from '@/components/layout/PublicBottomNav';
import WhatsAppButton from '@/components/shared/WhatsAppButton';

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export default async function PublicLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Navbar />
      <main className="min-h-screen md:pb-0 pb-nav">
        {children}
      </main>
      <Footer locale={locale} />
      <PublicBottomNav />
      <WhatsAppButton />
    </>
  );
}
