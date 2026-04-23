import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import ContactForm from '@/components/shared/ContactForm';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === 'fr' ? 'Contact | PES Douala' : 'Contact | PES Douala' };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  const INFO = [
    { icon: MapPin,         label: t('info.address'), color: '#2563EB', bg: '#EFF6FF' },
    { icon: Phone,          label: t('info.phone'),   color: '#16A34A', bg: '#F0FDF4' },
    { icon: Mail,           label: t('info.email'),   color: '#7C3AED', bg: '#F5F3FF' },
    { icon: Clock,          label: t('info.hours'),   color: '#D97706', bg: '#FFFBEB' },
  ];

  return (
    <div className="bg-[var(--background)]">

      {/* ── Hero ───────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 md:py-24">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -10%, color-mix(in srgb, var(--accent-primary) 8%, transparent), transparent)' }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-[var(--accent-primary)] font-semibold text-sm uppercase tracking-widest mb-4">
            Contact
          </span>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-[var(--text-primary)] mb-6">
            {t('title')}
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* ── Form (left, wider) ─────────────────────── */}
          <div className="lg:col-span-3">
            <div className="p-7 md:p-10 rounded-3xl border border-[var(--border-color)] bg-[var(--background-soft)] shadow-[0_4px_24px_rgb(0_0_0/0.05)]">
              <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-2">
                {locale === 'fr' ? 'Envoyez-nous un message' : 'Send us a message'}
              </h2>
              <p className="text-sm text-[var(--text-muted)] mb-7">
                {locale === 'fr' ? 'Nous vous répondons sous 24h maximum.' : 'We reply within 24 hours.'}
              </p>
              <ContactForm />
            </div>
          </div>

          {/* ── Info (right) ───────────────────────────── */}
          <div className="lg:col-span-2 flex flex-col gap-4">

            {/* Info cards */}
            {INFO.map(({ icon: Icon, label, color, bg }) => (
              <div key={label} className="flex items-center gap-4 p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--background-soft)]">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: bg }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <p className="text-[var(--text-primary)] font-medium text-sm">{label}</p>
              </div>
            ))}

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/237600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex items-center justify-center gap-3
                p-5 rounded-2xl
                bg-[#22C55E] text-white font-semibold
                hover:bg-[#16A34A]
                shadow-[0_4px_16px_rgb(34_197_94/0.3)]
                hover:shadow-[0_4px_20px_rgb(34_197_94/0.45)]
                transition-all duration-200 active:scale-[0.98]
              "
            >
              <MessageCircle size={20} />
              {locale === 'fr' ? 'Écrire sur WhatsApp' : 'Chat on WhatsApp'}
            </a>

            {/* Map placeholder */}
            <div className="rounded-2xl border border-[var(--border-color)] overflow-hidden bg-[var(--background-muted)] aspect-square flex flex-col items-center justify-center gap-2 text-[var(--text-muted)]">
              <MapPin size={28} className="text-[var(--accent-primary)]" />
              <p className="text-sm font-medium text-[var(--text-primary)]">Douala, Cameroun</p>
              <p className="text-xs text-center px-4">
                {locale === 'fr' ? 'Carte Google Maps à intégrer' : 'Google Maps to embed'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
