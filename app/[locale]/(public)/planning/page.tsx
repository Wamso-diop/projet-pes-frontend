import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, Users, MapPin, Home } from 'lucide-react';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'planning' });
  return { title: t('meta_title') };
}

const SLOTS = [
  { day: 'Lundi',    time: '15h00 – 17h00', subject: 'Mathématiques',   level: 'Collège', teacher: 'Prof. Mballa',   mode: 'onsite', spots: 3, color: '#2563EB' },
  { day: 'Lundi',    time: '17h30 – 19h30', subject: 'Physique-Chimie', level: 'Lycée',   teacher: 'Prof. Essomba',  mode: 'onsite', spots: 2, color: '#16A34A' },
  { day: 'Mardi',    time: '14h00 – 16h00', subject: 'Français',        level: 'Primaire',teacher: 'Prof. Fotso',    mode: 'onsite', spots: 5, color: '#7C3AED' },
  { day: 'Mardi',    time: '16h30 – 18h30', subject: 'Anglais',         level: 'Collège', teacher: 'Prof. Nguema',   mode: 'home',   spots: 0, color: '#D97706' },
  { day: 'Mercredi', time: '08h00 – 10h00', subject: 'Mathématiques',   level: 'Primaire',teacher: 'Prof. Mballa',   mode: 'onsite', spots: 4, color: '#2563EB' },
  { day: 'Mercredi', time: '10h30 – 12h30', subject: 'SVT / Biologie',  level: 'Lycée',   teacher: 'Prof. Essomba',  mode: 'onsite', spots: 2, color: '#059669' },
  { day: 'Jeudi',    time: '15h00 – 17h00', subject: 'Anglais',         level: 'Lycée',   teacher: 'Prof. Nguema',   mode: 'onsite', spots: 3, color: '#D97706' },
  { day: 'Jeudi',    time: '17h30 – 19h30', subject: 'Histoire-Géo',   level: 'Collège', teacher: 'Prof. Tchouam',  mode: 'onsite', spots: 1, color: '#DB2777' },
  { day: 'Vendredi', time: '14h00 – 16h00', subject: 'Mathématiques',   level: 'Lycée',   teacher: 'Prof. Mballa',   mode: 'onsite', spots: 0, color: '#2563EB' },
  { day: 'Vendredi', time: '16h30 – 18h30', subject: 'Informatique',   level: 'Collège', teacher: 'Prof. Nkeng',    mode: 'onsite', spots: 5, color: '#0891B2' },
  { day: 'Samedi',   time: '08h00 – 10h00', subject: 'Mathématiques',   level: 'Collège', teacher: 'Prof. Mballa',   mode: 'onsite', spots: 4, color: '#2563EB' },
  { day: 'Samedi',   time: '10h30 – 12h30', subject: 'Français',        level: 'Lycée',   teacher: 'Prof. Fotso',    mode: 'onsite', spots: 3, color: '#7C3AED' },
  { day: 'Samedi',   time: '14h00 – 16h00', subject: 'Physique-Chimie', level: 'Collège', teacher: 'Prof. Essomba',  mode: 'home',   spots: 2, color: '#16A34A' },
  { day: 'Samedi',   time: '16h00 – 18h00', subject: 'Anglais',         level: 'Primaire',teacher: 'Prof. Nguema',   mode: 'onsite', spots: 6, color: '#D97706' },
];

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

export default async function PlanningPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'planning' });

  return (
    <div className="bg-[var(--background)]">

      {/* ── Hero ───────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 md:py-24">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -10%, color-mix(in srgb, var(--accent-primary) 8%, transparent), transparent)' }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-[var(--accent-primary)] font-semibold text-sm uppercase tracking-widest mb-4">
            {t('hero_label')}
          </span>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-[var(--text-primary)] mb-6">
            {t('title')}
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      {/* ── Legend ─────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-wrap gap-4 items-center justify-center">
          <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <MapPin size={14} className="text-[var(--accent-primary)]" />
            {t('mode_onsite')}
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <Home size={14} className="text-[#16A34A]" />
            {t('mode_home')}
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <span className="w-3 h-3 rounded-full bg-[var(--accent-primary)]" />
            {t('available')}
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <span className="w-3 h-3 rounded-full bg-[var(--border-color)]" />
            {t('full')}
          </div>
        </div>
      </div>

      {/* ── Schedule by day ────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="space-y-8">
          {DAYS.map((day) => {
            const daySlots = SLOTS.filter((s) => s.day === day);
            if (!daySlots.length) return null;
            return (
              <div key={day}>
                <h2 className="font-display font-bold text-xl text-[var(--text-primary)] mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[var(--accent-soft)] text-[var(--accent-primary)] flex items-center justify-center text-xs font-bold">
                    {day.slice(0, 2)}
                  </span>
                  {day}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {daySlots.map((slot, i) => {
                    const isFull = slot.spots === 0;
                    return (
                      <div
                        key={i}
                        className={`
                          relative p-5 rounded-2xl border transition-all duration-200
                          ${isFull
                            ? 'border-[var(--border-color)] bg-[var(--background-muted)] opacity-60'
                            : 'border-[var(--border-color)] bg-[var(--background-soft)] hover:shadow-[0_4px_16px_rgb(0_0_0/0.08)] hover:-translate-y-0.5'
                          }
                        `}
                      >
                        {/* Subject color bar */}
                        <div className="w-full h-1 rounded-full mb-4" style={{ backgroundColor: isFull ? '#CBD5E1' : slot.color }} />

                        {/* Subject + level */}
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <div>
                            <h3 className="font-semibold text-[var(--text-primary)] text-sm leading-snug">{slot.subject}</h3>
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full mt-1 inline-block" style={{ backgroundColor: `${slot.color}18`, color: isFull ? '#94A3B8' : slot.color }}>
                              {slot.level}
                            </span>
                          </div>
                          {slot.mode === 'home' ? (
                            <Home size={14} className="text-[#16A34A] flex-shrink-0 mt-1" />
                          ) : (
                            <MapPin size={14} className="text-[var(--accent-primary)] flex-shrink-0 mt-1" />
                          )}
                        </div>

                        {/* Time */}
                        <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] mb-2">
                          <Clock size={11} />
                          {slot.time}
                        </div>

                        {/* Teacher */}
                        <p className="text-xs text-[var(--text-muted)] mb-3">{slot.teacher}</p>

                        {/* Spots + CTA */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-xs">
                            <Users size={11} className={isFull ? 'text-[var(--text-muted)]' : 'text-[#16A34A]'} />
                            <span className={isFull ? 'text-[var(--text-muted)]' : 'text-[#16A34A] font-medium'}>
                              {isFull ? t('full') : `${slot.spots} ${t('available')}`}
                            </span>
                          </div>
                          {!isFull && (
                            <Link
                              href={`/${locale}/auth/login`}
                              className="text-xs font-semibold text-[var(--accent-primary)] hover:underline"
                            >
                              {t('book')}
                            </Link>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── CTA ──────────────────────────────────────── */}
        <div className="mt-16 p-8 md:p-12 rounded-3xl border border-[var(--border-color)] bg-[var(--background-soft)] text-center">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-[var(--text-primary)] mb-3">
            {t('cta_title')}
          </h2>
          <p className="text-[var(--text-secondary)] mb-7 max-w-md mx-auto">{t('cta_subtitle')}</p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--accent-primary)] text-white font-semibold hover:bg-[var(--accent-hover)] shadow-[0_4px_16px_rgb(37_99_235/0.3)] transition-all"
          >
            {t('cta_button')}
          </Link>
        </div>
      </div>
    </div>
  );
}
