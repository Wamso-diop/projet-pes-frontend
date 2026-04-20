import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import {
  Award, Heart, Target, Users,
  Star, BookOpen, Home, Monitor, Trophy, MessageCircle,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return { title: t('meta_title') };
}

/* ─── Data ─────────────────────────────────────────── */

const VALUE_CONFIG = [
  { icon: Award,  color: '#2563EB', key: 'val1' as const },
  { icon: Heart,  color: '#DB2777', key: 'val2' as const },
  { icon: Target, color: '#16A34A', key: 'val3' as const },
  { icon: Users,  color: '#D97706', key: 'val4' as const },
];

const TEAM = [
  {
    initials: 'DM', name: 'Dr. Marcel Mballa',
    roleFr: 'Directeur pédagogique', roleEn: 'Academic Director',
    subjectFr: 'Mathématiques & Physique', subjectEn: 'Mathematics & Physics',
    experience: '15', color: '#2563EB',
  },
  {
    initials: 'JF', name: 'Jeanne Fotso',
    roleFr: 'Responsable primaire', roleEn: 'Primary Coordinator',
    subjectFr: 'Français & Éveil', subjectEn: 'French & General Studies',
    experience: '12', color: '#DB2777',
  },
  {
    initials: 'PE', name: 'Paul Essomba',
    roleFr: 'Coordinateur lycée', roleEn: 'High School Coordinator',
    subjectFr: 'SVT & Chimie', subjectEn: 'Biology & Chemistry',
    experience: '10', color: '#16A34A',
  },
  {
    initials: 'AN', name: 'Alice Nguema',
    roleFr: 'Référente bilingue', roleEn: 'Bilingual Lead',
    subjectFr: 'Anglais & Allemand', subjectEn: 'English & German',
    experience: '9', color: '#D97706',
  },
];

const TIMELINE = [
  {
    year: '2014', icon: Star, color: '#2563EB',
    eventFr: 'Fondation du PES à Akwa, Douala avec 3 enseignants et 12 premiers élèves.',
    eventEn: 'PES founded in Akwa, Douala with 3 teachers and 12 first students.',
  },
  {
    year: '2016', icon: BookOpen, color: '#16A34A',
    eventFr: 'Ouverture de la section lycée et lancement des préparations BAC.',
    eventEn: 'High school section opened and BAC preparation programmes launched.',
  },
  {
    year: '2018', icon: Home, color: '#7C3AED',
    eventFr: 'Lancement des cours à domicile pour les familles des quartiers éloignés.',
    eventEn: 'Home tutoring launched for families in outlying neighbourhoods.',
  },
  {
    year: '2021', icon: Monitor, color: '#D97706',
    eventFr: 'Déploiement de la plateforme numérique de suivi des élèves.',
    eventEn: 'Digital student-tracking platform deployed.',
  },
  {
    year: '2024', icon: Trophy, color: '#22C55E',
    eventFr: '500+ élèves accompagnés, 94% de taux de réussite aux examens officiels.',
    eventEn: '500+ students supported, 94% official exam pass rate.',
  },
];

const STATS = [
  { value: '500+', labelFr: 'élèves accompagnés', labelEn: 'students supported', color: '#2563EB' },
  { value: '94%',  labelFr: 'taux de réussite',   labelEn: 'exam pass rate',     color: '#22C55E' },
  { value: '25+',  labelFr: 'enseignants experts', labelEn: 'expert teachers',    color: '#D97706' },
  { value: '10+',  labelFr: "ans d'excellence",    labelEn: 'years of excellence', color: '#7C3AED' },
];

