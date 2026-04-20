'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

type EventType = 'class' | 'exam' | 'meeting' | 'holiday';

interface CalEvent {
  id: string;
  title: string;
  day: number;
  time: string;
  type: EventType;
  teacher?: string;
  room?: string;
}

const EVENT_STYLES: Record<EventType, { bg: string; color: string; label: string }> = {
  class:   { bg: '#EFF6FF', color: '#2563EB', label: 'Cours' },
  exam:    { bg: '#FEF3C7', color: '#D97706', label: 'Examen' },
  meeting: { bg: '#F5F3FF', color: '#7C3AED', label: 'Réunion' },
  holiday: { bg: '#F0FDF4', color: '#16A34A', label: 'Congé' },
};

const DAYS_FR = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const MONTHS_FR = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
];

const EVENTS: CalEvent[] = [
  { id: '1',  title: 'Maths — 3e A',           day: 21, time: '08h–10h', type: 'class',   teacher: 'M. Mbida',   room: 'Salle 1' },
  { id: '2',  title: 'Physique — Tle D',        day: 21, time: '10h–12h', type: 'class',   teacher: 'Dr Eto',     room: 'Salle 3' },
  { id: '3',  title: 'Réunion pédagogique',     day: 22, time: '14h–16h', type: 'meeting'  },
  { id: '4',  title: 'Anglais — 5e',            day: 22, time: '08h–09h', type: 'class',   teacher: 'M. Kamga',   room: 'Salle 2' },
  { id: '5',  title: 'Examen blanc Maths',      day: 23, time: '08h–11h', type: 'exam',    room: 'Grande salle'  },
  { id: '6',  title: 'Français — 1re A',        day: 23, time: '14h–16h', type: 'class',   teacher: 'Mme Fouda',  room: 'Salle 1' },
  { id: '7',  title: 'Maths — Tle C',           day: 24, time: '08h–10h', type: 'class',   teacher: 'M. Mbida',   room: 'Salle 3' },
  { id: '8',  title: 'Fête du travail',         day: 1,  time: 'Toute la journée', type: 'holiday' },
  { id: '9',  title: 'SVT — 4e',               day: 25, time: '10h–12h', type: 'class',   teacher: 'Mme Bela',   room: 'Salle 2' },
  { id: '10', title: 'Examen blanc Physique',   day: 26, time: '09h–12h', type: 'exam',    room: 'Grande salle'  },
  { id: '11', title: 'Réunion parents d\'élèves', day: 28, time: '16h–18h', type: 'meeting' },
];

const UPCOMING_EVENTS = EVENTS
  .filter((e) => e.day >= 20)
  .sort((a, b) => a.day - b.day)
  .slice(0, 5);

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1;
}

