'use client';

import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import ThemeToggle from '@/components/shared/ThemeToggle';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';
import { Bell, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import type { Role } from '@/types';

const TITLES: Record<Role, Record<string, { fr: string; en: string }>> = {
  admin: {
    '':          { fr: 'Tableau de bord', en: 'Dashboard'   },
    '/users':    { fr: 'Utilisateurs',    en: 'Users'        },
    '/schedule': { fr: 'Planning',        en: 'Schedule'     },
    '/stats':    { fr: 'Statistiques',    en: 'Statistics'   },
    '/content':  { fr: 'Contenu',         en: 'Content'      },
    '/settings': { fr: 'Paramètres',      en: 'Settings'     },
  },
  parent: {
    '':              { fr: 'Accueil',     en: 'Home'         },
    '/progress':     { fr: 'Suivi',       en: 'Progress'     },
    '/calendar':     { fr: 'Calendrier',  en: 'Calendar'     },
    '/appointments': { fr: 'Rendez-vous', en: 'Appointments' },
    '/profile':      { fr: 'Profil',      en: 'Profile'      },
    '/settings':     { fr: 'Paramètres',  en: 'Settings'     },
  },
  student: {
    '':           { fr: 'Accueil',    en: 'Home'        },
    '/resources': { fr: 'Ressources', en: 'Resources'   },
    '/questions': { fr: 'Questions',  en: 'Questions'   },
    '/progress':  { fr: 'Mon suivi',  en: 'My Progress' },
    '/profile':   { fr: 'Profil',     en: 'Profile'     },
    '/settings':  { fr: 'Paramètres', en: 'Settings'    },
  },
  teacher: {
    '':           { fr: 'Accueil',   en: 'Home'      },
    '/resources': { fr: 'Ressources',en: 'Resources'  },
    '/questions': { fr: 'Questions', en: 'Questions'  },
    '/grades':    { fr: 'Notes',     en: 'Grades'     },
    '/profile':   { fr: 'Profil',    en: 'Profile'    },
    '/settings':  { fr: 'Paramètres',en: 'Settings'   },
  },
};

const NOTIFS = [
  { id: 1, title: 'Nouvelle inscription',  body: 'Emma Nkemdirim a rejoint PES.',     time: 'Il y a 2h',  dot: '#2563EB' },
  { id: 2, title: 'Question sans réponse', body: 'Paul Nkeng attend depuis 1h.',      time: 'Il y a 1h',  dot: '#EF4444' },
  { id: 3, title: 'Note publiée',          body: 'M. Mbida a ajouté DS3 — Maths.',    time: 'Il y a 3h',  dot: '#16A34A' },
];

interface DashboardHeaderProps {
  role: Role;
  notifCount?: number;
  userName?: string;
}

export default function DashboardHeader({ role, notifCount = 0, userName = 'U' }: DashboardHeaderProps) {
  const pathname = usePathname();
  const locale = useLocale();
  const [notifOpen, setNotifOpen] = useState(false);

  const base = `/${locale}/dashboard/${role}`;
  const rest = pathname.replace(base, '') || '';
  const rootSegment = rest ? '/' + rest.split('/').filter(Boolean)[0] : '';
  const roleMap = TITLES[role];
  const titles = roleMap[rootSegment] ?? roleMap[''];
  const title = locale === 'fr' ? titles.fr : titles.en;

  const initials = userName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <header
      className="sticky top-0 z-20 flex items-center h-16 px-4 md:px-6 gap-3 border-b border-[var(--border-color)]"
      style={{
        background: 'color-mix(in srgb, var(--background) 92%, transparent)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <h1 className="font-display font-bold text-lg text-[var(--text-primary)] flex-1 truncate">
        {title}
      </h1>

      <div className="flex items-center gap-1">
        <LanguageSwitcher />
        <ThemeToggle />

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen((v) => !v)}
            className="relative w-10 h-10 rounded-xl flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--background-muted)] transition-colors"
            aria-label="Notifications"
          >
            <Bell size={19} />
            {notifCount > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-[var(--background)] animate-pulse" />
            )}
          </button>

          {notifOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
              <div className="absolute right-0 top-12 w-80 rounded-2xl border border-[var(--border-color)] bg-[var(--background)] shadow-[0_8px_40px_rgb(0_0_0/0.14)] z-50 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-color)]">
                  <p className="font-semibold text-sm text-[var(--text-primary)]">Notifications</p>
                  <button onClick={() => setNotifOpen(false)} className="p-1 rounded-lg hover:bg-[var(--background-muted)] text-[var(--text-muted)]">
                    <X size={15} />
                  </button>
                </div>
                <div className="divide-y divide-[var(--border-color)]">
                  {NOTIFS.map(({ id, title: t, body, time, dot }) => (
                    <div key={id} className="flex items-start gap-3 px-4 py-3 hover:bg-[var(--background-soft)] cursor-pointer transition-colors">
                      <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: dot }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{t}</p>
                        <p className="text-xs text-[var(--text-muted)] mt-0.5">{body}</p>
                      </div>
                      <span className="text-xs text-[var(--text-muted)] flex-shrink-0">{time}</span>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2.5 border-t border-[var(--border-color)]">
                  <button className="text-xs text-[var(--accent-primary)] font-semibold hover:underline w-full text-center">
                    Tout marquer comme lu
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Avatar → profile */}
        <Link
          href={`${base}/profile`}
          className="w-10 h-10 rounded-xl bg-[var(--accent-primary)] flex items-center justify-center text-white font-bold text-sm hover:opacity-90 transition-opacity ml-0.5"
        >
          {initials}
        </Link>
      </div>
    </header>
  );
}
