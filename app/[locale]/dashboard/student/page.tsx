import { BookOpen, HelpCircle, BarChart2, Trophy, ChevronRight, Clock, Zap, Flame, Star, Target } from 'lucide-react';
import Link from 'next/link';

const STUDENT = { name: 'Lucas', level: '3e', avg: 15.2, points: 340, rank: 2 };

const TODAY_CLASSES = [
  { subject: 'Mathématiques', time: '14h–16h', teacher: 'M. Mbida', room: 'Salle 1', done: true  },
  { subject: 'Physique',       time: '16h–18h', teacher: 'Dr Eto',   room: 'Salle 3', done: false },
];

const RECENT_RESOURCES = [
  { title: 'Exercices — Équations du 2nd degré', subject: 'Maths',   type: 'PDF',   date: 'Hier'    },
  { title: 'Cours — Cinématique',                subject: 'Physique', type: 'PDF',   date: '18 avr.' },
  { title: 'Fiche révision — La Guerre Froide',  subject: 'Histoire', type: 'Fiche', date: '15 avr.' },
];

const BADGES = [
  { icon: Trophy, label: 'Top 3 du mois',    earned: true,  bg: 'linear-gradient(135deg,#F59E0B,#D97706)' },
  { icon: Flame,  label: '5 jours consécutifs', earned: true, bg: 'linear-gradient(135deg,#EF4444,#DC2626)' },
  { icon: BookOpen,label: '10 ressources',   earned: true,  bg: 'linear-gradient(135deg,#2563EB,#1D4ED8)' },
  { icon: Star,   label: 'Note parfaite',    earned: false, bg: 'linear-gradient(135deg,#7C3AED,#6D28D9)' },
];

export default function StudentDashboard() {
  const pct = Math.round((STUDENT.points / 500) * 100);
  return (
    <div className="p-4 md:p-6 max-w-6xl space-y-6">

      {/* Welcome banner */}
      <div
        className="rounded-2xl p-5 md:p-6 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}
      >
        <div className="relative z-10">
          <p className="text-white/70 text-sm mb-1">Bonjour 👋</p>
          <h1 className="font-display font-black text-2xl md:text-3xl">{STUDENT.name}</h1>
          <p className="text-white/65 text-sm mt-1">{STUDENT.level} · PES Douala</p>

          <div className="flex items-center gap-6 mt-4">
            <div>
              <p className="text-2xl font-display font-black text-white">{STUDENT.avg}/20</p>
              <p className="text-white/55 text-xs">Moyenne générale</p>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <Zap size={16} className="text-yellow-300" />
                <p className="text-2xl font-display font-black text-white">{STUDENT.points}</p>
              </div>
              <p className="text-white/55 text-xs">Points XP</p>
            </div>
            <div>
              <p className="text-2xl font-display font-black text-white">#{STUDENT.rank} 🥈</p>
              <p className="text-white/55 text-xs">Classement</p>
            </div>
          </div>

          {/* XP bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-white/55 mb-2">
              <span>Vers le niveau suivant</span>
              <span>{STUDENT.points} / 500 XP</span>
            </div>
            <div className="h-2.5 rounded-full bg-white/15">
              <div className="h-full rounded-full bg-white/80" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>
        <div className="absolute -right-6 -top-6 w-36 h-36 rounded-full bg-white/5" />
        <div className="absolute -right-2 -bottom-8 w-52 h-52 rounded-full bg-white/5" />
      </div>

      {/* Today's classes */}
      <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-[var(--accent-primary)]" />
            <h2 className="font-semibold text-[var(--text-primary)]">Cours aujourd&apos;hui</h2>
          </div>
        </div>
        <div className="divide-y divide-[var(--border-color)]">
          {TODAY_CLASSES.map(({ subject, time, teacher, room, done }) => (
            <div key={subject} className="flex items-center gap-4 px-5 py-4">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: done ? '#F0FDF4' : '#EFF6FF', color: done ? '#16A34A' : '#2563EB' }}
              >
                <BookOpen size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[var(--text-primary)]">{subject}</p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{time} · {teacher} · {room}</p>
              </div>
              <span
                className="text-xs font-semibold px-3 py-1.5 rounded-lg flex-shrink-0"
                style={done
                  ? { backgroundColor: '#D1FAE5', color: '#16A34A' }
                  : { backgroundColor: '#EFF6FF', color: '#2563EB' }}
              >
                {done ? 'Terminé' : 'À venir'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Recent resources */}
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-color)]">
            <div className="flex items-center gap-2">
              <BookOpen size={16} className="text-[var(--accent-primary)]" />
              <h2 className="font-semibold text-[var(--text-primary)]">Ressources récentes</h2>
            </div>
            <Link href="resources" className="text-sm text-[var(--accent-primary)] hover:underline flex items-center gap-0.5">
              Voir tout <ChevronRight size={14} />
            </Link>
          </div>
          <div className="divide-y divide-[var(--border-color)]">
            {RECENT_RESOURCES.map(({ title, subject, type, date }) => (
              <div key={title} className="flex items-center gap-3 px-5 py-4 cursor-pointer hover:bg-[var(--background-soft)] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] flex items-center justify-center text-xs font-bold text-[#2563EB] flex-shrink-0">
                  {type}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{title}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">{subject} · {date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badges */}
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-color)]">
            <div className="flex items-center gap-2">
              <Trophy size={16} className="text-[#F59E0B]" />
              <h2 className="font-semibold text-[var(--text-primary)]">Mes badges</h2>
            </div>
            <Link href="progress" className="text-sm text-[var(--accent-primary)] hover:underline flex items-center gap-0.5">
              Voir tout <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 p-4">
            {BADGES.map(({ icon: Icon, label, earned, bg }) => (
              <div
                key={label}
                className="rounded-2xl p-4 relative overflow-hidden"
                style={earned
                  ? { background: bg }
                  : { backgroundColor: 'var(--background-soft)', border: '1px solid var(--border-color)' }}
              >
                <div className={`w-10 h-10 rounded-xl mb-3 flex items-center justify-center ${earned ? 'bg-white/20' : 'bg-[var(--background-muted)]'}`}>
                  <Icon size={20} color={earned ? '#fff' : '#9CA3AF'} />
                </div>
                <p className={`text-xs font-bold leading-tight ${earned ? 'text-white' : 'text-[var(--text-muted)]'}`}>{label}</p>
                {earned && <div className="absolute -right-3 -bottom-3 w-14 h-14 rounded-full bg-white/10" />}
                {!earned && (
                  <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[var(--background-muted)] flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5">
                      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: HelpCircle, label: 'Poser une question', href: 'questions', color: '#7C3AED', bg: '#F5F3FF' },
            { icon: BookOpen,   label: 'Mes ressources',     href: 'resources', color: '#2563EB', bg: '#EFF6FF' },
            { icon: BarChart2,  label: 'Mon suivi',          href: 'progress',  color: '#16A34A', bg: '#F0FDF4' },
            { icon: Trophy,     label: 'Classement',         href: 'progress',  color: '#F59E0B', bg: '#FFFBEB' },
          ].map(({ icon: Icon, label, href, color, bg }) => (
            <Link
              key={label}
              href={href}
              className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--background)] hover:shadow-[0_4px_20px_rgb(0_0_0/0.08)] transition-all text-center"
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: bg }}>
                <Icon size={22} style={{ color }} />
              </div>
              <p className="text-xs font-semibold text-[var(--text-primary)] leading-tight">{label}</p>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
