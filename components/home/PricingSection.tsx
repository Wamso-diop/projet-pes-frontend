'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Check, ArrowRight, Zap, Star, Crown, AlertCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

/* ─── Types ─────────────────────────────────────── */
interface Plan {
  icon: LucideIcon;
  nameKey: string;
  taglineKey: string;
  hookKey: string;
  featuresFr: string[];
  featuresEn: string[];
  highlighted: boolean;
  ctaKey: string;
  color: string;
  num: string;
}

/* ─── Data ──────────────────────────────────────── */
const PLANS: Plan[] = [
  {
    icon: Zap,
    nameKey: 'plan1_name',
    taglineKey: 'plan1_tagline',
    hookKey: 'plan1_hook',
    featuresFr: [
      '2 matières au choix',
      '4 séances par mois',
      'Bilan pédagogique initial',
      'Espace parent inclus',
      'Suivi de progression',
      'Support par messagerie',
    ],
    featuresEn: [
      '2 subjects of your choice',
      '4 sessions per month',
      'Initial academic assessment',
      'Parent space included',
      'Progress tracking',
      'Messaging support',
    ],
    highlighted: false,
    ctaKey: 'plan1_cta',
    color: '#2563EB',
    num: '01',
  },
  {
    icon: Star,
    nameKey: 'plan2_name',
    taglineKey: 'plan2_tagline',
    hookKey: 'plan2_hook',
    featuresFr: [
      '4 matières au choix',
      '8 séances par mois',
      'Bilan pédagogique approfondi',
      'Espace parent avancé',
      'Suivi hebdomadaire détaillé',
      'RDV enseignant mensuel',
      'Préparation aux examens',
    ],
    featuresEn: [
      '4 subjects of your choice',
      '8 sessions per month',
      'In-depth academic assessment',
      'Advanced parent space',
      'Detailed weekly follow-up',
      'Monthly teacher meeting',
      'Exam preparation',
    ],
    highlighted: true,
    ctaKey: 'plan2_cta',
    color: '#7C3AED',
    num: '02',
  },
  {
    icon: Crown,
    nameKey: 'plan3_name',
    taglineKey: 'plan3_tagline',
    hookKey: 'plan3_hook',
    featuresFr: [
      'Toutes les matières',
      'Séances illimitées',
      'Bilan pédagogique premium',
      'Espace parent temps réel',
      'Cours particuliers à domicile',
      'Coaching examens intensif',
      'Garantie résultats',
      'Suivi prioritaire 7j/7',
    ],
    featuresEn: [
      'All subjects',
      'Unlimited sessions',
      'Premium academic assessment',
      'Real-time parent space',
      'Private home tutoring',
      'Intensive exam coaching',
      'Results guarantee',
      'Priority support 7 days/week',
    ],
    highlighted: false,
    ctaKey: 'plan3_cta',
    color: '#D97706',
    num: '03',
  },
];

