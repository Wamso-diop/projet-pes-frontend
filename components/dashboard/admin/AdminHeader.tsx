'use client';

import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import ThemeToggle from '@/components/shared/ThemeToggle';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';
import { Bell } from 'lucide-react';
import { useState } from 'react';

const SEGMENT_TITLES: Record<string, { fr: string; en: string }> = {
  '':          { fr: 'Dashboard',      en: 'Dashboard'    },
  '/users':    { fr: 'Utilisateurs',   en: 'Users'        },
  '/schedule': { fr: 'Planning',       en: 'Schedule'     },
  '/stats':    { fr: 'Statistiques',   en: 'Statistics'   },
  '/content':  { fr: 'Contenu',        en: 'Content'      },
  '/settings': { fr: 'Paramètres',     en: 'Settings'     },
};

export default function AdminHeader() {
  const pathname = usePathname();
  const locale = useLocale();
  const [notifOpen, setNotifOpen] = useState(false);

  const base = `/${locale}/dashboard/admin`;
  const rest = pathname.replace(base, '') || '';
  const rootSegment = rest ? '/' + rest.split('/').filter(Boolean)[0] : '';
  const titles = SEGMENT_TITLES[rootSegment] ?? { fr: 'Dashboard', en: 'Dashboard' };
  const title = locale === 'fr' ? titles.fr : titles.en;

  return (
    <header
      className="sticky top-0 z-20 flex items-center h-14 px-4 md:px-6 gap-4 border-b border-[var(--border-color)]/60"
      style={{
        background: 'color-mix(in srgb, var(--background) 90%, transparent)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      {/* Page title */}
      <h1 className="font-display font-semibold text-base text-[var(--text-primary)] flex-1 truncate">
        {title}
      </h1>

      {/* Actions */}
      <div className="flex items-center gap-1">
        <LanguageSwitcher />
        <ThemeToggle />

        {/* Notification bell */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen((v) => !v)}
            className="relative w-9 h-9 rounded-xl flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--background-muted)] transition-colors"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-[var(--background)]" />
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-11 w-72 rounded-2xl border border-[var(--border-color)] bg-[var(--background)] shadow-[0_8px_32px_rgb(0_0_0/0.12)] p-3 z-50">
              <p className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide mb-2 px-1">
                Notifications
              </p>
              <div className="space-y-1">
                {[
                  { text: '4 nouvelles inscriptions en attente', time: 'Il y a 2h', dot: '#EF4444' },
                  { text: 'Rapport hebdomadaire généré', time: 'Vendredi 17h', dot: '#16A34A' },
                  { text: '2 candidatures enseignant à valider', time: 'Hier', dot: '#F59E0B' },
                ].map(({ text, time, dot }) => (
                  <div
                    key={text}
                    className="flex items-start gap-2.5 px-2 py-2.5 rounded-xl hover:bg-[var(--background-muted)] transition-colors cursor-pointer"
                  >
                    <div
                      className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                      style={{ backgroundColor: dot }}
                    />
                    <div>
                      <p className="text-xs text-[var(--text-primary)] leading-snug">{text}</p>
                      <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Admin avatar */}
        <div className="w-9 h-9 rounded-xl bg-[var(--accent-primary)] flex items-center justify-center text-white font-bold text-sm cursor-pointer hover:opacity-90 transition-opacity ml-1">
          A
        </div>
      </div>
    </header>
  );
}