export default function AdminSchedulePage() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(today.getDate());

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) =>
    i < firstDay ? null : i - firstDay + 1,
  );

  const eventsForDay = (day: number) => EVENTS.filter((e) => e.day === day);
  const selectedEvents = selectedDay ? eventsForDay(selectedDay) : [];

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear((y) => y - 1); }
    else setMonth((m) => m - 1);
    setSelectedDay(null);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear((y) => y + 1); }
    else setMonth((m) => m + 1);
    setSelectedDay(null);
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col lg:flex-row gap-5">

        {/* Calendar */}
        <div className="flex-1 rounded-2xl border border-[var(--border-color)] bg-[var(--background)] overflow-hidden">

          {/* Month navigation */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-color)]">
            <button
              onClick={prevMonth}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--background-muted)] transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <h2 className="font-display font-semibold text-[var(--text-primary)]">
              {MONTHS_FR[month]} {year}
            </h2>
            <button
              onClick={nextMonth}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--background-muted)] transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Day names */}
          <div className="grid grid-cols-7 border-b border-[var(--border-color)]">
            {DAYS_FR.map((d) => (
              <div key={d} className="py-2.5 text-center text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wide">
                {d}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7">
            {cells.map((day, i) => {
              if (!day) return <div key={`empty-${i}`} className="aspect-square border-b border-r border-[var(--border-color)]/50" />;
              const dayEvents = eventsForDay(day);
              const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
              const isSelected = day === selectedDay;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day === selectedDay ? null : day)}
                  className={cn(
                    'relative aspect-square flex flex-col items-center pt-2 border-b border-r border-[var(--border-color)]/50 transition-colors',
                    isSelected ? 'bg-[var(--accent-primary)]/8' : 'hover:bg-[var(--background-soft)]',
                  )}
                >
                  <span
                    className={cn(
                      'w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
                      isToday && !isSelected ? 'bg-[var(--accent-primary)] text-white' : '',
                      isSelected && !isToday ? 'bg-[var(--accent-primary)] text-white' : '',
                      !isToday && !isSelected ? 'text-[var(--text-primary)]' : '',
                    )}
                  >
                    {day}
                  </span>
                  {dayEvents.length > 0 && (
                    <div className="flex gap-0.5 mt-1 flex-wrap justify-center">
                      {dayEvents.slice(0, 3).map((ev) => (
                        <div
                          key={ev.id}
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: EVENT_STYLES[ev.type].color }}
                        />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="px-5 py-3 border-t border-[var(--border-color)] flex flex-wrap gap-3">
            {Object.entries(EVENT_STYLES).map(([type, style]) => (
              <div key={type} className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: style.color }} />
                {style.label}
              </div>
            ))}
          </div>
        </div>

        {/* Side panel */}
        <div className="lg:w-72 space-y-4">

          {/* Add event button */}
          <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--accent-primary)] text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-[0_2px_8px_rgb(37_99_235/0.3)]">
            <Plus size={16} />
            Ajouter un événement
          </button>

          {/* Selected day events */}
          {selectedDay && (
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)] overflow-hidden">
              <div className="px-4 py-3 border-b border-[var(--border-color)]">
                <p className="font-semibold text-sm text-[var(--text-primary)]">
                  {selectedDay} {MONTHS_FR[month]}
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  {selectedEvents.length === 0 ? 'Aucun événement' : `${selectedEvents.length} événement${selectedEvents.length > 1 ? 's' : ''}`}
                </p>
              </div>
              {selectedEvents.length > 0 ? (
                <div className="divide-y divide-[var(--border-color)]">
                  {selectedEvents.map((ev) => {
                    const style = EVENT_STYLES[ev.type];
                    return (
                      <div key={ev.id} className="px-4 py-3">
                        <div className="flex items-start gap-2.5">
                          <div
                            className="w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0"
                            style={{ backgroundColor: style.color }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-[var(--text-primary)] leading-snug">{ev.title}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <Clock size={11} className="text-[var(--text-muted)]" />
                              <span className="text-[11px] text-[var(--text-muted)]">{ev.time}</span>
                            </div>
                            {ev.room && (
                              <div className="flex items-center gap-1 mt-0.5">
                                <MapPin size={11} className="text-[var(--text-muted)]" />
                                <span className="text-[11px] text-[var(--text-muted)]">{ev.room}</span>
                              </div>
                            )}
                            {ev.teacher && (
                              <span
                                className="inline-block mt-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                                style={{ backgroundColor: style.bg, color: style.color }}
                              >
                                {ev.teacher}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="px-4 py-6 text-center text-xs text-[var(--text-muted)]">
                  Journée libre
                </div>
              )}
            </div>
          )}

          {/* Upcoming events */}
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)] overflow-hidden">
            <div className="px-4 py-3 border-b border-[var(--border-color)]">
              <p className="font-semibold text-sm text-[var(--text-primary)]">À venir</p>
            </div>
            <div className="divide-y divide-[var(--border-color)]">
              {UPCOMING_EVENTS.map((ev) => {
                const style = EVENT_STYLES[ev.type];
                return (
                  <div key={ev.id} className="flex items-center gap-3 px-4 py-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ backgroundColor: style.bg, color: style.color }}
                    >
                      {ev.day}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[var(--text-primary)] truncate">{ev.title}</p>
                      <p className="text-[10px] text-[var(--text-muted)]">{ev.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
