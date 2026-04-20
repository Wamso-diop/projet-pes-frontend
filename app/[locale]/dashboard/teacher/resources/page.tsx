'use client';
import { useState } from 'react';
import { Upload, Search, Download, Trash2, Eye, FileText, MoreVertical, X } from 'lucide-react';

const RESOURCES = [
  { id: 1, title: 'Exercices — Équations du 2nd degré', class: '3e A/B', type: 'PDF',   size: '1.2 Mo', downloads: 42, date: '19 avr.', status: 'published' },
  { id: 2, title: 'Cours — Fonctions affines',           class: '2nde C', type: 'PDF',   size: '2.4 Mo', downloads: 31, date: '17 avr.', status: 'published' },
  { id: 3, title: 'Fiche révision — Trigonométrie',      class: '3e A',   type: 'Fiche', size: '0.8 Mo', downloads: 28, date: '15 avr.', status: 'published' },
  { id: 4, title: 'Vidéo — Introduction aux complexes',  class: '2nde C', type: 'Vidéo', size: '145 Mo', downloads: 15, date: '12 avr.', status: 'published' },
  { id: 5, title: 'Exercices — Statistiques (brouillon)',class: '3e B',   type: 'PDF',   size: '0.5 Mo', downloads: 0,  date: "Aujourd'hui", status: 'draft' },
];

const TYPE_STYLE: Record<string, { bg: string; color: string }> = {
  PDF:   { bg: '#EFF6FF', color: '#2563EB' },
  Fiche: { bg: '#F0FDF4', color: '#16A34A' },
  Vidéo: { bg: '#FFF7ED', color: '#D97706' },
};

export default function TeacherResources() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [showModal, setShowModal] = useState(false);
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const filtered = RESOURCES.filter(r =>
    (filter === 'all' || r.status === filter) &&
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 max-w-4xl space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-black text-2xl text-[var(--text-primary)]">Ressources</h1>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">{RESOURCES.length} ressources · {RESOURCES.filter(r => r.status === 'published').length} publiées</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--accent-primary)] text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <Upload size={16} /> Publier
        </button>
      </div>

      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher…"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--background)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--accent-primary)]"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'published', 'draft'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold border transition-colors"
              style={filter === f
                ? { backgroundColor: 'var(--accent-primary)', borderColor: 'var(--accent-primary)', color: '#fff' }
                : { backgroundColor: 'var(--background)', borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}
            >
              {f === 'all' ? 'Tout' : f === 'published' ? 'Publiés' : 'Brouillons'}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)] overflow-hidden">
        <div className="divide-y divide-[var(--border-color)]">
          {filtered.map(({ id, title, class: cls, type, size, downloads, date, status }) => {
            const ts = TYPE_STYLE[type] ?? { bg: '#F3F4F6', color: '#6B7280' };
            return (
              <div key={id} className="flex items-center gap-4 px-5 py-4 hover:bg-[var(--background-soft)] transition-colors">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0" style={ts}>
                  {type.slice(0, 3).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{title}</p>
                    {status === 'draft' && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#D97706] flex-shrink-0">Brouillon</span>
                    )}
                  </div>
                  <p className="text-xs text-[var(--text-muted)]">{cls} · {size} · {date}</p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                  <Download size={13} /> {downloads}
                </div>
                <div className="relative">
                  <button
                    onClick={() => setOpenMenu(openMenu === id ? null : id)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--background-muted)] transition-colors text-[var(--text-muted)]"
                  >
                    <MoreVertical size={16} />
                  </button>
                  {openMenu === id && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setOpenMenu(null)} />
                      <div className="absolute right-0 top-9 z-20 w-40 rounded-xl border border-[var(--border-color)] bg-[var(--background)] shadow-lg py-1">
                        {[
                          { icon: Eye, label: 'Prévisualiser', cls: 'text-[var(--text-primary)]' },
                          { icon: FileText, label: 'Modifier', cls: 'text-[var(--text-primary)]' },
                          { icon: Trash2, label: 'Supprimer', cls: 'text-[#EF4444]' },
                        ].map(({ icon: Icon, label, cls }) => (
                          <button key={label} className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-[var(--background-soft)] ${cls}`}>
                            <Icon size={14} /> {label}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upload modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-[var(--background)] border border-[var(--border-color)] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-bold text-xl text-[var(--text-primary)]">Publier une ressource</h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-[var(--background-muted)] text-[var(--text-muted)]"><X size={18} /></button>
            </div>
            <div className="space-y-3">
              <input placeholder="Titre de la ressource" className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--background-soft)] text-sm outline-none focus:border-[var(--accent-primary)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)]" />
              <select className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--background-soft)] text-sm text-[var(--text-muted)] outline-none">
                <option value="">Classe…</option>
                <option>3e A</option><option>3e B</option><option>2nde C</option>
              </select>
              <select className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--background-soft)] text-sm text-[var(--text-muted)] outline-none">
                <option value="">Type de fichier…</option>
                <option>PDF</option><option>Fiche</option><option>Vidéo</option>
              </select>
              <div className="border-2 border-dashed border-[var(--border-color)] rounded-xl p-8 text-center cursor-pointer hover:border-[var(--accent-primary)] transition-colors">
                <Upload size={24} className="mx-auto mb-2 text-[var(--text-muted)]" />
                <p className="text-sm text-[var(--text-muted)]">Glisser-déposer ou <span className="text-[var(--accent-primary)] font-semibold">parcourir</span></p>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl border border-[var(--border-color)] text-sm font-semibold text-[var(--text-muted)] hover:bg-[var(--background-soft)]">Annuler</button>
              <button className="flex-1 py-3 rounded-xl bg-[var(--accent-primary)] text-sm font-semibold text-white hover:opacity-90">Publier</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
