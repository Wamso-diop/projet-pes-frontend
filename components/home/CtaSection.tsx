'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function CtaSection() {
  const t = useTranslations('home.cta');
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--accent-primary)]" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 80% at 50% 110%, rgb(124 58 237 / 0.35), transparent)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={mounted ? { opacity: 0, y: 24 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-5 leading-tight">
            {t('title')}
          </h2>
          <p className="text-white/80 mb-10 max-w-xl mx-auto text-lg">
            {t('subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/auth/register`}
              className="
                inline-flex items-center justify-center gap-2
                px-8 py-4 rounded-xl
                bg-white text-[var(--accent-primary)]
                font-semibold text-base
                hover:bg-white/90
                shadow-[0_4px_20px_rgb(0_0_0/0.2)]
                transition-all duration-200 active:scale-[0.98]
              "
            >
              {t('button')}
              <ArrowRight size={18} />
            </Link>
            <a
              href="https://wa.me/237600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center justify-center gap-2
                px-8 py-4 rounded-xl
                bg-white/10 text-white border border-white/30
                font-semibold text-base
                hover:bg-white/20
                transition-all duration-200 active:scale-[0.98]
              "
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
