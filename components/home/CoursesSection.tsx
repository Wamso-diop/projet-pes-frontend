'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, Calculator, Atom, Leaf, Languages, BookOpen, Map, Monitor, Lightbulb, TrendingUp, Globe, BookText, Receipt } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Subject {
  icon: LucideIcon;
  name: string;
  color: string;
  bg: string;
  levelKeys: ('level_primary' | 'level_middle' | 'level_high')[];
  tagKey?: 'tag_popular' | 'tag_bilingual' | 'tag_new';
}

const SUBJECTS: Subject[] = [
  { icon: Calculator, name: 'Mathématiques',   color: '#2563EB', bg: '#EFF6FF', levelKeys: ['level_primary','level_middle','level_high'], tagKey: 'tag_popular' },
  { icon: Atom,       name: 'Physique-Chimie', color: '#16A34A', bg: '#F0FDF4', levelKeys: ['level_middle','level_high'] },
  { icon: Leaf,       name: 'SVT / Biologie',  color: '#059669', bg: '#ECFDF5', levelKeys: ['level_middle','level_high'] },
  { icon: Languages,  name: 'Anglais',          color: '#D97706', bg: '#FFFBEB', levelKeys: ['level_primary','level_middle','level_high'], tagKey: 'tag_bilingual' },
  { icon: BookOpen,   name: 'Français',         color: '#7C3AED', bg: '#F5F3FF', levelKeys: ['level_primary','level_middle','level_high'] },
  { icon: Map,        name: 'Histoire-Géo',    color: '#DB2777', bg: '#FDF2F8', levelKeys: ['level_middle','level_high'] },
  { icon: Monitor,    name: 'Informatique',    color: '#0891B2', bg: '#ECFEFF', levelKeys: ['level_middle','level_high'], tagKey: 'tag_new' },
  { icon: Lightbulb,  name: 'Philosophie',     color: '#4F46E5', bg: '#EEF2FF', levelKeys: ['level_high'] },
  { icon: TrendingUp, name: 'Économie',        color: '#CA8A04', bg: '#FEFCE8', levelKeys: ['level_high'] },
  { icon: Globe,      name: 'Espagnol',        color: '#DC2626', bg: '#FEF2F2', levelKeys: ['level_middle','level_high'] },
  { icon: BookText,   name: 'Allemand',        color: '#1D4ED8', bg: '#EFF6FF', levelKeys: ['level_middle','level_high'] },
  { icon: Receipt,    name: 'Comptabilité',    color: '#0F766E', bg: '#F0FDFA', levelKeys: ['level_high'] },
];

export default function CoursesSection() {
  const t = useTranslations('home.courses');
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="py-16 md:py-24 bg-[var(--background-soft)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.span
            initial={mounted ? { opacity: 0 } : false}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-[var(--accent-primary)] font-semibold text-sm uppercase tracking-widest mb-3"
          >
            {t('section_label')}
          </motion.span>
          <motion.h2
            initial={mounted ? { opacity: 0, y: 16 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display font-bold text-3xl md:text-4xl text-[var(--text-primary)] mb-4"
          >
            {t('title')}
          </motion.h2>
          <motion.p
            initial={mounted ? { opacity: 0, y: 16 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[var(--text-secondary)] max-w-xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
          {SUBJECTS.map(({ icon: Icon, name, color, bg, levelKeys, tagKey }, i) => (
            <motion.div
              key={name}
              initial={mounted ? { opacity: 0, y: 20 } : false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="
                relative group p-4 rounded-2xl border border-[var(--border-color)]
                bg-[var(--background)]
                hover:shadow-[0_4px_20px_rgb(0_0_0/0.1)]
                hover:-translate-y-0.5
                transition-all duration-300 cursor-default
              "
            >
              {tagKey && (
                <span
                  className="absolute -top-2 right-3 text-[10px] font-semibold px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: color }}
                >
                  {t(tagKey)}
                </span>
              )}

              {/* Icon */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: bg }}
              >
                <Icon size={20} style={{ color }} />
              </div>

              <h3 className="font-semibold text-[var(--text-primary)] text-sm mb-2">{name}</h3>

              <div className="flex flex-wrap gap-1">
                {levelKeys.map((key) => (
                  <span
                    key={key}
                    className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                    style={{ backgroundColor: `${color}18`, color }}
                  >
                    {t(key)}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={mounted ? { opacity: 0, y: 12 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-center mt-10"
        >
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center gap-2 text-[var(--accent-primary)] font-semibold hover:gap-3 transition-all duration-200"
          >
            {t('view_all')} <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
