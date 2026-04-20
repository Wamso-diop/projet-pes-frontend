'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Star, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

interface Testimonial {
  initials: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  color: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    initials: 'MN',
    name: 'Marie Nkomo',
    role: 'Maman de Lucas, 14 ans · Makepe',
    text: "Depuis que mon fils suit les cours au PES, ses notes en mathématiques ont progressé de façon remarquable. Les enseignants sont vraiment à l'écoute et savent s'adapter à chaque enfant. Je recommande sans hésiter.",
    rating: 5,
    color: '#2563EB',
  },
  {
    initials: 'PK',
    name: 'Paul Kamga',
    role: "Papa d'Amina, 12 ans · Akwa",
    text: "Excellente structure, très professionnelle. Ma fille adorait déjà l'école, mais là elle a décroché une mention bien au BEPC ! Le tableau de bord parent est très pratique pour suivre les progrès semaine après semaine.",
    rating: 5,
    color: '#16A34A',
  },
  {
    initials: 'ST',
    name: 'Sophie Tchinda',
    role: 'Maman de Théo, 16 ans · Bonamoussadi',
    text: "Le suivi personnalisé fait vraiment la différence. Mon fils qui avait peur des maths aborde maintenant les exercices avec confiance. C'est une transformation incroyable.",
    rating: 5,
    color: '#7C3AED',
  },
  {
    initials: 'LB',
    name: 'Lontsi Boris',
    role: 'Papa de Chloé, 10 ans · Logpom',
    text: "J'avais essayé d'autres structures mais rien n'égale la pédagogie du PES. Chloé a terminé 3e de sa classe en fin d'année — de la 15e place qu'elle occupait au premier trimestre !",
    rating: 5,
    color: '#D97706',
  },
  {
    initials: 'EF',
    name: 'Élise Fokou',
    role: 'Maman de Maxime, 17 ans · Bonapriso',
    text: "La préparation au BAC du PES est sérieuse et complète. Mon fils a eu le BAC D avec mention assez bien grâce à leur méthode de révision ciblée. Je suis aux anges.",
    rating: 5,
    color: '#DB2777',
  },
  {
    initials: 'JE',
    name: 'Jean Essama',
    role: 'Papa de Nathan, 13 ans · Deido',
    text: "Ce qui m'a convaincu c'est le bilan pédagogique gratuit. En une séance, ils avaient cerné les lacunes de mon fils et proposé un programme précis. Résultats : 14/20 de moyenne au lieu de 9.",
    rating: 5,
    color: '#0891B2',
  },
  {
    initials: 'AG',
    name: 'Agnès Guémé',
    role: 'Maman de Layla, 15 ans · Kotto',
    text: "Le cours d'anglais bilingue a transformé l'expression orale de ma fille. Elle qui refusait de parler en classe prend maintenant la parole spontanément. Bravo à toute l'équipe !",
    rating: 5,
    color: '#059669',
  },
  {
    initials: 'CM',
    name: 'Christophe Mbenga',
    role: 'Papa de Samuel, 11 ans · Bali',
    text: "En quelques mois de cours de français au PES, les dissertations de Samuel sont devenues brillantes. Son professeur a demandé à lire une de ses rédactions devant toute la classe. On est tellement fiers.",
    rating: 5,
    color: '#4F46E5',
  },
];

const SLIDE_INTERVAL = 5500;

function Avatar({ initials, color }: { initials: string; color: string }) {
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0 ring-2 ring-white"
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="h-full flex flex-col">
      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: t.rating }).map((_, j) => (
          <Star key={j} size={13} className="fill-[#F59E0B] text-[#F59E0B]" />
        ))}
      </div>

      {/* Quote */}
      <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-5 flex-1">
        &ldquo;{t.text}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-[var(--border-color)]">
        <Avatar initials={t.initials} color={t.color} />
        <div>
          <p className="font-semibold text-[var(--text-primary)] text-sm">{t.name}</p>
          <p className="text-[var(--text-muted)] text-xs">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const t = useTranslations('home.testimonials');
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = TESTIMONIALS.length;

  const go = useCallback(
    (dir: number) => {
      setDirection(dir);
      setCurrent((prev) => (prev + dir + total) % total);
    },
    [total],
  );

  useEffect(() => {
    if (!playing) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => go(1), SLIDE_INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [playing, go]);

  // 3 visible indices on desktop
  const visibleIndices = [
    (current - 1 + total) % total,
    current,
    (current + 1) % total,
  ];

  const slideVariants = {
    enter:  (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0, rotateY: dir > 0 ? 12 : -12 }),
    center: { x: 0, opacity: 1, rotateY: 0 },
    exit:   (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0, rotateY: dir > 0 ? -12 : 12 }),
  };

  return (
    <section className="py-16 md:py-24 bg-[var(--background)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
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
            className="text-[var(--text-secondary)]"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        {/* ── Mobile: single card ────────────────────────── */}
        <div className="md:hidden" style={{ perspective: 800 }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--background-soft)] shadow-[0_4px_20px_rgb(0_0_0/0.07)]"
            >
              <TestimonialCard t={TESTIMONIALS[current]} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Desktop: 3 cards with tilt entry ──────────── */}
        <div className="hidden md:grid grid-cols-3 gap-5" style={{ perspective: 1000 }}>
          {visibleIndices.map((idx, pos) => {
            const isCenter = pos === 1;
            return (
              <motion.div
                key={`${idx}-${current}`}
                initial={mounted ? {
                  opacity: 0,
                  y: 30,
                  rotateX: 8,
                  rotateY: pos === 0 ? -6 : pos === 2 ? 6 : 0,
                } : false}
                whileInView={{
                  opacity: isCenter ? 1 : 0.82,
                  y: 0,
                  rotateX: 0,
                  rotateY: 0,
                }}
                viewport={{ once: false, margin: '-40px' }}
                transition={{ duration: 0.55, ease: 'easeOut', delay: pos * 0.06 }}
                whileHover={{ scale: 1.02, rotateY: 0, opacity: 1 }}
                className={`
                  p-6 rounded-2xl border transition-shadow duration-300
                  ${isCenter
                    ? 'border-[var(--accent-primary)]/35 bg-[var(--background-soft)] shadow-[0_8px_32px_rgb(37_99_235/0.1)]'
                    : 'border-[var(--border-color)] bg-[var(--background-soft)] shadow-[0_4px_16px_rgb(0_0_0/0.05)]'
                  }
                `}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <TestimonialCard t={TESTIMONIALS[idx]} />
              </motion.div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            onClick={() => go(-1)}
            className="w-9 h-9 rounded-full border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--background-muted)] hover:text-[var(--text-primary)] transition-colors"
            aria-label={t('prev')}
          >
            <ChevronLeft size={17} />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-1.5">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? 'w-5 h-2 bg-[var(--accent-primary)]'
                    : 'w-2 h-2 bg-[var(--border-color)] hover:bg-[var(--text-muted)]'
                }`}
                aria-label={`${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => go(1)}
            className="w-9 h-9 rounded-full border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--background-muted)] hover:text-[var(--text-primary)] transition-colors"
            aria-label={t('next')}
          >
            <ChevronRight size={17} />
          </button>

          {/* Play / Pause */}
          <button
            onClick={() => setPlaying((p) => !p)}
            className={`ml-1 w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
              playing
                ? 'bg-[var(--accent-primary)] text-white'
                : 'border border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--background-muted)]'
            }`}
            aria-label={playing ? t('pause') : t('play')}
          >
            {playing ? <Pause size={13} /> : <Play size={13} />}
          </button>
        </div>
      </div>
    </section>
  );
}
