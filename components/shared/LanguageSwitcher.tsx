'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggle = () => {
    const next = locale === 'fr' ? 'en' : 'fr';
    // Replace locale prefix in pathname
    const newPath = pathname.replace(`/${locale}`, `/${next}`);
    router.push(newPath);
  };

  return (
    <button
      onClick={toggle}
      className={cn(
        'h-9 px-3 rounded-xl text-sm font-medium',
        'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
        'hover:bg-[var(--background-muted)]',
        'transition-colors duration-200',
        className,
      )}
      aria-label="Switch language"
    >
      {locale === 'fr' ? 'EN' : 'FR'}
    </button>
  );
}
