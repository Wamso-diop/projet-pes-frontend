'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Calendar } from 'lucide-react';

type EventType = 'class' | 'exam' | 'meeting';

const EVENTS: Record<string, { label: string; type: EventType; time: string }[]> = {
  '2026-04-21': [{ label: 'Mathématiques — 3e A', type: 'class',   time: '14h–16h' }],
  '2026-04-22': [{ label: 'Physique-Chimie',       type: 'class',   time: '10h–12h' }],
  '2026-04-23': [{ label: 'RDV M. Mbida',          type: 'meeting', time: '17h'     }],
  '2026-04-25': [{ label: 'DS Mathématiques',       type: 'exam',    time: '14h–16h' }],
  '2026-04-28': [{ label: 'Mathématiques', type: 'class', time: '14h–16h' }, { label: 'Français', type: 'class', time: '16h–17h' }],
  '2026-04-30': [{ label: 'Physique',               type: 'class',   time: '10h–12h' }],
  '2026-05-05': [{ label: 'DS Physique',            type: 'exam',    time: '10h–12h' }],
};

const TYPE_STYLE: Record<EventType, { bg: string; color: string; dot: string; label: string }> = {
  class:   { bg: '#EFF6FF', color: '#2563EB', dot: '#2563EB', label: 'Cours'       },
  exam:    { bg: '#FEF2F2', color: '#EF4444', dot: '#EF4444', label: 'Devoir'      },
  meeting: { bg: '#F5F3FF', color: '#7C3AED', dot: '#7C3AED', label: 'Rendez-vous' },
};

const DAYS  = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const MONTHS = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
const pad = (n: number) => n.toString().padStart(2, '0');

export default function ParentCalendar() {
  const today = new Date(2026, 3, 20);
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState<string | null>('2026-04-21');

  const firstDay = new Date(year, month, 1).getDay();
  const offset = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prev = () => month === 0 ? (setMonth(11), setYear(y => y - 1)) : setMonth(m => m - 1);
  const next = () => month === 11 ? (setMonth(0), setYear(y => y + 1)) : setMonth(m => m + 1);

  const selectedEvents = selected ? (EVENTS[selected] ?? []) : [];

  return (
    <div className="p-4 md:p-6 max-w-6xl space-y-5">
      <div>
        <h1 className="font-display font-black text-2xl text-[var(--text-primary)]">Calendrier</h1>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">Emploi du temps de Lucas</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Calendar */}
        <div className="lg:col-span-2 rounded-2xl border border-[var(--border-color)] bg-[var(--background)] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-color)]">
            <button onClick={prev} className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-[var(--background-soft)] text-[var(--text-muted)] transition-colors"><ChevronLeft size={18} /></button>
            <h2 className="font-semibold text-[var(--text-primary)]">{MONTHS[month]} {year}</h2>
            <button onClick={next} className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-[var(--background-soft)] text-[var(--text-muted)] transition-colors"><ChevronRight size={18} /></button>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-7 mb-3">
              {DAYS.map(d => <div key={d} className="text-center text-xs font-semibold text-[var(--text-muted)] py-1">{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: offset }).map((_, i) => <div key={`e${i}`} />)}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                const key = `${year}-${pad(month + 1)}-${pad(day)}`;
                const events = EVENTS[key] ?? [];
                const isToday = year === today.getFullYear() && month === today.getMonth() && day === today.getDate();
                const isSel = selected === key;
                return (
                  <button
                    key={day}
                    onClick={() => setSelected(key === selected ? null : key)}
                    className="aspect-square rounded-xl flex flex-col items-center justify-start pt-1.5 gap-0.5 transition-colors hover:bg-[var(--background-soft)]"
                    style={isSel ? { backgroundColor: 'var(--accent-primary)' } : isToday ? { backgroundColor: 'var(--background-muted)' } : {}}
                  >
                    <span className="text-sm font-semibold" style={{ color: isSel ? '#fff' : isToday ? 'var(--accent-primary)' : 'var(--text-primary)' }}>
                      {day}
                    </span>
                    <div className="flex gap-0.5 flex-wrap justify-center">
                      {events.slice(0, 3).map((ev, i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: isSel ? 'rgba(255,255,255,0.7)' : TYPE_STYLE[ev.type].dot }} />
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="px-5 py-3 border-t border-[var(--border-color)] flex gap-5 flex-wrap">
            {(Object.entries(TYPE_STYLE) as [EventType, typeof TYPE_STYLE[EventType]][]).map(([, s]) => (
              <div key={s.label} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.dot }} />
                <span className="text-xs text-[var(--text-muted)]">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Side panel */}
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)] overflow-hidden">
          <div className="px-5 py-4 border-b border-[var(--border-color)]">
            <h2 className="font-semibold text-[var(--text-primary)]">
              {selected
                ? new Date(selected + 'T12:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
                : 'Sélectionnez un jour'}
            </h2>
          </div>
          <div className="divide-y divide-[var(--border-color)]">
            {selectedEvents.length === 0 ? (
              <div className="py-12 px-5 text-center">
                <Calendar size={32} className="mx-auto mb-3 text-[var(--text-muted)] opacity-30" />
                <p className="text-sm text-[var(--text-muted)]">{selected ? 'Aucun événement' : 'Cliquez sur un jour'}</p>
              </div>
            ) : selectedEvents.map(({ label, type, time }, i) => {
              const ts = TYPE_STYLE[type];
              return (
                <div key={i} className="flex items-center gap-3 px-5 py-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: ts.bg }}>
                    {type === 'meeting' ? <Calendar size={17} style={{ color: ts.color }} /> : <BookOpen size={17} style={{ color: ts.color }} />}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{label}</p>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">{time} · {ts.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
