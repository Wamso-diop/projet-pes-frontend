import { getTranslations, getLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import NewsletterForm from '@/components/shared/NewsletterForm';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  return { title: t('meta_title') };
}

const POSTS = [
  {
    slug: 'preparer-bepc-3-mois',
    image: '/images/preparer-bepc.jpg',
    titleFr: 'Comment préparer le BEPC en 3 mois',
    titleEn: 'How to prepare for BEPC in 3 months',
    date: '15 mars 2026',
    dateEn: 'March 15, 2026',
    category: 'Examens',
    categoryEn: 'Exams',
    readTime: 5,
    excerptFr: 'Nos enseignants partagent leurs meilleures stratégies pour réussir le BEPC avec méthode et sérénité. Un programme semaine par semaine.',
    excerptEn: 'Our teachers share their best strategies for passing the BEPC with method and confidence. A week-by-week programme.',
    color: '#2563EB',
    featured: true,
  },
  {
    slug: 'maths-astuces-aimer',
    image: '/images/tips-of-math.jpg',
    titleFr: '5 astuces pour aimer les mathématiques',
    titleEn: '5 tips to love mathematics',
    date: '28 fév. 2026',
    dateEn: 'Feb 28, 2026',
    category: 'Mathématiques',
    categoryEn: 'Mathematics',
    readTime: 4,
    excerptFr: 'La peur des maths n\'est pas une fatalité. Voici comment transformer cette matière redoutée en alliée de vos résultats.',
    excerptEn: 'Fear of maths is not inevitable. Here is how to turn this dreaded subject into an ally for your results.',
    color: '#16A34A',
    featured: false,
  },
  {
    slug: 'motivation-scolaire-annee',
    image: '/images/rester-discipler.jpg',
    titleFr: 'Maintenir la motivation scolaire toute l\'année',
    titleEn: 'Keeping school motivation all year round',
    date: '10 fév. 2026',
    dateEn: 'Feb 10, 2026',
    category: 'Conseils',
    categoryEn: 'Tips',
    readTime: 6,
    excerptFr: 'Des techniques concrètes pour aider votre enfant à rester motivé même en période de fatigue ou de découragement.',
    excerptEn: 'Practical techniques to help your child stay motivated even during periods of fatigue or discouragement.',
    color: '#7C3AED',
    featured: false,
  },
  {
    slug: 'anglais-bilingue-cameroun',
    image: "/images/l'anglais.jpg",
    titleFr: 'Maîtriser l\'anglais dans le système bilingue camerounais',
    titleEn: 'Mastering English in the Cameroonian bilingual system',
    date: '20 jan. 2026',
    dateEn: 'Jan 20, 2026',
    category: 'Anglais',
    categoryEn: 'English',
    readTime: 5,
    excerptFr: 'Le bilinguisme camerounais est une richesse. Voici comment en tirer le meilleur parti pour préparer vos enfants à réussir.',
    excerptEn: 'Cameroonian bilingualism is an asset. Here is how to make the most of it to prepare your children for success.',
    color: '#D97706',
    featured: false,
  },
  {
    slug: 'bac-serie-c-conseils',
    image: '/images/cles-succes-bac.jpg',
    titleFr: 'BAC série C : les clés pour décrocher la mention',
    titleEn: 'BAC série C: keys to getting a distinction',
    date: '5 jan. 2026',
    dateEn: 'Jan 5, 2026',
    category: 'Examens',
    categoryEn: 'Exams',
    readTime: 7,
    excerptFr: 'Le BAC C est réputé difficile. Nos enseignants révèlent les stratégies de révision efficaces pour viser la mention.',
    excerptEn: 'BAC C is known to be difficult. Our teachers reveal effective revision strategies for aiming for a distinction.',
    color: '#DB2777',
    featured: false,
  },
  {
    slug: 'stress-examens-gestion',
    image: '/images/gerer-le-stress.jpg',
    titleFr: 'Gérer le stress avant les examens : guide pratique',
    titleEn: 'Managing exam stress: a practical guide',
    date: '15 déc. 2025',
    dateEn: 'Dec 15, 2025',
    category: 'Bien-être',
    categoryEn: 'Well-being',
    readTime: 4,
    excerptFr: 'Le stress est normal, mais incontrôlé il nuit aux performances. Voici comment aider votre enfant à l\'apprivoiser avant les examens.',
    excerptEn: 'Stress is normal, but uncontrolled it harms performance. Here is how to help your child manage it before exams.',
    color: '#059669',
    featured: false,
  },
];

