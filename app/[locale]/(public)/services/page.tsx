import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Calculator, Atom, Leaf, Languages, BookOpen, Map,
  Monitor, Lightbulb, TrendingUp, Globe, BookText, Receipt,
  ClipboardCheck, TestTube, FileText, Trophy,
  GraduationCap, Star,
} from 'lucide-react';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });
  return { title: t('meta_title') };
}

const SUBJECTS = [
  { icon: Calculator, name: 'Mathématiques',   color: '#2563EB', bg: '#EFF6FF', levels: ['Primaire','Collège','Lycée'] },
  { icon: Atom,       name: 'Physique-Chimie', color: '#16A34A', bg: '#F0FDF4', levels: ['Collège','Lycée'] },
  { icon: Leaf,       name: 'SVT / Biologie',  color: '#059669', bg: '#ECFDF5', levels: ['Collège','Lycée'] },
  { icon: Languages,  name: 'Anglais',          color: '#D97706', bg: '#FFFBEB', levels: ['Primaire','Collège','Lycée'] },
  { icon: BookOpen,   name: 'Français',         color: '#7C3AED', bg: '#F5F3FF', levels: ['Primaire','Collège','Lycée'] },
  { icon: Map,        name: 'Histoire-Géo',    color: '#DB2777', bg: '#FDF2F8', levels: ['Collège','Lycée'] },
  { icon: Monitor,    name: 'Informatique',    color: '#0891B2', bg: '#ECFEFF', levels: ['Collège','Lycée'] },
  { icon: Lightbulb,  name: 'Philosophie',     color: '#4F46E5', bg: '#EEF2FF', levels: ['Lycée'] },
  { icon: TrendingUp, name: 'Économie',        color: '#CA8A04', bg: '#FEFCE8', levels: ['Lycée'] },
  { icon: Globe,      name: 'Espagnol',        color: '#DC2626', bg: '#FEF2F2', levels: ['Collège','Lycée'] },
  { icon: BookText,   name: 'Allemand',        color: '#1D4ED8', bg: '#EFF6FF', levels: ['Collège','Lycée'] },
  { icon: Receipt,    name: 'Comptabilité',    color: '#0F766E', bg: '#F0FDFA', levels: ['Lycée'] },
];

const METHODS = [
  { icon: ClipboardCheck, key: 'method1', color: '#3B82F6' },
  { icon: BookOpen,        key: 'method2', color: '#22C55E' },
  { icon: FileText,        key: 'method3', color: '#A78BFA' },
  { icon: TestTube,        key: 'method4', color: '#FBB027' },
];

