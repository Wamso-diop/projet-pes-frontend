import {
  Users, BookOpen, TrendingUp,
  UserCheck, AlertCircle, GraduationCap, CalendarDays,
  ChevronRight, ArrowUpRight, Activity, FileText,
} from 'lucide-react';
import Link from 'next/link';

const KPI_CARDS = [
  { label: 'Élèves inscrits',        value: '152', delta: '+8 ce mois',        icon: GraduationCap, color: '#2563EB', bg: '#EFF6FF', href: 'users'    },
  { label: 'Enseignants actifs',      value: '12',  delta: '3 nouveaux',         icon: UserCheck,     color: '#16A34A', bg: '#F0FDF4', href: 'users'    },
  { label: 'Inscriptions en attente', value: '4',   delta: 'À traiter',          icon: AlertCircle,   color: '#EF4444', bg: '#FEF2F2', href: 'users'    },
  { label: 'Cours ce mois',           value: '89',  delta: '+12 vs mois passé',  icon: BookOpen,      color: '#7C3AED', bg: '#F5F3FF', href: 'schedule' },
  { label: 'Taux de réussite',        value: '94%', delta: '+2 pts vs an passé', icon: TrendingUp,    color: '#D97706', bg: '#FFFBEB', href: 'stats'    },
  { label: 'RDV cette semaine',       value: '23',  delta: "5 aujourd'hui",      icon: CalendarDays,  color: '#0891B2', bg: '#ECFEFF', href: 'schedule' },
] as const;

const RECENT_INSCRIPTIONS = [
  { name: 'Emma Nkemdirim',  role: 'Élève',      detail: 'Terminale D', status: 'pending',  time: 'Il y a 2h', avatar: 'EN', color: '#2563EB' },
  { name: 'Paul Tchinda',    role: 'Parent',     detail: 'Lucas, 3e',   status: 'approved', time: 'Il y a 4h', avatar: 'PT', color: '#16A34A' },
  { name: 'Dr Mireille Eto', role: 'Enseignant', detail: 'Physique',    status: 'pending',  time: 'Hier',      avatar: 'ME', color: '#7C3AED' },
  { name: 'Chloé Bassa',     role: 'Élève',      detail: '5e',          status: 'approved', time: 'Hier',      avatar: 'CB', color: '#D97706' },
  { name: 'Marc Tchoua',     role: 'Élève',      detail: '3e B',        status: 'pending',  time: '2 jours',   avatar: 'MT', color: '#0891B2' },
];

const STATUS_STYLES = {
  pending:  { label: 'En attente', bg: '#FEF3C7', color: '#D97706' },
  approved: { label: 'Approuvé',   bg: '#D1FAE5', color: '#16A34A' },
  rejected: { label: 'Refusé',     bg: '#FEE2E2', color: '#EF4444' },
};

const QUICK_ACTIONS = [
  { icon: Users,    label: 'Utilisateurs', href: 'users',    color: '#2563EB', bg: '#EFF6FF' },
  { icon: CalendarDays, label: 'Planning', href: 'schedule', color: '#7C3AED', bg: '#F5F3FF' },
  { icon: Activity, label: 'Statistiques', href: 'stats',    color: '#16A34A', bg: '#F0FDF4' },
  { icon: FileText, label: 'Contenu',      href: 'content',  color: '#D97706', bg: '#FFFBEB' },
];

