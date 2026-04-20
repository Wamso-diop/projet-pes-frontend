'use client';

import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import {
  Home, TrendingUp, Calendar, Smartphone, User,
  FolderOpen, HelpCircle, BarChart2,
  Upload, MessageSquare, ClipboardList,
  LayoutDashboard, Users, CalendarDays, PieChart, Settings,
} from 'lucide-react';
import NavTab from './NavTab';
import type { Role } from '@/types';

const ROLE_COLORS: Record<Role, string> = {
  parent:  'var(--role-parent)',
  student: 'var(--role-student)',
  teacher: 'var(--role-teacher)',
  admin:   'var(--role-admin)',
};

interface DashboardBottomNavProps {
  role: Role;
  badgeCounts?: Partial<Record<string, number>>;
}

export default function DashboardBottomNav({ role, badgeCounts = {} }: DashboardBottomNavProps) {
  const pathname = usePathname();
  const locale = useLocale();
  const tParent  = useTranslations('dashboard.parent');
  const tStudent = useTranslations('dashboard.student');
  const tTeacher = useTranslations('dashboard.teacher');
  const tAdmin   = useTranslations('dashboard.admin');

  const base = `/${locale}/dashboard`;
  const roleColor = ROLE_COLORS[role];

  const tabsByRole = {
    parent: [
      { icon: Home,        label: tParent('home'),         href: `${base}/parent` },
      { icon: TrendingUp,  label: tParent('progress'),     href: `${base}/parent/progress` },
      { icon: Calendar,    label: tParent('calendar'),     href: `${base}/parent/calendar` },
      { icon: Smartphone,  label: tParent('appointments'), href: `${base}/parent/appointments` },
      { icon: User,        label: tParent('profile'),      href: `${base}/parent/profile` },
    ],
    student: [
      { icon: Home,        label: tStudent('home'),       href: `${base}/student` },
      { icon: FolderOpen,  label: tStudent('resources'),  href: `${base}/student/resources` },
      { icon: HelpCircle,  label: tStudent('questions'),  href: `${base}/student/questions`, badgeKey: 'questions' },
      { icon: BarChart2,   label: tStudent('progress'),   href: `${base}/student/progress` },
      { icon: User,        label: tStudent('profile'),    href: `${base}/student/profile` },
    ],
    teacher: [
      { icon: Home,           label: tTeacher('home'),      href: `${base}/teacher` },
      { icon: Upload,         label: tTeacher('publish'),   href: `${base}/teacher/resources` },
      { icon: MessageSquare,  label: tTeacher('questions'), href: `${base}/teacher/questions`, badgeKey: 'questions' },
      { icon: ClipboardList,  label: tTeacher('grades'),    href: `${base}/teacher/grades` },
      { icon: User,           label: tTeacher('profile'),   href: `${base}/teacher/profile` },
    ],
    admin: [
      { icon: LayoutDashboard, label: tAdmin('home'),       href: `${base}/admin` },
      { icon: Users,           label: tAdmin('users'),      href: `${base}/admin/users`, badgeKey: 'users' },
      { icon: CalendarDays,    label: tAdmin('planning'),   href: `${base}/admin/schedule` },
      { icon: PieChart,        label: tAdmin('stats'),      href: `${base}/admin/stats` },
      { icon: Settings,        label: tAdmin('management'), href: `${base}/admin/content` },
    ],
  };

  const tabs = tabsByRole[role];

  // Fond teinté avec la couleur du rôle (5% opacité)
  const navStyle: React.CSSProperties = {
    background: `color-mix(in srgb, ${roleColor} 5%, color-mix(in srgb, var(--background) 85%, transparent))`,
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
  };

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
      style={navStyle}
    >
      <div className="flex items-stretch h-16">
        {tabs.map((tab) => {
          const isActive =
            tab.href === `${base}/${role}`
              ? pathname === tab.href || pathname === `${tab.href}/`
              : pathname.startsWith(tab.href);

          return (
            <NavTab
              key={tab.href}
              icon={tab.icon}
              label={tab.label}
              href={tab.href}
              isActive={isActive}
              roleColor={roleColor}
              badgeCount={'badgeKey' in tab ? badgeCounts[tab.badgeKey!] : undefined}
            />
          );
        })}
      </div>
    </nav>
  );
}
