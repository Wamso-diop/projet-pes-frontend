import type { LucideIcon } from 'lucide-react';

// ============================================================
// ROLES
// ============================================================
export type Role = 'parent' | 'student' | 'teacher' | 'admin';

export const ROLE_COLORS: Record<Role, string> = {
  parent:  'var(--role-parent)',
  student: 'var(--role-student)',
  teacher: 'var(--role-teacher)',
  admin:   'var(--role-admin)',
};

// ============================================================
// NAVIGATION
// ============================================================
export interface NavTabConfig {
  icon: LucideIcon;
  labelKey: string;       // clé i18n
  href: string;
  badgeCount?: number;    // undefined = pas de badge
}

export interface BottomNavProps {
  className?: string;
}

// ============================================================
// AUTH
// ============================================================
export interface User {
  id: string;
  email: string;
  role: Role;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
