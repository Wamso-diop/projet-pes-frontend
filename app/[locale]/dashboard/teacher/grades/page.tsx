'use client';
import { useState } from 'react';
import { Save, BarChart2 } from 'lucide-react';

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

const EVALS = ['DS1', 'DS2', 'Int1', 'DS3'];
const LABELS: Record<string, string> = { DS1: 'DS 1', DS2: 'DS 2', Int1: 'Interro 1', DS3: 'DS 3' };
const COEFS: Record<string, number>  = { DS1: 3, DS2: 3, Int1: 1, DS3: 3 };

const gc = (g: number | null) => {
  if (g === null) return 'var(--text-muted)';
  if (g >= 16) return '#16A34A';
  if (g >= 12) return '#2563EB';
  if (g >= 10) return '#D97706';
  return '#EF4444';
};

const avg = (grades: Record<string, number | null>) => {
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
    const avgs = students.map(s => parseFloat(avg(s.grades) ?? ''));
    const valid = avgs.filter(a => !isNaN(a));
    return valid.length ? (valid.reduce((a, b) => a + b, 0) / valid.length).toFixed(1) : '—';
  })();

  return (
    <div className="p-4 md:p-6 max-w-5xl space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-black text-2xl text-[var(--text-primary)]">Notes</h1>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">Cliquez sur une cellule pour modifier</p>
        </div>
        <button
          onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
          style={{ backgroundColor: saved ? '#16A34A' : 'var(--accent-primary)' }}
        >
          <Save size={15} /> {saved ? 'Enregistré !' : 'Enregistrer'}
        </button>
      </div>

      {/* Class tabs */}
      <div className="flex gap-2">
        {CLASSES.map(c => (
          <button key={c} onClick={() => setCls(c)}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold border transition-colors"
            style={cls === c
              ? { backgroundColor: 'var(--accent-primary)', borderColor: 'var(--accent-primary)', color: '#fff' }
              : { backgroundColor: 'var(--background)', borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}
          >{c}</button>
        ))}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Élèves',       value: students.length, icon: null },
          { label: 'Moy. classe',  value: classAvg, icon: BarChart2 },
          { label: 'Notes saisies',value: students.reduce((acc, s) => acc + Object.values(s.grades).filter(g => g !== null).length, 0), icon: null },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)] p-4 text-center">
            <p className="text-3xl font-display font-black text-[var(--accent-primary)]">{value}</p>
            <p className="text-xs text-[var(--text-muted)] mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)] overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--border-color)]">
              <th className="text-left px-5 py-3.5 text-sm font-semibold text-[var(--text-muted)]">Élève</th>
              {EVALS.map(e => (
                <th key={e} className="text-center px-4 py-3.5 text-sm font-semibold text-[var(--text-muted)]">
                  {LABELS[e]}
                  <span className="block text-xs font-normal text-[var(--text-muted)]">coef {COEFS[e]}</span>
                </th>
              ))}
              <th className="text-center px-4 py-3.5 text-sm font-semibold text-[var(--text-muted)]">Moy.</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-color)]">
            {students.map(({ name, grades }) => {
              const a = avg(grades);
              return (
                <tr key={name} className="hover:bg-[var(--background-soft)] transition-colors">
                  <td className="px-5 py-4 text-sm font-medium text-[var(--text-primary)] whitespace-nowrap">{name}</td>
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
                            className="w-14 text-center rounded-lg border border-[var(--accent-primary)] bg-[var(--background)] text-sm py-1 outline-none"
                          />
                        ) : (
                          <button
                            onClick={() => { setEditing({ name, ev: e }); setTempVal(g?.toString() ?? ''); }}
                            className="font-bold text-sm px-2.5 py-1.5 rounded-lg hover:bg-[var(--background-muted)] transition-colors w-14"
                            style={{ color: gc(g) }}
                          >
                            {g !== null ? g : '—'}
                          </button>
                        )}
                      </td>
                    );
                  })}
                  <td className="text-center px-4 py-4">
                    {a !== null ? (
                      <span className="font-black text-base" style={{ color: gc(parseFloat(a)) }}>{a}</span>
                    ) : <span className="text-[var(--text-muted)]">—</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
