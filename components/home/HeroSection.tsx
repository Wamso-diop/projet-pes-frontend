'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, BookOpen, CheckCircle2, TrendingUp, Star } from 'lucide-react';
import { useState, useEffect } from 'react';

const AVATARS = [
  { initials: 'NK', color: '#2563EB' },
  { initials: 'AB', color: '#16A34A' },
  { initials: 'CM', color: '#D97706' },
  { initials: 'DP', color: '#7C3AED' },
  { initials: 'EF', color: '#DB2777' },
];

export default function HeroSection() {
  const t = useTranslations('home.hero');
  const locale = useLocale();
  const isFr = locale === 'fr';
  const badges = [t('badge_experience'), t('badge_guaranteed'), t('badge_followup')];
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative overflow-hidden bg-[var(--background)]">

      {/* ── Atmosphère lumineuse côté image (light) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 55% 70% at 72% 55%, color-mix(in srgb, #2563EB 7%, transparent), transparent)',
        }}
      />

      {/* ── Overlay sombre fiable (dark uniquement) ── */}
      <div
        className="absolute inset-0 opacity-0 dark:opacity-100 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, #04090F 0%, #080F1E 55%, #070B1A 100%)' }}
      />

      {/* ── Lueur bleue côté image (dark) ── */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px] opacity-0 dark:opacity-[0.14] pointer-events-none"
        style={{ background: '#2563EB' }}
      />

      {/* ── Grille de points ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.30] dark:opacity-[0.12]"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--border-color) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      {/* ── Trait vertical accent (déco gauche) ── */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 opacity-0 dark:opacity-20 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #2563EB 40%, #7C3AED 70%, transparent)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* ══════════════════════════════════════════════
              COLONNE GAUCHE — Texte
          ══════════════════════════════════════════════ */}
          <div>

            {/* Tagline pill */}
            <motion.div
              initial={mounted ? { opacity: 0, y: 16 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--accent-primary)]/25 bg-[var(--accent-soft)] text-[var(--accent-primary)] text-sm font-semibold mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
              {t('tagline')}
            </motion.div>

            {/* Headline principal */}
            <motion.h1
              initial={mounted ? { opacity: 0, y: 28 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="font-display font-black text-5xl md:text-6xl lg:text-[3.6rem] xl:text-7xl text-[var(--text-primary)] leading-[1.04] tracking-tight mb-6"
            >
              {t('title_part1')}
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, var(--accent-primary) 0%, #7C3AED 55%, #DB2777 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {t('title_gradient')}
              </span>
            </motion.h1>

            {/* Citation — écho visuel du slogan de l'image */}
            <motion.div
              initial={mounted ? { opacity: 0, x: -16 } : false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-stretch gap-3 mb-6"
            >
              <div
                className="w-1 rounded-full flex-shrink-0"
                style={{ background: 'linear-gradient(to bottom, #2563EB, #7C3AED)' }}
              />
              <p className="text-base text-[var(--text-secondary)] italic leading-snug">
                {isFr
                  ? <>« L&apos;école explique.&nbsp;<span className="text-[var(--text-primary)] font-bold not-italic">Nous, on fait comprendre.</span> »</>
                  : <>«&nbsp;School explains.&nbsp;<span className="text-[var(--text-primary)] font-bold not-italic">We make it click.</span>&nbsp;»</>
                }
              </p>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={mounted ? { opacity: 0, y: 16 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-[var(--text-secondary)] text-lg leading-relaxed mb-7 max-w-lg"
            >
              {t('subtitle')}
            </motion.p>

            {/* Badges check */}
            <motion.div
              initial={mounted ? { opacity: 0, y: 16 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {badges.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] bg-[var(--background-soft)] px-3 py-1.5 rounded-full border border-[var(--border-color)]"
                >
                  <CheckCircle2 size={13} className="text-[#16A34A] flex-shrink-0" />
                  {b}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={mounted ? { opacity: 0, y: 16 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-col sm:flex-row gap-3 mb-9"
            >
              <Link
                href={`/${locale}/auth/register`}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[var(--accent-primary)] text-white font-semibold text-base hover:opacity-90 shadow-[0_8px_30px_rgb(37_99_235/0.40)] hover:shadow-[0_8px_40px_rgb(37_99_235/0.55)] transition-all duration-200 active:scale-[0.98]"
              >
                {t('cta_primary')}
                <ArrowRight size={18} />
              </Link>
              <Link
                href={`/${locale}/services`}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl border border-[var(--border-color)] text-[var(--text-primary)] font-medium hover:bg-[var(--background-soft)] transition-all duration-200 active:scale-[0.98]"
              >
                <BookOpen size={18} />
                {t('cta_secondary')}
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={mounted ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex items-center gap-3 flex-wrap"
            >
              {/* Avatars */}
              <div className="flex -space-x-2.5">
                {AVATARS.map(({ initials, color }) => (
                  <div
                    key={initials}
                    className="w-9 h-9 rounded-full border-2 border-[var(--background)] flex items-center justify-center text-[10px] font-bold text-white shadow-sm"
                    style={{ background: color }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-0.5 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={11} fill="#F59E0B" strokeWidth={0} className="text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-tight">
                  <span className="text-[var(--text-primary)] font-bold">{t('social_count')}</span>{' '}
                  {t('social_trust')}
                </p>
              </div>
            </motion.div>
          </div>

          {/* ══════════════════════════════════════════════
              COLONNE DROITE — Image + floating cards
          ══════════════════════════════════════════════ */}
          <motion.div
            initial={mounted ? { opacity: 0, x: 50 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative"
          >
            {/* ── Rectangle déco derrière (légèrement décalé) ── */}
            <div
              className="absolute inset-x-3 inset-y-3 -rotate-[2deg] rounded-3xl pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, var(--accent-primary), #7C3AED)',
                opacity: 0.10,
              }}
            />

            {/* ── Cluster de points bas-gauche ── */}
            <div
              className="absolute -bottom-4 -left-4 w-24 h-24 opacity-25 dark:opacity-15 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, var(--accent-primary) 1.5px, transparent 1.5px)',
                backgroundSize: '9px 9px',
              }}
            />

            {/* ── Floating card : taux de réussite (haut gauche) ── */}
            <motion.div
              initial={mounted ? { opacity: 0, x: -20, y: 8 } : false}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.55, delay: 0.85 }}
              className="absolute -top-4 -left-4 z-20 flex items-center gap-2.5 bg-[var(--background)] border border-[var(--border-color)] rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgb(0_0_0/0.14)]"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #16A34A22, #16A34A44)' }}
              >
                <TrendingUp size={17} className="text-[#16A34A]" />
              </div>
              <div>
                <p className="text-xl font-black text-[var(--text-primary)] leading-none">94%</p>
                <p className="text-[10px] text-[var(--text-secondary)] leading-snug mt-0.5">
                  {isFr ? 'taux de réussite' : 'success rate'}
                </p>
              </div>
            </motion.div>

            {/* ── Floating card : Prochain cours (bas droite) ── */}
            <motion.div
              initial={mounted ? { opacity: 0, x: 20, y: 8 } : false}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.55, delay: 1.0 }}
              className="absolute -bottom-4 -right-4 z-20 bg-[var(--background)] border border-[var(--border-color)] rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgb(0_0_0/0.14)]"
            >
              <p className="text-[10px] text-[var(--text-secondary)] mb-1.5 font-medium uppercase tracking-wide">
                {t('card_next_label')}
              </p>
              <p className="text-sm font-bold text-[var(--text-primary)]">{t('card_next_subject')}</p>
              <p className="text-xs text-[var(--accent-primary)] font-medium mt-0.5">{t('card_next_time')}</p>
            </motion.div>

            {/* ── Floating pill : progression (milieu droite, desktop large) ── */}
            <motion.div
              initial={mounted ? { opacity: 0, x: 16 } : false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 1.1 }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden xl:flex items-center gap-2 bg-[var(--background)] border border-[var(--border-color)] rounded-full px-3.5 py-2 shadow-[0_4px_20px_rgb(0_0_0/0.12)]"
            >
              <span className="text-base font-black text-[#16A34A]">+18pts</span>
              <span className="text-[10px] text-[var(--text-secondary)] leading-tight max-w-[56px]">
                {t('card_progress_label')}
              </span>
            </motion.div>

            {/* ── IMAGE PRINCIPALE ── */}
            <div
              className="relative w-full rounded-2xl lg:rounded-3xl overflow-hidden shadow-[0_28px_80px_rgb(0_0_0/0.22)] ring-1 ring-[var(--border-color)]"
              style={{ aspectRatio: '800 / 450' }}
            >
              <Image
                src="/images/premiere_image.jpg"
                alt={
                  isFr
                    ? 'Élève PES — L\'école explique. Nous, on fait comprendre.'
                    : 'PES student — School explains. We make it click.'
                }
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {/* Légère lueur interne en bas pour ancrage */}
              <div
                className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.18), transparent)' }}
              />
            </div>

            {/* ── Badge "Depuis 2014" — ancré sous l'image ── */}
            <motion.div
              initial={mounted ? { opacity: 0, y: 10 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.15 }}
              className="flex justify-center mt-4"
            >
              <div className="inline-flex items-center gap-2 text-xs text-[var(--text-secondary)] bg-[var(--background-soft)] border border-[var(--border-color)] px-4 py-2 rounded-full">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}
                />
                {isFr ? 'Depuis 2014 — Douala, Cameroun' : 'Since 2014 — Douala, Cameroon'}
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: 'linear-gradient(135deg, #7C3AED, #DB2777)' }}
                />
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
