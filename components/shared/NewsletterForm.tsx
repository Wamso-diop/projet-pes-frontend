'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function NewsletterForm() {
  const t = useTranslations('blog');
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSent(true);
  }

  return sent ? (
    <p className="text-white font-semibold text-sm py-3">
      ✓ {' '}
      {t('newsletter_placeholder').includes('email')
        ? 'Merci ! Vous recevrez nos conseils chaque semaine.'
        : 'Thank you! You will receive our tips every week.'}
    </p>
  ) : (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t('newsletter_placeholder')}
        className="flex-1 px-4 py-3 rounded-xl bg-white/15 border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
      />
      <button
        type="submit"
        className="px-6 py-3 rounded-xl bg-white text-[var(--accent-primary)] font-semibold text-sm hover:bg-white/90 transition-colors flex-shrink-0"
      >
        {t('newsletter_cta')}
      </button>
    </form>
  );
}
