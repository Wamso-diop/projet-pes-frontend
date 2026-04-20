'use client';

import { useState } from 'react';
import { TrendingUp, TrendingDown, Users, GraduationCap, BookOpen, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

const PERIOD_TABS = [
  { key: '7d',  label: '7 jours' },
  { key: '30d', label: '30 jours' },
  { key: '3m',  label: '3 mois' },
  { key: '1y',  label: '1 an' },
] as const;

type Period = '7d' | '30d' | '3m' | '1y';

const ENROLLMENT_DATA: Record<Period, { month: string; value: number }[]> = {
  '7d':  [
    { month: 'Lun', value: 2 }, { month: 'Mar', value: 5 }, { month: 'Mer', value: 3 },
    { month: 'Jeu', value: 8 }, { month: 'Ven', value: 4 }, { month: 'Sam', value: 6 }, { month: 'Dim', value: 1 },
  ],
  '30d': [
    { month: 'S1', value: 12 }, { month: 'S2', value: 18 }, { month: 'S3', value: 15 }, { month: 'S4', value: 22 },
  ],
  '3m':  [
    { month: 'Fév', value: 34 }, { month: 'Mar', value: 41 }, { month: 'Avr', value: 29 },
  ],
  '1y':  [
    { month: 'Avr', value: 18 }, { month: 'Mai', value: 22 }, { month: 'Jun', value: 15 },
    { month: 'Jul', value: 8  }, { month: 'Aoû', value: 6  }, { month: 'Sep', value: 35 },
    { month: 'Oct', value: 42 }, { month: 'Nov', value: 38 }, { month: 'Déc', value: 28 },
    { month: 'Jan', value: 31 }, { month: 'Fév', value: 34 }, { month: 'Mar', value: 41 },
  ],
};

const SUBJECT_STATS = [
  { name: 'Mathématiques',   students: 68, rate: 94, color: '#2563EB' },
  { name: 'Physique-Chimie', students: 45, rate: 91, color: '#16A34A' },
  { name: 'Anglais',         students: 52, rate: 97, color: '#D97706' },
  { name: 'Français',        students: 39, rate: 88, color: '#7C3AED' },
  { name: 'SVT',             students: 28, rate: 90, color: '#DB2777' },
  { name: 'Informatique',    students: 21, rate: 96, color: '#0891B2' },
];

const LEVEL_STATS = [
  { level: 'Primaire',     students: 32,  pct: 21 },
  { level: 'Collège',      students: 58,  pct: 38 },
  { level: 'Lycée',        students: 62,  pct: 41 },
];

const TOP_STUDENTS = [
  { name: 'Lucas Tchinda',   avg: 17.5, badge: '🏆', color: '#F59E0B' },
  { name: 'Emma Nkemdirim',  avg: 17.1, badge: '🥈', color: '#94A3B8' },
  { name: 'Nathan Essama',   avg: 16.8, badge: '🥉', color: '#D97706' },
  { name: 'Chloé Bassa',     avg: 16.2, badge: null, color: '#2563EB' },
  { name: 'Amina Fokou',     avg: 15.9, badge: null, color: '#2563EB' },
];

export default function AdminStatsPage() {
  const [period, setPeriod] = useState<Period>('30d');
  const data = ENROLLMENT_DATA[period];
  const maxVal = Math.max(...data.map((d) => d.value));

  return (
    <div className="p-4 md:p-6 space-y-5">

      {/* Period selector */}
      <div className="flex gap-1.5">
        {PERIOD_TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setPeriod(key)}
            className={cn(
              'px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors',
              period === key
                ? 'bg-[var(--accent-primary)] text-white shadow-[0_2px_8px_rgb(37_99_235/0.25)]'
                : 'bg-[var(--background)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--background-muted)]',
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Nouvelles inscriptions', value: '29', delta: '+18%', up: true,  icon: Users,        color: '#2563EB', bg: '#EFF6FF' },
          { label: 'Taux de réussite',        value: '94%',delta: '+2pts', up: true,  icon: Trophy,       color: '#16A34A', bg: '#F0FDF4' },
          { label: 'Cours dispensés',         value: '89', delta: '+12%', up: true,  icon: BookOpen,     color: '#7C3AED', bg: '#F5F3FF' },
          { label: 'Élèves actifs',           value: '152',delta: '-3%',  up: false, icon: GraduationCap,color: '#D97706', bg: '#FFFBEB' },
        ].map(({ label, value, delta, up, icon: Icon, color, bg }) => (
          <div
            key={label}
            className="p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--background)]"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: bg }}>
                <Icon size={16} style={{ color }} />
              </div>
              <div className={cn('flex items-center gap-0.5 text-[10px] font-semibold', up ? 'text-[#16A34A]' : 'text-[#EF4444]')}>
                {up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                {delta}
              </div>
            </div>
            <p className="font-display font-bold text-2xl text-[var(--text-primary)] leading-none mb-1">{value}</p>
            <p className="text-xs text-[var(--text-muted)] leading-snug">{label}</p>
          </div>
        ))}
      </div>

      {/* Enrollment chart + subject stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Bar chart — inscriptions */}
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)] p-5">
          <h3 className="font-display font-semibold text-sm text-[var(--text-primary)] mb-4">
            Inscriptions
          </h3>
          <div className="flex items-end gap-2 h-36">
            {data.map(({ month, value }) => (
              <div key={month} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-semibold text-[var(--text-muted)]">{value}</span>
                <div
                  className="w-full rounded-t-lg bg-[var(--accent-primary)] opacity-80 hover:opacity-100 transition-opacity"
                  style={{ height: `${Math.max(4, (value / maxVal) * 100)}%` }}
                />
                <span className="text-[9px] text-[var(--text-muted)]">{month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Levels repartition */}
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)] p-5">
          <h3 className="font-display font-semibold text-sm text-[var(--text-primary)] mb-4">
            Répartition par niveau
          </h3>
          <div className="space-y-4">
            {LEVEL_STATS.map(({ level, students, pct }) => (
              <div key={level}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-medium text-[var(--text-primary)]">{level}</span>
                  <span className="text-[var(--text-muted)]">{students} élèves · {pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-[var(--background-muted)] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[var(--accent-primary)]"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Donut-like visual */}
          <div className="mt-5 flex justify-center">
            <div className="relative w-28 h-28">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {(() => {
                  let offset = 0;
                  const colors = ['#2563EB', '#7C3AED', '#16A34A'];
                  return LEVEL_STATS.map(({ pct }, i) => {
                    const dash = pct * 2.51327;
                    const gap  = 251.327 - dash;
                    const el = (
                      <circle
                        key={i}
                        cx="50" cy="50" r="40"
                        fill="none"
                        stroke={colors[i]}
                        strokeWidth="12"
                        strokeDasharray={`${dash} ${gap}`}
                        strokeDashoffset={-offset * 2.51327}
                        strokeLinecap="round"
                      />
                    );
                    offset += pct;
                    return el;
                  });
                })()}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="font-display font-bold text-xl text-[var(--text-primary)] leading-none">152</p>
                <p className="text-[10px] text-[var(--text-muted)]">élèves</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subjects + Top students */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Subject success rates */}
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)] overflow-hidden">
          <div className="px-5 py-4 border-b border-[var(--border-color)]">
            <h3 className="font-display font-semibold text-sm text-[var(--text-primary)]">
              Taux de réussite par matière
            </h3>
          </div>
          <div className="divide-y divide-[var(--border-color)]">
            {SUBJECT_STATS.map(({ name, students, rate, color }) => (
              <div key={name} className="flex items-center gap-4 px-5 py-3">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-[var(--text-primary)] truncate">{name}</span>
                    <span className="text-[var(--text-muted)] ml-2 flex-shrink-0">{students} élèves</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-[var(--background-muted)] overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${rate}%`, backgroundColor: color }} />
                    </div>
                    <span className="text-xs font-semibold flex-shrink-0" style={{ color }}>{rate}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top students */}
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)] overflow-hidden">
          <div className="px-5 py-4 border-b border-[var(--border-color)]">
            <h3 className="font-display font-semibold text-sm text-[var(--text-primary)]">
              Top élèves du mois
            </h3>
          </div>
          <div className="divide-y divide-[var(--border-color)]">
            {TOP_STUDENTS.map(({ name, avg, badge, color }, i) => (
              <div key={name} className="flex items-center gap-3 px-5 py-3">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ backgroundColor: `${color}18`, color }}
                >
                  {badge ?? `#${i + 1}`}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex-1 h-1 rounded-full bg-[var(--background-muted)] overflow-hidden">
                      <div className="h-full rounded-full bg-[var(--accent-primary)]" style={{ width: `${(avg / 20) * 100}%` }} />
                    </div>
                  </div>
                </div>
                <span className="text-sm font-bold text-[var(--text-primary)] flex-shrink-0">{avg}/20</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
