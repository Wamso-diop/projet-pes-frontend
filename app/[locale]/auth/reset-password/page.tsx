'use client';

import { useLocale } from 'next-intl';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const locale = useLocale();
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4">
      <div className="w-full max-w-md text-center">
        <h1 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-4">
          {locale === 'fr' ? 'Réinitialiser le mot de passe' : 'Reset password'}
        </h1>
        <input
          type="email"
          placeholder={locale === 'fr' ? 'Votre adresse email' : 'Your email'}
          className="
            w-full bg-[var(--background-muted)] border border-[var(--border-color)]
            rounded-xl px-4 py-3 text-sm text-[var(--text-primary)]
            placeholder:text-[var(--text-muted)]
            focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/30
            mb-4
          "
        />
        <button className="w-full py-3.5 rounded-xl bg-[var(--accent-primary)] text-white font-medium text-sm mb-4">
          {locale === 'fr' ? 'Envoyer le lien' : 'Send reset link'}
        </button>
        <Link href={`/${locale}/auth/login`} className="text-sm text-[var(--accent-primary)] hover:underline">
          {locale === 'fr' ? '← Retour à la connexion' : '← Back to login'}
        </Link>
      </div>
    </div>
  );
}