export default async function BlogPage() {
  const t = await getTranslations('blog');
  const locale = await getLocale();
  const isFr = locale === 'fr';

  const [featured, ...rest] = POSTS;

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
          <h1 className="font-display font-bold text-4xl md:text-5xl text-[var(--text-primary)] mb-6">{t('title')}</h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

        {/* ── Featured post ──────────────────────────────── */}
        <div className="mb-14">
          <Link href={`/${locale}/blog/${featured.slug}`} className="group block">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-7 rounded-3xl border border-[var(--border-color)] bg-[var(--background-soft)] hover:shadow-[0_8px_40px_rgb(0_0_0/0.1)] transition-all duration-300">
              {/* Featured image */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-[var(--background-muted)]">
                <Image
                  src={featured.image}
                  alt={isFr ? featured.titleFr : featured.titleEn}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: featured.color }}>
                    <Tag size={10} />
                    {isFr ? featured.category : featured.categoryEn}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                    <Clock size={12} />
                    {featured.readTime} {t('min_read')}
                  </span>
                </div>
                <h2 className="font-display font-bold text-2xl md:text-3xl text-[var(--text-primary)] mb-3 group-hover:text-[var(--accent-primary)] transition-colors">
                  {isFr ? featured.titleFr : featured.titleEn}
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-5">
                  {isFr ? featured.excerptFr : featured.excerptEn}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--text-muted)]">{t('published')} {isFr ? featured.date : featured.dateEn}</span>
                  <span className="inline-flex items-center gap-1.5 text-[var(--accent-primary)] font-medium text-sm group-hover:gap-2.5 transition-all">
                    {t('read_more')} <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* ── Other posts grid ───────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((post) => (
            <Link key={post.slug} href={`/${locale}/blog/${post.slug}`} className="group block">
              <article className="h-full flex flex-col rounded-2xl border border-[var(--border-color)] bg-[var(--background-soft)] overflow-hidden hover:shadow-[0_4px_20px_rgb(0_0_0/0.09)] hover:-translate-y-0.5 transition-all duration-300">
                {/* Thumb */}
                <div className="relative aspect-video overflow-hidden bg-[var(--background-muted)]">
                  <Image
                    src={post.image}
                    alt={isFr ? post.titleFr : post.titleEn}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-white" style={{ backgroundColor: post.color }}>
                      {isFr ? post.category : post.categoryEn}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] text-[var(--text-muted)]">
                      <Clock size={10} />
                      {post.readTime} {t('min_read')}
                    </span>
                  </div>
                  <h3 className="font-semibold text-[var(--text-primary)] text-sm mb-2 flex-1 group-hover:text-[var(--accent-primary)] transition-colors leading-snug">
                    {isFr ? post.titleFr : post.titleEn}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed line-clamp-3 mb-4">
                    {isFr ? post.excerptFr : post.excerptEn}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-[var(--border-color)]">
                    <span className="text-[10px] text-[var(--text-muted)]">{isFr ? post.date : post.dateEn}</span>
                    <span className="inline-flex items-center gap-1 text-[var(--accent-primary)] text-xs font-medium group-hover:gap-1.5 transition-all">
                      {t('read_more')} <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* ── Newsletter ─────────────────────────────────── */}
        <div className="mt-16 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[var(--accent-primary)] to-[#7C3AED] text-white text-center">
          <h2 className="font-display font-bold text-2xl md:text-3xl mb-3">{t('newsletter_title')}</h2>
          <p className="text-white/80 mb-7 max-w-md mx-auto">{t('newsletter_subtitle')}</p>
          <NewsletterForm />
        </div>
      </div>
    </div>
  );
}
