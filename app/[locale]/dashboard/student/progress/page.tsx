'use client';
import { useState } from 'react';
import {
  TrendingUp, TrendingDown, Zap, Trophy, Star,
  Flame, BookOpen, Target, MessageCircle, Medal,
} from 'lucide-react';

const GRADES = [
  { subject: 'Mathématiques', coef: 4, color: '#2563EB', bg: '#EFF6FF', grades: [14, 16, 15, 17], avg: 15.5, trend: +1.2 },
  { subject: 'Physique',       coef: 3, color: '#7C3AED', bg: '#F5F3FF', grades: [13, 14, 12, 15], avg: 13.5, trend: +0.8 },
  { subject: 'Français',       coef: 3, color: '#D97706', bg: '#FFFBEB', grades: [12, 11, 13, 14], avg: 12.5, trend: +0.6 },
  { subject: 'Histoire',       coef: 2, color: '#16A34A', bg: '#F0FDF4', grades: [15, 16, 17, 16], avg: 16.0, trend: +0.3 },
  { subject: 'Anglais',        coef: 2, color: '#EF4444', bg: '#FEF2F2', grades: [17, 16, 18, 17], avg: 17.0, trend: -0.2 },
];

const PERIODS = ['DS 1', 'DS 2', 'Interro', 'DS 3'];

const BADGES = [
  {
    icon: Trophy, label: 'Top 3 du mois',    sub: 'Classement mensuel',
    earned: true,  pts: 50,
    earnedBg: 'linear-gradient(135deg,#F59E0B,#D97706)', earnedIcon: '#fff',
    lockedBg: '#F3F4F6', lockedIcon: '#9CA3AF',
  },
  {
    icon: Flame,   label: '5 jours consécutifs', sub: 'Streak de connexion',
    earned: true,  pts: 30,
    earnedBg: 'linear-gradient(135deg,#EF4444,#DC2626)', earnedIcon: '#fff',
    lockedBg: '#F3F4F6', lockedIcon: '#9CA3AF',
  },
  {
    icon: BookOpen, label: '10 ressources lues', sub: 'Bibliothèque',
    earned: true,  pts: 20,
    earnedBg: 'linear-gradient(135deg,#2563EB,#1D4ED8)', earnedIcon: '#fff',
    lockedBg: '#F3F4F6', lockedIcon: '#9CA3AF',
  },
  {
    icon: Star,    label: 'Note parfaite',    sub: '20/20 obtenu',
    earned: false, pts: 100,
    earnedBg: 'linear-gradient(135deg,#7C3AED,#6D28D9)', earnedIcon: '#fff',
    lockedBg: '#F3F4F6', lockedIcon: '#9CA3AF',
  },
  {
    icon: Target,  label: '3 DS au-dessus de 16', sub: 'Excellence',
    earned: false, pts: 75,
    earnedBg: 'linear-gradient(135deg,#16A34A,#15803D)', earnedIcon: '#fff',
    lockedBg: '#F3F4F6', lockedIcon: '#9CA3AF',
  },
  {
    icon: MessageCircle, label: '5 questions posées', sub: 'Curieux',
    earned: false, pts: 25,
    earnedBg: 'linear-gradient(135deg,#0891B2,#0E7490)', earnedIcon: '#fff',
    lockedBg: '#F3F4F6', lockedIcon: '#9CA3AF',
  },
];

const gc = (g: number) =>
  g >= 16 ? '#16A34A' : g >= 12 ? '#2563EB' : g >= 10 ? '#D97706' : '#EF4444';

const BAR_H = 120; // px — hauteur de la zone des barres

