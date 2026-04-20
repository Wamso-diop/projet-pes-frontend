'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ClipboardList, UserCheck, Rocket, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const STEP_ICONS = [ClipboardList, UserCheck, Rocket];
const STEP_COLORS = ['#2563EB', '#16A34A', '#7C3AED'];
const STEP_BG    = ['#EFF6FF', '#F0FDF4', '#F5F3FF'];
const STEP_NUMS  = ['01', '02', '03'];
const STEP_KEYS  = ['step1', 'step2', 'step3'] as const;

export default function HowItWorksSection() {
  const t = useTranslations('home.how_it_works');
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="py-16 md:py-24 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
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
            {t('section_title')}
          </motion.h2>
          <motion.p
            initial={mounted ? { opacity: 0, y: 16 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[var(--text-secondary)] max-w-lg mx-auto"
          >
            {t('section_subtitle')}
          </motion.p>
        </div>

        <div className="relative">
          {/* Connecting line — desktop */}
          <div className="hidden md:block absolute top-16 left-[16.6%] right-[16.6%] h-px bg-gradient-to-r from-[#2563EB] via-[#16A34A] to-[#7C3AED] opacity-20" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {STEP_KEYS.map((key, i) => {
              const Icon = STEP_ICONS[i];
              return (
                <motion.div
                  key={key}
                  initial={mounted ? { opacity: 0, y: 28 } : false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="relative mb-6">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-[0_4px_16px_rgb(0_0_0/0.08)]"
                      style={{ backgroundColor: STEP_BG[i] }}
                    >
                      <Icon size={28} style={{ color: STEP_COLORS[i] }} />
                    </div>
                    <span
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-white text-[10px] font-bold flex items-center justify-center"
                      style={{ backgroundColor: STEP_COLORS[i] }}
                    >
                      {STEP_NUMS[i]}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">
                    {t(`${key}_title` as Parameters<typeof t>[0])}
                  </h3>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-xs mx-auto">
                    {t(`${key}_desc` as Parameters<typeof t>[0])}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={mounted ? { opacity: 0, y: 12 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href={`/${locale}/auth/login`}
            className="
              inline-flex items-center gap-2
              px-8 py-4 rounded-xl
              bg-[var(--accent-primary)] text-white font-semibold
              hover:bg-[var(--accent-hover)]
              shadow-[0_4px_20px_rgb(37_99_235/0.3)]
              hover:shadow-[0_4px_28px_rgb(37_99_235/0.45)]
              transition-all duration-200 active:scale-[0.98]
            "
          >
            {t('cta')}
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