/* ─── Page ─────────────────────────────────────────── */

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  const isFr = locale === 'fr';

  return (
    <div className="bg-[var(--background)]">

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -10%, color-mix(in srgb, var(--accent-primary) 8%, transparent), transparent)' }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-[var(--accent-primary)] font-semibold text-sm uppercase tracking-widest mb-4">
            {t('hero_label')}
          </span>
          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-[var(--text-primary)] leading-tight mb-6">
            {t('hero_title')}
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed mb-12">
            {t('hero_subtitle')}
          </p>
          {/* Stats en hero pills dramatiques */}
          <div className="flex flex-wrap justify-center gap-3 mb-14">
            {STATS.map(({ value, labelFr, labelEn, color }) => (
              <div
                key={value}
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[var(--background-soft)] border border-[var(--border-color)] shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="font-display font-black text-xl leading-none" style={{ color }}>{value}</span>
                <span className="text-[var(--text-secondary)] text-sm">{isFr ? labelFr : labelEn}</span>
              </div>
            ))}
          </div>

          {/* Classroom photo */}
          <div className="relative w-full max-w-3xl mx-auto rounded-3xl overflow-hidden shadow-2xl aspect-[3/2]">
            <Image
              src="/images/anfants-en-classe(740x493).jpg"
              alt={isFr ? 'Élèves en classe au PES' : 'Students in class at PES'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between">
              <span className="text-white font-semibold text-sm drop-shadow">
                {isFr ? 'Nos salles de cours à Douala' : 'Our classrooms in Douala'}
              </span>
              <span className="text-white/80 text-xs drop-shadow">
                {isFr ? 'Depuis 2014' : 'Since 2014'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          MISSION + TIMELINE
          Approche dark fiable : overlay opacity-0 dark:opacity-100
      ══════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-[var(--background-soft)]">

        {/* Dark atmosphere overlay */}
        <div
          className="absolute inset-0 opacity-0 dark:opacity-100 pointer-events-none"
          style={{ background: 'linear-gradient(155deg, #060D1A 0%, #0D1626 60%, #0F172A 100%)' }}
        />
        {/* Dark glow accent */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] opacity-0 dark:opacity-[0.07] pointer-events-none rounded-full blur-3xl"
          style={{ background: '#2563EB' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">

            {/* ── Gauche : Mission + Stats ── */}
            <div>
              <span className="inline-block text-[var(--accent-primary)] font-semibold text-xs uppercase tracking-[0.25em] mb-4">
                {t('mission_label')}
              </span>
              <h2 className="font-display font-black text-3xl md:text-5xl text-[var(--text-primary)] mb-6 leading-tight">
                {t('mission_title')}
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed text-lg mb-10">
                {t('mission_body')}
              </p>

              {/* Stat cards 2×2 */}
              <div className="grid grid-cols-2 gap-3">
                {STATS.map(({ value, labelFr, labelEn, color }) => (
                  <div
                    key={value}
                    className="group p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--background)] hover:shadow-[0_4px_20px_rgb(0_0_0/0.1)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden relative"
                  >
                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                      style={{ background: `radial-gradient(circle at 0% 100%, ${color}12, transparent 70%)` }}
                    />
                    <div className="font-display font-black text-3xl leading-none mb-1" style={{ color }}>{value}</div>
                    <div className="text-sm text-[var(--text-secondary)]">{isFr ? labelFr : labelEn}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Droite : Timeline dramatique ── */}
            <div className="relative">
              {TIMELINE.map(({ year, icon: Icon, eventFr, eventEn, color }, i) => (
                <div key={year} className="group flex gap-5">
                  {/* Spine */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center border border-[var(--border-color)] transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${color}22, ${color}44)`,
                        boxShadow: `0 4px 16px ${color}25`,
                      }}
                    >
                      <Icon size={18} style={{ color }} />
                    </div>
                    {i < TIMELINE.length - 1 && (
                      <div
                        className="w-px flex-1 my-1 min-h-[2rem]"
                        style={{ background: `linear-gradient(to bottom, ${color}50, transparent)` }}
                      />
                    )}
                  </div>

                  {/* Contenu */}
                  <div className="pb-8 flex-1 relative">
                    {/* Watermark year */}
                    <div
                      className="absolute -top-3 right-0 font-black select-none pointer-events-none leading-none"
                      style={{ fontSize: '5rem', color, opacity: 0.05, lineHeight: 1 }}
                    >
                      {year}
                    </div>
                    <span
                      className="font-display font-black text-2xl leading-none"
                      style={{ color }}
                    >
                      {year}
                    </span>
                    <p className="text-[var(--text-secondary)] text-sm mt-1.5 leading-relaxed pr-4">
                      {isFr ? eventFr : eventEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          VALEURS
          Même traitement que "Notre méthode" dans services
      ══════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-[var(--background)]">

        {/* Dot grid adaptatif */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, var(--border-color) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
            opacity: 0.6,
          }}
        />
        {/* Glow central — dark uniquement */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] opacity-0 dark:opacity-[0.08] pointer-events-none rounded-full blur-3xl"
          style={{ background: '#2563EB' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-20">
            <span className="inline-block text-[var(--accent-primary)] font-semibold text-xs uppercase tracking-[0.25em] mb-4">
              {t('values_label')}
            </span>
            <h2 className="font-display font-black text-4xl md:text-6xl text-[var(--text-primary)] leading-tight">
              {t('values_title')}
            </h2>
          </div>

          {/* Cards — style method section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUE_CONFIG.map(({ icon: Icon, color, key }, i) => (
              <div key={key} className="group relative">

                {/* Watermark number */}
                <div
                  className="absolute -top-4 left-1 font-black select-none pointer-events-none leading-none"
                  style={{ fontSize: '8rem', color, opacity: 0.06, lineHeight: 1 }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Card */}
                <div className="relative flex flex-col h-full p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--background-soft)] hover:shadow-[0_8px_32px_rgb(0_0_0/0.1)] hover:-translate-y-1 transition-all duration-300 overflow-hidden">

                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    style={{ background: `radial-gradient(circle at 0% 0%, ${color}10, transparent 60%)` }}
                  />

                  {/* Icône badge */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 border border-[var(--border-color)] relative"
                    style={{
                      background: `linear-gradient(135deg, ${color}20, ${color}38)`,
                      boxShadow: `0 4px 16px ${color}20`,
                    }}
                  >
                    <Icon size={24} style={{ color }} />
                  </div>

                  <span
                    className="inline-block text-xs font-bold tracking-widest mb-2"
                    style={{ color }}
                  >
                    VALEUR 0{i + 1}
                  </span>

                  <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3 leading-snug">
                    {t(`${key}_title` as Parameters<typeof t>[0])}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-1">
                    {t(`${key}_desc` as Parameters<typeof t>[0])}
                  </p>

                  {/* Ligne accent au hover */}
                  <div
                    className="mt-5 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(to right, ${color}, transparent)` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          ÉQUIPE
          Overlay dark + cartes premium avec barre colorée
      ══════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-[var(--background-soft)]">

        {/* Dark atmosphere overlay */}
        <div
          className="absolute inset-0 opacity-0 dark:opacity-100 pointer-events-none"
          style={{ background: 'linear-gradient(155deg, #070E1B 0%, #0F172A 100%)' }}
        />
        {/* Dark glow rose/violet */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] opacity-0 dark:opacity-[0.07] pointer-events-none rounded-full blur-3xl"
          style={{ background: '#DB2777' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-14">
            <span className="inline-block text-[var(--accent-primary)] font-semibold text-xs uppercase tracking-[0.25em] mb-3">
              {t('team_label')}
            </span>
            <h2 className="font-display font-black text-4xl md:text-5xl text-[var(--text-primary)] mb-4 leading-tight">
              {t('team_title')}
            </h2>
            <p className="text-[var(--text-secondary)] max-w-xl mx-auto">{t('team_subtitle')}</p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TEAM.map(({ initials, name, roleFr, roleEn, subjectFr, subjectEn, experience, color }) => (
              <div
                key={name}
                className="group relative rounded-2xl border border-[var(--border-color)] bg-[var(--background)] overflow-hidden hover:shadow-[0_8px_40px_rgb(0_0_0/0.12)] hover:-translate-y-1 transition-all duration-300"
              >
                {/* Barre couleur haut */}
                <div
                  className="h-1.5 w-full"
                  style={{ background: `linear-gradient(to right, ${color}, ${color}60)` }}
                />

                {/* Hover glow latéral */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${color}10, transparent 60%)` }}
                />

                <div className="p-6 text-center relative">
                  {/* Avatar carré arrondi */}
                  <div className="relative inline-block mb-4">
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-black text-white mx-auto transition-transform duration-300 group-hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${color}cc, ${color})`,
                        boxShadow: `0 8px 24px ${color}40`,
                      }}
                    >
                      {initials}
                    </div>
                    {/* Badge expérience */}
                    <div
                      className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full text-[10px] font-black text-white leading-tight"
                      style={{ backgroundColor: color, boxShadow: `0 2px 8px ${color}60` }}
                    >
                      {experience}{isFr ? 'ans' : 'yrs'}
                    </div>
                  </div>

                  <h3 className="font-semibold text-[var(--text-primary)] text-sm mb-0.5">{name}</h3>
                  <p
                    className="text-xs font-semibold mb-1.5"
                    style={{ color }}
                  >
                    {isFr ? roleFr : roleEn}
                  </p>
                  <p className="text-xs text-[var(--text-secondary)] leading-snug">
                    {isFr ? subjectFr : subjectEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════ */}
      <section
        className="py-20 md:py-28"
        style={{ background: 'linear-gradient(135deg, var(--accent-primary) 0%, #7C3AED 100%)' }}
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
            {t('cta_title')}
          </h2>
          <p className="text-white/80 mb-8 text-lg">{t('cta_subtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/${locale}/auth/login`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-[var(--accent-primary)] font-semibold hover:bg-white/90 shadow-[0_4px_20px_rgb(0_0_0/0.2)] transition-all"
            >
              {t('cta_button')}
            </Link>
            <a
              href="https://wa.me/237600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#22C55E] text-white font-semibold hover:bg-[#16A34A] shadow-[0_4px_20px_rgb(34_197_94/0.3)] transition-all"
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