const EXAMS = [
  { name: 'CEP',        level: 'CM2',    desc: 'Certificat d\'Études Primaires',      color: '#22C55E', tier: 1, system: 'fr' },
  { name: 'BEPC',       level: '3ème',   desc: 'Brevet du Premier Cycle',             color: '#3B82F6', tier: 1, system: 'fr' },
  { name: 'GCE O-Level',level: 'Form 5', desc: 'General Certificate of Education',    color: '#0891B2', tier: 1, system: 'en' },
  { name: 'Probatoire', level: '1ère',   desc: 'Accès au Baccalauréat',               color: '#A78BFA', tier: 2, system: 'fr' },
  { name: 'BAC A',      level: 'Tle',    desc: 'Lettres & Sciences Humaines',         color: '#F59E0B', tier: 2, system: 'fr' },
  { name: 'BAC C',      level: 'Tle',    desc: 'Maths & Sciences Physiques',          color: '#EF4444', tier: 2, system: 'fr' },
  { name: 'BAC D',      level: 'Tle',    desc: 'Sciences Naturelles',                 color: '#10B981', tier: 2, system: 'fr' },
  { name: 'BAC TI',     level: 'Tle',    desc: 'Techniques Industrielles',            color: '#06B6D4', tier: 2, system: 'fr' },
  { name: 'GCE A-Level',level: 'U6',     desc: 'Advanced Level Certificate',          color: '#7C3AED', tier: 2, system: 'en' },
  { name: 'Concours',   level: 'Tle+',   desc: 'Grandes Écoles & Universités',        color: '#EC4899', tier: 3, system: 'fr' },
];

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });

  const francoLevels = [
    { key: 'primary' as const, color: '#2563EB', grades: 'CP · CE1 · CE2 · CM1 · CM2', abbr: 'FR' },
    { key: 'middle'  as const, color: '#16A34A', grades: '6e · 5e · 4e · 3e',           abbr: 'FR' },
    { key: 'high'    as const, color: '#7C3AED', grades: '2nde · 1re · Terminale',       abbr: 'FR' },
  ];
  const angloLevels = [
    { key: 'angloSecondary' as const, color: '#0891B2', grades: 'Form 1 · Form 2 · Form 3 · Form 4 · Form 5', abbr: 'EN', exam: 'GCE O-Level' },
    { key: 'angloHigh'      as const, color: '#6D28D9', grades: 'Lower Sixth (L6) · Upper Sixth (U6)',          abbr: 'EN', exam: 'GCE A-Level' },
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
            {t('hero_label')}
          </span>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-[var(--text-primary)] leading-tight mb-6">
            {t('title')}
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      {/* ── Levels ─────────────────────────────────────── */}
      <section className="py-16 bg-[var(--background-soft)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

          {/* Francophone system */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-[var(--accent-primary)]">
                {t('francophone_label')}
              </span>
              <div className="flex-1 h-px bg-[var(--border-color)]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {francoLevels.map(({ key, color, grades }) => (
                <div
                  key={key}
                  className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--background)] hover:shadow-[0_4px_20px_rgb(0_0_0/0.08)] transition-shadow"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-lg font-black text-white"
                    style={{ backgroundColor: color }}
                  >
                    {key === 'primary' ? 'P' : key === 'middle' ? 'C' : 'L'}
                  </div>
                  <h2 className="font-display font-bold text-xl text-[var(--text-primary)] mb-1">
                    {t(`levels.${key}`)}
                  </h2>
                  <p className="text-xs text-[var(--text-muted)] mb-3 font-mono tracking-wide">{grades}</p>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {t(`${key}_desc` as Parameters<typeof t>[0])}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Anglophone system */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-[#0891B2]">
                {t('anglophone_label')}
              </span>
              <div className="flex-1 h-px bg-[var(--border-color)]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {angloLevels.map(({ key, color, grades, exam }) => (
                <div
                  key={key}
                  className="p-6 rounded-2xl border-2 bg-[var(--background)] hover:shadow-[0_4px_20px_rgb(0_0_0/0.08)] transition-shadow"
                  style={{ borderColor: `${color}40` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-xs font-black text-white"
                      style={{ backgroundColor: color }}
                    >
                      EN
                    </div>
                    <span
                      className="px-2.5 py-1 rounded-full text-[11px] font-bold"
                      style={{ backgroundColor: `${color}18`, color }}
                    >
                      {exam}
                    </span>
                  </div>
                  <h2 className="font-display font-bold text-xl text-[var(--text-primary)] mb-1">
                    {t(`levels.${key}`)}
                  </h2>
                  <p className="text-xs text-[var(--text-muted)] mb-3 font-mono tracking-wide">{grades}</p>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {t(`${key}_desc` as Parameters<typeof t>[0])}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── All subjects ───────────────────────────────── */}
      <section className="py-16 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-[var(--accent-primary)] font-semibold text-sm uppercase tracking-widest mb-3">Matières</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-[var(--text-primary)]">
              Toutes les matières couvertes
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {SUBJECTS.map(({ icon: Icon, name, color, bg, levels }) => (
              <div
                key={name}
                className="p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--background-soft)] hover:shadow-[0_4px_16px_rgb(0_0_0/0.08)] hover:-translate-y-0.5 transition-all"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: bg }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] text-sm mb-2">{name}</h3>
                <div className="flex flex-wrap gap-1">
                  {levels.map((l) => (
                    <span key={l} className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: `${color}18`, color }}>
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Method — REDESIGNED ────────────────────────── */}
      {/*
        Approche fiable Tailwind v4 :
        - fond = var CSS (s'adapte automatiquement light/dark)
        - overlays dark-only via opacity-0 dark:opacity-100
        - icônes : style inline (gradient léger adaptatif)
        - textes : var CSS uniquement (pas de dark: overrides contradictoires)
      */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-[var(--background-soft)]">

        {/* Dot grid (léger dans les deux modes) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, var(--border-color) 1px, transparent 1px)', backgroundSize: '36px 36px', opacity: 0.6 }}
        />
        {/* Glow bleu — visible uniquement en dark */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] opacity-0 dark:opacity-[0.08] pointer-events-none rounded-full blur-3xl"
          style={{ background: '#3B82F6' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-20">
            <span className="inline-block text-[var(--accent-primary)] font-semibold text-xs uppercase tracking-[0.25em] mb-4">
              {t('method_label')}
            </span>
            <h2 className="font-display font-black text-4xl md:text-6xl text-[var(--text-primary)] mb-5 leading-tight">
              {t('method_title')}
            </h2>
            <p className="text-[var(--text-secondary)] max-w-lg mx-auto text-base leading-relaxed">
              {locale === 'fr'
                ? 'Chaque enfant est unique. Notre approche l\'est aussi.'
                : 'Every child is unique. Our approach is too.'}
            </p>
          </div>

          {/* Steps */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">

            {/* Connector line (desktop) */}
            <div
              className="hidden lg:block absolute top-12 left-[calc(12.5%+2rem)] right-[calc(12.5%+2rem)] h-px"
              style={{ background: 'linear-gradient(to right, transparent, var(--border-color), var(--accent-primary), var(--border-color), transparent)' }}
            />

            {METHODS.map(({ icon: Icon, key, color }, i) => (
              <div key={key} className="group relative flex flex-col items-center text-center">

                {/* Watermark number — subtil dans les deux modes */}
                <div
                  className="absolute -top-6 left-1/2 -translate-x-1/2 font-black select-none pointer-events-none leading-none"
                  style={{ fontSize: '9rem', color, opacity: 0.06, lineHeight: 1 }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Step badge — gradient adaptatif via style inline */}
                <div className="mb-5 relative">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center border border-[var(--border-color)] relative transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1"
                    style={{
                      background: `linear-gradient(135deg, ${color}22, ${color}40)`,
                      boxShadow: `0 8px 32px ${color}28`,
                    }}
                  >
                    <Icon size={32} style={{ color }} />
                  </div>
                  {/* Glow ring au hover */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ boxShadow: `0 0 28px ${color}50` }}
                  />
                  {/* Numéro d'étape */}
                  <div
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-[10px] font-black flex items-center justify-center text-white"
                    style={{ backgroundColor: color }}
                  >
                    {i + 1}
                  </div>
                </div>

                <div className="px-3 mt-2">
                  <span
                    className="inline-block text-xs font-bold tracking-widest mb-2"
                    style={{ color }}
                  >
                    ÉTAPE 0{i + 1}
                  </span>
                  <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-2 leading-snug">
                    {t(`${key}_title` as Parameters<typeof t>[0])}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {t(`${key}_desc` as Parameters<typeof t>[0])}
                  </p>
                </div>

                {/* Ligne accent au hover */}
                <div
                  className="mt-5 w-8 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: color }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Exams — REDESIGNED ─────────────────────────── */}
      {/*
        Approche fiable : fond via CSS var (auto light/dark),
        + overlay "dark atmosphere" via opacity-0 dark:opacity-100 (pas de dark:bg-gradient)
        + tous les textes via CSS vars (pas de dark: overrides qui conflictent)
      */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-[var(--background)]">

        {/* Dark mode overlay — deep space gradient (opacity-0 en light, 100 en dark) */}
        <div
          className="absolute inset-0 opacity-0 dark:opacity-100 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, #0A0518 0%, #0F172A 55%, #16043A 100%)' }}
        />
        {/* Dark mode radial glow */}
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] opacity-0 dark:opacity-20 pointer-events-none rounded-full blur-3xl"
          style={{ background: '#7C3AED' }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-14">
            <span className="inline-block text-[var(--accent-primary)] font-semibold text-xs uppercase tracking-[0.25em] mb-4">
              {t('exams_label')}
            </span>
            <h2 className="font-display font-black text-4xl md:text-6xl text-[var(--text-primary)] mb-8 leading-tight">
              {t('exams_title')}
            </h2>

            {/* Success stat banner */}
            <div className="inline-flex items-center gap-5 px-8 py-5 rounded-2xl border border-[var(--border-color)] bg-[var(--background-soft)] shadow-sm">
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/25">
                <Trophy size={26} className="text-[#22C55E]" />
              </div>
              <div className="text-left">
                <div className="text-4xl font-black text-[#22C55E] leading-none">94%</div>
                <div className="text-[var(--text-primary)] font-semibold text-sm mt-1">
                  {locale === 'fr' ? 'de réussite aux examens officiels' : 'official exam pass rate'}
                </div>
                <div className="text-[var(--text-secondary)] text-xs mt-0.5">PES Douala · 2024</div>
              </div>
            </div>
          </div>

          {/* Séparateur de tier — fonction helper */}
          {/* Tier 1 — Examens nationaux */}
          <div className="mb-5">
            <div className="flex items-center gap-3 mb-4 px-1">
              <GraduationCap size={14} className="text-[var(--text-secondary)]" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-secondary)] font-semibold">
                {locale === 'fr' ? 'Examens nationaux' : 'National exams'}
              </span>
              <div className="flex-1 h-px bg-[var(--border-color)]" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {EXAMS.filter(e => e.tier === 1).map((exam) => (
                <div
                  key={exam.name}
                  className="group relative p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--background-soft)] hover:shadow-[0_4px_20px_rgb(0_0_0/0.1)] text-center transition-all duration-300 cursor-default overflow-hidden"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                    style={{ background: `radial-gradient(circle at 50% 110%, ${exam.color}18, transparent 70%)` }}
                  />
                  <div className="relative">
                    <div
                      className="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full mb-3"
                      style={{ backgroundColor: `${exam.color}18`, color: exam.color }}
                    >
                      {exam.system === 'en' ? 'Anglophone' : 'Francophone'}
                    </div>
                    <div className="font-black text-3xl text-[var(--text-primary)] mb-1 tracking-tight">{exam.name}</div>
                    <div className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: exam.color }}>{exam.level}</div>
                    <div className="text-xs text-[var(--text-secondary)] leading-snug">{exam.desc}</div>
                  </div>
                  <div
                    className="absolute bottom-0 left-1/4 right-1/4 h-px"
                    style={{ background: `linear-gradient(to right, transparent, ${exam.color}70, transparent)` }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Tier 2 — BAC & A-Level */}
          <div className="mb-5">
            <div className="flex items-center gap-3 mb-4 px-1">
              <Star size={14} className="text-[var(--text-secondary)]" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-secondary)] font-semibold">
                {locale === 'fr' ? 'Baccalauréat & A-Level — toutes séries' : 'Baccalauréat & A-Level — all series'}
              </span>
              <div className="flex-1 h-px bg-[var(--border-color)]" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {EXAMS.filter(e => e.tier === 2).map((exam) => (
                <div
                  key={exam.name}
                  className="group relative p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--background-soft)] hover:shadow-[0_4px_20px_rgb(0_0_0/0.1)] text-center transition-all duration-300 cursor-default overflow-hidden"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                    style={{ background: `radial-gradient(circle at 50% 110%, ${exam.color}18, transparent 70%)` }}
                  />
                  <div className="relative">
                    <div className="font-black text-xl text-[var(--text-primary)] mb-1 tracking-tight leading-tight">{exam.name}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: exam.color }}>{exam.level}</div>
                    <div className="text-[10px] text-[var(--text-secondary)] leading-snug">{exam.desc}</div>
                  </div>
                  <div
                    className="absolute bottom-0 left-1/3 right-1/3 h-px"
                    style={{ background: `linear-gradient(to right, transparent, ${exam.color}70, transparent)` }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Tier 3 — Concours */}
          <div>
            <div className="flex items-center gap-3 mb-4 px-1">
              <Trophy size={14} className="text-[var(--text-secondary)]" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-secondary)] font-semibold">
                {locale === 'fr' ? 'Grandes écoles & concours' : 'Elite schools & competitive exams'}
              </span>
              <div className="flex-1 h-px bg-[var(--border-color)]" />
            </div>
            {EXAMS.filter(e => e.tier === 3).map((exam) => (
              <div
                key={exam.name}
                className="group relative p-7 rounded-2xl border border-[var(--border-color)] bg-[var(--background-soft)] hover:shadow-[0_4px_20px_rgb(0_0_0/0.1)] text-center transition-all duration-300 cursor-default overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{ background: `radial-gradient(circle at 50% 110%, ${exam.color}18, transparent 70%)` }}
                />
                <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4">
                  <div className="font-black text-4xl text-[var(--text-primary)] tracking-tight">{exam.name}</div>
                  <div className="hidden sm:block w-px h-10 bg-[var(--border-color)]" />
                  <div className="text-left">
                    <div className="text-sm font-bold" style={{ color: exam.color }}>{exam.level}</div>
                    <div className="text-sm text-[var(--text-secondary)]">{exam.desc}</div>
                  </div>
                </div>
                <div
                  className="absolute bottom-0 left-1/3 right-1/3 h-px"
                  style={{ background: `linear-gradient(to right, transparent, ${exam.color}70, transparent)` }}
                />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────── */}
      <section className="py-16 bg-[var(--accent-primary)]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">{t('cta_title')}</h2>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-[var(--accent-primary)] font-semibold hover:bg-white/90 shadow-[0_4px_20px_rgb(0_0_0/0.2)] transition-all"
          >
            {t('cta_button')}
          </Link>
        </div>
      </section>

    </div>
  );
}
