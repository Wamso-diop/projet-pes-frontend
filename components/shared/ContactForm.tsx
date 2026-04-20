'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';
import { Send } from 'lucide-react';

export default function ContactForm() {
  const t = useTranslations('contact.form');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    toast.success(t('success'));
    (e.target as HTMLFormElement).reset();
  }

  const inputClass = `
    w-full bg-[var(--background-muted)] border border-[var(--border-color)]
    text-[var(--text-primary)] placeholder:text-[var(--text-muted)]
    rounded-xl px-4 py-3 text-sm
    focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/30 focus:border-[var(--accent-primary)]
    transition-all duration-200
  `;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input required placeholder={t('name')} className={inputClass} />
      <input required type="email" placeholder={t('email')} className={inputClass} />
      <input placeholder={t('phone')} className={inputClass} />
      <textarea required rows={5} placeholder={t('message')} className={inputClass} />
      <button
        type="submit"
        disabled={loading}
        className="
          w-full flex items-center justify-center gap-2
          py-3.5 rounded-xl font-medium text-sm
          bg-[var(--accent-primary)] text-white
          hover:bg-[var(--accent-hover)]
          disabled:opacity-60 disabled:cursor-not-allowed
          transition-colors duration-200
        "
      >
        {loading ? '...' : <><Send size={16} /> {t('submit')}</>}
      </button>
    </form>
  );
}