export default function StudentProgress() {
  const [tab, setTab] = useState<'grades' | 'badges'>('grades');

  const generalAvg = (() => {
    let sum = 0, coef = 0;
    for (const s of GRADES) { sum += s.avg * s.coef; coef += s.coef; }
    return (sum / coef).toFixed(1);
  })();

  return (
    <div className="p-4 md:p-6 max-w-4xl space-y-6">
      <div>
        <h1 className="font-display font-black text-2xl text-[var(--text-primary)]">Mon suivi</h1>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">Trimestre 2 · 2025/2026</p>
      </div>

      {/* Summary banner */}
      <div
        className="rounded-2xl p-5 md:p-6 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}
      >
        <div className="relative z-10 flex items-start justify-between flex-wrap gap-4">
          <div>
            <p className="text-white/65 text-sm">Moyenne générale</p>
            <p className="font-display font-black text-5xl text-white mt-1 leading-none">
              {generalAvg}
              <span className="text-2xl text-white/50 ml-1">/20</span>
            </p>
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="flex items-center gap-2 bg-white/15 rounded-xl px-4 py-2">
              <Zap size={18} className="text-yellow-300" />
              <span className="font-display font-black text-2xl text-white">340</span>
              <span className="text-white/60 text-sm">XP</span>
            </div>
            <div className="flex items-center gap-2 bg-white/15 rounded-xl px-4 py-2">
              <Medal size={16} className="text-yellow-300" />
              <span className="font-bold text-white">Rang #2</span>
            </div>
          </div>
        </div>
        <div className="relative z-10 mt-5">
          <div className="flex justify-between text-xs text-white/55 mb-2">
            <span>Progression vers le niveau suivant</span>
            <span>340 / 500 XP</span>
          </div>
          <div className="h-3 rounded-full bg-white/15">
            <div className="h-full rounded-full bg-white/75" style={{ width: '68%' }} />
          </div>
        </div>
        <div className="absolute -right-6 -top-6 w-44 h-44 rounded-full bg-white/5" />
        <div className="absolute right-8 -bottom-10 w-32 h-32 rounded-full bg-white/5" />
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(['grades', 'badges'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold border transition-colors"
            style={tab === t
              ? { backgroundColor: 'var(--accent-primary)', borderColor: 'var(--accent-primary)', color: '#fff' }
              : { backgroundColor: 'var(--background)', borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}
          >
            {t === 'grades' ? 'Notes par matière' : 'Badges & récompenses'}
          </button>
        ))}
      </div>

      {tab === 'grades' && (
        <div className="space-y-4">
          {GRADES.map(({ subject, coef, color, bg, grades: gs, avg, trend }) => (
            <div key={subject} className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)] p-5">
              {/* Header row */}
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="font-semibold text-[var(--text-primary)]">{subject}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">Coefficient {coef}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-display font-black leading-none" style={{ color }}>{avg}</p>
                  <p className="text-xs flex items-center justify-end gap-1 mt-1 font-semibold"
                    style={{ color: trend > 0 ? '#16A34A' : '#EF4444' }}>
                    {trend > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {trend > 0 ? '+' : ''}{trend} pts
                  </p>
                </div>
              </div>

              {/* Bar chart — fixed height zone */}
              <div className="flex items-end gap-3" style={{ height: `${BAR_H + 40}px` }}>
                {gs.map((g, i) => {
                  const barH = Math.round((g / 20) * BAR_H);
                  const isLast = i === gs.length - 1;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center justify-end gap-1">
                      {/* Value label above bar */}
                      <span className="text-sm font-black mb-1" style={{ color: gc(g) }}>{g}</span>

                      {/* Bar */}
                      <div
                        className="w-full rounded-t-xl transition-all"
                        style={{
                          height: `${barH}px`,
                          backgroundColor: isLast ? color : `${color}30`,
                          border: isLast ? `2px solid ${color}` : `2px solid ${color}20`,
                        }}
                      />

                      {/* Period label below */}
                      <span className="text-xs text-[var(--text-muted)] mt-1 text-center">{PERIODS[i]}</span>
                    </div>
                  );
                })}
              </div>

              {/* Subject color strip */}
              <div className="mt-4 h-1.5 rounded-full" style={{ backgroundColor: bg }}>
                <div className="h-full rounded-full" style={{ width: `${(avg / 20) * 100}%`, backgroundColor: color }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'badges' && (
        <div className="space-y-4">
          {/* Earned */}
          <div>
            <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-3 px-1">
              Badges obtenus ({BADGES.filter(b => b.earned).length})
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {BADGES.filter(b => b.earned).map(({ icon: Icon, label, sub, pts, earnedBg, earnedIcon }) => (
                <div
                  key={label}
                  className="rounded-2xl p-4 text-white relative overflow-hidden"
                  style={{ background: earnedBg }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
                      <Icon size={22} color={earnedIcon} />
                    </div>
                    <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-lg">+{pts} XP</span>
                  </div>
                  <p className="font-bold text-sm leading-tight">{label}</p>
                  <p className="text-white/65 text-xs mt-0.5">{sub}</p>
                  <div className="absolute -right-4 -bottom-4 w-16 h-16 rounded-full bg-white/10" />
                </div>
              ))}
            </div>
          </div>

          {/* Locked */}
          <div>
            <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-3 px-1">
              À débloquer ({BADGES.filter(b => !b.earned).length})
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {BADGES.filter(b => !b.earned).map(({ icon: Icon, label, sub, pts, earnedBg }) => (
                <div
                  key={label}
                  className="rounded-2xl p-4 border border-[var(--border-color)] bg-[var(--background-soft)] relative overflow-hidden"
                >
                  {/* Ghost of earned version */}
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center opacity-20"
                      style={{ background: earnedBg }}
                    >
                      <Icon size={22} color="#fff" />
                    </div>
                    <div className="flex items-center gap-1 bg-[var(--background-muted)] px-2 py-1 rounded-lg">
                      <span className="text-xs font-bold text-[var(--text-muted)]">+{pts} XP</span>
                    </div>
                  </div>
                  <p className="font-bold text-sm text-[var(--text-muted)] leading-tight">{label}</p>
                  <p className="text-[var(--text-muted)] text-xs mt-0.5 opacity-60">{sub}</p>

                  {/* Lock overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-8 h-8 rounded-full bg-[var(--background-muted)] flex items-center justify-center opacity-60">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[var(--text-muted)]">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
