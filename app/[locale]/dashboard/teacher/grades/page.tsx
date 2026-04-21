'use client';
import { useState } from 'react';
import { Save, Check, TrendingUp, TrendingDown, Users, BarChart2 } from 'lucide-react';

const CLASSES = ['3e A', '3e B', '2nde C'];

const STUDENTS: Record<string, { name: string; grades: Record<string, number | null> }[]> = {
  '3e A': [
    { name: 'Emma Fouda',   grades: { DS1: 16, DS2: 17, Int1: 14, DS3: null } },
    { name: "Marc Eto'o",   grades: { DS1: 13, DS2: 12, Int1: 15, DS3: null } },
    { name: 'Aicha Samba',  grades: { DS1: 18, DS2: 19, Int1: 17, DS3: null } },
    { name: 'Jean Kouam',   grades: { DS1: 9,  DS2: 11, Int1: 10, DS3: null } },
    { name: 'Nina Bello',   grades: { DS1: 15, DS2: 14, Int1: 16, DS3: null } },
  ],
  '3e B': [
    { name: 'Paul Nkeng',   grades: { DS1: 14, DS2: 13, Int1: 15, DS3: null } },
    { name: 'Rose Meka',    grades: { DS1: 11, DS2: 10, Int1: 12, DS3: null } },
    { name: 'Luc Tiaty',    grades: { DS1: 17, DS2: 16, Int1: 18, DS3: null } },
  ],
  '2nde C': [
    { name: 'Sara Biyong',  grades: { DS1: 16, DS2: 17, Int1: 15, DS3: null } },
    { name: 'Pierre Anga',  grades: { DS1: 12, DS2: 13, Int1: 14, DS3: null } },
    { name: 'Alice Manga',  grades: { DS1: 8,  DS2: 9,  Int1: 10, DS3: null } },
  ],
};

const EVALS  = ['DS1', 'DS2', 'Int1', 'DS3'];
const LABELS: Record<string, string> = { DS1: 'DS 1', DS2: 'DS 2', Int1: 'Interro', DS3: 'DS 3' };
const COEFS:  Record<string, number>  = { DS1: 3, DS2: 3, Int1: 1, DS3: 3 };

const gc = (g: number | null) => {
  if (g === null) return 'var(--text-muted)';
  if (g >= 16) return '#16A34A';
  if (g >= 12) return '#2563EB';
  if (g >= 10) return '#D97706';
  return '#EF4444';
};

const gcBg = (g: number | null) => {
  if (g === null) return 'transparent';
  if (g >= 16) return '#F0FDF4';
  if (g >= 12) return '#EFF6FF';
  if (g >= 10) return '#FFFBEB';
  return '#FEF2F2';
};

const calcAvg = (grades: Record<string, number | null>) => {
  let sum = 0, c = 0;
  for (const [e, g] of Object.entries(grades)) {
    if (g !== null) { sum += g * (COEFS[e] ?? 1); c += COEFS[e] ?? 1; }
  }
  return c > 0 ? (sum / c).toFixed(1) : null;
};

