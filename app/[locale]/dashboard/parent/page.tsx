import { TrendingUp, Calendar, BookOpen, Star, ChevronRight, Clock, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const CHILD = {
  name: 'Lucas Tchinda', level: '3e', avg: 15.2, progress: +1.4, rank: 2,
  nextClass: { subject: 'Mathématiques', date: 'Lun 21 avr.', time: '14h–16h', teacher: 'M. Mbida' },
};

const RECENT_GRADES = [
  { subject: 'Mathématiques', grade: 16, coef: 4, date: '18 avr.' },
  { subject: 'Physique',       grade: 14, coef: 3, date: '15 avr.' },
  { subject: 'Français',       grade: 13, coef: 3, date: '12 avr.' },
  { subject: 'Anglais',        grade: 17, coef: 2, date: '10 avr.' },
];

const UPCOMING = [
  { subject: 'Mathématiques',  date: 'Lun 21 avr.', time: '14h–16h', type: 'class'   },
  { subject: 'Physique-Chimie',date: 'Mar 22 avr.', time: '10h–12h', type: 'class'   },
  { subject: 'RDV M. Mbida',   date: 'Mer 23 avr.', time: '17h',     type: 'meeting' },
];

const gradeColor = (g: number) =>
  g >= 16 ? '#16A34A' : g >= 12 ? '#2563EB' : g >= 10 ? '#D97706' : '#EF4444';

export default function ParentDashboard() {
  const pct = Math.min(100, Math.round((CHILD.avg / 16) * 100));

  return (
    <div className="p-4 md:p-6 max-w-6xl space-y-6">

      {/* Child banner */}
      <div
        className="rounded-2xl p-5 md:p-6 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #16A34A 0%, #0891B2 100%)' }}
      >
        <div className="relative z-10">
          <p className="text-white/70 text-sm mb-1">Suivi de votre enfant</p>
          <h1 className="font-display font-black text-2xl md:text-3xl">{CHILD.name}</h1>
          <p className="text-white/65 text-sm mt-1">{CHILD.level} · PES Douala</p>

          <div className="flex items-center gap-6 mt-4">
            <div>
              <p className="text-2xl font-display font-black text-white">{CHILD.avg}/20</p>
              <p className="text-white/55 text-xs">Moyenne générale</p>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <TrendingUp size={16} className="text-green-200" />
                <p className="text-2xl font-display font-black text-white">+{CHILD.progress}</p>
              </div>
              <p className="text-white/55 text-xs">Progression ce mois</p>
            </div>
            <div>
              <p className="text-2xl font-display font-black text-white">#{CHILD.rank}</p>
              <p className="text-white/55 text-xs">Rang dans la classe</p>
            </div>
          </div>

          {/* Progress toward 16 */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-white/55 mb-2">
              <span>Progression vers 16/20</span>
              <span>{pct}%</span>
            </div>
            <div className="h-2.5 rounded-full bg-white/15">
              <div className="h-full rounded-full bg-white/80" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>
        <div className="absolute -right-6 -top-6 w-36 h-36 rounded-full bg-white/5" />
        <div className="absolute -right-2 -bottom-8 w-52 h-52 rounded-full bg-white/5" />
      </div>

      {/* Quick nav */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: Star,      label: 'Notes',       href: 'progress',     color: '#F59E0B', bg: '#FFFBEB' },
          { icon: Calendar,  label: 'Calendrier',  href: 'calendar',     color: '#2563EB', bg: '#EFF6FF' },
          { icon: BookOpen,  label: 'Rendez-vous', href: 'appointments', color: '#7C3AED', bg: '#F5F3FF' },
          { icon: TrendingUp,label: 'Suivi',       href: 'progress',     color: '#16A34A', bg: '#F0FDF4' },
        ].map(({ icon: Icon, label, href, color, bg }) => (
          <Link
            key={label}
            href={href}
            className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--background)] hover:shadow-[0_4px_20px_rgb(0_0_0/0.08)] transition-all text-center"
          >
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: bg }}>
              <Icon size={22} style={{ color }} />
            </div>
            <p className="text-sm font-semibold text-[var(--text-primary)]">{label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Recent grades */}
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-color)]">
            <div className="flex items-center gap-2">
              <Star size={16} className="text-[#F59E0B]" />
              <h2 className="font-semibold text-[var(--text-primary)]">Dernières notes</h2>
            </div>
            <Link href="progress" className="text-sm text-[var(--accent-primary)] hover:underline flex items-center gap-1">
              Voir tout <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="divide-y divide-[var(--border-color)]">
            {RECENT_GRADES.map(({ subject, grade, coef, date }) => (
              <div key={subject} className="flex items-center gap-4 px-5 py-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{subject}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">Coef {coef} · {date}</p>
                </div>
                <span className="text-2xl font-display font-black leading-none" style={{ color: gradeColor(grade) }}>
                  {grade}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming */}
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-color)]">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-[var(--accent-primary)]" />
              <h2 className="font-semibold text-[var(--text-primary)]">À venir</h2>
            </div>
            <Link href="calendar" className="text-sm text-[var(--accent-primary)] hover:underline flex items-center gap-1">
              Calendrier <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="divide-y divide-[var(--border-color)]">
            {UPCOMING.map(({ subject, date, time, type }) => (
              <div key={subject + date} className="flex items-center gap-4 px-5 py-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: type === 'meeting' ? '#F5F3FF' : '#EFF6FF',
                    color: type === 'meeting' ? '#7C3AED' : '#2563EB',
                  }}
                >
                  {type === 'meeting' ? <Calendar size={18} /> : <BookOpen size={18} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{subject}</p>
                  <div className="flex items-center gap-1 text-xs text-[var(--text-muted)] mt-0.5">
                    <Clock size={11} /> {date} · {time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
