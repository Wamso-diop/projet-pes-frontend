import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

interface Props { locale: string }

export default async function Footer({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'nav' });

  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--background-soft)] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-display font-bold text-lg text-[var(--text-primary)] mb-3">
              <span className="w-8 h-8 rounded-lg bg-[var(--accent-primary)] text-white flex items-center justify-center text-sm font-bold">P</span>
              <span>Pôle d&apos;Excellence Scolaire</span>
            </div>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              {locale === 'fr'
                ? "Aidons vos enfants à déployer leurs ailes. Soutien scolaire d'excellence à Douala depuis 2014."
                : "Helping your children spread their wings. Excellence in tutoring in Douala since 2014."}
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-3 text-sm uppercase tracking-wide">
              {locale === 'fr' ? 'Navigation' : 'Navigation'}
            </h3>
            <ul className="space-y-2">
              {[
                { key: 'home',     href: '' },
                { key: 'services', href: '/services' },
                { key: 'blog',     href: '/blog' },
                { key: 'contact',  href: '/contact' },
              ].map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={`/${locale}${href}`}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                  >
                    {t(key as Parameters<typeof t>[0])}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-3 text-sm uppercase tracking-wide">Contact</h3>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li>Douala, Cameroun</li>
              <li>+237 6XX XXX XXX</li>
              <li>contact@poleexcellencescolaire.cm</li>
              <li>{locale === 'fr' ? 'Lun–Sam : 8h–18h' : 'Mon–Sat: 8am–6pm'}</li>
            </ul>
          </div>

        </div>

        <div className="mt-10 pt-6 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--text-muted)]">
          <p>© {new Date().getFullYear()} Pôle d&apos;Excellence Scolaire. {locale === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}</p>
          <p>{locale === 'fr' ? 'Fait avec ❤️ à Douala' : 'Made with ❤️ in Douala'}</p>
        </div>
      </div>
    </footer>
  );
}
