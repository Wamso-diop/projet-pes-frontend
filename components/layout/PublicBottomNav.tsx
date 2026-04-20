'use client';

import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Home, BookOpen, Calendar, Mail, LogIn } from 'lucide-react';
import NavTab from './NavTab';

const ROLE_COLOR = '#2563EB'; // Bleu primaire pour les pages publiques

export default function PublicBottomNav() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('nav');

  const tabs = [
    { icon: Home,     labelKey: 'home',     href: `/${locale}` },
    { icon: BookOpen, labelKey: 'courses',  href: `/${locale}/services` },
    { icon: Calendar, labelKey: 'planning', href: `/${locale}/planning` },
    { icon: Mail,     labelKey: 'contact',  href: `/${locale}/contact` },
    { icon: LogIn,    labelKey: 'login',    href: `/${locale}/auth/login` },
  ] as const;

  return (
    <nav
      className="
        fixed bottom-0 left-0 right-0 z-50
        md:hidden
        rounded-t-2xl
        border-t border-[var(--border-color)]/30
        shadow-[0_-4px_24px_rgba(0,0,0,0.08)]
        safe-area-bottom
      "
      style={{
        background: 'color-mix(in srgb, var(--background) 85%, transparent)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <div className="flex items-stretch h-16">
        {tabs.map((tab) => {
          const isActive =
            tab.href === `/${locale}`
              ? pathname === `/${locale}` || pathname === `/${locale}/`
              : pathname.startsWith(tab.href);

          return (
            <NavTab
              key={tab.href}
              icon={tab.icon}
              label={t(tab.labelKey)}
              href={tab.href}
              isActive={isActive}
              roleColor={ROLE_COLOR}
            />
          );
        })}
      </div>
    </nav>
  );
}
