'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/shared/ThemeToggle';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { key: 'home',     href: '' },
  { key: 'services', href: '/services' },
  { key: 'about',    href: '/about' },
  { key: 'blog',     href: '/blog' },
  { key: 'careers',  href: '/careers' },
  { key: 'contact',  href: '/contact' },
] as const;

export default function Navbar() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('nav');

  return (
    <header
      className="sticky top-0 z-40 border-b border-[var(--border-color)]/50"
      style={{
        background: 'color-mix(in srgb, var(--background) 80%, transparent)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">

          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 font-display font-bold text-lg text-[var(--text-primary)]"
          >
            <span className="w-8 h-8 rounded-lg bg-[var(--accent-primary)] text-white flex items-center justify-center text-sm font-bold">P</span>
            <span className="hidden sm:block">PES</span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ key, href }) => {
              const fullHref = `/${locale}${href}`;
              const isActive = href === '' ? pathname === `/${locale}` || pathname === `/${locale}/` : pathname.startsWith(fullHref);
              return (
                <Link
                  key={key}
                  href={fullHref}
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
                    isActive
                      ? 'text-[var(--accent-primary)] bg-[var(--accent-soft)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--background-muted)]',
                  )}
                >
                  {t(key as keyof typeof t)}
                </Link>
              );
            })}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <Link
              href={`/${locale}/auth/login`}
              className="
                px-4 py-2 rounded-xl text-sm font-medium
                bg-[var(--accent-primary)] text-white
                hover:bg-[var(--accent-hover)]
                transition-colors duration-200
                shadow-[0_2px_8px_rgb(37_99_235/0.25)]
              "
            >
              {t('login')}
            </Link>
          </div>

          {/* Mobile — logo + langue + thème uniquement */}
          <div className="flex md:hidden items-center gap-1">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

        </div>
      </div>
    </header>
  );
}
