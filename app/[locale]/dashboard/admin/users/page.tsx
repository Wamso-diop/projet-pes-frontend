'use client';

import { useState } from 'react';
import { Search, Filter, UserPlus, MoreVertical, CheckCircle, XCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

type Role = 'student' | 'parent' | 'teacher';
type Status = 'active' | 'pending' | 'suspended';

interface UserRow {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: Status;
  joined: string;
  detail: string;
}

const USERS: UserRow[] = [
  { id: '1',  name: 'Emma Nkemdirim',   email: 'emma.n@gmail.com',      role: 'student', status: 'pending',   joined: '20 avr. 2026', detail: 'Terminale D' },
  { id: '2',  name: 'Paul Tchinda',      email: 'p.tchinda@gmail.com',   role: 'parent',  status: 'active',    joined: '18 avr. 2026', detail: 'Parent de Lucas' },
  { id: '3',  name: 'Dr Mireille Eto',   email: 'm.eto@pes.cm',          role: 'teacher', status: 'pending',   joined: '17 avr. 2026', detail: 'Physique-Chimie' },
  { id: '4',  name: 'Chloé Bassa',       email: 'chloe.b@gmail.com',     role: 'student', status: 'active',    joined: '15 avr. 2026', detail: '5e' },
  { id: '5',  name: 'Jean Essama',       email: 'j.essama@gmail.com',     role: 'parent',  status: 'active',    joined: '12 avr. 2026', detail: 'Parent de Nathan' },
  { id: '6',  name: 'Prof. Alain Mbida', email: 'a.mbida@pes.cm',         role: 'teacher', status: 'active',    joined: '10 avr. 2026', detail: 'Mathématiques' },
  { id: '7',  name: 'Lucas Tchinda',     email: 'lucas.t@gmail.com',      role: 'student', status: 'active',    joined: '18 avr. 2026', detail: '3e' },
  { id: '8',  name: 'Sophie Kemgne',    email: 's.kemgne@gmail.com',     role: 'student', status: 'suspended', joined: '5 avr. 2026',  detail: '2nde C' },
  { id: '9',  name: 'Marie Nkomo',       email: 'marie.n@gmail.com',      role: 'parent',  status: 'active',    joined: '3 avr. 2026',  detail: 'Parent de Jacques' },
  { id: '10', name: 'Nathan Essama',     email: 'nathan.e@gmail.com',     role: 'student', status: 'active',    joined: '12 avr. 2026', detail: '1re A' },
];

const ROLE_STYLES: Record<Role, { label: string; bg: string; color: string }> = {
  student: { label: 'Élève',       bg: '#EFF6FF', color: '#2563EB' },
  parent:  { label: 'Parent',      bg: '#F0FDF4', color: '#16A34A' },
  teacher: { label: 'Enseignant',  bg: '#FFFBEB', color: '#D97706' },
};

const STATUS_STYLES: Record<Status, { label: string; icon: typeof CheckCircle; color: string }> = {
  active:    { label: 'Actif',       icon: CheckCircle, color: '#16A34A' },
  pending:   { label: 'En attente',  icon: Clock,       color: '#D97706' },
  suspended: { label: 'Suspendu',    icon: XCircle,     color: '#EF4444' },
};

const FILTER_TABS = [
  { key: 'all',     label: 'Tous' },
  { key: 'student', label: 'Élèves' },
  { key: 'parent',  label: 'Parents' },
  { key: 'teacher', label: 'Enseignants' },
  { key: 'pending', label: 'En attente' },
] as const;

export default function AdminUsersPage() {
  const [filter, setFilter] = useState<'all' | Role | 'pending'>('all');
  const [search, setSearch] = useState('');
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const filtered = USERS.filter((u) => {
    const matchFilter =
      filter === 'all' ? true :
      filter === 'pending' ? u.status === 'pending' :
      u.role === filter;
    const matchSearch =
      search === '' ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const counts = {
    all: USERS.length,
    student: USERS.filter((u) => u.role === 'student').length,
    parent: USERS.filter((u) => u.role === 'parent').length,
    teacher: USERS.filter((u) => u.role === 'teacher').length,
    pending: USERS.filter((u) => u.status === 'pending').length,
  };

  return (
    <div className="p-4 md:p-6 space-y-4">

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Rechercher un utilisateur…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-[var(--border-color)] bg-[var(--background)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/30 focus:border-[var(--accent-primary)] transition-colors"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl border border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--background-muted)] transition-colors">
          <Filter size={15} />
          Filtres
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl bg-[var(--accent-primary)] text-white hover:opacity-90 transition-opacity shadow-[0_2px_8px_rgb(37_99_235/0.3)]">
          <UserPlus size={15} />
          Ajouter
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1.5 flex-wrap">
        {FILTER_TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors',
              filter === key
                ? 'bg-[var(--accent-primary)] text-white shadow-[0_2px_8px_rgb(37_99_235/0.25)]'
                : 'bg-[var(--background)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--background-muted)]',
            )}
          >
            {label}
            <span
              className={cn(
                'px-1.5 py-0.5 rounded-md text-[10px] font-bold',
                filter === key ? 'bg-white/20 text-white' : 'bg-[var(--background-muted)] text-[var(--text-muted)]',
              )}
            >
              {counts[key]}
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)] overflow-hidden">
        {/* Desktop table header */}
        <div className="hidden md:grid grid-cols-[2fr_2fr_1fr_1fr_1fr_40px] gap-4 px-5 py-3 border-b border-[var(--border-color)] text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide">
          <span>Nom</span>
          <span>Email</span>
          <span>Rôle</span>
          <span>Statut</span>
          <span>Inscrit le</span>
          <span />
        </div>

        {filtered.length === 0 ? (
          <div className="py-16 text-center text-sm text-[var(--text-muted)]">
            Aucun utilisateur trouvé
          </div>
        ) : (
          <div className="divide-y divide-[var(--border-color)]">
            {filtered.map((user) => {
              const roleStyle  = ROLE_STYLES[user.role];
              const statusInfo = STATUS_STYLES[user.status];
              const StatusIcon = statusInfo.icon;
              return (
                <div
                  key={user.id}
                  className="relative grid grid-cols-[1fr_40px] md:grid-cols-[2fr_2fr_1fr_1fr_1fr_40px] gap-4 items-center px-5 py-3.5 hover:bg-[var(--background-soft)] transition-colors"
                >
                  {/* Name + detail */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-[var(--background-muted)] flex items-center justify-center text-xs font-bold text-[var(--text-secondary)] flex-shrink-0">
                      {user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{user.name}</p>
                      <p className="text-[10px] text-[var(--text-muted)] truncate md:hidden">{user.email}</p>
                      <p className="text-xs text-[var(--text-muted)] truncate hidden md:block">{user.detail}</p>
                    </div>
                  </div>

                  {/* Email — desktop */}
                  <p className="hidden md:block text-sm text-[var(--text-secondary)] truncate">{user.email}</p>

                  {/* Role badge */}
                  <span
                    className="hidden md:inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-semibold w-fit"
                    style={{ backgroundColor: roleStyle.bg, color: roleStyle.color }}
                  >
                    {roleStyle.label}
                  </span>

                  {/* Status */}
                  <div className="hidden md:flex items-center gap-1.5">
                    <StatusIcon size={13} style={{ color: statusInfo.color }} />
                    <span className="text-xs font-medium" style={{ color: statusInfo.color }}>
                      {statusInfo.label}
                    </span>
                  </div>

                  {/* Date */}
                  <p className="hidden md:block text-xs text-[var(--text-muted)]">{user.joined}</p>

                  {/* Actions */}
                  <div className="relative flex justify-end">
                    <button
                      onClick={() => setOpenMenu(openMenu === user.id ? null : user.id)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--background-muted)] transition-colors"
                    >
                      <MoreVertical size={15} />
                    </button>
                    {openMenu === user.id && (
                      <div className="absolute right-0 top-9 z-10 w-44 rounded-xl border border-[var(--border-color)] bg-[var(--background)] shadow-[0_8px_24px_rgb(0_0_0/0.12)] py-1 text-sm">
                        <button className="w-full px-4 py-2 text-left text-[var(--text-primary)] hover:bg-[var(--background-muted)] transition-colors">
                          Voir le profil
                        </button>
                        {user.status === 'pending' && (
                          <button className="w-full px-4 py-2 text-left text-[#16A34A] hover:bg-[var(--background-muted)] transition-colors font-medium">
                            Approuver
                          </button>
                        )}
                        {user.status === 'active' && (
                          <button className="w-full px-4 py-2 text-left text-[#EF4444] hover:bg-[var(--background-muted)] transition-colors">
                            Suspendre
                          </button>
                        )}
                        {user.status === 'suspended' && (
                          <button className="w-full px-4 py-2 text-left text-[#16A34A] hover:bg-[var(--background-muted)] transition-colors">
                            Réactiver
                          </button>
                        )}
                        <button className="w-full px-4 py-2 text-left text-[#EF4444] hover:bg-[var(--background-muted)] transition-colors">
                          Supprimer
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[var(--border-color)] flex items-center justify-between text-xs text-[var(--text-muted)]">
          <span>{filtered.length} utilisateur{filtered.length > 1 ? 's' : ''}</span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded-lg border border-[var(--border-color)] hover:bg-[var(--background-muted)] transition-colors disabled:opacity-40" disabled>
              Précédent
            </button>
            <span className="px-3 py-1.5 rounded-lg bg-[var(--accent-primary)] text-white font-medium">1</span>
            <button className="px-3 py-1.5 rounded-lg border border-[var(--border-color)] hover:bg-[var(--background-muted)] transition-colors disabled:opacity-40" disabled>
              Suivant
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
