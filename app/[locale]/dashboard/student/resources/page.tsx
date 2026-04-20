'use client';
import { useState } from 'react';
import { Search, Download, Star, BookOpen } from 'lucide-react';

const RESOURCES = [
  { id: 1, title: 'Exercices — Équations du 2nd degré', subject: 'Maths',   teacher: 'M. Mbida',  type: 'PDF',   date: 'Hier',    saved: true  },
  { id: 2, title: 'Cours — Cinématique',                subject: 'Physique', teacher: 'Dr Eto',    type: 'PDF',   date: '18 avr.', saved: false },
  { id: 3, title: 'Fiche révision — La Guerre Froide',  subject: 'Histoire', teacher: 'Mme Zang',  type: 'Fiche', date: '15 avr.', saved: true  },
  { id: 4, title: 'Cours — Fonctions affines',          subject: 'Maths',   teacher: 'M. Mbida',  type: 'PDF',   date: '14 avr.', saved: false },
  { id: 5, title: 'Exercices — Optique géométrique',    subject: 'Physique', teacher: 'Dr Eto',    type: 'PDF',   date: '12 avr.', saved: false },
  { id: 6, title: 'Texte — Le Rouge et le Noir',        subject: 'Français', teacher: 'Mme Ateba', type: 'PDF',   date: '10 avr.', saved: false },
];

const SUBJECTS = ['Toutes', 'Maths', 'Physique', 'Histoire', 'Français'];
const TYPE_STYLE: Record<string, { bg: string; color: string }> = {
  PDF:   { bg: '#EFF6FF', color: '#2563EB' },
  Fiche: { bg: '#F0FDF4', color: '#16A34A' },
};

export default function StudentResources() {
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState('Toutes');
  const [savedIds, setSavedIds] = useState<Set<number>>(new Set(RESOURCES.filter(r => r.saved).map(r => r.id)));

  const filtered = RESOURCES.filter(r =>
    (subject === 'Toutes' || r.subject === subject) &&
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSave = (id: number) =>
    setSavedIds(prev => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });

  return (
    <div className="p-4 md:p-6 max-w-4xl space-y-5">
      <div>
        <h1 className="font-display font-black text-2xl text-[var(--text-primary)]">Ressources</h1>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">{RESOURCES.length} ressources disponibles</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Rechercher une ressource…"
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--background)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--accent-primary)]"
        />
      </div>

      {/* Subject filter */}
      <div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-none">
        {SUBJECTS.map(s => (
          <button key={s} onClick={() => setSubject(s)}
            className="px-4 py-2 rounded-xl text-sm font-semibold border whitespace-nowrap flex-shrink-0 transition-colors"
            style={subject === s
              ? { backgroundColor: 'var(--accent-primary)', borderColor: 'var(--accent-primary)', color: '#fff' }
              : { backgroundColor: 'var(--background)', borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}
          >{s}</button>
        ))}
      </div>

      {/* Saved banner */}
      {savedIds.size > 0 && (
        <div className="rounded-xl bg-[#FFFBEB] border border-[#FDE68A] px-4 py-3 flex items-center gap-3">
          <Star size={16} className="text-[#F59E0B]" fill="#F59E0B" />
          <p className="text-sm font-semibold text-[#92400E]">{savedIds.size} ressource{savedIds.size > 1 ? 's' : ''} sauvegardée{savedIds.size > 1 ? 's' : ''}</p>
        </div>
      )}

      {/* List */}
      <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)] overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-12 text-center">
            <BookOpen size={36} className="mx-auto mb-3 text-[var(--text-muted)] opacity-30" />
            <p className="text-sm text-[var(--text-muted)]">Aucune ressource trouvée</p>
          </div>
        ) : (
          <div className="divide-y divide-[var(--border-color)]">
            {filtered.map(({ id, title, subject: sub, teacher, type, date }) => {
              const ts = TYPE_STYLE[type] ?? { bg: '#F3F4F6', color: '#6B7280' };
              const isSaved = savedIds.has(id);
              return (
                <div key={id} className="flex items-center gap-4 px-5 py-4 hover:bg-[var(--background-soft)] transition-colors">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0" style={ts}>
                    {type}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{title}</p>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">{sub} · {teacher} · {date}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => toggleSave(id)} className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-[var(--background-muted)] transition-colors" style={{ color: isSaved ? '#F59E0B' : 'var(--text-muted)' }}>
                      <Star size={17} fill={isSaved ? '#F59E0B' : 'none'} />
                    </button>
                    <button className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-[var(--background-muted)] transition-colors text-[var(--text-muted)]">
                      <Download size={17} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