/* ─── Component ─────────────────────────────────── */
export default function PricingSection() {
  const t = useTranslations('home.pricing');
  const locale = useLocale();
  const isFr = locale === 'fr';
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-[var(--background-soft)]">

      {/* ── Dark atmosphere overlay (opacity-0 light / 100 dark) ── */}
      <div
        className="absolute inset-0 opacity-0 dark:opacity-100 pointer-events-none"
        style={{ background: 'linear-gradient(155deg, #060D1A 0%, #0D1626 55%, #100A26 100%)' }}
      />
      {/* Glow violet centré — dark uniquement */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] opacity-0 dark:opacity-[0.10] pointer-events-none rounded-full blur-3xl"
        style={{ background: '#7C3AED' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="text-center mb-14">
          <motion.span
            initial={mounted ? { opacity: 0 } : false}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-[var(--accent-primary)] font-semibold text-xs uppercase tracking-[0.25em] mb-4"
          >
            {t('section_label')}
          </motion.span>

          <motion.h2
            initial={mounted ? { opacity: 0, y: 16 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display font-black text-4xl md:text-5xl text-[var(--text-primary)] mb-4 leading-tight"
          >
            {t('title')}
          </motion.h2>

          <motion.p
            initial={mounted ? { opacity: 0, y: 12 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed"
          >
            {t('subtitle')}
          </motion.p>

          {/* Urgency banner — thémé light/dark */}
          <motion.div
            initial={mounted ? { opacity: 0, y: 8 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-full text-sm font-semibold bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-700/40 text-amber-700 dark:text-amber-400"
          >
            <AlertCircle size={14} className="flex-shrink-0 text-amber-500" />
            {t('urgency')}
          </motion.div>
        </div>

        {/* ── Plans ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {PLANS.map(({ icon: Icon, nameKey, taglineKey, hookKey, featuresFr, featuresEn, highlighted, ctaKey, color, num }, i) => (
            <motion.div
              key={nameKey}
              initial={mounted ? { opacity: 0, y: 28 } : false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.12 }}
              className={`group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 ${
                highlighted
                  ? 'md:-translate-y-4'
                  : 'hover:-translate-y-1'
              }`}
              style={{
                border: `1px solid ${highlighted ? color : 'var(--border-color)'}`,
                backgroundColor: 'var(--background)',
                boxShadow: highlighted
                  ? `0 24px 64px ${color}28, 0 0 0 1px ${color}50`
                  : undefined,
              }}
            >
              {/* Barre couleur top */}
              <div
                className="h-1.5 w-full flex-shrink-0"
                style={{ background: `linear-gradient(to right, ${color}, ${color}70)` }}
              />

              {/* Badge "Le plus populaire" */}
              {highlighted && (
                <div
                  className="absolute top-5 right-5 px-3 py-1 rounded-full text-[11px] font-black text-white tracking-wide"
                  style={{ backgroundColor: color, boxShadow: `0 4px 12px ${color}55` }}
                >
                  {t('popular_badge')}
                </div>
              )}

              {/* Watermark numéro */}
              <div
                className="absolute bottom-6 right-4 font-black select-none pointer-events-none leading-none"
                style={{ fontSize: '7rem', color, opacity: 0.05, lineHeight: 1 }}
              >
                {num}
              </div>

              {/* Hover glow interne */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 0%, ${color}0C, transparent 60%)` }}
              />

              <div className="p-6 flex flex-col flex-1 relative">

                {/* Icône + Nom */}
                <div className="flex items-start gap-3 mb-5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border border-[var(--border-color)]"
                    style={{ background: `linear-gradient(135deg, ${color}22, ${color}42)` }}
                  >
                    <Icon size={22} style={{ color }} />
                  </div>
                  <div className="pt-0.5">
                    <div className="text-[10px] font-black tracking-[0.2em] uppercase mb-0.5" style={{ color }}>
                      FORMULE {num}
                    </div>
                    <h3 className="font-display font-black text-xl text-[var(--text-primary)] leading-tight">
                      {t(nameKey as Parameters<typeof t>[0])}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                      {t(taglineKey as Parameters<typeof t>[0])}
                    </p>
                  </div>
                </div>

                {/* Hook — la grande promesse */}
                <div
                  className="mb-5 flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold"
                  style={{
                    background: `linear-gradient(to right, ${color}18, ${color}08)`,
                    border: `1px solid ${color}2A`,
                    color,
                  }}
                >
                  <Check size={16} className="flex-shrink-0" style={{ color }} />
                  {t(hookKey as Parameters<typeof t>[0])}
                </div>

                {/* Features */}
                <ul className="space-y-2.5 mb-6 flex-1">
                  {(isFr ? featuresFr : featuresEn).map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
                      <Check
                        size={14}
                        className="mt-0.5 flex-shrink-0"
                        style={{ color: '#16A34A' }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Mention tarifaire */}
                <p className="text-center text-xs text-[var(--text-secondary)] italic mb-4">
                  {isFr
                    ? 'Tarif communiqué lors du bilan pédagogique'
                    : 'Pricing shared during academic assessment'}
                </p>

                {/* CTA */}
                <Link
                  href={`/${locale}/auth/login`}
                  className="flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 active:scale-[0.98] hover:opacity-90"
                  style={{
                    background: `linear-gradient(135deg, ${color}, ${color}cc)`,
                    boxShadow: `0 4px 20px ${color}40`,
                  }}
                >
                  {t(ctaKey as Parameters<typeof t>[0])}
                  <ArrowRight size={15} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Reassurance */}
        <motion.p
          initial={mounted ? { opacity: 0 } : false}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-sm text-[var(--text-secondary)] mt-10 max-w-xl mx-auto"
        >
          {t('no_commitment')}
        </motion.p>

      </div>
    </section>
  );
}
