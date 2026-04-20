'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ShieldCheck, Clock, Users, Trophy, Smartphone, HeartHandshake } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

const ADV_ICONS: LucideIcon[] = [ShieldCheck, Clock, Users, Trophy, Smartphone, HeartHandshake];
const ADV_COLORS = ['#2563EB', '#16A34A', '#7C3AED', '#D97706', '#DB2777', '#0891B2'];
const ADV_KEYS = ['adv1', 'adv2', 'adv3', 'adv4', 'adv5', 'adv6'] as const;

export default function WhyPESSection() {
  const t = useTranslations('home.why_pes');
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="py-16 md:py-24 bg-[var(--background-soft)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* ── Left: Image ───────────────────────────────── */}
          <motion.div
            initial={mounted ? { opacity: 0, x: -40 } : false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative flex-shrink-0 w-full max-w-[520px]"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_60px_rgb(0_0_0/0.13)]">
              <Image
                src="/images/anfants-en-classe(740x493).jpg"
                alt="Élèves en classe au Pôle d'Excellence Scolaire"
                width={740}
                height={493}
                className="w-full h-auto object-cover"
              />
              {/* Bottom badge */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-4 shadow-lg flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] flex items-center justify-center flex-shrink-0">
                    <Trophy size={22} className="text-[#2563EB]" />
                  </div>
                  <div>
                    <p className="font-bold text-[var(--text-primary)] text-sm">{t('badge_rate')}</p>
                    <p className="text-xs text-[var(--text-muted)]">{t('badge_rate_sub')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating years badge */}
            <motion.div
              initial={mounted ? { opacity: 0, scale: 0.8 } : false}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -top-4 -right-4 bg-[var(--accent-primary)] text-white rounded-2xl px-5 py-4 shadow-[0_8px_24px_rgb(37_99_235/0.4)]"
            >
              <p className="font-extrabold text-3xl leading-none">10+</p>
              <p className="text-xs text-white/80 mt-1">{t('years_label')}</p>
            </motion.div>
          </motion.div>

          {/* ── Right: Advantages ─────────────────────────── */}
          <div className="flex-1">
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
              className="text-[var(--text-secondary)] mb-8"
            >
              {t('subtitle')}
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ADV_KEYS.map((key, i) => {
                const Icon = ADV_ICONS[i];
                const color = ADV_COLORS[i];
                return (
                  <motion.div
                    key={key}
                    initial={mounted ? { opacity: 0, y: 20 } : false}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="flex gap-3 p-4 rounded-xl bg-[var(--background)] border border-[var(--border-color)] hover:shadow-[0_2px_12px_rgb(0_0_0/0.07)] transition-shadow"
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${color}18`, color }}
                    >
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="font-semibold text-[var(--text-primary)] text-sm mb-0.5">
                        {t(`${key}_title` as Parameters<typeof t>[0])}
                      </p>
                      <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                        {t(`${key}_desc` as Parameters<typeof t>[0])}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
