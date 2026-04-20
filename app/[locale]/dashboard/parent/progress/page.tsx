'use client';
import { useState } from 'react';
import { TrendingUp, TrendingDown, Trophy } from 'lucide-react';

const GRADES = [
  { subject: 'Mathématiques', coef: 4, color: '#2563EB', grades: [14, 16, 15, 17], avg: 15.5, trend: +1.2 },
  { subject: 'Physique',       coef: 3, color: '#7C3AED', grades: [13, 14, 12, 15], avg: 13.5, trend: +0.8 },
  { subject: 'Français',       coef: 3, color: '#D97706', grades: [12, 11, 13, 14], avg: 12.5, trend: +0.6 },
  { subject: 'Histoire',       coef: 2, color: '#16A34A', grades: [15, 16, 17, 16], avg: 16.0, trend: +0.3 },
  { subject: 'Anglais',        coef: 2, color: '#EF4444', grades: [17, 16, 18, 17], avg: 17.0, trend: -0.2 },
];

const PERIODS = ['DS 1', 'DS 2', 'Interro', 'DS 3'];

const gc = (g: number) => g >= 16 ? '#16A34A' : g >= 12 ? '#2563EB' : g >= 10 ? '#D97706' : '#EF4444';

export default function ParentProgress() {
  const [tab, setTab] = useState<'overview' | 'detail'>('overview');

  const generalAvg = (() => {
    let sum = 0, coef = 0;
    for (const s of GRADES) { sum += s.avg * s.coef; coef += s.coef; }
    return (sum / coef).toFixed(1);
  })();

  return (
    <div className="p-4 md:p-6 max-w-4xl space-y-6">
      <div>
        <h1 className="font-display font-black text-2xl text-[var(--text-primary)]">Suivi de Lucas</h1>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">Trimestre 2 · Année 2025/2026</p>
      </div>

      {/* Banner */}
      <div
        className="rounded-2xl p-5 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #16A34A 0%, #0891B2 100%)' }}
      >
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <p className="text-white/65 text-sm">Moyenne générale</p>
            <p className="font-display font-black text-4xl text-white mt-1">{generalAvg}<span className="text-xl text-white/60">/20</span></p>
            <div className="flex items-center gap-1.5 mt-2 text-white font-semibold text-sm">
              <TrendingUp size={16} className="text-green-200" />
              <span>+1.4 pts ce mois</span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end gap-1.5 mb-1">
              <Trophy size={18} className="text-yellow-300" />
              <p className="font-display font-black text-3xl text-white">#2</p>
            </div>
            <p className="text-white/60 text-xs">Rang dans la classe</p>
          </div>
        </div>
        <div className="relative z-10 mt-4">
          <div className="flex justify-between text-xs text-white/55 mb-1.5">
            <span>Progression vers 16/20</span>
            <span>{Math.round((parseFloat(generalAvg) / 16) * 100)}%</span>
          </div>
          <div className="h-2 rounded-full bg-white/15">
            <div className="h-full rounded-full bg-white/70" style={{ width: `${Math.min(100, (parseFloat(generalAvg) / 16) * 100)}%` }} />
          </div>
        </div>
        <div className="absolute -right-4 -top-4 w-32 h-32 rounded-full bg-white/5" />
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(['overview', 'detail'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold border transition-colors"
            style={tab === t
              ? { backgroundColor: 'var(--accent-primary)', borderColor: 'var(--accent-primary)', color: '#fff' }
              : { backgroundColor: 'var(--background)', borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}
          >
            {t === 'overview' ? 'Vue globale' : 'Par matière'}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)] overflow-hidden">
          <div className="divide-y divide-[var(--border-color)]">
            {GRADES.map(({ subject, coef, color, avg, trend }) => (
              <div key={subject} className="flex items-center gap-4 px-5 py-4">
                <div className="w-1.5 h-12 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{subject}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">Coefficient {coef}</p>
                  <div className="h-1.5 rounded-full bg-[var(--background-muted)] mt-2">
                    <div className="h-full rounded-full" style={{ width: `${(avg / 20) * 100}%`, backgroundColor: color }} />
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-2xl font-display font-black" style={{ color }}>{avg}</p>
                  <p className="text-xs flex items-center justify-end gap-0.5 mt-0.5 font-semibold" style={{ color: trend > 0 ? '#16A34A' : '#EF4444' }}>
                    {trend > 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                    {trend > 0 ? '+' : ''}{trend}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'detail' && (
        <div className="space-y-3">
          {GRADES.map(({ subject, coef, color, grades: gs, avg }) => (
            <div key={subject} className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)] p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-semibold text-[var(--text-primary)]">{subject}</p>
                  <p className="text-xs text-[var(--text-muted)]">Coef {coef}</p>
                </div>
                <p className="text-3xl font-display font-black" style={{ color }}>{avg}</p>
              </div>
              <div className="flex items-end gap-2 h-16">
                {gs.map((g, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <p className="text-xs font-bold" style={{ color: gc(g) }}>{g}</p>
                    <div className="w-full rounded-t-md" style={{ height: `${(g / 20) * 44}px`, backgroundColor: i === gs.length - 1 ? color : `${color}40` }} />
                    <p className="text-[10px] text-[var(--text-muted)]">{PERIODS[i]}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
