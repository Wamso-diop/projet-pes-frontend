'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const POSTS = [
  { slug: 'preparer-bepc', image: '/images/preparer-bepc.jpg', title: 'Comment préparer le BEPC en 3 mois', date: '2026-03-15', category: 'Conseils', excerpt: 'Nos enseignants partagent leurs meilleures stratégies pour réussir le BEPC avec méthode et sérénité.' },
  { slug: 'maths-astuces', image: '/images/astuces-mathematique.jpg', title: '5 astuces pour aimer les mathématiques', date: '2026-02-28', category: 'Mathématiques', excerpt: 'La peur des maths n\'est pas une fatalité. Voici comment transformer cette matière en alliée.' },
  { slug: 'motivation-scolaire', image: '/images/rester-discipler.jpg', title: 'Maintenir la motivation scolaire toute l\'année', date: '2026-02-10', category: 'Bien-être', excerpt: 'Des techniques concrètes pour aider votre enfant à rester motivé même en période de fatigue.' },
] as const;

export default function BlogSection() {
  const t = useTranslations('home.blog');
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="py-16 md:py-24 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-[var(--text-primary)] mb-2">{t('title')}</h2>
            <p className="text-[var(--text-secondary)]">{t('subtitle')}</p>
          </div>
          <Link
            href={`/${locale}/blog`}
            className="hidden md:flex items-center gap-1 text-[var(--accent-primary)] text-sm font-medium hover:gap-2 transition-all"
          >
            {locale === 'fr' ? 'Voir tout' : 'See all'}
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {POSTS.map(({ slug, image, title, category, excerpt }, i) => (
            <motion.article
              key={slug}
              initial={mounted ? { opacity: 0, y: 20 } : false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="
                group rounded-2xl border border-[var(--border-color)] overflow-hidden
                bg-[var(--background-soft)]
                hover:shadow-[0_4px_16px_rgb(0_0_0/0.08)]
                transition-shadow duration-300
              "
            >
              {/* Article image */}
              <div className="relative aspect-video overflow-hidden bg-[var(--background-muted)]">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <span className="absolute bottom-3 left-3 text-[10px] font-bold uppercase tracking-widest text-white bg-[var(--accent-primary)] px-2.5 py-1 rounded-full">
                  {category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-primary)] transition-colors">
                  {title}
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">{excerpt}</p>
                <Link
                  href={`/${locale}/blog/${slug}`}
                  className="inline-flex items-center gap-1 text-sm text-[var(--accent-primary)] font-medium hover:gap-2 transition-all"
                >
                  {t('read_more')} <ArrowRight size={14} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