export default function TeacherGrades() {
  const [cls, setCls] = useState(CLASSES[0]);
  const [editing, setEditing] = useState<{ name: string; ev: string } | null>(null);
  const [tempVal, setTempVal] = useState('');
  const [saved, setSaved] = useState(false);

  const students = STUDENTS[cls] ?? [];

  const classAvg = (() => {
    const avgs = students.map(s => parseFloat(calcAvg(s.grades) ?? ''));
    const valid = avgs.filter(a => !isNaN(a));
    return valid.length ? (valid.reduce((a, b) => a + b, 0) / valid.length).toFixed(1) : '—';
  })();

  const notesSaisies = students.reduce(
    (acc, s) => acc + Object.values(s.grades).filter(g => g !== null).length, 0
  );
  const totalNotes = students.length * EVALS.length;
  const completion = Math.round((notesSaisies / totalNotes) * 100);

  const topStudent = students.reduce((best, s) => {
    const a = parseFloat(calcAvg(s.grades) ?? '0');
    const bAvg = parseFloat(calcAvg(best.grades) ?? '0');
    return a > bAvg ? s : best;
  }, students[0]);

  return (
    <div className="p-4 md:p-6 space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-black text-2xl text-[var(--text-primary)]">Notes — Mathématiques</h1>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">Cliquez sur une cellule pour modifier une note</p>
        </div>
        <button
          onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all shadow-[0_2px_8px_rgb(0_0_0/0.15)]"
          style={{ backgroundColor: saved ? '#16A34A' : 'var(--accent-primary)' }}
        >
          {saved ? <Check size={15} /> : <Save size={15} />}
          {saved ? 'Enregistré !' : 'Enregistrer'}
        </button>
      </div>

      {/* Class tabs */}
      <div className="flex gap-2">
        {CLASSES.map(c => (
          <button key={c} onClick={() => setCls(c)}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold border transition-colors"
            style={cls === c
              ? { backgroundColor: 'var(--accent-primary)', borderColor: 'var(--accent-primary)', color: '#fff' }
              : { backgroundColor: 'var(--background)', borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}
          >{c}</button>
        ))}
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)] p-4">
          <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] flex items-center justify-center mb-3">
            <Users size={18} className="text-[#2563EB]" />
          </div>
          <p className="font-display font-black text-3xl text-[var(--text-primary)] leading-none">{students.length}</p>
          <p className="text-xs text-[var(--text-muted)] mt-1.5">Élèves</p>
        </div>
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)] p-4">
          <div className="w-10 h-10 rounded-xl bg-[#FFF7ED] flex items-center justify-center mb-3">
            <BarChart2 size={18} className="text-[#D97706]" />
          </div>
          <p className="font-display font-black text-3xl leading-none" style={{ color: gc(parseFloat(classAvg)) }}>{classAvg}</p>
          <p className="text-xs text-[var(--text-muted)] mt-1.5">Moy. classe</p>
        </div>
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)] p-4">
          <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] flex items-center justify-center mb-3">
            <TrendingUp size={18} className="text-[#16A34A]" />
          </div>
          <p className="font-display font-black text-3xl text-[var(--text-primary)] leading-none">{completion}%</p>
          <p className="text-xs text-[var(--text-muted)] mt-1.5">Notes saisies</p>
        </div>
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)] p-4">
          <div className="w-10 h-10 rounded-xl bg-[#F5F3FF] flex items-center justify-center mb-3">
            <span className="text-lg">🏆</span>
          </div>
          <p className="font-display font-black text-sm text-[var(--text-primary)] leading-tight truncate">{topStudent?.name.split(' ')[0]}</p>
          <p className="text-xs text-[var(--text-muted)] mt-1.5">1er de la classe</p>
        </div>
      </div>

      {/* Progress bar completion */}
      <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)] p-4">
        <div className="flex justify-between text-xs font-medium text-[var(--text-muted)] mb-2">
          <span>Complétion du carnet de notes</span>
          <span>{notesSaisies}/{totalNotes} notes</span>
        </div>
        <div className="h-2.5 rounded-full bg-[var(--background-muted)]">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${completion}%`, backgroundColor: completion === 100 ? '#16A34A' : 'var(--accent-primary)' }}
          />
        </div>
      </div>

      {/* Grades table */}
      <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)] overflow-x-auto">
        <table className="w-full min-w-[560px]">
          <thead>
            <tr className="border-b border-[var(--border-color)] bg-[var(--background-soft)]">
              <th className="text-left px-5 py-4 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide">Élève</th>
              {EVALS.map(e => (
                <th key={e} className="text-center px-4 py-4">
                  <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide">{LABELS[e]}</p>
                  <p className="text-[10px] font-normal text-[var(--text-muted)] mt-0.5">coef {COEFS[e]}</p>
                </th>
              ))}
              <th className="text-center px-5 py-4 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide">Moyenne</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-color)]">
            {students.map(({ name, grades }) => {
              const a = calcAvg(grades);
              return (
                <tr key={name} className="hover:bg-[var(--background-soft)] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                        style={{ backgroundColor: 'var(--accent-primary)' }}
                      >
                        {name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <span className="text-sm font-medium text-[var(--text-primary)] whitespace-nowrap">{name}</span>
                    </div>
                  </td>
                  {EVALS.map(e => {
                    const g = grades[e];
                    const isEditing = editing?.name === name && editing?.ev === e;
                    return (
                      <td key={e} className="text-center px-4 py-4">
                        {isEditing ? (
                          <input
                            autoFocus type="number" min={0} max={20}
                            value={tempVal}
                            onChange={ev => setTempVal(ev.target.value)}
                            onBlur={() => setEditing(null)}
                            className="w-16 text-center rounded-lg border border-[var(--accent-primary)] bg-[var(--background)] text-sm py-1.5 outline-none font-bold"
                          />
                        ) : (
                          <button
                            onClick={() => { setEditing({ name, ev: e }); setTempVal(g?.toString() ?? ''); }}
                            className="font-bold text-sm px-3 py-1.5 rounded-lg hover:opacity-80 transition-opacity min-w-[48px]"
                            style={{ color: gc(g), backgroundColor: gcBg(g) }}
                          >
                            {g !== null ? g : <span className="text-[var(--text-muted)] font-normal">—</span>}
                          </button>
                        )}
                      </td>
                    );
                  })}
                  <td className="text-center px-5 py-4">
                    {a !== null ? (
                      <span
                        className="font-display font-black text-lg px-3 py-1.5 rounded-xl"
                        style={{ color: gc(parseFloat(a)), backgroundColor: gcBg(parseFloat(a)) }}
                      >
                        {a}
                      </span>
                    ) : (
                      <span className="text-[var(--text-muted)] text-sm">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
          {/* Footer row — class average */}
          <tfoot>
            <tr className="border-t-2 border-[var(--border-color)] bg-[var(--background-soft)]">
              <td className="px-5 py-4 text-sm font-bold text-[var(--text-primary)]">Moyenne classe</td>
              {EVALS.map(e => {
                const evAvg = (() => {
                  const vals = students.map(s => s.grades[e]).filter((g): g is number => g !== null);
                  return vals.length ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1) : '—';
                })();
                return (
                  <td key={e} className="text-center px-4 py-4">
                    <span className="text-sm font-bold" style={{ color: evAvg !== '—' ? gc(parseFloat(evAvg)) : 'var(--text-muted)' }}>
                      {evAvg}
                    </span>
                  </td>
                );
              })}
              <td className="text-center px-5 py-4">
                <span className="font-display font-black text-xl" style={{ color: gc(parseFloat(classAvg)) }}>
                  {classAvg}
                </span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

    </div>
  );
}
