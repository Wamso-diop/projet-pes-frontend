import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PublicBottomNav from '@/components/layout/PublicBottomNav';
import WhatsAppButton from '@/components/shared/WhatsAppButton';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen md:pb-0 pb-nav">
        {children}
      </main>
      <Footer />
      <PublicBottomNav />
      <WhatsAppButton />
    </>
  );
}
