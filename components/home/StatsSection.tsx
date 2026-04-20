'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface StatDef {
  value: number;
  suffix: string;
  labelKey: string;
  descKey: string;
  color: string;
}

const STAT_DEFS: StatDef[] = [
  { value: 500,  suffix: '+', labelKey: 'students_label', descKey: 'students_desc', color: '#2563EB' },
  { value: 94,   suffix: '%', labelKey: 'success_label',  descKey: 'success_desc',  color: '#16A34A' },
  { value: 25,   suffix: '+', labelKey: 'teachers_label', descKey: 'teachers_desc', color: '#7C3AED' },
  { value: 10,   suffix: '+', labelKey: 'years_label',    descKey: 'years_desc',    color: '#D97706' },
  { value: 1200, suffix: '+', labelKey: 'exams_label',    descKey: 'exams_desc',    color: '#DB2777' },
];

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, active]);
  return count;
}

function StatCard({
  stat, index, active, mounted, t,
}: {
  stat: StatDef;
  index: number;
  active: boolean;
  mounted: boolean;
  t: ReturnType<typeof useTranslations<'home.stats'>>;
}) {
  const count = useCountUp(stat.value, 1800, active);
  return (
    <motion.div
      initial={mounted ? { opacity: 0, y: 24 } : false}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col items-center text-center p-6 rounded-2xl bg-[var(--background)] border border-[var(--border-color)] shadow-[0_2px_12px_rgb(0_0_0/0.05)] hover:shadow-[0_4px_20px_rgb(0_0_0/0.09)] transition-shadow duration-300"
    >
      <div className="w-10 h-1 rounded-full mb-5" style={{ backgroundColor: stat.color }} />
      <div className="font-display font-extrabold text-4xl md:text-5xl mb-1" style={{ color: stat.color }}>
        {count.toLocaleString('fr-FR')}{stat.suffix}
      </div>
      <p className="font-semibold text-[var(--text-primary)] text-sm mb-1">
        {t(stat.labelKey as Parameters<typeof t>[0])}
      </p>
      <p className="text-xs text-[var(--text-muted)]">
        {t(stat.descKey as Parameters<typeof t>[0])}
      </p>
    </motion.div>
  );
}

export default function StatsSection() {
  const t = useTranslations('home.stats');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section ref={ref} className="py-16 md:py-20 bg-[var(--background-soft)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={mounted ? { opacity: 0, y: 16 } : false}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl text-[var(--text-primary)] mb-3">
            {t('section_title')}
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
            {t('section_subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {STAT_DEFS.map((stat, i) => (
            <StatCard key={stat.labelKey} stat={stat} index={i} active={isInView} mounted={mounted} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
