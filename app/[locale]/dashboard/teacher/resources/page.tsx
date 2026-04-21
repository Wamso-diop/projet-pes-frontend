'use client';
import { useState } from 'react';
import { Upload, Search, Download, Trash2, Eye, FileText, MoreVertical, X, BookOpen, Check } from 'lucide-react';

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
  const [search, setSearch]       = useState('');
  const [filter, setFilter]       = useState<'all' | 'published' | 'draft'>('all');
  const [showModal, setShowModal] = useState(false);
  const [openMenu, setOpenMenu]   = useState<number | null>(null);

  const filtered = RESOURCES.filter(r =>
    (filter === 'all' || r.status === filter) &&
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalDownloads = RESOURCES.reduce((a, r) => a + r.downloads, 0);

  return (
    <div className="p-4 md:p-6 space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-black text-2xl text-[var(--text-primary)]">Ressources</h1>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">
            {RESOURCES.length} ressources · {RESOURCES.filter(r => r.status === 'published').length} publiées
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--accent-primary)] text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-[0_2px_8px_rgb(37_99_235/0.3)]"
        >
          <Upload size={16} /> Publier
        </button>
      </div>

      {/* Stats mini-cards */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Publiées',     value: RESOURCES.filter(r => r.status === 'published').length, color: '#16A34A', bg: '#F0FDF4' },
          { label: 'Brouillons',   value: RESOURCES.filter(r => r.status === 'draft').length,      color: '#D97706', bg: '#FFF7ED' },
          { label: 'Téléchargements', value: totalDownloads,                                       color: '#2563EB', bg: '#EFF6FF' },
        ].map(({ label, value, color, bg }) => (
          <div key={label} className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)] p-4 text-center">
            <p className="font-display font-black text-3xl leading-none" style={{ color }}>{value}</p>
            <p className="text-xs text-[var(--text-muted)] mt-1.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher une ressource…"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--background)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--accent-primary)] transition-colors"
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

      {/* Resources list */}
      <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--background)] overflow-hidden">
        {/* Desktop header */}
        <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_80px_40px] gap-4 px-5 py-3 border-b border-[var(--border-color)] bg-[var(--background-soft)]">
          <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide">Ressource</span>
          <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide">Classe</span>
          <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide">Taille · Date</span>
          <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide text-center">Dl</span>
          <span />
        </div>

        <div className="divide-y divide-[var(--border-color)]">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-sm text-[var(--text-muted)]">Aucune ressource trouvée</div>
          ) : filtered.map(({ id, title, class: cls, type, size, downloads, date, status }) => {
            const ts = TYPE_STYLE[type] ?? { bg: '#F3F4F6', color: '#6B7280' };
            return (
              <div
                key={id}
                className="flex items-center gap-4 px-5 py-4 hover:bg-[var(--background-soft)] transition-colors"
              >
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={ts}
                >
                  {type.slice(0, 3).toUpperCase()}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{title}</p>
                    {status === 'draft' && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#D97706] flex-shrink-0">
                        Brouillon
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[var(--text-muted)]">
                    <span className="font-medium">{cls}</span> · {size} · {date}
                  </p>
                </div>

                {/* Downloads */}
                <div className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-[var(--text-muted)] min-w-[60px] justify-center">
                  <Download size={13} className="flex-shrink-0" />
                  {downloads}
                </div>

                {/* Menu */}
                <div className="relative flex-shrink-0">
                  <button
                    onClick={() => setOpenMenu(openMenu === id ? null : id)}
                    className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-[var(--background-muted)] transition-colors text-[var(--text-muted)]"
                  >
                    <MoreVertical size={16} />
                  </button>
                  {openMenu === id && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setOpenMenu(null)} />
                      <div className="absolute right-0 top-10 z-20 w-44 rounded-2xl border border-[var(--border-color)] bg-[var(--background)] shadow-[0_8px_24px_rgb(0_0_0/0.12)] py-1.5 overflow-hidden">
                        {[
                          { icon: Eye,      label: 'Prévisualiser', textClass: 'text-[var(--text-primary)]' },
                          { icon: FileText, label: 'Modifier',      textClass: 'text-[var(--text-primary)]' },
                          { icon: Trash2,   label: 'Supprimer',     textClass: 'text-[#EF4444]'            },
                        ].map(({ icon: Icon, label, textClass }) => (
                          <button
                            key={label}
                            onClick={() => setOpenMenu(null)}
                            className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-[var(--background-soft)] transition-colors ${textClass}`}
                          >
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
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-[var(--background)] border border-[var(--border-color)] shadow-[0_24px_80px_rgb(0_0_0/0.25)] overflow-hidden">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border-color)]">
              <div className="flex items-center gap-2">
                <BookOpen size={18} className="text-[var(--accent-primary)]" />
                <h2 className="font-display font-bold text-lg text-[var(--text-primary)]">Publier une ressource</h2>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--background-muted)] text-[var(--text-muted)] transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal body */}
            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-1.5 block">
                  Titre de la ressource
                </label>
                <input
                  placeholder="Ex. : Exercices — Équations du 2nd degré"
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--background-soft)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--accent-primary)] transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-1.5 block">Classe</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--background-soft)] text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-primary)]">
                    <option value="">Choisir…</option>
                    <option>3e A</option><option>3e B</option><option>2nde C</option><option>Toutes</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-1.5 block">Type</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--background-soft)] text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-primary)]">
                    <option value="">Choisir…</option>
                    <option>PDF</option><option>Fiche</option><option>Vidéo</option>
                  </select>
                </div>
              </div>

              {/* Drop zone */}
              <div>
                <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-1.5 block">Fichier</label>
                <div className="border-2 border-dashed border-[var(--border-color)] rounded-2xl p-8 text-center cursor-pointer hover:border-[var(--accent-primary)] hover:bg-[var(--accent-soft)] transition-colors group">
                  <Upload size={28} className="mx-auto mb-3 text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] transition-colors" />
                  <p className="text-sm text-[var(--text-muted)]">
                    Glisser-déposer ou{' '}
                    <span className="text-[var(--accent-primary)] font-semibold">parcourir</span>
                  </p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">PDF, DOCX, MP4 · Max 200 Mo</p>
                </div>
              </div>
            </div>

            {/* Modal footer */}
            <div className="flex gap-3 px-6 pb-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 rounded-xl border border-[var(--border-color)] text-sm font-semibold text-[var(--text-secondary)] hover:bg-[var(--background-soft)] transition-colors"
              >
                Annuler
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--accent-primary)] text-sm font-semibold text-white hover:opacity-90 transition-opacity">
                <Check size={15} /> Publier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