export default function AdminDashboard() {
  return (
    <div className="p-4 md:p-6 space-y-5">

      {/* Welcome banner */}
      <div
        className="rounded-2xl p-6 md:p-8 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1D4ED8 0%, #7C3AED 100%)' }}
      >
        <div className="relative z-10">
          <p className="text-white/65 text-sm font-medium mb-1">Tableau de bord — Admin</p>
          <h1 className="font-display font-black text-3xl md:text-4xl leading-tight">PES Douala</h1>
          <p className="text-white/55 text-sm mt-1">Année scolaire 2025–2026 · Trimestre 2</p>

          <div className="flex flex-wrap gap-6 md:gap-10 mt-5">
            <div>
              <p className="font-display font-black text-3xl text-white leading-none">14.8<span className="text-xl text-white/50">/20</span></p>
              <p className="text-white/50 text-xs mt-1">Moy. générale</p>
            </div>
            <div>
              <p className="font-display font-black text-3xl text-white leading-none">91%</p>
              <p className="text-white/50 text-xs mt-1">Taux de présence</p>
            </div>
            <div>
              <p className="font-display font-black text-3xl text-white leading-none">8.4</p>
              <p className="text-white/50 text-xs mt-1">Questions / jour</p>
            </div>
          </div>

          {/* Progress bar — inscriptions */}
          <div className="mt-5 max-w-sm">
            <div className="flex justify-between text-xs text-white/50 mb-2">
              <span>Objectif inscriptions</span>
              <span>152 / 200</span>
            </div>
            <div className="h-2 rounded-full bg-white/15">
              <div className="h-full rounded-full bg-white/75" style={{ width: '76%' }} />
            </div>
          </div>
        </div>
        <div className="absolute -right-8 -top-8 w-48 h-48 rounded-full bg-white/5" />
        <div className="absolute -right-4 -bottom-12 w-64 h-64 rounded-full bg-white/5" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/5 hidden lg:block" />
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {KPI_CARDS.map(({ label, value, delta, icon: Icon, color, bg, href }) => (
          <Link
            key={label}
            href={href}
            className="p-4 md:p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--background)] hover:shadow-[0_4px_20px_rgb(0_0_0/0.08)] transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: bg }}>
                <Icon size={20} style={{ color }} />
              </div>
              <ArrowUpRight
                size={15}
                className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity mt-0.5"
              />
            </div>
            <p className="font-display font-black text-3xl md:text-4xl text-[var(--text-primary)] leading-none">{value}</p>
            <p className="text-sm text-[var(--text-secondary)] mt-1.5 leading-snug">{label}</p>
            <p className="text-xs font-semibold mt-1" style={{ color }}>{delta}</p>
          </Link>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

        {/* Recent inscriptions — 2/3 width */}
        <div className="xl:col-span-2 rounded-2xl border border-[var(--border-color)] bg-[var(--background)] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-color)]">
            <div className="flex items-center gap-2">
              <Users size={16} className="text-[var(--accent-primary)]" />
              <h2 className="font-semibold text-[var(--text-primary)]">Dernières inscriptions</h2>
            </div>
            <Link
              href="users"
              className="text-sm text-[var(--accent-primary)] font-medium hover:underline flex items-center gap-1"
            >
              Voir tout <ChevronRight size={14} />
            </Link>
          </div>
          <div className="divide-y divide-[var(--border-color)]">
            {RECENT_INSCRIPTIONS.map(({ name, role, detail, status, time, avatar, color }) => {
              const st = STATUS_STYLES[status as keyof typeof STATUS_STYLES];
              return (
                <div
                  key={name}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-[var(--background-soft)] transition-colors"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: color }}
                  >
                    {avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{role} · {detail}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-lg"
                      style={{ backgroundColor: st.bg, color: st.color }}
                    >
                      {st.label}
                    </span>
                    <span className="text-xs text-[var(--text-muted)]">{time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick actions — 1/3 width */}
        <div className="space-y-3">
          <h2 className="font-semibold text-[var(--text-primary)] px-1">Actions rapides</h2>
          {QUICK_ACTIONS.map(({ icon: Icon, label, href, color, bg }) => (
            <Link
              key={label}
              href={href}
              className="flex items-center gap-4 p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--background)] hover:shadow-[0_4px_16px_rgb(0_0_0/0.07)] transition-all group"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: bg }}
              >
                <Icon size={20} style={{ color }} />
              </div>
              <span className="flex-1 text-sm font-semibold text-[var(--text-primary)]">{label}</span>
              <ChevronRight
                size={15}
                className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </Link>
          ))}
        </div>

      </div>

    </div>
  );
}
