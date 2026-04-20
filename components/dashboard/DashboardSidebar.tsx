'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import {
  Home, TrendingUp, Calendar, CalendarDays,
  FolderOpen, HelpCircle, BarChart2,
  Upload, MessageSquare, ClipboardList,
  LayoutDashboard, Users, PieChart, Settings,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Role } from '@/types';

type NavItem = {
  key: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  href: string;
  badgeKey?: string;
};

const NAV_CONFIG: Record<Role, { items: NavItem[]; label: string; ns: string }> = {
  admin: {
    label: 'Administration',
    ns: 'dashboard.admin',
    items: [
      { key: 'home',       icon: LayoutDashboard, href: ''          },
      { key: 'users',      icon: Users,           href: '/users'    },
      { key: 'planning',   icon: CalendarDays,    href: '/schedule' },
      { key: 'stats',      icon: PieChart,        href: '/stats'    },
      { key: 'management', icon: Settings,        href: '/content'  },
    ],
  },
  parent: {
    label: 'Espace Parent',
    ns: 'dashboard.parent',
    items: [
      { key: 'home',         icon: Home,         href: ''              },
      { key: 'progress',     icon: TrendingUp,   href: '/progress'     },
      { key: 'calendar',     icon: Calendar,     href: '/calendar'     },
      { key: 'appointments', icon: CalendarDays, href: '/appointments' },
    ],
  },
  student: {
    label: 'Espace Élève',
    ns: 'dashboard.student',
    items: [
      { key: 'home',      icon: Home,       href: ''           },
      { key: 'resources', icon: FolderOpen, href: '/resources' },
      { key: 'questions', icon: HelpCircle, href: '/questions', badgeKey: 'questions' },
      { key: 'progress',  icon: BarChart2,  href: '/progress'  },
    ],
  },
  teacher: {
    label: 'Espace Enseignant',
    ns: 'dashboard.teacher',
    items: [
      { key: 'home',      icon: Home,          href: ''           },
      { key: 'publish',   icon: Upload,        href: '/resources' },
      { key: 'questions', icon: MessageSquare, href: '/questions', badgeKey: 'questions' },
      { key: 'grades',    icon: ClipboardList, href: '/grades'    },
    ],
  },
};

interface DashboardSidebarProps {
  role: Role;
  badgeCounts?: Partial<Record<string, number>>;
  userName?: string;
  userEmail?: string;
}

export default function DashboardSidebar({
  role,
  badgeCounts = {},
  userName = 'Utilisateur',
  userEmail,
}: DashboardSidebarProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations(NAV_CONFIG[role].ns as Parameters<typeof useTranslations>[0]);
  const { items, label } = NAV_CONFIG[role];
  const base = `/${locale}/dashboard/${role}`;

  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <aside
      className="hidden md:flex flex-col w-60 h-screen fixed left-0 top-0 z-30 border-r border-white/5"
      style={{ background: '#0D1626' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 h-16 border-b border-white/8 flex-shrink-0">
        <div className="w-8 h-8 rounded-lg bg-[#2563EB] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
          P
        </div>
        <div>
          <p className="text-white font-display font-bold text-sm leading-tight">PES</p>
          <p className="text-white/40 text-[10px] leading-tight">{label}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="text-white/25 text-[10px] font-semibold uppercase tracking-widest px-3 mb-3">
          Menu
        </p>
        {items.map(({ key, icon: Icon, href, badgeKey }) => {
          const fullHref = `${base}${href}`;
          const isActive =
            href === ''
              ? pathname === base || pathname === `${base}/`
              : pathname.startsWith(fullHref);
          const badgeCount = badgeKey ? badgeCounts[badgeKey] : undefined;

          return (
            <Link
              key={key}
              href={fullHref}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group',
                isActive
                  ? 'bg-white/10 text-white'
                  : 'text-white/50 hover:text-white/85 hover:bg-white/6',
              )}
            >
              <Icon
                size={17}
                className={cn(
                  'flex-shrink-0 transition-colors',
                  isActive ? 'text-[#60A5FA]' : 'text-white/35 group-hover:text-white/65',
                )}
              />
              <span className="flex-1">{t(key as Parameters<typeof t>[0])}</span>
              {badgeCount !== undefined && badgeCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#EF4444] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                  {badgeCount > 9 ? '9+' : badgeCount}
                </span>
              )}
              {isActive && !badgeCount && (
                <div className="w-1.5 h-1.5 rounded-full bg-[#60A5FA] flex-shrink-0" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Settings */}
      <div className="px-3 pb-2 border-t border-white/6 pt-3">
        <Link
          href={`/${locale}/dashboard/${role}/settings`}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white/75 hover:bg-white/6 transition-all duration-150"
        >
          <Settings size={17} className="flex-shrink-0" />
          <span>Paramètres</span>
        </Link>
      </div>

      {/* User profile — cliquable vers /profile */}
      <Link
        href={`${base}/profile`}
        className="px-4 py-4 border-t border-white/6 flex items-center gap-3 hover:bg-white/4 transition-colors group"
      >
        <div className="w-9 h-9 rounded-xl bg-[#1E3A5F] border border-[#2563EB]/40 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 group-hover:border-[#2563EB]/70 transition-colors">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-semibold truncate leading-tight">{userName}</p>
          {userEmail && (
            <p className="text-white/30 text-[10px] truncate leading-tight">{userEmail}</p>
          )}
        </div>
        <button
          onClick={e => e.preventDefault()}
          className="text-white/25 hover:text-white/65 transition-colors p-1 rounded-lg hover:bg-white/6"
          aria-label="Déconnexion"
        >
          <LogOut size={15} />
        </button>
      </Link>
    </aside>
  );
}
